import { Hammer, Paintbrush, Ruler } from 'lucide-react';

/**
 * COMPONENTE FASE 3: DOMIS UPGRADE
 * Ajuste de Transparencia: Se reduce la opacidad y el desenfoque de los módulos
 * para un efecto de cristal ultraligero que maximiza la vista de la imagen de fondo.
 */
export default function Phase3() {
  return (
    <section className="py-16 border-t border-slate-800 relative overflow-hidden bg-slate-950">
      
      {/* CAPA DE IMAGEN: 100% Claridad */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/DOMIS_phase3_remodel.webp" 
          alt="Remodelación Domis Upgrade" 
          className="w-full h-full object-cover opacity-100" 
        />
        {/* Overlay mínimo para que no se pierda el fundido con el resto de la página */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-transparent to-slate-950/80"></div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-500 text-xs font-bold mb-4 uppercase tracking-widest backdrop-blur-sm">
            Fase 3: Transformación
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Domis <span className="text-amber-500">Upgrade</span>
          </h2>
          <p className="text-white font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,1)] text-sm md:text-base leading-relaxed">
            Una vez que las llaves son tuyas, ejecutamos el plan de remodelación diseñado en la auditoría
            para maximizar tu plusvalía desde el primer día.
          </p>
        </div>

        {/* MÓDULOS TIPO CRISTAL ULTRATRANSPARENTE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <Ruler className="w-5 h-5" />,
              title: "Interiorismo",
              desc: "Diseño de espacios optimizados para tu estilo de vida."
            },
            {
              icon: <Hammer className="w-5 h-5" />,
              title: "Ejecución",
              desc: "Mano de obra calificada y supervisión de ingeniería."
            },
            {
              icon: <Paintbrush className="w-5 h-5" />,
              title: "Terminaciones",
              desc: "Estándares de lujo y materiales de alta durabilidad."
            }
          ].map((step, i) => (
            <div
              key={i}
              // Se ajusta a bg-white/5 y backdrop-blur-sm para mayor transparencia
              className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl group hover:bg-amber-500/10 hover:border-amber-500/50 transition-all duration-500"
            >
              <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform shadow-lg">
                {step.icon}
              </div>
              <h4 className="text-lg font-black text-white mb-2 drop-shadow-md tracking-tight">{step.title}</h4>
              <p className="text-slate-100 text-sm leading-relaxed font-semibold drop-shadow-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}