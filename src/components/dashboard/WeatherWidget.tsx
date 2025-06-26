import React from 'react'
import { motion } from 'framer-motion'
import { CloudSun, Droplets, Wind, Thermometer } from 'lucide-react'

export default function WeatherWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="card p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          Current Conditions
        </h2>
        <CloudSun className="h-5 w-5 text-accent-orange" />
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-white mb-1">
            72°F
          </div>
          <div className="text-sm text-gray-400">
            Partly Cloudy
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-white">
                8 mph
              </div>
              <div className="text-xs text-gray-500">Wind</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Droplets className="h-4 w-4 text-gray-500" />
            <div>
              <div className="text-sm font-medium text-white">
                65%
              </div>
              <div className="text-xs text-gray-500">Humidity</div>
            </div>
          </div>
        </div>
        
        <div className="bg-accent-green rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold">Bite Score</div>
              <div className="text-sm opacity-90">Excellent conditions</div>
            </div>
            <div className="text-2xl font-bold">8.5</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}