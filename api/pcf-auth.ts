// Vercel serverless function (Node runtime). Keeps PCF_ACCESS_PASSWORD server-side only.
import type { IncomingMessage, ServerResponse } from 'http';

type VercelRequest = IncomingMessage & { body?: any; method?: string };
type VercelResponse = ServerResponse & { status: (code: number) => VercelResponse; json: (body: unknown) => void };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const expected = process.env.PCF_ACCESS_PASSWORD;
  if (!expected) {
    res.status(500).json({ error: 'Servidor mal configurado' });
    return;
  }

  const { password } = req.body ?? {};
  const ok = typeof password === 'string' && password === expected;
  res.status(ok ? 200 : 401).json({ ok });
}
