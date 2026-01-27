import { useState } from 'react';

export default function AuditPacks({ onNext }: { onNext: () => void }) {
  const [activePack, setActivePack] = useState<'individual' | 'dupla' | 'inversionista' | null>(null);

  const packs = [
    {
      id: 'individual',
      title: "Pack 1: Individual",
      price: "$1.900 CLP",
      tag: "Popular",
      icon: "🔍",
      desc: "Para quien ya tiene la propiedad elegida y necesita validación técnica total.",
      color: "cyan"
    },
    {
      id: 'dupla',
      title: "Pack 2: Dupla",
      price: "$1.710 CLP",
      tag: "10% OFF",
      icon: "👥",
      desc: "Evaluación comparativa de dos opciones para determinar cuál es mejor inversión.",
      color: "cyan"
    },
    {
      id: 'inversionista',
      title: "Pack 3+: Inversionista",
      price: "$1.520 CLP",
      tag: "20% OFF",
      icon: "🛡️",
      desc: "Diseñado para carteras de inversión o múltiples unidades. Máxima optimización.",
      color: "red"
    }
  ];

  return (
    <div className="py-12 animate-fadeIn">
      <div className="text-center mb-16">
        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">
          Selección de <span className="text-cyan-400">Protocolo de Auditoría</span>
        </h3>
        <p className="text-slate-500 font-mono text-xs uppercase tracking-widest mt-2 italic">
          Mínimo técnico de 100 m² por propiedad.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {packs.map((p) => (
          <div 
            key={p.id}
            className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 flex flex-col ${
              activePack === p.id 
                ? `bg-slate-900 border-cyan-500 shadow-2xl scale-[1.02]` 
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
            onClick={() => {
              setActivePack(p.id as any);
              if (onNext) onNext(); 
            }}
          >
            <div className="relative z-10 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <span className="text-3xl">{p.icon}</span>
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-black text-white uppercase italic tracking-tighter">{p.title}</h4>
                  
                  {/* BADGES DE DESCUENTO: Estilo Rojo Intenso Unificado y Agrandado */}
                  <p className={`font-mono uppercase tracking-widest font-bold inline-block mt-2 ${
                    p.tag.includes('OFF') 
                      // Estilo ALERTA ROJA para ambos descuentos
                      ? 'bg-red-950/60 text-red-400 border-2 border-red-500 px-3 py-1 rounded-full animate-pulse text-xs shadow-[0_0_20px_rgba(239,68,68,0.5)]' 
                      // Estilo estándar para "Popular"
                      : 'text-slate-500 text-[10px]'
                  }`}>
                    {p.tag}
                  </p>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed mb-10 h-16">
                {p.desc}
              </p>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center mt-auto">
                <span className="block text-slate-400 text-[10px] uppercase tracking-widest mb-1">Inversión por m² (Neto)</span>
                <div className="flex items-baseline justify-center gap-1 mb-2">
                  <span className="text-3xl font-black text-white">{p.price}</span>
                  <span className="text-slate-500 text-xs font-mono">/ m²</span>
                </div>
                
                <a 
                  href={`https://wa.me/56929901343?text=Hola,%20equipo%20DOMIS™. Quiero información sobre el ${encodeURIComponent(p.title)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="block w-full py-3 font-black uppercase rounded-xl transition-all mt-4 text-sm bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_4px_15px_rgba(6,182,212,0.2)]"
                  onClick={(e) => e.stopPropagation()} 
                >
                  Seleccionar Pack
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}