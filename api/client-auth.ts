// Vercel serverless function (Node runtime). Clave compartida para la sección
// privada de clientes. CLIENT_ACCESS_PASSWORD vive solo en el servidor y es
// distinta de PCF_ACCESS_PASSWORD (esa abre el portal técnico).
import type { IncomingMessage, ServerResponse } from 'http';
import { timingSafeEqual } from 'crypto';

type VercelRequest = IncomingMessage & { body?: { password?: unknown }; method?: string };
type VercelResponse = ServerResponse & { status: (code: number) => VercelResponse; json: (body: unknown) => void };

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const expected = process.env.CLIENT_ACCESS_PASSWORD;
  if (!expected) {
    res.status(500).json({ error: 'Servidor mal configurado' });
    return;
  }

  const { password } = req.body ?? {};
  const a = Buffer.from(typeof password === 'string' ? password : '');
  const b = Buffer.from(expected);
  const ok = a.length === b.length && timingSafeEqual(a, b);

  // Frena fuerza bruta: cada intento fallido tarda 1 s.
  if (!ok) await sleep(1000);
  res.status(ok ? 200 : 401).json({ ok });
}
