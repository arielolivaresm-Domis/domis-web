import { useState, useEffect, useRef } from 'react';
import AuditPacks from './AuditPacks';
import Sourcing from './Sourcing';
import BenefitFlyer from './BenefitFlyer';
import Deliverable from './Deliverable';
import Phase2 from './Phase2';
import Phase3 from './Phase3';
import { useTabs } from '../context/TabsContext';

export default function PhasesTabs() {
 const { activeTab, setActiveTab } = useTabs();
 const [isShrunk, setIsShrunk] = useState(false);
 const triggerRef = useRef<HTMLDivElement>(null);

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
     const yOffset = -140;
     const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
     window.scrollTo({ top: y, behavior: 'smooth' });
   }
 };

 const BridgeButton = ({ targetId, label, subtitle, icon }: { targetId: 'fase1' | 'fase2' | 'fase3', label: string, subtitle: string, icon: string }) => (
   <div className="pt-24 border-t border-slate-900/50 text-center">
     <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-8 font-bold">Continuar Trayectoria Técnica</p>
     <button
       onClick={() => handleTabChange(targetId)}
       className="w-full max-w-4xl mx-auto p-8 rounded-2xl border-2 border-slate-800 bg-slate-900/50 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all duration-500 group relative overflow-hidden"
     >
       <div className="flex flex-col items-center gap-4 relative z-10">
         <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{icon}</span>
         <div className="text-center">
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
      
       <div className="text-center mb-16">
         <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
           <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Protocolo DOMIS™</span>
         </div>
         <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter italic">
           Cómo <span className="text-cyan-400">Funciona</span>
         </h2>
         <p className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-widest italic mt-4">
            Ecosistema técnico integrado en 3 etapas críticas.
          </p>
       </div>

       <div ref={triggerRef} className="h-1 w-full absolute top-[300px] pointer-events-none"></div>

       {/* NAVEGACIÓN SUPERIOR (MÓDULOS CAMBIADOS A ESTILO FOTO 2) */}
       <div className={`sticky top-20 z-[100] transition-all duration-700 ease-in-out mb-16 ${isShrunk ? 'scale-90' : 'scale-100'}`}>
         <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto transition-all duration-700`}>
           {[
             { 
               id: 'fase1', 
               num: '1', 
               title: 'Auditoría Técnica', 
               desc: 'Protocolo PCF-15™ para asegurar tu inversión. Si ya elegiste tu propiedad, la auditamos; si no tienes una, activamos modo sourcing para buscarla por ti. Scoring técnico 1-7 en 3 días + escaneo del entorno.' 
             },
             { 
               id: 'fase2', 
               num: '2', 
               title: 'Negociación Estratégica', 
               desc: 'Inteligencia de mercado (CBR/IA) y valorización de fallas PCF-15 (NDI) netamente para generar poder de negociación. 3 escenarios de cierre basados en ROI real y evidencia técnica.' 
             },
             { 
               id: 'fase3', 
               num: '3', 
               title: 'Plusvalía y Remodelación', 
               desc: 'Ejecución de precisión para corregir fallas de auditoría, garantizando habitabilidad y plusvalía inmediata.' 
             }
           ].map((t) => (
             <button
               key={t.id}
               onClick={() => handleTabChange(t.id as any)}
               className={`relative p-10 rounded-2xl border-2 transition-all duration-500 text-center flex flex-col items-center ${
                 activeTab === t.id
                   ? 'border-cyan-500 bg-slate-900/60 shadow-[0_0_40px_rgba(34,211,238,0.15)]'
                   : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
               }`}
             >
               <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-sm font-black mb-10 transition-all duration-500 ${
                 activeTab === t.id 
                   ? 'border-cyan-500 bg-slate-950 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                   : 'border-white/20 bg-slate-950 text-slate-500'
               }`}>
                 {t.num}
               </div>
               <h3 className={`text-xl font-black uppercase tracking-tighter mb-6 transition-colors duration-500 ${
                 activeTab === t.id ? 'text-cyan-400' : 'text-white'
               }`}>
                 {t.title}
               </h3>
               <p className="text-slate-400 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
                 {t.desc}
               </p>
             </button>
           ))}
         </div>
       </div>

       {/* CONTENIDOS POR FASE */}
       <div className="mt-8">
         {activeTab === 'fase1' && (
           <div className="space-y-24 animate-fadeIn text-center">
             <AuditPacks />
             <Sourcing />
             <BridgeButton
               targetId="fase2"
               label="Fase 2"
               subtitle="Negociación Técnica"
               icon="💼"
             />
           </div>
         )}

         {activeTab === 'fase2' && (
           <div className="space-y-24 animate-fadeIn text-center">
             <BenefitFlyer />
             <Deliverable />
             {/* Corrección del error 'onNext' pasando la función requerida */}
             <Phase2 onNext={() => handleTabChange('fase3')} />
             <BridgeButton
               targetId="fase3"
               label="Fase 3"
               subtitle="Remodelación Estratégica"
               icon="🏗️"
             />
           </div>
         )}

         {activeTab === 'fase3' && (
           <div className="space-y-24 animate-fadeIn text-center">
             <Phase3 />
             <BridgeButton
               targetId="fase1"
               label="Fase 1"
               subtitle="Reiniciar Auditoría"
               icon="🔍"
             />
           </div>
         )}
       </div>

     </div>
   </section>
 );
}