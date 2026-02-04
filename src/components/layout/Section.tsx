import type { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;       
  containerClass?: string;  
  id?: string;
}

export default function Section({ children, className = "", containerClass = "", id }: SectionProps) {
  return (
    /* 1. bg-slate-950 por defecto: Sella el fondo para que no se vea el wireframe azul.
       2. overflow-hidden: Evita desplazamientos laterales indeseados en móvil.
    */
    <section 
      id={id} 
      className={`w-full relative bg-slate-950 overflow-hidden ${className}`}
    >
      {/* EL CAMBIO CLAVE:
         - px-0 en móvil: Los componentes hijos ahora pueden tocar los bordes del celular (Full-Width).
         - md:px-12 en escritorio: Mantenemos la elegancia y los márgenes en pantallas grandes.
      */}
      <div className={`max-w-7xl mx-auto px-0 md:px-12 ${containerClass}`}>
        {children}
      </div>
    </section>
  );
}