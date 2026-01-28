import { Search, Crown, ArrowRight, Zap, Clock } from 'lucide-react';

export default function Sourcing() {
  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* FONDO TÉCNICO WIREFRAME */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Inteligencia de Mercado</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 leading-none">
            Buscamos por ti
          </h2>
          
          <p className="text-2xl md:text-3xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold">Dinero</span>
          </p>

          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed mt-6">
            Optimiza tu proceso de compra. Elige el nivel de profundidad técnica que necesitas para tomar una decisión inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          
          {/* OPCIÓN 1: NORMAL */}
          <div className="bg-slate-900/50 border border-white/10 p-8 md:p-10 rounded-2xl hover:border-slate-600 transition-all group relative flex flex-col">
            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
                <Search className="text-slate-300 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wider">Sourcing Normal</h3>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Pre-selección Digital</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-base mb-8 leading-relaxed min-h-[60px]">
              Nosotros filtramos el mercado y te presentamos las mejores opciones digitalmente. <strong>Tú eliges tu favorita</strong> y nosotros vamos a auditarla a fondo.
            </p>

            <div className="bg-slate-950/80 rounded-xl p-6 border border-slate-800 mb-6 mt-auto">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-6 text-center border-b border-slate-800 pb-2">
                Protocolo de Filtrado
              </p>
              <div className="space-y-6">
                {[
                  { id: 1, buscamos: 2, eliges: 1, inversion: "60.000", detalle: "(1 × $60.000)" },
                  { id: 2, buscamos: 3, eliges: 2, inversion: "120.000", detalle: "(2 × $60.000)" },
                  { id: 3, buscamos: 5, eliges: 3, inversion: "180.000", detalle: "(3 × $60.000)" }
                ].map((pack, idx) => (
                  <div key={pack.id} className={`flex flex-col gap-3 ${idx !== 0 ? 'border-t border-white/5 pt-4' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 font-black uppercase text-sm">Pack {pack.id}</span>
                      
                      {/* VISTA DESKTOP: HORIZONTAL ORIGINAL */}
                      <div className="hidden md:flex items-center gap-3 text-slate-400 font-bold text-sm md:text-base">
                        <span>Buscamos <span className="text-cyan-400">{pack.buscamos}</span></span>
                        <ArrowRight size={14} className="text-slate-600" />
                        <span>Eliges <span className="text-cyan-400">{pack.eliges}</span></span>
                        <ArrowRight size={14} className="text-slate-600" />
                        <span className="text-white bg-slate-800 px-3 py-1 rounded border border-slate-700 text-xs whitespace-nowrap">Auditamos {pack.eliges}</span>
                      </div>

                      {/* VISTA MÓVIL: NOMENCLATURA 2 LÍNEAS B-E-A */}
                      <div className="md:hidden flex flex-col items-end gap-1.5 font-mono text-xs font-bold text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-400">B: {pack.buscamos}</span>
                          <span className="text-slate-700">|</span>
                          <span className="text-cyan-400">E: {pack.eliges}</span>
                        </div>
                        <div className="bg-slate-800 text-white px-2 py-0.5 rounded border border-slate-700 text-[10px] uppercase font-black">
                          Auditamos {pack.eliges}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-slate-800/50 pt-2">
                      <span className="text-cyan-500/80 text-xs font-bold uppercase tracking-tight">Inversión: ${pack.inversion}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{pack.detalle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all mt-4">
              Seleccionar Pack
            </button>
          </div>

          {/* OPCIÓN 2: VIP */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/50 p-8 md:p-10 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all flex flex-col">
            <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest z-20">
              Recomendado
            </div>

            <div className="flex items-center gap-5 mb-8">
              <div className="p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-xl">
                <Crown className="text-cyan-400 w-8 h-8 animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-wider leading-tight">Sourcing VIP</h3>
                <p className="text-xs text-cyan-500 uppercase tracking-widest font-bold">Auditoría Total Adelantada</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-base mb-8 leading-relaxed min-h-[60px]">
              Visitamos todas las opciones por ti. Recibes un <strong>"Informe Fast"</strong> de cada una para que elijas la mejor con datos reales.
            </p>
            
            <div className="bg-slate-950/80 rounded-xl p-6 border border-cyan-900/50 mb-8 relative mt-auto">
               <div className="absolute -inset-1 bg-cyan-500/5 blur-sm rounded-lg"></div>
               <p className="relative text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-6 text-center flex items-center justify-center gap-2 border-b border-cyan-900/50 pb-2">
                <Zap size={14} className="text-yellow-400" /> Seguridad Total
              </p>
              
              <div className="space-y-6 relative">
                {[
                  { id: 1, buscamos: 2, visitamos: 2, auditamos: 1, inversion: "100.000", detalle: "(2 × $50.000)" },
                  { id: 2, buscamos: 3, visitamos: 3, auditamos: 2, inversion: "150.000", detalle: "(3 × $50.000)" },
                  { id: 3, buscamos: 5, visitamos: 5, auditamos: 3, inversion: "250.000", detalle: "(5 × $50.000)" }
                ].map((pack, idx) => (
                  <div key={pack.id} className={`flex flex-col gap-3 ${idx !== 0 ? 'border-t border-cyan-500/20 pt-4' : ''}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-200 font-black uppercase text-sm">Pack {pack.id}</span>
                      
                      {/* VISTA DESKTOP: HORIZONTAL ORIGINAL */}
                      <div className="hidden md:flex items-center gap-2.5 text-slate-300 font-bold text-sm md:text-base">
                        <span>Buscamos <span className="text-cyan-400">{pack.buscamos}</span></span>
                        <ArrowRight size={14} className="text-cyan-500/40" />
                        <span>Visitamos <span className="text-cyan-400">{pack.visitamos}</span></span>
                        <ArrowRight size={14} className="text-cyan-500/40" />
                        <span className="text-white bg-cyan-900/50 border border-cyan-500/30 px-3 py-1 rounded text-xs whitespace-nowrap">Auditamos {pack.auditamos}</span>
                      </div>

                      {/* VISTA MÓVIL: NOMENCLATURA TÉCNICA 2 LÍNEAS B-V-A */}
                      <div className="md:hidden flex flex-col items-end gap-1.5 font-mono text-xs font-bold text-right">
                        <div className="flex items-center gap-2">
                          <span className="text-white">B: {pack.buscamos}</span>
                          <span className="text-cyan-900">|</span>
                          <span className="text-cyan-400">V: {pack.visitamos}</span>
                        </div>
                        <span className="bg-cyan-500 text-slate-950 px-2 py-0.5 rounded text-[10px] font-black uppercase whitespace-nowrap">
                          Auditamos {pack.auditamos}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center border-t border-cyan-500/20 pt-2">
                      <span className="text-cyan-400 text-xs font-bold uppercase tracking-tight">Inversión: ${pack.inversion}</span>
                      <span className="text-[10px] text-cyan-200/40 font-mono">{pack.detalle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-white text-slate-950 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 hover:scale-[1.02]">
              Quiero Seguridad VIP
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-xl p-5 flex items-start gap-4">
          <Clock className="text-slate-500 w-6 h-6 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-slate-400 leading-relaxed italic">
            <span className="text-slate-300 font-bold not-italic">Nota de Eficiencia:</span> Para no perder oportunidades de mercado, si no es posible coordinar una visita conjunta, 
            <span className="mx-1 font-bold not-italic"> DOMIS™</span> realizará la inspección técnica de forma autónoma.
          </p>
        </div>
      </div>
    </section>
  );
}