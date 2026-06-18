import { AlertTriangle, Shield, CheckCircle, FileText } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Garantía de 3, 5 y 10 años en propiedades nuevas: qué cubre y cómo hacerla valer | DOMIS™',
  description: 'La ley te da garantía de hasta 10 años en propiedades nuevas en Chile. Pero activarla es más difícil de lo que parece. Esto es lo que necesitas saber antes de firmar.',
  url: 'https://www.domis.cl/blog/garantia-propiedades-nuevas-chile',
};

const garantias = [
  {
    plazo: '3 años',
    cubre: 'Terminaciones',
    detalle: 'Pintura, cerámicas, griferías, ventanas, puertas, muebles de cocina y baño. Todo lo que se ve y se toca en el día a día.',
  },
  {
    plazo: '5 años',
    cubre: 'Elementos constructivos',
    detalle: 'Instalaciones eléctricas, sanitarias, de agua potable y estructuras secundarias. Lo que no se ve pero hace funcionar la propiedad.',
  },
  {
    plazo: '10 años',
    cubre: 'Estructura',
    detalle: 'Fundaciones, muros portantes, losa y vigas. Lo que sostiene el edificio completo.',
  },
];

const faqs = [
  {
    q: '¿Desde cuándo corren los plazos de garantía?',
    a: 'Los plazos corren desde la fecha de recepción municipal definitiva del edificio o proyecto, no desde que firmaste la escritura ni desde que recibiste las llaves. Esto puede significar meses de diferencia en tu cálculo real.',
  },
  {
    q: '¿Qué pasa si el defecto era visible en la entrega pero no lo documenté?',
    a: 'Si no hay registro técnico del estado de la propiedad al momento de la entrega, el vendedor o la constructora puede argumentar que el defecto es consecuencia de tu uso o falta de mantención. Sin documentación, la carga de la prueba recae completamente en ti.',
  },
  {
    q: '¿Una inspección visual en la entrega es suficiente?',
    a: 'No. Los defectos más graves — filtraciones en losa, problemas eléctricos, humedad estructural — no se detectan a simple vista. Se necesita instrumentación profesional (cámara térmica, detector de humedad, nivelador digital) y un protocolo técnico estructurado para documentar el estado real.',
  },
  {
    q: '¿La garantía aplica si yo hago modificaciones después de la entrega?',
    a: 'Cualquier modificación que altere elementos estructurales o constructivos puede ser usada por la constructora para argumentar que el defecto fue causado por esas intervenciones. Por eso el estado al momento de la entrega debe quedar perfectamente documentado antes de hacer cualquier cambio.',
  },
  {
    q: '¿La auditoría técnica sirve solo para propiedades nuevas?',
    a: 'No. Para propiedades usadas, la auditoría identifica los problemas existentes y genera el argumento de negociación sobre el precio. Para propiedades nuevas, la función principal es documentar el estado en la entrega para proteger el uso de la garantía legal durante los años siguientes.',
  },
];

