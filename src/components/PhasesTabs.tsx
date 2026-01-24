import { useState, useEffect, useRef } from 'react';
import Phase1 from './Phase1';
import Phase2 from './Phase2';
import Phase3 from './Phase3';

export default function PhasesTabs() {
  const [activeTab, setActiveTab] = useState(1);
  const [isShrunk, setIsShrunk] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setIsShrunk(rect.top <= 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (id: number) => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      const offset = 140;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const tabs = [
    { id: 1, label: 'FASE 1: AUDITORÍA' },
    { id: 2, label: 'FASE 2: NEGOCIACIÓN' },
    { id: 3, label: 'FASE 3: REMODELACIÓN' }
  ];

  return (
    <div id="proceso" className="relative">
      <div ref={triggerRef} className="h-1 absolute -top-20" />
      
      {/* NAVEGACIÓN CON AJUSTE SLIM PARA MÓVIL */}
      <nav className={`
        sticky top-[70px] z-40 transition-all duration-500
        ${isShrunk 
          ? 'py-2 md:py-4 bg-slate-950/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl' 
          : 'py-4 md:py-8 bg-transparent'}
      `}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-1.5 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  relative transition-all duration-300 uppercase font-black tracking-tighter
                  /* SOLO SE CAMBIA EL TAMAÑO EN CELULAR */
                  px-2 py-1.5 md:px-8 md:py-4 
                  text-[9px] md:text-sm
                  rounded-lg md:rounded-2xl
                  /* ---------------------------------- */
                  ${activeTab === tab.id 
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.4)]' 
                    : 'bg-slate-900/50 text-slate-400 border border-slate-800'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENIDO DE LAS FASES */}
      <div className="mt-6 md:mt-12 transition-all duration-500">
        {activeTab === 1 && <Phase1 onNext={() => handleTabChange(2)} />}
        {activeTab === 2 && <Phase2 onNext={() => handleTabChange(3)} />}
        {activeTab === 3 && <Phase3 />}
      </div>
    </div>
  );
}