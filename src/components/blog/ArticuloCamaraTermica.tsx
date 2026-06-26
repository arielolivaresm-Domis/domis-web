import { Thermometer, CheckCircle, ArrowRight, Eye } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Cámara térmica en inspección de propiedades: qué detecta y por qué es esencial | DOMIS™',
  description: 'La cámara térmica FLIR detecta humedad oculta, filtraciones activas y problemas eléctricos invisibles al ojo humano. Guía completa sobre termografía en inspección inmobiliaria en Santiago.',
  url: 'https://www.domis.cl/blog/camara-termica-inspeccion-inmobiliaria',
  datePublished: '2026-06-26',
};

const detecta = [
  {
    titulo: 'Humedad oculta detrás de muros',
    desc: 'La humedad absorbe calor de forma diferente al material seco circundante. La FLIR muestra una mancha fría en el mapa térmico donde hay acumulación de agua — aunque la pared luzca perfecta a simple vista. Es la aplicación más frecuente en propiedades usadas de Santiago.',
  },
  {
    titulo: 'Filtraciones activas en losa y techo',
    desc: 'El agua que filtra por la losa plana o techumbre crea gradientes de temperatura detectables. La cámara muestra exactamente por dónde entra el agua y qué extensión tiene la zona afectada — antes de que aparezca la mancha visible en el cielo.',
  },
  {
    titulo: 'Puentes térmicos y falta de aislación',
    desc: 'Zonas donde el calor escapa por discontinuidad en la aislación térmica. Importantes en propiedades con calefacción central o en comunas de altura donde el consumo energético es relevante.',
  },
  {
    titulo: 'Instalaciones eléctricas con sobrecarga',
    desc: 'Los circuitos con sobrecarga o conexiones deficientes generan calor excesivo detectable con termografía. Un punto caliente en el tablero o en una pared puede indicar un empalme mal ejecutado con riesgo de incendio.',
  },
  {
    titulo: 'Pérdidas en instalaciones de agua caliente',
    desc: 'Cañerías de agua caliente empotradas con pérdida de calor anómala. La FLIR muestra el trazado exacto de la cañería y cualquier zona con temperatura irregular que indique fuga o daño en el aislante.',
  },
];

const faqs = [
  {
    q: '¿Para qué sirve una cámara térmica al comprar una casa?',
    a: 'Detecta problemas invisibles al ojo humano: humedad oculta detrás de revestimientos, filtraciones activas en losa y techo, instalaciones eléctricas con sobrecarga y pérdidas en cañerías. Es la herramienta más efectiva para detectar los problemas más costosos de una propiedad antes de comprarla.',
  },
  {
    q: '¿Qué es la termografía en inspección inmobiliaria?',
    a: 'La termografía inmobiliaria consiste en fotografiar el campo térmico de una propiedad con una cámara de infrarrojo (como la FLIR E6 o similares). Cada material y condición tiene una firma térmica característica — la humedad, el calor excesivo y la falta de aislación aparecen como anomalías de color en el mapa térmico.',
  },
  {
    q: '¿Cómo detecta la cámara térmica la humedad en muros?',
    a: 'El agua tiene una capacidad calorífica muy superior a la de los materiales de construcción (cemento, yeso, ladrillo). Una zona húmeda dentro de un muro se mantiene más fría que el material circundante. La cámara FLIR convierte esa diferencia de temperatura en un mapa visual donde la humedad aparece como una mancha azul o violeta.',
  },
  {
    q: '¿La cámara térmica funciona en todo tipo de propiedades?',
    a: 'Sí, con ciertas condiciones de uso. La termografía es más efectiva cuando hay diferencia de temperatura entre interior y exterior (mañanas o noches frías), con superficies limpias sin interferencia de radiación solar directa y con el operador entrenado para interpretar los mapas térmicos correctamente.',
  },
  {
    q: '¿Solo DOMIS™ usa cámara térmica en inspecciones de propiedades en Santiago?',
    a: 'No — hay otros servicios de inspección que la usan. Lo que diferencia a DOMIS™ es que la termografía es parte de un sistema de 15 puntos (PCF-15™) que incluye además dron, detector de gas, nivelador láser y análisis de documentación. El resultado no es solo un diagnóstico: es un informe con hallazgos valorizados en UF que se usa como argumento de negociación.',
  },
];

