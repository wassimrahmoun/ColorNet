from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from PIL import Image
import numpy as np
import io
import uvicorn
import tensorflow as tf
import traceback  # Add this for better error logging

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

def psnr(y_true, y_pred):
    return tf.image.psnr(y_true, y_pred, max_val=1.0)

def ssim(y_true, y_pred):
    return tf.image.ssim(y_true, y_pred, max_val=1.0)

model = tf.keras.models.load_model("models/ColorNet.keras" ,  custom_objects={'psnr': psnr , 'ssim' : ssim} )
IMG_SIZE = 128 


def preprocess_uploaded_image(image):
    try:
        # Convert to RGB first (handles PNG transparency, etc.)
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # Convert to numpy array and normalize like in training
        img_array = np.array(image, dtype=np.float32) / 255.0
        
        # Resize using TensorFlow to match training pipeline
        img_array = tf.image.resize(img_array, [IMG_SIZE, IMG_SIZE])
        
        # Convert to grayscale like in training
        gray = tf.image.rgb_to_grayscale(img_array)
        
        # Add batch dimension
        return np.expand_dims(gray, axis=0)
    
    except Exception as e:
        print(f"Preprocessing error: {traceback.format_exc()}")
        raise

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
        print(f"Full error: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)