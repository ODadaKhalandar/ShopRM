import { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        loading: false,
        error: null
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'LOGOUT':
      return { 
        user: null, 
        isAuthenticated: false, 
        loading: false, 
        error: null 
      };
    default:
      return state;
  }
};

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true, // Start with loading to check existing session
  error: null
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing session on app start
  useEffect(() => {
    const checkExistingAuth = async () => {
      const sessionId = localStorage.getItem('sessionId');
      const tenantSubdomain = localStorage.getItem('tenantSubdomain');
      
      if (sessionId && tenantSubdomain) {
        try {
          // For session-based auth, we don't call profile endpoint
          // Instead, we'll create a mock user based on session ID
          const userRole = getRoleFromSessionId(sessionId);
          const mockUser = createMockUser(userRole, tenantSubdomain);
          
          dispatch({ type: 'SET_USER', payload: mockUser });
        } catch (error) {
          console.log('No valid session found');
          authAPI.logout();
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkExistingAuth();
  }, []);

  // Helper function to determine role from session ID
  const getRoleFromSessionId = (sessionId) => {
    if (sessionId.includes('manager')) return 'manager';
    if (sessionId.includes('executive')) return 'executive';
    if (sessionId.includes('customer')) return 'customer';
    return 'customer'; // default
  };

  // Create mock user for session-based auth
  const createMockUser = (role, subdomain) => {
    const users = {
      manager: {
        id: 'manager-123',
        name: 'Shop Manager',
        email: 'manager@' + subdomain + '.com',
        role: 'manager',
        tenantId: 'tenant-' + subdomain,
        permissions: {
          dashboard: ['read', 'write', 'export'],
          products: ['create', 'read', 'update', 'delete', 'export'],
          customers: ['create', 'read', 'update', 'delete', 'export'],
          orders: ['create', 'read', 'update', 'delete', 'export', 'approve'],
          reports: ['create', 'read', 'update', 'delete', 'export'],
          inventory: ['create', 'read', 'update', 'delete', 'export']
        }
      },
      executive: {
        id: 'executive-123',
        name: 'Sales Executive',
        email: 'executive@' + subdomain + '.com',
        role: 'executive',
        tenantId: 'tenant-' + subdomain,
        permissions: {
          dashboard: ['read', 'export'],
          customers: ['create', 'read', 'update', 'export'],
          orders: ['create', 'read', 'update', 'export'],
          reports: ['read', 'export']
        }
      },
      customer: {
        id: 'customer-123',
        name: 'Regular Customer',
        email: 'customer@' + subdomain + '.com',
        role: 'customer',
        tenantId: 'tenant-' + subdomain,
        permissions: {
          dashboard: ['read'],
          orders: ['create', 'read']
        }
      }
    };

    return users[role] || users.customer;
  };

  // Session-based login function
  const login = async (credentials) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // For session-based auth, we don't actually call login API
      // Instead, we simulate login based on session ID pattern
      const sessionId = credentials.email.includes('manager') ? 'manager_session' :
                       credentials.email.includes('executive') ? 'executive_session' : 
                       'customer_session';
      
      // Store session in localStorage
      localStorage.setItem('sessionId', sessionId);
      localStorage.setItem('tenantSubdomain', credentials.tenantSubdomain);
      
      // Create mock user
      const userRole = getRoleFromSessionId(sessionId);
      const mockUser = createMockUser(userRole, credentials.tenantSubdomain);
      
      dispatch({ type: 'SET_USER', payload: mockUser });
      
      return { 
        success: true, 
        data: { 
          user: mockUser, 
          sessionId, 
          tenantSubdomain: credentials.tenantSubdomain 
        } 
      };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    authAPI.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};