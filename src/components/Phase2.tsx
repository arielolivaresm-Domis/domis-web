import { Handshake, FileCheck, TrendingDown, Database } from 'lucide-react';

/**
 * COMPONENTE FASE 2: NEGOCIACIÓN TÉCNICA
 * Mantiene la estructura original de "Tarjeta de Impacto" pero con narrativa de Big Data.
 */
export default function Phase2({ onNext }: { onNext: () => void }) {
  return (
    <section className="relative">
      
      {/* CONTENEDOR PRINCIPAL: Estructura original intacta */}
      <div 
        onClick={() => onNext()}
        className="relative h-[400px] md:h-[510px] rounded-3xl overflow-hidden border-2 border-slate-800 group transition-all duration-500 hover:border-cyan-500/50 shadow-2xl shadow-slate-950/50 cursor-pointer"
      >
        
        {/* IMAGEN: Se mantiene tu asset original */}
        <img 
          src="/DOMIS_Final_Optimized.webp" 
          alt="Negociación Técnica DOMIS" 
          className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-1000 filter saturate-[0.8] brightness-[0.7]" 
          loading="eager"
        />

        {/* OVERLAY TÉCNICO Y WIREFRAME */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-cyan-900/20 opacity-95"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.08] bg-repeat pointer-events-none mix-blend-overlay"></div>

        {/* CONTENIDO: Actualizado con Metodología PCF-15 + CBR */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 text-left">
          
          {/* Badge: Enfoque en Inteligencia de Mercado */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 rounded-full mb-6 w-fit backdrop-blur-md">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest font-black">
              Big Data • Matriz de 3 Ofertas
            </span>
          </div>

          {/* Título: Ingeniería de Precios */}
          <h3 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg leading-tight">
            Estrategia de Cierre <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">
              Data-Driven
            </span>
          </h3>

          {/* Descripción: Fusión PCF-15, Remodelación y CBR */}
          <p className="text-slate-300 text-sm md:text-base max-w-2xl leading-relaxed mb-8 drop-shadow-md font-medium">
            Vinculamos el **Presupuesto Técnico PCF-15™** (Inversión necesaria para sincerar el valor) con transacciones reales del **CBR** y algoritmos de IA. Definimos **3 escenarios de oferta** para que negocies con evidencia irrefutable y soporte experto hasta la firma final.
          </p>
          
          {/* Indicadores de Valor: Soporte y Metodología */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-white/90">
               <TrendingDown className="w-4 h-4 text-cyan-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">Ajuste técnico pro-negociación</span>
            </div>
            <div className="flex items-center gap-3 text-white/90">
               <FileCheck className="w-4 h-4 text-cyan-500" />
               <span className="text-[10px] font-black uppercase tracking-widest">Soporte continuo (Comprador/Vendedor)</span>
            </div>
          </div>

        </div>

        {/* Esquinas Tecnológicas */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg"></div>
      </div>

      {/* Sombra de apoyo inferior */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

    </section>
  );
}