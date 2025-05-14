const express = require('express');
const http = require('http');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { setupWebSocket } = require('./services/websocket');
const connectDB = require('./config/db');
const app = express();
const server = http.createServer(app);
require('dotenv').config();
// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// WebSocket Setup
setupWebSocket(server);

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));