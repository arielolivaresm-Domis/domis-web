import { ShieldCheck, AlertTriangle, CheckCircle } from 'lucide-react';

const garantias = [
  {
    plazo: '3 años',
    tipo: 'Terminaciones',
    detalle: 'Desde la inscripción del inmueble a tu nombre en el Conservador de Bienes Raíces.',
    items: ['Muros y pinturas', 'Pisos y pavimentos', 'Cielos, ventanas y puertas', 'Muebles cocina y baños'],
  },
  {
    plazo: '5 años',
    tipo: 'Instalaciones',
    detalle: 'Desde la recepción definitiva de la obra.',
    items: ['Sistema eléctrico', 'Red sanitaria (agua y alcantarillado)', 'Instalación de gas', 'Calefacción y ventilación'],
  },
  {
    plazo: '10 años',
    tipo: 'Estructura',
    detalle: 'Desde la recepción definitiva de la obra.',
    items: ['Fundaciones y losa', 'Muros estructurales', 'Pilares y vigas', 'Sistema resistente a sismos'],
  },
];

export default function GarantiaFAQ() {
  const whatsappUrl =
    'https://wa.me/56929901343?text=Hola, equipo DOMIS™. Quiero revisar mi propiedad antes de firmar el acta de entrega.';

  return (
    <section className="py-8 px-0 md:px-6 bg-slate-950">
      <div className="max-w-5xl mx-auto rounded-none md:rounded-[2.5rem] border border-white/15 bg-slate-900 shadow-2xl px-6 py-10">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            <ShieldCheck size={12} />
            Ley de Calidad de la Vivienda
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Tu propiedad nueva<br />
            <span className="text-cyan-400 italic">tiene garantía.</span><br />
            Pero no protege de todo.
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            La Ley de Calidad de la Vivienda obliga a las inmobiliarias a responder por defectos —
            pero solo si los documentaste <strong className="text-white">antes de firmar el acta de entrega</strong>.
            Una vez que firmas sin observaciones, cedes ese poder.
          </p>
        </div>

        {/* Tabla de plazos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {garantias.map((g) => (
            <div
              key={g.tipo}
              className="bg-slate-800 border border-slate-600 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div>
                <div className="text-4xl font-black font-mono text-cyan-400 mb-1">{g.plazo}</div>
                <div className="text-white font-black uppercase tracking-widest text-sm">{g.tipo}</div>
                <p className="text-slate-400 text-[11px] mt-1 leading-relaxed">{g.detalle}</p>
              </div>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-slate-300 text-[11px] font-medium">
                    <CheckCircle size={12} className="text-cyan-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alerta DOMIS */}
        <div className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-6 items-start mb-6">
          <AlertTriangle className="text-amber-400 shrink-0 mt-1" size={28} />
          <div>
            <h3 className="text-white font-black uppercase tracking-tighter text-lg md:text-xl mb-3">
              El problema: la garantía no funciona automáticamente
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-2">
              Para que la inmobiliaria responda, tú necesitas haber <strong className="text-white">documentado cada defecto técnicamente</strong> al momento de recibir la propiedad.
              Si firmas el acta sin observaciones — aunque sea "para no complicar las cosas" — pierdes el respaldo legal sobre todo lo que no quedó registrado.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              La auditoría técnica DOMIS™ revisa la propiedad <strong className="text-white">antes de que firmes</strong> el acta de entrega, con informe técnico que documenta cada hallazgo. Así entras con evidencia, no con esperanza.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-colors"
          >
            Revisar antes de firmar →
          </a>
          <p className="text-slate-400 text-[11px] mt-4 uppercase tracking-widest">
            Auditoría técnica desde $1.800/m² + IVA · Mínimo 100m²
          </p>
        </div>

      </div>
    </section>
  );
}
