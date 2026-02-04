import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;       // Para colores de fondo o ID específicos
  containerClass?: string;  // Para ajustes extra del contenedor interno
  id?: string;
}

export default function Section({ children, className = "", containerClass = "", id }: SectionProps) {
  return (
    <section id={id} className={`w-full relative ${className}`}>
      {/* El Contenedor Inteligente - Estilo Bootstrap Grid */}
      <div className={`max-w-7xl mx-auto px-6 md:px-12 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
}