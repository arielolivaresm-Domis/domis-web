import { Search, TrendingUp, Hammer } from 'lucide-react';
import Section from './layout/Section';
import { useTabs } from '../context/TabsContext';

export default function Solution() {
  const { setActiveTab } = useTabs();

  const handlePhaseClick = (phase: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(phase);
    setTimeout(() => {
      const element = document.getElementById('proceso');
      if (element) {
        const yOffset = -140;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Section id="solucion" className="py-12 md:py-24 bg-slate-950 relative z-10">
      
      <div className="relative rounded-none md:rounded-[2.5rem] overflow-hidden border-y md:border border-white/10 shadow-2xl bg-slate-950">
        
        {/* TEXTURA DE FONDO */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

        <div className="relative z-10 p-6 md:p-16">
          
          {/* HEADER */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-black">
                La Solución DOMIS™
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              Cómo Te Ayudamos a <br />
              <span className="text-cyan-400">Ahorrar Millones</span>
            </h2>
          </div>

          {/* GRID DE 3 PASOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* PASO 1 - CLICKEABLE */}
            <button 
              onClick={() => handlePhaseClick('fase1')}
              className="relative bg-slate-900/40 border border-white/5 p-8 md:p-10 rounded-2xl md:rounded-3xl hover:border-cyan-500/30 transition-all duration-500 group cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <Search className="w-7 h-7 text-cyan-400" />
                </div>
                <span className="text-5xl font-black text-slate-800/20 group-hover:text-cyan-500/10 transition-colors">01</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-6 group-hover:text-cyan-400 transition-colors">
                Auditamos Tu Propiedad
              </h3>
              
              <ul className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Visitamos con <strong className="text-white">herramientas profesionales:</strong> cámara térmica, detector de fugas, medidor láser de precisión</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Detectamos <strong className="text-white">fallas ocultas</strong> que pueden costarte millones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span><strong className="text-white">Escaneamos el entorno (3km):</strong> colegios, servicios, plusvalía</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Te mostramos el <strong className="text-white">estado REAL,</strong> no promesas de vendedor</span>
                </li>
              </ul>

              {/* INDICADOR CLICK */}
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Ver Auditoría</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            {/* PASO 2 - CLICKEABLE */}
            <button 
              onClick={() => handlePhaseClick('fase2')}
              className="relative bg-slate-900/40 border border-white/5 p-8 md:p-10 rounded-2xl md:rounded-3xl hover:border-cyan-500/30 transition-all duration-500 group cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <TrendingUp className="w-7 h-7 text-cyan-400" />
                </div>
                <span className="text-5xl font-black text-slate-800/20 group-hover:text-cyan-500/10 transition-colors">02</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-6 group-hover:text-cyan-400 transition-colors">
                Calculamos y Negociamos
              </h3>
              
              <ul className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span><strong className="text-white">Cuantificamos costo de reparaciones</strong> (convertimos fallas a UF)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Consultamos <strong className="text-white">precios reales del mercado y datos oficiales CBR</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Calculamos exactamente <strong className="text-white">cuánto estás pagando de más</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Generamos <strong className="text-white">3 estrategias de negociación</strong> con evidencia técnica</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span><strong className="text-white">Te acompañamos en la mesa:</strong> logras 8-20% descuento (vs 6% promedio del mercado)</span>
                </li>
              </ul>

              {/* INDICADOR CLICK */}
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Ver Negociación</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

            {/* PASO 3 - CLICKEABLE */}
            <button 
              onClick={() => handlePhaseClick('fase3')}
              className="relative bg-slate-900/40 border border-white/5 p-8 md:p-10 rounded-2xl md:rounded-3xl hover:border-cyan-500/30 transition-all duration-500 group cursor-pointer text-left"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all">
                  <Hammer className="w-7 h-7 text-cyan-400" />
                </div>
                <span className="text-5xl font-black text-slate-800/20 group-hover:text-cyan-500/10 transition-colors">03</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-6 group-hover:text-cyan-400 transition-colors">
                Hacemos Realidad Tu Proyecto
              </h3>
              
              <ul className="space-y-4 text-slate-300 text-sm md:text-base leading-relaxed">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span><strong className="text-white">Convertimos tus ideas</strong> en el hogar que imaginaste</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Corregimos las <strong className="text-white">fallas detectadas en la auditoría</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span><strong className="text-white">Estándar y materiales de alta calidad</strong> a precio justo</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span>Entregamos tu propiedad <strong className="text-white">lista para habitar y disfrutar</strong></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <span><strong className="text-white">Valorizas tu inversión</strong> desde el día uno</span>
                </li>
              </ul>

              {/* INDICADOR CLICK */}
              <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Ver Remodelación</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </button>

          </div>

          {/* MARCA TÉCNICA - IZQUIERDA ABAJO */}
          <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
            <div className="text-left">
              <p className="text-slate-500 text-xs md:text-sm font-bold uppercase tracking-tight">
                DOMIS™ | El primer Buyer's Agent técnico de Chile
              </p>
            </div>
            
            <a 
              href="#casos-reales"
              className="group px-6 md:px-8 py-3 md:py-4 bg-cyan-500 hover:bg-white text-slate-950 font-black rounded-xl uppercase tracking-widest text-xs md:text-sm transition-all shadow-lg flex items-center gap-3"
            >
              Ver Casos Reales
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

        </div>
      </div>
    </Section>
  );
}