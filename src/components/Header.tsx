import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { name: 'El Problema', href: '#problema' },
    { name: 'Auditoría', href: '#auditoria' },
    { name: 'Negociación', href: '#negociacion' },
    { name: 'Remodelación', href: '#remodelacion' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 border-b border-slate-900' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO (Estructura Original) */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span className="text-2xl font-black text-white tracking-tighter">DOMIS</span>
          <span className="text-cyan-500 font-bold text-xs">™</span>
        </div>

        {/* NAVEGACIÓN (Agrandada a text-lg) */}
        <nav className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-lg font-bold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-tighter"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* BOTÓN (Estructura Original) */}
        <button className="px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-widest rounded-xl transition-all">
          Agendar ahora
        </button>
      </div>
    </header>
  );
}