export default function ArticuloGarantias() {
  return (
    <BlogLayout meta={meta}>
      {/* Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-5">
          Guía técnica · Propiedades nuevas
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
          Garantía de 3, 5 y 10 años en propiedades nuevas:<br />
          <span className="text-cyan-400 italic">qué cubre y cómo hacerla valer</span>
        </h1>
        <p className="text-slate-400 text-base leading-relaxed">
          La ley te entrega una de las protecciones más importantes del mercado inmobiliario.
          Pero activarla cuando la necesitas depende de algo que casi nadie hace
          en el momento correcto.
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
          <strong className="text-white">Tener garantía legal no es lo mismo que poder usarla.</strong> Para activar la garantía de una propiedad nueva en Chile necesitas probar que el defecto existía al momento de la entrega — y eso requiere documentación técnica que la mayoría de los compradores no tiene.
        </p>
      </div>

      {/* Lo que dice la ley */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Lo que establece la ley
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          El Art. 18 de la Ley General de Urbanismo y Construcciones (LGUC) establece tres plazos de garantía para propiedades nuevas en Chile. Son obligatorios para el vendedor y no pueden ser eliminados por contrato:
        </p>
        <div className="space-y-4">
          {garantias.map((g) => (
            <div key={g.plazo} className="flex gap-4 p-5 bg-slate-900 border border-white/10 rounded-xl">
              <div className="shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex flex-col items-center justify-center">
                  <span className="text-cyan-400 font-black text-lg leading-none">{g.plazo.split(' ')[0]}</span>
                  <span className="text-cyan-400 text-[10px] uppercase tracking-widest">años</span>
                </div>
              </div>
              <div>
                <p className="text-white font-black text-sm mb-1">{g.cubre}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{g.detalle}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-500 text-xs mt-4 leading-relaxed">
          Los plazos corren desde la recepción municipal definitiva del proyecto, no desde la fecha de tu escritura.
        </p>
      </section>

      {/* El problema real */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          El problema que nadie te cuenta al entregar las llaves
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Para activar cualquiera de estas garantías necesitas demostrar dos cosas:
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex gap-3 items-start p-4 bg-slate-900 border border-white/10 rounded-xl">
            <CheckCircle className="text-cyan-400 shrink-0 mt-0.5" size={18} />
            <p className="text-slate-300 text-sm">Que el defecto existe hoy.</p>
          </div>
          <div className="flex gap-3 items-start p-4 bg-slate-900 border border-red-500/20 rounded-xl">
            <AlertTriangle className="text-red-400 shrink-0 mt-0.5" size={18} />
            <p className="text-slate-300 text-sm">Que ese defecto <strong className="text-white">existía al momento en que recibiste la propiedad</strong> — no que apareció después.</p>
          </div>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          El primer punto es relativamente fácil: contratas a alguien que lo documente técnicamente hoy.
          El segundo es donde la mayoría falla.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Sin un registro técnico del estado de la propiedad al momento de la entrega, el vendedor o la constructora puede argumentar que el problema es consecuencia de tu uso, de falta de mantención, o de modificaciones que realizaste después. Y en muchos casos, tienen respaldo legal para hacerlo.
        </p>
      </section>

      {/* Por qué el proceso de entrega no protege al comprador */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Por qué el proceso de entrega de la inmobiliaria no te protege
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          El acta de entrega que firma la inmobiliaria es un documento diseñado para liberar
          su responsabilidad — no para documentar el estado real de la propiedad en tu beneficio.
          En muchos casos es genérica, rápida y no registra los defectos que un técnico independiente
          detectaría con instrumentación profesional.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          Los defectos más relevantes — filtraciones en losa, problemas en instalaciones eléctricas,
          humedad detrás de muros, desviaciones en estructura — no se detectan a simple vista
          durante una visita de entrega de treinta minutos.
        </p>
      </section>

      {/* Qué documentación necesitas */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Qué documentación necesitas para que la garantía funcione
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          El respaldo que hace que la garantía legal sea realmente ejercible se construye <strong className="text-white">antes de firmar el acta de entrega</strong>, no después:
        </p>
        <div className="space-y-3">
          {[
            {
              titulo: 'Informe técnico independiente',
              desc: 'Un profesional de la construcción que inspeccione con instrumentación profesional antes de la firma. Cámara térmica, detector de humedad, nivelador digital. No una visita visual — una auditoría con metodología estructurada.',
            },
            {
              titulo: 'Registro fotográfico documentado',
              desc: 'Fotografías del estado real de la propiedad al momento de la entrega, con fecha y geolocalización. Cada defecto detectado, cada observación técnica, con evidencia visual que no pueda ser refutada posteriormente.',
            },
            {
              titulo: 'Acta de observaciones técnicas',
              desc: 'Un documento que liste formalmente los defectos preexistentes, las instalaciones inspeccionadas y las condiciones registradas. Firmado antes de recibir las llaves. Ese acta es tu respaldo legal para los próximos 10 años.',
            },
          ].map((item) => (
            <div key={item.titulo} className="flex gap-3 p-5 bg-slate-900 border border-white/10 rounded-xl">
              <FileText className="text-cyan-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-white font-bold text-sm mb-1">{item.titulo}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué la auditoría antes de la entrega */}
      <section className="mb-10">
        <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter mb-4">
          Por qué la auditoría antes de la entrega lo cambia todo
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Una auditoría técnica realizada antes de firmar el acta de entrega no solo identifica
          los problemas que existen en ese momento. Genera la trazabilidad que te protege
          durante los próximos 10 años.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Si hay un defecto visible al momento de la entrega, queda documentado.
          Si hay un sistema que no fue posible verificar sin obra, queda consignado en el informe.
          Si hay algo que la inmobiliaria comprometió corregir, queda registrado formalmente.
        </p>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Con ese set de documentos, si en seis años aparece una filtración en la losa,
          tienes prueba técnica de que no venía en tu acta original — o de que sí venía
          y nunca fue corregida. En ambos casos, la garantía puede hacerse efectiva.
        </p>
        <div className="p-5 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl">
          <div className="flex items-start gap-3">
            <Shield className="text-cyan-400 shrink-0 mt-0.5" size={20} />
            <p className="text-slate-300 text-sm leading-relaxed">
              <strong className="text-white">La garantía legal más poderosa no es la que da la ley.</strong> Es la que construyes tú antes de firmar, con documentación técnica independiente que ninguna constructora pueda refutar.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tighter text-lg mb-2">
          ¿Estás próximo a recibir una propiedad nueva?
        </p>
        <p className="text-slate-400 text-sm mb-4">
          Coordina una auditoría técnica antes de firmar el acta de entrega.
        </p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero coordinar una auditoría técnica DOMIS™ antes de recibir mi propiedad nueva."
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
