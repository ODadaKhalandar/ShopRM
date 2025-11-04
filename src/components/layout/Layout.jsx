import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import MobileNav from './MobileNav';

const Layout = ({ children }) => {
  const { logout } = useAuth();
  const [activeModule, setActiveModule] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 min-h-screen">
        <Header onLogout={logout} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;