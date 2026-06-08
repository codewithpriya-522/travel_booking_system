const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middlewares/errorHandler');

const packageRouter = require('./routes/packageRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();


app.use(helmet()); 
app.use(cors()); 

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); 
}

app.use(express.json({ limit: '10kb' })); 
app.use(compression()); 


app.use('/api/auth', authRouter);
app.use('/api/packages', packageRouter);
app.use('/api/bookings', bookingRouter);


app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is healthy' });
});


app.all(/(.*)/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
