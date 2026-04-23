const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

// Parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/crud-node-express', {
})
.then(() => console.log('✅ Database Connected Successfully!'))
.catch(err => console.log('❌ Database connection error:', err));

// Import user routes
const userRoutes = require('./app/routes/user.routes.js');
app.use('/user', userRoutes);

// Root route (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the User CRUD API!');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
