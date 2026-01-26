import { useState, useEffect } from 'react';
import { useTabs } from '../context/TabsContext';

// Icono de Candado para el acceso privado
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
  </svg>
);

export default function Header() {
  const whatsappUrl = "https://wa.me/56982348089?text=Hola Ariel, quiero solicitar una auditoría técnica con DOMIS™.";
  
  const [isScanning, setIsScanning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);

  // Acceso al cerebro global de las pestañas
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

      <nav className="fixed top-0 w-full z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-900/80 px-6 py-4 transition-all duration-300 shadow-lg shadow-slate-950/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center relative">
          
          {/* --- LOGO TRANSFORMER --- */}
          <a href="#" className="relative w-48 h-16 flex items-center select-none z-50 group cursor-pointer" aria-label="Ir al inicio">
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-sm">
                <div 
                  key={cycleCount}
                  className="absolute top-0 bottom-0 left-0 w-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee] z-50 animate-laser-wipe blur-[0.5px]"
                ></div>
            </div>

            <div className="relative w-full h-full flex items-center">
              <div 
                className={`absolute inset-0 flex flex-col justify-center items-start transition-all duration-500 ease-in-out ${
                  !isScanning ? 'opacity-100 delay-300 blur-0 scale-100' : 'opacity-0 delay-0 blur-sm scale-95'
                }`}
              >
                <div className="flex items-start">
                  <span className="text-3xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-sm group-hover:text-cyan-50 transition-colors">
                    DOMIS
                  </span>
                  <span className="text-cyan-500 text-lg font-bold ml-1 relative top-[-4px]">
                    ™
                  </span>
                </div>
                <span className="text-[10px] text-cyan-500 font-bold tracking-[0.35em] uppercase leading-none mt-1">
                  PROPERTY-AUDIT
                </span>
              </div>

              <div 
                className={`absolute inset-0 flex items-center justify-start transition-all duration-500 ease-in-out pointer-events-none ${
                  isScanning ? 'opacity-100 delay-300 blur-0 scale-100' : 'opacity-0 delay-0 blur-sm scale-95'
                }`}
              >
                <div className="relative h-[76px] w-full flex flex-col justify-center items-start -ml-5 top-3">
                  <img 
                    src="/wireframe.png" 
                    alt="System Scan" 
                    className="h-full w-auto object-contain object-left drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] block"
                  />
                  <div className="absolute -bottom-1 left-7 flex items-center gap-1.5 leading-none">
                    <div className="flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_#ef4444]"></span>
                       <span className="text-[9px] font-mono font-bold text-red-400 tracking-wider uppercase whitespace-nowrap">
                         SCANNING...
                       </span>
                    </div>
                    <span className="text-[9px] text-cyan-400 font-mono font-bold tracking-widest">
                      95%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </a>
          
          {/* --- MENÚ DE FASES CONECTADO AL CONTEXTO --- */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-bold text-slate-400 uppercase tracking-wide relative z-10">
            <a href="#problema" className="hover:text-white transition-colors">El Problema</a>
            
            <a 
              href="#proceso" 
              onClick={() => setActiveTab('fase1')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              Auditoría <span className="text-[9px] text-slate-500 font-medium normal-case border border-slate-800 px-1 rounded">(Fase 1)</span>
            </a>
            
            <a 
              href="#proceso" 
              onClick={() => setActiveTab('fase2')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              Negociación <span className="text-[9px] text-slate-500 font-medium normal-case border border-slate-800 px-1 rounded">(Fase 2)</span>
            </a>
            
            <a 
              href="#proceso" 
              onClick={() => setActiveTab('fase3')}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            >
              Remodelación <span className="text-[9px] text-slate-500 font-medium normal-case border border-slate-800 px-1 rounded">(Fase 3)</span>
            </a>
          </div>

          {/* --- ACCIONES --- */}
          <div className="flex items-center gap-3 relative z-10">
            <a 
              href="/calculator" 
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-800 bg-slate-900/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-900 transition-all group"
              title="Acceso Privado Clientes"
            >
              <LockIcon />
              <span className="text-[10px] font-bold tracking-wider">PCF-15™</span>
            </a>

            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden md:block bg-cyan-500 hover:bg-white text-slate-950 px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:scale-105 active:scale-95"
            >
              Solicitar Auditoría
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}