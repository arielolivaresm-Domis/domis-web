import Section from './layout/Section';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 font-sans">
      <Section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* COLUMNA 1: MARCA DOMIS™ */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex flex-col leading-none mb-6">
              <div className="flex items-start">
                <span className="text-3xl font-black tracking-tighter text-white uppercase">
                  DOMIS
                </span>
                <span className="text-cyan-500 text-lg font-bold ml-1 relative top-[-4px]">
                  ™
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-cyan-500 uppercase mt-2">
                PROPERTY-AUDIT
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6 font-medium">
              Inteligencia técnica para compradores inmobiliarios. Auditamos la realidad física de la propiedad para que negocies con datos, no con promesas.
            </p>
            <div className="text-xs text-slate-500 font-mono uppercase tracking-widest font-black">
              Santiago, Chile
            </div>
          </div>

          {/* COLUMNA 2: ACCESOS (NAVEGACIÓN) */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-6">Navegación</h4>
            <ul className="space-y-4 text-[13px] text-slate-400 font-bold uppercase tracking-tight">
              <li><a href="#problema" className="hover:text-cyan-400 transition-colors">El Problema</a></li>
              <li><a href="#fase1" className="hover:text-cyan-400 transition-colors">Sourcing (Fase 1)</a></li>
              <li><a href="#fase2" className="hover:text-cyan-400 transition-colors">Negociación (Fase 2)</a></li>
              <li><a href="#fase3" className="hover:text-cyan-400 transition-colors">Upgrade (Fase 3)</a></li>
            </ul>
          </div>

          {/* COLUMNA 3: NOTA LEGAL (BLINDAJE SENIOR) */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-[11px] mb-6">Nota Legal</h4>
            <p className="text-slate-500 text-[9px] leading-relaxed text-justify uppercase tracking-tight font-medium">
              <strong className="text-slate-400">EXENCIÓN DE RESPONSABILIDAD:</strong> Este informe constituye una opinión profesional basada en métodos de Inspección No Destructiva (NDI). Los valores proyectados son estimaciones para fortalecer la posición comercial y no garantizan viabilidad jurídica ni sustituyen el Estudio de Títulos.
            </p>
          </div>
        </div>
      </Section>

      {/* COPYRIGHT Y CRÉDITOS FINALES */}
      <Section containerClass="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          © 2026 DOMIS™ Auditoría Inmobiliaria. Powered by PCF-15™ Engine.
        </p>
        <p className="text-slate-700 text-[10px] font-mono uppercase font-black">
          Developed by ARAX™ Tech
        </p>
      </Section>
    </footer>
  );
}