export default function Problem() {
 return (
   <section id="problema" className="py-16 bg-slate-950 relative overflow-hidden flex items-center justify-center">
     <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-cyan-900/10 blur-[80px] rounded-full"></div>
     </div>

     <div className="max-w-6xl w-full mx-auto px-6 relative z-10">
       <div className="relative w-full bg-gradient-to-r from-slate-900/90 to-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden group hover:border-slate-700 transition-all duration-500">
           <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-50"></div>
          
           <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
               <div className="flex-shrink-0 flex items-center justify-center">
                   <span className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-700 to-slate-600 leading-none select-none drop-shadow-sm">
                       90%
                   </span>
               </div>

               <div className="flex-1 text-center md:text-left">
                   <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                       El Error <span classNameimport React from 'react';

export default function Problem() {
  return (
    <section id="problema" className="py-24 bg-slate-950 px-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER DE IMPACTO: EL ERROR MÁS CARO */}
        <div className="relative rounded-[2rem] overflow-hidden border-2 border-slate-800 shadow-2xl min-h-[500px] flex items-center justify-center bg-slate-900">
          {/* FONDO: Imagen de la familia optimizada */}
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_error_mas_comun.webp" 
              alt="Error en compra inmobiliaria" 
              className="w-full h-full object-cover opacity-60 grayscale-[0.2] contrast-110"
            />
            {/* Overlay técnico para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
          </div>

          {/* CONTENIDO TEXTUAL */}
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
}"text-cyan-400">Más Caro</span>
                   </h2>
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
                       El 90% de los compradores en Chile firma la promesa de compraventa sin saber realmente qué está comprando.
                   </p>
               </div>

               <div className="flex-shrink-0 bg-slate-950/60 border border-slate-800/50 rounded-xl p-5 md:px-8 md:py-4 flex flex-col items-center justify-center shadow-inner min-w-[200px]">
                   <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">
                       Resultado
                   </span>
                   <span className="text-xl md:text-2xl font-black text-white whitespace-nowrap">
                       $20-50 Millones
                   </span>
                   <span className="text-[10px] text-red-400 font-bold uppercase tracking-wide mt-1 animate-pulse">
                       Perdidos
                   </span>
               </div>
           </div>
       </div>
     </div>
   </section>
 );
}