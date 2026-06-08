const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A travel package must have a title'],
      trim: true,
      maxlength: [100, 'A package title must have less or equal than 100 characters'],
    },
    destination: {
      type: String,
      required: [true, 'A travel package must have a destination'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'A travel package must have a description'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'A travel package must have a price'],
      min: [0, 'Price must be a positive number'],
    },
    duration: {
      type: String,
      required: [true, 'A travel package must have a duration'],
    },
    availableSeats: {
      type: Number,
      required: [true, 'A travel package must have available seats'],
      min: [0, 'Available seats cannot be negative'],
    },
    startDate: {
      type: Date,
      required: [true, 'A travel package must have a start date'],
    },
    image: {
      type: String,
      required: [true, 'A travel package must have an image URL'],
    },
  },
  {
    timestamps: true,
  }
);


packageSchema.index({ destination: 'text', title: 'text' });

const Package = mongoose.model('Package', packageSchema);

module.exports = Package;
