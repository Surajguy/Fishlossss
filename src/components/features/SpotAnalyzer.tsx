import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Camera, Upload, Zap, MapPin, Eye } from 'lucide-react'

export default function SpotAnalyzer() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setAnalysis(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeSpot = async () => {
    if (!selectedImage) return
    
    setLoading(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysis(
        "🎯 **Prime Fishing Spot Detected!**\n\n" +
        "**Structure Analysis:**\n" +
        "• Fallen log provides excellent cover for bass\n" +
        "• Shallow water transitions to deeper channel\n" +
        "• Overhanging vegetation creates shade\n\n" +
        "**Recommendations:**\n" +
        "• Cast near the log structure using soft plastics\n" +
        "• Try topwater lures in early morning\n" +
        "• Focus on the shaded areas during midday\n\n" +
        "**Best Times:** Dawn (6-8 AM) and Dusk (6-8 PM)\n" +
        "**Confidence Score:** 8.5/10"
      )
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          AI Spot Analyzer
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Upload a photo of your fishing spot and get AI-powered recommendations 
          on where to cast, what bait to use, and the best fishing techniques.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Upload Fishing Spot Photo
          </h2>
          
          <div className="space-y-4">
            {!selectedImage ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-primary-500 transition-colors"
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Fishing spot"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null)
                    setAnalysis(null)
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            
            <div className="flex space-x-3">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary flex-1"
              >
                <Camera className="h-4 w-4 mr-2" />
                Choose Photo
              </button>
              
              {selectedImage && (
                <button
                  onClick={analyzeSpot}
                  disabled={loading}
                  className="btn-primary flex-1 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Analyze Spot
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Analysis Results */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            AI Analysis Results
          </h2>
          
          {!analysis ? (
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Upload a photo to get AI-powered fishing recommendations
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                <div className="whitespace-pre-line text-sm text-gray-700 dark:text-gray-300">
                  {analysis}
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="btn-primary flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  Save Location
                </button>
                <button className="btn-secondary">
                  Share Results
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Photography Tips for Better Analysis
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Camera className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Clear Water View</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Capture the water surface and any visible underwater structure
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <MapPin className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Include Shoreline</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Show vegetation, rocks, and other shoreline features
            </p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Eye className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">Good Lighting</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Take photos during daylight for best structure visibility
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}