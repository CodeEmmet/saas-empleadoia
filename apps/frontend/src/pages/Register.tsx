import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.scss';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!validateEmail(form.email)) {
      return setError('El correo no tiene un formato válido.');
    }

    setLoading(true);
    try {
      // Verificamos si el username ya existe
      const check = await axios.get('http://localhost:3000/auth/exists', {
        params: { username: form.username }
      });

      if (check.data.exists) {
        return setError('El nombre de usuario ya está en uso.');
      }

      // Registro del usuario
      await axios.post('http://localhost:3000/auth/register', form);
      setSuccessMsg('Usuario registrado correctamente');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: any) {
      setError('Error al registrar. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Crear cuenta</h2>

        {error && <div className={styles.error}>{error}</div>}
        {successMsg && <div className={styles.success}>{successMsg}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className={styles.footer}>
          ¿Ya tenés cuenta? <Link to="/login">Iniciar sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
