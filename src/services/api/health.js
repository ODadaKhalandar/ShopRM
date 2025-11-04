import apiClient from './config.js';

export const healthAPI = {
  // GET /api/health
  checkHealth: async () => {
    return await apiClient.get('/health');
  },

  // GET /api/ - Root endpoint
  getRoot: async () => {
    return await apiClient.get('/');
  }
};