import { MessageCircle, ArrowRight, DollarSign, CheckCircle2, AlertTriangle, TrendingDown } from 'lucide-react';

const BenefitFlyer = () => {
  // Reemplaza con tu número real de WhatsApp Business
  const whatsappNumber = "569XXXXXXXX"; 
  const message = "Hola, ya tengo el diagnóstico técnico de la Fase 1 y quiero pasar a la Fase 2. Necesito los argumentos y valores para ofertar (Plan Maestro) y bajar el precio de venta.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section id="beneficio-fase2" className="py-20 bg-slate-950 px-6 overflow-hidden">
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

              {/* SECCIÓN 1: MODELO DE INVERSIÓN */}
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">
                💰 Inversión Fase 2
              </h2>

              <p className="text-slate-300 text-lg md:text-xl max-w-3xl mb-10 font-light leading-relaxed">
                Pagas en dos momentos clave del éxito:
              </p>

              {/* Dos columnas: Al contratar / Al firmar */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8 text-left">
                
                {/* Momento 1: Fee Inicial */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl text-cyan-400">1️⃣</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Fee Inicial</h3>
                  </div>
                  
                  <div className="text-3xl font-mono text-cyan-400 font-black">$500.000</div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Entrega del <strong className="text-white">Plan Maestro Técnico</strong> + Estrategia de Negociación profesional.
                  </p>
                </div>

                {/* Momento 2: Éxito */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/30 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl text-cyan-400">2️⃣</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Al firmar promesa</h3>
                  </div>
                  
                  <div className="text-2xl font-mono text-cyan-400 font-black">15% del ahorro</div>
                  
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Calculado sobre la baja de precio lograda. El ahorro suele superar los $4M promedio.
                  </p>
                </div>

              </div>

              {/* Notas de Seguridad Técnica */}
              <div className="space-y-3 w-full max-w-3xl mb-12">
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <CheckCircle2 className="text-cyan-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Comisión se cobra <strong className="text-white">solo si se cierra exitosamente</strong> la Promesa de Compraventa.
                  </p>
                </div>

                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Fee no reembolsable: Protege el <strong className="text-white">peritaje técnico</strong> de nuestro Constructor Civil.
                  </p>
                </div>
              </div>

              {/* Divisor */}
              <div className="w-full max-w-3xl h-px bg-slate-800 mb-12"></div>

              {/* SECCIÓN 2: BENEFICIO 60% OFF */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                🎁 Beneficio Exclusivo
              </div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                <span className="text-cyan-400">60% OFF</span> EN TU AUDITORÍA
              </h2>

              <p className="text-slate-300 text-lg md:text-xl max-w-3xl mb-12 font-light leading-relaxed">
                Al contratar la <strong className="text-white uppercase">Negociación (Fase 2)</strong>, activas el reembolso del <strong className="text-cyan-400">60%</strong> del costo de tu Auditoría Inicial (Fase 1).
              </p>

              {/* Visualización del Flujo Financiero */}
              <div className="w-full max-w-3xl bg-slate-950/50 border border-slate-800 rounded-3xl p-8 mb-12 backdrop-blur-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Inversión Fase 1</span>
                    <div className="text-2xl font-mono text-white">$400.000</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="h-px w-full bg-slate-800 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-500 text-slate-950 px-3 py-1 rounded text-[10px] font-black">
                        -$240.000
                      </div>
                    </div>
                    <span className="text-[10px] text-cyan-400 uppercase font-bold mt-4 tracking-tighter italic">Reembolso aplicado en F2</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-cyan-400 uppercase font-bold tracking-widest">Costo Final Fase 1</span>
                    <div className="text-3xl font-mono text-white font-black underline decoration-cyan-500/50">$160.000</div>
                  </div>
                </div>
              </div>

              {/* CTA WHATSAPP */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-950 font-black rounded-full uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl shadow-white/10"
              >
                <MessageCircle size={20} className="fill-current" />
                Activar Negociación Fase 2
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
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