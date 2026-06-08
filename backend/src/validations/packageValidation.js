const Joi = require('joi');

exports.packageSchema = Joi.object({
  title: Joi.string().required().max(100),
  destination: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required().min(0),
  duration: Joi.string().required(),
  availableSeats: Joi.number().required().min(0),
  startDate: Joi.date().required(),
  image: Joi.string().required().uri(),
});
