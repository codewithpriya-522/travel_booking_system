import apiClient from './apiClient';

const packageService = {
  
  getPackages: (params) => apiClient.get('/packages', { params }),

  
  getPackageById: (id) => apiClient.get(`/packages/${id}`),

  
  addPackage: (data) => apiClient.post('/packages', data),
};

export default packageService;
