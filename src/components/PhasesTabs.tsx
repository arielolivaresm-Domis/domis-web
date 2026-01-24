import { useState, useEffect, useRef } from 'react';
import Phase1 from './AuditPacks'; 
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
        // Se activa el modo compacto cuando el componente llega al tope
        setIsShrunk(rect.top <= 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (id: number) => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      // Ajuste de salto para que no quede tapado por la barra
      const offset = 120;
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
      {/* Punto de control para el efecto shrink */}
      <div ref={triggerRef} className="h-1 absolute -top-10 w-full" />
      
      {/* NAVEGACIÓN: z-50 y top-[64px] para asegurar que se mantenga visible sobre todo */}
      <nav className={`
        sticky top-[64px] z-50 transition-all duration-300 ease-in-out
        ${isShrunk 
          ? 'py-2 bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/30 shadow-2xl' 
          : 'py-4 md:py-8 bg-transparent'}
      `}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-center gap-2 md:gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`
                  relative transition-all duration-300 uppercase font-black tracking-tighter
                  /* TAMAÑOS CORREGIDOS: Nunca bajan de text-[10px] para ser legibles */
                  ${isShrunk 
                    ? 'px-3 py-2 md:px-8 md:py-3 text-[10px] md:text-sm rounded-lg md:rounded-xl' 
                    : 'px-5 py-4 md:px-10 md:py-5 text-[12px] md:text-base rounded-xl md:rounded-2xl'}
                  
                  ${activeTab === tab.id 
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-105' 
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 backdrop-blur-sm'}
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* CONTENIDO DE LAS FASES */}
      <div className="mt-6 md:mt-16 px-4 md:px-0 transition-all">
        {activeTab === 1 && <Phase1 onNext={() => handleTabChange(2)} />}
        {activeTab === 2 && <Phase2 onNext={() => handleTabChange(3)} />}
        {activeTab === 3 && <Phase3 />}
      </div>
    </div>
  );
}