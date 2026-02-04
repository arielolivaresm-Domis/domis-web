"use client";
import { useState } from 'react';
import { motion, useTransform, MotionValue } from "framer-motion";
import ContactModal from './ContactModal';

// --- PARTE 1: EL GANCHO (INICIO) ---
export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.2 ? "none" : "auto");

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }} 
      className="absolute inset-0 z-10 flex flex-col justify-center px-6 max-w-7xl mx-auto h-screen pointer-events-none"
    >
      <div className="text-left relative z-10 pointer-events-auto max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">
          NO COMPRES <br />
          <span className="text-white">PROMESAS.</span> <br />
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">COMPRA DATOS.</span>
        </h1>
      </div>
    </motion.div>
  );
}

// --- PARTE 2: LOS DATOS (FINAL) ---
export function HeroSpecs({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Aumentamos el rango de visibilidad para que no se corte por scroll
  const opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const x = useTransform(scrollYProgress, [0.7, 0.85], [50, 0]);

  return (
    <>
      <motion.div 
        style={{ opacity, x }} 
        // Subimos z-index a 50 para pasar por encima de cualquier capa del canvas 3D
        className="absolute inset-0 z-50 flex flex-col justify-center items-end px-6 max-w-7xl mx-auto h-screen pointer-events-none"
      >
        <div className="bg-slate-950/90 backdrop-blur-xl p-8 border-l-4 border-cyan-500 rounded-r-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] pointer-events-auto max-w-xl w-full">
          <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
            INFORME <span className="text-cyan-400">PCF-15™</span>
          </h3>
          
          <div className="space-y-4 mb-8">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest border-b border-white/5 pb-2">✓ Auditoría Estructural</p>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest border-b border-white/5 pb-2">✓ Termografía de Instalaciones</p>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest border-b border-white/5 pb-2">✓ Cumplimiento Normativo OGUC/RIDAA</p>
          </div>

          <button 
            onClick={() => {
              console.log("🚀 SISTEMA DOMIS: Abriendo Modal de Captura...");
              setIsModalOpen(true);
            }}
            className="group relative w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-5 uppercase tracking-[0.2em] text-xs transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)] active:scale-95"
          >
            Solicitar Auditoría
          </button>
        </div>
      </motion.div>

      {/* El Modal siempre debe estar fuera del div con transforms para evitar errores de render */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}