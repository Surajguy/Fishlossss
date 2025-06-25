import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Fish, 
  Home, 
  Camera, 
  BookOpen, 
  CloudSun,
  User,
  Settings,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Spot Analyzer', href: '/spot-analyzer', icon: Camera },
  { name: 'Catch Log', href: '/catch-log', icon: BookOpen },
  { name: 'Forecast', href: '/forecast', icon: CloudSun },
  { name: 'Profile', href: '/profile', icon: User },
]

export default function Sidebar() {
  const { logout } = useAuth()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white dark:bg-gray-800 overflow-y-auto border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center flex-shrink-0 px-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center"
          >
            <div className="h-10 w-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <Fish className="h-6 w-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
              FishCast
            </span>
          </motion.div>
        </div>
        
        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      className={`mr-3 h-5 w-5 transition-colors ${
                        isActive ? 'text-white' : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                      }`}
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          
          <div className="px-2 pb-4">
            <button
              onClick={logout}
              className="group flex items-center w-full px-3 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}