import { CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Problem() {
  return (
    /* SECCIÓN TRANSPARENTE: Para ver la casa de fondo global */
    <section id="problema" className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* LA ISLA TÉCNICA: Bloque sólido azul oscuro */}
        <div className="bg-slate-950 border border-white/5 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          
          {/* SILUETA DEL LOGO (wireframe.png) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none z-10"></div>

          {/* CAPA DE IMAGEN: Se mantiene para el impacto visual del módulo */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/DOMIS_error_mas_comun.webp" 
              alt="Error en compra inmobiliaria - Asimetría de información" 
              className="w-full h-full object-cover opacity-40 grayscale-[0.2] contrast-110"
            />
            {/* Gradiente para asegurar legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
          </div>

          {/* CONTENIDO PRINCIPAL */}
          <div className="relative z-20 p-8 md:p-16 text-center max-w-4xl mx-auto">
            
            {/* BADGE TÉCNICO */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-200/10 border border-slate-200/30 rounded-full mb-8">
              <AlertTriangle className="w-3 h-3 text-red-500" />
              <span className="text-[10px] font-mono text-slate-200 uppercase tracking-[0.3em] font-black">
                Alerta de Riesgo Inmobiliario
              </span>
            </div>
            
            <div className="mb-8">
              <span className="block text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-4 drop-shadow-2xl">
                EL 90%
              </span>
              <h2 className="text-base md:text-xl font-bold text-white uppercase tracking-widest leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                de los compradores en Chile firma la promesa de compraventa <br className="hidden md:block" />
                sin saber realmente qué está comprando.
              </h2>
            </div>

            <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-10 italic drop-shadow-md">
              EL ERROR <span className="text-red-500">MÁS CARO</span> NO ES COMPRAR MAL. <br className="md:hidden" /> ES <span className="text-red-500">PAGAR DE MÁS</span>.
            </h3>
            
            {/* NARRATIVA DOMIS™ */}
            <div className="space-y-8 mb-12 max-w-3xl mx-auto">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 p-6 rounded-2xl border border-white/5 backdrop-blur-sm shadow-xl">
                <div className="text-center md:text-right border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                  <p className="text-slate-400 text-[10px] uppercase tracking-widest mb-1">Cortesía de mercado</p>
                  <p className="text-2xl font-black text-slate-300">~6% Desc.</p>
                </div>
                <div className="text-center md:text-left pt-4 md:pt-0 md:pl-6">
                  <p className="text-cyan-400 text-[10px] uppercase tracking-widest mb-1 font-bold">Rescate con PCF-15™</p>
                  <p className="text-2xl md:text-3xl font-black text-cyan-400">8% al 20%</p>
                </div>
              </div>

              <div className="text-left space-y-4 bg-black/40 p-8 rounded-3xl border border-white/5">
                <p className="text-white text-sm font-black uppercase tracking-[0.2em] mb-4 text-center border-b border-white/10 pb-4">Evidencia IRREFUTABLE:</p>
                <div className="flex items-start gap-4 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white uppercase tracking-tight">Tasación IA:</strong> Sinceramos el valor real frente al emocional del propietario.</span>
                </div>
                <div className="flex items-start gap-4 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white uppercase tracking-tight">Fallas en UF:</strong> Cuantificamos vicios ocultos con instrumental Bosch/FLIR.</span>
                </div>
                <div className="flex items-start gap-4 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
                  <span><strong className="text-white uppercase tracking-tight">Financiamiento Fase 3:</strong> Tu ahorro paga gran parte de tu remodelación.</span>
                </div>
              </div>

            </div>
            
            <p className="text-cyan-400 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold border-t border-cyan-500/20 pt-8 inline-block">
              NEGOCIACIÓN TÉCNICA BASADA EN INGENIERÍA FORENSE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}