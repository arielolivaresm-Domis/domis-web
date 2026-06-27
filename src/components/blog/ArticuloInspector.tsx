import { Search, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Inspector de propiedades en Santiago: qué hace, cuánto cuesta y cómo elegir uno | DOMIS™',
  description: 'Inspector de propiedades en Santiago: qué incluye una inspección técnica, cuánto cuesta, diferencia entre inspector y auditor técnico PCF-15™, y cómo contratar uno antes de comprar.',
  url: 'https://www.domis.cl/blog/inspector-de-propiedades-santiago',
  datePublished: '2026-06-27',
};

const queIncluye = [
  { punto: 'Inspección visual de muros, cielos y pisos', basico: true, pcf: true },
  { punto: 'Detección de humedad con cámara térmica FLIR', basico: false, pcf: true },
  { punto: 'Inspección de techumbre y fachada con dron DJI', basico: false, pcf: true },
  { punto: 'Detección de fugas de gas con equipo RIDGID', basico: false, pcf: true },
  { punto: 'Medición de superficie real vs escritura', basico: false, pcf: true },
  { punto: 'Revisión instalación eléctrica y tablero', basico: true, pcf: true },
  { punto: 'Nivelación láser — fisuras y desplomes', basico: false, pcf: true },
  { punto: 'Revisión documentación legal (escritura, planos DOM)', basico: false, pcf: true },
  { punto: 'Informe con hallazgos valorizados en UF', basico: false, pcf: true },
  { punto: 'Informe usado como argumento de negociación', basico: false, pcf: true },
];

const faqs = [
  {
    q: '¿Qué hace un inspector de propiedades en Santiago?',
    a: 'Un inspector de propiedades evalúa el estado técnico de un inmueble antes de la compra. Revisa estructura, instalaciones, humedad, techumbre y documentación. En DOMIS™ el proceso se llama auditoría técnica PCF-15™ y utiliza instrumental profesional (cámara térmica FLIR, dron DJI, detector gas RIDGID) para detectar fallas invisibles a simple vista.',
  },
  {
    q: '¿Cuánto cuesta una inspección de propiedades en Santiago?',
    a: 'Depende del tipo de propiedad y el alcance del servicio. La auditoría técnica PCF-15™ de DOMIS™ cuesta $1.900/m² + IVA para propiedades usadas y $1.800/m² + IVA para propiedades nuevas, con un mínimo de 100m². Incluye informe completo con fotos, descripción técnica y valorización de cada hallazgo en UF.',
  },
  {
    q: '¿Cuál es la diferencia entre inspector de propiedades y auditor técnico?',
    a: 'Son términos que se usan de forma intercambiable para describir el mismo servicio: evaluar técnicamente una propiedad antes de la compra. La diferencia está en el alcance del instrumental y el uso que se da al informe. DOMIS™ usa el término "auditoría técnica" porque el resultado va más allá de un diagnóstico — es un informe de negociación con hallazgos valorizados que el comprador usa para negociar el precio.',
  },
  {
    q: '¿Cómo contratar un inspector de propiedades en Santiago?',
    a: 'Contacta a DOMIS™ vía WhatsApp con la dirección de la propiedad y la fecha tentativa de visita. Se agenda la inspección, se realiza con instrumental completo (FLIR, dron, RIDGID, láser), y el informe PCF-15™ se entrega en 72 horas hábiles. El proceso completo desde contacto hasta informe toma 4-5 días hábiles.',
  },
  {
    q: '¿Es necesario un inspector de propiedades para departamentos en Santiago?',
    a: 'Sí, especialmente para departamentos usados. Los problemas más frecuentes en departamentos — humedad de losa, instalaciones eléctricas intervenidas, filtraciones entre pisos, metros no declarados — son invisibles a simple vista y requieren instrumental para detectarse. El costo de la inspección es marginal comparado con el costo de descubrir los problemas después de firmar.',
  },
  {
    q: '¿Qué incluye el informe de un inspector de propiedades profesional?',
    a: 'El informe PCF-15™ de DOMIS™ incluye: foto visible y foto termográfica de cada hallazgo, descripción técnica del problema, valorización en UF del costo estimado de reparación, y resumen ejecutivo para usar en negociación. Se entrega en PDF dentro de 72 horas hábiles desde la visita.',
  },
];

