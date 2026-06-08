import apiClient from './apiClient';

const bookingService = {
  
  createBooking: (data) => apiClient.post('/bookings', data),

  
  getAllBookings: () => apiClient.get('/bookings'),
};

export default bookingService;
