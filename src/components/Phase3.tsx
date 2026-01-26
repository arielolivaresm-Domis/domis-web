import { Hammer, Paintbrush, Ruler } from 'lucide-react';

/**
 * COMPONENTE FASE 3: DOMIS UPGRADE™
 * Estilo: Cristal ultraligero con narrativa cotidiana y títulos técnicos.
 */
export default function Phase3() {
  return (
    <section className="py-16 border-t border-slate-800 relative overflow-hidden bg-slate-950">
      
      {/* CAPA DE IMAGEN: 100% Claridad con gradiente de lectura */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/DOMIS_phase3_remodel.webp" 
          alt="Remodelación Domis Upgrade" 
          className="w-full h-full object-cover opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/20 to-slate-950/90"></div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 text-xs font-bold mb-6 uppercase tracking-widest backdrop-blur-sm">
            Fase 3: Casa Lista y Segura
          </div>
          
          {/* Título y Subtítulo Mezclados */}
          <h2 className="text-4xl md:text-6xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-2xl">
            DOMIS UPGRADE<span className="text-amber-500 text-2xl relative -top-4 ml-1">™</span>
          </h2>
          <h3 className="text-xl md:text-2xl font-bold text-amber-500 uppercase tracking-widest mb-6 drop-shadow-lg">
            Plusvalía Ejecutiva
          </h3>

          <p className="text-white font-bold drop-shadow-[0_2px_8px_rgba(0,0,0,1)] text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Nos encargamos de arreglar todos los detalles que detectamos en la auditoría y renovar tus espacios. 
            Es la forma más fácil de asegurar que tu propiedad sea <span className="text-amber-500 underline decoration-amber-500/50">segura, cómoda y que valga más</span> desde el primer día.
          </p>
        </div>

        {/* MÓDULOS TIPO CRISTAL ULTRATRANSAPARENTE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <Ruler className="w-5 h-5" />,
              title: "Optimización Estructural",
              desc: "Rediseñamos los espacios para que aproveches mejor cada metro cuadrado y tu casa sea más eficiente."
            },
            {
              icon: <Hammer className="w-5 h-5" />,
              title: "Ingeniería de Obra",
              desc: "Supervisamos a los maestros y la construcción para que todo quede impecable y bajo las normas chilenas."
            },
            {
              icon: <Paintbrush className="w-5 h-5" />,
              title: "Blindaje de Activos",
              desc: "Elegimos materiales que duran años, evitando gastos innecesarios a futuro y protegiendo el valor de tu propiedad."
            }
          ].map((step, i) => (
            <div
              key={i}
              className="p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-500"
            >
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform shadow-lg border border-amber-500/30">
                {step.icon}
              </div>
              <h4 className="text-xl font-black text-white mb-3 drop-shadow-md tracking-tight uppercase">{step.title}</h4>
              <p className="text-slate-100 text-sm leading-relaxed font-semibold drop-shadow-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}