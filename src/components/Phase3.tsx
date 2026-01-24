import { Hammer, Paintbrush, Ruler } from 'lucide-react';

/**
 * COMPONENTE FASE 3: DOMIS UPGRADE
 * Ajuste de diseño: Se reducen tamaños de iconos, textos y espaciados para
 * dar más protagonismo a la imagen de fondo.
 */
export default function Phase3() {
  return (
    // Se reduce el padding vertical de py-20 a py-16
    <section className="py-16 border-t border-slate-800 relative overflow-hidden bg-slate-950">
      
      {/* CAPA DE IMAGEN (Sin cambios) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/DOMIS_phase3_remodel.webp" 
          alt="Remodelación Domis Upgrade" 
          className="w-full h-full object-cover opacity-70" 
        />
        <div className="absolute inset-0 bg-slate-950/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950"></div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 container mx-auto px-6">
        {/* Se reduce el margen inferior de mb-16 a mb-12 */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs font-bold mb-4 uppercase tracking-widest">
            Fase 3: Transformación
          </div>
          {/* Título principal ligeramente más compacto en móviles */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Domis <span className="text-amber-500">Upgrade</span>
          </h2>
          <p className="text-slate-200 font-medium drop-shadow-lg text-sm md:text-base">
            Una vez que las llaves son tuyas, ejecutamos el plan de remodelación diseñado en la auditoría
            para maximizar tu plusvalía desde el primer día.
          </p>
        </div>

        {/* GRID DE PESTAÑAS: Se reduce el gap de gap-8 a gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              // Iconos más pequeños: de w-6 h-6 a w-5 h-5
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
              // Se reduce el padding interno de p-8 a p-6
              className="p-6 bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl group hover:border-amber-500/50 transition-all"
            >
              {/* Contenedor del icono más pequeño: de w-12 h-12 a w-10 h-10 */}
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center text-amber-500 mb-4 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              {/* Título de la pestaña más pequeño: de text-xl a text-lg */}
              <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}