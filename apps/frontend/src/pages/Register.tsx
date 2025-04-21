import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Autenticación real
    localStorage.setItem('token', 'demo'); // simulación
    navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
        <input type="text" placeholder="Email" className="w-full p-2 border mb-2 rounded" />
        <input type="password" placeholder="Contraseña" className="w-full p-2 border mb-4 rounded" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
        <p className="mt-4 text-sm text-center">
          ¿No tenés cuenta? <Link to="/register" className="text-blue-600">Crear usuario</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
