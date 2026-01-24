import React from 'react';

export default function Problem() {
  return (
    <section id="problema" className="py-24 bg-slate-950 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER DE IMPACTO CON IMAGEN OPTIMIZADA */}
        <div className="relative rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-2xl min-h-[500px] flex items-center justify-center bg-slate-900">
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_error_mas_comun.webp" 
              alt="Error en compra inmobiliaria" 
              className="w-full h-full object-cover opacity-60 grayscale-[0.2] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
          </div>

          <div className="relative z-10 p-8 md:p-16 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
              <span className="text-[10px] md:text-xs font-mono text-red-500 uppercase tracking-[0.3em] font-black">
                Alerta de Riesgo Inmobiliario
              </span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
              90% EL ERROR <span className="text-red-500">MÁS CARO</span><br className="hidden md:block" />
              ES NO AUDITAR
            </h2>
            
            <p className="text-slate-200 text-lg md:text-2xl leading-relaxed font-semibold drop-shadow-lg mb-8">
              Si ya tienes la propiedad, nosotros la auditamos para detectar fallas que <span className="text-white font-black underline decoration-red-500 underline-offset-4">tú terminarás pagando</span>.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-xl">
                <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest font-bold">
                  Mínimo técnico: 100 m² por unidad
                </p>
              </div>
              <div className="bg-red-500/20 backdrop-blur-md border border-red-500/30 p-4 rounded-xl">
                <p className="text-red-400 font-mono text-sm uppercase tracking-widest font-bold">
                  Pérdida estimada: $20-50 Millones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}