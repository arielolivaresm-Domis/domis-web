import { Scale, CheckCircle, ArrowRight, AlertTriangle, Clock } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Vicios ocultos en propiedad Chile: qué son, plazo legal para reclamar y cómo detectarlos antes de comprar | DOMIS™',
  description: 'Vicios ocultos en propiedades en Chile: qué dice el Código Civil (art. 1860), cuánto tiempo tienes para reclamar, quién paga y cómo detectarlos con inspección técnica antes de firmar.',
  url: 'https://www.domis.cl/blog/vicios-ocultos-propiedad-chile',
  datePublished: '2026-06-27',
};

const requisitos = [
  {
    req: 'El defecto existía al momento de la compra',
    desc: 'No puede ser un daño causado por el comprador después de la entrega. Debe probarse que el problema preexistía a la firma de la escritura.',
  },
  {
    req: 'No era visible en una inspección normal',
    desc: 'Si el defecto era aparente (visible a simple vista), no califica como vicio oculto. La ley presume que el comprador vio lo visible.',
  },
  {
    req: 'El comprador no lo conocía',
    desc: 'Si el vendedor declaró el problema en el contrato o el comprador lo conocía, no puede reclamarse como vicio oculto.',
  },
  {
    req: 'Afecta el uso normal o el valor de la propiedad',
    desc: 'Defectos puramente estéticos sin impacto funcional o económico no califican como vicios redhibitorios bajo el Código Civil.',
  },
];

const faqs = [
  {
    q: '¿Qué son los vicios ocultos en una propiedad en Chile?',
    a: 'Los vicios ocultos (o vicios redhibitorios) son defectos que existían en la propiedad al momento de la compra, que no eran visibles en una inspección normal y que afectan el uso o valor del inmueble. En Chile están regulados por el Código Civil (artículos 1857–1870). El vendedor responde por ellos aunque no los haya conocido.',
  },
  {
    q: '¿Cuánto tiempo hay para reclamar vicios ocultos en Chile?',
    a: 'El plazo para ejercer la acción redhibitoria (resolución del contrato) es 1 año desde la entrega de la propiedad para bienes raíces. El plazo para la acción quanti minoris (rebaja del precio) es 18 meses. Estos plazos son de prescripción — si los dejas pasar, pierdes el derecho aunque el defecto sea grave.',
  },
  {
    q: '¿Quién paga los vicios ocultos de una vivienda en Chile?',
    a: 'El vendedor. Si el vicio oculto existía antes de la venta, el vendedor debe restituir el precio (si el comprador devuelve la propiedad) o rebajar el precio en proporción al defecto. Si el vendedor lo conocía y no lo declaró, también debe indemnizar perjuicios. Si no lo conocía, solo responde por la restitución o rebaja.',
  },
  {
    q: '¿Qué dice el artículo 1860 del Código Civil de Chile sobre vicios ocultos?',
    a: 'El artículo 1860 establece que los vicios redhibitorios dan derecho al comprador a ejercer la acción redhibitoria (pedir la resolución del contrato) o la acción quanti minoris (pedir rebaja del precio). El artículo 1858 define los requisitos: el vicio debe existir al tiempo de la venta, ser grave (impedir uso normal o reducir valor significativamente) y no ser conocido por el comprador.',
  },
  {
    q: '¿Qué diferencia hay entre vicio oculto y falla oculta?',
    a: '"Vicio oculto" es el término legal del Código Civil — define el defecto desde el punto de vista jurídico y da derecho a acciones legales. "Falla oculta" es el término técnico — describe el defecto desde el punto de vista constructivo (humedad, fisura, instalación deficiente). Son el mismo problema visto desde dos ángulos: el técnico lo detecta, el abogado lo reclama.',
  },
  {
    q: '¿Cómo probar un vicio oculto después de comprar?',
    a: 'Necesitas evidencia técnica: informe de un profesional (constructor civil, ingeniero o auditor técnico) que documente el defecto con fotos, descripción técnica y valorización. Ese informe es la base de cualquier demanda o negociación extrajudicial. Por eso la mejor estrategia es tener ese informe ANTES de comprar — para negociar el precio en lugar de ir a juicio.',
  },
];

