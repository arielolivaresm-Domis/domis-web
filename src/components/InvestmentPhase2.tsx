import React from 'react';

const InvestmentPhase2 = () => {
  return (
    <section id="investment-phase-2" className="py-24 bg-slate-950 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Banner con borde cyan */}
        <div className="relative bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-1 md:p-1.5 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          <div className="bg-slate-900 rounded-[2.3rem] p-8 md:p-12 relative overflow-hidden">
            
            {/* Grid de fondo técnico */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ 
                backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
              }}
            ></div>

            <div className="relative z-10">
              {/* Badge superior */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                💰 Inversión Transparente
              </div>

              {/* Título */}
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">
                Inversión Fase 2: <span className="text-cyan-500">Negociación</span>
              </h2>

              <p className="text-slate-400 text-base md:text-lg mb-10 font-light italic">
                La inversión que se paga sola con el ahorro de tu compra.
              </p>

              {/* Dos columnas: Al contratar / Al firmar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                
                {/* Momento 1 */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">📄</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Fee de Inicio</h3>
                  </div>
                  
                  <div className="text-4xl font-mono text-cyan-400 font-black">$500.000</div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Incluye la creación del <strong className="text-white uppercase">Plan Maestro Técnico</strong> y el diseño de la estrategia de negociación basada en datos duros.
                  </p>
                </div>

                {/* Momento 2 */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">🏆</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Éxito de Cierre</h3>
                  </div>
                  
                  <div className="text-3xl font-mono text-cyan-400 font-black">15% del ahorro</div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Calculado sobre la baja de precio lograda. Un monto que suele oscilar entre los <strong className="text-white">$2M y $6M</strong> de ahorro real.
                  </p>
                </div>

              </div>

              {/* Notas importantes */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-lg">✅</span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    La comisión de éxito se cancela <strong className="text-white">solo si la negociación se cierra exitosamente</strong> en la firma de promesa.
                  </p>
                </div>

                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-lg">⚠️</span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    El fee inicial <strong className="text-white">no es reembolsable</strong>, ya que cubre el peritaje técnico y la ingeniería financiera del proyecto.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPhase2;