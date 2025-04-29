export type ProveedorIA = 'openai' | 'openrouter';

export const configuracionIA: {
  ordenPreferido: ProveedorIA[];
} = {
  ordenPreferido: ['openai', 'openrouter']  // ← Puedes cambiar el orden
};
