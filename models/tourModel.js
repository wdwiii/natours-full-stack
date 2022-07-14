const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    unique: true,
  },
  rating: { type: Number, required: false, default: 4.5 },
  price: { type: Number, required: [true, 'A price is required'] },
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
