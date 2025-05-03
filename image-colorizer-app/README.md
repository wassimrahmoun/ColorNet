# Image Colorization API

This is a FastAPI backend for the Image Colorization application. It provides an API endpoint that accepts grayscale images and returns colorized versions.

## Features

- REST API for image colorization
- Swagger documentation
- CORS support for frontend integration
- Docker support for easy deployment

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
pip install -r requirements.txt
\`\`\`

3. Run the server:

\`\`\`bash
uvicorn main:app --reload
\`\`\`

The API will be available at http://localhost:8000

## API Documentation

Once the server is running, you can access the Swagger documentation at:

http://localhost:8000/docs

## Endpoints

- `GET /`: Health check endpoint
- `POST /colorize`: Upload and colorize an image

## Docker Support

To build and run with Docker:

\`\`\`bash

# Build the image

docker build -t image-colorizer-api .

# Run the container

docker run -p 8000:8000 image-colorizer-api
\`\`\`

## Integration with Frontend

This backend is designed to work with the Next.js frontend. To connect them:

1. Make sure both the frontend and backend are running
2. The frontend should send POST requests to `http://localhost:8000/colorize`
3. Update the CORS settings in `main.py` if needed
