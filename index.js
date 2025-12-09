const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Lesson Shop API',
    version: '1.0.0',
    status: 'running'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});