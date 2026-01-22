const BenefitFlyer = () => {
  return (
    <section className="py-20 bg-slate-950 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Banner Principal con Degradado de Marca */}
        <div className="relative bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-1 md:p-1.5 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          <div className="bg-slate-900 rounded-[2.3rem] p-8 md:p-16 relative overflow-hidden">
           
            {/* Decoración de Fondo: Grid de Ingeniería */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Etiqueta de Fase 2 */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-cyan-500/20">
                Fase 2: Negociación Técnica
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                <span className="text-cyan-400">60% OFF</span> EN TU AUDITORÍA
              </h2>

              {/* PÁRRAFO OPTIMIZADO CON MARCA E IDENTIDAD */}
              <p className="text-slate-300 text-lg md:text-xl max-w-3xl mb-12 font-light leading-relaxed">
                Al contratar la <strong className="text-white">Negociación Técnica (Fase2)</strong> con {' '}
                <span className="font-bold text-white">
                  DOMIS<span className="text-cyan-500 text-xs relative -top-2 ml-0.5">™</span>
                </span>, activas inmediatamente el reembolso del <strong className="text-cyan-400">60%</strong> del costo de tu Auditoría (Fase 1).
              </p>

              {/* Visualización del Flujo Financiero */}
              <div className="w-full max-w-3xl bg-slate-950/50 border border-slate-800 rounded-3xl p-8 mb-12 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                 
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Inversión F1</span>
                    <div className="text-2xl font-mono text-white">$400.000</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-px w-full bg-slate-800 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-slate-950 px-3 py-1 rounded text-[10px] font-black">
                        -$240.000
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-400 uppercase font-bold mt-4 tracking-tighter italic">Descuento aplicado en F2</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest">Costo Real F1</span>
                    <div className="text-3xl font-mono text-white font-black underline decoration-cyan-500/50">$160.000</div>
                  </div>

                </div>
              </div>

              {/* Propuesta de Valor de la Fase 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-xl">💰</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>Cobramos sobre tu ahorro:</strong> Solo facturamos el 15% de lo que logramos bajar el precio.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-xl">📊</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong>ROI Garantizado:</strong> El ahorro promedio supera el 900% de la inversión técnica.
                  </p>
                </div>
              </div>

              <button className="group relative px-12 py-5 bg-white text-slate-950 font-black rounded-full uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-white/10">
                Ver Fase 2 Completa
                <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
              </button>
            </div>

            {/* Iconos flotantes decorativos */}
            <div className="absolute -bottom-10 -right-10 text-8xl opacity-10 rotate-12 select-none">🎁</div>
            <div className="absolute -top-10 -left-10 text-8xl opacity-10 -rotate-12 select-none">📈</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitFlyer;