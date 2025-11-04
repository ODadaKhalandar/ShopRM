import { useState, useEffect } from 'react';
import DashboardStats from '../shared/DashboardStats';
import RecentActivity from '../shared/RecentActivity';
import QuickActions from '../shared/QuickActions';

const ExecutiveDashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentSales, setRecentSales] = useState([]);
  const [salesTools, setSalesTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = () => {
      // Stats Data
      const executiveStats = [
        { label: "Today's Sales", value: '₹8,450', icon: '💰', color: 'text-gray-900' },
        { label: 'Active Customers', value: 18, icon: '👥', color: 'text-gray-900' },
        { label: 'Pending Orders', value: 5, icon: '⏳', color: 'text-orange-600' },
        { label: 'Conversion Rate', value: '68%', icon: '📈', color: 'text-green-600' }
      ];

      // Recent Sales
      const salesData = [
        { 
          id: 1, 
          icon: '✅', 
          message: 'Raj Kumar - ₹2,500', 
          time: '1 hour ago' 
        },
        { 
          id: 2, 
          icon: '⏳', 
          message: 'Priya Singh - ₹1,800', 
          time: '2 hours ago' 
        },
        { 
          id: 3, 
          icon: '✅', 
          message: 'Amit Sharma - ₹3,200', 
          time: '3 hours ago' 
        },
      ];

      // Sales Tools
      const toolsData = [
        { 
          label: 'Create New Sale', 
          icon: '💰', 
          bgColor: 'bg-blue-50', 
          textColor: 'text-blue-700',
          onClick: () => console.log('Create Sale clicked')
        },
        { 
          label: 'Add Customer', 
          icon: '👥', 
          bgColor: 'bg-green-50', 
          textColor: 'text-green-700',
          onClick: () => console.log('Add Customer clicked')
        },
        { 
          label: 'Sales Reports', 
          icon: '📊', 
          bgColor: 'bg-purple-50', 
          textColor: 'text-purple-700',
          onClick: () => console.log('Sales Reports clicked')
        },
        { 
          label: 'Customer Follow-up', 
          icon: '📞', 
          bgColor: 'bg-orange-50', 
          textColor: 'text-orange-700',
          onClick: () => console.log('Follow-up clicked')
        },
      ];

      setStats(executiveStats);
      setRecentSales(salesData);
      setSalesTools(toolsData);
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
        title="Sales Dashboard" 
        subtitle="Focus on sales performance and customer relationships"
        gradient="from-blue-500 to-blue-600"
      />

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentSales} title="Recent Sales" />
        <QuickActions actions={salesTools} title="Sales Tools" />
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics />
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

const PerformanceMetrics = () => (
  <div className="bg-white rounded-xl shadow-sm border p-6">
    <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard value="₹24.5K" label="Monthly Sales" color="text-blue-600" />
      <MetricCard value="42" label="Transactions" color="text-green-600" />
      <MetricCard value="₹583" label="Average Order" color="text-purple-600" />
    </div>
  </div>
);

const MetricCard = ({ value, label, color }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg">
    <p className={`text-2xl font-bold ${color}`}>{value}</p>
    <p className="text-sm text-gray-600">{label}</p>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
  </div>
);

export default ExecutiveDashboard;