import apiClient from './config.js';

export const tenantsAPI = {
  // POST /api/tenants/register
  registerTenant: async (shopData) => {
    return await apiClient.post('/tenants/register', shopData);
  },

  // GET /api/tenants/
  getAllTenants: async () => {
    return await apiClient.get('/tenants');
  },

  // GET /api/tenants/domain/:domain
  getTenantByDomain: async (domain) => {
    return await apiClient.get(`/tenants/domain/${domain}`);
  }
};