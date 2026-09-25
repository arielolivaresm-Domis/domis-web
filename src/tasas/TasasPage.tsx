import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Lock } from 'lucide-react';
import TasasSubsidio from './TasasSubsidio';
import MortgageCalculator, { type TasaExterna } from './MortgageCalculator';
import ComparadorNuevaUsada from './ComparadorNuevaUsada';
import MarcaDomis from './MarcaDomis';
import AvisosLegales from './AvisosLegales';

const SESSION_KEY = 'domis_clientes_ok';

// Acceso con clave compartida. La clave se valida en el servidor (/api/client-auth)
// contra CLIENT_ACCESS_PASSWORD; nunca vive en el bundle. En desarrollo local
// (vite dev no sirve /api) se entra directo.
function leerSesion() {
  if (import.meta.env.DEV) return true;
  try { return sessionStorage.getItem(SESSION_KEY) === '1'; } catch { return false; }
}

export default function TasasPage() {
  const [autorizado, setAutorizado] = useState(leerSesion);
  const [tasaExterna, setTasaExterna] = useState<TasaExterna | null>(null);

  const simular = (valor: number, entidad: string) => {
    setTasaExterna({ valor, entidad, nonce: Date.now() });
    document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans">
      <Helmet>
        <title>Tasas con subsidio y simulador hipotecario</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {!autorizado ? (
        <Acceso onOk={() => {
          try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* modo privado */ }
          setAutorizado(true);
        }} />
      ) : (
        <>
          <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-900/80 px-4 sm:px-6 py-4">
            <div className="max-w-5xl mx-auto flex items-center justify-between">
              <MarcaDomis />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500 border border-slate-800 rounded-full px-3 py-1">Área clientes</span>
            </div>
          </header>
          <main>
            <TasasSubsidio onSimular={simular} />
            <MortgageCalculator tasaExterna={tasaExterna} />
            <ComparadorNuevaUsada />
          </main>
          <AvisosLegales />
        </>
      )}
    </div>
  );
}

function Acceso({ onOk }: { onOk: () => void }) {
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clave || enviando) return;
    setEnviando(true);
    setError('');
    try {
      const res = await fetch('/api/client-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: clave }),
      });
      const data = await res.json();
      if (data.ok) onOk();
      else setError('Clave incorrecta. Revisa la clave que te enviamos.');
    } catch {
      setError('No pudimos validar la clave. Intenta de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={enviar} className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
        <div className="flex items-center justify-between">
          <MarcaDomis grande />
          <Lock size={20} className="text-cyan-400" aria-hidden="true" />
        </div>
        <h1 className="mt-6 text-xl font-bold text-white">Acceso clientes</h1>
        <p className="mt-2 text-sm text-slate-400">Ingresa la clave que recibiste para ver el contenido.</p>
        <label htmlFor="clave" className="sr-only">Clave</label>
        <input
          id="clave"
          type="password"
          autoComplete="current-password"
          value={clave}
          onChange={e => setClave(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? 'clave-error' : undefined}
          className="mt-5 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          placeholder="Clave"
          autoFocus
        />
        {error && <p id="clave-error" role="alert" className="mt-2 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          disabled={!clave || enviando}
          className="mt-5 w-full rounded-full bg-cyan-400 py-2.5 text-sm font-bold text-slate-950 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 transition-colors"
        >
          {enviando ? 'Validando…' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}
