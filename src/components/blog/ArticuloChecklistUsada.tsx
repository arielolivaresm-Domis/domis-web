import { CheckCircle, AlertTriangle, Thermometer, Zap, Droplets, Wind, Ruler, FileText, MapPin } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Qué revisar al comprar una propiedad usada en Santiago: checklist técnico completo | DOMIS™',
  description: 'Guía técnica completa para inspeccionar una propiedad usada en Santiago antes de firmar. Los 15 puntos del PCF-15™, instrumentos profesionales y cómo usar los hallazgos para negociar el precio.',
  url: 'https://www.domis.cl/blog/que-revisar-al-comprar-propiedad-usada-santiago',
};

const checklist = [
  {
    icon: <CheckCircle size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Estructura y cimentación',
    desc: 'Fisuras en muros de carga, grietas en losa, señales de asentamiento diferencial. Un asentamiento no detectado puede comprometer la seguridad estructural completa del inmueble.',
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Muros y tabiques',
    desc: 'Fisuras horizontales, verticales o en diagonal que indican movimiento estructural. Se diferencia una fisura por contracción (cosmética) de una fisura activa (estructural) con instrumentos de medición.',
  },
  {
    icon: <Thermometer size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Humedad y filtraciones (cámara térmica FLIR)',
    desc: 'La humedad detrás de muros, bajo pisos o en cielos no se ve a simple vista. La cámara térmica FLIR detecta diferencias de temperatura que revelan infiltraciones activas, tuberías con pérdida y daños por humedad acumulada.',
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Techumbre e impermeabilización',
    desc: 'Inspección con dron DJI de cubiertas, bajadas de aguas lluvias, canal y canaletas. Las filtraciones en techo son la falla más frecuente en propiedades usadas en Santiago y una de las más costosas de reparar.',
  },
  {
    icon: <Zap size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Instalaciones eléctricas (norma RIC)',
    desc: 'Tablero eléctrico, protecciones diferencial y termomagnética, estado del cableado, carga disponible. Las instalaciones fuera de norma RIC son un riesgo de incendio y pueden implicar una remodelación eléctrica completa no presupuestada.',
  },
  {
    icon: <Droplets size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Red de agua potable y alcantarillado',
    desc: 'Presión de agua, estado de llaves de paso, sifones, sellos de WC. Tuberías antiguas de PVC o asbesto-cemento tienen vida útil limitada y pueden presentar pérdidas invisibles con alto costo de reparación.',
  },
  {
    icon: <Wind size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Instalación de gas (detector RIDGID)',
    desc: 'El detector de gas RIDGID Professional verifica fugas en artefactos, cañerías y empalmes. Una fuga de gas no detectada es un riesgo crítico de seguridad — y la responsabilidad pasa al comprador desde la firma.',
  },
  {
    icon: <Wind size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Ventilación y calefacción',
    desc: 'Extracción en baños y cocina, funcionamiento de sistema de calefacción o climatización. La ventilación deficiente genera condensación, hongos y daños acelerados en terminaciones.',
  },
  {
    icon: <Ruler size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Niveles y plomadas (nivelador Bosch)',
    desc: 'El nivelador digital Bosch verifica que muros, pilares y cielos estén en plomada y nivel. Desviaciones significativas indican asentamiento estructural o construcción deficiente original.',
  },
  {
    icon: <Ruler size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Dimensiones reales vs. escritura (medidor láser)',
    desc: 'El medidor láser confirma que la superficie habitable real corresponde a la declarada en escritura y planos. Es frecuente encontrar diferencias de 3–8 m² entre lo escriturado y lo real — diferencia que impacta directamente el valor por m².',
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Terminaciones y revestimientos',
    desc: 'Pisos, revestimientos de baño y cocina, puertas, ventanas y herrajes. Las terminaciones deterioradas son la punta del iceberg: su reemplazo cuesta entre 3 y 10 UF/m² y debe ser parte del argumento de negociación.',
  },
  {
    icon: <AlertTriangle size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Daños por sismos y movimientos',
    desc: 'Chile es zona sísmica de alta actividad. Se verifican daños acumulados por eventos sísmicos previos: fisuras en uniones muro-losa, daños en escaleras y deformaciones en marcos de puertas y ventanas.',
  },
  {
    icon: <FileText size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Documentación técnica y permisos',
    desc: 'Recepción municipal, planos aprobados, permisos de ampliación, regularizaciones pendientes. Una ampliación sin permiso puede ser exigible al nuevo propietario — y no aparece en ninguna visita visual.',
  },
  {
    icon: <FileText size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Estudio de títulos y gravámenes',
    desc: 'Verificación de hipotecas vigentes, prohibiciones, embargos, usufructos y derechos reales que afecten la libre disposición del inmueble. Un vicio en el título puede impedir el traslado de dominio.',
  },
  {
    icon: <MapPin size={20} className="text-cyan-400 shrink-0 mt-0.5" />,
    titulo: 'Análisis de entorno en radio de 3 km',
    desc: 'Colegios con puntaje PAES, estaciones de metro, paraderos, farmacias, centros médicos, parques, supermercados, seguridad y plusvalía real de la zona. El barrio impacta el valor de la propiedad tanto como la propiedad misma.',
  },
];

