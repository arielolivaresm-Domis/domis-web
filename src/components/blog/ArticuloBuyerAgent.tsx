import { ShieldCheck, Users, TrendingDown, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Buyer\'s agent en Chile: qué es, cómo funciona y por qué el mercado lo necesitaba | DOMIS™',
  description: 'En Chile todos los corredores trabajan para el vendedor. Un buyer\'s agent trabaja exclusivamente para ti: audita la propiedad, detecta fallas y negocia el precio a tu favor.',
  url: 'https://www.domis.cl/blog/buyer-agent-chile',
  datePublished: '2026-06-26',
};

const diferencias = [
  {
    aspecto: 'A quién representa',
    corredor: 'Al vendedor (o a ambos, con conflicto de interés)',
    buyerAgent: 'Exclusivamente al comprador',
  },
  {
    aspecto: 'Incentivo económico',
    corredor: 'Mayor precio de venta = mayor comisión',
    buyerAgent: 'Mejor precio para el comprador = trabajo bien hecho',
  },
  {
    aspecto: 'Inspección técnica',
    corredor: 'No realiza inspección profesional',
    buyerAgent: 'Auditoría con instrumentos (FLIR, dron, RIDGID, Bosch)',
  },
  {
    aspecto: 'Negociación',
    corredor: 'Facilita el cierre al precio publicado',
    buyerAgent: 'Negocia el precio con evidencia técnica documentada',
  },
  {
    aspecto: 'Informe al cliente',
    corredor: 'Ninguno o solo administrativo',
    buyerAgent: 'Informe técnico con hallazgos valorizados en UF',
  },
];

const faqs = [
  {
    q: '¿Cuánto cobra un buyer\'s agent en Chile?',
    a: 'DOMIS™ tiene una estructura de honorarios diferenciada por fase. La Fase 1 (auditoría técnica) se cotiza por metro cuadrado según tipo de propiedad, con mínimo de 100m². La Fase 2 (negociación) se estructura sobre el resultado. Para cotizar tu caso escribe a ariel@domis.cl.',
  },
  {
    q: '¿En qué se diferencia un buyer\'s agent de un corredor de propiedades?',
    a: 'Un corredor tradicional en Chile representa al vendedor aunque aparente representar a ambas partes. Un buyer\'s agent representa exclusivamente al comprador, sin conflicto de interés: su trabajo es lograr el mejor precio y condiciones para quien compra, no cerrar la operación al precio publicado.',
  },
  {
    q: '¿Es legal usar un buyer\'s agent en Chile?',
    a: 'Sí, completamente. No existe impedimento legal para contratar representación técnica independiente al comprar una propiedad. DOMIS™ opera bajo ARAX SpA, empresa chilena constituida ante notario.',
  },
  {
    q: '¿Un buyer\'s agent reemplaza al notario o al abogado?',
    a: 'No. El buyer\'s agent actúa en la etapa técnica y comercial de la compra, antes de la promesa. El notario y el abogado gestionan el estudio de títulos y los aspectos legales. DOMIS™ trabaja complementariamente con los asesores legales del comprador.',
  },
  {
    q: '¿DOMIS™ trabaja con propiedades nuevas y usadas?',
    a: 'Sí. Para propiedades usadas, la auditoría técnica detecta vicios ocultos y genera argumentos de negociación. Para propiedades nuevas, la inspección documenta defectos antes de firmar el acta de entrega, para activar la garantía legal de 3, 5 y 10 años.',
  },
  {
    q: '¿En qué comunas opera DOMIS™?',
    a: 'Toda la Región Metropolitana: Las Condes, Providencia, La Reina, Vitacura, Lo Barnechea, Ñuñoa, Macul, La Florida y Peñalolén. Para propiedades fuera de Santiago se evalúa con recargo.',
  },
];

