import { client } from './client';
import { handleIncomingMessage } from './handlers/messageHandler';
import qrcode from 'qrcode-terminal';

// Evento para mostrar el QR
client.on('qr', (qr) => {
  console.log('Escanea este QR con tu WhatsApp:');
  qrcode.generate(qr, { small: true });
});

// Evento para indicar que el cliente está listo
client.on('ready', () => {
  console.log('✅ Cliente de WhatsApp listo!');
});

// Evento para manejar mensajes entrantes
client.on('message', handleIncomingMessage);

// Inicializar WhatsApp
client.initialize();
