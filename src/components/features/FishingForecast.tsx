import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { CloudSun, MapPin, Calendar, TrendingUp, Wind, Droplets, Thermometer, Moon } from 'lucide-react'

export default function FishingForecast() {
  const [location, setLocation] = useState('Lake Michigan')
  const [forecast, setForecast] = useState({
    biteScore: 8.5,
    activityLevel: 'Excellent',
    conditions: 'Partly cloudy with light winds',
    moonPhase: 'Waxing Gibbous',
    bestTimes: ['6:00-8:00 AM', '6:30-8:30 PM'],
    recommendations: 'Prime fishing conditions! Fish are likely to be very active. Try topwater lures during dawn and dusk.',
    waterTemp: '68°F',
    barometricPressure: '30.15 inHg',
    windSpeed: '8 mph',
    humidity: '65%',
    temperature: '72°F'
  })

  const weeklyForecast = [
    { day: 'Today', score: 8.5, weather: 'Partly Cloudy', temp: '72°F' },
    { day: 'Tomorrow', score: 7.2, weather: 'Sunny', temp: '75°F' },
    { day: 'Wednesday', score: 6.8, weather: 'Overcast', temp: '69°F' },
    { day: 'Thursday', score: 9.1, weather: 'Light Rain', temp: '66°F' },
    { day: 'Friday', score: 8.3, weather: 'Partly Cloudy', temp: '71°F' },
    { day: 'Saturday', score: 7.9, weather: 'Sunny', temp: '74°F' },
    { day: 'Sunday', score: 6.5, weather: 'Windy', temp: '70°F' },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'from-green-500 to-green-600'
    if (score >= 6) return 'from-yellow-500 to-yellow-600'
    return 'from-red-500 to-red-600'
  }

  const getScoreText = (score: number) => {
    if (score >= 8) return 'Excellent'
    if (score >= 6) return 'Good'
    return 'Fair'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Fishing Forecast
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Get personalized fishing predictions based on weather, moon phases, 
          and environmental conditions to maximize your success on the water.
        </p>
      </motion.div>

      {/* Location Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fishing Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field pl-10"
                placeholder="Enter lake, river, or fishing spot"
              />
            </div>
          </div>
          <button className="btn-primary mt-6">
            Update Forecast
          </button>
        </div>
      </motion.div>

      {/* Current Conditions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bite Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="text-center">
            <div className={`w-24 h-24 bg-gradient-to-r ${getScoreColor(forecast.biteScore)} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <span className="text-2xl font-bold text-white">
                {forecast.biteScore}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Bite Score
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {getScoreText(forecast.biteScore)} conditions
            </p>
          </div>
        </motion.div>

        {/* Weather Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Current Conditions
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Thermometer className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Temperature</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {forecast.temperature}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Wind</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {forecast.windSpeed}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Droplets className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Humidity</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {forecast.humidity}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Moon className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Moon Phase</span>
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {forecast.moonPhase}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Best Times */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Best Fishing Times
          </h3>
          
          <div className="space-y-3">
            {forecast.bestTimes.map((time, index) => (
              <div
                key={index}
                className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 text-center"
              >
                <span className="text-primary-700 dark:text-primary-400 font-medium">
                  {time}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Water Temperature: <span className="font-medium">{forecast.waterTemp}</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI Recommendations
        </h3>
        
        <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-gray-700 dark:text-gray-300">
            {forecast.recommendations}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <CloudSun className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Weather Impact</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Stable pressure and light winds create ideal conditions
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Moon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Moon Phase</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Waxing gibbous increases fish activity levels
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Activity Level</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fish are expected to be highly active today
            </p>
          </div>
        </div>
      </motion.div>

      {/* Weekly Forecast */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          7-Day Forecast
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {weeklyForecast.map((day, index) => (
            <div
              key={index}
              className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                {day.day}
              </div>
              
              <div className={`w-12 h-12 bg-gradient-to-r ${getScoreColor(day.score)} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <span className="text-sm font-bold text-white">
                  {day.score}
                </span>
              </div>
              
              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {day.weather}
              </div>
              
              <div className="text-xs font-medium text-gray-900 dark:text-white">
                {day.temp}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}