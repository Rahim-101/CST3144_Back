const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection 
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
    status: 'running',
    endpoints: {
      lessons: 'GET /lessons',
      search: 'GET /search?q=query',
      orders: 'POST /orders',
      updateLesson: 'PUT /lessons/:id'
    }
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

// POST /orders - Create new order
app.post('/orders', async (req, res) => {
  try {
    console.log('Received order data:', req.body);
    
    const { firstName, lastName, email, phone, city, country, address, isGift, lessonType, cart, total } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !city || !country || !address || !lessonType) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({ error: 'All required fields must be filled' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    // Validate phone (digits only)
    if (!/^\d+$/.test(phone)) {
      return res.status(400).json({ error: 'Phone must contain only digits' });
    }
    // Validate cart
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      console.log('Validation failed - invalid cart');
      return res.status(400).json({ error: 'Cart cannot be empty' });
    }
  
    // Validate lesson type
    if (lessonType !== 'in-person' && lessonType !== 'online') {
      return res.status(400).json({ error: 'Lesson type must be either "in-person" or "online"' });
    }
    
    // Create order object
    const order = {
      firstName,
      lastName,
      email,
      phone,
      city,
      country,
      address,
      isGift: isGift || false,
      lessonType,
      cart,
      total: total || 0,
      createdAt: new Date()
    };
    
    console.log('Inserting order:', order);
    
    // Insert order into database
    const result = await db.collection('orders').insertOne(order);
    
    console.log('Order inserted successfully:', result.insertedId);
    
    res.status(201).json({ 
      message: 'Order created successfully',
      orderId: result.insertedId,
      order: order
    });
  } catch (error) {
    console.error('Error creating order:', error.message);
    console.error('Full error:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message 
    });
  }
});

// PUT /lessons/:id - Update lesson spaces
app.put('/lessons/:id', async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id);
    const { spaces } = req.body;
    
    console.log(`Updating lesson ${lessonId} with spaces: ${spaces}`);
    
    // Validate lesson ID
    if (isNaN(lessonId)) {
      return res.status(400).json({ error: 'Invalid lesson ID' });
    }
    
    // Validate spaces
    if (typeof spaces !== 'number' || spaces < 0 || !Number.isInteger(spaces)) {
      return res.status(400).json({ error: 'Spaces must be a non-negative integer' });
    }
    
    // Update lesson in database
    const result = await db.collection('lessons').updateOne(
      { id: lessonId },
      { $set: { spaces: spaces } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    // Fetch updated lesson
    const updatedLesson = await db.collection('lessons').findOne({ id: lessonId });
    
    console.log('Lesson updated successfully:', updatedLesson);
    
    res.json({ 
      message: 'Lesson updated successfully',
      lesson: updatedLesson
    });
  } catch (error) {
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
});

// GET /search - Search lessons
app.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    console.log(`Searching for: ${q}`);
    
    // If no query provided, return all lessons
    if (!q || q.trim() === '') {
      const lessons = await db.collection('lessons').find({}).toArray();
      return res.json(lessons);
    }
    
    // Search in subject and location using regex (case-insensitive)
    const lessons = await db.collection('lessons').find({
      $or: [
        { subject: { $regex: q, $options: 'i' } },
        { location: { $regex: q, $options: 'i' } }
      ]
    }).toArray();
    
    console.log(`Found ${lessons.length} lessons`);
    
    res.json(lessons);
  } catch (error) {
    console.error('Error searching lessons:', error);
    res.status(500).json({ error: 'Search failed' });
  }
});

// 404 handler - must be after all routes
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.url,
    method: req.method
  });
});

// Global error handler - must be last
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Connect to MongoDB and start server
async function startServer() {
  try {
    await client.connect();
    db = client.db('lessonshop');
    console.log('✓ Connected to MongoDB');
    
    // Test database connection
    await db.command({ ping: 1 });
    console.log('✓ Database ping successful');
    
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('✗ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

startServer();