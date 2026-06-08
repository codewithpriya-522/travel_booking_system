const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Package = require('../models/Package');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');


exports.createBooking = catchAsync(async (req, res, next) => {
  const { packageId, customerName, email, seats } = req.body;

  
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const travelPackage = await Package.findById(packageId).session(session);

    if (!travelPackage) {
      throw new AppError('The travel package you are trying to book does not exist.', 404);
    }

    
    if (travelPackage.availableSeats < seats) {
      throw new AppError(`Not enough seats available. Only ${travelPackage.availableSeats} seats left for this package.`, 400);
    }

    
    const totalPrice = travelPackage.price * seats;
    const newBooking = await Booking.create(
      [
        {
          customerName,
          email,
          seats,
          totalPrice,
          packageId,
        },
      ],
      { session }
    );

    
    travelPackage.availableSeats -= seats;
    await travelPackage.save({ session });

    
    await session.commitTransaction();
    session.endSession();

    
    res.status(201).json({
      success: true,
      message: 'Booking confirmed successfully!',
      data: newBooking[0],
    });
  } catch (error) {
    
    await session.abortTransaction();
    session.endSession();

    
    next(error);
  }
});


exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find().sort({ createdAt: -1 }).populate('packageId');

  res.status(200).json({
    success: true,
    data: bookings,
  });
});
