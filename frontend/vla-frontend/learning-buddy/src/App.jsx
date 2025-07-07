
import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import AIChat from './pages/AIChat'
import Quiz from './pages/Quiz'
import About from './pages/About'
import Materials from './pages/Materials'
import Login from './pages/Login'
import Register from './pages/Register'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import app from './firebase' // make sure this points to your firebase.js file

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // Wait until auth state is known

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
    setUser(null)
  }

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {!user ? (
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login />} />
        </Routes>
      ) : (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          <div className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/about" element={<About/>} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  )
}

export default App
