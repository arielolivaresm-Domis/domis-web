/**
 * COMPONENTE: AuditPacks.tsx
 * Fase 1: Auditoría Técnica
 */
export default function AuditPacks() {
  const packs = [
    { 
      title: "Pack 1: Individual", 
      price: "$1.900", 
      desc: "Para quien ya tiene la propiedad elegida y necesita validación técnica total.", 
      tag: "Popular" 
    },
    { 
      title: "Pack 2: Dupla", 
      price: "$1.710", 
      desc: "Evaluación comparativa de dos opciones para determinar cuál es mejor inversión.", 
      tag: "10% OFF" 
    },
    { 
      title: "Pack 3+: Inversionista", 
      price: "$1.520", 
      desc: "Diseñado para carteras de inversión o múltiples unidades. Máxima optimización.", 
      tag: "20% OFF" 
    }
  ];

  return (
    <section id="auditoria" className="py-24 bg-slate-950 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-block px-8 py-2.5 rounded-full border-2 border-cyan-500 bg-cyan-500/10 text-cyan-400 text-sm font-black uppercase tracking-[0.4em] mb-12 shadow-[0_0_25px_rgba(34,211,238,0.2)]">
          Fase 1: Auditoría Técnica
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 tracking-tight">
          Si ya tienes la propiedad, nosotros la auditamos
        </h2>
        <p className="text-slate-400 mb-16 italic">Mínimo técnico de 100 m² por propiedad.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packs.map((p, i) => (
            <div key={i} className="engineering-frame p-10 hover:border-cyan-400 transition-all group relative overflow-hidden bg-slate-950 border border-slate-800 rounded-xl">
              <div className="animate-scan"></div>
              <div className="text-cyan-500 font-mono text-[10px] uppercase mb-4 font-bold tracking-widest">
                {p.tag}
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tighter">
                {p.title}
              </h3>
              <div className="flex items-baseline justify-center gap-1 mb-6">
                <span className="text-4xl font-black text-white">{p.price}</span>
                <span className="text-slate-500 text-xs">/ m² + IVA</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-10">{p.desc}</p>
              <button className="w-full py-4 border border-cyan-500/30 text-cyan-400 font-black rounded-xl uppercase text-[10px] tracking-widest group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all duration-300">
                Seleccionar Pack
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}