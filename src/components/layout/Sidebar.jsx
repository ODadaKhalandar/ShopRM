import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = ({ activeModule, setActiveModule }) => {
  const { user, logout } = useAuth(); // ✅ Added logout here
  const navigate = useNavigate();
  const location = useLocation();

  // Get module based on current path
  const getCurrentModule = () => {
    const path = location.pathname;
    if (path.includes('/sales')) return 'sales';
    if (path.includes('/products')) return 'products';
    if (path.includes('/customers')) return 'customers';
    if (path.includes('/inventory')) return 'inventory';
    if (path.includes('/reports')) return 'reports';
    if (path.includes('/settings')) return 'settings';
    return 'dashboard';
  };

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    
    // Navigate to the corresponding route
    switch (moduleId) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'sales':
        navigate('/sales');
        break;
      case 'products':
        navigate('/products');
        break;
      case 'customers':
        navigate('/customers');
        break;
      case 'inventory':
        navigate('/inventory');
        break;
      case 'reports':
        navigate('/reports');
        break;
      case 'settings':
        navigate('/settings');
        break;
      default:
        navigate('/dashboard');
    }
  };

  const getAvailableModules = () => {
    if (!user?.permissions) return [];
    
    const modules = [
      { id: 'dashboard', name: 'Dashboard', icon: '📊', permission: 'dashboard' },
      { id: 'sales', name: 'Sales', icon: '💰', permission: 'sales' },
      { id: 'products', name: 'Products', icon: '📦', permission: 'products' },
      { id: 'customers', name: 'Customers', icon: '👥', permission: 'customers' },
      { id: 'inventory', name: 'Inventory', icon: '📋', permission: 'inventory' },
      { id: 'reports', name: 'Reports', icon: '📈', permission: 'reports' },
      { id: 'settings', name: 'Settings', icon: '⚙️', permission: 'settings' },
    ];

    return modules.filter(module => 
      user.permissions[module.permission]?.includes('read')
    );
  };

  const availableModules = getAvailableModules();
  const currentModule = getCurrentModule();

  const handleLogout = () => {
    logout(); // ✅ Now properly defined
  };

  return (
    <div className="w-64 bg-green-800 text-white h-screen fixed left-0 top-0 p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">🌱 AgriBiz</h1>
        <p className="text-green-200 text-sm mt-1">
          {user?.shopName || 'My Shop'}
        </p>
      </div>

      {/* User Info */}
      <div className="mb-6 p-3 bg-green-700 rounded-lg">
        <p className="font-semibold">{user?.name}</p>
        <p className="text-green-200 text-sm capitalize">{user?.role}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {availableModules.map((module) => (
          <button
            key={module.id}
            onClick={() => handleModuleClick(module.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-3 ${
              currentModule === module.id
                ? 'bg-green-600 text-white'
                : 'text-green-100 hover:bg-green-700'
            }`}
          >
            <span className="text-lg">{module.icon}</span>
            <span>{module.name}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleLogout} 
          className="w-full text-left px-4 py-3 rounded-lg transition flex items-center space-x-3 text-green-100 hover:bg-green-700"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;