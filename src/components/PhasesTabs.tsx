import { Search, ShieldCheck, Gavel, Hammer, ArrowRight, MessageCircle } from 'lucide-react';
import { useTabs } from '../context/TabsContext';

const PhasesTabs = () => {
  const { activeTab, setActiveTab } = useTabs();

  const phases = [
    {
      id: 'fase1' as const,
      number: '01',
      title: 'Scanner Técnico',
      icon: <Search size={20} />,
      content: {
        subtitle: 'Auditoría Profunda y Sourcing',
        description: 'No compres a ciegas. Realizamos un peritaje completo de la propiedad para detectar vicios ocultos y evaluar el entorno real.',
        items: [
          'Scanner de Vicios Ocultos (Humedad, Eléctrico, Estructural)',
          'Certificado de Valor Real (Radio 3km)',
          'Análisis de Plusvalía y Entorno',
          'Sourcing: Buscamos la propiedad técnica por ti'
        ],
        cta: 'Solicitar Auditoría',
        message: 'Hola DOMIS™, quiero solicitar una auditoría técnica Fase 1. Ya tengo una propiedad vista / necesito que busquen por mí.'
      }
    },
    {
      id: 'fase2' as const,
      number: '02',
      title: 'Plan Maestro',
      icon: <Gavel size={20} />,
      content: {
        subtitle: 'Negociación Basada en Datos',
        description: 'Usamos los hallazgos técnicos para bajar el precio. No pedimos rebajas, exigimos descuentos basados en ingeniería.',
        items: [
          'Entrega del Plan Maestro de Negociación',
          'Estrategia de Cierre Técnica',
          'Ahorro Garantizado: ROI de hasta 900%',
          'Beneficio: 60% de reembolso de tu Fase 1'
        ],
        cta: 'Activar Negociación',
        message: 'Hola, ya tengo el diagnóstico técnico de la Fase 1 y quiero pasar a la Fase 2. Necesito el Plan Maestro para bajar el precio de venta.'
      }
    },
    {
      id: 'fase3' as const,
      number: '03',
      title: 'Gestión de Obra',
      icon: <Hammer size={20} />,
      content: {
        subtitle: 'Remodelación y Valorización',
        description: 'Transformamos tu nueva propiedad. Como Constructores Civiles, gestionamos la ejecución para maximizar tu inversión.',
        items: [
          'Presupuesto de Remodelación con descuento F2',
          'Supervisión Técnica de Obra',
          'Arquitectura e Interiorismo Estratégico',
          'Entrega de Llave en Mano'
        ],
        cta: 'Cotizar Remodelación',
        message: 'Hola DOMIS™, ya cerramos la compra y quiero avanzar con la Fase 3 de Remodelación y Gestión de Obra.'
      }
    }
  ];

  return (
    <section id="phases" className="py-24 bg-slate-950 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 tracking-tighter">
            El Sistema <span className="text-cyan-500 text-glow">DOMIS™</span>
          </h2>
          <p className="text-slate-400 font-light">Tres etapas diseñadas para proteger y multiplicar tu capital inmobiliario.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActiveTab(phase.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all border ${
                activeTab === phase.id
                  ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-105'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              <span className="opacity-50">{phase.number}</span>
              {phase.icon}
              {phase.title}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-16 backdrop-blur-sm relative overflow-hidden min-h-[500px]">
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`transition-all duration-500 ${activeTab === phase.id ? 'opacity-100 translate-y-0 relative' : 'hidden opacity-0 translate-y-10 absolute'}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-cyan-500">
                    <span className="text-5xl font-black opacity-20">{phase.number}</span>
                    <div className="h-px flex-1 bg-cyan-500/20"></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
                    {phase.content.subtitle}
                  </h3>
                  <p className="text-slate-400 text-lg leading-relaxed font-light">
                    {phase.content.description}
                  </p>
                  
                  <ul className="space-y-4 pt-4">
                    {phase.content.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-slate-300">
                        <ShieldCheck className="text-cyan-500 shrink-0 mt-1" size={18} />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 p-8 rounded-3xl flex flex-col items-center justify-center text-center space-y-6">
                  <div className="p-6 bg-cyan-500/10 rounded-full text-cyan-400">
                    {phase.icon}
                  </div>
                  <p className="text-slate-400 text-sm">¿Listo para comenzar la {phase.title}?</p>
                  <a
                    href={`https://wa.me/569XXXXXXXX?text=${encodeURIComponent(phase.content.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 bg-white text-slate-950 px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-all group"
                  >
                    <MessageCircle size={18} />
                    {phase.content.cta}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhasesTabs;