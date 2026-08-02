🚀 AI Carousel Maker & Autonomous Worker

An end-to-end automated system designed to generate multi-slide Instagram carousels and instant high-resolution visuals using lightweight container workers and free public AI proxies—completely bypassing the need for paid API keys.

🏗️ Architecture & System Flow

[ React Frontend UI ] 
       │
       ├──────► POST /api/generate-carousel ──► [ Render Backend Container ]
       │                                               │
       │                                      (Returns 4-Slide JSON)
       │                                               ▼
       └──────► GET /api/generate-image ────► [ Pollinations.ai Proxy ] ──► (Instant 1080x1080 HD Image)


📂 Project Structure

ai-carousel-maker/
├── backend/
│   ├── server.js          # Express server handling AI prompt logic & image routing
│   ├── package.json       # Backend dependencies (express, cors)
│   └── Dockerfile         # Container configuration for Render
├── frontend/
│   ├── src/
│   │   └── App.js         # Interactive React UI with slide navigation & download features
│   └── package.json       # Frontend dependencies (react, lucide-react)
└── README.md              # Project documentation


🔌 API Endpoints Reference

1. Health Check

URL: GET /

Response: Verifies that the container worker is active and online.

2. Generate Carousel Slides

URL: POST /api/generate-carousel

Headers: Content-Type: application/json

Payload:

{
  "topic": "Next.js 15 App Router"
}


Response: Returns an array of structured slide titles, descriptions, and optimized visual prompts.

3. Generate Slide Image Link

URL: GET /api/generate-image?prompt=YourVisualDescription

Response: Returns a direct high-res 1080x1080 image URL ready for social media publishing.

🚀 Local Development Setup

Clone the Repository:

git clone https://github.com/your-username/ai-carousel-maker.git
cd ai-carousel-maker


Run Backend:

cd backend
npm install
npm start


Run Frontend:

cd ../frontend
npm install
npm start


☁️ Deployment Guide

Backend: Push the backend/ folder to GitHub and deploy it as a Web Service on Render using the provided Dockerfile.

Frontend: Deploy the frontend/ folder directly to Vercel or Netlify, and map your live Render backend URL inside App.js.