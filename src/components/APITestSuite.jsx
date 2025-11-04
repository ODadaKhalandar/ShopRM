import { useState } from 'react';
import { healthAPI, tenantsAPI, authAPI } from '../services/api';

const APITestSuite = () => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);

  const testEndpoints = async () => {
    setLoading(true);
    const testResults = {};

    try {
      // Test 1: Health Check
      testResults.health = await healthAPI.checkHealth();
    } catch (error) {
      testResults.health = { error: error.message };
    }

    try {
      // Test 2: Root Endpoint
      testResults.root = await healthAPI.getRoot();
    } catch (error) {
      testResults.root = { error: error.message };
    }

    try {
      // Test 3: Get Tenants (might require auth)
      testResults.tenants = await tenantsAPI.getAllTenants();
    } catch (error) {
      testResults.tenants = { error: error.message };
    }

    setResults(testResults);
    setLoading(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-green-600 mb-4">API Test Suite</h2>
      
      <button
        onClick={testEndpoints}
        disabled={loading}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400 mb-4"
      >
        {loading ? 'Testing...' : 'Test All Endpoints'}
      </button>

      {Object.keys(results).length > 0 && (
        <div className="space-y-4">
          {Object.entries(results).map(([endpoint, result]) => (
            <div key={endpoint} className="p-3 border rounded">
              <h3 className="font-semibold capitalize">{endpoint}</h3>
              <pre className="text-sm text-gray-600 mt-2 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default APITestSuite;