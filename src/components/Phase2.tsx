import { Handshake, FileCheck, TrendingDown } from 'lucide-react';
import Section from './layout/Section';

/**
 * COMPONENTE FASE 2: NEGOCIACIÓN TÉCNICA
 * Integrado con Molde Maestro para anchos de precisión.
 */
export default function Phase2({ onNext }: { onNext: () => void }) {
  return (
    <Section id="estrategia-cierre" className="py-12 md:py-24">
      
      {/* CONTENEDOR TIPO CARD - INTEGRADO */}
      <div 
        onClick={() => onNext()}
        className="relative h-[450px] md:h-[550px] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border-2 border-slate-800 group transition-all duration-500 hover:border-cyan-500/50 shadow-2xl shadow-slate-950/50 cursor-pointer"
      >
        
        {/* IMAGEN DE FONDO CON EFECTO ZOOM */}
        <img 
          src="/DOMIS_Final_Optimized.webp" 
          alt="Negociación Técnica DOMIS" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 filter saturate-[0.8] brightness-[0.7]" 
          loading="eager"
        />

        {/* OVERLAY TÉCNICO Y GRADIENTES */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-cyan-900/20 opacity-95"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.08] bg-repeat pointer-events-none mix-blend-overlay"></div>

        {/* CONTENIDO INTERNO */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 text-left">
          
          {/* Badge: Inteligencia de Mercado */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full mb-6 w-fit backdrop-blur-md">
            <Handshake className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[9px] md:text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-black">
              Big Data • Matriz de 3 Ofertas
            </span>
          </div>

          {/* Título: Estrategia Data-Driven */}
          <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg leading-tight">
            Estrategia de Cierre <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              Data-Driven
            </span>
          </h3>

          {/* Descripción Técnica */}
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed mb-8 drop-shadow-md font-medium">
            Vinculamos el Presupuesto Técnico <span className="text-white font-bold italic">PCF-15™</span> con transacciones reales del CBR y algoritmos de IA. Definimos 3 escenarios de oferta para que negocies con evidencia irrefutable y soporte experto.
          </p>
          
          {/* Indicadores de Valor */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-white/90">
               <TrendingDown className="w-4 h-4 text-cyan-500 shrink-0" />
               <span className="text-[10px] font-black uppercase tracking-widest">Ajuste técnico pro-negociación</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
               <FileCheck className="w-4 h-4 text-cyan-500 shrink-0" />
               <span className="text-[10px] font-black uppercase tracking-widest">Soporte continuo (CBR / Notaría)</span>
            </div>
          </div>
        </div>

        {/* Esquinas Tecnológicas de Marca */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-[2rem]"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/50 rounded-br-[2rem]"></div>
      </div>

      {/* Sombra de apoyo (Efecto de Profundidad) */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

    </Section>
  );
}