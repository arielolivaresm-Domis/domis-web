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

  // Control de scroll para el efecto de reducción de las pestañas
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para forzar el scroll al inicio de la sección al cambiar de fase
  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      const offset = 120; // Espacio para Header + Pestañas achicadas
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
    { 
      id: 'fase1' as const, 
      label: 'Fase 1', 
      subtitle: 'Auditoría',
      icon: '🔍'
    },
    { 
      id: 'fase2' as const, 
      label: 'Fase 2', 
      subtitle: 'Negociación',
      icon: '💼'
    },
    { 
      id: 'fase3' as const, 
      label: 'Fase 3', 
      subtitle: 'Remodelación',
      icon: '🏗️'
    },
  ];

  return (
    <section className="py-20 bg-slate-950 relative" id="proceso" style={{ scrollMarginTop: '150px' }}>
      {/* FONDO TÉCNICO */}
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

        {/* TABS NAVEGACIÓN - Con Z-Index maestro y Scroll de precisión */}
        <div className={`transition-all duration-500 z-[100] py-4 ${
          isSticky 
            ? 'sticky top-[80px] scale-90 bg-slate-950/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl px-4' 
            : 'relative scale-100'
        }`}>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
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

        {/* CONTENIDO DE TABS */}
        <div className="mt-8">
          
          {/* FASE 1: AUDITORÍA */}
          {activeTab === 'fase1' && (
            <div className="space-y-16 animate-fadeIn">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="text-3xl font-black text-white mb-4 uppercase">
                  Detección de <span className="text-cyan-400">Riesgo</span>
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Inspección física rigurosa de la propiedad para identificar 
                  vicios ocultos y normativa.
                </p>
              </div>
              <div id="auditoria" style={{ scrollMarginTop: '200px' }}><AuditPacks /></div>
              <div id="sourcing" className="pt-16" style={{ scrollMarginTop: '200px' }}><Sourcing /></div>
              <div id="calculator" className="pt-16" style={{ scrollMarginTop: '200px' }}>
                <div className="max-w-5xl mx-auto"><Calculator /></div>
              </div>
              <div className="text-center pt-8">
                <a 
                  href="https://wa.me/56982348089?text=Hola, quiero solicitar una auditoría técnica DOMIS™"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-10 py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/30 hover:scale-105"
                >
                  Solicitar Fase 1
                </a>
              </div>
            </div>
          )}

          {/* FASE 2: NEGOCIACIÓN */}
          {activeTab === 'fase2' && (
            <div className="space-y-16 animate-fadeIn">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="text-3xl font-black text-white mb-4 uppercase">
                  Estrategia de <span className="text-cyan-400">Valor</span>
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Usamos los hallazgos técnicos para fundamentar una rebaja 
                  en el precio de compra.
                </p>
              </div>
              <div style={{ scrollMarginTop: '200px' }}><BenefitFlyer /></div>
              <div className="pt-8" style={{ scrollMarginTop: '200px' }}><Deliverable /></div>
              <div className="pt-8" style={{ scrollMarginTop: '200px' }}><Phase2 /></div>
              <div className="text-center pt-8">
                <a 
                  href="https://wa.me/56982348089?text=Hola, quiero contratar Fase 1 + Fase 2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-10 py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/30 hover:scale-105"
                >
                  Activar Fase 1 + 2
                </a>
              </div>
            </div>
          )}

          {/* FASE 3: REMODELACIÓN */}
          {activeTab === 'fase3' && (
            <div className="space-y-16 animate-fadeIn">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="text-3xl font-black text-white mb-4 uppercase">
                  Ejecución <span className="text-cyan-400">Técnica</span>
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Una vez que las llaves son tuyas, ejecutamos el plan de 
                  remodelación diseñado en la auditoría para maximizar tu 
                  plusvalía desde el primer día.
                </p>
              </div>
              <div style={{ scrollMarginTop: '200px' }}><Phase3 /></div>
              <div className="text-center pt-8">
                <a 
                  href="https://wa.me/56982348089?text=Hola, quiero información sobre DOMIS Upgrade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-10 py-4 rounded-xl font-black uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/30 hover:scale-105"
                >
                  Conocer Domis Upgrade
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}