export default function ArticuloInspector() {
  return (
    <BlogLayout meta={meta}>

      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <Search size={10} /> Inspector de propiedades · Santiago
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 6 min lectura</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Inspector de propiedades en Santiago:<br />
        <span className="text-cyan-400 italic">qué hace, cuánto cuesta y cómo elegir uno confiable</span>
      </h1>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Un inspector de propiedades evalúa el estado técnico real de un inmueble antes de la compra. No para dar una opinión — para generar evidencia documentada con instrumental profesional que el comprador pueda usar como argumento de negociación.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        En Chile el servicio existe bajo distintos nombres: inspector de propiedades, inspector técnico, auditor técnico inmobiliario. Lo que varía es el instrumental, el alcance y el uso que se le da al informe.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Inspector de propiedades vs auditor técnico: ¿es lo mismo?
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        Sí — son términos distintos para el mismo servicio base. La diferencia real no está en el nombre sino en el instrumental y en qué hace el comprador con el informe.
      </p>
      <div className="bg-slate-900 border-l-4 border-cyan-500 rounded-r-2xl p-5 mb-10">
        <p className="text-slate-300 text-sm leading-relaxed">
          <strong className="text-white">DOMIS™ usa el término "auditoría técnica"</strong> porque el proceso PCF-15™ va más allá de un diagnóstico visual — incluye cámara térmica FLIR, dron DJI y detector de gas, y el informe final se usa explícitamente como herramienta de negociación del precio de compra.
        </p>
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Qué incluye una inspección técnica de propiedades en Santiago
      </h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-slate-500 text-xs font-black uppercase tracking-widest py-3 pr-4">Punto de inspección</th>
              <th className="text-center text-slate-500 text-xs font-black uppercase tracking-widest py-3 px-3">Básico</th>
              <th className="text-center text-cyan-400 text-xs font-black uppercase tracking-widest py-3 pl-3">PCF-15™</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {queIncluye.map((item, i) => (
              <tr key={i}>
                <td className="text-slate-300 py-3 pr-4 text-xs leading-relaxed">{item.punto}</td>
                <td className="text-center py-3 px-3">
                  {item.basico
                    ? <CheckCircle size={14} className="text-slate-400 mx-auto" />
                    : <span className="text-slate-700 text-xs">—</span>}
                </td>
                <td className="text-center py-3 pl-3">
                  <CheckCircle size={14} className="text-cyan-400 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Cuánto cuesta una inspección de propiedades en Santiago
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        El mercado en Santiago tiene rangos muy distintos según el alcance del servicio:
      </p>
      <div className="space-y-3 mb-4">
        {[
          { tipo: 'Inspección visual básica (sin instrumental)', precio: '$50.000–$120.000 + IVA', nota: 'Solo detecta lo visible. No detecta humedad oculta ni gas.' },
          { tipo: 'Auditoría técnica PCF-15™ — propiedad usada', precio: '$1.900/m² + IVA (mín. 100m²)', nota: 'Incluye FLIR, dron, RIDGID, láser e informe de negociación.' },
          { tipo: 'Auditoría técnica PCF-15™ — propiedad nueva', precio: '$1.800/m² + IVA (mín. 100m²)', nota: 'Verifica recepciones, documentación y estado al momento de entrega.' },
        ].map((tier, i) => (
          <div key={i} className="p-4 bg-slate-900 border border-white/10 rounded-xl">
            <div className="flex items-start justify-between gap-4 mb-1">
              <span className="text-white font-black text-xs uppercase tracking-tight">{tier.tipo}</span>
              <span className="text-cyan-400 font-black text-xs whitespace-nowrap">{tier.precio}</span>
            </div>
            <p className="text-slate-500 text-xs">{tier.nota}</p>
          </div>
        ))}
      </div>
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-4 mb-10">
        <p className="text-slate-300 text-sm leading-relaxed">
          <strong className="text-white">La matemática:</strong> una auditoría PCF-15™ en una propiedad de 120m² cuesta ~$228.000 + IVA. Los ahorros promedio en negociación son 9–18% del precio de compra. En una propiedad de UF 5.000, eso es UF 450–900 a favor del comprador.
        </p>
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Cómo contratar un inspector de propiedades en Santiago
      </h2>
      <div className="space-y-3 mb-10">
        {[
          { paso: 'Contacto', desc: 'WhatsApp con dirección de la propiedad y fecha tentativa de visita' },
          { paso: 'Coordinación', desc: 'DOMIS™ coordina directamente con el vendedor o corredor para el acceso' },
          { paso: 'Visita técnica', desc: 'Inspección completa con FLIR, dron, RIDGID y láser — dura 2–3 horas' },
          { paso: 'Informe PCF-15™', desc: 'Entrega en 72 horas hábiles — PDF con fotos, descripción técnica y valuación UF' },
          { paso: 'Uso del informe', desc: 'Presentar al vendedor como argumento antes de firmar la promesa' },
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">
                <span className="text-slate-950 font-black text-xs">{i + 1}</span>
              </div>
              {i < 4 && <div className="w-px h-5 bg-white/10 mt-1" />}
            </div>
            <div className="pb-2">
              <div className="text-white font-black text-sm">{s.paso}</div>
              <div className="text-slate-400 text-xs mt-0.5">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <Shield size={28} className="text-cyan-400 mx-auto mb-3" />
        <p className="text-white font-black uppercase tracking-tight mb-2">Inspector de propiedades en Santiago Oriente</p>
        <p className="text-slate-400 text-sm mb-4">Las Condes · Providencia · La Reina · Vitacura · Ñuñoa</p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero contratar un inspector de propiedades en Santiago para una propiedad que estoy evaluando."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Agendar inspección <ArrowRight size={14} />
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
