import { useState, useEffect } from 'react'; 
import { ChevronRight } from 'lucide-react'; 
// Limpieza: Se eliminaron React, Menu y X para corregir el error de Vercel

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`absolute top-0 w-full z-[100] transition-all duration-300 md:fixed ${
        isScrolled 
          ? 'md:bg-slate-950/90 md:backdrop-blur-md md:border-b md:border-white/5 md:py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO DOMIS™ */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <span className="text-slate-950 font-black text-xl">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-xl leading-none italic uppercase font-sans">Domis™</span>
            <span className="text-cyan-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-none font-sans">Negociación</span>
          </div>
        </div>

        {/* NAVEGACIÓN PC */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Inicio', 'Metodología', 'Calculadora', 'Beneficios'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-slate-400 hover:text-cyan-400 text-[10px] font-black uppercase tracking-widest transition-colors font-sans"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* BOTÓN DE ACCIÓN */}
        <div className="flex items-center gap-4">
          <a 
            href="#beneficio-fase2"
            className="flex items-center gap-2 px-5 py-2.5 bg-cyan-500 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 font-sans"
          >
            Fase 2
            <ChevronRight size={14} />
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;