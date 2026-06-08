const express = require('express');
const packageController = require('../controllers/packageController');
const authController = require('../controllers/authController');
const validateRequest = require('../middlewares/validateRequest');
const { packageSchema } = require('../validations/packageValidation');

const router = express.Router();

router
  .route('/')
  .get(packageController.getAllPackages)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    validateRequest(packageSchema),
    packageController.createPackage
  );

router
  .route('/:id')
  .get(packageController.getPackage)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    validateRequest(packageSchema),
    packageController.updatePackage
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    packageController.deletePackage
  );

module.exports = router;
