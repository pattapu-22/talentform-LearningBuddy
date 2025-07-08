import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { logActivity } from '../utils/logActivity';

const AIChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I\'m your Learning Buddy AI. Ask me anything about your studies!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      //const res = await axios.post('http://localhost:5000/api/ask', { question: input });
            const res = await axios.post('https://talentform-backend.onrender.com', { question: input });

      const aiMessage = { id: Date.now() + 1, type: 'ai', text: res.data.answer };
      setMessages(prev => [...prev, aiMessage]);

      // ✅ Log AI chat activity
      if (user) {
        try {
          await logActivity(user, {
            type: "ai-chat",
            title: input,
          });
        } catch (error) {
          console.error("Failed to log AI chat activity:", error);
        }
      }

    } catch (error) {
      console.error(error);
      const aiMessage = { id: Date.now() + 1, type: 'ai', text: 'Sorry, something went wrong.' };
      setMessages(prev => [...prev, aiMessage]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen from-blue-50 to-indigo-100 flex justify-center">
      <div className="flex flex-col w-full max-w-5xl h-screen px-2 md:px-4">

        {/* Chat messages area */}
        <div className="flex-1 bg-white border rounded-lg shadow-md overflow-y-auto p-4 mb-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex mb-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-2 max-w-full">
                {message.type === 'ai' && (
                  <div className="bg-blue-500 p-2 rounded-full">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl break-words whitespace-pre-wrap ${
                    message.type === 'user'
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-gray-100 text-gray-800 shadow-sm rounded-bl-md'
                  }`}
                >
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </div>
                {message.type === 'user' && (
                  <div className="bg-gray-500 p-2 rounded-full">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="flex items-start gap-2">
                <div className="bg-blue-500 p-2 rounded-full">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input area - fixed at bottom */}
        <div className="bg-white border-t shadow-sm">
          <div className="flex gap-2 p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your studies..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIChatPage;
