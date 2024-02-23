const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  name: String,
  model: String,
  quantity: Number,
  user: { type: String, unique: true },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const CarModel = mongoose.model('Cars', CarSchema);

module.exports = CarModel;
