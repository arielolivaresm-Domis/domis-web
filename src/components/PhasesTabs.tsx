import { Search, ShieldCheck, Gavel, Hammer, ArrowRight, MessageCircle } from 'lucide-react';
import { useTabs } from '../context/TabsContext';

const PhasesTabs = () => {
  const { activeTab, setActiveTab } = useTabs();

  const phases = [
    {
      id: 'fase1',
      number: '01',
      title: 'Scanner Técnico',
      icon: <Search size={20} />,
      content: {
        subtitle: 'Auditoría Profunda',
        description: 'Peritaje completo para detectar vicios ocultos antes de la compra.',
        items: ['Scanner de Humedad y Electricidad', 'Certificado de Valor Real', 'Análisis de Plusvalía'],
        message: 'Hola, quiero la Fase 1 de Scanner Técnico.'
      }
    },
    {
      id: 'fase2',
      number: '02',
      title: 'Plan Maestro',
      icon: <Gavel size={20} />,
      content: {
        subtitle: 'Negociación Técnica',
        description: 'Usamos el informe de la Fase 1 para bajar el precio de venta.',
        items: ['Entrega de Plan Maestro', 'Estrategia de Cierre', '15% de comisión por éxito'],
        message: 'Hola, quiero pasar a la Fase 2 de Negociación con el Plan Maestro.'
      }
    },
    {
      id: 'fase3',
      number: '03',
      title: 'Gestión de Obra',
      icon: <Hammer size={20} />,
      content: {
        subtitle: 'Remodelación Profesional',
        description: 'Ejecución y supervisión de obra para valorizar tu propiedad.',
        items: ['Presupuesto Detallado', 'Supervisión de Obra', 'Llave en mano'],
        message: 'Hola, ya compré y quiero cotizar la Fase 3 de Remodelación.'
      }
    }
  ];

  return (
    <section className="py-24 bg-slate-950 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActiveTab(phase.id)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all border ${
                activeTab === phase.id ? 'bg-cyan-500 text-slate-950 border-cyan-400' : 'bg-slate-900 text-slate-500 border-slate-800'
              }`}
            >
              {phase.icon} {phase.title}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12">
          {phases.map((phase) => (
            <div key={phase.id} className={activeTab === phase.id ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <h3 className="text-3xl font-black text-white uppercase">{phase.content.subtitle}</h3>
                  <p className="text-slate-400">{phase.content.description}</p>
                  <ul className="space-y-3">
                    {phase.content.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300 text-sm">
                        <ShieldCheck className="text-cyan-500" size={16} /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <a 
                    href={`https://wa.me/569XXXXXXXX?text=${encodeURIComponent(phase.content.message)}`}
                    target="_blank"
                    className="flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-xl font-black uppercase text-xs hover:scale-105 transition-all"
                  >
                    <MessageCircle size={18} /> Contactar {phase.title} <ArrowRight size={18} />
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