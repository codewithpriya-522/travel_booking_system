const Package = require('../models/Package');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.getAllPackages = catchAsync(async (req, res, next) => {
  
  const countFeatures = new APIFeatures(Package.find(), req.query).filter();
  const totalRecords = await Package.countDocuments(countFeatures.query.getQuery());

  
  const features = new APIFeatures(Package.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const packages = await features.query;

  
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const totalPages = Math.ceil(totalRecords / limit);

  res.status(200).json({
    success: true,
    data: packages,
    pagination: {
      page,
      limit,
      totalPages,
      totalRecords
    }
  });
});

exports.getPackage = catchAsync(async (req, res, next) => {
  const travelPackage = await Package.findById(req.params.id);

  if (!travelPackage) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    success: true,
    data: travelPackage
  });
});

exports.createPackage = catchAsync(async (req, res, next) => {
  const newPackage = await Package.create(req.body);

  res.status(201).json({
    success: true,
    data: newPackage
  });
});

exports.updatePackage = catchAsync(async (req, res, next) => {
  const travelPackage = await Package.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!travelPackage) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(200).json({
    success: true,
    data: travelPackage
  });
});

exports.deletePackage = catchAsync(async (req, res, next) => {
  const travelPackage = await Package.findByIdAndDelete(req.params.id);

  if (!travelPackage) {
    return next(new AppError('No package found with that ID', 404));
  }

  res.status(204).json({
    success: true,
    data: null,
  });
});
