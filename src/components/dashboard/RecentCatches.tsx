import React from 'react'
import { motion } from 'framer-motion'
import { Fish, MapPin, Calendar } from 'lucide-react'
import { format } from 'date-fns'

const recentCatches = [
  {
    id: 1,
    species: 'Largemouth Bass',
    location: 'Lake Michigan',
    date: new Date('2024-01-15'),
    size: '3.2 lbs',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: 2,
    species: 'Rainbow Trout',
    location: 'Pine Creek',
    date: new Date('2024-01-12'),
    size: '1.8 lbs',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center',
  },
  {
    id: 3,
    species: 'Northern Pike',
    location: 'Cedar Lake',
    date: new Date('2024-01-10'),
    size: '4.5 lbs',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop&crop=center',
  },
]

export default function RecentCatches() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Catches
        </h2>
        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
          View all
        </button>
      </div>
      
      <div className="space-y-4">
        {recentCatches.map((catch_, index) => (
          <motion.div
            key={catch_.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <img
              src={catch_.image}
              alt={catch_.species}
              className="w-12 h-12 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Fish className="h-4 w-4 text-primary-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {catch_.species}
                </span>
                <span className="text-sm text-gray-500">
                  {catch_.size}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{catch_.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>{format(catch_.date, 'MMM d')}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}