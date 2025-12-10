# Lesson Shop - Backend API

Full-stack web application backend for a lesson booking system built with Express.js and MongoDB.

**Course:** CST3144 Full Stack Development  
**Student:** Rahim-101  
**Institution:** Middlesex University Dubai  

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Development History](#development-history)
- [Testing](#testing)

---

## 🎯 Overview

This is the backend API for the Lesson Shop application, providing RESTful endpoints for managing lessons, orders, and serving static images. The application uses Express.js and MongoDB Atlas.

---

## ✨ Features

- **RESTful API** with 6 endpoints
- **MongoDB Integration** using native driver
- **Custom Middleware** (logger, static files, CORS)
- **Data Validation** for all inputs
- **Error Handling** with proper status codes
- **Search Functionality** (bonus feature)

---

## 🛠️ Technologies

- Node.js
- Express.js (v5.2.1)
- MongoDB (v7.0.0)
- CORS (v2.8.5)
- MongoDB Atlas

---

## 🚀 Installation

1. Clone repository
2. Install dependencies: `npm install`
3. Update MongoDB connection string in `index.js`
4. Seed database: `node seed.js`
5. Start server: `npm start`
6. Server runs at: `http://localhost:3000`

---

## 📡 API Endpoints

### GET `/`
Get API information

### GET `/lessons`
Fetch all lessons

### POST `/orders`
Create new order with validation

### PUT `/lessons/:id`
Update lesson spaces

### GET `/search?q=query`
Search lessons (bonus feature)

### GET `/images/:filename`
Serve static images

---

## 🗄️ Database Schema

### Lessons Collection
```json
{
  "id": 1,
  "subject": "Math",
  "location": "Hendon",
  "price": 100,
  "spaces": 10,
  "image": "math.png"
}
```

### Orders Collection
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "city": "London",
  "country": "UK",
  "address": "123 Main St",
  "isGift": false,
  "lessonType": "in-person",
  "cart": [...],
  "total": 200,
  "createdAt": "2025-01-08T12:00:00.000Z"
}
```

---

## 📜 Development History

1. **Commit 1:** Project initialization
2. **Commit 2:** CORS and logger middleware
3. **Commit 3:** MongoDB connection and seed data
4. **Commit 4:** Static file middleware for images
5. **Commit 5:** POST /orders endpoint
6. **Commit 6:** PUT /lessons/:id endpoint
7. **Commit 7:** GET /search endpoint (bonus)
8. **Commit 8:** Error handling and validation
9. **Commit 9:** Frontend integration with Fetch API
10. **Commit 10:** Final polish and documentation

---

## 🧪 Testing

**cURL Examples:**

```bash
# Get lessons
curl http://localhost:3000/lessons

# Create order
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe",...}'

# Update spaces
curl -X PUT http://localhost:3000/lessons/1 \
  -H "Content-Type: application/json" \
  -d '{"spaces":5}'

# Search
curl http://localhost:3000/search?q=math
```


## 🤝 Contact

**Student:** Rahim-101  
**Course:** CST3144  
**Institution:** Middlesex University Dubai

---

**Last Updated:** December 2025