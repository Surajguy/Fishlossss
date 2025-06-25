import React from 'react'
import { motion } from 'framer-motion'
import { Fish, MapPin, Calendar, Clock, Edit, Trash2 } from 'lucide-react'
import { format } from 'date-fns'

interface CatchListProps {
  viewMode: 'list' | 'grid'
}

const mockCatches = [
  {
    id: 1,
    species: 'Largemouth Bass',
    weight: 3.2,
    length: 18.5,
    bait: 'Spinnerbait',
    location: 'Lake Michigan',
    date: new Date('2024-01-15'),
    time: '07:30',
    weather: 'Partly Cloudy',
    notes: 'Great fight! Caught near fallen log structure.',
    photo: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=200&fit=crop&crop=center',
  },
  {
    id: 2,
    species: 'Rainbow Trout',
    weight: 1.8,
    length: 14.2,
    bait: 'PowerBait',
    location: 'Pine Creek',
    date: new Date('2024-01-12'),
    time: '06:15',
    weather: 'Overcast',
    notes: 'Beautiful colors on this one. Released after photo.',
    photo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center',
  },
  {
    id: 3,
    species: 'Northern Pike',
    weight: 4.5,
    length: 22.0,
    bait: 'Live Minnow',
    location: 'Cedar Lake',
    date: new Date('2024-01-10'),
    time: '16:45',
    weather: 'Sunny',
    notes: 'Aggressive strike! Had to use steel leader.',
    photo: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=200&fit=crop&crop=center',
  },
]

export default function CatchList({ viewMode }: CatchListProps) {
  if (viewMode === 'grid') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {mockCatches.map((catch_, index) => (
          <motion.div
            key={catch_.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card overflow-hidden"
          >
            <img
              src={catch_.photo}
              alt={catch_.species}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {catch_.species}
                </h3>
                <span className="text-sm font-medium text-primary-600">
                  {catch_.weight} lbs
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{catch_.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{format(catch_.date, 'MMM d, yyyy')}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {catch_.bait}
                </span>
                <div className="flex space-x-2">
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Edit className="h-4 w-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="card"
    >
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {mockCatches.map((catch_, index) => (
          <motion.div
            key={catch_.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <img
                src={catch_.photo}
                alt={catch_.species}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {catch_.species}
                  </h3>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-primary-600">
                      {catch_.weight} lbs • {catch_.length}"
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Edit className="h-4 w-4 text-gray-500" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{catch_.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(catch_.date, 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{catch_.time}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded-full">
                      {catch_.bait}
                    </span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                      {catch_.weather}
                    </span>
                  </div>
                </div>
                
                {catch_.notes && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    {catch_.notes}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}