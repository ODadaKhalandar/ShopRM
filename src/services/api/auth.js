import apiClient from './config.js';

export const authAPI = {
  // POST /api/auth/login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    
    // Store session for future requests
    if (response.data?.sessionId) {
      localStorage.setItem('sessionId', response.data.sessionId);
    }
    if (response.data?.tenantSubdomain) {
      localStorage.setItem('tenantSubdomain', response.data.tenantSubdomain);
    }
    
    return response;
  },

  // POST /api/auth/register
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    
    // Store session after registration
    if (response.data?.sessionId) {
      localStorage.setItem('sessionId', response.data.sessionId);
    }
    if (response.data?.tenantSubdomain) {
      localStorage.setItem('tenantSubdomain', response.data.tenantSubdomain);
    }
    
    return response;
  },

  // GET /api/auth/profile
  getProfile: async () => {
    return await apiClient.get('/auth/profile');
  },

  // Logout - clear local storage
  logout: () => {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('tenantSubdomain');
    localStorage.removeItem('user');
  }
};