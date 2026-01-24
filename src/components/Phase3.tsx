import { Hammer, Paintbrush, Ruler } from 'lucide-react';

/**
 * COMPONENTE FASE 3: DOMIS UPGRADE
 * Mantiene los textos originales y agrega la imagen de fondo solicitada.
 */
export default function Phase3() {
  return (
    <section className="py-20 border-t border-slate-800 relative overflow-hidden">
      {/* CAPA DE IMAGEN DE FONDO */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/DOMIS_phase3_remodel.webp" 
          alt="Remodelación Domis Upgrade" 
          className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
        />
        {/* Degradado para asegurar que el texto destaque sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950"></div>
      </div>

      {/* CONTENIDO (Mantenido 100% original) */}
      <div className="relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 px-6">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-6 uppercase tracking-widest">
            Fase 3: Transformación
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Domis <span className="text-amber-500">Upgrade</span>
          </h2>
          <p className="text-slate-400">
            Una vez que las llaves son tuyas, ejecutamos el plan de remodelación diseñado en la auditoría
            para maximizar tu plusvalía desde el primer día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto">
          {[
            {
              icon: <Ruler className="w-6 h-6" />,
              title: "Interiorismo",
              desc: "Diseño de espacios optimizados para tu estilo de vida."
            },
            {
              icon: <Hammer className="w-6 h-6" />,
              title: "Ejecución",
              desc: "Mano de obra calificada y supervisión de ingeniería."
            },
            {
              icon: <Paintbrush className="w-6 h-6" />,
              title: "Terminaciones",
              desc: "Estándares de lujo y materiales de alta durabilidad."
            }
          ].map((step, i) => (
            <div
              key={i}
              className="p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl group hover:border-amber-500/30 transition-all"
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-3">{step.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}