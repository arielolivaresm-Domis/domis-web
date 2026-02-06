"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

// --- PARTE 1: EL GANCHO TÉCNICO (INICIO) ---
export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.2 ? "none" : "auto");

  // Captura dinámica de datos para WhatsApp
  const handleWhatsAppClick = () => {
    const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value || "Cliente Nuevo";
    const telefono = (document.getElementById('telefono') as HTMLInputElement)?.value || "No especificado";
    
    const phoneNumber = "56929901343"; //
    const baseMessage = `Hola, equipo DOMIS™. Soy ${nombre} (${telefono}). Estoy en la web y necesito Auditoría técnica profesional y generar Estrategia de negociación para una propiedad...`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(baseMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }} 
      className="absolute inset-0 z-10 flex flex-col justify-between px-6 max-w-7xl mx-auto h-screen py-12 lg:py-20 pointer-events-none"
    >
      {/* SECCIÓN SUPERIOR: SELLO TÉCNICO E INFORME */}
      <div className="text-left relative z-10 pointer-events-auto max-w-2xl mt-4 lg:mt-10">
        <div className="space-y-6">
          {/* Identidad de Marca */}
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-base md:text-lg">DOMIS™ | El primer Buyer's Agent técnico de Chile</span>
          </div>

          {/* Desglose del Informe DOMIS™ */}
          <div className="bg-slate-900/40 backdrop-blur-sm p-6 border-l-2 border-[#F59E0B]">
            <h2 className="text-[#F59E0B] font-black text-xl md:text-2xl uppercase tracking-widest mb-4">
              INFORME DOMIS™ |
            </h2>
            <ul className="text-white text-sm md:text-base space-y-3 font-medium">
              <li><span className="text-[#F59E0B] font-black">✓</span> Auditoría PCF-15™ | 0-7 (Validación Senior)</li>
              <li><span className="text-[#F59E0B] font-black">✓</span> Validación Normativa: <span className="text-[#F59E0B]">OGUC, RIDAA y RIC</span></li>
              <li><span className="text-[#F59E0B] font-black">✓</span> Poder de Cierre: 3 escenarios de negociación</li>
              <li><span className="text-[#F59E0B] font-black">✓</span> Estrategia: Descuento directo sobre precio</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: TARJETA DE ACCIÓN COMPACTA */}
      <div className="flex justify-end items-end w-full pb-6 lg:pb-0">
        <div className="bg-slate-950/90 backdrop-blur-xl p-6 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto max-w-sm w-full relative z-20">
          <div className="space-y-4 mb-5">
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
            className="w-full bg-[#F59E0B] hover:bg-[#d98c08] text-slate-950 font-black py-4 rounded-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-2 group text-xs leading-tight"
          >
            ACTIVA TU AUDITORÍA TÉCNICA Y PODER DE NEGOCIACIÓN
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-widest font-bold">
            Ingeniería Civil • Arquitectura • Instalaciones
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- PARTE 2: LOS DATOS (FINAL) ---
export function HeroSpecs({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const x = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, x }} 
      className="absolute inset-0 z-20 flex flex-col justify-center items-end px-6 max-w-7xl mx-auto h-screen pointer-events-none"
    >
      <div className="bg-slate-950/80 backdrop-blur-md p-8 border-l-4 border-[#F59E0B] rounded-r-lg shadow-2xl pointer-events-auto max-w-xl w-full">
        <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter">
          DETALLE <span className="text-[#F59E0B]">PCF-15™</span>
        </h3>
        <div className="space-y-4 text-white text-sm">
          <p>Uso de instrumental de precisión (FLIR, Bosch) para validar diagnósticos técnicos y normativas vigentes.</p>
        </div>
      </div>
    </motion.div>
  );
}