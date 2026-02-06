"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

// --- PARTE 1: EL GANCHO CON INFORME INTEGRADO (INICIO) ---
export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.2 ? "none" : "auto");

  // FUNCIÓN PARA ENVIAR DATOS DINÁMICOS A WHATSAPP
  const handleWhatsAppClick = () => {
    const nombre = (document.getElementById('nombre') as HTMLInputElement)?.value || "Cliente Nuevo";
    const telefono = (document.getElementById('telefono') as HTMLInputElement)?.value || "No especificado";
    
    const phoneNumber = "56929901343";
    const baseMessage = `Hola, equipo DOMIS™. Soy ${nombre} (${telefono}). Estoy en la web y necesito Auditoría técnica profesional y generar Estrategia de negociación para una propiedad...`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(baseMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div 
      style={{ opacity, y, pointerEvents }} 
      className="absolute inset-0 z-10 flex flex-col lg:flex-row justify-between px-6 max-w-7xl mx-auto min-h-screen py-10 lg:py-20 pointer-events-none"
    >
      {/* COLUMNA IZQUIERDA: IMPACTO Y DATOS TÉCNICOS */}
      <div className="text-left relative z-10 pointer-events-auto max-w-2xl mt-5 lg:mt-10 self-start">
        <h1 className="text-4xl md:text-7xl font-black text-white leading-tight mb-4 uppercase tracking-tighter">
          NO COMPRES <br />
          <span className="text-white">PROMESAS.</span> <br />
          <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">COMPRA DATOS.</span>
        </h1>
        
        <div className="mb-6">
          <p className="text-3xl md:text-5xl font-black text-[#F59E0B] leading-none mb-4 uppercase italic">
            AHORRA MILLONES
          </p>
          
          {/* NUEVO: BLOQUE TÉCNICO INTEGRADO EN EL HERO */}
          <div className="bg-slate-900/40 backdrop-blur-sm p-5 border-l-2 border-[#F59E0B] mt-6 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-white font-bold text-sm">DOMIS™ | El primer Buyer's Agent técnico de Chile</span>
            </div>
            <h3 className="text-[#F59E0B] font-black text-lg uppercase tracking-widest">INFORME DOMIS™</h3>
            <ul className="text-slate-300 text-sm md:text-base space-y-2 font-medium">
              <li><span className="text-[#F59E0B]">✓</span> Auditoría PCF-15™ | Scoring 0-7 (FLIR/Bosch)</li>
              <li><span className="text-[#F59E0B]">✓</span> Validación Normativa: OGUC, RIDAA y RIC</li>
              <li><span className="text-[#F59E0B]">✓</span> Poder de Cierre: 3 escenarios de negociación</li>
              <li><span className="text-[#F59E0B]">✓</span> Estrategia: Descuento directo sobre precio</li>
            </ul>
          </div>
        </div>
      </div>

      {/* COLUMNA DERECHA: CAPTURA DE LEADS (POSICIÓN OPTIMIZADA) */}
      <div className="flex justify-center lg:justify-end items-end w-full lg:max-w-md pb-10 lg:pb-0">
        <div className="bg-slate-950/90 backdrop-blur-xl p-6 md:p-8 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto w-full relative z-20">
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">
            COTIZA TU ESTRATEGIA
          </h3>
          <p className="text-slate-400 text-sm mb-6">
            Ingeniería aplicada para que pagues lo justo.
          </p>
          
          <div className="space-y-4 mb-6">
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
            className="w-full bg-[#F59E0B] hover:bg-[#d98c08] text-slate-950 font-black py-4 rounded-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-2 group text-xs md:text-sm leading-tight"
          >
            ACTIVA TU AUDITORÍA TÉCNICA Y PODER DE NEGOCIACIÓN
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-widest">
            Validación Senior • OGUC • RIDAA • RIC
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- PARTE 2: LOS DATOS PROFUNDOS (MANTENIDO PARA EL SCROLL) ---
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
          <p>Uso de instrumental de precisión (FLIR, Bosch) para validar diagnósticos técnicos y citar normativas chilenas vigentes.</p>
        </div>
      </div>
    </motion.div>
  );
}