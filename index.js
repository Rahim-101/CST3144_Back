const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// MongoDB connection - REPLACE with your actual username and password
const MONGODB_URI = 'mongodb+srv://Rahim:Rahim90@lessonshop.luuxpoz.mongodb.net/?appName=LessonShop';

const client = new MongoClient(MONGODB_URI);
let db;

// Middleware
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Static file middleware - serve images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Lesson Shop API',
    version: '1.0.0',
    status: 'running'
  });
});

// GET /lessons - Fetch all lessons
app.get('/lessons', async (req, res) => {
  try {
    const lessons = await db.collection('lessons').find({}).toArray();
    res.json(lessons);
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await client.connect();
    db = client.db('lessonshop');
    console.log('✓ Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

startServer();