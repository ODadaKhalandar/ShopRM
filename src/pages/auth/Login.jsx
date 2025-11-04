import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTenant } from '../../contexts/TenantContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    tenantSubdomain: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { setSubdomain } = useTenant();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Set tenant subdomain first
    setSubdomain(formData.tenantSubdomain);

    const credentials = {
      email: formData.email,
      password: formData.password
    };

    const result = await login(credentials);
    
    if (!result.success) {
      alert(`Login failed: ${result.error}`);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-white">🌱</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Fertilizer ERP</h1>
          <p className="text-gray-600 mt-2">Sign in to your shop account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tenant Subdomain */}
          <div>
            <label htmlFor="tenantSubdomain" className="block text-sm font-medium text-gray-700 mb-2">
              Shop Domain
            </label>
            <input
              id="tenantSubdomain"
              name="tenantSubdomain"
              type="text"
              required
              value={formData.tenantSubdomain}
              onChange={handleChange}
              placeholder="e.g., greenfield"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter your shop's domain name
            </p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="owner@shop.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Demo Credentials Hint */}
        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">Demo Access:</h3>
          <p className="text-xs text-yellow-700">
            Use session IDs like: <code className="bg-yellow-100 px-1 rounded">manager_session</code>, 
            <code className="bg-yellow-100 px-1 rounded mx-1">executive_session</code>, 
            <code className="bg-yellow-100 px-1 rounded">customer_session</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;