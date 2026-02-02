import { useState, useEffect, useRef } from 'react';
import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';
import Calculator from './Calculator';
import BenefitFlyer from './BenefitFlyer';
import Deliverable from './Deliverable';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import { useTabs } from '../context/TabsContext';
import { ArrowRight, Search, Gavel, Hammer } from 'lucide-react';

export default function PhasesTabs() {
  const { activeTab, setActiveTab } = useTabs();
  const [isShrunk, setIsShrunk] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Control del efecto Sticky para la navegación secundaria
  useEffect(() => {
    const handleScroll = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        setIsShrunk(rect.top <= 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    const element = document.getElementById('proceso');
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section id="proceso" className="py-24 bg-slate-950 font-sans relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ENCABEZADO - REPLICA FIEL A LA FOTO */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6">
            PROTOCOLO DOMIS™
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
            CÓMO <span className="text-cyan-400">FUNCIONA</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-widest italic">
            Ecosistema técnico integrado en 3 etapas críticas.
          </p>
        </div>

        <div ref={triggerRef} className="h-1 w-full absolute top-[400px] pointer-events-none"></div>

        {/* GRILLA DE 3 TARJETAS - ACTÚAN COMO SELECTORES DE FASE */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-24 transition-all duration-700 ${isShrunk ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          
          {/* FASE 1 - AUDITORÍA */}
          <button 
            onClick={() => handleTabChange('fase1')}
            className={`relative p-10 rounded-2xl transition-all duration-500 text-center flex flex-col items-center border-2 ${activeTab === 'fase1' ? 'bg-slate-900/60 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.15)]' : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}`}
          >
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black mb-10 transition-all ${activeTab === 'fase1' ? 'border-cyan-500 bg-slate-950 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-white/20 bg-slate-950 text-slate-500'}`}>1</div>
            <h3 className={`text-xl font-black uppercase tracking-tighter mb-6 ${activeTab === 'fase1' ? 'text-cyan-400' : 'text-white'}`}>AUDITORÍA TÉCNICA</h3>
            <p className="text-slate-400 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
              Protocolo <span className="text-white">PCF-15™</span> para asegurar tu inversión. <span className="text-white">Si ya elegiste tu propiedad, la auditamos; si no tienes una, activamos modo Sourcing para buscarla por ti.</span> Scoring técnico 1-7 en 3 días + escaneo del entorno.
            </p>
          </button>

          {/* FASE 2 - NEGOCIACIÓN */}
          <button 
            onClick={() => handleTabChange('fase2')}
            className={`relative p-10 rounded-2xl transition-all duration-500 text-center flex flex-col items-center border-2 ${activeTab === 'fase2' ? 'bg-slate-900/60 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.15)]' : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}`}
          >
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black mb-10 transition-all ${activeTab === 'fase2' ? 'border-cyan-500 bg-slate-950 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-white/20 bg-slate-950 text-slate-500'}`}>2</div>
            <h3 className={`text-xl font-black uppercase tracking-tighter mb-6 ${activeTab === 'fase2' ? 'text-cyan-400' : 'text-white'}`}>NEGOCIACIÓN ESTRATÉGICA</h3>
            <p className="text-slate-400 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
              Inteligencia de mercado (CBR/IA) y valorización de fallas <span className="text-white">PCF-15 (NDI)</span> netamente para generar poder de negociación. 3 escenarios de cierre basados en <span className="text-white">ROI real</span> y evidencia técnica.
            </p>
          </button>

          {/* FASE 3 - REMODELACIÓN */}
          <button 
            onClick={() => handleTabChange('fase3')}
            className={`relative p-10 rounded-2xl transition-all duration-500 text-center flex flex-col items-center border-2 ${activeTab === 'fase3' ? 'bg-slate-900/60 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.15)]' : 'bg-slate-900/40 border-slate-800 hover:border-slate-600'}`}
          >
            <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black mb-10 transition-all ${activeTab === 'fase3' ? 'border-cyan-500 bg-slate-950 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'border-white/20 bg-slate-950 text-slate-500'}`}>3</div>
            <h3 className={`text-xl font-black uppercase tracking-tighter mb-6 ${activeTab === 'fase3' ? 'text-cyan-400' : 'text-white'}`}>PLUSVALÍA Y REMODELACIÓN</h3>
            <p className="text-slate-400 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
              Ejecución de precisión para corregir fallas de auditoría, garantizando habitabilidad y plusvalía inmediata.
            </p>
          </button>
        </div>

        {/* NAVEGACIÓN STICKY (SOLO SCROLL) */}
        <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${isShrunk ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}`}>
          <div className="flex gap-2 p-2 bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
            <button onClick={() => handleTabChange('fase1')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'fase1' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>Auditoría</button>
            <button onClick={() => handleTabChange('fase2')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'fase2' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>Negociación</button>
            <button onClick={() => handleTabChange('fase3')} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'fase3' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>Remodelación</button>
          </div>
        </div>

        {/* CONTENIDOS DINÁMICOS */}
        <div className="mt-8">
          {activeTab === 'fase1' && (
            <div className="space-y-24 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <AuditPacks />
              <Sourcing />
              <Calculator />
              <BridgeButton targetId="fase2" label="Continuar Trayectoria" subtitle="Negociación Técnica" icon={<Gavel size={32} />} />
            </div>
          )}

          {activeTab === 'fase2' && (
            <div className="space-y-24 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <BenefitFlyer />
              <Deliverable />
              <Phase2 onNext={() => handleTabChange('fase3')} />
              <BridgeButton targetId="fase3" label="Continuar Trayectoria" subtitle="Remodelación" icon={<Hammer size={32} />} />
            </div>
          )}

          {activeTab === 'fase3' && (
            <div className="space-y-24 animate-in fade-in slide-in-from-bottom-10 duration-700">
              <Phase3 />
              <BridgeButton targetId="fase1" label="Reiniciar Ciclo" subtitle="Nueva Auditoría" icon={<Search size={32} />} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// COMPONENTE DE PUENTE
function BridgeButton({ targetId, label, subtitle, icon }: any) {
  const { setActiveTab } = useTabs();
  return (
    <div className="pt-24 border-t border-slate-900/50">
       <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-8 font-bold text-center">Continuar Trayectoria Técnica</p>
      <button
        onClick={() => {
          setActiveTab(targetId);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className="w-full max-w-4xl mx-auto p-10 rounded-[2rem] border-2 border-slate-800 bg-slate-900/30 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all group overflow-hidden relative shadow-2xl"
      >
        <div className="flex flex-col items-center gap-4 relative z-10 text-center">
          <div className="text-cyan-400 group-hover:scale-110 transition-transform duration-500">{icon}</div>
          <div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{label}</div>
            <div className="text-white text-3xl font-black uppercase italic tracking-tighter flex items-center justify-center gap-4">
              {subtitle} <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}