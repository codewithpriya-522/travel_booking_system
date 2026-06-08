const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { bookingSchema } = require('../validations/bookingValidation');

const router = express.Router();


router.use(authController.protect);


router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(validateRequest(bookingSchema), bookingController.createBooking);

module.exports = router;
