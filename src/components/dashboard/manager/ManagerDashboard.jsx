import { useState, useEffect } from 'react';
import DashboardStats from '../shared/DashboardStats';
import RecentActivity from '../shared/RecentActivity';
import QuickActions from '../shared/QuickActions';

const ManagerDashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = () => {
      // Stats Data
      const managerStats = [
        { label: 'Total Products', value: 45, icon: '📦', color: 'text-gray-900' },
        { label: 'Customers', value: 23, icon: '👥', color: 'text-gray-900' },
        { label: "Today's Sales", value: '₹12,450', icon: '💰', color: 'text-gray-900' },
        { label: 'Low Stock', value: 3, icon: '⚠️', color: 'text-red-600' }
      ];

      // Recent Activity
      const activityData = [
        { id: 1, icon: '💰', message: 'New sale: ₹2,500', time: '2 hours ago' },
        { id: 2, icon: '👥', message: 'New customer registered', time: '4 hours ago' },
        { id: 3, icon: '⚠️', message: 'NPK Fertilizer low stock', time: '1 day ago' },
      ];

      // Quick Actions
      const actionsData = [
        { 
          label: 'New Sale', 
          icon: '➕', 
          bgColor: 'bg-green-50', 
          textColor: 'text-green-700',
          onClick: () => console.log('New Sale clicked')
        },
        { 
          label: 'Add Product', 
          icon: '📦', 
          bgColor: 'bg-blue-50', 
          textColor: 'text-blue-700',
          onClick: () => console.log('Add Product clicked')
        },
        { 
          label: 'New Customer', 
          icon: '👥', 
          bgColor: 'bg-purple-50', 
          textColor: 'text-purple-700',
          onClick: () => console.log('New Customer clicked')
        },
        { 
          label: 'View Reports', 
          icon: '📊', 
          bgColor: 'bg-orange-50', 
          textColor: 'text-orange-700',
          onClick: () => console.log('View Reports clicked')
        },
      ];

      setStats(managerStats);
      setRecentActivity(activityData);
      setQuickActions(actionsData);
      setLoading(false);
    };

    initializeDashboard();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <WelcomeSection 
        title="Shop Overview" 
        subtitle="Complete access to all business operations"
        gradient="from-green-500 to-green-600"
      />

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivity} />
        <QuickActions actions={quickActions} />
      </div>
    </div>
  );
};

// Helper Components
const WelcomeSection = ({ title, subtitle, gradient }) => (
  <div className={`bg-gradient-to-r ${gradient} rounded-2xl p-6 text-white`}>
    <h1 className="text-2xl font-bold mb-2">{title}</h1>
    <p className="text-opacity-90">{subtitle}</p>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
  </div>
);

export default ManagerDashboard;