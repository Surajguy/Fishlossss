import json
import os
import base64
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import cgi
from datetime import datetime

class FishingHandler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
    
    def do_OPTIONS(self):
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()
    
    def do_GET(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html')
            self._set_cors_headers()
            self.end_headers()
            
            html = """
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
                <p>Simple Python fishing assistant backend</p>
                
                <h2>Available Endpoints:</h2>
                
                <div class="endpoint">
                    <span class="method">POST</span>
                    <strong>/api/analyze</strong>
                    <p>Upload a fishing spot image for analysis (mock response)</p>
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
                
                <p><strong>Status:</strong> ✅ Simple Python server running</p>
            </body>
            </html>
            """
            self.wfile.write(html.encode())
            
        elif parsed_path.path == '/api/catches':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            
            # Mock catches data
            catches = [
                {
                    "id": 1,
                    "species": "Largemouth Bass",
                    "weight": 3.2,
                    "location": "Lake Michigan",
                    "date": "2024-01-15",
                    "bait": "Spinnerbait"
                },
                {
                    "id": 2,
                    "species": "Rainbow Trout",
                    "weight": 1.8,
                    "location": "Pine Creek",
                    "date": "2024-01-12",
                    "bait": "PowerBait"
                }
            ]
            
            self.wfile.write(json.dumps(catches).encode())
            
        elif parsed_path.path == '/health':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            
            response = {"status": "healthy", "service": "FishCast Simple API"}
            self.wfile.write(json.dumps(response).encode())
            
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            
            response = {"error": "Not found"}
            self.wfile.write(json.dumps(response).encode())
    
    def do_POST(self):
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/analyze':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            
            # Mock AI analysis response
            analysis = """
            **Structure Analysis**: This appears to be a shallow cove with visible vegetation and fallen timber. The water clarity suggests good visibility for sight fishing.

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

            **Confidence Score**: 8/10 - Excellent fishing potential with multiple species likely present.
            """
            
            response = {
                "success": True,
                "recommendation": analysis,
                "filename": "uploaded_image.jpg"
            }
            
            self.wfile.write(json.dumps(response).encode())
            
        elif parsed_path.path == '/api/catches':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                catch_data = json.loads(post_data.decode())
                catch_data['id'] = datetime.now().timestamp()
                catch_data['logged_at'] = datetime.now().isoformat()
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                response = {"message": "Catch logged successfully!", "catch": catch_data}
                self.wfile.write(json.dumps(response).encode())
                
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                response = {"error": "Invalid JSON data"}
                self.wfile.write(json.dumps(response).encode())
                
        elif parsed_path.path == '/api/forecast':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            try:
                forecast_data = json.loads(post_data.decode())
                location = forecast_data.get('location', 'Unknown Location')
                
                # Mock forecast response
                forecast = {
                    "location": location,
                    "forecast_date": datetime.now().strftime("%Y-%m-%d"),
                    "bite_score": 8.5,
                    "activity_level": "Excellent",
                    "conditions": "Partly cloudy with light winds",
                    "moon_phase": "Waxing Gibbous",
                    "best_times": ["6:00-8:00 AM", "6:30-8:30 PM"],
                    "recommendations": "Prime fishing conditions! Fish are likely to be very active.",
                    "water_temp": "68°F",
                    "barometric_pressure": "30.15 inHg"
                }
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                self.wfile.write(json.dumps(forecast).encode())
                
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self._set_cors_headers()
                self.end_headers()
                
                response = {"error": "Invalid JSON data"}
                self.wfile.write(json.dumps(response).encode())
        
        else:
            self.send_response(404)
            self.send_header('Content-Type', 'application/json')
            self._set_cors_headers()
            self.end_headers()
            
            response = {"error": "Not found"}
            self.wfile.write(json.dumps(response).encode())

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, FishingHandler)
    print(f"🎣 FishCast API server running on http://localhost:{port}")
    print("Available endpoints:")
    print("  GET  / - API documentation")
    print("  POST /api/analyze - Analyze fishing spot")
    print("  GET  /api/catches - Get catches")
    print("  POST /api/catches - Log new catch")
    print("  POST /api/forecast - Get fishing forecast")
    print("  GET  /health - Health check")
    httpd.serve_forever()

if __name__ == '__main__':
    run_server()