const faqs = [
  {
    q: '¿Cuándo es el momento correcto para hacer la inspección técnica?',
    a: 'Antes de firmar la promesa de compra. Una vez firmada la promesa con precio acordado, se pierde el principal argumento de negociación. La auditoría debe realizarse mientras el precio aún está en discusión.',
  },
  {
    q: '¿Una inspección visual del corredor reemplaza la auditoría técnica?',
    a: 'No. El corredor inmobiliario no tiene formación técnica en construcción ni instrumentos profesionales. Su rol es facilitar la transacción — no auditar la propiedad en beneficio del comprador. La auditoría técnica la realiza un profesional independiente con cámara térmica, nivelador, medidor láser y detector de gas.',
  },
  {
    q: '¿Qué es un vicio oculto en una propiedad en Chile?',
    a: 'Un vicio oculto es un defecto grave en la construcción que no puede ser detectado a simple vista durante una visita normal. En Chile, la ley contempla responsabilidad del vendedor por vicios ocultos, pero solo si el comprador puede probarlos técnicamente. Una auditoría PCF-15™ documenta cada hallazgo con evidencia instrumental.',
  },
  {
    q: '¿Cuánto se puede negociar el precio de una propiedad usada en Santiago con evidencia técnica?',
    a: 'Los casos documentados de DOMIS™ muestran descuentos de 9% (Felipe, Las Condes), 11% (Andrea, Providencia) y 18% (Carolina & Roberto, La Reina) sobre el precio de publicación. El descuento posible depende de los hallazgos técnicos y del mercado de la comuna específica.',
  },
  {
    q: '¿La auditoría técnica DOMIS™ sirve para propiedades nuevas también?',
    a: 'Sí. Para propiedades nuevas, la auditoría se realiza antes de firmar el acta de entrega de la inmobiliaria. La Ley de Calidad de la Vivienda establece garantías de 3, 5 y 10 años, pero solo aplican sobre defectos documentados antes de la firma. Sin auditoría previa, el comprador cede ese respaldo legal.',
  },
  {
    q: '¿Qué diferencia hay entre inspección de propiedades y auditoría técnica inmobiliaria?',
    a: 'Una inspección entrega un informe de hallazgos. Una auditoría técnica inmobiliaria como PCF-15™ va más allá: valoriza cada hallazgo en UF, cruza con tasación de mercado real y genera una estrategia de negociación documentada. El resultado no es solo saber qué está mal — es saber cuánto valer eso en el precio.',
  },
];

