import { Hammer, Paintbrush, Ruler, ArrowRight } from 'lucide-react';
import Section from './layout/Section';

// Declaración para que TypeScript acepte el sensor de Google
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function Phase3() {
  // URL de WhatsApp unificada para Upgrade
  const whatsappUrl = "https://wa.me/56929901343?text=Hola, equipo DOMIS™. Necesito información sobre el servicio de remodelación y Upgrade para mi propiedad.";

  // Función para registrar el evento en Google Analytics
  const trackUpgradeClick = () => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'contacto_whatsapp', {
        'event_category': 'Conversion',
        'event_label': 'Fase 3 Upgrade',
        'value': 1
      });
    }
  };

  return (
    <Section id="fase3" className="bg-slate-950 relative overflow-hidden">
      {/* CONTENEDOR TIPO CARD PARA EL UPGRADE */}
      <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl min-h-[600px] flex items-center justify-center">
        
        {/* CAPA DE IMAGEN Y GRADIENTES FORENSES */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/DOMIS_phase3_remodel.webp" 
            alt="Remodelación Domis Upgrade" 
            className="w-full h-full object-cover opacity-60 md:opacity-100 grayscale-[0.3]" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950"></div>
        </div>

        {/* CONTENIDO INTERNO */}
        <div className="relative z-10 p-6 md:p-16 w-full text-center">
          
          {/* HEADER DE FASE */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 text-[10px] md:text-xs font-black mb-6 uppercase tracking-[0.3em] backdrop-blur-sm">
              Fase 3: Casa Lista y Segura
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-4 uppercase tracking-tighter leading-none">
              DOMIS UPGRADE<span className="text-amber-500 text-2xl relative -top-4 ml-1">™</span>
            </h2>
            <h3 className="text-xl md:text-2xl font-bold text-amber-500 uppercase tracking-[0.4em] mb-8">
              Plusvalía Ejecutiva
            </h3>
            <p className="text-slate-200 font-bold text-sm md:text-lg leading-relaxed max-w-3xl mx-auto italic drop-shadow-md">
              Corregimos cada vicio oculto detectado y ejecutamos un plan de renovación estratégica para maximizar el valor de tu activo desde el día uno.
            </p>
          </div>

          {/* GRILLA DE SERVICIOS UPGRADE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto mb-12">
            {[
              { icon: <Ruler />, title: "Interiorismo", desc: "Optimización de m²." },
              { icon: <Hammer />, title: "Ejecución", desc: "Mano de obra certificada." },
              { icon: <Paintbrush />, title: "Terminaciones", desc: "Estándar de alta gama." }
            ].map((step, i) => (
              <div key={i} className="p-6 md:p-8 bg-slate-950/50 backdrop-blur-xl border border-white/10 rounded-3xl group hover:border-amber-500/50 transition-all duration-500">
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h4 className="text-lg font-black text-white mb-2 uppercase tracking-tighter">{step.title}</h4>
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed font-bold uppercase tracking-tight">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* BOTÓN DE ACCIÓN */}
          <div className="flex justify-center">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={trackUpgradeClick}
              className="group px-8 md:px-12 py-5 md:py-6 bg-amber-500 hover:bg-white text-slate-950 font-black uppercase rounded-2xl transition-all duration-300 shadow-[0_20px_40px_rgba(245,158,11,0.2)] flex items-center gap-4 text-xs md:text-sm tracking-[0.2em] active:scale-95"
            >
              Solicitar Presupuesto Upgrade
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </div>

        </div>
      </div>
    </Section>
  );
}