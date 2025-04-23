// src/services/pedidoService.ts
import api from './api';

export const obtenerPedidos = async () => {
  const response = await api.get('/pedidos');
  return response.data;
};

export const actualizarEstadoPedido = async (pedidoId: number, estado: string) => {
  const response = await api.put(`/pedidos/${pedidoId}/estado`, { estado });
  return response.data;
};

