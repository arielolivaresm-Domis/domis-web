import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans flex items-center justify-center px-6">
      <Helmet>
        <title>Página no encontrada | DOMIS™</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="max-w-md text-center">
        <p className="text-cyan-400 font-black text-sm uppercase tracking-widest mb-4">Error 404</p>
        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
          Esta página no existe
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed mb-8">
          El contenido que buscas fue movido o nunca existió en esta URL. Revisa el blog o vuelve al inicio.
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Volver al inicio <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
