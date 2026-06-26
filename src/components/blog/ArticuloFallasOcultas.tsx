import { AlertTriangle, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Fallas ocultas en casas usadas: qué son, cómo detectarlas y qué cuestan | DOMIS™',
  description: 'Las fallas ocultas en casas usadas son invisibles en una visita normal pero pueden costar millones en reparaciones. Guía completa: tipos, cómo detectarlas con cámara térmica y qué hacer antes de firmar.',
  url: 'https://www.domis.cl/blog/fallas-ocultas-casas-usadas-santiago',
  datePublished: '2026-06-26',
};

const fallas = [
  {
    tipo: 'Humedad oculta y filtraciones activas',
    desc: 'La más frecuente y la más costosa. El agua entra por la losa, los muros o las uniones de ventanas y se acumula detrás del revestimiento. Visualmente parece perfecta. Con cámara térmica FLIR aparece como una mancha fría en el mapa térmico — inconfundible.',
    costo: 'UF 20–80 según magnitud y ubicación',
    visible: false,
  },
  {
    tipo: 'Instalación eléctrica fuera de norma',
    desc: 'Empalmes mal ejecutados, tableros subdimensionados, circuitos sin tierra o sin diferencial. No se ve. No se huele. Pero es riesgo real de incendio. Solo se detecta revisando el tablero, los circuitos y midiendo con multímetro.',
    costo: 'UF 15–60 según antigüedad y superficie',
    visible: false,
  },
  {
    tipo: 'Fisuras y daños estructurales',
    desc: 'Fisuras en muros de hormigón o albañilería que el propietario tapó con estuque y pintura. Pueden ser cosméticas o estructurales — la diferencia importa. Se detectan con nivelador láser y revisión sistemática de todo el perímetro.',
    costo: 'UF 10–120 según profundidad y extensión',
    visible: false,
  },
  {
    tipo: 'Ampliaciones sin permiso',
    desc: 'Metros cuadrados que aparecen en la propiedad física pero no en la escritura. La superficie real difiere de la declarada. Esto impide regularizar, genera problemas en crédito hipotecario y puede derivar en demolición.',
    costo: 'UF 5–30 regularización o pérdida total del área',
    visible: false,
  },
  {
    tipo: 'Techumbre deteriorada',
    desc: 'Tejas rotas, canaletas obstruidas, membrana impermeable vencida. En terraza o patio que no ves en la visita. El dron DJI inspecciona toda la techumbre y fachada con video en alta resolución — sin escaleras ni andamios.',
    costo: 'UF 15–50 según tipo y superficie de cubierta',
    visible: false,
  },
  {
    tipo: 'Problemas en instalaciones de agua y gas',
    desc: 'Cañerías de cobre con corrosión, sellos de WC deficientes, uniones de gas mal ejecutadas. El detector de gas RIDGID Professional escanea toda la instalación en minutos. Una fuga de gas indetectable a olfato puede ser fatal.',
    costo: 'UF 8–25 según tipo de instalación',
    visible: false,
  },
];

const faqs = [
  {
    q: '¿Qué son los vicios ocultos en una propiedad?',
    a: 'Los vicios ocultos (también llamados fallas ocultas) son defectos que no son visibles durante una inspección visual normal pero que afectan el uso o valor de la propiedad. En Chile, el Código Civil establece que el vendedor responde por los vicios ocultos que existían al momento de la venta, incluso sin conocerlos. El problema es probarlos después de la firma.',
  },
  {
    q: '¿Cómo saber si una casa tiene fallas ocultas antes de comprarla?',
    a: 'La única forma confiable es una auditoría técnica profesional con instrumentos especializados: cámara térmica FLIR para detectar humedad y filtraciones, dron DJI para techumbre y fachada, detector de gas, nivelador láser para fisuras y niveles, y medidor de distancias para verificar superficie. Una visita visual, aunque la haga un arquitecto, no detecta lo que está detrás de los muros.',
  },
  {
    q: '¿Qué problemas tienen las casas usadas en Chile con más frecuencia?',
    a: 'Los más frecuentes en el mercado de Santiago son: humedad oculta y filtraciones activas (especialmente en propiedades de los años 80-90), instalaciones eléctricas intervenidas sin seguir norma SEC, ampliaciones sin permiso de edificación, techumbre con membrana vencida, y fisuras tapadas con revestimiento sin reparar la causa. DOMIS™ detecta todos estos en la auditoría PCF-15™.',
  },
  {
    q: '¿Puedo reclamar por vicios ocultos después de comprar?',
    a: 'Sí, pero es difícil y costoso. Necesitas probar que la falla existía antes de la compra, que no eras posible detectarla en una inspección normal, y que el vendedor no te informó. El proceso judicial puede tardar años. La alternativa inteligente es detectarlos antes de la promesa con una auditoría técnica y negociar el precio reflejando esos defectos.',
  },
  {
    q: '¿Una cámara térmica detecta humedad en muros?',
    a: 'Sí. La humedad oculta detrás de revestimientos crea diferencias de temperatura superficial detectables con cámara FLIR. El mapa térmico muestra exactamente dónde está la humedad, su extensión aproximada y si es activa o residual. Es la herramienta más eficaz para este tipo de falla — no destructiva, rápida y concluyente.',
  },
];

export default function ArticuloFallasOcultas() {
  return (
    <BlogLayout meta={meta}>

      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <AlertTriangle size={10} /> Fallas ocultas · Propiedades usadas
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 7 min lectura</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Fallas ocultas en casas usadas:<br />
        <span className="text-cyan-400 italic">lo que no ves en la visita puede costarte millones</span>
      </h1>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Una propiedad usada puede verse perfecta en la visita. Muros recién pintados, pisos lustrados, baños renovados. Y tener humedad activa detrás de cada pared, electricidad fuera de norma y 20m² de ampliación sin permiso de edificación.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        Las fallas ocultas no se ven a simple vista. Se detectan con instrumentos profesionales — o se descubren después de firmar, cuando ya no hay vuelta atrás.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Las 6 fallas ocultas más frecuentes en casas usadas de Santiago
      </h2>

      <div className="space-y-4 mb-10">
        {fallas.map((f, i) => (
          <div key={i} className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
            <div className="flex items-start gap-3 mb-2">
              <div className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle size={10} className="text-red-400" />
              </div>
              <h3 className="text-white font-black text-sm uppercase tracking-tight">{f.tipo}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pl-9 mb-2">{f.desc}</p>
            <div className="pl-9">
              <span className="text-[10px] text-cyan-400 font-black uppercase tracking-widest">Costo típico de reparación: </span>
              <span className="text-[10px] text-white font-black">{f.costo}</span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Por qué una visita normal no las detecta
      </h2>
      <p className="text-slate-400 leading-relaxed mb-4">
        El ojo humano no ve a través de los muros. Un propietario que sabe que su casa tiene humedad aplica una mano de pintura antes de mostrarla — y el problema desaparece visualmente por semanas.
      </p>
      <div className="bg-slate-900 border-l-4 border-amber-500 rounded-r-2xl p-5 mb-4">
        <div className="flex items-start gap-3">
          <Eye size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">La inspección visual tiene un límite físico.</strong> No importa cuánta experiencia tenga quien revise la propiedad — sin instrumental profesional, lo que está detrás del revestimiento es invisible. Siempre.
          </p>
        </div>
      </div>
      <p className="text-slate-400 leading-relaxed mb-10">
        Por eso la auditoría PCF-15™ usa cámara térmica FLIR, dron DJI, detector de gas y nivelador láser. No para reemplazar el ojo humano — para ver donde el ojo no llega.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Cómo DOMIS™ detecta fallas ocultas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          { instrumento: 'Cámara Térmica FLIR', detecta: 'Humedad oculta, filtraciones activas, puentes térmicos, zonas frías detrás de revestimientos' },
          { instrumento: 'Dron DJI', detecta: 'Estado de techumbre, membranas, canaletas, fachada en altura, daños post-sismo en exterior' },
          { instrumento: 'Detector Gas RIDGID', detecta: 'Fugas de gas en instalaciones interiores y exteriores, uniones deficientes, válvulas con pérdida' },
          { instrumento: 'Nivelador Láser Bosch', detecta: 'Fisuras activas, desplomes de muros, niveles de losa, dimensiones reales vs escritura' },
        ].map((inst, i) => (
          <div key={i} className="p-4 bg-slate-900 border border-white/10 rounded-xl">
            <div className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-2">{inst.instrumento}</div>
            <p className="text-slate-400 text-xs leading-relaxed">{inst.detecta}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Qué hacer si encuentran fallas ocultas antes de comprar
      </h2>
      <div className="space-y-3 mb-10">
        {[
          'Cada falla detectada se valoriza en UF con costo real de reparación',
          'El informe PCF-15™ documenta foto + descripción técnica + valorización de cada hallazgo',
          'Ese informe se usa como argumento de negociación: el precio de venta debe reflejar el costo de reparar lo que el vendedor no declaró',
          'Si la negociación fracasa, el informe sirve como evidencia en caso de litigio por vicios ocultos post-compra',
          'Si decides no comprar, el informe te ahorra años de problemas y millones en reparaciones',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tight mb-2">¿Encontraste una propiedad en Santiago?</p>
        <p className="text-slate-400 text-sm mb-4">Auditoría PCF-15™ antes de la promesa. Desde $180.000 + IVA.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero auditar una propiedad usada en Santiago antes de firmar la promesa."
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
        <a href="/blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago" className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group">
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Precios</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">Cuánto cuesta una auditoría técnica de propiedad en Santiago</p>
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
