"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

// --- HOJA 1: EL GANCHO DE NEGOCIOS (COLOR VERDE APLICADO) ---
export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
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
      className="absolute inset-0 z-10 flex flex-col justify-between px-6 max-w-7xl mx-auto h-screen pt-24 pb-32 md:py-20 pointer-events-none"
    >
      <div className="text-left relative z-10 pointer-events-auto max-w-3xl mt-4 md:mt-10">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.85] mb-4 uppercase tracking-tighter">
          NO COMPRES <br />
          <span className="text-white">PROMESAS.</span> <br />
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">COMPRA DATOS.</span>
        </h1>
        
        <div className="mb-6">
          {/* ÚNICO CAMBIO: COLOR VERDE ESMERALDA */}
          <p className="text-4xl md:text-6xl font-black text-green-500 leading-none mb-4 uppercase italic">
            AHORRA MILLONES
          </p>
          <p className="text-slate-200 text-xl md:text-2xl font-medium max-w-xl leading-tight">
            en tu inversión con nuestro sistema de Auditoría Técnica y Estrategia de Negociación.
          </p>
        </div>
      </div>

      <div className="flex justify-end items-end w-full mb-32 md:mb-0">
        <div className="bg-slate-950/90 backdrop-blur-xl p-8 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto max-w-sm w-full relative z-20">
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">
            COTIZA TU ESTRATEGIA
          </h3>
          <div className="space-y-4 my-6">
            <input 
                type="text" 
                id="nombre" 
                placeholder="Tu nombre" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#F59E0B] transition-colors"
            />
            <input 
                type="tel" 
                id="telefono" 
                placeholder="+56 9 1234 5678" 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#F59E0B] transition-colors"
            />
          </div>
          <button 
            onClick={handleWhatsAppClick}
            className="w-full bg-[#F59E0B] hover:bg-[#d98c08] text-slate-950 font-black py-4 rounded-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-2 group text-[13px] leading-tight"
          >
            ACTIVA TU AUDITORÍA TÉCNICA Y PODER DE NEGOCIACIÓN →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// --- HOJA 2: INFORME TÉCNICO (MANTENIDO SIN CAMBIOS) ---
export function HeroSpecs({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.85, 0.98], [0, 1]);
  const x = useTransform(scrollYProgress, [0.85, 0.98], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, x }} 
      className="absolute inset-0 z-20 flex flex-col justify-center items-end px-6 max-w-7xl mx-auto h-screen pointer-events-none"
    >
      <div className="bg-slate-950/85 backdrop-blur-md p-8 border-l-4 border-[#F59E0B] rounded-r-lg shadow-2xl pointer-events-auto max-w-xl w-full mt-40">
        <p className="text-white text-sm mb-2 font-bold uppercase tracking-tight">
          DOMIS™ | El primer Buyer's Agent técnico de Chile
        </p>
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
          INFORME <span className="text-[#F59E0B]">Domis™</span>
        </h3>
        <div className="space-y-4 text-white text-sm">
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Auditoría PCF-15™ | 0-7</p>
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Validación Normativa: OGUC, RIDAA y RIC</p>
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Poder de Cierre: 3 escenarios de negociación</p>
          <p><span className="text-[#F59E0B] font-black mr-2">✓</span> Estrategia: Descuento directo sobre precio</p>
        </div>
        <button className="mt-8 w-full border-2 border-[#F59E0B] text-[#F59E0B] font-black py-4 uppercase tracking-widest text-xs hover:bg-[#F59E0B] hover:text-slate-950 transition-all">
          Ver detalle técnico
        </button>
      </div>
    </motion.div>
  );
}