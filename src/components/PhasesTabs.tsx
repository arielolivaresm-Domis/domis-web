import { useState } from 'react';
import { ShieldCheck, TrendingUp, BadgeCheck } from 'lucide-react';

export default function PhasesTabs() {
  const [activeTab, setActiveTab] = useState(1);

  const phases = [
    {
      id: 1,
      title: "Auditoría Técnica",
      subtitle: "Certificación PCF-15™",
      icon: <ShieldCheck size={24} className={activeTab === 1 ? "text-slate-950" : "text-cyan-500"} />,
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed uppercase tracking-widest font-bold">
            Inspección de ingeniería para detectar vicios ocultos y fallas estructurales.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
              Escaneo de redes, estructura y entorno (3km)
            </li>
            <li className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
              Determinación del Valor Técnico Real del activo
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 2,
      title: "Negociación Estratégica",
      subtitle: "Poder de Negociación NDI",
      icon: <TrendingUp size={24} className={activeTab === 2 ? "text-slate-950" : "text-cyan-500"} />,
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed uppercase tracking-widest font-bold">
            Valorización de fallas PCF-15 (NDI) netamente para generar poder de negociación.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
              Estructura de cobro 10% sobre el ahorro logrado
            </li>
            <li className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
              Protección de inversión en el cierre del trato
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "Cierre y Post-Venta",
      subtitle: "Habitabilidad Garantizada",
      icon: <BadgeCheck size={24} className={activeTab === 3 ? "text-slate-950" : "text-cyan-500"} />,
      content: (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-slate-300 text-sm md:text-base mb-6 leading-relaxed uppercase tracking-widest font-bold">
            Acompañamiento hasta la entrega de llaves y revisión de reparaciones.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
              Protocolo de Escrituración Segura DOMIS™
            </li>
            <li className="flex items-center gap-3 text-white font-black text-xs uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
              Validación técnica de entrega final
            </li>
          </ul>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-3">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setActiveTab(phase.id)}
                className={`w-full flex items-center gap-4 p-5 rounded-3xl transition-all border-2 text-left ${
                  activeTab === phase.id ? 'bg-cyan-500 border-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">{phase.icon}</div>
                <div>
                  <div className={`text-[9px] font-black uppercase tracking-widest ${activeTab === phase.id ? 'text-slate-900 opacity-60' : 'text-cyan-500'}`}>Fase {phase.id}</div>
                  <h3 className={`text-sm font-black uppercase tracking-tight ${activeTab === phase.id ? 'text-slate-950' : 'text-white'}`}>{phase.title}</h3>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <div className="bg-slate-900 border-2 border-slate-800 p-8 md:p-12 rounded-[2.5rem] min-h-[400px] flex flex-col justify-center">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter mb-1">{phases.find(p => p.id === activeTab)?.title}</h3>
                <p className="text-cyan-500 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">{phases.find(p => p.id === activeTab)?.subtitle}</p>
              </div>
              {phases.find(p => p.id === activeTab)?.content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}