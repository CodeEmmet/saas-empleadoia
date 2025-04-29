import axios from 'axios';
import * as dotenv from 'dotenv';
import construirPrompt from '../../../utils/promptBuilder';

dotenv.config();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error('⚠️ No se encontró la variable OPENAI_API_KEY en el .env');
}

export const procesarConOpenAI = async (mensaje: string): Promise<any[] | null> => {
  try {
    const prompt = construirPrompt(mensaje);
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices?.[0]?.message?.content?.trim();
    if (!content) return null;
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ Error en OpenAI:', error);
    return null;
  }
};
