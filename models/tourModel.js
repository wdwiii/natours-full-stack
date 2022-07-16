const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is required'],
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a specified duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a specified group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A difficulty level must be selected'],
  },
  ratingsAvg: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  price: { type: Number, required: [true, 'A price is required'] },
  discount: { type: Number },
  summary: { type: String, trim: true },
  description: {
    type: String,
    trim: true,
    required: [true, 'A description is required'],
  },
  imageCover: {
    type: String,
    required: [true, 'A description is required'],
    trim: true,
  },
  images: [String],
  createdAt: { type: Date, default: Date.now() },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', toursSchema);

module.exports = Tour;
