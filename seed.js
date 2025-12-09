const { MongoClient } = require('mongodb');

// MongoDB connection - REPLACE with your actual username and password
const MONGODB_URI = 'mongodb+srv://Rahim:Rahim90@lessonshop.luuxpoz.mongodb.net/?appName=LessonShop';

const lessons = [
  {id:1, subject:"Math", location:"Hendon", price:100, spaces:5, image:"math.png"},
  {id:2, subject:"Physics", location:"Colindale", price:120, spaces:5, image:"physics.png"},
  {id:3, subject:"Chemistry", location:"Brent Cross", price:110, spaces:5, image:"chemistry.png"},
  {id:4, subject:"Biology", location:"Golders Green", price:105, spaces:5, image:"biology.png"},
  {id:5, subject:"English", location:"Mill Hill", price:90, spaces:5, image:"english.png"},
  {id:6, subject:"History", location:"Hendon", price:95, spaces:5, image:"history.png"},
  {id:7, subject:"Geography", location:"Colindale", price:85, spaces:5, image:"geography.png"},
  {id:8, subject:"CS", location:"Brent Cross", price:130, spaces:5, image:"cs.png"},
  {id:9, subject:"Art", location:"Golders Green", price:80, spaces:5, image:"art.png"},
  {id:10, subject:"Music", location:"Mill Hill", price:88, spaces:5, image:"music.png"}
];

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('✓ Connected to MongoDB');
    
    const db = client.db('lessonshop');
    const collection = db.collection('lessons');
    
    // Clear existing data
    await collection.deleteMany({});
    console.log('✓ Cleared existing lessons');
    
    // Insert lessons
    const result = await collection.insertMany(lessons);
    console.log(`✓ Inserted ${result.insertedCount} lessons`);
    
    // Verify
    const count = await collection.countDocuments();
    console.log(`✓ Total lessons in database: ${count}`);
    
  } catch (error) {
    console.error('✗ Error:', error.message);
  } finally {
    await client.close();
    console.log('✓ Database connection closed');
  }
}

seedDatabase();