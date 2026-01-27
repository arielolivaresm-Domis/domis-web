export default function Hero() {
  return (
    <section className="bg-slate-950 pt-32 pb-20 px-6 border-b border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="text-left relative z-10">
          
          {/* TÍTULO PRINCIPAL */}
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8 uppercase tracking-tighter">
            NO COMPRES <br />
            <span className="text-white">PROMESAS.</span> <br />
            <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]">COMPRA DATOS.</span>
          </h1>
          
          {/* SUBTÍTULO Y PROPUESTA DE VALOR */}
          <div className="space-y-6 mb-8">
            <div className="text-slate-200 text-xl font-bold leading-tight">
              <p className="mb-2">
                Detectamos vicios y defectos ocultos <span className="text-white underline decoration-cyan-500/30">antes</span> de que compres.
              </p>
              <div className="flex items-center gap-2">
                <span className="text-white">DOMIS<span className="text-cyan-500 text-xs relative -top-2 ml-0.5">™</span></span>
                <span className="text-slate-600">|</span>
                <span className="text-cyan-400 text-sm tracking-[0.2em] font-black uppercase">El primer Buyer's Agent técnico de Chile</span>
              </div>
            </div>
            
            {/* --- CAMBIO REALIZADO AQUÍ --- */}
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Auditoría técnica profesional de <span className="text-white font-bold decoration-cyan-500 underline decoration-2 underline-offset-4">casas y departamentos</span>
              <br className="hidden md:block"/>
              + Estrategia de negociación basada en datos reales.
            </p>
            {/* --------------------------- */}
          </div>

          {/* BARRA DE ALCANCE (MANTENEMOS ESTO PARA TERRENOS/LOCALES) */}
          <div className="py-5 border-y border-slate-900 mb-8">
             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                <span className="w-1 h-1 bg-cyan-500 rounded-full animate-pulse"></span>
                Cobertura de Inspección Certificada:
             </p>
             <div className="flex flex-wrap gap-3">
                {/* Casas */}
                <span className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-bold flex items-center gap-2 hover:border-slate-600 transition-colors cursor-default">
                   🏠 Casas
                </span>
                {/* Deptos */}
                <span className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 font-bold flex items-center gap-2 hover:border-slate-600 transition-colors cursor-default">
                   🏢 Deptos
                </span>
                {/* Terrenos */}
                <span className="px-3 py-2 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs text-cyan-400 font-bold flex items-center gap-2 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all cursor-default shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                   🏗️ Terrenos
                </span>
                {/* Locales */}
                <span className="px-3 py-2 bg-cyan-950/30 border border-cyan-500/30 rounded-lg text-xs text-cyan-400 font-bold flex items-center gap-2 hover:bg-cyan-900/50 hover:border-cyan-400 transition-all cursor-default shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                   🏪 Locales & Oficinas
                </span>
             </div>
          </div>

          {/* CHECKLIST DE SERVICIOS */}
          <div className="space-y-3 mb-10">
            {/* ITEM 1: PCF-15 */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p>
                <span className="font-bold">
                  Auditoría PCF-15<span className="text-cyan-500 text-[10px] relative -top-1.5 ml-0.5">™</span>:
                </span> Scoring técnico 0-7 | Entrega máxima 3 días
              </p>
            </div>

            {/* ITEM 2: Escaneo */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p><span className="font-bold">Escaneo del entorno:</span> Radio de 3km a la redonda</p>
            </div>

            {/* ITEM 3: Inversión */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p><span className="font-bold">Inversión:</span> Desde $190.000 (cobro mínimo ref. 100m²)</p>
            </div>

            {/* ITEM 4: Negociación */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p><span className="font-bold">Poder de Cierre:</span> 3 propuestas de negociación con datos duros</p>
            </div>

            {/* ITEM 5: Remodelación */}
            <div className="flex items-center gap-3 text-white text-sm">
              <span className="text-cyan-400 font-black">✓</span>
              <p><span className="font-bold">Fase Final:</span> Remodelación estratégica de la propiedad</p>
            </div>
          </div>
        </div>

        {/* FRAME TÉCNICO */}
        <div className="engineering-frame aspect-square">
          <div className="animate-scan"></div>
          <img 
            src="/hero-house.jpg" 
            alt="DOMIS™ Property-Audit" 
            className="w-full h-full object-cover opacity-80" 
          />
        </div>
      </div>
    </section>
  );
}