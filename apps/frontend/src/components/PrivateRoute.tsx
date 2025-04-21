import { Navigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // En un futuro podrías validar si el token expiró o hacer una llamada al backend
    setIsAuth(!!token);
  }, []);

  if (isAuth === null) {
    // Mientras determina si hay autenticación (puede mostrar un spinner)
    return <div className="flex items-center justify-center h-screen">Cargando...</div>;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

