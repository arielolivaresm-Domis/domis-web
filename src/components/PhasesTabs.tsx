import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';
import BenefitFlyer from './BenefitFlyer';
import Deliverable from './Deliverable';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import { useTabs } from '../context/TabsContext';

// Declaración para que TypeScript acepte el sensor de Google
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function PhasesTabs() {
  const { activeTab, setActiveTab } = useTabs();

  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    // Sensor de Google Analytics para medir interés en cada fase
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'cambio_fase', {
        'event_category': 'Navegacion',
        'event_label': id,
        'value': 1
      });
    }

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
      <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-8 font-bold">Continuar Trayectoria Técnica</p>
      <button
        onClick={() => handleTabChange(targetId)}
        className="w-full max-w-4xl mx-auto p-8 rounded-2xl border-2 border-slate-800 bg-slate-900/50 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-500 group relative overflow-hidden"
      >
        <div className="flex flex-col items-center gap-4 relative z-10">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{icon}</span>
          <div className="text-center">
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">
              {label}
            </div>
            <div className="text-white text-2xl md:text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
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
      <div className="max-w-7xl mx-auto px-0 md:px-6">
        
        <div className="bg-slate-950 border-y md:border border-white/5 rounded-none md:rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

          <div className="p-4 md:p-8 lg:p-16 relative z-10">
            
            {/* ENCABEZADO: Punto medio de escala */}
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest font-black">Protocolo DOMIS™</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight">
                CÓMO <span className="text-cyan-400">FUNCIONA</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-black uppercase tracking-[0.3em] italic mt-4">
                 Ecosistema técnico integrado en 3 etapas críticas.
               </p>
            </div>

            {/* NAVEGACIÓN: Punto medio de escala */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                {[
                  { 
                    id: 'fase1', num: '1', title: 'Auditoría Técnica', 
                    desc: 'Protocolo PCF-15™ para asegurar tu inversión. Si ya elegiste tu propiedad, la auditamos; si no tienes una, activamos modo sourcing para buscarla por ti.' 
                  },
                  { 
                    id: 'fase2', num: '2', title: 'Negociación Estratégica', 
                    desc: 'Inteligencia de mercado (CBR/IA) y valorización de fallas PCF-15 (NDI) netamente para generar poder de negociación.' 
                  },
                  { 
                    id: 'fase3', num: '3', title: 'Plusvalía y Remodelación', 
                    desc: 'Ejecución de precisión para corregir fallas de auditoría, garantizando habitabilidad y plusvalía inmediata.' 
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
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black mb-8 ${activeTab === t.id ? 'border-cyan-500 bg-slate-950 text-white' : 'border-white/20 text-slate-500'}`}>{t.num}</div>
                    <h3 className={`text-xl font-black uppercase tracking-tighter mb-4 ${activeTab === t.id ? 'text-cyan-400' : 'text-white'}`}>{t.title}</h3>
                    <p className={`text-xs md:text-sm font-bold uppercase leading-relaxed tracking-wider ${activeTab === t.id ? 'text-slate-200' : 'text-slate-500'}`}>{t.desc}</p>
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