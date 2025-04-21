// src/router.tsx o src/App.tsx (según tu estructura)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import PrivateRoute from './components/PrivateRoute';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirige al login si no está autenticado */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/usuarios" element={<Usuarios />} />
          {/* Agrega otras rutas privadas aquí */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;


