import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TenantProvider } from './contexts/TenantContext';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';

// Dashboard Components - CORRECTED IMPORTS
import ManagerDashboard from './components/dashboard/manager/ManagerDashboard';
import ExecutiveDashboard from './components/dashboard/executive/ExecutiveDashboard';
import CustomerDashboard from './components/dashboard/customer/CustomerDashboard';

// Module Components (Create these as placeholder first)
const Sales = () => <div className="p-6">Sales Module - Coming Soon</div>;
const Products = () => <div className="p-6">Products Module - Coming Soon</div>;
const Customers = () => <div className="p-6">Customers Module - Coming Soon</div>;
const Inventory = () => <div className="p-6">Inventory Module - Coming Soon</div>;
const Reports = () => <div className="p-6">Reports Module - Coming Soon</div>;
const Settings = () => <div className="p-6">Settings Module - Coming Soon</div>;

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <div className="p-6 text-center">Access Denied</div>;
  }
  
  return children;
};

// Role-based Dashboard Component
const RoleDashboard = () => {
  const { user } = useAuth();
  
  switch (user?.role) {
    case 'manager':
      return <ManagerDashboard />;
    case 'executive':
      return <ExecutiveDashboard />;
    case 'customer':
      return <CustomerDashboard />;
    default:
      return <ManagerDashboard />;
  }
};

// Main App Content with Routing
const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" replace />} />
        
        {/* Protected Routes */}
        <Route path="/*" element={
          user ? (
            <Layout>
              <Routes>
                {/* Dashboard */}
                <Route path="/dashboard" element={<RoleDashboard />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                
                {/* Manager & Executive Routes */}
                <Route path="/sales" element={
                  <ProtectedRoute allowedRoles={['manager', 'executive']}>
                    <Sales />
                  </ProtectedRoute>
                } />
                
                <Route path="/products" element={
                  <ProtectedRoute allowedRoles={['manager', 'executive']}>
                    <Products />
                  </ProtectedRoute>
                } />
                
                <Route path="/customers" element={
                  <ProtectedRoute allowedRoles={['manager', 'executive']}>
                    <Customers />
                  </ProtectedRoute>
                } />
                
                {/* Manager Only Routes */}
                <Route path="/inventory" element={
                  <ProtectedRoute allowedRoles={['manager']}>
                    <Inventory />
                  </ProtectedRoute>
                } />
                
                <Route path="/reports" element={
                  <ProtectedRoute allowedRoles={['manager']}>
                    <Reports />
                  </ProtectedRoute>
                } />
                
                <Route path="/settings" element={
                  <ProtectedRoute allowedRoles={['manager']}>
                    <Settings />
                  </ProtectedRoute>
                } />
                
                {/* 404 Page */}
                <Route path="*" element={<div className="p-6 text-center">Page Not Found</div>} />
              </Routes>
            </Layout>
          ) : (
            <Navigate to="/login" replace />
          )
        } />
      </Routes>
    </Router>
  );
};

// Main App Component
function App() {
  return (
    <AuthProvider>
      <TenantProvider>
        <AppContent />
      </TenantProvider>
    </AuthProvider>
  );
}

export default App;