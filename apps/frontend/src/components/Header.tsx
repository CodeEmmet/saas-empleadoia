// src/components/Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <input type="text" placeholder="Buscar..." className={styles.searchBar} />
      <div className={styles.profile}>
        <span className={styles.user}>Hola, {username}</span>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className={styles.avatar}
        />
        <button className={styles.logoutButton} onClick={handleLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;
