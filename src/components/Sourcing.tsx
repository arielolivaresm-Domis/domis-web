import { Search, Crown, Zap, Clock, MapPin, CheckCircle, FileText } from 'lucide-react';

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
          
          <h2 className="text-5xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
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
          <div className="bg-slate-900/50 border border-white/10 p-6 md:p-10 rounded-2xl hover:border-slate-600 transition-all group relative flex flex-col">
            <div className="flex items-center gap-5 mb-6">
              <div className="p-4 bg-slate-800 rounded-xl group-hover:bg-slate-700 transition-colors">
                <Search className="text-slate-300 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">Sourcing Normal</h3>
                <p className="text-sm text-cyan-400 font-bold mt-1">Solo auditas la que eliges</p>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed">
              Filtramos el mercado y te presentamos las mejores opciones <strong>digitalmente</strong>. Tú eliges tu favorita y nosotros la auditamos a fondo.
            </p>

            <div className="bg-slate-950/80 rounded-xl p-6 border border-slate-800 mb-6 mt-auto">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-6 text-center border-b border-slate-800 pb-3">
                Protocolo de Filtrado
              </p>
              
              <div className="space-y-5">
                {[
                  { pack: 1, presentamos: 2, eliges: 1, auditamos: 1, precio: "60.000", calc: "(1 × $60.000)" },
                  { pack: 2, presentamos: 3, eliges: 2, auditamos: 2, precio: "120.000", calc: "(2 × $60.000)" },
                  { pack: 3, presentamos: 5, eliges: 3, auditamos: 3, precio: "180.000", calc: "(3 × $60.000)" }
                ].map((item, idx) => (
                  <div key={item.pack} className={`${idx !== 0 ? 'border-t border-slate-800 pt-5' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-black uppercase text-sm">Pack {item.pack}</span>
                      <span className="text-cyan-400 text-xs font-bold px-3 py-1 bg-slate-800 rounded border border-slate-700">
                        {item.presentamos} opciones digitales
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-400">
                        <Search size={14} className="text-slate-500" />
                        <span>Presentamos: <strong className="text-slate-300">{item.presentamos} propiedades</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <CheckCircle size={14} className="text-cyan-500" />
                        <span>Tú eliges: <strong className="text-cyan-400">{item.eliges}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <FileText size={14} className="text-slate-500" />
                        <span>Auditoría completa: <strong className="text-white">{item.auditamos}</strong></span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800/50 flex justify-between items-center">
                      <span className="text-cyan-500 text-sm font-bold">Inversión: ${item.precio}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{item.calc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all">
              Seleccionar Pack
            </button>
          </div>

          {/* OPCIÓN 2: VIP */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/50 p-6 md:p-10 rounded-2xl relative overflow-hidden group hover:shadow-[0_0_50px_rgba(34,211,238,0.15)] transition-all flex flex-col">
            <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-4 py-1.5 rounded-bl-xl uppercase tracking-widest">
              Recomendado
            </div>

            <div className="flex items-center gap-5 mb-6">
              <div className="p-4 bg-cyan-500/20 border border-cyan-500/30 rounded-xl">
                <Crown className="text-cyan-400 w-8 h-8 animate-pulse" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">Sourcing VIP</h3>
                <p className="text-sm text-cyan-400 font-bold mt-1">Auditas todas antes de elegir</p>
              </div>
            </div>
            
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4 mb-8">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-wide mb-3 flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" /> Cómo funciona:
              </p>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <span>Buscamos y visitamos todas las opciones</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <span>Te damos un <strong className="text-white">"Informe Fast"</strong> de cada una</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <span>Eliges con datos reales (no a ciegas)</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">4.</span>
                  <span>Auditamos a fondo solo las que elegiste</span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-950/80 rounded-xl p-6 border border-cyan-900/50 mb-8 relative mt-auto">
              <div className="absolute -inset-1 bg-cyan-500/5 blur-sm rounded-lg"></div>
              <p className="relative text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-6 text-center flex items-center justify-center gap-2 border-b border-cyan-900/50 pb-3">
                <Zap size={14} className="text-yellow-400" /> Seguridad Total
              </p>
              
              <div className="space-y-5 relative">
                {[
                  { pack: 1, visitamos: 2, eliges: 1, auditamos: 1, precio: "100.000", calc: "(2 × $50.000)" },
                  { pack: 2, visitamos: 3, eliges: 2, auditamos: 2, precio: "150.000", calc: "(3 × $50.000)" },
                  { pack: 3, visitamos: 5, eliges: 3, auditamos: 3, precio: "250.000", calc: "(5 × $50.000)" }
                ].map((item, idx) => (
                  <div key={item.pack} className={`${idx !== 0 ? 'border-t border-cyan-500/20 pt-5' : ''}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-black uppercase text-sm">Pack {item.pack}</span>
                      <span className="text-cyan-400 text-xs font-bold px-3 py-1 bg-cyan-900/30 rounded border border-cyan-500/30">
                        {item.visitamos} visitas con Informe Fast
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <MapPin size={14} className="text-cyan-500" />
                        <span>Visitamos: <strong className="text-white">{item.visitamos} propiedades</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <CheckCircle size={14} className="text-cyan-400" />
                        <span>Tú eliges: <strong className="text-cyan-400">{item.eliges}</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <FileText size={14} className="text-cyan-500" />
                        <span>Auditoría completa: <strong className="text-white">{item.auditamos}</strong></span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-cyan-500/20 flex justify-between items-center">
                      <span className="text-cyan-400 text-sm font-bold">Inversión: ${item.precio}</span>
                      <span className="text-[10px] text-cyan-200/40 font-mono">{item.calc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-6 text-xs text-slate-300">
              <span className="text-cyan-400 font-bold">ℹ️ Informe FAST:</span> Nota rápida (scoring) de cada propiedad para que compares y elijas la mejor.
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