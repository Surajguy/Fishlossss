import React from 'react'
import { motion } from 'framer-motion'
import { Fish, TrendingUp, MapPin, Calendar } from 'lucide-react'

const stats = [
  {
    name: 'Total Catches',
    value: '24',
    change: '+12%',
    changeType: 'increase',
    icon: Fish,
  },
  {
    name: 'This Month',
    value: '8',
    change: '+3',
    changeType: 'increase',
    icon: Calendar,
  },
  {
    name: 'Favorite Spot',
    value: 'Lake Michigan',
    change: '6 catches',
    changeType: 'neutral',
    icon: MapPin,
  },
  {
    name: 'Success Rate',
    value: '68%',
    change: '+5%',
    changeType: 'increase',
    icon: TrendingUp,
  },
]

export default function QuickStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card p-6"
    >
      <h2 className="text-lg font-semibold text-white mb-6">
        Your Fishing Stats
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-gray-700/50 rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="h-5 w-5 text-accent-orange" />
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                stat.changeType === 'increase' 
                  ? 'text-accent-green bg-green-900/30'
                  : 'text-gray-400 bg-gray-800'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-400">
              {stat.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}