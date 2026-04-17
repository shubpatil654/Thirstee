'use client'

import { useState, createContext, useContext } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Package, 
  Image as ImageIcon, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  FileText,
  Star,
  Globe,
  User,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react'

// Auth Context
const AuthContext = createContext<{
  isLoggedIn: boolean
  login: (username: string, password: string) => boolean
  logout: () => void
}>({
  isLoggedIn: false,
  login: () => false,
  logout: () => {}
})

export const useAuth = () => useContext(AuthContext)

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  })

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'thirstee2024') {
      setIsLoggedIn(true)
      return true
    }
    return false
  }

  const logout = () => {
    setIsLoggedIn(false)
    setLoginData({ username: '', password: '' })
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!login(loginData.username, loginData.password)) {
      alert('Invalid credentials. Please check your username and password.')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Admin Login
            </h1>
            <p className="text-gray-600">
              Access the THIRSTEE Content Management System
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In to CMS
            </motion.button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </AuthContext.Provider>
  )
}

export default AdminLayout