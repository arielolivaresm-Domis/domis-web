"use client";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import HeroCanvas from "./HeroCanvas";
import { HeroHook, HeroSpecs } from "./HeroOverlays";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Controla el progreso del scroll de 0 a 1
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // Altura del scroll: 400vh (4 pantallas) para dar tiempo a la animación
    <section ref={containerRef} className="relative h-[400vh] bg-slate-950">
      
      {/* Contenedor Sticky: Mantiene todo fijo mientras bajas */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Capa 0: Fondo (Motor Visual) */}
        <HeroCanvas progress={scrollYProgress} />
        
        {/* Capa 1: Texto Inicial */}
        <HeroHook scrollYProgress={scrollYProgress} />
        
        {/* Capa 2: Checklist Final */}
        <HeroSpecs scrollYProgress={scrollYProgress} />
        
      </div>
    </section>
  );
}