const { Server } = require('socket.io');
const User = require('../models/User');

const setupWebSocket = (server) => {
  const io = new Server(server, { cors: { origin: 'http://localhost:5173' } });
  const clients = new Map();

  io.on('connection', (socket) => {
    console.log("first")
    socket.on('login', async (data) => {
      await User.findByIdAndUpdate(data.userId, { status: 'online' });
      clients.set(data.userId, socket);
      broadcastUsers(io);
    });

    socket.on('logout', async (data) => {
      await User.findByIdAndUpdate(data.userId, { status: 'offline' });
      clients.delete(data.userId);
      broadcastUsers(io);
    });

    socket.on('disconnect', async () => {
      const userId = [...clients.entries()].find(([_, client]) => client === socket)?.[0];
      if (userId) {
        await User.findByIdAndUpdate(userId, { status: 'offline' });
        clients.delete(userId);
        broadcastUsers(io);
      }
    });
  });
};

async function broadcastUsers(io) {
  const users = await User.find({}, 'email status');
  io.emit('users', { type: 'users', users });
}

module.exports = { setupWebSocket };