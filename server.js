// Node.js server disabled for Python testing
// Uncomment the code below to re-enable the Node.js server

/*
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('dist'));

// Configure multer for file uploads
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Mock data storage
let catches = [
  {
    id: 1,
    species: "Largemouth Bass",
    weight: 3.2,
    length: 18.5,
    bait: "Spinnerbait",
    location: "Lake Michigan",
    date: "2024-01-15",
    time: "07:30",
    weather: "Partly Cloudy",
    notes: "Great fight! Caught near fallen log structure.",
    logged_at: new Date().toISOString()
  },
  {
    id: 2,
    species: "Rainbow Trout",
    weight: 1.8,
    length: 14.2,
    bait: "PowerBait",
    location: "Pine Creek",
    date: "2024-01-12",
    time: "06:15",
    weather: "Overcast",
    notes: "Beautiful colors on this one. Released after photo.",
    logged_at: new Date().toISOString()
  }
];

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>FishCast API</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 20px;
                background-color: #1a1a1a;
                color: #ffffff;
            }
            .endpoint { 
                border: 1px solid #333; 
                padding: 15px; 
                margin: 10px 0; 
                border-radius: 8px;
                background-color: #2a2a2a;
            }
            .method { 
                background-color: #ff6b35; 
                color: white; 
                padding: 4px 8px; 
                border-radius: 4px; 
                font-size: 12px;
                font-weight: bold;
            }
            h1 { color: #ff6b35; }
            h2 { color: #ffffff; }
        </style>
    </head>
    <body>
        <h1>🎣 FishCast API</h1>
        <p>Node.js fishing assistant backend</p>
        
        <h2>Available Endpoints:</h2>
        
        <div class="endpoint">
            <span class="method">POST</span>
            <strong>/api/analyze</strong>
            <p>Upload a fishing spot image for AI analysis</p>
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span>
            <strong>/api/catches</strong>
            <p>Log a new fishing catch</p>
        </div>
        
        <div class="endpoint">
            <span class="method">GET</span>
            <strong>/api/catches</strong>
            <p>Get all logged catches</p>
        </div>
        
        <div class="endpoint">
            <span class="method">POST</span>
            <strong>/api/forecast</strong>
            <p>Get fishing forecast for a location</p>
        </div>
        
        <p><strong>Status:</strong> ✅ Node.js server running on port ${port}</p>
    </body>
    </html>
  `);
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', service: 'FishCast Node.js API' });
});

// Image analysis endpoint
app.post('/api/analyze', upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No image file provided' });
    }

    // Mock AI analysis response
    const analysis = `**Structure Analysis**: This appears to be a shallow cove with visible vegetation and fallen timber. The water clarity suggests good visibility for sight fishing.

**Fish Habitat Assessment**: Excellent habitat for bass, bluegill, and possibly northern pike. The structure provides cover and ambush points.

**Casting Recommendations**: 
- Cast parallel to the fallen log structure
- Target the weed edges in 3-6 feet of water
- Focus on shaded areas during midday

**Bait/Lure Suggestions**: 
- Spinnerbaits for covering water quickly
- Soft plastics for working structure slowly
- Topwater lures during dawn/dusk

**Technique Tips**: 
- Use a slow, steady retrieve near structure
- Vary your presentation depth
- Be patient around cover

**Best Times**: Early morning (6-8 AM) and evening (6-8 PM) when fish are most active.

**Confidence Score**: 8/10 - Excellent fishing potential with multiple species likely present.`;

    res.json({
      success: true,
      recommendation: analysis,
      filename: req.file.originalname
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Analysis failed: ' + error.message
    });
  }
});

// Get all catches
app.get('/api/catches', (req, res) => {
  res.json(catches.sort((a, b) => new Date(b.date) - new Date(a.date)));
});

// Log new catch
app.post('/api/catches', (req, res) => {
  try {
    const catchData = {
      ...req.body,
      id: Date.now(),
      logged_at: new Date().toISOString()
    };
    
    catches.push(catchData);
    
    res.json({
      message: `Catch logged successfully! Total catches: ${catches.length}`,
      catch: catchData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fishing forecast
app.post('/api/forecast', (req, res) => {
  try {
    const { location } = req.body;
    
    // Mock forecast data
    const forecast = {
      location: location || 'Unknown Location',
      forecast_date: new Date().toISOString().split('T')[0],
      bite_score: 8.5,
      activity_level: 'Excellent',
      conditions: 'Partly cloudy with light winds',
      moon_phase: 'Waxing Gibbous',
      best_times: ['6:00-8:00 AM', '6:30-8:30 PM'],
      recommendations: 'Prime fishing conditions! Fish are likely to be very active.',
      water_temp: '68°F',
      barometric_pressure: '30.15 inHg'
    };
    
    res.json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, error: 'File too large' });
    }
  }
  res.status(500).json({ success: false, error: error.message });
});

app.listen(port, () => {
  console.log(`🎣 FishCast API server running on http://localhost:${port}`);
  console.log('Available endpoints:');
  console.log('  GET  / - API documentation');
  console.log('  POST /api/analyze - Analyze fishing spot');
  console.log('  GET  /api/catches - Get catches');
  console.log('  POST /api/catches - Log new catch');
  console.log('  POST /api/forecast - Get fishing forecast');
  console.log('  GET  /health - Health check');
});
*/

console.log("Node.js server disabled for Python testing");
console.log("Run 'python openrouter.py' to test your OpenRouter setup");