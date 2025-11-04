import apiClient from './config.js';

export const modulesAPI = {
  // GET /api/modules/ - User permissions & accessible modules
  getUserPermissions: async () => {
    return await apiClient.get('/modules');
  },

  // GET /api/modules/dashboard - Dashboard data
  getDashboardData: async () => {
    return await apiClient.get('/modules/dashboard');
  },

  // GET /api/modules/products - List products (RBAC protected)
  getProducts: async () => {
    return await apiClient.get('/modules/products');
  },

  // POST /api/modules/products - Create product (RBAC protected)
  createProduct: async (productData) => {
    return await apiClient.post('/modules/products', productData);
  },

  // GET /api/modules/customers - List customers (RBAC protected)
  getCustomers: async () => {
    return await apiClient.get('/modules/customers');
  },

  // GET /api/modules/orders - List orders (RBAC protected)
  getOrders: async () => {
    return await apiClient.get('/modules/orders');
  },

  // POST /api/modules/orders - Create order (RBAC protected)
  createOrder: async (orderData) => {
    return await apiClient.post('/modules/orders', orderData);
  },

  // GET /api/modules/reports/sales - Sales report (RBAC protected)
  getSalesReport: async () => {
    return await apiClient.get('/modules/reports/sales');
  }
};