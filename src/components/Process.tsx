export default function Process() {
  return (
    <section id="protocolo" className="py-24 bg-slate-950 px-6 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 tracking-tight">
            EL PROTOCOLO <span className="text-cyan-400">
              DOMIS<span className="text-cyan-500 text-xl md:text-2xl relative -top-3 md:-top-5 ml-1">™</span>
            </span>
          </h2>
          <p className="text-slate-400 italic mb-8">Ecosistema técnico integrado en 3 etapas críticas.</p>
          
          <div className="inline-block px-5 py-2 bg-slate-900/80 border border-slate-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.5)]">
            <p className="text-[10px] md:text-xs text-slate-300 font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="text-xl">ℹ️</span> Nota: Cada fase corresponde a un servicio y contrato independiente.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* LÍNEA DE CONEXIÓN (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* FASE 1: AUDITORÍA */}
            <div className="engineering-frame p-8 hover:border-cyan-500/50 group flex flex-col h-full shadow-lg transition-all bg-slate-950 border border-slate-800 rounded-xl">
              <div className="animate-scan"></div>
              <div className="inline-block w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-600 mb-6 flex items-center justify-center text-xl font-black text-white group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all mx-auto relative z-20">1</div>
              <h3 className="text-xl font-black text-white uppercase mb-2 text-center">AUDITORÍA</h3>
              <div className="text-cyan-500 font-mono text-[10px] uppercase font-bold mb-6 tracking-widest text-center">Detección de Riesgo</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow text-center">
                Inspección física rigurosa de la propiedad para identificar vicios ocultos y normativa.
              </p>
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 text-left">
                <div className="text-[10px] text-cyan-400 font-black uppercase mb-3 tracking-wider border-b border-slate-700 pb-2">📄 Entregable Técnico:</div>
                <ul className="text-xs text-slate-300 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">✓</span> <span>Informe Auditoría Presencial.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">✓</span> <span>Scan de Entorno.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FASE 2: NEGOCIACIÓN */}
            <div className="engineering-frame p-8 hover:border-cyan-500/50 group flex flex-col h-full shadow-lg transition-all bg-slate-950 border border-slate-800 rounded-xl">
              <div className="animate-scan"></div>
              <div className="inline-block w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-600 mb-6 flex items-center justify-center text-xl font-black text-white group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all mx-auto relative z-20">2</div>
              <h3 className="text-xl font-black text-white uppercase mb-2 text-center">NEGOCIACIÓN</h3>
              <div className="text-cyan-500 font-mono text-[10px] uppercase font-bold mb-6 tracking-widest text-center">Estrategia de Valor</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow text-center">
                Usamos los hallazgos técnicos para fundamentar una rebaja en el precio de compra.
              </p>
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 text-left">
                <div className="text-[10px] text-cyan-400 font-black uppercase mb-3 tracking-wider border-b border-slate-700 pb-2">📄 Entregable Estratégico:</div>
                <ul className="text-xs text-slate-300 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">✓</span> <span>Informe de 3 Valores Sugeridos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">✓</span> <span>Argumentario técnico.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* FASE 3: REMODELACIÓN */}
            <div className="engineering-frame p-8 hover:border-cyan-500/50 group flex flex-col h-full shadow-lg transition-all bg-slate-950 border border-slate-800 rounded-xl">
              <div className="animate-scan"></div>
              <div className="inline-block w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-600 mb-6 flex items-center justify-center text-xl font-black text-white group-hover:border-cyan-400 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-all mx-auto relative z-20">3</div>
              <h3 className="text-xl font-black text-white uppercase mb-2 text-center">REMODELACIÓN</h3>
              <div className="text-cyan-500 font-mono text-[10px] uppercase font-bold mb-6 tracking-widest text-center">Ejecución Técnica</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow text-center">
                Ejecución de las reparaciones detectadas con nuestro equipo. Llave en mano.
              </p>
              <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 text-left">
                <div className="text-[10px] text-cyan-400 font-black uppercase mb-3 tracking-wider border-b border-slate-700 pb-2">🔨 Ejecución de Obra:</div>
                <ul className="text-xs text-slate-300 space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">✓</span> <span>Presupuesto Suma Alzada.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500 font-bold">✓</span> <span>Contrato de Remodelación.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}