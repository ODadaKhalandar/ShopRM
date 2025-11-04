import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import ManagerDashboard from './manager/ManagerDashboard';
import ExecutiveDashboard from './executive/ExecutiveDashboard';
import CustomerDashboard from './customer/CustomerDashboard';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  const renderDashboard = () => {
    switch (user?.role) {
      case 'manager':
        return <ManagerDashboard />;
      case 'executive':
        return <ExecutiveDashboard />;
      case 'customer':
        return <CustomerDashboard />;
      default:
        return <DefaultDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {renderDashboard()}
      </div>
    </div>
  );
};

// Fallback dashboard for unknown roles
const DefaultDashboard = () => (
  <div className="space-y-6">
    <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-2xl p-6 text-white">
      <h1 className="text-2xl font-bold mb-2">Welcome</h1>
      <p className="text-opacity-90">Please contact administrator for dashboard access.</p>
    </div>
    <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
      <p className="text-gray-600">No dashboard configured for your role.</p>
    </div>
  </div>
);

export default Dashboard;