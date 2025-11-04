import { createContext, useContext, useReducer } from 'react';

const TenantContext = createContext();

const tenantReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TENANT':
      return { 
        ...state, 
        currentTenant: action.payload,
        currentSubdomain: action.payload?.shopDomain 
      };
    case 'SET_SUBDOMAIN':
      return { ...state, currentSubdomain: action.payload };
    default:
      return state;
  }
};

const initialState = {
  currentTenant: null,
  currentSubdomain: null
};

export const TenantProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tenantReducer, initialState);

  const setTenant = (tenant) => {
    localStorage.setItem('tenantSubdomain', tenant.shopDomain);
    dispatch({ type: 'SET_TENANT', payload: tenant });
  };

  const setSubdomain = (subdomain) => {
    localStorage.setItem('tenantSubdomain', subdomain);
    dispatch({ type: 'SET_SUBDOMAIN', payload: subdomain });
  };

  const value = {
    ...state,
    setTenant,
    setSubdomain
  };

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};