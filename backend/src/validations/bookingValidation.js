const Joi = require('joi');

exports.bookingSchema = Joi.object({
  packageId: Joi.string().required().pattern(/^[0-9a-fA-F]{24}$/),
  customerName: Joi.string().required(),
  email: Joi.string().required().email(),
  seats: Joi.number().required().min(1),
});
