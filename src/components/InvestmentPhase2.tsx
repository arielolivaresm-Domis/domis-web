import { MessageCircle, ArrowRight } from 'lucide-react';

const InvestmentPhase2 = () => {
  // Reemplaza con tu número real de WhatsApp
  const whatsappNumber = "569XXXXXXXX"; 
  const message = "Hola, ya tengo el diagnóstico técnico de la Fase 1 y quiero pasar a la Fase 2. Necesito los argumentos y valores para ofertar (Plan Maestro) y bajar el precio de venta.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <section id="investment-phase-2" className="py-24 bg-slate-950 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-1 md:p-1.5 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          <div className="bg-slate-900 rounded-[2.3rem] p-8 md:p-12 relative overflow-hidden">
            
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ 
                backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
              }}
            ></div>

            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                💰 Inversión Transparente
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">
                Inversión Fase 2: <span className="text-cyan-500">Negociación</span>
              </h2>

              <p className="text-slate-400 text-base md:text-lg mb-10 font-light italic">
                La inversión técnica que se paga sola con el ahorro de tu compra.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">📄</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Fee de Inicio</h3>
                  </div>
                  <div className="text-4xl font-mono text-cyan-400 font-black">$500.000</div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Incluye la creación del <strong className="text-white uppercase">Plan Maestro Técnico</strong> y el diseño de la estrategia de negociación.
                  </p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-cyan-500/30 transition-colors group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">🏆</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tight">Éxito de Cierre</h3>
                  </div>
                  <div className="text-3xl font-mono text-cyan-400 font-black">15% del ahorro</div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Calculado sobre la baja de precio lograda (aprox. <strong className="text-white">$2M - $6M</strong>).
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-10">
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-lg">✅</span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Comisión solo si la negociación es exitosa.
                  </p>
                </div>
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <span className="text-lg">⚠️</span>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Fee inicial no reembolsable (cubre peritaje de Constructor Civil).
                  </p>
                </div>
              </div>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 w-full md:w-auto bg-cyan-500 hover:bg-white text-slate-950 px-8 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 group"
              >
                <MessageCircle size={20} />
                Activar Negociación Fase 2
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPhase2;