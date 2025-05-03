from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
import numpy as np
import io
import uvicorn
import tensorflow as tf
from joblib import load

app = FastAPI(
    title="Image Colorization API",
    description="API for colorizing grayscale images",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = load("models/ColorNet.pkl")
IMG_SIZE = 128 

def preprocess_uploaded_image(image):
    
    image = image.resize((IMG_SIZE, IMG_SIZE))
    image_array = np.array(image) / 255.0
    # Add batch dimension and channel dimension
    image_array = np.expand_dims(image_array, axis=[0, -1])
    return image_array

@app.get("/")
async def root():
    return {"message": "Image Colorization API is running. Go to /docs for API documentation."}

@app.post("/colorize")
async def colorize(image: UploadFile = File(...)):
    try:
        if not image.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        contents = await image.read()
        input_image = Image.open(io.BytesIO(contents))
        
        processed_image = preprocess_uploaded_image(input_image)
        output = model.predict(processed_image)
        
        # Remove batch dimension and scale back to 0-255
        colorized_array = (output[0] * 255).astype(np.uint8)
        colorized_image = Image.fromarray(colorized_array)
        
        # Convert to bytes for response
        img_byte_arr = io.BytesIO()
        colorized_image.save(img_byte_arr, format="PNG")
        img_byte_arr.seek(0)
        
        return StreamingResponse(
            img_byte_arr, 
            media_type="image/png",
            headers={"Content-Disposition": f"attachment; filename=colorized_{image.filename}"}
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)