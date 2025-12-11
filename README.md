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

---

## 🛠️ 
- Node.js
- Express.js (v5.2.1)
- MongoDB (v7.0.0)
- CORS (v2.8.5)
- MongoDB Atlas

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

## 🌐 Live Deployment

**Backend API:** https://cst3144-back.onrender.com  

**Live API Endpoints:**
- Root: https://cst3144-back.onrender.com/
- Get Lessons: https://cst3144-back.onrender.com/lessons
- Post Orders: https://cst3144-back.onrender.com/orders
- Update Lesson: https://cst3144-back.onrender.com/lessons/1
- Search: https://cst3144-back.onrender.com/search?q=math
- Images: https://cst3144-back.onrender.com/images/math.png

---

## 🚀 Deployment

**Platform:** Render.com  
**URL:** https://cst3144-back.onrender.com

### Environment Variables:
```
PORT=10000 (auto-configured by Render)
```

---

## 🤝 Contact

**Student:** Rahim-101  
**Course:** CST3144  
**Institution:** Middlesex University Dubai

---

**Last Updated:** December 2025
