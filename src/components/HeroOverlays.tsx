"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

// --- HOJA 1: EL GANCHO DE NEGOCIOS (REDIMENSIONADO) ---
export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -30]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.2 ? "none" : "auto");

  const handleWhatsAppClick = () => {
    const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value || "Cliente Nuevo";
    const telefono = (document.getElementById('telefono') as HTMLInputElement)?.value || "No especificado";
    const phoneNumber = "56929901343";
    const baseMessage = `Hola, equipo DOMIS™. Soy ${nombre} (${telefono}). Estoy en la web y necesito Auditoría técnica profesional y generar Estrategia de negociación para una propiedad...`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(baseMessage)}`, '_blank');
  };

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }} 
      className="absolute inset-0 z-10 flex flex-col justify-between px-6 max-w-7xl mx-auto h-screen py-12 md:py-20 pointer-events-none"
    >
      <div className="text-left relative z-10 pointer-events-auto max-w-2xl mt-6 md:mt-10">
        {/* Tamaño reducido para evitar que sea invasivo */}
        <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-6 uppercase tracking-tighter">
          NO COMPRES <br />
          <span className="text-white">PROMESAS.</span> <br />
          <span className="text-cyan-400">COMPRA DATOS.</span>
        </h1>
        
        <div className="mb-8">
          <p className="text-2xl md:text-4xl font-black text-[#F59E0B] leading-tight mb-4 uppercase italic">
            AHORRA MILLONES
          </p>
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-xl leading-relaxed">
            en tu inversión con nuestro sistema de Auditoría Técnica y Estrategia de Negociación.
          </p>
        </div>
      </div>

      <div className="flex justify-end items-end w-full pb-6">
        <div className="bg-slate-950/90 backdrop-blur-xl p-6 md:p-8 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto max-w-sm w-full relative z-20">
          <h3 className="text-lg font-bold text-white mb-2 uppercase">COTIZA TU ESTRATEGIA</h3>
          <div className="space-y-3 mb-6">
            <input type="text" id="nombre" placeholder="Tu nombre" className="w-full bg-slate-800/40 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#F59E0B] outline-none" />
            <input type="tel" id="telefono" placeholder="+56 9 1234 5678" className="w-full bg-slate-800/40 border border-slate-700 rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#F59E0B] outline-none" />
          </div>
          <button onClick={handleWhatsAppClick} className="w-full bg-[#F59E0B] hover:bg-[#d98c08] text-slate-950 font-black py-3.5 rounded-xl uppercase tracking-tighter transition-all text-xs leading-tight">
            ACTIVA TU AUDITORÍA TÉCNICA Y PODER DE NEGOCIACIÓN →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- HOJA 2: EL INFORME TÉCNICO ---
export function HeroSpecs({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const x = useTransform(scrollYProgress, [0.7, 0.9], [40, 0]);

  return (
    <motion.div style={{ opacity, x }} className="absolute inset-0 z-20 flex flex-col justify-center items-end px-6 max-w-7xl mx-auto h-screen pointer-events-none">
      <div className="bg-slate-950/95 backdrop-blur-md p-8 border-l-4 border-[#F59E0B] rounded-r-lg shadow-2xl pointer-events-auto max-w-xl w-full">
        <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-2">DOMIS™ | El primer Buyer's Agent técnico de Chile</p>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">INFORME <span className="text-[#F59E0B]">Domis™</span></h3>
        <div className="space-y-4 text-white text-sm md:text-base font-medium">
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Auditoría PCF-15™ | Scoring técnico 0-7</p>
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Validación Normativa: OGUC, RIDAA y RIC</p>
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Poder de Cierre: 3 escenarios de negociación</p>
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Estrategia: Descuento directo sobre precio</p>
        </div>
        <button className="mt-8 w-full border-2 border-[#F59E0B] text-[#F59E0B] font-black py-3 uppercase tracking-widest text-xs hover:bg-[#F59E0B] hover:text-slate-950 transition-all">
          Ver detalle técnico
        </button>
      </div>
    </motion.div>
  );
}