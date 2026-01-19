import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useGlobalContext from '../config/GlobalStateContext';

const ProtectedRoute = () => {
  const {authLoading, userLoggedIn } = useGlobalContext();

const localStoredLogin = localStorage.getItem('login')
  // 2. Not logged in → redirect
  if (!localStoredLogin) {
    return <Navigate to="/" replace />;
  }

  // 3. Logged in → allow access
  return <Outlet />;
};

export default ProtectedRoute;
