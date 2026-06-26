import { XCircle, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Errores al comprar propiedad usada en Santiago: los 7 más comunes y cómo evitarlos | DOMIS™',
  description: 'Los errores más comunes al comprar una propiedad usada en Santiago cuestan millones. Guía completa: qué revisar antes de firmar la promesa, los riesgos más frecuentes y cómo protegerte.',
  url: 'https://www.domis.cl/blog/errores-comprar-propiedad-usada-santiago',
  datePublished: '2026-06-26',
};

const errores = [
  {
    error: 'Firmar la promesa antes de inspeccionar',
    desc: 'El error más costoso y el más frecuente. Una vez firmada la promesa con precio acordado, perdiste tu principal palanca de negociación. Cualquier falla que descubras después es tu problema, no del vendedor — a menos que quieras ir a juicio.',
    consecuencia: 'Pagas el precio inflado del vendedor. Las fallas detectadas post-firma son tu costo.',
    fix: 'Auditoría técnica ANTES de la promesa, siempre.',
  },
  {
    error: 'Confiar en la inspección visual propia',
    desc: 'Visitar la propiedad con un familiar arquitecto, un amigo ingeniero o simplemente con ojo propio no reemplaza una inspección técnica con instrumental. La humedad detrás de un muro recién pintado, una ampliación sin permiso o una instalación eléctrica intervenida no se ven a simple vista.',
    consecuencia: 'Compras sin conocer el estado real. Descubres los problemas después.',
    fix: 'Instrumental profesional: cámara térmica, dron, detector gas, nivelador láser.',
  },
  {
    error: 'No verificar la superficie real vs escritura',
    desc: 'Muchas propiedades usadas tienen metros cuadrados físicos que no coinciden con lo declarado en escritura. Ampliaciones de terraza, cierre de garage, segundo piso sin permiso. Pagas por metros ilegales que no existen para el banco ni para la DOM.',
    consecuencia: 'Crédito hipotecario reducido, tasación inferior, multas municipales y problemas al revender.',
    fix: 'Medición con nivelador láser y comparación contra escritura, planos DOM y SII.',
  },
  {
    error: 'Creerle al corredor del vendedor',
    desc: 'El corredor es pagado por el vendedor. Su comisión depende del cierre al precio más alto posible. Cuando dice "la propiedad está en perfectas condiciones" o "ya hay otras ofertas", su incentivo económico no es tu bienestar.',
    consecuencia: 'Tomas decisiones con información sesgada a favor del vendedor.',
    fix: 'Representación exclusiva del comprador. DOMIS™ no tiene ningún vínculo económico con el vendedor.',
  },
  {
    error: 'Negociar sin argumentos técnicos',
    desc: 'Ofrecer un 8% menos porque "el mercado lo permite" o porque "se ve deteriorada" es fácil de rechazar. Una oferta respaldada por un informe técnico con hallazgos valorizados en UF es mucho más difícil de ignorar.',
    consecuencia: 'Descuentos de 3–5% cuando con evidencia técnica podrían ser 9–18%.',
    fix: 'Informe de negociación con hallazgos valorizados antes de presentar oferta.',
  },
  {
    error: 'No revisar la documentación legal',
    desc: 'Escritura, certificado de dominio vigente, planos aprobados, recepción final, certificado de hipotecas y gravámenes, informe de deudas de gastos comunes. Cada documento puede revelar problemas: hipotecas no alzadas, demandas pendientes, ampliaciones no regularizadas.',
    consecuencia: 'Compras una propiedad con problemas legales que bloquean el crédito o que heredas.',
    fix: 'Revisión de documentación como parte del protocolo de auditoría.',
  },
  {
    error: 'Apurarse por miedo a perder la propiedad',
    desc: 'El corredor dice "hay otra oferta". El vendedor pone plazo. La sensación de urgencia es una táctica de negociación clásica. En el mercado inmobiliario de Santiago, propiedades buenas toman semanas — no horas.',
    consecuencia: 'Saltas pasos críticos por urgencia artificial. Después no hay vuelta atrás.',
    fix: 'Tener el proceso claro antes de empezar a buscar. Si pierdes esa propiedad, hay otra.',
  },
];

const timeline = [
  { paso: 'Visita la propiedad', accion: 'Si te interesa, no firmes nada todavía' },
  { paso: 'Agenda la auditoría PCF-15™', accion: 'Antes de cualquier oferta escrita' },
  { paso: 'Recibe el informe técnico', accion: '72 horas hábiles después de la auditoría' },
  { paso: 'Presenta la oferta con respaldo', accion: 'El informe es tu argumento de negociación' },
  { paso: 'Firma la promesa con precio negociado', accion: 'Con precio que refleja el estado real' },
  { paso: 'Escritura', accion: 'Con certeza técnica documentada' },
];

const faqs = [
  {
    q: '¿Cuáles son los errores más comunes al comprar propiedad usada en Chile?',
    a: 'Los más frecuentes: firmar la promesa antes de inspeccionar, confiar en la inspección visual sin instrumental, no verificar metros cuadrados reales vs escritura, creerle al corredor del vendedor, negociar sin argumentos técnicos, no revisar documentación legal y apurarse por presión artificial del vendedor.',
  },
  {
    q: '¿Qué revisar antes de firmar la promesa de compraventa?',
    a: 'Antes de firmar la promesa debes tener: (1) auditoría técnica con instrumentos profesionales, (2) verificación de superficie real vs escritura, (3) revisión de documentación legal (escritura, planos DOM, recepción final, certificado de hipotecas), (4) análisis de tasación de mercado, y (5) estrategia de negociación basada en hallazgos. DOMIS™ cubre todos estos puntos.',
  },
  {
    q: '¿Qué riesgos tiene comprar una propiedad usada sin inspección?',
    a: 'Humedad activa oculta (reparación desde UF 20), instalación eléctrica fuera de norma (riesgo incendio + costo desde UF 15), ampliaciones sin permiso (multa + demolición posible), daños estructurales sin reparar (desde UF 30) y techumbre deteriorada (desde UF 15). En total, un comprador sin inspección puede enfrentar reparaciones de UF 50–200 que no anticipó en el precio.',
  },
  {
    q: '¿Cómo sé si el precio de una propiedad usada está inflado?',
    a: 'Comparar con propiedades similares en la misma zona es un punto de partida, pero no es suficiente — los avisos publicados incluyen margen de negociación. El análisis real cruza avalúo fiscal, datos del CBR (operaciones cerradas reales) y tasación técnica. DOMIS™ incluye este análisis en la Fase 2 como respaldo para la negociación.',
  },
];

export default function ArticuloErrores() {
  return (
    <BlogLayout meta={meta}>

      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <AlertTriangle size={10} /> Guía comprador · Riesgos
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 8 min lectura</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        7 errores al comprar propiedad usada en Santiago<br />
        <span className="text-cyan-400 italic">y cómo evitar cada uno</span>
      </h1>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Comprar una propiedad usada en Santiago es complejo. No porque el proceso sea difícil de entender — sino porque hay múltiples momentos donde una decisión apresurada o una omisión pueden costarte millones.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        Esta guía cubre los 7 errores más frecuentes que cometen los compradores en el mercado de Santiago y qué hacer en cada caso.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Los 7 errores más comunes — y sus consecuencias reales
      </h2>

      <div className="space-y-5 mb-12">
        {errores.map((e, i) => (
          <div key={i} className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-white/5">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0">
                  <XCircle size={14} className="text-red-400" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Error #{i + 1}</div>
                  <h3 className="text-white font-black text-sm uppercase tracking-tight">{e.error}</h3>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed pl-11">{e.desc}</p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-white/5">
              <div className="p-4">
                <div className="text-[9px] text-red-400 font-black uppercase tracking-widest mb-1">Consecuencia</div>
                <p className="text-slate-500 text-xs leading-relaxed">{e.consecuencia}</p>
              </div>
              <div className="p-4">
                <div className="text-[9px] text-cyan-400 font-black uppercase tracking-widest mb-1 flex items-center gap-1">
                  <CheckCircle size={9} /> Fix
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{e.fix}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        El orden correcto para comprar una propiedad usada en Santiago
      </h2>
      <div className="space-y-3 mb-10">
        {timeline.map((t, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                <span className="text-slate-950 font-black text-xs">{i + 1}</span>
              </div>
              {i < timeline.length - 1 && <div className="w-px h-6 bg-white/10 mt-1" />}
            </div>
            <div className="pb-3">
              <div className="text-white font-black text-sm">{t.paso}</div>
              <div className="text-slate-400 text-xs mt-0.5">{t.accion}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tight mb-2">¿Vas a comprar propiedad usada en Santiago?</p>
        <p className="text-slate-400 text-sm mb-4">DOMIS™ cubre todos los pasos del proceso: auditoría técnica, verificación documental, análisis de mercado y negociación.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, estoy buscando propiedad usada en Santiago y quiero información sobre la auditoría técnica DOMIS™."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Hablar con DOMIS™ <ArrowRight size={14} />
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
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">Fallas ocultas en casas usadas: lo que no ves puede costarte millones</p>
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
