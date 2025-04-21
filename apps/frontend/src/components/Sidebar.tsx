import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside style={{ width: '200px', background: '#1f2937', color: 'white', height: '100vh', padding: '1rem' }}>
      <h2>Panel</h2>
      <nav>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/dashboard">Inicio</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/usuarios">Usuarios</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/productos">Productos</Link></li>
          <li><Link style={{ color: 'white', textDecoration: 'none' }} to="/pedidos">Pedidos</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
