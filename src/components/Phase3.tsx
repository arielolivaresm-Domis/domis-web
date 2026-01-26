import { Hammer, Paintbrush, Ruler } from 'lucide-react';

export default function Phase3() {
  // URL de WhatsApp unificada para Upgrade
  const whatsappUrl = "https://wa.me/56929901343?text=Hola, equipo DOMIS™.  necesito información sobre el servicio de remodelación y Upgrade para mi propiedad.";

  return (
    <section className="py-16 border-t border-slate-800 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 z-0">
        <img 
          src="/DOMIS_phase3_remodel.webp" 
          alt="Remodelación Domis Upgrade" 
          className="w-full h-full object-cover opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/30 to-slate-950/90"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 text-xs font-bold mb-6 uppercase tracking-widest backdrop-blur-sm">
            Fase 3: Casa Lista y Segura
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter">
            DOMIS UPGRADE<span className="text-amber-500 text-2xl relative -top-3 ml-1">™</span>
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-amber-500 uppercase tracking-widest mb-6">
            Plusvalía Ejecutiva
          </h3>
          <p className="text-white font-bold text-sm md:text-base leading-relaxed max-w-3xl mx-auto italic drop-shadow-md">
            Nos encargamos de arreglar todos los detalles que detectamos en la auditoría y renovar tus espacios para que tu propiedad valga más desde el primer día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {[
            { icon: <Ruler className="w-5 h-5" />, title: "Interiorismo", desc: "Diseño de espacios optimizados." },
            { icon: <Hammer className="w-5 h-5" />, title: "Ejecución", desc: "Mano de obra calificada." },
            { icon: <Paintbrush className="w-5 h-5" />, title: "Terminaciones", desc: "Estándares de lujo." }
          ].map((step, i) => (
            <div key={i} className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:border-amber-500/50 transition-all duration-500">
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 mb-4">{step.icon}</div>
              <h4 className="text-lg font-black text-white mb-2 uppercase">{step.title}</h4>
              <p className="text-slate-100 text-sm leading-relaxed font-semibold">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="group px-12 py-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black uppercase rounded-2xl transition-all duration-300 shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 flex items-center gap-3 text-sm tracking-widest"
          >
            Solicitar Presupuesto Upgrade →
          </a>
        </div>
      </div>
    </section>
  );
}