export default function ArticuloViciosOcultos() {
  return (
    <BlogLayout meta={meta}>

      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <Scale size={10} /> Vicios ocultos · Ley Chile
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 7 min lectura</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Vicios ocultos en propiedad Chile:<br />
        <span className="text-cyan-400 italic">plazo legal, quién paga y cómo detectarlos antes de comprar</span>
      </h1>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Compraste una casa. Dos meses después aparece humedad activa detrás de cada muro. La instalación eléctrica está intervenida sin seguir norma SEC. El vendedor dice que no sabía nada. ¿Qué dice la ley?
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        El Código Civil chileno te protege — pero solo si actúas dentro del plazo y tienes evidencia técnica. Esta guía explica qué son los vicios ocultos, cuánto tiempo tienes para reclamar y por qué detectarlos antes de comprar siempre es mejor que reclamarlos después.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Qué son los vicios ocultos según la ley chilena
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        El Código Civil los llama <strong className="text-white">vicios redhibitorios</strong>. Son defectos que existían en la propiedad al momento de la compra, que no eran visibles en una inspección ordinaria, y que afectan el uso normal del inmueble o reducen su valor.
      </p>
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 mb-4">
        <div className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-2">Código Civil — Artículo 1858</div>
        <p className="text-slate-300 text-sm leading-relaxed italic">
          "Son vicios redhibitorios los que reúnen las calidades siguientes: 1° haber existido al tiempo de la venta; 2° ser tales, que por ellos la cosa vendida no sirva para su uso natural, o solo sirva imperfectamente, de manera que sea de presumir que conociéndolos el comprador no la hubiera comprado o la hubiera comprado a mucho menos precio; 3° no haberlos manifestado el vendedor, y ser tales que el comprador haya podido ignorarlos sin negligencia grave de su parte."
        </p>
      </div>
      <p className="text-slate-500 text-xs mb-10">Artículo 1860: el comprador puede pedir resolución del contrato (acción redhibitoria) o rebaja del precio (acción quanti minoris).</p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Los 4 requisitos para que un defecto sea vicio oculto
      </h2>
      <div className="space-y-4 mb-10">
        {requisitos.map((r, i) => (
          <div key={i} className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-cyan-400 font-black text-[10px]">{i + 1}</span>
              </div>
              <div>
                <h3 className="text-white font-black text-sm mb-1">{r.req}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{r.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Plazos legales para reclamar vicios ocultos en Chile
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
          <Clock size={20} className="text-cyan-400 mb-3" />
          <div className="text-white font-black text-lg mb-1">1 año</div>
          <div className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-2">Acción redhibitoria</div>
          <p className="text-slate-400 text-xs leading-relaxed">Resolución del contrato + restitución del precio. Desde la entrega de la propiedad.</p>
        </div>
        <div className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
          <Clock size={20} className="text-amber-400 mb-3" />
          <div className="text-white font-black text-lg mb-1">18 meses</div>
          <div className="text-[10px] text-amber-400 font-black uppercase tracking-widest mb-2">Acción quanti minoris</div>
          <p className="text-slate-400 text-xs leading-relaxed">Rebaja del precio proporcional al vicio. Desde la entrega de la propiedad.</p>
        </div>
      </div>
      <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-10">
        <div className="flex items-start gap-3">
          <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">Plazos de prescripción:</strong> si los dejas pasar, pierdes el derecho aunque el vicio sea grave y evidente. El reloj parte desde la entrega de la propiedad, no desde que descubres el problema.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        El problema de reclamar después: por qué detectar antes es siempre mejor
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        Reclamar vicios ocultos después de la compra es posible — pero es lento, costoso e incierto:
      </p>
      <div className="space-y-3 mb-6">
        {[
          'Necesitas un informe técnico pericial para probar que el defecto existía antes de la compra',
          'El proceso judicial puede tardar 2–4 años en primera instancia',
          'El vendedor puede alegar que el daño lo causaste tú después de la entrega',
          'Los costos de abogados y peritajes pueden superar el valor del vicio reclamado',
          'Mientras tanto, vives con el problema o pagas la reparación de tu bolsillo',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <AlertTriangle size={14} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-slate-400 text-sm">{item}</p>
          </div>
        ))}
      </div>
      <p className="text-slate-300 leading-relaxed mb-4 font-black">La alternativa inteligente: detectar el vicio antes de comprar con una auditoría técnica.</p>
      <div className="space-y-3 mb-10">
        {[
          'El informe PCF-15™ documenta cada defecto antes de la promesa',
          'El vendedor no puede negar lo que está fotografiado y valorizado',
          'El defecto se convierte en argumento de negociación: rebaja del precio antes de firmar',
          'No hay juicio, no hay espera, no hay incertidumbre',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm">{item}</p>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tight mb-2">Detecta los vicios ocultos antes de comprar</p>
        <p className="text-slate-400 text-sm mb-4">Auditoría técnica PCF-15™ con informe que documenta cada defecto antes de la promesa.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero detectar vicios ocultos en una propiedad en Santiago antes de comprar."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Agendar auditoría <ArrowRight size={14} />
        </a>
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">Preguntas frecuentes</h2>
      <div className="space-y-4 mb-10">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-black text-sm mb-2">{faq.q}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 pt-8 space-y-4">
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Lecturas relacionadas</p>
        <a href="/blog/fallas-ocultas-casas-usadas-santiago" className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group">
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Fallas ocultas</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">Fallas ocultas en casas usadas: lo que no ves en la visita puede costarte millones</p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
        <a href="/blog/como-negociar-precio-propiedad-usada-santiago" className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group">
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Negociación</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">Cómo negociar el precio de una propiedad usada con evidencia técnica</p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
      </div>

    </BlogLayout>
  );
}
