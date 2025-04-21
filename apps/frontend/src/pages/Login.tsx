import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Enviar solicitud al backend para autenticar
      const response = await axios.post('http://localhost:3000/auth/dto/login.dto', {
        correo: username,
        password,
      });

      // Guardar el token JWT en el localStorage
      localStorage.setItem('token', response.data.access_token);

      // Redirigir al dashboard
      navigate('/dashboard');
    } catch (error) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Iniciar sesión</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Usuario</label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Contraseña</label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
