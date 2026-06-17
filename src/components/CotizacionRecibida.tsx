import { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

export default function CotizacionRecibida() {
  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', 'noindex, nofollow');
  }, []);

  useEffect(() => {
    if (typeof window.fbq !== 'undefined') {
      window.fbq('track', 'Lead');
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
            <CheckCircle size={32} className="text-cyan-400" />
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-4">
          Cotización<br />
          <span className="text-cyan-400 italic">recibida.</span>
        </h1>

        <p className="text-slate-400 text-base leading-relaxed mb-8">
          El equipo DOMIS™ revisará tu solicitud y te contactará en las próximas horas para coordinar los detalles.
        </p>

        <a
          href="/"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-colors"
        >
          Volver al inicio
        </a>

        <p className="text-slate-600 text-xs mt-8 uppercase tracking-widest">
          DOMIS™ — Compra con certeza, no con esperanza.
        </p>

      </div>
    </div>
  );
}
