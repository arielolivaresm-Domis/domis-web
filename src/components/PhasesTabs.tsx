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

  useEffect(() => {
    const handleScroll = () => {
      // Se achican al pasar 400px de scroll
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { id: 'fase1' as const, label: 'Fase 1', subtitle: 'Auditoría', icon: '🔍' },
    { id: 'fase2' as const, label: 'Fase 2', subtitle: 'Negociación', icon: '💼' },
    { id: 'fase3' as const, label: 'Fase 3', subtitle: 'Remodelación', icon: '🏗️' },
  ];

  return (
    <section className="py-20 bg-slate-950 relative" id="proceso">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">El Protocolo DOMIS™</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Cómo <span className="text-cyan-400">Funciona</span>
          </h2>
        </div>

        {/* CONTENEDOR STICKY: Se queda en top-20 (bajo el header) y se achica */}
        <div className={`transition-all duration-500 z-[100] sticky top-24 ${
          isSticky ? 'scale-90 opacity-100' : 'scale-100'
        }`}>
          <div className={`flex flex-col md:flex-row gap-3 max-w-4xl mx-auto p-2 rounded-2xl transition-all ${
            isSticky ? 'bg-slate-950/80 backdrop-blur-lg border border-slate-800 shadow-2xl' : ''
          }`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
                  <div className="text-left md:text-center">
                    <div className={`font-bold uppercase tracking-widest ${isSticky ? 'text-[8px]' : 'text-xs mb-1'} ${activeTab === tab.id ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {tab.label}
                    </div>
                    <div className={`font-black uppercase ${isSticky ? 'text-xs' : 'text-lg'} ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>
                      {tab.subtitle}
                    </div>
                  </div>
                </div>
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-cyan-500 rounded-t-full animate-pulse"></div>}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12">
          {activeTab === 'fase1' && <div className="animate-fadeIn"><AuditPacks /><Sourcing /><Calculator /></div>}
          {activeTab === 'fase2' && <div className="animate-fadeIn"><BenefitFlyer /><Deliverable /><Phase2 /></div>}
          {activeTab === 'fase3' && <div className="animate-fadeIn"><Phase3 /></div>}
        </div>
      </div>
    </section>
  );
}