const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, default: 'offline' },
});

module.exports = mongoose.model('User', userSchema);