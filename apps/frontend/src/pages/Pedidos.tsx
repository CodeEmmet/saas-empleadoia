import { useEffect, useState } from 'react';
import { obtenerPedidos, actualizarEstadoPedido } from '../services/pedidoService';
import styles from './Pedidos.module.scss';
import PedidoRow from "../components/Pedidos/PedidoRow";

type Pedido = {
  id: number;
  estado: string;
  formaPago: string;
  total: number;
  creadoEn: string;
  items: {
    producto: {
      nombre: string;
    };
    cantidad: number;
  }
  cliente: {
    nombre: string;
  };
};

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);
  const [idAbierto, setIdAbierto] = useState<string | null>(null); // Estado para el pedido abierto

  useEffect(() => {
    const cargarPedidos = async () => {
      try {
        const data = await obtenerPedidos();
        setPedidos(data);
      } catch (error) {
        console.error('Error al obtener pedidos:', error);
      } finally {
        setCargando(false);
      }
    };

    cargarPedidos();
  }, []);

  const actualizarEstadoLocal = async (pedidoId: number, nuevoEstado: string) => {
    try {
      await actualizarEstadoPedido(pedidoId, nuevoEstado);

      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, estado: nuevoEstado } : pedido
        )
      );
    } catch (error) {
      console.error('Error actualizando estado del pedido:', error);
    }
  };

  return (
    <div className={styles.pedidosContainer}>
      <div className={styles.header}>
        <h2>Pedidos</h2>
        <button className={styles.crearBtn} disabled>
          Crear pedido
        </button>
      </div>

      {cargando ? (
        <p className={styles.mensaje}>Cargando pedidos...</p>
      ) : pedidos.length === 0 ? (
        <p className={styles.mensaje}>No hay pedidos registrados.</p>
      ) : (
        <table className={styles.tabla}>
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Cliente</th>
              <th>Productos</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <PedidoRow
                key={pedido.id}
                pedido={pedido}
                idAbierto={idAbierto}
                setIdAbierto={setIdAbierto} // Le pasamos el estado y la función para cambiarlo
                actualizarEstadoLocal={actualizarEstadoLocal}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
