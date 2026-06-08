import apiClient from './apiClient';

const authService = {
  
  register: (data) => apiClient.post('/auth/register', data),

  
  login: (data) => apiClient.post('/auth/login', data),
};

export default authService;
