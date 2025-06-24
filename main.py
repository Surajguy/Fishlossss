from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import json
import os
from ai_image import analyze_fishing_spot
from catch_logger import CatchLogger
from forecast import get_fishing_forecast

app = FastAPI(title="Fishing Assistant API")

# Initialize catch logger
catch_logger = CatchLogger()

class CatchEntry(BaseModel):
    species: str
    bait: str
    location: str
    date: str
    time: str
    notes: Optional[str] = ""

class ForecastRequest(BaseModel):
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None

@app.get("/", response_class=HTMLResponse)
def read_root():
    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Fishing Assistant</title>
        <style>
            body { font-family: Arial, sans-serif; max-width: 1200px; margin: 0 auto; padding: 20px; }
            .container { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .section { border: 1px solid #ddd; padding: 20px; border-radius: 8px; }
            .full-width { grid-column: 1 / -1; }
            input, select, textarea, button { width: 100%; padding: 10px; margin: 5px 0; box-sizing: border-box; }
            button { background-color: #4CAF50; color: white; border: none; cursor: pointer; }
            button:hover { background-color: #45a049; }
            .result { background-color: #f9f9f9; padding: 15px; margin-top: 15px; border-radius: 5px; }
            #catchList { max-height: 300px; overflow-y: auto; }
            .catch-entry { border-bottom: 1px solid #eee; padding: 10px 0; }
        </style>
    </head>
    <body>
        <h1>🎣 Fishing Assistant</h1>
        
        <div class="container">
            <div class="section">
                <h2>📸 Spot Analysis</h2>
                <form id="imageForm" enctype="multipart/form-data">
                    <input type="file" id="imageFile" accept="image/*" required>
                    <button type="submit">Analyze Fishing Spot</button>
                </form>
                <div id="imageResult" class="result" style="display:none;"></div>
            </div>
            
            <div class="section">
                <h2>🌤️ Fishing Forecast</h2>
                <form id="forecastForm">
                    <input type="text" id="location" placeholder="Enter location (e.g., Lake Michigan)" required>
                    <button type="submit">Get Forecast</button>
                </form>
                <div id="forecastResult" class="result" style="display:none;"></div>
            </div>
            
            <div class="section">
                <h2>📝 Log Your Catch</h2>
                <form id="catchForm">
                    <input type="text" id="species" placeholder="Fish species" required>
                    <input type="text" id="bait" placeholder="Bait used" required>
                    <input type="text" id="catchLocation" placeholder="Location" required>
                    <input type="date" id="date" required>
                    <input type="time" id="time" required>
                    <textarea id="notes" placeholder="Additional notes (optional)" rows="3"></textarea>
                    <button type="submit">Log Catch</button>
                </form>
                <div id="catchResult" class="result" style="display:none;"></div>
            </div>
            
            <div class="section">
                <h2>🐟 Your Catch History</h2>
                <button onclick="loadCatches()">Refresh Catch List</button>
                <div id="catchList" class="result"></div>
            </div>
        </div>

        <script>
            // Set current date and time
            document.getElementById('date').value = new Date().toISOString().split('T')[0];
            document.getElementById('time').value = new Date().toTimeString().split(' ')[0].slice(0,5);

            // Image analysis
            document.getElementById('imageForm').onsubmit = async function(e) {
                e.preventDefault();
                const formData = new FormData();
                formData.append('file', document.getElementById('imageFile').files[0]);
                
                try {
                    const response = await fetch('/analyze', {
                        method: 'POST',
                        body: formData
                    });
                    const result = await response.json();
                    document.getElementById('imageResult').style.display = 'block';
                    document.getElementById('imageResult').innerHTML = '<strong>Recommendation:</strong> ' + result.recommendation;
                } catch (error) {
                    document.getElementById('imageResult').style.display = 'block';
                    document.getElementById('imageResult').innerHTML = '<strong>Error:</strong> ' + error.message;
                }
            };

            // Fishing forecast
            document.getElementById('forecastForm').onsubmit = async function(e) {
                e.preventDefault();
                const location = document.getElementById('location').value;
                
                try {
                    const response = await fetch('/forecast', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({location: location})
                    });
                    const result = await response.json();
                    document.getElementById('forecastResult').style.display = 'block';
                    document.getElementById('forecastResult').innerHTML = 
                        '<strong>Bite Score:</strong> ' + result.bite_score + '/10<br>' +
                        '<strong>Conditions:</strong> ' + result.conditions + '<br>' +
                        '<strong>Best Times:</strong> ' + result.best_times.join(', ');
                } catch (error) {
                    document.getElementById('forecastResult').style.display = 'block';
                    document.getElementById('forecastResult').innerHTML = '<strong>Error:</strong> ' + error.message;
                }
            };

            // Log catch
            document.getElementById('catchForm').onsubmit = async function(e) {
                e.preventDefault();
                const catchData = {
                    species: document.getElementById('species').value,
                    bait: document.getElementById('bait').value,
                    location: document.getElementById('catchLocation').value,
                    date: document.getElementById('date').value,
                    time: document.getElementById('time').value,
                    notes: document.getElementById('notes').value
                };
                
                try {
                    const response = await fetch('/catches', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(catchData)
                    });
                    const result = await response.json();
                    document.getElementById('catchResult').style.display = 'block';
                    document.getElementById('catchResult').innerHTML = '<strong>Success:</strong> ' + result.message;
                    document.getElementById('catchForm').reset();
                    document.getElementById('date').value = new Date().toISOString().split('T')[0];
                    document.getElementById('time').value = new Date().toTimeString().split(' ')[0].slice(0,5);
                    loadCatches();
                } catch (error) {
                    document.getElementById('catchResult').style.display = 'block';
                    document.getElementById('catchResult').innerHTML = '<strong>Error:</strong> ' + error.message;
                }
            };

            // Load catches
            async function loadCatches() {
                try {
                    const response = await fetch('/catches');
                    const catches = await response.json();
                    const catchList = document.getElementById('catchList');
                    
                    if (catches.length === 0) {
                        catchList.innerHTML = '<p>No catches logged yet. Start fishing!</p>';
                    } else {
                        catchList.innerHTML = catches.map(catch_ => 
                            '<div class="catch-entry">' +
                            '<strong>' + catch_.species + '</strong> caught on ' + catch_.date + ' at ' + catch_.time + '<br>' +
                            '<small>Location: ' + catch_.location + ' | Bait: ' + catch_.bait + '</small>' +
                            (catch_.notes ? '<br><small>Notes: ' + catch_.notes + '</small>' : '') +
                            '</div>'
                        ).join('');
                    }
                } catch (error) {
                    document.getElementById('catchList').innerHTML = '<p>Error loading catches: ' + error.message + '</p>';
                }
            }

            // Load catches on page load
            loadCatches();
        </script>
    </body>
    </html>
    """

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        recommendation = analyze_fishing_spot(image_bytes)
        return JSONResponse(content={"recommendation": recommendation})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/catches")
async def log_catch(catch_entry: CatchEntry):
    try:
        result = catch_logger.add_catch(catch_entry.dict())
        return {"message": f"Catch logged successfully! Total catches: {len(catch_logger.get_all_catches())}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/catches")
async def get_catches():
    try:
        catches = catch_logger.get_all_catches()
        return catches
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/forecast")
async def fishing_forecast(request: ForecastRequest):
    try:
        forecast = get_fishing_forecast(request.location, request.latitude, request.longitude)
        return forecast
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
