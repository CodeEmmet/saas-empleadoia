// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>Dashboard</div>
      <ul>
        <li>
          <Link to="/dashboard" className={styles.link}>Dashboard</Link>
        </li>
        <li>
          <Link to="/clientes" className={styles.link}>Clientes</Link>
        </li>
        {/* Agrega más enlaces según sea necesario */}
      </ul>
    </div>
  );
};

export default Sidebar;
