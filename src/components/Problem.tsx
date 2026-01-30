import { CheckCircle2 } from 'lucide-react';

export default function Problem() {
  return (
    <section id="problema" className="py-24 bg-slate-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2rem] overflow-hidden border-2 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.2)] min-h-[500px] flex items-center justify-center bg-slate-900">
          
          {/* CAPA DE IMAGEN: Estructura original intacta */}
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_error_mas_comun.webp" 
              alt="Error en compra inmobiliaria - Asimetría de información" 
              className="w-full h-full object-cover opacity-80 grayscale-[0.2] contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12 text-center max-w-4xl">
            {/* BADGE: Blanco Hueso (slate-200) */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-200/10 border border-slate-200/30 rounded-full mb-8">
              <span className="text-[10px] font-mono text-slate-200 uppercase tracking-[0.3em] font-black">
                Alerta de Riesgo Inmobiliario
              </span>
            </div>
            
            <div className="mb-6">
              <span className="block text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4 drop-shadow-2xl">
                EL 90%
              </span>
              <h2 className="text-base md:text-xl font-bold text-white uppercase tracking-widest leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                de los compradores en Chile firma la promesa de compraventa <br className="hidden md:block" />
                sin saber realmente qué está comprando.
              </h2>
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-8 italic drop-shadow-md">
              EL ERROR <span className="text-red-500">MÁS CARO</span> ES PAGAR LA PRETENSIÓN DEL DUEÑO
            </h3>
            
            {/* --- NARRATIVA DOMIS™: MANTENIENDO EL ESTILO BASE --- */}
            <div className="space-y-8 mb-10 max-w-3xl mx-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="text-center md:text-right border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Cortesía de mercado</p>
                  <p className="text-2xl font-black text-slate-300">~6% Desc.</p>
                </div>
                <div className="text-center md:text-left pt-4 md:pt-0 md:pl-6">
                  <p className="text-cyan-400 text-[10px] uppercase tracking-widest mb-1 font-bold">Rescate con PCF-15™</p>
                  <p className="text-2xl md:text-3xl font-black text-cyan-400">8% al 20%</p>
                </div>
              </div>

              <div className="text-left space-y-3 bg-black/20 p-6 rounded-2xl">
                <p className="text-white text-sm font-bold uppercase tracking-widest mb-4 text-center">Evidencia que el vendedor no puede refutar:</p>
                <div className="flex items-start gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Tasación IA:</strong> Sinceramos el valor real frente al emocional.</span>
                </div>
                <div className="flex items-start gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Fallas en UF:</strong> Cuantificamos vicios ocultos detectados.</span>
                </div>
                <div className="flex items-start gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white">Costo de Oportunidad:</strong> Tu ahorro financia tu remodelación (Fase 3).</span>
                </div>
              </div>

            </div>
            
            <p className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold border-t border-cyan-500/20 pt-6 inline-block">
              NEGOCIACIÓN TÉCNICA BASADA EN INGENIERÍA FORENSE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}