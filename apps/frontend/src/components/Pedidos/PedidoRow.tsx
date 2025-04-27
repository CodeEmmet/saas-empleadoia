import React, { useState } from "react";
import { actualizarEstadoPedido } from '../../services/pedidoService';
import styles from './PedidoRow.module.scss'; // Creamos un CSS nuevo
import { toast } from 'react-hot-toast'; // Importamos react-hot-toast

interface PedidoRowProps {
  pedido: any;
  idAbierto: string | null; // Prop para el pedido abierto
  setIdAbierto: React.Dispatch<React.SetStateAction<string | null>>; // Función para cambiar el pedido abierto
}

const PedidoRow: React.FC<PedidoRowProps> = ({ pedido, idAbierto, setIdAbierto }) => {
  const [expandido, setExpandido] = useState(false);
  const [estadoActual, setEstadoActual] = useState(pedido.estado);

  const handleEstadoChange = async (nuevoEstado: string) => {
    try {
      await actualizarEstadoPedido(pedido.id, nuevoEstado);
      setEstadoActual(nuevoEstado);
      setIdAbierto(null); // Cerramos el selector después de cambiar el estado
      toast.success(`Estado actualizado a "${nuevoEstado}"`);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast.error('Hubo un error al actualizar el estado');
    }
  };

  const getColorClase = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return styles.pendiente;
      case 'confirmado':
        return styles.confirmado;
      case 'enviado':
        return styles.enviado;
      case 'entregado':
        return styles.entregado;
      default:
        return '';
    }
  };

  const toggleMostrarOpciones = (id: string) => {
    // Si el pedido que estamos clickeando es el mismo que ya está abierto, lo cerramos
    setIdAbierto(idAbierto === id ? null : id);
  };

  return (
    <>
      <tr>
        <td>{pedido.id}</td>
        <td>{pedido.cliente?.nombre || "N/A"}</td>
        <td>
          {pedido.items.map((item: any) => (
            <div key={item.id}>
              {item.producto?.nombre} x{item.cantidad}
            </div>
          ))}
        </td>
        <td>${Number(pedido.total).toFixed(2)}</td>
        <td>
          <div
            className={`${styles.estadoBadge} ${getColorClase(estadoActual)}`}
            onClick={() => toggleMostrarOpciones(pedido.id)} // Alternamos el estado de este pedido
          >
            {estadoActual}
          </div>
          {idAbierto === pedido.id && ( // Solo mostramos las opciones si el pedido es el abierto
            <div className={styles.opcionesEstado}>
              {['pendiente', 'confirmado', 'enviado', 'entregado'].map((estado) => (
                <div
                  key={estado}
                  className={styles.opcion}
                  onClick={() => handleEstadoChange(estado)}
                >
                  {estado}
                </div>
              ))}
            </div>
          )}
        </td>
        <td>
          <button onClick={() => setExpandido(!expandido)}>
            {expandido ? "🔼 Ocultar" : "🔽 Ver detalle"}
          </button>
        </td>
      </tr>

      {expandido && (
        <tr>
          <td colSpan={7}>
            <ul style={{ marginLeft: "1rem" }}>
              {pedido.items.map((item: any) => (
                <li key={item.id}>
                  {item.producto?.nombre} x{item.cantidad}
                </li>
              ))}
            </ul>
            <p>Forma de pago: {pedido.formaPago}</p>
            <p>Fecha de creación: {new Date(pedido.creadoEn).toLocaleString()}</p>
          </td>
        </tr>
      )}
    </>
  );
};

export default PedidoRow;
