import { useState } from 'react';
import { ShieldCheck, TrendingUp, BadgeCheck, CheckCircle2, MapPin, ArrowRight } from 'lucide-react';

export default function PhasesTabs() {
  const [activeTab, setActiveTab] = useState(1);

  const phases = [
    {
      id: 1,
      title: "Auditoría Técnica",
      subtitle: "Protocolo de Doble Entrada",
      icon: <ShieldCheck className={activeTab === 1 ? "text-slate-950" : "text-cyan-500"} />,
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-slate-400 text-sm mb-8 leading-relaxed uppercase tracking-widest font-bold">
            Punto de inicio obligatorio: Aseguramos la viabilidad del activo antes de cualquier compromiso financiero.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RUTA A */}
            <div className="group relative bg-slate-950/40 border border-white/10 p-6 rounded-3xl hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400">
                  <CheckCircle2 size={20} />
                </div>
                <h4 className="text-white font-black text-xs uppercase tracking-tighter">Ruta A: Auditoría Directa</h4>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-black mb-4 leading-relaxed">
                ¿Ya elegiste una propiedad? <br/>
                <span className="text-white">Aplicamos el protocolo PCF-15™ para detectar vicios ocultos y determinar el valor técnico real.</span>
              </p>
              <div className="text-[9px] text-cyan-500/70 font-bold uppercase tracking-widest">Foco: Seguridad Estructural y Redes</div>
            </div>

            {/* RUTA B */}
            <div className="group relative bg-slate-950/40 border border-white/10 p-6 rounded-3xl hover:border-cyan-500/50 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400">
                  <MapPin size={20} />
                </div>
                <h4 className="text-white font-black text-xs uppercase tracking-tighter">Ruta B: Sourcing Estratégico</h4>
              </div>
              <p className="text-[10px] text-slate-400 uppercase font-black mb-4 leading-relaxed">
                ¿No tienes propiedad aún? <br/>
                <span className="text-white">Activamos el Modo Búsqueda. Filtramos el mercado bajo criterios de rentabilidad e ingeniería.</span>
              </p>
              <div className="text-[9px] text-cyan-500/70 font-bold uppercase tracking-widest">Foco: Oportunidad y Viabilidad</div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-widest">
              <BadgeCheck size={16} />
              Hito: Certificado de Viabilidad Técnica
            </div>
            <ArrowRight size={16} className="text-slate-600" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Negociación Estratégica",
      subtitle: "Inversión por Éxito",
      icon: <TrendingUp className={activeTab === 2 ? "text-slate-950" : "text-cyan-500"} />,
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">
            Utilizamos la data obtenida en la auditoría para ejecutar una negociación técnica de alto impacto. 
          </p>
          <ul className="space-y-4">
            {[
              "Estructura de cobro 10% sobre ahorro logrado",
              "Abonos iniciales descontables del honorario final",
              "Garantía de monitoreo de ROL por 120 días"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-white font-bold text-xs uppercase tracking-widest">
                <div className="mt-1 w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "Cierre y Post-Venta",
      subtitle: "Protección Contractual",
      icon: <BadgeCheck className={activeTab === 3 ? "text-slate-950" : "text-cyan-500"} />,
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-4">
          <p className="text-slate-300 text-sm mb-6 uppercase tracking-widest font-bold">
            Acompañamiento hasta la entrega de llaves y revisión de reparaciones exigidas.
          </p>
          <div className="inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em]">
            Protocolo de Escrituración Segura
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-24 bg-slate-950 font-sans">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">Cómo Funciona <span className="text-cyan-500">DOMIS™</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* TABS SELECTOR */}
          <div className="lg:col-span-4 space-y-4">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActiveTab(phase.id)}
                className={`w-full flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-300 border-2 text-left group ${
                  activeTab === phase.id 
                  ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_30px_rgba(34,211,238,0.3)]' 
                  : 'bg-slate-900 border-slate-800 hover:border-cyan-500/30'
                }`}
              >
                <div className={`p-3 rounded-2xl transition-colors ${
                  activeTab === phase.id ? 'bg-slate-950' : 'bg-slate-950 border border-slate-800'
                }`}>
                  {phase.icon}
                </div>
                <div>
                  <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                    activeTab === phase.id ? 'text-slate-900 opacity-70' : 'text-cyan-500'
                  }`}>Fase {phase.id}</div>
                  <h3 className={`text-sm font-black uppercase tracking-tight ${
                    activeTab === phase.id ? 'text-slate-950' : 'text-white'
                  }`}>{phase.title}</h3>
                </div>
              </button>
            ))}
          </div>

          {/* CONTENT AREA */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900 border-2 border-slate-800 p-8 md:p-12 rounded-[3rem] min-h-[450px] relative overflow-hidden">
              <div className="relative z-10">
                <div className="mb-8">
                  <h3 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
                    {phases.find(p => p.id === activeTab)?.title}
                  </h3>
                  <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em] font-bold">
                    {phases.find(p => p.id === activeTab)?.subtitle}
                  </p>
                </div>
                {phases.find(p => p.id === activeTab)?.content}
              </div>
              
              {/* DECORATIVE BACKGROUND ICON */}
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] text-white">
                {phases.find(p => p.id === activeTab)?.icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}