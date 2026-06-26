import { TrendingDown, AlertTriangle, CheckCircle, ArrowRight, DollarSign } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Cómo negociar el precio de una propiedad usada en Santiago | DOMIS™',
  description: 'Los consejos genéricos de negociación (5-10% menos, comparables, tiempo en mercado) dejan dinero sobre la mesa. La palanca real es la evidencia técnica documentada antes de la promesa.',
  url: 'https://www.domis.cl/blog/como-negociar-precio-propiedad-usada-santiago',
  datePublished: '2026-06-26',
};

const palancas = [
  {
    titulo: 'Fallas técnicas valorizadas en UF',
    desc: 'Cada hallazgo de la auditoría — humedad activa, instalación eléctrica fuera de norma, techo deteriorado, niveles incorrectos — se valoriza en UF según costo real de reparación. Eso convierte un "tiene problemas" en un argumento con cifras que el vendedor no puede ignorar.',
    ejemplo: 'Filtración activa en losa = UF 25-80 de reparación. Ese número va directo a la mesa de negociación.',
  },
  {
    titulo: 'Análisis de tasación de mercado',
    desc: 'Comparar propiedades similares publicadas no es suficiente — los precios publicados incluyen margen de negociación. El análisis correcto cruza avalúo fiscal, datos catastrales y operaciones cerradas reales en la zona, no solo avisos activos.',
    ejemplo: 'Un departamento publicado en UF 4.200 puede tener un valor de tasación de mercado de UF 3.900. Esa brecha es el argumento.',
  },
  {
    titulo: 'Documentación formal antes de la promesa',
    desc: 'La diferencia entre "le pedí rebaja" y "presenté un informe técnico con valorización de hallazgos" es la diferencia entre una respuesta verbal y una negociación real. El vendedor y su corredor no pueden refutar un informe profesional con una opinión.',
    ejemplo: 'Un informe de 15 puntos con hallazgos firmado por un Constructor Civil tiene peso legal y comercial.',
  },
];

const faqs = [
  {
    q: '¿Cuánto se puede negociar el precio de una propiedad en Chile?',
    a: 'Depende del estado real de la propiedad, el tiempo en mercado y la motivación del vendedor. En propiedades usadas con hallazgos técnicos documentados, los casos de DOMIS™ muestran rebajas entre 9% y 18% del precio publicado. Sin evidencia técnica, el margen típico es 3-7%.',
  },
  {
    q: '¿Cuándo debo negociar el precio?',
    a: 'Antes de firmar la promesa de compraventa. Una vez firmada, el precio queda acordado y el único argumento que te queda son fallas gravísimas no declaradas. La negociación efectiva ocurre entre la visita a la propiedad y la firma de la promesa — exactamente ahí es donde actúa DOMIS™.',
  },
  {
    q: '¿Sirve ofrecer un 10% menos sin argumentos?',
    a: 'Sirve para propiedades muy sobrevaloradas o vendedores muy urgentes. En el mercado de Santiago Oriente, donde los vendedores conocen el valor de su propiedad, una rebaja sin respaldo técnico se rechaza de inmediato o se acepta parcialmente. La evidencia técnica multiplica el margen negociable.',
  },
  {
    q: '¿El corredor puede ayudarme a negociar?',
    a: 'No. El corredor en Chile cobra su comisión del vendedor y está atado al cierre al precio más alto posible. Aunque intente ayudarte, su incentivo financiero está en contra tuyo. Para negociación real necesitas representación exclusiva del comprador — eso es lo que hace un buyer\'s agent.',
  },
  {
    q: '¿Qué fallas pesan más en la negociación?',
    a: 'Las de mayor costo de reparación y las que el vendedor no declaró. Humedades activas (especialmente en losa o muros), instalaciones eléctricas fuera de norma, fisuras estructurales, techumbres deterioradas y problemas en instalaciones sanitarias. Un informe técnico las valoriza en UF para que tengas cifras concretas.',
  },
  {
    q: '¿DOMIS™ negocia por mí?',
    a: 'DOMIS™ entrega el informe técnico completo con el análisis de tasación de mercado y tres escenarios de negociación (agresivo, moderado, conservador), con los valores sugeridos para ofertar. Tú negocias directamente con el vendedor usando ese respaldo técnico, con acompañamiento de DOMIS™ si es necesario.',
  },
];

export default function ArticuloNegociacion() {
  return (
    <BlogLayout meta={meta}>

      {/* Badge + fecha */}
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <TrendingDown size={10} /> Negociación · Propiedades usadas
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 7 min lectura</span>
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Cómo negociar el precio de una propiedad usada en Santiago:<br />
        <span className="text-cyan-400 italic">con evidencia técnica, no con esperanza</span>
      </h1>

      {/* Intro */}
      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Si buscas en Google cómo negociar el precio de una propiedad usada en Santiago, todos los consejos se parecen: compara propiedades similares, revisa cuánto tiempo lleva publicada, ofrece un 5–10% menos, apóyate en tasación comercial.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-4">
        Ese consejo no está mal. Pero está incompleto. Y en el mercado inmobiliario de Santiago Oriente —donde los vendedores conocen el valor de sus propiedades y los corredores defienden el precio— quedarse en esos argumentos deja dinero real sobre la mesa.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        La diferencia entre una rebaja del 4% y una del 12% no está en cómo pides el descuento. Está en qué argumento llevas a la mesa.
      </p>

      {/* Sección 1 */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        El problema con negociar sin inspección técnica previa
      </h2>
      <div className="bg-slate-900 border border-red-500/20 rounded-2xl p-6 mb-8">
        <div className="flex items-start gap-4">
          <AlertTriangle className="text-red-400 shrink-0 mt-1" size={22} />
          <div>
            <p className="text-white font-bold mb-2">Llegas a la negociación a ciegas.</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sin inspección técnica profesional, no sabes qué fallas tiene la propiedad ni cuánto cuestan. Tu argumento más fuerte es "se ve un poco deteriorada" — y eso el vendedor lo refuta en 10 segundos. Con un informe técnico en mano, cada falla tiene nombre, foto y valorización en UF.
            </p>
          </div>
        </div>
      </div>
      <p className="text-slate-400 leading-relaxed mb-4">
        Una propiedad usada tiene historia. Esa historia —humedades reparadas sin terminar, instalaciones eléctricas intervenidas fuera de norma, techumbres con vida útil vencida, filtraciones activas detrás de revestimientos— raramente está en el aviso. El corredor no la va a mostrar. Y una visita de 30 minutos con el ojo desnudo no la va a detectar.
      </p>
      <p className="text-slate-400 leading-relaxed mb-10">
        Esa información oculta es exactamente la que convierte una negociación de 4% en una de 12%.
      </p>

      {/* Las 3 palancas */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Las 3 palancas reales de negociación en propiedades usadas
      </h2>
      <div className="space-y-5 mb-10">
        {palancas.map((p, i) => (
          <div key={i} className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                <span className="text-cyan-400 font-black text-xs">{i + 1}</span>
              </div>
              <h3 className="text-white font-black uppercase tracking-tight text-sm">{p.titulo}</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-3 pl-10">{p.desc}</p>
            <div className="ml-10 pl-3 border-l-2 border-cyan-500/30">
              <p className="text-cyan-300/70 text-xs italic">{p.ejemplo}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sección: el sistema DOMIS */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Cómo DOMIS™ convierte la auditoría en poder de negociación
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        El proceso tiene dos pasos que funcionan en conjunto:
      </p>
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-4 p-5 bg-slate-900 rounded-2xl border border-white/5">
          <CheckCircle size={20} className="text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-black uppercase tracking-tight text-sm mb-1">Auditoría PCF-15™ antes de la promesa</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Inspección técnica no destructiva con cámara térmica FLIR (humedad y filtraciones ocultas), dron DJI (techumbre y fachada), detector de gas RIDGID y nivelador Bosch. Cada hallazgo queda documentado con foto, descripción técnica y valorización en UF.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-5 bg-slate-900 rounded-2xl border border-white/5">
          <TrendingDown size={20} className="text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-white font-black uppercase tracking-tight text-sm mb-1">Informe de negociación con 3 escenarios</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Los hallazgos técnicos se cruzan con análisis de tasación de mercado. El resultado es un informe con tres escenarios de oferta —agresivo, moderado y conservador— con los valores sugeridos para ofertar y el respaldo técnico que los justifica.
            </p>
          </div>
        </div>
      </div>

      {/* Resultados reales */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Qué margen de negociación se logra con evidencia técnica
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        En casos de referencia de DOMIS™ en la Región Metropolitana:
      </p>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { pct: '18%', zona: 'La Reina', falla: 'Daños estructurales + filtraciones activas no declarados' },
          { pct: '11%', zona: 'Providencia', falla: 'Superficie menor a la declarada + instalación eléctrica fuera de norma' },
          { pct: '9%', zona: 'Las Condes', falla: 'Daños techo + ampliación rechazada no informada' },
        ].map((c, i) => (
          <div key={i} className="p-4 bg-slate-900 border border-white/10 rounded-2xl text-center">
            <div className="text-3xl font-black font-mono text-cyan-400 mb-1">{c.pct}</div>
            <div className="text-white font-black text-[10px] uppercase tracking-widest mb-2">{c.zona}</div>
            <p className="text-slate-500 text-[10px] leading-snug">{c.falla}</p>
          </div>
        ))}
      </div>
      <p className="text-slate-500 text-xs uppercase tracking-widest mb-10 text-center">Casos de referencia DOMIS™ — Región Metropolitana</p>

      {/* Cuándo negociar */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        El momento exacto para negociar
      </h2>
      <p className="text-slate-400 leading-relaxed mb-4">
        La negociación ocurre <strong className="text-white">después de la visita y antes de la promesa</strong>. Una vez firmada la promesa, el precio está acordado y tu único argumento restante son fallas gravísimas no declaradas que estés dispuesto a llevar a juicio — escenario que nadie quiere.
      </p>
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 mb-10">
        <p className="text-cyan-300 font-bold text-sm">
          Cronología correcta: <span className="text-white">visita → auditoría técnica → informe → negociación → promesa.</span>
        </p>
        <p className="text-slate-400 text-sm mt-2">
          Invertir ese orden — firmar promesa y después inspeccionar — es el error más frecuente y el más caro.
        </p>
      </div>

      {/* CTA intermedio */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <DollarSign size={28} className="text-cyan-400 mx-auto mb-3" />
        <p className="text-white font-black uppercase tracking-tight mb-2">¿Encontraste una propiedad en Santiago?</p>
        <p className="text-slate-400 text-sm mb-4">La auditoría técnica DOMIS™ convierte los defectos en argumentos de negociación antes de la promesa.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, leí el artículo sobre negociación en DOMIS™ y quiero cotizar una auditoría técnica antes de la promesa."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Cotizar auditoría <ArrowRight size={14} />
        </a>
      </div>

      {/* FAQ */}
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Preguntas frecuentes sobre negociación de propiedades en Santiago
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
          href="/blog/buyer-agent-chile"
          className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group"
        >
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Buyer's Agent</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">
              Buyer's agent en Chile: qué es y por qué el mercado lo necesitaba
            </p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
      </div>

    </BlogLayout>
  );
}
