import { MessageCircle, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

const BenefitFlyer = () => {
  const whatsappNumber = "569XXXXXXXX"; 
  const message = "Hola, ya tengo el diagnóstico técnico de la Fase 1 y quiero pasar a la Fase 2. Necesito el Plan Maestro para bajar el precio de venta.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section id="beneficio-fase2" className="py-20 bg-slate-950 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-1 md:p-1.5 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          <div className="bg-slate-900 rounded-[2.3rem] p-8 md:p-16 relative overflow-hidden">
            
            {/* Grid de Fondo */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-cyan-500/20">
                Fase 2: Negociación Técnica
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">
                💰 Cómo se paga Fase 2
              </h2>

              <p className="text-slate-300 text-lg md:text-xl max-w-3xl mb-10 font-light">
                Pagas en dos momentos clave:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8 text-left">
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">1️⃣</span>
                    <h3 className="text-xl font-black text-white uppercase">Fee Inicial</h3>
                  </div>
                  <div className="text-3xl font-mono text-cyan-400 font-black">$500.000</div>
                  <p className="text-sm text-slate-400">Entrega del Plan Maestro Técnico y estrategia.</p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">2️⃣</span>
                    <h3 className="text-xl font-black text-white uppercase">Al firmar promesa de compraventa</h3>
                  </div>
                  <div className="text-2xl font-mono text-cyan-400 font-black">15% del ahorro</div>
                  <p className="text-sm text-slate-400">Calculado sobre la baja de precio lograda.</p>
                </div>
              </div>

              <div className="space-y-3 w-full max-w-3xl mb-12">
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <CheckCircle2 className="text-cyan-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-300">Comisión solo si cerramos con éxito.</p>
                </div>
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-300">Fee no reembolsable (protege el peritaje técnico).</p>
                </div>
              </div>

              <div className="w-full max-w-3xl h-px bg-slate-800 mb-12"></div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase">
                <span className="text-cyan-400">60% OFF</span> EN AUDITORÍA
              </h2>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-950 font-black rounded-full uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl"
              >
                <MessageCircle size={20} className="fill-current" />
                Activar Negociación Fase 2
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitFlyer;