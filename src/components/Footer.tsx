import Section from './layout/Section';

export default function Footer() {
  return (
    // CAMBIO CLAVE: relative z-20 y bg-slate-950 sólido para cortar el wireframe
    <footer className="relative z-20 bg-slate-950 border-t border-white/5 pt-12 md:pt-24 pb-8 md:pb-12 font-sans overflow-hidden">
      
      {/* Capa de textura sutil opcional (puedes comentarla si quieres negro puro) */}
      <div className="absolute inset-0 bg-[url('/wireframe.png')] opacity-[0.02] pointer-events-none"></div>

      <Section className="relative z-10 mb-12 md:mb-20 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-16">
          
          {/* COLUMNA 1: IDENTIDAD DOMIS™ */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col leading-none mb-6 md:mb-8">
              <div className="flex items-start">
                <span className="text-4xl font-black tracking-tighter text-white uppercase">
                  DOMIS
                </span>
                <span className="text-cyan-500 text-xl font-bold ml-1 relative top-[-4px]">
                  ™
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold tracking-[0.4em] text-cyan-500 uppercase mt-2">
                PROPERTY-AUDIT
              </span>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm mb-6 md:mb-8 font-medium">
              Inteligencia técnica para compradores inmobiliarios. Auditamos la realidad física de la propiedad para que negocies con datos, no con promesas.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-mono uppercase tracking-widest font-black border border-white/10 px-4 py-2 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Santiago, Chile
            </div>
          </div>

          {/* COLUMNA 2: NAVEGACIÓN TÉCNICA */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[12px] mb-6 md:mb-8 border-b border-white/10 pb-2 w-fit">
              Navegación
            </h4>
            <ul className="space-y-3 md:space-y-4 text-[13px] md:text-[14px] text-slate-400 font-bold uppercase tracking-tight">
              <li><a href="#problema" className="hover:text-cyan-400 transition-colors flex items-center gap-2">○ El Problema</a></li>
              <li><a href="#fase1" className="hover:text-cyan-400 transition-colors flex items-center gap-2">○ Sourcing (Fase 1)</a></li>
              <li><a href="#fase2" className="hover:text-cyan-400 transition-colors flex items-center gap-2">○ Negociación (Fase 2)</a></li>
              <li><a href="#fase3" className="hover:text-cyan-400 transition-colors flex items-center gap-2">○ Upgrade (Fase 3)</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: BLINDAJE LEGAL */}
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-[12px] mb-6 md:mb-8 border-b border-white/10 pb-2 w-fit">
              Nota Legal
            </h4>
            <p className="text-slate-500 text-[10px] leading-relaxed text-justify uppercase tracking-tight font-medium">
              <strong className="text-slate-400">EXENCIÓN DE RESPONSABILIDAD:</strong> Este informe constituye una opinión profesional basada en métodos de Inspección No Destructiva (NDI). Los valores proyectados son estimaciones para fortalecer la posición comercial y no garantizan viabilidad jurídica ni sustituyen el Estudio de Títulos. El uso de esta información es responsabilidad exclusiva del contratante.
            </p>
          </div>
        </div>
      </Section>

      {/* COPYRIGHT Y CRÉDITOS FINALES */}
      <Section containerClass="border-t border-white/5 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 relative z-10 px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-center md:text-left">
          <p className="text-slate-600 text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
            © 2026 DOMIS™ Auditoría Inmobiliaria.
          </p>
          <span className="hidden md:block text-slate-800">|</span>
          <p className="text-cyan-500/50 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
            Powered by PCF-15™ Engine
          </p>
        </div>
        <p className="text-slate-700 text-[9px] md:text-[10px] font-mono uppercase font-black tracking-[0.3em] hover:text-slate-500 transition-colors cursor-default">
          Developed by OlvaiD™ Tech
        </p>
      </Section>
    </footer>
  );
}