export default function ArticuloChecklistUsada() {
  return (
    <BlogLayout meta={meta}>
      {/* Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-5">
          Guía técnica · Propiedades usadas
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
          Qué revisar al comprar una propiedad usada en Santiago:<br />
          <span className="text-cyan-400 italic">checklist técnico completo 2026</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          La visita con el corredor no es suficiente para saber lo que realmente estás comprando.
          Los problemas que más cuestan — filtraciones, fallas eléctricas, daños estructurales —
          no se ven a simple vista. Esta guía explica exactamente qué revisar, con qué instrumentos
          y cómo usar esa información para negociar el mejor precio.
        </p>
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
          <div>
            <p className="text-white text-sm font-semibold">Ariel — Constructor Civil</p>
            <p className="text-slate-500 text-xs">Fundador DOMIS™ · Más de 15 años en construcción y auditoría técnica en Chile</p>
          </div>
        </div>
      </header>

      {/* Alerta */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 mb-10 flex gap-4 items-start">
        <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={20} />
        <p className="text-slate-300 text-sm leading-relaxed">
          <strong className="text-white">Una visita normal detecta menos del 20% de los problemas reales</strong> de una propiedad usada.
          El 80% restante — filtraciones ocultas, instalaciones fuera de norma, superficies incorrectas —
          solo aparece con instrumentación profesional y metodología técnica estructurada.
        </p>
      </div>

      {/* Por qué no alcanza con ver */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Por qué una inspección visual no protege tu inversión
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Al comprar una propiedad usada en Santiago, el corredor te mostrará la propiedad con buena luz
          y te hablará de sus atributos. Su incentivo es cerrar la operación — no auditar la propiedad
          en tu beneficio. Ese conflicto de interés es estructural, no personal.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Los problemas que más impactan el valor de una propiedad usada son invisibles en una visita:
          humedad detrás de muros recién pintados, cableado eléctrico fuera de norma oculto en tabiques,
          superficie real 5 m² menor a la escriturada, o una ampliación sin permiso municipal que
          el nuevo propietario deberá regularizar.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Una auditoría técnica profesional con instrumentación (cámara térmica, nivelador digital,
          medidor láser, detector de gas) cambia completamente el escenario: el comprador entra
          a la negociación con evidencia real, no con esperanza.
        </p>
      </section>

      {/* Checklist PCF-15 */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-2">
          Los 15 puntos técnicos que debe incluir una inspección profesional
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Esta es la estructura de la metodología PCF-15™ — el protocolo de auditoría técnica de DOMIS™.
        </p>
        <div className="space-y-4">
          {checklist.map((item, i) => (
            <div key={i} className="flex gap-3 p-4 bg-slate-900 border border-white/10 rounded-xl">
              {item.icon}
              <div>
                <p className="text-white font-bold text-sm mb-1">
                  {i + 1}. {item.titulo}
                </p>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instrumentos */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Los instrumentos que marcan la diferencia
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Una auditoría técnica profesional no es una visita con checklist visual.
          Los instrumentos son lo que convierte la inspección en evidencia documentada y negociable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { nombre: 'Cámara térmica FLIR', uso: 'Detecta humedad, filtraciones y pérdidas detrás de muros y cielos. Invisible al ojo humano.' },
            { nombre: 'Dron DJI', uso: 'Inspección de techumbre, cubiertas y zonas de difícil acceso. Registro fotográfico y de video.' },
            { nombre: 'Nivelador digital Bosch', uso: 'Verifica plomada y nivel de muros, pilares y cielos. Detecta asentamientos estructurales.' },
            { nombre: 'Detector de gas RIDGID Professional', uso: 'Localiza fugas en artefactos, cañerías y empalmes de gas. Riesgo crítico de seguridad.' },
            { nombre: 'Medidor láser de distancia', uso: 'Confirma superficie real vs. escriturada. Diferencias frecuentes de 3–8 m² entre ambos.' },
            { nombre: 'Medidor de humedad', uso: 'Cuantifica el porcentaje de humedad en muros, pisos y cielos. Necesario para valorizar el daño.' },
          ].map((inst) => (
            <div key={inst.nombre} className="p-4 bg-slate-900 border border-cyan-500/20 rounded-xl">
              <p className="text-cyan-400 font-bold text-sm mb-1">{inst.nombre}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{inst.uso}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Negociación */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Cómo usar el informe técnico para negociar el precio
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          El informe de auditoría técnica no es solo un documento de hallazgos — es el argumento
          de negociación más poderoso que puede tener un comprador. Cada falla detectada se valoriza
          en UF (costo real de reparación) y se cruza con el precio de mercado real de la zona.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Con esa información, DOMIS™ genera tres escenarios de oferta — agresivo, moderado y conservador —
          para que el comprador elija cuál usar según su estrategia y tolerancia al riesgo.
          El vendedor no puede refutar evidencia técnica documentada con instrumental profesional.
        </p>
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
          <p className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Casos reales documentados en Santiago:</p>
          <div className="space-y-2">
            {[
              { cliente: 'Carolina & Roberto', comuna: 'La Reina', ahorro: '$141.710.795', pct: '18%', detalle: 'Daños estructurales, filtraciones y documentación inconsistente no declarados.' },
              { cliente: 'Andrea', comuna: 'Providencia', ahorro: '$68.218.952', pct: '11%', detalle: 'Superficie real menor a escriturada, instalaciones eléctricas fuera de norma y humedad estructural.' },
              { cliente: 'Felipe', comuna: 'Las Condes', ahorro: '$39.550.715', pct: '9%', detalle: 'Daños en techumbre, filtraciones activas y ampliación rechazada no informada.' },
            ].map((c) => (
              <div key={c.cliente} className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0">
                <div className="text-cyan-400 font-black text-lg font-mono w-12 shrink-0">{c.pct}</div>
                <div>
                  <p className="text-white text-sm font-semibold">{c.cliente} — {c.comuna}</p>
                  <p className="text-cyan-400 text-xs font-mono">{c.ahorro} ahorrados</p>
                  <p className="text-slate-500 text-xs mt-0.5">{c.detalle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA medio artículo */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tighter text-lg mb-2">
          ¿Estás evaluando una propiedad usada?
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Coordina tu auditoría técnica antes de firmar la promesa.
        </p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero coordinar una auditoría técnica DOMIS™ antes de comprar una propiedad usada."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm px-6 py-3 rounded-full transition-colors"
        >
          Agenda tu auditoría →
        </a>
      </div>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-6">
          Preguntas frecuentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 bg-slate-900 border border-white/10 rounded-xl">
              <p className="text-white font-bold text-sm mb-2">{faq.q}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </BlogLayout>
  );
}
