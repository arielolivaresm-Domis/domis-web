import { Zap, Droplets, HardHat, Flame, Layout, Globe } from 'lucide-react';

const technicalModules = [
  {
    id: "01",
    title: "Infraestructura Eléctrica",
    desc: "Termografía infrarroja de tableros y funcionamiento eléctrico bajo normativa SEC.",
    instrument: "Cámara Térmica / Multímetro",
    icon: <Zap className="w-6 h-6 text-cyan-500" />
  },
  {
    id: "02",
    title: "Integridad Hidráulica",
    desc: "Escaneo de humedad no visible (Higrometría) y auditoría de sellos sanitarios.",
    instrument: "Higrómetro Digital",
    icon: <Droplets className="w-6 h-6 text-cyan-500" />
  },
  {
    id: "03",
    title: "Patologías Estructurales",
    desc: "Verificación de niveles de piso, desplomes de muros y mapeo técnico de grietas.",
    instrument: "Nivel Láser 360°",
    icon: <HardHat className="w-6 h-6 text-cyan-500" />
  },
  {
    id: "04",
    title: "Sistemas de Clima & Gas",
    desc: "Análisis de combustión y detección de fugas críticas con sensor ultrasónico.",
    instrument: "Detector Gas / Analizador",
    icon: <Flame className="w-6 h-6 text-cyan-500" />
  },
  {
    id: "05",
    title: "Envolvente & Terminaciones",
    desc: "Auditoría de puentes térmicos, sellos de expansión y quincallería técnica de alto tráfico.",
    instrument: "Scanner Térmico",
    icon: <Layout className="w-6 h-6 text-cyan-500" />
  },
  {
    id: "06",
    title: "Escaneo de Entorno (3km)",
    desc: "Data de plusvalía, proyectos urbanos futuros y riesgos de conectividad/seguridad.",
    instrument: "Big Data / Urbanismo",
    icon: <Globe className="w-6 h-6 text-cyan-500" />
  }
];

export default function AuditTechnicalDetails() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden border-t border-slate-900">
      {/* Fondo de Grilla Técnica - Error de 'size' corregido aquí */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(#22d3ee 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4">
              Protocolo de <span className="text-cyan-500">Auditoría PCF-15™</span>
            </h2>
            <p className="text-slate-400 text-lg font-medium leading-relaxed">
              Superamos la simple inspección visual. Aplicamos instrumentación avanzada para detectar fallas que el ojo humano no puede ver.
            </p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
            <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.2em] font-bold animate-pulse">
              ● Escaneo Activo: Sistema Operativo
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalModules.map((module) => (
            <div 
              key={module.id}
              className="group relative bg-slate-900/40 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)]"
            >
              <span className="absolute top-4 right-8 text-6xl font-black text-slate-800/20 group-hover:text-cyan-500/10 transition-colors duration-500 select-none">
                {module.id}
              </span>

              <div className="relative z-10">
                <div className="mb-6 p-3 bg-slate-950 w-fit rounded-2xl border border-slate-800 group-hover:border-cyan-500/30 transition-colors">
                  {module.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">
                  {module.title}
                </h3>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-8 h-auto md:h-12">
                  {module.desc}
                </p>

                <div className="flex items-center gap-2 mt-4">
                  <div className="h-[1px] flex-1 bg-slate-800"></div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold bg-cyan-950/40 px-3 py-1 rounded-md border border-cyan-500/20 shadow-sm">
                    {module.instrument}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}