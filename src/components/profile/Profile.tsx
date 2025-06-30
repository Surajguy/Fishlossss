import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Settings, Camera, Trophy, MapPin, Calendar, Fish } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useTheme } from '../../contexts/ThemeContext'

export default function Profile() {
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('profile')

  const achievements = [
    { name: 'First Catch', description: 'Logged your first catch', icon: Fish, earned: true },
    { name: 'Big Fish', description: 'Caught a fish over 5 lbs', icon: Trophy, earned: true },
    { name: 'Explorer', description: 'Fished at 10 different locations', icon: MapPin, earned: false },
    { name: 'Consistent Angler', description: 'Logged catches for 30 days', icon: Calendar, earned: false },
  ]

  const stats = [
    { label: 'Total Catches', value: '24', change: '+3 this week' },
    { label: 'Favorite Species', value: 'Bass', change: '8 catches' },
    { label: 'Best Month', value: 'September', change: '12 catches' },
    { label: 'Success Rate', value: '68%', change: '+5% this month' },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {user?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {user?.email}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Member since January 2024</span>
              <span>•</span>
              <span>24 catches logged</span>
            </div>
          </div>
          
          <button className="btn-secondary">
            <Settings className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
        {[
          { id: 'profile', label: 'Profile', icon: User },
          { id: 'stats', label: 'Statistics', icon: Trophy },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'profile' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Profile Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={user?.name || ''}
                  className="input-field"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  className="input-field"
                  readOnly
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Favorite Fishing Spot
                </label>
                <input
                  type="text"
                  placeholder="Lake Michigan"
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Experience Level
                </label>
                <select className="input-field">
                  <option>Intermediate</option>
                  <option>Beginner</option>
                  <option>Advanced</option>
                  <option>Expert</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Bio
              </label>
              <textarea
                className="input-field"
                rows={4}
                placeholder="Tell us about your fishing journey..."
              />
            </div>
            
            <div className="mt-6">
              <button className="btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-4"
                >
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    {stat.change}
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Fishing Activity
              </h3>
              <div className="h-64 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Activity chart would go here
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 ${
                    achievement.earned
                      ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      achievement.earned
                        ? 'bg-green-100 dark:bg-green-900/30'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                      <achievement.icon className={`h-6 w-6 ${
                        achievement.earned
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-medium ${
                        achievement.earned
                          ? 'text-green-900 dark:text-green-100'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className={`text-sm ${
                        achievement.earned
                          ? 'text-green-700 dark:text-green-300'
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {achievement.description}
                      </p>
                    </div>
                    
                    {achievement.earned && (
                      <div className="text-green-600 dark:text-green-400">
                        ✓
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Settings
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Toggle between light and dark themes
                  </p>
                </div>
                <button
                  onClick={toggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    theme === 'dark' ? 'bg-primary-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Receive fishing forecasts and tips via email
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Location Services
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Allow location access for better forecasts
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Private Profile
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Keep your catches and profile private
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}