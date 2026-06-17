import { useState } from 'react';
import { Search, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import Section from './layout/Section';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const PRICE_PER_M2 = 2200;

const RATIO: Record<number, { busca: string }> = {
  1: { busca: '2' },
  2: { busca: '3' },
  3: { busca: '4-5' },
};

export default function Sourcing() {
  const [quiero, setQuiero] = useState(1);
  const [meters, setMeters] = useState(100);

  const effectiveMeters = Math.max(100, meters);
  const total            = effectiveMeters * PRICE_PER_M2;
  const ratio            = RATIO[quiero];

  const handleWhatsApp = () => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'cotizacion_sourcing', {
        event_category: 'Conversion',
        event_label: 'Sourcing',
        value: total,
        cantidad_propiedades: quiero,
        metros_cuadrados: effectiveMeters,
      });
    }
    const mensaje = `Hola DOMIS™, quiero el servicio de Sourcing + Auditoría. Necesito evaluar ${quiero} propiedad${quiero > 1 ? 'es' : ''} de ~${effectiveMeters}m². Inversión estimada: $${total.toLocaleString()} + IVA. ¡Vamos!`;
    window.open(`https://wa.me/56929901343?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <Section id="sourcing" className="py-0 md:py-5 lg:py-8 px-0 md:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.webp')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      {/* HEADER */}
      <div className="text-center mb-5 md:mb-8 relative z-10 px-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
          <Search size={16} className="text-cyan-400" />
          <span className="text-[11px] md:text-[13px] font-mono text-cyan-400 uppercase tracking-widest font-black">
            Inteligencia de Mercado
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-3 leading-none">
          Buscamos <span className="text-cyan-400">por ti</span>
        </h2>
        <p className="text-base md:text-lg text-slate-300 font-light uppercase tracking-wide">
          Tu tiempo es <span className="text-cyan-500 font-bold italic">Dinero</span>
        </p>
      </div>

      {/* TARJETA ÚNICA */}
      <div className="max-w-2xl mx-auto relative z-10 px-4 md:px-0 mb-6 md:mb-8">
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-y-2 md:border-2 border-cyan-500/30 p-4 md:p-7 rounded-none md:rounded-[2.5rem] relative shadow-2xl">

          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-cyan-500/10 rounded-xl">
              <Search className="text-cyan-400 w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic leading-none">Sourcing + Auditoría</h3>
              <p className="text-cyan-400 text-[11px] font-black uppercase tracking-widest mt-1">${PRICE_PER_M2.toLocaleString()}/m² + IVA</p>
            </div>
          </div>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium mb-8">
            No tienes propiedad aún. <span className="text-white italic">DOMIS™ busca, filtra y pre-audita las mejores opciones del mercado. Tú solo eliges.</span>
          </p>

          <div className="bg-slate-950/80 rounded-xl md:rounded-[2rem] p-4 md:p-5 border border-cyan-900/30 mb-5 shadow-inner space-y-5">

            {/* ¿Cuántas quieres evaluar? */}
            <div>
              <label className="text-[12px] font-black uppercase text-cyan-500 mb-3 block tracking-widest">
                ¿Cuántas propiedades quieres evaluar?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                  <button
                    key={n}
                    onClick={() => setQuiero(n)}
                    className={`flex-1 py-3 rounded-xl font-black text-sm transition-all border-2 ${
                      quiero === n
                        ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                        : 'border-slate-800 text-slate-500 hover:border-slate-600'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-3 mt-3 flex items-center justify-between text-[11px] font-black uppercase tracking-widest">
                <span className="text-slate-400 flex items-center gap-2">
                  <Search size={12} className="text-cyan-400" />
                  Buscamos: <span className="text-cyan-400">{ratio.busca} prop.</span>
                </span>
                <span className="text-slate-400 flex items-center gap-2">
                  <CheckCircle size={12} className="text-cyan-400" />
                  Auditas: <span className="text-white">{quiero}</span>
                </span>
              </div>
            </div>

            {/* Metraje */}
            <div>
              <label className="text-[12px] font-black uppercase text-cyan-500 mb-3 block tracking-widest">Metraje m² (mín. 100m²):</label>
              <div className="relative">
                <input
                  type="number"
                  value={meters}
                  onChange={e => setMeters(Number(e.target.value))}
                  onBlur={() => setMeters(v => Math.max(100, v))}
                  className="w-full bg-slate-900 border-2 border-slate-800 rounded-xl px-4 py-3 text-white font-mono text-base outline-none focus:border-cyan-500 transition-all"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-xs font-bold">M²</span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-cyan-900/20 flex justify-between items-center">
              <span className="text-[10px] text-cyan-500 uppercase font-black tracking-widest">Total Est.:</span>
              <span className="text-white font-mono font-black text-xl">${total.toLocaleString()} <span className="text-slate-500 text-xs">+ IVA</span></span>
            </div>
          </div>

          <button
            onClick={handleWhatsApp}
            className="w-full bg-cyan-500 hover:bg-white text-slate-950 py-5 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
          >
            <MessageCircle size={18} /> Activar Sourcing
          </button>
        </div>
      </div>

      {/* PIE */}
      <div className="max-w-2xl mx-auto text-center border-t border-slate-900 pt-8 md:pt-12 relative z-10 px-4">
        <div className="flex items-center justify-center gap-3 mb-6 text-slate-500">
          <Clock size={18} />
          <p className="text-sm md:text-base italic">
            "Si tu agenda se complica, <span className="text-slate-300 font-bold not-italic">DOMIS™ no se detiene.</span>"
          </p>
        </div>
        <div className="tracking-[0.4em] md:tracking-[0.6em] text-slate-500 text-[11px] md:text-[13px] font-black uppercase">
          VAMOS POR <span className="text-cyan-500">TI</span>
        </div>
      </div>
    </Section>
  );
}
