"use client";
import { motion, useTransform, MotionValue } from "framer-motion";

// --- HOJA 1: EL GANCHO DE NEGOCIOS (ENTRADA) ---
export function HeroHook({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Animación: Se desvanece al iniciar el scroll
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const pointerEvents = useTransform(scrollYProgress, (v) => v > 0.2 ? "none" : "auto");

  // Captura dinámica de datos para WhatsApp corporativo
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
      className="absolute inset-0 z-10 flex flex-col justify-between px-6 max-w-7xl mx-auto h-screen py-16 md:py-24 pointer-events-none"
    >
      {/* CONTENIDO SUPERIOR: HOJA 1 */}
      <div className="text-left relative z-10 pointer-events-auto max-w-4xl mt-8 md:mt-12">
        <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
          NO COMPRES <br />
          <span className="text-white">PROMESAS.</span> <br />
          <span className="text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]">COMPRA DATOS.</span>
        </h1>
        
        <div className="mb-10">
          <p className="text-4xl md:text-6xl font-black text-[#F59E0B] leading-none mb-6 uppercase italic tracking-tight">
            AHORRA MILLONES
          </p>
          <p className="text-slate-200 text-xl md:text-3xl font-medium max-w-2xl leading-relaxed">
            en tu inversión con nuestro sistema de Auditoría Técnica y Estrategia de Negociación.
          </p>
        </div>
      </div>

      {/* TARJETA DE ACCIÓN (CAPTURA DE LEADS) */}
      <div className="flex justify-end items-end w-full pb-8">
        <div className="bg-slate-950/90 backdrop-blur-xl p-8 border border-white/10 rounded-2xl shadow-2xl pointer-events-auto max-w-sm w-full relative z-20">
          <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">COTIZA TU ESTRATEGIA</h3>
          <p className="text-slate-400 text-sm mb-6 font-medium">Déjanos tus datos para auditar y negociar por ti.</p>
          
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
            className="w-full bg-[#F59E0B] hover:bg-[#d98c08] text-slate-950 font-black py-4 rounded-xl uppercase tracking-tighter transition-all flex items-center justify-center gap-2 group text-xs md:text-[13px] leading-tight"
          >
            ACTIVA TU AUDITORÍA TÉCNICA Y PODER DE NEGOCIACIÓN
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
          <p className="text-[10px] text-slate-500 mt-4 text-center uppercase tracking-widest font-bold">
            Ingeniería • Arquitectura • Negociación
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// --- HOJA 2: EL INFORME TÉCNICO (DETALLE TRAS SCROLL) ---
export function HeroSpecs({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Aparece cuando el scroll está avanzado (70% al 90%)
  const opacity = useTransform(scrollYProgress, [0.7, 0.9], [0, 1]);
  const x = useTransform(scrollYProgress, [0.7, 0.9], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, x }} 
      className="absolute inset-0 z-20 flex flex-col justify-center items-end px-6 max-w-7xl mx-auto h-screen pointer-events-none"
    >
      <div className="bg-slate-950/90 backdrop-blur-md p-8 md:p-10 border-l-4 border-[#F59E0B] rounded-r-lg shadow-2xl pointer-events-auto max-w-xl w-full">
        <div className="mb-6">
          <p className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-2">
            DOMIS™ | El primer Buyer's Agent técnico de Chile
          </p>
          <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
            INFORME <span className="text-[#F59E0B]">Domis™</span>
          </h3>
        </div>

        <div className="space-y-5 text-white text-base md:text-lg">
          <div className="flex items-start gap-3">
            <span className="text-[#F59E0B] font-black">✓</span>
            <p><span className="font-bold">Auditoría PCF-15™:</span> Scoring técnico profesional | 0-7</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#F59E0B] font-black">✓</span>
            <p><span className="font-bold">Validación Normativa:</span> Cumplimiento estricto OGUC, RIDAA y RIC</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#F59E0B] font-black">✓</span>
            <p><span className="font-bold">Poder de Cierre:</span> 3 escenarios de negociación técnica avanzada</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[#F59E0B] font-black">✓</span>
            <p><span className="font-bold">Estrategia:</span> Descuento directo sobre el precio de venta final</p>
          </div>
        </div>

        <button className="mt-10 w-full border-2 border-[#F59E0B] text-[#F59E0B] hover:bg-[#F59E0B] hover:text-slate-950 font-black py-4 uppercase tracking-[0.2em] transition-all text-sm">
          Ver detalle técnico
        </button>
      </div>
    </motion.div>
  );
}