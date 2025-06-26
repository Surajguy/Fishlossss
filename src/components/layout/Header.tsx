import React from 'react'
import { motion } from 'framer-motion'
import { Bell, Moon, Sun, Menu } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../contexts/ThemeContext'

export default function Header() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-800">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-800">
              <Menu className="h-5 w-5 text-gray-400" />
            </button>
            <h1 className="ml-2 md:ml-0 text-2xl font-bold text-white">
              Good morning, {user?.name?.split(' ')[0]}!
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5 text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-400" />
              )}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors relative"
            >
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-accent-orange rounded-full"></span>
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
            >
              <img
                src={user?.avatar}
                alt={user?.name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-300">
                {user?.name}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  )
}