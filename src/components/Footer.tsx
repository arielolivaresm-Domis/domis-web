export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-20 pb-10 px-6 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        
        {/* COLUMNA 1: MARCA (LOGO TIPOGRÁFICO DEFINITIVO) */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col leading-none mb-6">
            <div className="flex items-start">
              <span className="text-3xl font-black tracking-tighter text-white uppercase">
                DOMIS
              </span>
              {/* TM: Estandarizado con el Header (top-[-4px]) para coherencia total */}
              <span className="text-cyan-500 text-lg font-bold ml-1 relative top-[-4px]">
                ™
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-cyan-500 uppercase mt-2">
              PROPERTY-AUDIT
            </span>
          </div>
          
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
            Inteligencia técnica para compradores inmobiliarios. Auditamos la realidad física de la propiedad para que negocies con datos, no con promesas.
          </p>
          <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">
            Santiago, Chile
          </div>
        </div>

        {/* COLUMNA 2: ACCESOS */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Navegación</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="#problema" className="hover:text-cyan-400 transition-colors">El Problema</a></li>
            <li><a href="#auditoria" className="hover:text-cyan-400 transition-colors">Auditoría (Fase 1)</a></li>
            <li><a href="#negociacion" className="hover:text-cyan-400 transition-colors">Negociación (Fase 2)</a></li>
            <li><a href="#remodelacion" className="hover:text-cyan-400 transition-colors">Remodelación (Fase 3)</a></li>
          </ul>
        </div>

        {/* COLUMNA 3: LEGAL (ACTUALIZADA CON BLINDAJE SENIOR) */}
        <div>
          <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6">Nota Legal</h4>
          <p className="text-slate-500 text-[9px] leading-relaxed text-justify uppercase tracking-tight">
            <strong className="text-slate-400">EXENCIÓN DE RESPONSABILIDAD TÉCNICA Y LEGAL:</strong> Este informe constituye una opinión profesional basada exclusivamente en métodos de Inspección No Destructiva (NDI) e inspección visual. Los valores proyectados en la Fase 2 (Negociación) son estimaciones técnicas destinadas a fortalecer la posición comercial del cliente y no representan un presupuesto final de ejecución o remodelación, los cuales requieren estudios invasivos y de ingeniería adicionales. Este documento no garantiza la viabilidad jurídica de la compra ni sustituye el Estudio de Títulos realizado por abogados. El uso de esta información para decisiones transaccionales es responsabilidad exclusiva del contratante.
          </p>
        </div>
      </div>

      {/* COPYRIGHT Y CRÉDITOS */}
      <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 text-xs">
          © 2026 DOMIS™ Auditoría Inmobiliaria. Powered by PCF-15 Engine.
        </p>
        <p className="text-slate-700 text-[10px] font-mono uppercase">
          Developed by ARAX™ Tech
        </p>
      </div>
    </footer>
  );
}