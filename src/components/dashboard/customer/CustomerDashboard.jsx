import { useState, useEffect } from 'react';
import DashboardStats from '../shared/DashboardStats';
import RecentActivity from '../shared/RecentActivity';
import QuickActions from '../shared/QuickActions';

const CustomerDashboard = () => {
  const [stats, setStats] = useState([]);
  const [recentPurchases, setRecentPurchases] = useState([]);
  const [customerActions, setCustomerActions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeDashboard = () => {
      // Stats Data for Customer
      const customerStats = [
        { label: 'Total Purchases', value: '₹45,600', icon: '🛒', color: 'text-gray-900' },
        { label: 'Outstanding', value: '₹2,500', icon: '📊', color: 'text-orange-600' },
        { label: 'Loyalty Points', value: 450, icon: '⭐', color: 'text-yellow-600' },
        { label: 'Total Orders', value: 12, icon: '📦', color: 'text-gray-900' }
      ];

      // Recent Purchases
      const purchasesData = [
        { 
          id: 1, 
          icon: '✅', 
          message: 'NPK Fertilizer - ₹1,200', 
          time: '3 days ago' 
        },
        { 
          id: 2, 
          icon: '✅', 
          message: 'Urea - ₹800', 
          time: '1 week ago' 
        },
        { 
          id: 3, 
          icon: '⏳', 
          message: 'Pending: DAP Fertilizer', 
          time: '2 weeks ago' 
        },
      ];

      // Customer Actions
      const actionsData = [
        { 
          label: 'Browse Products', 
          icon: '🛍️', 
          bgColor: 'bg-blue-50', 
          textColor: 'text-blue-700',
          onClick: () => console.log('Browse Products clicked')
        },
        { 
          label: 'Order History', 
          icon: '📋', 
          bgColor: 'bg-green-50', 
          textColor: 'text-green-700',
          onClick: () => console.log('Order History clicked')
        },
        { 
          label: 'Make Payment', 
          icon: '💳', 
          bgColor: 'bg-purple-50', 
          textColor: 'text-purple-700',
          onClick: () => console.log('Make Payment clicked')
        },
        { 
          label: 'Support', 
          icon: '📞', 
          bgColor: 'bg-orange-50', 
          textColor: 'text-orange-700',
          onClick: () => console.log('Support clicked')
        },
      ];

      setStats(customerStats);
      setRecentPurchases(purchasesData);
      setCustomerActions(actionsData);
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
        title="Customer Portal" 
        subtitle="Track your purchases and account information"
        gradient="from-purple-500 to-purple-600"
      />

      {/* Stats Grid */}
      <DashboardStats stats={stats} />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentPurchases} title="Recent Purchases" />
        <QuickActions actions={customerActions} title="Customer Services" />
      </div>

      {/* Account Summary */}
      <AccountSummary />
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

const AccountSummary = () => (
  <div className="bg-white rounded-xl shadow-sm border p-6">
    <h2 className="text-lg font-semibold mb-4">Account Summary</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <SummaryItem label="Credit Limit" value="₹50,000" />
      <SummaryItem label="Available Credit" value="₹47,500" />
      <SummaryItem label="Payment Due Date" value="15th Jan 2024" />
      <SummaryItem label="Customer Since" value="Jan 2023" />
    </div>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
    <span className="text-sm text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
  </div>
);

export default CustomerDashboard;