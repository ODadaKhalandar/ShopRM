import apiClient from './config.js';

// FIXED: Changed export name to match import
export const tenantOperationsAPI = {  // ✅ This matches the import
  // POST /api/tenant/products
  createProduct: async (productData) => {
    return await apiClient.post('/tenant/products', productData);
  },

  // GET /api/tenant/products
  getProducts: async () => {
    return await apiClient.get('/tenant/products');
  },

  // PATCH /api/tenant/products/stock
  updateStock: async (stockData) => {
    return await apiClient.patch('/tenant/products/stock', stockData);
  },

  // POST /api/tenant/customers
  createCustomer: async (customerData) => {
    return await apiClient.post('/tenant/customers', customerData);
  },

  // GET /api/tenant/customers
  getCustomers: async () => {
    return await apiClient.get('/tenant/customers');
  },

  // POST /api/tenant/orders
  createOrder: async (orderData) => {
    return await apiClient.post('/tenant/orders', orderData);
  },

  // GET /api/tenant/orders
  getOrders: async () => {
    return await apiClient.get('/tenant/orders');
  },

  // GET /api/tenant/reports/sales
  getSalesReport: async () => {
    return await apiClient.get('/tenant/reports/sales');
  }
};