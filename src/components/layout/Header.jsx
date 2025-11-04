import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onLogout }) => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 text-sm">
            {user?.role === 'manager' ? 'Shop Manager' : 
             user?.role === 'executive' ? 'Sales Executive' : 'Customer'}
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <button
            onClick={onLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;