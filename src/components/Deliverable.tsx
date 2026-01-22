/**
 * COMPONENTE: Deliverable.tsx
 * Fase 2: Estrategia de Negociación Técnica
 * Proyecto: DOMIS™
 */
export default function Deliverable() {
  return (
    <section id="negociacion" className="py-24 bg-slate-950 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto text-center">
        
        {/* ETIQUETA DE FASE 2 */}
        <div className="inline-block px-8 py-2.5 rounded-full border-2 border-cyan-500 bg-cyan-500/20 text-cyan-400 text-sm font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
          Fase 2: Negociación Técnica
        </div>
          
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase mb-6 tracking-tighter leading-tight">
          Tu Poder en la Mesa de <br className="hidden md:block" />
          <span className="text-cyan-400">Negociación</span>
        </h2>
        <p className="text-slate-400 italic max-w-2xl mx-auto mb-16">
          El Reporte genera automáticamente tu estrategia de ahorro basada estrictamente en el saneamiento de patologías críticas detectadas.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* OFERTA 1: CONSERVADORA */}
          <div className="engineering-frame p-10 text-center hover:border-blue-500/40 relative overflow-hidden bg-slate-950 border border-slate-800 rounded-xl transition-all">
            <div className="animate-scan"></div>
            <h3 className="text-xl font-black text-white uppercase mb-4">Oferta Conservadora</h3>
            <p className="text-slate-400 text-sm italic leading-relaxed">
              Basada estrictamente en el saneamiento de redes y vicios ocultos de alto costo.
            </p>
          </div>

          {/* OFERTA 2: PUNTO DOMIS (DESTACADA) */}
          <div className="engineering-frame p-10 border-cyan-500/40 bg-slate-900/60 scale-105 shadow-[0_0_30px_rgba(34,211,238,0.15)] text-center relative overflow-hidden rounded-xl z-10 transition-all">
            <div className="animate-scan"></div>
            <h3 className="text-cyan-400 font-black uppercase mb-4 tracking-tighter text-2xl">
              Punto DOMIS<span className="text-lg relative -top-1.5 ml-0.5">™</span>
            </h3>
            <p className="text-slate-200 text-sm font-bold italic leading-relaxed">
              Ahorro técnico proyectado sumando patologías críticas + actualizaciones normativas por m².
            </p>
          </div>

          {/* OFERTA 3: AGRESIVA */}
          <div className="engineering-frame p-10 text-center hover:border-slate-500/40 relative overflow-hidden bg-slate-950 border border-slate-800 rounded-xl transition-all">
            <div className="animate-scan"></div>
            <h3 className="text-white font-black uppercase mb-4">Oferta Agresiva</h3>
            <p className="text-slate-400 text-sm italic leading-relaxed">
              Incluye saneamiento total, actualizaciones estéticas y penalización por obsolescencia técnica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}