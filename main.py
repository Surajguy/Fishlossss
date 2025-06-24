from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from ai_image import analyze_fishing_spot

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Fishing app backend is live!"}

@app.post("/analyze")
async def analyze_image(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        recommendation = analyze_fishing_spot(image_bytes)
        return JSONResponse(content={"recommendation": recommendation})
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
