import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Si no está autenticado, redirigimos al login
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
