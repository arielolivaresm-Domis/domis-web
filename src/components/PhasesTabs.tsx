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
  const sectionRef = useRef<HTMLDivElement>(null);

  // Sistema de detección de scroll para activar el modo compacto
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Se activa cuando el título de "Cómo Funciona" empieza a salir de vista
        setIsSticky(rect.top <= 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver al inicio de la sección con margen de seguridad
  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      const yOffset = -180; // Margen para no chocar con el Header + Tabs
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
    <section className="py-20 bg-slate-950 relative" id="proceso" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Protocolo DOMIS™</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Cómo <span className="text-cyan-400">Funciona</span>
          </h2>
        </div>

        {/* NAVEGACIÓN PERSISTENTE: Fixed top-16 para quedar BAJO el Header estándar */}
        <div className={`transition-all duration-700 ease-in-out ${
          isSticky 
            ? 'fixed top-16 left-0 w-full z-[999] py-3 bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 shadow-2xl scale-95' 
            : 'relative w-full max-w-4xl mx-auto py-6 z-20 scale-100'
        }`}>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 max-w-4xl mx-auto px-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 transition-all duration-500 relative rounded-xl border-2 ${
                  isSticky ? 'p-2' : 'p-6'
                } ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/10 border-cyan-500 shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`flex items-center justify-center gap-3 transition-all ${isSticky ? 'flex-row' : 'flex-col'}`}>
                  <span className={`${isSticky ? 'text-xl' : 'text-3xl'}`}>{tab.icon}</span>
                  <div className={`${isSticky ? 'text-left' : 'text-center'}`}>
                    <div className={`font-bold uppercase tracking-widest ${isSticky ? 'text-[7px]' : 'text-xs mb-1'} ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {tab.label}
                    </div>
                    <div className={`font-black uppercase ${isSticky ? 'text-[10px]' : 'text-lg'} ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>
                      {tab.subtitle}
                    </div>
                  </div>
                </div>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 rounded-t-full animate-pulse"></div>}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO DE FASES */}
        <div className={`transition-all duration-500 ${isSticky ? 'mt-40' : 'mt-12'}`}>
          {activeTab === 'fase1' && <div className="animate-fadeIn"><AuditPacks /><Sourcing /><Calculator /></div>}
          {activeTab === 'fase2' && <div className="animate-fadeIn"><BenefitFlyer /><Deliverable /><Phase2 /></div>}
          {activeTab === 'fase3' && <div className="animate-fadeIn"><Phase3 /></div>}
        </div>

      </div>
    </section>
  );
}