import { useRef, useState, useEffect } from 'react';
import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';
import Calculator from './Calculator';
import BenefitFlyer from './BenefitFlyer';
import Deliverable from './Deliverable';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import FinalCTA from './FinalCTA';
import { useTabs } from '../context/TabsContext';
import { ArrowRight } from 'lucide-react';

export default function PhasesTabs() {
  const { activeTab, setActiveTab } = useTabs();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSlender, setIsSlender] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Se activa el modo delgado al tocar el Header (aprox 72px)
        setIsSlender(rect.top <= 72);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (tabId: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(tabId);
    if (sectionRef.current) {
      const yOffset = isSlender ? -120 : -90;
      const y = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 'fase1' as const, label: 'Fase 1', subtitle: 'Auditoría', icon: '🔍' },
    { id: 'fase2' as const, label: 'Fase 2', subtitle: 'Negociación', icon: '💼' },
    { id: 'fase3' as const, label: 'Fase 3', subtitle: 'Remodelación', icon: '🏗️' },
  ];

  return (
    <section className="py-12 md:py-20 bg-slate-950 relative" id="proceso" ref={sectionRef}>
      
      {/* FONDO TÉCNICO */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none overflow-hidden"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* HEADER: Desaparece suavemente en mobile y desktop al bajar */}
        <div className={`text-center transition-all duration-700 ${isSlender ? 'opacity-0 -translate-y-4 h-0 overflow-hidden' : 'opacity-100 mb-8 md:mb-12 translate-y-0'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-4 md:mb-6">
            <span className="text-[10px] md:text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              El Protocolo DOMIS™
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Cómo <span className="text-cyan-400">Funciona</span>
          </h2>
        </div>

        {/* TABS NAVEGACIÓN: Optimizada para Touch y Persistencia */}
        <div className="sticky top-[72px] z-50 transition-all duration-500 py-2">
          <div className={`flex flex-row gap-1.5 md:gap-4 max-w-5xl mx-auto bg-slate-950/95 backdrop-blur-xl p-1.5 md:p-2 rounded-2xl border transition-all duration-500 ${
            isSlender ? 'border-cyan-500/30 shadow-[0_10px_40px_rgba(2,6,23,0.9)] scale-[0.98] md:scale-100' : 'border-transparent'
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 rounded-xl border transition-all duration-500 relative flex items-center justify-center gap-2 md:gap-3 ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                } ${isSlender ? 'py-2 px-1 md:py-3' : 'py-4 md:py-8 flex-col'}`}
              >
                {/* Icono responsivo */}
                <span className={`transition-all duration-500 ${isSlender ? 'text-sm md:text-xl' : 'text-2xl md:text-4xl'}`}>
                  {tab.icon}
                </span>

                {/* Textos: Ajuste de jerarquía para pantallas pequeñas */}
                <div className={`text-left transition-all duration-500 ${isSlender ? 'block' : 'md:text-center'}`}>
                  <div className={`font-bold uppercase tracking-widest leading-none mb-0.5 md:mb-1 transition-all ${
                    activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'
                  } ${isSlender ? 'text-[5px] md:text-[8px]' : 'text-[8px] md:text-[10px]'}`}>
                    {tab.label}
                  </div>
                  <div className={`font-black uppercase leading-none transition-all ${
                    activeTab === tab.id ? 'text-white' : 'text-slate-400'
                  } ${isSlender ? 'text-[8px] md:text-sm' : 'text-[10px] md:text-xl'}`}>
                    {tab.subtitle}
                  </div>
                </div>

                {/* Barra activa minimalista inferior */}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1.5 right-1.5 h-0.5 bg-cyan-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ÁREA DE CONTENIDO: Espaciado fluido */}
        <div className={`transition-all duration-500 ${isSlender ? 'mt-6' : 'mt-10 md:mt-16'}`}>
          {activeTab === 'fase1' && (
            <div className="space-y-12 md:space-y-16 animate-fadeIn">
              <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 uppercase">Detección de <span className="text-cyan-400">Riesgo</span></h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">Inspección física rigurosa para identificar vicios ocultos y normativa técnica.</p>
              </div>
              <AuditPacks />
              <div className="pt-12 md:pt-16"><Sourcing /></div>
              <div className="pt-12 md:pt-16"><Calculator /></div>
              <div className="text-center pt-12 md:pt-16 border-t border-slate-900">
                <button onClick={() => handleTabChange('fase2')} className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 border border-cyan-500/30 text-cyan-400 px-8 py-4 md:py-5 rounded-xl font-black uppercase tracking-wider transition-all hover:bg-cyan-500 hover:text-slate-950 group">
                  Ir a Fase 2: Negociación
                  <ArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'fase2' && (
            <div className="space-y-12 md:space-y-16 animate-fadeIn">
              <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 uppercase">Estrategia de <span className="text-cyan-400">Valor</span></h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">Fundamentamos la rebaja del precio con los datos obtenidos en la auditoría.</p>
              </div>
              <BenefitFlyer />
              <div className="pt-6 md:pt-8"><Deliverable /></div>
              <div className="pt-6 md:pt-8"><Phase2 /></div>
              <div className="text-center pt-12 md:pt-16 border-t border-slate-900">
                <button onClick={() => handleTabChange('fase3')} className="w-full md:w-auto inline-flex items-center justify-center gap-3 bg-slate-900 border border-cyan-500/30 text-cyan-400 px-8 py-4 md:py-5 rounded-xl font-black uppercase tracking-wider transition-all hover:bg-cyan-400 hover:text-slate-950 group">
                  Ir a Fase 3: Remodelación
                  <ArrowRight className="group-hover:translate-x-2 transition-transform w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'fase3' && (
            <div className="space-y-12 md:space-y-16 animate-fadeIn">
              <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4 uppercase">Ejecución <span className="text-cyan-400">Técnica</span></h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed">Maximizamos tu plusvalía mediante la ejecución del plan de remodelación técnica.</p>
              </div>
              <Phase3 />
            </div>
          )}
        </div>

        {/* CIERRE ESTRATÉGICO INTEGRADO */}
        <div className="mt-20 md:mt-32 pt-12 md:pt-16 border-t border-slate-900/50">
          <FinalCTA />
        </div>

      </div>
    </section>
  );
}