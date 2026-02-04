import { useState, useEffect } from 'react';
import { useTabs } from '../context/TabsContext';

const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
  </svg>
);

export default function Header() {
  const message = "Hola equipo DOMIS™, vengo del Header de la web. Necesito Auditoría técnica profesional + Estrategia de negociación para una propiedad.";
  const whatsappUrl = `https://wa.me/56929901343?text=${encodeURIComponent(message)}`;
  
  const [isScanning, setIsScanning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const { setActiveTab } = useTabs();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isScanning) {
      timer = setTimeout(() => {
        setIsScanning(false);
        setCycleCount(c => c + 1);
      }, 3000);
    } else {
      timer = setTimeout(() => {
        setIsScanning(true);
        setCycleCount(c => c + 1);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [isScanning]);

  return (
    <>
      <style>{`
        @keyframes laserWipe {
          0% { transform: translateX(0px); opacity: 0; } 
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(200px); opacity: 0; }
        }
        .animate-laser-wipe {
          animation: laserWipe 0.8s cubic-bezier(0.45, 0, 0.55, 1) forwards;
        }
      `}</style>

      <nav className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-900/80 px-4 md:px-6 py-4 transition-all duration-300 shadow-lg shadow-slate-950/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          
          {/* LOGO: Ajustado w-40 y tracking-tight para que aparezca la "M" */}
          <a href="#" className="relative w-40 md:w-48 h-12 md:h-16 flex items-center select-none z-50 group cursor-pointer">
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
                <div key={cycleCount} className="absolute top-0 bottom-0 left-0 w-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee] z-50 animate-laser-wipe"></div>
            </div>
            <div className="relative w-full h-full flex items-center">
              <div className={`absolute inset-0 flex flex-col justify-center items-start transition-all duration-500 ${!isScanning ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}>
                <div className="flex items-start">
                  <span className="text-xl md:text-3xl font-black text-white tracking-tight uppercase leading-none">DOMIS</span>
                  <span className="text-cyan-500 text-sm md:text-lg font-bold ml-1 relative top-[-2px]">™</span>
                </div>
                <span className="text-[7px] md:text-[10px] text-cyan-500 font-bold tracking-[0.2em] uppercase mt-1">PROPERTY-AUDIT</span>
              </div>
              <div className={`absolute inset-0 flex items-center justify-start transition-all duration-500 ${isScanning ? 'opacity-100' : 'opacity-0'}`}>
                <img src="/wireframe.png" alt="Scan" className="h-10 md:h-[76px] w-auto object-contain -ml-2" />
              </div>
            </div>
          </a>
          
          <div className="hidden lg:flex items-center gap-10 text-base font-bold text-slate-400 uppercase tracking-wide">
            <a href="#problema" className="hover:text-white transition-colors">El Problema</a>
            <a href="#proceso" onClick={() => setActiveTab('fase1')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">Auditoría <span className="text-[10px] border border-slate-800 px-1.5 rounded">(Fase 1)</span></a>
            <a href="#proceso" onClick={() => setActiveTab('fase2')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">Negociación <span className="text-[10px] border border-slate-800 px-1.5 rounded">(Fase 2)</span></a>
            <a href="#proceso" onClick={() => setActiveTab('fase3')} className="hover:text-cyan-400 transition-colors flex items-center gap-1">Remodelación <span className="text-[10px] border border-slate-800 px-1.5 rounded">(Fase 3)</span></a>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <a href="/calculator" className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-cyan-400 transition-all group">
              <LockIcon />
              <span className="text-[9px] md:text-[10px] font-bold">PCF-15™</span>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-white text-slate-950 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              Solicitar Auditoría
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}