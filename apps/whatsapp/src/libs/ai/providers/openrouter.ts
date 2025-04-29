import axios from 'axios';
import * as dotenv from 'dotenv';
import construirPrompt from '../../../utils/promptBuilder';

dotenv.config();

const openrouterApiKey = process.env.OPENROUTER_API_KEY;

if (!openrouterApiKey) {
  throw new Error('⚠️ No se encontró la variable OPENAI_API_KEY en el .env');
}

export const procesarConOpenRouter = async (mensaje: string): Promise<any[] | null> => {
  try {
    const prompt = construirPrompt(mensaje);
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: "openai/gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${openrouterApiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices?.[0]?.message?.content?.trim();
    if (!content) return null;
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ Error en OpenRouter:', error);
    return null;
  }
};
