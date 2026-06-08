const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: [true, 'A booking must have a customer name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'A booking must have an email'],
      lowercase: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please provide a valid email address'],
    },
    seats: {
      type: Number,
      required: [true, 'A booking must specify the number of seats'],
      min: [1, 'Number of seats must be at least 1'],
    },
    packageId: {
      type: mongoose.Schema.ObjectId,
      ref: 'Package',
      required: [true, 'A booking must belong to a package'],
    },
    totalPrice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
