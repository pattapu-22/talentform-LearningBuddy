
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, Trophy, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logActivity } from '../utils/logActivity';

const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [quizzes, setQuizzes] = useState({});
  const [user, setUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchQuizzes(currentUser);
      } else {
        setUser(null);
        setQuizzes({});
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchQuizzes = async (currentUser) => {
    try {
      const quizData = {};
      const quizCollection = collection(db, 'quizzes');
      const quizSnapshot = await getDocs(quizCollection);
      quizSnapshot.forEach(doc => {
        quizData[doc.id] = doc.data();
      });

      const userGeneratedCollection = collection(db, `users/${currentUser.uid}/generatedQuizzes`);
      const generatedSnapshot = await getDocs(userGeneratedCollection);
      generatedSnapshot.forEach(doc => {
        quizData[`generated-${doc.id}`] = doc.data();
      });

      setQuizzes(quizData);
    } catch (error) {
      console.error("Error fetching quizzes: ", error);
    }
  };

  const handleGenerateQuiz = async () => {
    if (!subject || !topic || !level) {
      alert("All fields are required!");
      return;
    }

    if (!user) {
      alert("Please login to generate quizzes.");
      return;
    }

    const promptText = `Generate a ${level} level quiz on ${topic} under ${subject}. Provide 10 questions with options and correct answer in valid JSON format as an array of objects [{ "q": "...", "options": ["..."], "correct": "..." }] with no extra text.`;

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/ask', { message: promptText });
      const data = JSON.parse(res.data.response);

      const newQuiz = {
        title: `${subject} - ${topic} Quiz`,
        color: "pink",
        questions: data
      };

      const userGeneratedQuizRef = collection(db, `users/${user.uid}/generatedQuizzes`);
      const docRef = await addDoc(userGeneratedQuizRef, {
        ...newQuiz,
        createdAt: serverTimestamp()
      });

      setQuizzes(prev => ({ ...prev, [`generated-${docRef.id}`]: newQuiz }));
      setSubject('');
      setTopic('');
      setLevel('');
      selectQuiz(`generated-${docRef.id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectQuiz = (quizType) => {
    setSelectedQuiz(quizType);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
    setSelectedAnswer('');
  };

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const nextQuestion = async () => {
    const currentQuizData = quizzes[selectedQuiz];
    const isCorrect = selectedAnswer === currentQuizData.questions[currentQuestion].correct;

    setAnswers([...answers, {
      question: currentQuestion,
      selected: selectedAnswer,
      correct: currentQuizData.questions[currentQuestion].correct,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < currentQuizData.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setQuizCompleted(true);

      // Log quiz completion activity
      if (user) {
        try {
          await logActivity(user, {
            type: 'quiz',
            title: currentQuizData.title,
            score: `${Math.round(((score + (isCorrect ? 1 : 0)) / currentQuizData.questions.length) * 100)}%`
          });
        } catch (error) {
          console.error("Failed to log quiz activity:", error);
        }
      }
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setAnswers([]);
    setSelectedAnswer('');
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
      green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
      purple: "from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
      pink: "from-pink-500 to-pink-600 hover:from-pink-600 to-pink-700"
    };
    return colors[color] || colors.blue;
  };

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <BookOpen className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Learning Quiz</h1>
            <p className="text-gray-600">Choose a quiz to test your knowledge!</p>
          </div>

          <div className="grid gap-4">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4">Generate Quiz with AI</h3>
              <div className="grid gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="p-2 rounded text-black"
                />
                <input
                  type="text"
                  placeholder="Topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="p-2 rounded text-black"
                />
                <input
                  type="text"
                  placeholder="Level (Easy, Medium, Hard)"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="p-2 rounded text-black"
                />
              </div>
              <button
                onClick={handleGenerateQuiz}
                disabled={loading}
                className="w-full bg-white text-pink-600 font-bold py-2 rounded hover:bg-gray-100 transition"
              >
                {loading ? 'Generating...' : 'Generate Quiz'}
              </button>
            </div>

            {Object.entries(quizzes).map(([key, quiz]) => (
              <button
                key={key}
                onClick={() => selectQuiz(key)}
                className={`bg-gradient-to-r ${getColorClasses(quiz.color || 'pink')} text-white p-6 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg`}
              >
                <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
                <p className="text-white/90">
                  10 Questions • {key.includes('generated') ? 'AI Generated Quiz' : `Test your ${quiz.title.split(' ')[0].toLowerCase()} knowledge`}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentQuizData = quizzes[selectedQuiz];

  if (quizCompleted) {
    const percentage = Math.round((score / currentQuizData.questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          <div className="text-center mb-8">
            <Trophy className={`w-16 h-16 mx-auto mb-4 ${percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'}`} />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Completed!</h2>
            <div className="text-6xl font-bold text-indigo-600 mb-2">{score}/{currentQuizData.questions.length}</div>
            <div className={`text-2xl font-semibold ${percentage >= 70 ? 'text-green-600' : 'text-red-600'}`}>
              {percentage}%
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Review Answers:</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {answers.map((answer, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div className="text-sm">
                    <span className="font-medium">Q{index + 1}:</span> {answer.selected}
                    {!answer.isCorrect && <span className="text-green-600 ml-2">(Correct: {answer.correct})</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetQuiz}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Another Quiz
            </button>
            <button
              onClick={() => selectQuiz(selectedQuiz)}
              className={`flex-1 bg-gradient-to-r ${getColorClasses(currentQuizData.color)} text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300`}
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-200 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{currentQuizData.title}</h2>
          <div className="text-lg font-semibold text-indigo-600">
            {currentQuestion + 1}/{currentQuizData.questions.length}
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / currentQuizData.questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            {currentQuizData.questions[currentQuestion].q}
          </h3>

          <div className="space-y-3">
            {currentQuizData.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => selectAnswer(option)}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ${
                  selectedAnswer === option
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50'
                }`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={nextQuestion}
          disabled={!selectedAnswer}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-300 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300"
        >
          {currentQuestion + 1 === currentQuizData.questions.length ? 'Finish Quiz' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
