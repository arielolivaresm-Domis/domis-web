export default function Phase3() {
  const features = [
    {
      icon: "🏗️",
      title: "Soporte en Licitación",
      desc: "Especificaciones técnicas para cotizar con constructoras. Compara peras con peras."
    },
    {
      icon: "📋",
      title: "Gestión de Obra (ITO)",
      desc: "Supervisión técnica independiente para asegurar que se construye lo proyectado."
    }
  ];

  return (
    <section className="py-12 animate-fadeIn">
      {/* CONTENEDOR PRINCIPAL CON IMAGEN DE FONDO */}
      <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-slate-800 shadow-2xl min-h-[600px] flex items-center">
        
        {/* LA NUEVA IMAGEN DE FONDO */}
        <div className="absolute inset-0">
          <img 
            src="/DOMIS_phase3_remodel.webp" 
            alt="Supervisión técnica de remodelación" 
            className="w-full h-full object-cover grayscale-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/95 to-slate-950/80"></div>
        </div>

        {/* CONTENIDO ORIGINAL SIN CAMBIOS DE TEXTO */}
        <div className="relative z-10 p-8 md:p-16 max-w-4xl">
          <div className="inline-block px-6 py-3 rounded-full border-2 border-cyan-500 bg-cyan-500/10 text-cyan-400 text-xs font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            Fase 3: Ejecución Técnica
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
            TRANSFORMACIÓN <br />
            <span className="text-cyan-400">DOMIS UPGRADE</span>
          </h2>

          <p className="text-slate-300 text-lg leading-relaxed mb-12 max-w-2xl">
            No solo diseñamos, blindamos la ejecución. Tu proyecto de remodelación supervisado bajo estándares de ingeniería para evitar sobrecostos y errores constructivos.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((item, idx) => (
              <div key={idx} className="bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 hover:border-cyan-500/50 transition-all group">
                <span className="text-5xl mb-6 block group-hover:scale-110 transition-transform">{item.icon}</span>
                <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
             <a 
              href="https://wa.me/56982348089?text=Hola,%20me%20interesa%20la%20Fase%203%20(Remodelación)%20para%20mi%20proyecto."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase rounded-xl transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              Cotizar Supervisión de Obra
              <span className="text-xl">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}