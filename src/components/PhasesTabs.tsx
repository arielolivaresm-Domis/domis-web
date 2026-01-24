import { Search, Gavel, Hammer, ArrowRight, MessageCircle } from 'lucide-react';
import { useTabs } from '../context/TabsContext';

// Definimos los tipos de ID permitidos para que TypeScript no de error
type PhaseId = 'fase1' | 'fase2' | 'fase3';

const PhasesTabs = () => {
  const { activeTab, setActiveTab } = useTabs();

  // Forzamos a que el ID sea del tipo específico PhaseId
  const phases: { id: PhaseId; title: string; icon: JSX.Element; msg: string }[] = [
    {
      id: 'fase1',
      title: 'Scanner Técnico',
      icon: <Search size={20} />,
      msg: 'Hola DOMIS™, quiero solicitar la Fase 1 de Scanner Técnico.'
    },
    {
      id: 'fase2',
      title: 'Negociación Técnica',
      icon: <Gavel size={20} />,
      msg: 'Hola DOMIS™, quiero pasar a la Fase 2 de Negociación con el Plan Maestro.'
    },
    {
      id: 'fase3',
      title: 'Gestión de Obra',
      icon: <Hammer size={20} />,
      msg: 'Hola DOMIS™, ya compré la propiedad y quiero cotizar la Fase 3 de Remodelación.'
    }
  ];

  return (
    <section id="phases" className="py-24 bg-slate-950 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {phases.map((phase) => (
            <button
              key={phase.id}
              onClick={() => setActiveTab(phase.id)} 
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black uppercase text-[10px] transition-all border ${
                activeTab === phase.id
                  ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)]'
                  : 'bg-slate-900 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {phase.icon} {phase.title}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 text-center backdrop-blur-sm">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="text-3xl font-black text-white uppercase tracking-tighter">
              {phases.find(p => p.id === activeTab)?.title}
            </h3>
            <p className="text-slate-400 text-sm font-light">
              Haz clic abajo para activar esta etapa con nuestro equipo técnico.
            </p>
            <div className="flex justify-center">
              <a 
                href={`https://wa.me/569XXXXXXXX?text=${encodeURIComponent(phases.find(p => p.id === activeTab)?.msg || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-white text-slate-950 px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all group"
              >
                <MessageCircle size={18} />
                Activar Etapa
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhasesTabs;