"use client";
import { useState } from 'react';
// Importamos las herramientas de animación que faltaban
import { motion, useTransform, MotionValue } from "framer-motion";
import ContactModal from './ContactModal';

export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-0 z-10 flex flex-col justify-center px-6 max-w-7xl mx-auto h-screen pointer-events-none">
      <div className="text-left relative z-10 pointer-events-auto max-w-2xl">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">
          NO COMPRES <br />
          <span className="text-white">PROMESAS.</span> <br />
          <span className="text-cyan-400">COMPRA DATOS.</span>
        </h1>
      </div>
    </motion.div>
  );
}

export function HeroSpecs({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const x = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);

  return (
    <>
      <motion.div 
        style={{ opacity, x }} 
        // Subimos z-index a 50 para que el botón siempre sea clickable
        className="absolute inset-0 z-50 flex flex-col justify-center items-end px-6 max-w-7xl mx-auto h-screen pointer-events-none"
      >
        <div className="bg-slate-950/80 backdrop-blur-md p-8 border-l-4 border-cyan-500 rounded-r-lg shadow-2xl pointer-events-auto max-w-xl w-full">
          <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
            INFORME <span className="text-cyan-400">PCF-15™</span>
          </h3>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          >
            Solicitar Auditoría
          </button>
        </div>
      </motion.div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}