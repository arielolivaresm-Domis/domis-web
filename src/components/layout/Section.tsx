import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;       
  containerClass?: string;  
  id?: string;
}

export default function Section({ children, className = "", containerClass = "", id }: SectionProps) {
  return (
    <section 
      id={id} 
      // bg-slate-950 sólido para asegurar que sea opaco por defecto
      className={`w-full relative bg-slate-950 overflow-hidden ${className}`}
    >
      {/* CAMBIO CLAVE: px-0 en móvil para ancho total, md:px-12 en escritorio */}
      <div className={`max-w-7xl mx-auto px-0 md:px-12 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
}