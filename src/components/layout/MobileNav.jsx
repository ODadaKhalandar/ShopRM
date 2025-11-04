import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const MobileNav = ({ activeModule, setActiveModule }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const getAvailableModules = () => {
    if (!user?.permissions) return [];
    
    const modules = [
      { id: 'dashboard', name: 'Dashboard', icon: '📊', permission: 'dashboard' },
      { id: 'products', name: 'Products', icon: '📦', permission: 'products' },
      { id: 'customers', name: 'Customers', icon: '👥', permission: 'customers' },
      { id: 'orders', name: 'Orders', icon: '💰', permission: 'orders' },
      { id: 'reports', name: 'Reports', icon: '📈', permission: 'reports' },
    ];

    return modules.filter(module => 
      user.permissions[module.permission]?.includes('read')
    );
  };

  const availableModules = getAvailableModules();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-green-600 text-white p-3 rounded-lg"
      >
        ☰
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed top-0 left-0 h-full w-64 bg-green-800 text-white z-50 transform transition-transform
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">🌱 Fertilizer ERP</h1>
            <p className="text-green-200 text-sm mt-1 capitalize">
              {user?.role}
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {availableModules.map((module) => (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-3 ${
                  activeModule === module.id
                    ? 'bg-green-600 text-white'
                    : 'text-green-100 hover:bg-green-700'
                }`}
              >
                <span className="text-lg">{module.icon}</span>
                <span>{module.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileNav;