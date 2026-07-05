// Vercel serverless function (Node runtime). Keeps the Google Apps Script URL server-side
// and validates/sanitizes input before forwarding it, instead of the client posting directly.
import type { IncomingMessage, ServerResponse } from 'http';

type VercelRequest = IncomingMessage & { body?: any; method?: string };
type VercelResponse = ServerResponse & { status: (code: number) => VercelResponse; json: (body: unknown) => void };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLen: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLen) : '';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    res.status(500).json({ error: 'Servidor mal configurado' });
    return;
  }

  const body = req.body ?? {};

  // Honeypot: real users never fill this hidden field.
  if (clean(body.website, 200)) {
    res.status(200).json({ ok: true });
    return;
  }

  const nombre = clean(body.nombre, 120);
  const telefono = clean(body.telefono, 30);
  const email = clean(body.email, 150);

  if (!nombre || !telefono || !email || !EMAIL_RE.test(email)) {
    res.status(400).json({ error: 'Datos inválidos' });
    return;
  }

  try {
    await fetch(scriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        Asunto: 'CONSULTA SISTEMA DOMIS',
        Nombre: nombre,
        Telefono: telefono,
        Email: email,
      }),
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(502).json({ error: 'Error al enviar' });
  }
}
