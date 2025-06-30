import React from 'react'
import { motion } from 'framer-motion'
import { Camera, BookOpen, CloudSun, TrendingUp, Fish, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import QuickStats from './QuickStats'
import RecentCatches from './RecentCatches'
import WeatherWidget from './WeatherWidget'

const quickActions = [
  {
    name: 'Analyze Spot',
    description: 'Upload a photo to get AI-powered fishing recommendations',
    icon: Camera,
    href: '/spot-analyzer',
    color: 'bg-accent-blue',
  },
  {
    name: 'Log Catch',
    description: 'Record your latest catch with details and photos',
    icon: BookOpen,
    href: '/catch-log',
    color: 'bg-accent-green',
  },
  {
    name: 'Check Forecast',
    description: 'Get personalized fishing conditions and bite predictions',
    icon: CloudSun,
    href: '/forecast',
    color: 'bg-accent-orange',
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Ready to catch some fish?
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Your smart fishing assistant is here to help you find the best spots, 
          track your catches, and predict the perfect fishing conditions.
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <motion.div
            key={action.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={action.href}>
              <div className="card p-6 hover:scale-105 transition-transform cursor-pointer">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {action.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {action.description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats and Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <QuickStats />
        </div>
        <div>
          <WeatherWidget />
        </div>
      </div>

      {/* Recent Activity */}
      <RecentCatches />
    </div>
  )
}