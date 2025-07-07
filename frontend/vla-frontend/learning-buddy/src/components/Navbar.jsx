// import React, { useState, useEffect } from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { 
//   Home, 
//   MessageCircle, 
//   FileQuestion, 
//   BookOpen, 
//   User, 
//   LogOut, 
//   Menu, 
//   X,
//   GraduationCap
// } from 'lucide-react'
// import { getAuth } from 'firebase/auth'

// const Navbar = ({ user, onLogout }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [showProfileMenu, setShowProfileMenu] = useState(false)
//   const [userName, setUserName] = useState('User')
//   const location = useLocation()

//   useEffect(() => {
//     if (user?.name) {
//       setUserName(user.name)
//     } else {
//       const auth = getAuth()
//       const currentUser = auth.currentUser
//       if (currentUser?.displayName) {
//         setUserName(currentUser.displayName)
//       }
//     }
//   }, [user])

//   const navigation = [
//     { name: 'Dashboard', href: '/dashboard', icon: Home },
//     { name: 'AI Chat', href: '/chat', icon: MessageCircle },
//     { name: 'Quiz', href: '/quiz', icon: FileQuestion },
//     { name: 'Materials', href: '/materials', icon: BookOpen },
//   ]

//   const isActive = (path) => location.pathname === path

//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white border-opacity-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <Link to="/dashboard" className="flex items-center space-x-2">
//               <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
//                 <GraduationCap className="h-6 w-6 text-white" />
//               </div>
//               <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 Learning Buddy
//               </span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
//                     isActive(item.href)
//                       ? 'bg-white bg-opacity-20 text-blue-600 shadow-lg'
//                       : 'text-gray-700 hover:bg-white hover:bg-opacity-10 hover:text-blue-600'
//                   }`}
//                 >
//                   <Icon className="h-5 w-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//           </div>

//           {/* Profile Menu */}
//           <div className="flex items-center space-x-4">
//             <div className="relative">
//               <button
//                 onClick={() => setShowProfileMenu(!showProfileMenu)}
//                 className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
//                   <User className="h-5 w-5 text-white" />
//                 </div>
//                 <span className="hidden md:block text-gray-700 font-medium">
//                   {userName}
//                 </span>
//               </button>

//               {showProfileMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
//                   <div className="px-4 py-2 border-b border-gray-200">
//                     <p className="text-sm font-medium text-gray-900">{user?.name || userName}</p>
//                     <p className="text-xs text-gray-500">{user?.email}</p>
//                   </div>
//                   <button
//                     onClick={onLogout}
//                     className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
//                   >
//                     <LogOut className="h-4 w-4" />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-gray-700" />
//               ) : (
//                 <Menu className="h-6 w-6 text-gray-700" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white bg-opacity-95 backdrop-blur-lg border-t border-gray-200">
//           <div className="px-4 py-2 space-y-1">
//             {navigation.map((item) => {
//               const Icon = item.icon
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   onClick={() => setIsMenuOpen(false)}
//                   className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
//                     isActive(item.href)
//                       ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
//                       : 'text-gray-700 hover:bg-gray-50'
//                   }`}
//                 >
//                   <Icon className="h-5 w-5" />
//                   <span>{item.name}</span>
//                 </Link>
//               )
//             })}
//           </div>
//         </div>
//       )}

//       {/* Overlay for profile menu */}
//       {showProfileMenu && (
//         <div
//           className="fixed inset-0 z-40"
//           onClick={() => setShowProfileMenu(false)}
//         />
//       )}
//     </nav>
//   )
// }

// export default Navbar


import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  MessageCircle, 
  FileQuestion, 
  BookOpen, 
  User, 
  LogOut, 
  Menu, 
  X,
  GraduationCap,
  Info
} from 'lucide-react'
import { getAuth } from 'firebase/auth'

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [userName, setUserName] = useState('User')
  const location = useLocation()

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name)
    } else {
      const auth = getAuth()
      const currentUser = auth.currentUser
      if (currentUser?.displayName) {
        setUserName(currentUser.displayName)
      }
    }
  }, [user])

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'AI Chat', href: '/chat', icon: MessageCircle },
    { name: 'Quiz', href: '/quiz', icon: FileQuestion },
    { name: 'Materials', href: '/materials', icon: BookOpen },
    { name: 'About', href: '/about', icon: Info }, // ➕ Added About
  ]

  const isActive = (path) => location.pathname === path

  const renderNavItem = (item, isMobile = false) => {
    const Icon = item.icon
    const activeStyles = isActive(item.href)
      ? isMobile
        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
        : 'bg-white bg-opacity-20 text-blue-600 shadow-lg'
      : isMobile
        ? 'text-gray-700 hover:bg-gray-50'
        : 'text-gray-700 hover:bg-white hover:bg-opacity-10 hover:text-blue-600'

    return (
      <Link
        key={item.name}
        to={item.href}
        onClick={() => isMobile && setIsMenuOpen(false)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeStyles}`}
      >
        <Icon className="h-5 w-5" />
        <span>{item.name}</span>
      </Link>
    )
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white border-opacity-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Learning Buddy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => renderNavItem(item))}
          </div>

          {/* Profile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <span className="hidden md:block text-gray-700 font-medium">
                  {userName}
                </span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user?.name || userName}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white bg-opacity-95 backdrop-blur-lg border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => renderNavItem(item, true))}
          </div>
        </div>
      )}

      {/* Overlay for profile menu */}
      {showProfileMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileMenu(false)}
        />
      )}
    </nav>
  )
}

export default Navbar
