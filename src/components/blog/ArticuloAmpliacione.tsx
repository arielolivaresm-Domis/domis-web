import { AlertTriangle, CheckCircle, ArrowRight, FileX } from 'lucide-react';
import BlogLayout from './BlogLayout';

const meta = {
  title: 'Ampliaciones sin permiso en Chile: qué pasa si compras una propiedad con metros ilegales | DOMIS™',
  description: 'Comprar una propiedad con ampliaciones sin permiso en Chile puede costarte la demolición, problemas en el crédito hipotecario y multas. Guía completa: riesgos, cómo detectarlas y qué hacer.',
  url: 'https://www.domis.cl/blog/ampliaciones-sin-permiso-chile',
  datePublished: '2026-06-26',
};

const riesgos = [
  {
    titulo: 'Crédito hipotecario rechazado o reducido',
    desc: 'Los bancos evalúan el crédito sobre los metros cuadrados declarados en la escritura, no sobre los físicos. Si la propiedad tiene 180m² físicos pero 140m² en escritura, el banco financia según los 140m². Pagas el precio de 180m² pero financias solo 140m².',
  },
  {
    titulo: 'Tasación inferior al precio de compra',
    desc: 'El tasador del banco valoriza según la superficie legal. Si los metros ilegales son significativos, la tasación puede quedar bajo el precio de compra y el banco no otorga el crédito completo.',
  },
  {
    titulo: 'Multas de la municipalidad',
    desc: 'La Dirección de Obras Municipales puede multar al propietario (tú, una vez que compres) y exigir la regularización o demolición. Las multas dependen de la superficie irregular y la comuna.',
  },
  {
    titulo: 'Orden de demolición',
    desc: 'Si la ampliación no cumple normas de altura, distanciamientos o rasante, puede no ser regularizable. En ese caso la DOM puede ordenar la demolición — a costo del propietario actual.',
  },
  {
    titulo: 'Problemas al vender en el futuro',
    desc: 'Heredas el problema. Cuando quieras vender la propiedad, el comprador (o su banco) va a detectar la discrepancia de metros y tú quedarás en la misma posición que el vendedor de hoy.',
  },
];

const faqs = [
  {
    q: '¿Qué pasa si compro una casa con ampliación sin permiso en Chile?',
    a: 'Al comprar asumes todos los problemas legales: multas municipales pendientes, obligación de regularizar o demoler si no es regularizable, tasación reducida en futuros créditos y dificultad para vender. La ley chilena no protege al comprador que adquirió sabiendo (o pudiendo saber) la situación irregular.',
  },
  {
    q: '¿Cómo saber si una propiedad tiene metros no declarados?',
    a: 'Midiendo. La auditoría PCF-15™ de DOMIS™ incluye medición con nivelador láser de toda la superficie habitable y la compara contra lo declarado en escritura y planos de la DOM. Si hay diferencia, aparece en el informe con la magnitud exacta.',
  },
  {
    q: '¿Se puede regularizar una ampliación sin permiso en Chile?',
    a: 'Sí, si cumple con las normas vigentes de la comuna: rasante, distanciamientos, altura máxima y coeficiente de constructibilidad. El proceso es la Ley del Mono o regularización vía DOM. Si no cumple las normas actuales, no es regularizable y la única opción es la demolición.',
  },
  {
    q: '¿Cuánto cuesta regularizar una ampliación sin permiso?',
    a: 'Depende de la superficie, la comuna y si es regularizable. En términos generales: honorarios de arquitecto ($500.000–$2.000.000), derechos municipales (% del presupuesto de obra según tasación), y en algunos casos adecuaciones constructivas para cumplir norma. En total puede ir de UF 10 a UF 60+.',
  },
  {
    q: '¿El vendedor está obligado a declarar los metros ilegales?',
    a: 'Sí. Ocultar esta información al comprador es un vicio redhibitorio que da derecho a resolución del contrato o rebaja del precio. Pero probar que el vendedor lo sabía y lo ocultó puede ser complejo y costoso legalmente. Lo más inteligente es detectarlo antes de la promesa con una auditoría técnica.',
  },
];

export default function ArticuloAmpliacione() {
  return (
    <BlogLayout meta={meta}>

      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <FileX size={10} /> Permisos · Irregularidades
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 6 min lectura</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Ampliaciones sin permiso en Chile:<br />
        <span className="text-cyan-400 italic">qué pasa si compras metros ilegales sin saberlo</span>
      </h1>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Un departamento de 160m² publicado. La escritura dice 130m². Los 30m² de diferencia no tienen permiso de edificación, no están en planos DOM y no existen legalmente — aunque los pisas todos los días.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        Este escenario es más frecuente de lo que parece en el mercado de Santiago, especialmente en casas de los años 80 y 90 con ampliaciones en garage, segundo piso o terrazas cerradas. Las consecuencias de comprar sin saberlo son serias.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Los 5 riesgos reales de comprar con metros no declarados
      </h2>
      <div className="space-y-4 mb-10">
        {riesgos.map((r, i) => (
          <div key={i} className="p-5 bg-slate-900 border border-red-500/10 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-red-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-black text-sm mb-1">{r.titulo}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{r.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Metros cuadrados declarados vs reales: cómo se detecta
      </h2>
      <p className="text-slate-400 leading-relaxed mb-6">
        La auditoría PCF-15™ incluye medición completa de la propiedad con nivelador láser Bosch. Cada recinto se mide y la suma total se compara contra:
      </p>
      <div className="space-y-3 mb-10">
        {[
          'La superficie declarada en escritura de compraventa',
          'Los planos aprobados por la Dirección de Obras Municipales (DOM)',
          'El certificado de recepción final de la constructora',
          'El avalúo fiscal del SII (que refleja superficie legal)',
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm">{item}</p>
          </div>
        ))}
      </div>
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 mb-10">
        <p className="text-white font-black text-sm mb-1">Caso real DOMIS™ — Providencia</p>
        <p className="text-slate-400 text-sm leading-relaxed">
          La auditoría detectó que la superficie real era 12m² menor a la declarada en escritura. El vendedor no lo sabía — o no lo declaró. DOMIS™ documentó la discrepancia y generó un argumento de negociación que permitió una rebaja del 11% sobre el precio publicado.
        </p>
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Qué hacer si detectas ampliación sin permiso antes de comprar
      </h2>
      <div className="space-y-3 mb-10">
        {[
          'No firmes la promesa hasta tener claridad sobre la situación legal',
          'Solicita al vendedor los planos DOM, el certificado de recepción y el informe de avalúo fiscal',
          'Consulta con un arquitecto si la ampliación es regularizable según norma actual de la comuna',
          'Si es regularizable: negociar el precio incluyendo el costo de regularización a cargo del vendedor o como descuento',
          'Si no es regularizable: negociar fuerte o descartar la propiedad',
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-cyan-400 font-black text-[10px]">{i + 1}</span>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">{step}</p>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <p className="text-white font-black uppercase tracking-tight mb-2">¿Tienes una propiedad en mente?</p>
        <p className="text-slate-400 text-sm mb-4">La auditoría PCF-15™ mide, compara y documenta toda discrepancia de metros antes de la promesa.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero verificar si una propiedad en Santiago tiene metros sin permiso antes de comprar."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Verificar metros <ArrowRight size={14} />
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
        <a href="/blog/que-revisar-al-comprar-propiedad-usada-santiago" className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group">
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Checklist</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">Qué revisar al comprar una propiedad usada en Santiago: checklist PCF-15™</p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
      </div>

    </BlogLayout>
  );
}