export default function ArticuloCamaraTermica() {
  return (
    <BlogLayout meta={meta}>

      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <Thermometer size={10} /> Termografía · Instrumentos
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 6 min lectura</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Cámara térmica en inspección de propiedades:<br />
        <span className="text-cyan-400 italic">qué detecta que el ojo humano no puede ver</span>
      </h1>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Un muro recién pintado puede esconder humedad activa que lleva años acumulándose. Una losa plana puede tener filtraciones en 3 puntos distintos sin ninguna mancha visible en el cielo. Una conexión eléctrica mal ejecutada puede estar generando calor excesivo detrás de una pared.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        La cámara térmica FLIR los ve todos. Eso cambia completamente lo que se puede detectar — y negociar — en una auditoría técnica antes de comprar.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Cómo funciona la termografía en una inspección de propiedad
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        La cámara térmica FLIR capta radiación infrarroja — calor que emiten todos los materiales — y la convierte en un mapa de colores donde cada temperatura tiene un tono distinto. Los materiales secos y sanos tienen una firma térmica uniforme. Las anomalías (humedad, calor excesivo, falta de aislación) aparecen como manchas de otro color.
      </p>
      <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 mb-10">
        <div className="flex items-start gap-3">
          <Eye size={20} className="text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-black text-sm mb-1">El ojo no miente — pero solo ve la superficie</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Un inspector visual experimentado puede detectar indicios de problemas — manchas, texturas irregulares, olores. Pero lo que está detrás de un muro con papel mural nuevo o pintura fresca es invisible. La FLIR ve a través del revestimiento sin tocarlo.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Qué detecta la cámara térmica en una propiedad
      </h2>
      <div className="space-y-4 mb-10">
        {detecta.map((d, i) => (
          <div key={i} className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
            <div className="flex items-start gap-3 mb-2">
              <Thermometer size={16} className="text-cyan-400 shrink-0 mt-0.5" />
              <h3 className="text-white font-black text-sm uppercase tracking-tight">{d.titulo}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed pl-7">{d.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        La FLIR en el sistema PCF-15™ de DOMIS™
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        La cámara térmica es un instrumento dentro del protocolo de 15 puntos. No trabaja sola:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          { paso: 'FLIR detecta', resultado: 'Mapa térmico con anomalías identificadas y georeferenciadas en plano de la propiedad' },
          { paso: 'Se documenta', resultado: 'Foto termográfica + foto visible del mismo punto + descripción técnica' },
          { paso: 'Se valoriza', resultado: 'Cada hallazgo se valoriza en UF según costo real de reparación confirmado' },
          { paso: 'Se reporta', resultado: 'Informe PCF-15™ con todos los hallazgos, fotos y valorizaciones en 72 horas hábiles' },
        ].map((p, i) => (
          <div key={i} className="p-4 bg-slate-900 border border-white/10 rounded-xl">
            <div className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-1">{p.paso}</div>
            <p className="text-slate-400 text-xs leading-relaxed">{p.resultado}</p>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-10">
        {[
          'La foto termográfica es evidencia técnica formal en caso de disputa legal por vicios ocultos',
          'El mapa térmico permite localizar exactamente dónde está el problema — para reparar solo lo necesario',
          'La valorización en UF convierte el hallazgo en argumento de negociación con el vendedor',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <Thermometer size={28} className="text-cyan-400 mx-auto mb-3" />
        <p className="text-white font-black uppercase tracking-tight mb-2">Auditoría con cámara térmica FLIR en Santiago</p>
        <p className="text-slate-400 text-sm mb-4">Desde $180.000 + IVA. Incluye informe completo con fotos termográficas.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero una auditoría técnica con cámara térmica para una propiedad en Santiago."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Agendar con FLIR <ArrowRight size={14} />
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
        <a href="/blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago" className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group">
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Precios</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">Cuánto cuesta una auditoría técnica de propiedad en Santiago</p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
      </div>

    </BlogLayout>
  );
}
