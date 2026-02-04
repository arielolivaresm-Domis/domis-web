import { Zap, Droplets, HardHat, Flame, Layout, Globe } from 'lucide-react';

const technicalModules = [
  {
    id: "01",
    title: "Infraestructura Eléctrica",
    desc: "Termografía infrarroja de tableros y funcionamiento eléctrico bajo normativa SEC.",
    instrument: "Cámara Térmica / Multímetro",
    icon: <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
  },
  {
    id: "02",
    title: "Integridad Hidráulica",
    desc: "Escaneo de humedad no visible (Higrometría) y auditoría de sellos sanitarios.",
    instrument: "Higrómetro Digital",
    icon: <Droplets className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
  },
  {
    id: "03",
    title: "Patologías Estructurales",
    desc: "Verificación de niveles de piso, desplomes de muros y mapeo técnico de grietas.",
    instrument: "Nivel Láser 360°",
    icon: <HardHat className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
  },
  {
    id: "04",
    title: "Sistemas de Clima & Gas",
    desc: "Análisis de combustión y detección de fugas críticas con sensor ultrasónico.",
    instrument: "Detector Gas / Analizador",
    icon: <Flame className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
  },
  {
    id: "05",
    title: "Envolvente & Terminaciones",
    desc: "Auditoría de puentes térmicos, sellos de expansión y quincallería técnica de alto tráfico.",
    instrument: "Scanner Térmico",
    icon: <Layout className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
  },
  {
    id: "06",
    title: "Escaneo de Entorno (3km)",
    desc: "Data de plusvalía, proyectos urbanos futuros y riesgos de conectividad/seguridad.",
    instrument: "Big Data / Urbanismo",
    icon: <Globe className="w-5 h-5 md:w-6 md:h-6 text-cyan-500" />
  }
];

export default function AuditTechnicalDetails() {
  return (
    <section className="py-12 md:py-20 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* LA ISLA TÉCNICA (Mismo estilo que Sourcing) */}
        <div className="bg-slate-950 border border-white/5 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
          
          {/* SILUETA DEL LOGO (wireframe.png) */}
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

          <div className="p-8 md:p-16 relative z-10">
            
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
              <div className="max-w-2xl text-left">
                <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">
                  Protocolo de <span className="text-cyan-500">Auditoría PCF-15™</span>
                </h2>
                <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed">
                  Superamos la inspección visual. <span className="text-white">Escaneo activo</span> con instrumentación avanzada.
                </p>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 md:p-4 rounded-xl hidden md:block">
                <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.2em] font-bold animate-pulse">
                  ● Sistema Operativo Activo
                </p>
              </div>
            </div>

            {/* GRID DE MÓDULOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {technicalModules.map((module) => (
                <div 
                  key={module.id}
                  className="group relative flex flex-col bg-slate-900/40 border border-white/5 p-8 rounded-3xl hover:border-cyan-500/30 transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="shrink-0 p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-cyan-400/30 transition-colors">
                      {module.icon}
                    </div>
                    <span className="text-5xl font-black text-slate-800/20 group-hover:text-cyan-500/10 transition-colors select-none">
                      {module.id}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 md:h-12">
                      {module.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-slate-800/50 mt-auto">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-black bg-cyan-950/40 px-3 py-1 rounded border border-cyan-500/20">
                      {module.instrument}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}