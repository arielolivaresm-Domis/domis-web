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

  // 1. MOTOR DE PERSISTENCIA: Activa el modo compacto al bajar
  useEffect(() => {
    const handleScroll = () => {
      // Se activa después de pasar el Hero y el Problema
      setIsSticky(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. NAVEGACIÓN DE PRECISIÓN: Vuelve al inicio de la fase seleccionada
  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      // Offset de 160px para que los botones flotantes no tapen el contenido
      const yOffset = -160; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
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
        </div>

        {/* NAVEGACIÓN PERSISTENTE (Sticky): Se achica y se queda en top-20 para no tapar el FinalCTA */}
        <div className={`transition-all duration-500 z-[100] ${
          isSticky 
            ? 'fixed top-20 left-0 w-full py-3 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-2xl' 
            : 'relative w-full max-w-4xl mx-auto py-6'
        }`}>
          <div className={`flex flex-col md:flex-row gap-3 md:gap-4 mx-auto transition-all px-4 ${
            isSticky ? 'max-w-5xl' : 'max-w-4xl'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 transition-all duration-300 relative rounded-xl border-2 ${
                  isSticky ? 'p-3' : 'p-6'
                } ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`flex items-center justify-center gap-3 ${isSticky ? 'flex-row' : 'flex-col'}`}>
                  <span className={`${isSticky ? 'text-xl' : 'text-3xl'}`}>{tab.icon}</span>
                  <div className={`${isSticky ? 'text-left' : 'text-center'}`}>
                    <div className={`font-bold uppercase tracking-widest ${
                      isSticky ? 'text-[8px]' : 'text-xs mb-1'
                    } ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {tab.label}
                    </div>
                    <div className={`font-black uppercase ${
                      isSticky ? 'text-xs' : 'text-lg'
                    } ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>
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
        <div className={`transition-all duration-500 ${isSticky ? 'mt-32' : 'mt-8'}`}>
          {activeTab === 'fase1' && (
            <div className="space-y-16 animate-fadeIn">
              <AuditPacks />
              <div className="pt-16"><Sourcing /></div>
              <div className="pt-16 max-w-5xl mx-auto"><Calculator /></div>
            </div>
          )}

          {activeTab === 'fase2' && (
            <div className="space-y-16 animate-fadeIn">
              <BenefitFlyer />
              <div className="pt-8"><Deliverable /></div>
              <div className="pt-8"><Phase2 /></div>
            </div>
          )}

          {activeTab === 'fase3' && (
            <div className="space-y-16 animate-fadeIn">
              <Phase3 />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}