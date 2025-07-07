
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  BookOpen, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Target,
  Award,
  MessageCircle,
  FileQuestion,
  ChevronRight,
  Star,
  Zap,
  Quote
} from 'lucide-react';

import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = ({ user }) => {
  const [streak, setStreak] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setStreak(userData.streak || 0);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [user]);

  const quickActions = [
    {
      title: 'AI Tutor Chat',
      description: 'Get instant help with any topic',
      icon: MessageCircle,
      href: '/chat',
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Take Quiz',
      description: 'Test your knowledge',
      icon: FileQuestion,
      href: '/quiz',
      color: 'from-green-500 to-teal-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Study Materials',
      description: 'Browse learning resources',
      icon: BookOpen,
      href: '/materials',
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const tips = [
    {
      quote: "The beautiful thing about learning is that no one can take it away from you.",
      author: "B.B. King",
      gradient: "from-pink-100 to-pink-200"
    },
    {
      quote: "Learning never exhausts the mind.",
      author: "Leonardo da Vinci",
      gradient: "from-green-100 to-green-200"
    },
    {
      quote: "The expert in anything was once a beginner.",
      author: "Helen Hayes",
      gradient: "from-blue-100 to-blue-200"
    },
    {
      quote: "The more you learn, the more you earn.",
      author: "Warren Buffett",
      gradient: "from-yellow-100 to-yellow-200"
    },
    {
      quote: "Small progress each day adds up to big results.",
      author: "Unknown",
      gradient: "from-purple-100 to-purple-200"
    }
  ];

  // ✅ Auto-slide with infinite loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name || user?.displayName || 'Learner'}! 
            </h1>
            <p className="text-gray-600 mt-1">Ready to continue your learning journey?</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.href}
              className={`${action.bgColor} p-6 rounded-xl border border-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-r ${action.color} rounded-lg shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
              <p className="text-gray-600">{action.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Daily Motivation Slider Full Height */}
      <div className="relative overflow-hidden rounded-xl shadow-lg" style={{height: 'calc(100vh - 400px)'}}>
        <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-full flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br ${tip.gradient} mx-2`}
            >
              <Quote className="h-10 w-10 text-gray-400 mb-4" />
              <p className="text-xl italic text-gray-800 mb-4 max-w-xl">"{tip.quote}"</p>
              <p className="text-base font-medium text-gray-700 mb-4">– {tip.author}</p>
              
            </div>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {tips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full ${
                index === currentSlide ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
