import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Problem() {
  return (
    <section id="problema" className="py-24 bg-slate-950 px-6 relative overflow-hidden">
      {/* Capas de profundidad visual para estética Cyberpunk */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative rounded-[2.5rem] overflow-hidden border-[3px] border-cyan-500/80 shadow-[0_0_60px_rgba(34,211,238,0.25)] min-h-[600px] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
          
          <div className="absolute inset-0 z-0">
            <img 
              src="/DOMIS_error_mas_comun.webp" 
              alt="Asimetría de información en mercado inmobiliario" 
              className="w-full h-full object-cover opacity-60 grayscale-[0.5] contrast-125 mix-blend-overlay scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-900/60"></div>
          </div>

          <div className="relative z-10 p-8 md:px-16 md:py-20 text-center max-w-[1000px] mx-auto flex flex-col items-center">
            
            {/* Badge de Alerta Técnica */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/20 border border-red-500/40 rounded-full mb-10">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-[11px] font-mono text-red-100 uppercase tracking-[0.3em] font-black">
                Alerta de Asimetría de Mercado
              </span>
            </div>
            
            {/* Headline de Impacto */}
            <div className="mb-10 relative">
              <span className="block text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 tracking-tighter leading-none mb-4">
                EL 90%
              </span>
              <h2 className="text-lg md:text-2xl font-bold text-white uppercase tracking-widest leading-relaxed max-w-3xl mx-auto border-b-2 border-cyan-500/30 pb-6">
                DE LOS COMPRADORES EN CHILE FIRMA <br className="hidden md:block" />
                SIN SABER REALMENTE QUÉ ESTÁ COMPRANDO.
              </h2>
            </div>

            <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-12 leading-tight max-w-4xl">
              EL ERROR MÁS CARO NO ES COMPRAR CON DETALLES. <br />
              ES PAGAR UN SOBREPRECIO BASADO EN LA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 underline decoration-red-500/50 underline-offset-4">PRETENSIÓN DEL DUEÑO</span>.
            </h3>
            
            {/* Matriz de Rescate PCF-15™ */}
            <div className="w-full max-w-4xl bg-slate-950/60 rounded-3xl border border-cyan-500/30 p-8 md:p-10 mb-10 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/50 blur-sm animate-pulse"></div>

              <h4 className="text-cyan-400 font-mono uppercase tracking-widest font-bold mb-6 text-sm md:text-base">
                // La Realidad del Mercado vs. El Arsenal PCF-15™
              </h4>
              
              <p className="text-slate-300 text-lg mb-8 leading-relaxed mx-auto max-w-2xl">
                El comprador común negocia por intuición. El inversor <strong className="text-white">DOMIS™</strong> utiliza <strong className="text-cyan-300">Ingeniería Forense</strong> para detectar la brecha invisible entre el precio de oferta y el valor técnico real.
              </p>

              {/* Caja de Diferencial */}
              <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-0 mb-10 divide-y md:divide-y-0 md:divide-x divide-slate-700 bg-slate-900/80 rounded-2xl border border-slate-700 overflow-hidden mx-auto max-w-3xl">
                <div className="p-6 flex-1 flex flex-col justify-center items-center md:items-end text-center md:text-right">
                  <span className="text-slate-400 text-sm font-mono uppercase tracking-wider mb-1">Descuento "Cortesía"</span>
                  <span className="text-2xl md:text-3xl font-black text-slate-300">~6% Promedio</span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left bg-cyan-950/30">
                  <span className="text-cyan-300 text-sm font-mono uppercase tracking-wider mb-1 font-bold">Rescate con PCF-15™</span>
                  <span className="text-3xl md:text-5xl font-black text-cyan-400">8% al 20%</span>
                </div>
              </div>

              {/* Pilares Estratégicos */}
              <div className="text-left inline-block mx-auto max-w-3xl mb-8">
                <ul className="space-y-5 text-slate-200 leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                    <span><strong className="text-white">1. Tasación con IA:</strong> Eliminamos el sesgo del valor emocional puesto por el propietario.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                    <span><strong className="text-white">2. Fallas Técnicas (Fase 1):</strong> Cuantificamos vicios ocultos (eléctricos, sanitarios, estructurales) en UF.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                    <span><strong className="text-white">3. Data Oficial CBR:</strong> Transamos sobre valores reales de cierre, no sobre expectativas iniciales.</span>
                  </li>
                </ul>
              </div>

              {/* Remate Letal */}
              <div className="text-xl md:text-3xl font-black italic text-white bg-gradient-to-r from-transparent via-cyan-950 to-transparent py-6 border-y-2 border-cyan-500/30">
                 Negocias con evidencia técnica que el vendedor no puede refutar.
              </div>
            </div>
            
            {/* Financiamiento de Fase 3 */}
            <div className="max-w-3xl mx-auto pt-10 border-t border-white/10">
               <h4 className="text-cyan-400 font-mono font-bold tracking-[0.2em] uppercase mb-6 text-sm">
                 Costo de Oportunidad: Financiamiento Estratégico
               </h4>
               <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-medium mb-6">
                  Ese <span className="text-cyan-300 font-bold">8% a 20%</span> que rescatamos puede financiar en parte o en su gran mayoría el presupuesto total de tu remodelación (Fase 3).
               </p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}