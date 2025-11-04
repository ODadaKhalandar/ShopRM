import { useEffect, useState } from 'react';
import { healthAPI } from '../services/api';

const TestAPI = () => {
  const [status, setStatus] = useState('Testing...');
  const [data, setData] = useState(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await healthAPI.checkHealth();
        console.log('🔧 Full API Response:', response); // Debug log
        
        // The response structure might be different
        setStatus(`✅ API Connected Successfully`);
        setData(response);
      } catch (error) {
        setStatus(`❌ Connection Failed: ${error.message}`);
        console.error('API Error:', error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold text-green-600 mb-4">API Connection Test</h2>
      <p className="text-gray-800 mb-2">{status}</p>
      
      {data && (
        <div className="mt-4 p-3 bg-gray-50 rounded border">
          <h3 className="font-semibold mb-2">Response Data:</h3>
          <pre className="text-sm text-gray-600 overflow-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestAPI;