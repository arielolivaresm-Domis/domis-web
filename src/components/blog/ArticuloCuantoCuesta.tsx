import { DollarSign, CheckCircle, ArrowRight, TrendingDown } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Cuánto cuesta una auditoría técnica de propiedad en Santiago | DOMIS™',
  description: 'Precio de la auditoría técnica PCF-15™ de DOMIS™: $1.900/m² + IVA propiedad usada, $1.800/m² + IVA propiedad nueva. Mínimo 100m². ¿Vale la pena? Los números hablan solos.',
  url: 'https://www.domis.cl/blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago',
  datePublished: '2026-06-26',
};

const incluye = [
  'Inspección no destructiva con cámara térmica FLIR (humedad y filtraciones ocultas)',
  'Dron DJI — inspección de techumbre y fachada completa',
  'Detector de gas RIDGID Professional',
  'Nivelador láser Bosch — niveles, plomadas y dimensiones reales',
  'Informe técnico PCF-15™ con los 15 puntos del protocolo',
  'Valorización de cada hallazgo en UF',
  'Análisis de entorno radio 3km (metro, colegios PAES, seguridad, comercio)',
  'Entrega en 72 horas hábiles',
];

const comparacion = [
  { item: 'Auditoría técnica DOMIS™ (100m²)', precio: '$190.000 + IVA', nota: 'Precio base mínimo' },
  { item: 'Auditoría técnica DOMIS™ (130m²)', precio: '$247.000 + IVA', nota: 'Depto típico Providencia' },
  { item: 'Auditoría técnica DOMIS™ (160m²)', precio: '$304.000 + IVA', nota: 'Casa o depto grande' },
  { item: 'Notaría promesa de compraventa', precio: '~$150.000', nota: 'No detecta fallas' },
  { item: 'Corredor (comisión 2% vendedor)', precio: '$2.000.000+', nota: 'Representa al vendedor' },
];

const faqs = [
  {
    q: '¿Cuánto cuesta una auditoría técnica inmobiliaria en Santiago?',
    a: 'La auditoría PCF-15™ de DOMIS™ tiene un precio de $1.900/m² + IVA para propiedades usadas y $1.800/m² + IVA para propiedades nuevas. El mínimo facturable es 100m², lo que equivale a $190.000 o $180.000 + IVA respectivamente. Si incluyes el servicio de sourcing (búsqueda), el precio es $2.200/m² + IVA.',
  },
  {
    q: '¿Vale la pena pagar una auditoría técnica antes de comprar una propiedad?',
    a: 'Sí, y la matemática lo confirma. En los casos documentados de DOMIS™, la auditoría técnica generó ahorros de $39.6M, $68.2M y $141.7M sobre el precio de publicación — entre 9% y 18%. El costo de la auditoría en esos mismos casos representó menos del 1% del valor de la propiedad. Sin auditoría, compras a ciegas y pagas el precio inflado del vendedor.',
  },
  {
    q: '¿Qué pasa si la auditoría no encuentra nada?',
    a: 'Igual vale la pena. Si la propiedad no tiene fallas significativas, tienes certeza técnica de lo que compras — información que ninguna visita normal te da. Además, "sin fallas detectadas" es también un argumento: el precio publicado ya es el precio real, sin margen adicional para pedir rebaja sin respaldo. DOMIS™ te dice la verdad en ambos casos.',
  },
  {
    q: '¿Cuánto cuesta la inspección de una propiedad nueva?',
    a: 'Para propiedades nuevas (pre-recepción o bajo garantía legal), el precio es $1.800/m² + IVA, mínimo 100m² ($180.000 + IVA). La inspección antes de firmar el acta de entrega de la constructora documenta todos los defectos existentes, lo que activa la garantía legal de 3, 5 y 10 años sobre lo específicamente detectado.',
  },
  {
    q: '¿Cuánto cobra un inspector de propiedades en Chile?',
    a: 'Depende del servicio. Servicios de inspección básica en Chile oscilan entre $80.000 y $200.000 sin valorización técnica de hallazgos ni estrategia de negociación. La auditoría PCF-15™ de DOMIS™ parte desde $190.000 + IVA e incluye además el informe con hallazgos valorizados en UF y el respaldo para negociar el precio con evidencia técnica documentada.',
  },
  {
    q: '¿El costo de la auditoría se descuenta si contrato la negociación después?',
    a: 'Sí. Si contratas la Fase 2 (negociación) después de la Fase 1 (auditoría) y la negociación resulta en una Promesa firmada, se acredita un porcentaje del costo de Fase 1 como saldo a favor en el pago final de Fase 2. Consulta las condiciones exactas al contratar.',
  },
];

export default function ArticuloCuantoCuesta() {
  return (
    <BlogLayout meta={meta}>

      {/* Badge + fecha */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <DollarSign size={10} /> Precios · Auditoría técnica
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 5 min lectura</span>
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Cuánto cuesta una auditoría técnica de propiedad en Santiago:<br />
        <span className="text-cyan-400 italic">precios, qué incluye y si vale la pena</span>
      </h1>

      {/* Intro */}
      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        La pregunta directa merece una respuesta directa. La auditoría técnica PCF-15™ de DOMIS™ tiene precio público y conocido — sin cotizaciones de "depende" ni rangos vagos.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        Acá están todos los números, lo que incluye el servicio y por qué la matemática dice que sí vale la pena.
      </p>

      {/* Tabla de precios */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Precios auditoría técnica DOMIS™ — Santiago 2026
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {[
          { tipo: 'Propiedad Usada', precio: '$1.900', unit: '/m² + IVA', desc: 'Compra o venta', highlight: true },
          { tipo: 'Propiedad Nueva', precio: '$1.800', unit: '/m² + IVA', desc: 'Pre-recepción / garantía', highlight: false },
          { tipo: 'Sourcing + Auditoría', precio: '$2.200', unit: '/m² + IVA', desc: 'Búsqueda incluida', highlight: false },
        ].map((p, i) => (
          <div key={i} className={`p-5 rounded-2xl border text-center ${p.highlight ? 'bg-cyan-500/10 border-cyan-500/40' : 'bg-slate-900 border-white/10'}`}>
            <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${p.highlight ? 'text-cyan-400' : 'text-slate-500'}`}>{p.tipo}</div>
            <div className={`text-3xl font-black font-mono mb-1 ${p.highlight ? 'text-white' : 'text-white'}`}>{p.precio}</div>
            <div className="text-slate-400 text-xs mb-1">{p.unit}</div>
            <div className="text-slate-500 text-[10px]">{p.desc}</div>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs uppercase tracking-widest text-center mb-10">Mínimo facturable: 100m² · Región Metropolitana · Valores en CLP</p>

      {/* Ejemplos */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        ¿Cuánto pago según los m² de mi propiedad?
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-slate-500 text-[11px] uppercase tracking-widest py-3 pr-4 font-bold">Servicio</th>
              <th className="text-left text-cyan-400 text-[11px] uppercase tracking-widest py-3 pr-4 font-bold">Precio estimado</th>
              <th className="text-left text-slate-500 text-[11px] uppercase tracking-widest py-3 font-bold">Referencia</th>
            </tr>
          </thead>
          <tbody>
            {comparacion.map((c, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="text-slate-300 py-3 pr-4 leading-snug">{c.item}</td>
                <td className="text-white font-black font-mono py-3 pr-4">{c.precio}</td>
                <td className="text-slate-500 text-xs py-3">{c.nota}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Qué incluye */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Qué incluye la auditoría PCF-15™
      </h2>
      <div className="space-y-3 mb-10">
        {incluye.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>

      {/* Vale la pena */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        ¿Vale la pena el costo de la auditoría?
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        La respuesta está en los números de los propios casos de DOMIS™:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { zona: 'La Reina', ahorro: '$141.7M', costo_aprox: '~$250k', ratio: '566x', pct: '18%' },
          { zona: 'Providencia', ahorro: '$68.2M', costo_aprox: '~$230k', ratio: '296x', pct: '11%' },
          { zona: 'Las Condes', ahorro: '$39.6M', costo_aprox: '~$210k', ratio: '188x', pct: '9%' },
        ].map((c, i) => (
          <div key={i} className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{c.zona}</div>
            <div className="text-2xl font-black font-mono text-cyan-400 mb-1">{c.ahorro}</div>
            <div className="text-slate-500 text-xs mb-2">ahorro logrado ({c.pct})</div>
            <div className="text-slate-400 text-xs">Costo auditoría aprox. {c.costo_aprox}</div>
            <div className="text-white font-black text-xs mt-1">Retorno: {c.ratio} el costo</div>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs text-center mb-10">Casos de referencia DOMIS™. El costo exacto de auditoría varía según m² de cada caso.</p>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10">
        <TrendingDown size={24} className="text-cyan-400 mb-3" />
        <p className="text-white font-black mb-2">La auditoría cuesta menos del 1% del valor de la propiedad.</p>
        <p className="text-slate-400 text-sm leading-relaxed">
          Para una propiedad de $150M, la auditoría de 120m² cuesta ~$228.000 + IVA — el 0.15% del valor. Si la auditoría detecta fallas que permiten negociar un 9% de descuento, eso son $13.5M. La pregunta real no es si vale la pena pagar la auditoría. Es si vale la pena no pagarla.
        </p>
      </div>

      {/* Fase 2 */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        ¿Cuánto cobra DOMIS™ por la negociación?
      </h2>
      <p className="text-slate-400 leading-relaxed mb-4">
        La Fase 2 (negociación estratégica) tiene una estructura diferente a la Fase 1: se cobra sobre el resultado. El honorario es el <strong className="text-white">10% del ahorro real generado</strong>, más un fee de activación al inicio del proceso.
      </p>
      <p className="text-slate-400 leading-relaxed mb-10">
        Si contrataste Fase 1 con DOMIS™ y la negociación resulta exitosa (Promesa firmada), se acredita un porcentaje del costo de la auditoría como saldo a favor en el pago final de Fase 2.
      </p>

      {/* CTA */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tight mb-2">¿Cuántos m² tiene tu propiedad?</p>
        <p className="text-slate-400 text-sm mb-4">Escríbenos y te confirmamos el precio exacto para tu caso.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero cotizar una auditoría técnica PCF-15™ para una propiedad en Santiago."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Cotizar mi auditoría <ArrowRight size={14} />
        </a>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Preguntas frecuentes sobre precios de auditoría técnica
      </h2>
      <div className="space-y-4 mb-10">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-black text-sm mb-2">{faq.q}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* Lecturas relacionadas */}
      <div className="border-t border-white/10 pt-8 space-y-4">
        <p className="text-slate-500 text-xs uppercase tracking-widest mb-4">Lecturas relacionadas</p>
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
        <a
          href="/blog/como-negociar-precio-propiedad-usada-santiago"
          className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group"
        >
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Negociación</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">
              Cómo negociar el precio de una propiedad usada en Santiago con evidencia técnica
            </p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
      </div>

    </BlogLayout>
  );
}
