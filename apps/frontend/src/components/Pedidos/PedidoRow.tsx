import React, { useState } from "react";
import { actualizarEstadoPedido } from '../../services/pedidoService';

interface PedidoRowProps {
  pedido: any; // Podés tiparlo mejor si tenés una interfaz `Pedido`
}

const PedidoRow: React.FC<PedidoRowProps> = ({ pedido }) => {
  const [expandido, setExpandido] = useState(false);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  // Manejar el cambio de estado de cada pedido
  const handleEstadoChange = async (pedidoId: number, nuevoEstado: string) => {
    try {
      // Llamada al backend para actualizar el estado
      await actualizarEstadoPedido(pedidoId, nuevoEstado);
      
      // Actualización local del estado del pedido
      setPedidos((prevPedidos) =>
        prevPedidos.map((pedido) =>
          pedido.id === pedidoId ? { ...pedido, estado: nuevoEstado } : pedido
        )
      );
    } catch (error) {
      console.error('Error al actualizar el estado del pedido:', error);
    }
  };

  return (
    <>
      <tr>
        <td>{pedido.id}</td>
        <td>{pedido.cliente?.nombre || "N/A"}</td>
        <td>
            {pedido.items.map((item) => (
            <div key={item.id}>
                {item.producto?.nombre} x{item.cantidad}
            </div>
            ))}
        </td>
        <td>${Number(pedido.total).toFixed(2)}</td>
        <td>
            <select
                value={pedido.estado}
                onChange={(e) => handleEstadoChange(pedido.id, e.target.value)}
                >
                <option value="pendiente">Pendiente</option>
                <option value="confirmado">Confirmado</option>
                <option value="enviado">Enviado</option>
                <option value="entregado">Entregado</option>
            </select>
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
            <p>
              Forma de pago: {pedido.formaPago} 
            </p>
            <p>Fecha de creación: {new Date(pedido.creadoEn).toLocaleString()}</p>
          </td>
        </tr>
      )}
    </>
  );
};

export default PedidoRow;