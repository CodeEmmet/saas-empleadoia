import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import styles from './DashboardLayout.module.scss';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.content}>
        <Header />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

