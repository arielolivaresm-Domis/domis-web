import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';

export default function PhasesTabs() {
  return (
    <section id="proceso" className="py-24 bg-slate-950 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* ENCABEZADO - IGUAL A LA FOTO */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            PROTOCOLO DOMIS™
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
            CÓMO <span className="text-cyan-400">FUNCIONA</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-widest italic">
            Ecosistema técnico integrado en 3 etapas críticas.
          </p>
        </div>

        {/* GRILLA DE 3 TARJETAS - IGUAL A LA FOTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {/* FASE 1 */}
          <div className="relative p-10 rounded-2xl bg-slate-900/40 border-2 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.15)] flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border-2 border-cyan-500 bg-slate-950 text-white flex items-center justify-center text-sm font-black mb-10 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              1
            </div>
            <h3 className="text-xl font-black text-cyan-400 uppercase tracking-tighter mb-6">
              AUDITORÍA TÉCNICA
            </h3>
            <p className="text-slate-400 text-xs font-bold uppercase leading-relaxed tracking-wider">
              Protocolo <span className="text-white">PCF-15™</span> para detectar vicios ocultos. Scoring técnico 1-7 en 3 días + escaneo del entorno.
            </p>
          </div>

          {/* FASE 2 */}
          <div className="relative p-10 rounded-2xl bg-slate-900/40 border-2 border-slate-800 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-slate-950 text-slate-500 flex items-center justify-center text-sm font-black mb-10">
              2
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6">
              NEGOCIACIÓN ESTRATÉGICA
            </h3>
            <p className="text-slate-400 text-xs font-bold uppercase leading-relaxed tracking-wider">
              Inteligencia de mercado (CBR/IA) y valorización de fallas <span className="text-white">PCF-15 (NDI)</span> netamente para generar poder de negociación. 3 escenarios de cierre basados en <span className="text-white">ROI real</span> y evidencia técnica.
            </p>
          </div>

          {/* FASE 3 */}
          <div className="relative p-10 rounded-2xl bg-slate-900/40 border-2 border-slate-800 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-slate-950 text-slate-500 flex items-center justify-center text-sm font-black mb-10">
              3
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-6">
              PLUSVALÍA Y REMODELACIÓN
            </h3>
            <p className="text-slate-400 text-xs font-bold uppercase leading-relaxed tracking-wider">
              Ejecución de precisión para corregir fallas de auditoría, garantizando habitabilidad y plusvalía inmediata.
            </p>
          </div>
        </div>

        {/* MÓDULOS OPERATIVOS - SIEMPRE VISIBLES ABAJO */}
        <div className="space-y-16 border-t border-white/5 pt-16">
          <AuditPacks />
          <div className="border-t border-white/5 pt-16">
            <Sourcing />
          </div>
        </div>

      </div>
    </section>
  );
}