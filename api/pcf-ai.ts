// Vercel serverless function (Node runtime). Keeps GEMINI_API_KEY server-side only.
import type { IncomingMessage, ServerResponse } from 'http';
import { GoogleGenAI } from '@google/genai';

type VercelRequest = IncomingMessage & { body?: any; method?: string };
type VercelResponse = ServerResponse & { status: (code: number) => VercelResponse; json: (body: unknown) => void };

const DOMIS_SYSTEM_PROMPT = 'Eres un asistente experto en auditoría técnica inmobiliaria para DOMIS™, un buyer\'s agent técnico en Chile. Responde siempre en español, de forma profesional y concisa.';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Servidor mal configurado' });
    return;
  }

  const { action, address, type, m2Useful, amenities } = req.body ?? {};

  if (action !== 'generate-id' && action !== 'generate-description') {
    res.status(400).json({ error: 'Acción inválida' });
    return;
  }

  if (typeof address !== 'string' || !address.trim() || address.length > 300) {
    res.status(400).json({ error: 'Dirección inválida' });
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    if (action === 'generate-id') {
      const prompt = `${DOMIS_SYSTEM_PROMPT}\nGenera un ID único (Máx 6 chars, mayúsculas/números) para auditoría en: "${address}". Formato: LC1024. SOLO EL CÓDIGO.`;
      const response = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: prompt });
      const code = response.text?.trim().replace(/[^A-Z0-9]/g, '').substring(0, 6) || 'ERR00';
      res.status(200).json({ code });
      return;
    }

    const safeType = typeof type === 'string' ? type.slice(0, 60) : '';
    const safeM2 = typeof m2Useful === 'string' || typeof m2Useful === 'number' ? String(m2Useful).slice(0, 20) : '';
    const safeAmenities = typeof amenities === 'string' ? amenities.slice(0, 300) : '';

    const prompt = `${DOMIS_SYSTEM_PROMPT}\nEscribe una descripción inmobiliaria profesional y vendedora para: ${address}. Tipo: ${safeType}. ${safeM2}m2 útiles. Amenities: ${safeAmenities}.`;
    const response = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: prompt });
    res.status(200).json({ text: response.text || '' });
  } catch (e: any) {
    console.error(e);
    res.status(502).json({ error: 'Error al generar contenido con IA' });
  }
}
