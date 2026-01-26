import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Efecto para el sombreado al hacer scroll en PC
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* LA CLAVE: 'hidden md:block' 
       - hidden: Desaparece en celulares.
       - md:block: Aparece desde tablets y computadores.
    */
    <header 
      className={`fixed top-0 w-full z-[100] transition-all duration-300 hidden md:block ${
        isScrolled 
          ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO DOMIS™ */}
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:rotate-6 transition-transform">
            <span className="text-slate-950 font-black text-xl">D</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-xl leading-none italic">DOMIS™</span>
            <span className="text-cyan-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-none">Negociación</span>
          </div>
        </div>

        {/* NAVEGACIÓN PC */}
        <nav className="hidden lg:flex items-center gap-8">
          {['Inicio', 'Metodología', 'Calculadora', 'Beneficios'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-slate-400 hover:text-cyan-400 text-xs font-black uppercase tracking-widest transition-colors"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* BOTÓN DE ACCIÓN RÁPIDA (Solo PC) */}
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest transition-all">
            Fase 1: Auditoría
          </button>
          
          <a 
            href="#beneficio-fase2"
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-slate-950 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20"
          >
            Activar Fase 2
            <ChevronRight size={14} />
          </a>
        </div>

      </div>
    </header>
  );
};

export default Header;