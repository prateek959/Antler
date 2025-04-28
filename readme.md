# Antler

Antler is a Node.js-based backend application that provides APIs for AI-based analysis and file uploads. It integrates with MongoDB for database storage, Redis for caching, and Cloudinary for file management.

## Features

- AI-based analysis using OpenAI API.
- File upload functionality with Multer and Cloudinary integration.
- Redis caching for optimized performance.
- Scheduled tasks using Node-Cron.
- Rate limiting to prevent abuse of APIs.
- CORS support for secure cross-origin requests.

## Project Structure

Antler/
├── .env                     # Environment variables (not included in repo)
├── .gitignore                # Ignored files and folders
├── package.json              # Project metadata and dependencies
├── server.js                 # Main entry point of the application
├── cloudinary/               
│   └── cloudinary.js         # Cloudinary configuration
├── config/
│   └── db.js                 # Database connection setup
├── controller/
│   ├── ai.controller.js      # Controller logic for AI-based APIs
│   └── upload.controller.js  # Controller logic for file uploads
├── middleware/               
│   └── (empty)               # Placeholder for custom middleware
├── models/
│   └── upload.model.js       # Mongoose schema for uploaded files
├── public/
│   └── images/               # Directory for uploaded files
├── redis/
│   └── redis.connection.js  # Redis connection setup
├── routes/
│   ├── ai.routes.js          # API routes for AI-based operations
│   └── upload.routes.js      # API routes for file uploads

## Prerequisites

- Node.js (v16 or later)
- MongoDB (local or cloud instance)
- Redis (local or cloud instance)
- npm (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd Antler
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory and add the following environment variables:

ini
Copy
Edit
PORT=5000
MONGODB_URI_PRODUCTION=<your-mongodb-connection-string>
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_PASS=<your-redis-password>
AI_KEY=<your-openai-api-key>
FRONTEND_URL=<your-frontend-url>
Start the server:

bash
Copy
Edit
npm run dev
The server will run on http://localhost:5000.

API Endpoints
1. AI Analysis
POST /analyze

Description:
Perform AI-based analysis using OpenAI API.

Request Body:
json
Copy
Edit
{
  "message": "Your input message here"
}
Response:
200 OK: AI-generated response.

400 Bad Request: Invalid input.

500 Internal Server Error: API or server error.

2. File Upload
POST /upload

Description:
Upload a file to the server.

Request:
Multipart form-data with a file field named file.

Response:
201 Created: File uploaded successfully with URL.

500 Internal Server Error: Upload error.

Technologies Used
Node.js: JavaScript runtime.

Express.js: Web framework.

MongoDB: NoSQL database.

Mongoose: MongoDB object modeling.

Redis: In-memory data store.

Cloudinary: File storage and management.

Multer: Middleware for handling file uploads.

dotenv: Environment variable management.

express-rate-limit: Rate limiting middleware.

CORS: Cross-origin resource sharing.

Node-Cron: Task scheduling.