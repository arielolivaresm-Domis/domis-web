import { useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Sistema de detección dinámica de posición (Nivel de Obra)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Se activa SOLO cuando el contenedor llega al tope (top <= 80 por el header)
        setIsSticky(rect.top <= 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      const yOffset = -140; 
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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">El Protocolo DOMIS™</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Cómo <span className="text-cyan-400">Funciona</span>
          </h2>
        </div>

        {/* MARCADOR DE POSICIÓN (Para que el salto no sea brusco) */}
        <div ref={containerRef} className="h-1 w-full opacity-0 pointer-events-none"></div>

        {/* NAVEGACIÓN GLOBAL: Cambia de Relative a Fixed con suavidad */}
        <div className={`transition-all duration-700 ease-in-out ${
          isSticky 
            ? 'fixed top-0 left-0 w-full z-[999] py-3 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl' 
            : 'relative w-full max-w-4xl mx-auto py-8 z-20'
        }`}>
          <div className={`flex flex-col md:flex-row gap-3 md:gap-4 mx-auto transition-all duration-700 px-4 ${
            isSticky ? 'max-w-5xl' : 'max-w-4xl'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 transition-all duration-500 relative rounded-xl border-2 ${
                  isSticky ? 'p-2 md:p-3' : 'p-6'
                } ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`flex items-center justify-center gap-2 md:gap-3 transition-all duration-500 ${isSticky ? 'flex-row' : 'flex-col'}`}>
                  <span className={`transition-all duration-500 ${isSticky ? 'text-xl' : 'text-3xl'}`}>{tab.icon}</span>
                  <div className={`${isSticky ? 'text-left' : 'text-center'}`}>
                    <div className={`font-bold uppercase tracking-widest transition-all duration-500 ${
                      isSticky ? 'text-[7px]' : 'text-xs mb-1'
                    } ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {tab.label}
                    </div>
                    <div className={`font-black uppercase transition-all duration-500 ${
                      isSticky ? 'text-[10px] md:text-xs' : 'text-lg'
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

        {/* CONTENIDO DE FASES */}
        <div className={`transition-all duration-500 ${isSticky ? 'mt-40' : 'mt-8'}`}>
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