export default function ArticuloBuyerAgent() {
  return (
    <BlogLayout meta={meta}>

      {/* Badge + fecha */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <Users size={10} /> Buyer\'s Agent · Mercado Inmobiliario Chile
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 7 min lectura</span>
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Buyer's agent en Chile:<br />
        <span className="text-cyan-400 italic">qué es y por qué el mercado lo necesitaba</span>
      </h1>

      {/* Intro */}
      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Cuando compras una propiedad en Chile, todos los actores del proceso trabajan para el vendedor: la inmobiliaria, el corredor, el ejecutivo de la constructora. Tú llegas solo a una de las decisiones financieras más importantes de tu vida, armado solo con entusiasmo y esperanza.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        Un <strong className="text-white">buyer's agent</strong> — o agente del comprador — existe para corregir esa asimetría. Trabaja exclusivamente para ti. Sin conflicto de interés. Con evidencia técnica real.
      </p>

      {/* Sección 1 */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        El problema estructural del mercado inmobiliario chileno
      </h2>
      <div className="bg-slate-900 border border-red-500/20 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="text-red-400 shrink-0 mt-1" size={24} />
          <div>
            <p className="text-white font-bold mb-2">En Chile, el corredor siempre cobra del vendedor.</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Aunque parezca que te está ayudando a buscar tu propiedad ideal, el corredor inmobiliario tiene un único incentivo: cerrar la operación al precio más alto posible. Más precio de venta = mayor comisión para él. Ese es el conflicto de interés que nadie te explica antes de firmar.
            </p>
          </div>
        </div>
      </div>
      <p className="text-slate-400 leading-relaxed mb-10">
        En mercados inmobiliarios maduros como Estados Unidos, Australia o Reino Unido, la figura del buyer's agent existe hace décadas. El comprador contrata su propio representante, que actúa exclusivamente en su favor durante todo el proceso. En Chile, esa figura no existía — hasta ahora.
      </p>

      {/* Sección 2 */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Qué es un buyer's agent
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        Un buyer's agent es un profesional que representa exclusivamente al comprador en una transacción inmobiliaria. Sus responsabilidades pueden incluir búsqueda de propiedades, inspección técnica, análisis de mercado y negociación del precio — siempre en beneficio del comprador, sin ningún vínculo económico con el vendedor.
      </p>
      <p className="text-slate-400 leading-relaxed mb-10">
        La clave es la <strong className="text-white">exclusividad de representación</strong>: un buyer's agent no puede al mismo tiempo representar al vendedor en otra operación y al comprador en esta. Su único cliente en cada transacción es quien compra.
      </p>

      {/* Tabla comparativa */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Corredor tradicional vs. buyer's agent: la diferencia real
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-slate-500 text-[11px] uppercase tracking-widest py-3 pr-4 font-bold w-1/3">Aspecto</th>
              <th className="text-left text-slate-400 text-[11px] uppercase tracking-widest py-3 pr-4 font-bold w-1/3">Corredor tradicional</th>
              <th className="text-left text-cyan-400 text-[11px] uppercase tracking-widest py-3 font-bold w-1/3">Buyer's Agent (DOMIS™)</th>
            </tr>
          </thead>
          <tbody>
            {diferencias.map((d, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="text-slate-300 font-bold py-3 pr-4">{d.aspecto}</td>
                <td className="text-slate-500 py-3 pr-4 leading-snug">{d.corredor}</td>
                <td className="text-cyan-300 py-3 leading-snug">{d.buyerAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sección DOMIS */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        DOMIS™: el primer Buyer's Agent Técnico de Chile
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        DOMIS™ va más allá del concepto tradicional de buyer's agent porque combina la representación exclusiva del comprador con inspección técnica profesional de la propiedad. Esto es lo que lo hace único:
      </p>

      <div className="space-y-4 mb-10">
        {[
          {
            icon: <ShieldCheck size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
            titulo: 'Auditoría PCF-15™',
            desc: 'Inspección técnica con cámara térmica FLIR, dron DJI, detector de gas RIDGID Professional y nivelador Bosch. Detectamos lo que no se ve en una visita normal: humedad detrás de muros, instalaciones eléctricas fuera de norma, filtraciones activas, niveles incorrectos.',
          },
          {
            icon: <TrendingDown size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
            titulo: 'Negociación basada en evidencia',
            desc: 'Cada hallazgo técnico se valoriza en UF. Se cruza con análisis de tasación de mercado y comparables reales. El resultado es un informe de negociación con tres escenarios (agresivo, moderado, conservador) que el comprador lleva a la mesa con respaldo técnico documentado.',
          },
          {
            icon: <CheckCircle size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
            titulo: 'Sin conflicto de interés',
            desc: 'DOMIS™ no representa al vendedor en ninguna circunstancia. No tiene convenios con inmobiliarias ni constructoras. El único cliente en cada operación es el comprador.',
          },
          {
            icon: <Users size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
            titulo: 'Remodelación post-compra',
            desc: 'Al conocer cada detalle técnico de la propiedad desde la auditoría, DOMIS™ puede ejecutar la remodelación posterior sin sorpresas ni costos ocultos. El presupuesto es real porque partimos del estado real del inmueble.',
          },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 p-5 bg-slate-900 rounded-2xl border border-white/5">
            {item.icon}
            <div>
              <h3 className="text-white font-black uppercase tracking-tight text-sm mb-1">{item.titulo}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA intermedio */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tight mb-2">¿Estás evaluando una propiedad en Santiago?</p>
        <p className="text-slate-400 text-sm mb-4">La auditoría técnica DOMIS™ te da los argumentos reales para negociar.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, leí el artículo sobre buyer's agent y quiero más información sobre DOMIS™."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Solicitar información <ArrowRight size={14} />
        </a>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Preguntas frecuentes sobre buyer's agent en Chile
      </h2>
      <div className="space-y-4 mb-10">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-black text-sm mb-2">{faq.q}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Lectura relacionada */}
      <div className="border-t border-white/10 pt-8">
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Lectura relacionada</p>
        <a
          href="/blog/que-revisar-al-comprar-propiedad-usada-santiago"
          className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group"
        >
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Guía técnica</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">
              Qué revisar al comprar una propiedad usada en Santiago: checklist PCF-15™
            </p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
      </div>

    </BlogLayout>
  );
}
