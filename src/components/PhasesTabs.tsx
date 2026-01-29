import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';
// import Calculator from './Calculator'; // <--- BORRADO (Desactivado)
import BenefitFlyer from './BenefitFlyer';
import Deliverable from './Deliverable';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import { useTabs } from '../context/TabsContext';

export default function PhasesTabs() {
  const { activeTab, setActiveTab } = useTabs();

  const handleTabChange = (id: 'fase1' | 'fase2' | 'fase3') => {
    setActiveTab(id);
    
    // Scroll de precisión al ancla de contenido
    setTimeout(() => {
      const element = document.getElementById('fase-anchor');
      if (element) {
        const isMobile = window.innerWidth < 768;
        const yOffset = isMobile ? -80 : -100; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };

  const BridgeButton = ({ targetId, label, subtitle, icon }: { targetId: 'fase1' | 'fase2' | 'fase3', label: string, subtitle: string, icon: string }) => (
    <div className="pt-24 border-t border-slate-900/50">
      <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-8 font-bold text-center">Continuar Trayectoria Técnica</p>
      <button
        onClick={() => handleTabChange(targetId)}
        className="w-full max-w-4xl mx-auto p-8 rounded-2xl border-2 border-slate-800 bg-slate-900/50 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-500 group relative overflow-hidden flex flex-col items-center gap-4"
      >
        <div className="flex flex-col items-center gap-4 relative z-10 text-center">
          <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{icon}</span>
          <div>
            <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 group-hover:text-cyan-400 transition-colors">
              {label}
            </div>
            <div className="text-white text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
              {subtitle} <span className="group-hover:translate-x-2 transition-transform duration-500">→</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      </button>
    </div>
  );

  return (
    <section className="py-24 bg-slate-950 relative" id="proceso">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER DE SECCIÓN */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Protocolo DOMIS™</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Cómo <span className="text-cyan-400">Funciona</span>
          </h2>
          <p className="text-slate-400 italic text-center">Ecosistema técnico integrado en 3 etapas críticas.</p>
        </div>

        {/* RESUMEN DEL PROTOCOLO (Módulos interactivos) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* MÓDULO 1: AUDITORÍA */}
          <button 
            onClick={() => handleTabChange('fase1')}
            className={`engineering-frame p-8 border-2 transition-all duration-500 group relative overflow-hidden rounded-xl text-left flex flex-col h-full ${
              activeTab === 'fase1' ? 'border-cyan-500 bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-800 bg-slate-950 hover:border-slate-600'
            }`}
          >
            <div className="animate-scan"></div>
            <div className="w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-600 mb-6 flex items-center justify-center text-xl font-black text-white mx-auto relative z-20 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">1</div>
            <h3 className={`text-xl font-black uppercase mb-3 text-center transition-colors ${activeTab === 'fase1' ? 'text-cyan-400' : 'text-white'}`}>AUDITORÍA TÉCNICA</h3>
            <p className="text-slate-400 text-sm leading-relaxed text-center flex-grow">
              Protocolo <strong>PCF-15™</strong> para detectar vicios ocultos. Scoring técnico 1-7 en 3 días + escaneo del entorno.
            </p>
            <div className="mt-4 text-[10px] text-cyan-500 font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Especificaciones →</div>
          </button>

          {/* MÓDULO 2: NEGOCIACIÓN */}
          <button 
            onClick={() => handleTabChange('fase2')}
            className={`engineering-frame p-8 border-2 transition-all duration-500 group relative overflow-hidden rounded-xl text-left flex flex-col h-full ${
              activeTab === 'fase2' ? 'border-cyan-500 bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-800 bg-slate-950 hover:border-slate-600'
            }`}
          >
            <div className="animate-scan"></div>
            <div className="w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-600 mb-6 flex items-center justify-center text-xl font-black text-white mx-auto relative z-20 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">2</div>
            <h3 className={`text-xl font-black uppercase mb-3 text-center transition-colors ${activeTab === 'fase2' ? 'text-cyan-400' : 'text-white'}`}>NEGOCIACIÓN ESTRATÉGICA</h3>
            <p className="text-slate-400 text-sm leading-relaxed text-center flex-grow">
              Inteligencia de mercado (CBR/IA) para definir 3 escenarios de cierre basados en ROI real y evidencia.
            </p>
            <div className="mt-4 text-[10px] text-cyan-500 font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Estrategia de Cierre →</div>
          </button>

          {/* MÓDULO 3: REMODELACIÓN */}
          <button 
            onClick={() => handleTabChange('fase3')}
            className={`engineering-frame p-8 border-2 transition-all duration-500 group relative overflow-hidden rounded-xl text-left flex flex-col h-full ${
              activeTab === 'fase3' ? 'border-cyan-500 bg-slate-900 shadow-[0_0_20px_rgba(34,211,238,0.1)]' : 'border-slate-800 bg-slate-950 hover:border-slate-600'
            }`}
          >
            <div className="animate-scan"></div>
            <div className="w-12 h-12 bg-slate-800 rounded-full border-2 border-slate-600 mb-6 flex items-center justify-center text-xl font-black text-white mx-auto relative z-20 group-hover:border-cyan-400 group-hover:text-cyan-400 transition-colors">3</div>
            <h3 className={`text-xl font-black uppercase mb-3 text-center transition-colors ${activeTab === 'fase3' ? 'text-cyan-400' : 'text-white'}`}>PLUSVALÍA Y REMODELACIÓN</h3>
            <p className="text-slate-400 text-sm leading-relaxed text-center flex-grow">
              Ejecución de precisión para corregir fallas de auditoría, garantizando habitabilidad y plusvalía inmediata.
            </p>
            <div className="mt-4 text-[10px] text-cyan-500 font-bold uppercase tracking-widest text-center opacity-0 group-hover:opacity-100 transition-opacity">Plan de Ejecución →</div>
          </button>
        </div>

        {/* ANCLA PARA EL SCROLL */}
        <div id="fase-anchor" className="scroll-mt-24"></div>

        {/* CONTENIDOS DETALLADOS POR FASE */}
        <div className="mt-8">
          {activeTab === 'fase1' && (
            <div className="space-y-24 animate-fadeIn text-center">
              <AuditPacks onNext={() => handleTabChange('fase2')} />
              <Sourcing />
              <BridgeButton targetId="fase2" label="Fase 2" subtitle="Negociación Técnica" icon="💼" />
            </div>
          )}

          {activeTab === 'fase2' && (
            <div className="space-y-24 animate-fadeIn text-center">
              {/* === CAMBIO REALIZADO: Phase2 va primero === */}
              <div id="negociacion-tecnica">
                <Phase2 onNext={() => document.getElementById('benefit-anchor')?.scrollIntoView({ behavior: 'smooth' })} />
              </div>
              
              <Deliverable />
              
              {/* === BenefitFlyer va al final de la explicación === */}
              <div id="benefit-anchor" className="scroll-mt-24">
                <BenefitFlyer />
              </div>

              <BridgeButton targetId="fase3" label="Fase 3" subtitle="Remodelación Estratégica" icon="🏗️" />
            </div>
          )}

          {activeTab === 'fase3' && (
            <div className="space-y-24 animate-fadeIn text-center">
              <Phase3 />
              <BridgeButton targetId="fase1" label="Fase 1" subtitle="Reiniciar Auditoría" icon="🔍" />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}