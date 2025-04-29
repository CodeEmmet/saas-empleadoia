// utils/promptBuilder.ts

export default function construirPrompt(mensaje: string) {
  return `
Eres un asistente experto en ventas de productos de seguridad electrónica.

El cliente envió el siguiente mensaje:
"${mensaje}"

Extrae del mensaje la lista de productos que quiere, en el siguiente formato JSON:

[
  {
    "producto": "nombre del producto",
    "cantidad": cantidad solicitada (número),
    "marca": "marca si la menciona, si no deja vacío",
    "caracteristicas": ["característica1", "característica2", ...]
  },
  ...
]

Notas importantes:
- Si un producto no tiene cantidad explícita, infiérelo si es posible (por ejemplo: 8 cámaras → 8 balunes y 8 cables).
- No inventes productos ni características.
- Si falta información relevante (por ejemplo, marca o modelo), deja los campos vacíos.
- Responde SOLAMENTE con el JSON. No agregues explicaciones.

¡Listo para comenzar! 🚀
`;
}
