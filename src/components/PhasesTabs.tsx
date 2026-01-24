import { useState, useEffect } from 'react';
import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';
import Calculator from './Calculator';
import BenefitFlyer from './BenefitFlyer';
import Deliverable from './Deliverable';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import { useTabs } from '../context/TabsContext';

export default function PhasesTabs() {
  const { activeTab, setActiveTab } = useTabs();
  const [isSticky, setIsSticky] = useState(false);

  // Detector de scroll para activar la navegación persistente
  useEffect(() => {
    const handleScroll = () => {
      // Se activa al pasar los 500px y se mantiene SIEMPRE visible hacia abajo
      setIsSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navegación de precisión con offset para no tapar el contenido
  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      const offset = 140; 
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const tabs = [
    { id: 'fase1' as const, label: 'Fase 1', subtitle: 'Auditoría', icon: '🔍' },
    { id: 'fase2' as const, label: 'Fase 2', subtitle: 'Negociación', icon: '💼' },
    { id: 'fase3' as const, label: 'Fase 3', subtitle: 'Remodelación', icon: '🏗️' },
  ];

  return (
    <section className="py-20 bg-slate-950 relative" id="proceso">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              El Protocolo DOMIS™
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Cómo <span className="text-cyan-400">Funciona</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Ecosistema técnico integrado en 3 etapas críticas.
          </p>
        </div>

        {/* NAVEGACIÓN GLOBAL PERSISTENTE (Fixed) */}
        <div className={`transition-all duration-500 z-[100] ${
          isSticky 
            ? 'fixed top-[80px] left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 scale-90' 
            : 'relative w-full max-w-4xl mx-auto scale-100'
        }`}>
          <div className={`flex flex-col md:flex-row gap-4 py-4 transition-all ${
            isSticky ? 'bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.7)] px-4' : ''
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 p-6 rounded-xl border-2 transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-3xl">{tab.icon}</span>
                  <div className="text-center">
                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                      activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                      {tab.label}
                    </div>
                    <div className={`text-lg font-black uppercase ${
                      activeTab === tab.id ? 'text-white' : 'text-slate-400'
                    }`}>
                      {tab.subtitle}
                    </div>
                  </div>
                </div>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 rounded-t-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO DINÁMICO */}
        <div className="mt-8">
          {activeTab === 'fase1' && (
            <div className="space-y-16 animate-fadeIn">
              <div id="auditoria"><AuditPacks /></div>
              <div id="sourcing" className="pt-16"><Sourcing /></div>
              <div id="calculator" className="pt-16"><Calculator /></div>
            </div>
          )}

          {activeTab === 'fase2' && (
            <div className="space-y-16 animate-fadeIn">
              <div><BenefitFlyer /></div>
              <div className="pt-8"><Deliverable /></div>
              <div className="pt-8"><Phase2 /></div>
            </div>
          )}

          {activeTab === 'fase3' && (
            <div className="space-y-16 animate-fadeIn">
              <div><Phase3 /></div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}