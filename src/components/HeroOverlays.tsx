"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

// --- PARTE 1: EL GANCHO (INICIO) ---
export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Se desvanece rápido (al 20% del scroll)
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
        
        <div className="space-y-6 mb-10">
          <div className="text-slate-200 text-xl font-bold leading-tight">
            <p className="mb-2">
              Detectamos vicios y defectos ocultos <span className="text-white underline decoration-cyan-500/30">antes</span> de que compres.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">DOMIS<span className="text-cyan-500 text-xs relative -top-2 ml-0.5">™</span></span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400 text-sm tracking-[0.2em] font-black uppercase">El primer Buyer's Agent técnico de Chile</span>
            </div>
          </div>
          
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Auditoría técnica profesional de <span className="text-white font-bold decoration-cyan-500 underline decoration-2 underline-offset-8">casas y departamentos</span> 
            <br />
            + Estrategia de negociación basada en datos reales.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- PARTE 2: LOS DATOS (FINAL) ---
export function HeroSpecs({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Aparece al final (del 70% al 90% del scroll)
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const x = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, x }} 
      className="absolute inset-0 z-20 flex flex-col justify-center items-end px-6 max-w-7xl mx-auto h-screen pointer-events-none"
    >
      <div className="bg-slate-950/80 backdrop-blur-md p-8 border-l-4 border-cyan-500 rounded-r-lg shadow-2xl pointer-events-auto max-w-xl w-full">
        
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
          INFORME <span className="text-cyan-400">PCF-15™</span>
        </h3>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="text-cyan-400 font-black">✓</span>
            <p><span className="font-bold">Auditoría PCF-15<span className="text-cyan-500 text-[10px] relative -top-1.5 ml-0.5">™</span>:</span> Scoring técnico 0-7 | Entrega máxima 3 días</p>
          </div>
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="text-cyan-400 font-black">✓</span>
            <p><span className="font-bold">Escaneo del entorno:</span> Radio de 3km a la redonda</p>
          </div>
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="text-cyan-400 font-black">✓</span>
            <p><span className="font-bold">Inversión:</span> Desde $190.000 (cobro mínimo ref. 100m²)</p>
          </div>
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="text-cyan-400 font-black">✓</span>
            <p><span className="font-bold">Poder de Cierre:</span> 3 propuestas de negociación con datos duros</p>
          </div>
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="text-cyan-400 font-black">✓</span>
            <p><span className="font-bold">Fase Final:</span> Remodelación estratégica de la propiedad</p>
          </div>
        </div>

        <button className="mt-8 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 uppercase tracking-widest transition-colors shadow-[0_0_20px_rgba(34,211,238,0.3)]">
          Solicitar Auditoría
        </button>
      </div>
    </motion.div>
  );
}