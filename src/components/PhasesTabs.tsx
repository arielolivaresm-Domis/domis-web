import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';
import BenefitFlyer from './BenefitFlyer';
import Deliverable from './Deliverable';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import { useTabs } from '../context/TabsContext';

export default function PhasesTabs() {
  const { activeTab, setActiveTab } = useTabs();

  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      const yOffset = -140;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const BridgeButton = ({ targetId, label, subtitle, icon }: { targetId: 'fase1' | 'fase2' | 'fase3', label: string, subtitle: string, icon: string }) => (
    <div className="pt-24 border-t border-slate-900/50 text-center">
      {/* AGRANDADO: text-xs -> text-sm */}
      <p className="text-cyan-400 font-mono text-sm uppercase tracking-[0.2em] mb-8 font-bold">Continuar Trayectoria Técnica</p>
      <button
        onClick={() => handleTabChange(targetId)}
        className="w-full max-w-4xl mx-auto p-8 rounded-2xl border-2 border-slate-800 bg-slate-900/50 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-500 group relative overflow-hidden"
      >
        <div className="flex flex-col items-center gap-4 relative z-10">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{icon}</span>
          <div className="text-center">
            {/* AGRANDADO: text-xs -> text-sm */}
            <div className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">
              {label}
            </div>
            {/* AGRANDADO: text-2xl -> text-3xl */}
            <div className="text-white text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
              {subtitle} <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </button>
    </div>
  );

  return (
    <section className="py-12 md:py-20 bg-transparent relative z-10" id="proceso">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="bg-slate-950 border border-white/5 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

          <div className="p-8 md:p-16 relative z-10">
            
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                {/* AGRANDADO: text-[10px] -> text-xs */}
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-black">Protocolo DOMIS™</span>
              </div>
              {/* AGRANDADO: text-4xl/6xl -> text-5xl/7xl */}
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-tight">
                CÓMO <span className="text-cyan-400">FUNCIONA</span>
              </h2>
              {/* AGRANDADO: text-xs/sm -> text-sm/base */}
              <p className="text-slate-400 text-sm md:text-base font-black uppercase tracking-[0.3em] italic mt-4">
                 Ecosistema técnico integrado en 3 etapas críticas.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {[
                  { 
                    id: 'fase1', num: '1', title: 'Auditoría Técnica', 
                    desc: 'Protocolo PCF-15™ para asegurar tu inversión inmobiliaria técnica.' 
                  },
                  { 
                    id: 'fase2', num: '2', title: 'Negociación Estratégica', 
                    desc: 'Inteligencia de mercado y valorización de fallas para generar ahorro real.' 
                  },
                  { 
                    id: 'fase3', num: '3', title: 'Plusvalía Inmediata', 
                    desc: 'Ejecución de precisión para corregir fallas y garantizar habitabilidad.' 
                  }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTabChange(t.id as any)}
                    className={`relative p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col items-center text-center ${
                      activeTab === t.id 
                        ? 'border-cyan-500 bg-slate-900/60 shadow-[0_0_40px_rgba(34,211,238,0.1)]' 
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    {/* AGRANDADO CIRCULO: w-10 -> w-12, h-10 -> h-12, text-xs -> text-sm */}
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black mb-8 ${activeTab === t.id ? 'border-cyan-500 bg-slate-950 text-white' : 'border-white/20 text-slate-500'}`}>{t.num}</div>
                    {/* AGRANDADO: text-lg -> text-xl */}
                    <h3 className={`text-xl font-black uppercase tracking-tighter mb-4 ${activeTab === t.id ? 'text-cyan-400' : 'text-white'}`}>{t.title}</h3>
                    {/* AGRANDADO: text-[10px] -> text-sm */}
                    <p className={`text-sm font-bold uppercase leading-relaxed tracking-wider ${activeTab === t.id ? 'text-slate-300' : 'text-slate-500'}`}>{t.desc}</p>
                  </button>
                ))}
            </div>

            <div className="mt-8">
              {activeTab === 'fase1' && (
                <div className="space-y-24 animate-fadeIn text-center">
                  <AuditPacks />
                  <Sourcing />
                  <BridgeButton targetId="fase2" label="Fase 2" subtitle="Negociación Técnica" icon="💼" />
                </div>
              )}

              {activeTab === 'fase2' && (
                <div className="space-y-24 animate-fadeIn text-center">
                  <BenefitFlyer />
                  <Deliverable />
                  <Phase2 onNext={() => handleTabChange('fase3')} />
                  <BridgeButton targetId="fase3" label="Fase 3" subtitle="Remodelación Estratégica" icon="🏗️" />
                </div>
              )}

              {activeTab === 'fase3' && (
                <div className="space-y-24 animate-fadeIn text-center">
                  <Phase3 />
                  <BridgeButton targetId="fase1" label="Fase 1" subtitle="Reiniciar Auditoría" icon="🔍" />
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}