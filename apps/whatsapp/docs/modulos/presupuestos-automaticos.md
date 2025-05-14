# Presupuestos Automáticos

## Objetivo
Permitir que el cliente reciba un presupuesto aproximado sin intervención humana, basado en los productos de la base de datos.

## Tipología
**IA + lógica estructurada**

## Flujo sugerido

1. 🛒 **Recepción del pedido**
   - Cliente describe necesidad: "Necesito 3 cámaras y una alarma para un comercio".

2. 🧠 **Análisis del mensaje**
   - IA estructura los productos y cantidades.

3. 💾 **Consulta de precios en DB**
   - Se calcula precio según stock, promociones o tarifas vigentes.

4. 🧾 **Generación de presupuesto**
   - Se devuelve detalle + precio total + vencimiento del presupuesto.

5. 📩 **Opcional: envío por email o PDF**
   - Se ofrece enviar el presupuesto formal.

## Observaciones
Se puede mejorar si se asocia con un sistema de “carrito” interno y con validación de stock antes de confirmar.
