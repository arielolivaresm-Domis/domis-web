import { useEffect } from 'react';
import { Building, CheckCircle, ArrowRight, AlertTriangle } from 'lucide-react';
import BlogLayout from './BlogLayout';

function HowToSchema() {
  useEffect(() => {
    const prev = document.getElementById('howto-departamento');
    if (prev) prev.remove();
    const s = document.createElement('script');
    s.id = 'howto-departamento';
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'Cómo inspeccionar un departamento antes de comprarlo en Santiago',
      description: 'Proceso técnico paso a paso para inspeccionar un departamento usado en Santiago antes de firmar la promesa.',
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Solicita documentación legal antes de la visita', text: 'Pide escritura, certificado de dominio CBR, planos DOM aprobados, certificado de recepción final, certificado de no deuda de gastos comunes y avalúo fiscal SII.' },
        { '@type': 'HowToStep', position: 2, name: 'Mide la superficie real con medidor láser', text: 'Compara los metros medidos físicamente contra lo declarado en escritura y avalúo SII. Logias o terrazas cerradas sin permiso inflan la superficie declarada sin existir legalmente.' },
        { '@type': 'HowToStep', position: 3, name: 'Inspecciona con cámara térmica FLIR', text: 'La cámara térmica detecta humedad oculta en muros y techo aunque la superficie parezca seca. Imprescindible para filtración desde el piso superior.' },
        { '@type': 'HowToStep', position: 4, name: 'Revisa instalaciones eléctricas y tablero del edificio', text: 'Verifica el tablero interior del departamento y el tablero del edificio. Un departamento con instalación correcta puede tener problemas si el tablero del edificio está subdimensionado.' },
        { '@type': 'HowToStep', position: 5, name: 'Verifica niveles y fisuras con nivelador láser Bosch', text: 'Detecta hundimientos, desplomes o fisuras estructurales no visibles a simple vista. El nivelador Bosch confirma si hay movimiento diferencial en la losa.' },
      ],
    });
    document.head.appendChild(s);
    return () => { document.getElementById('howto-departamento')?.remove(); };
  }, []);
  return null;
}

const meta = {
  title: 'Cómo inspeccionar un departamento antes de comprarlo en Santiago: guía técnica 2026 | DOMIS™',
  description: 'Inspeccionar un departamento antes de comprar en Santiago requiere más que una visita visual. Guía completa: qué revisar, cómo verificar la legalidad, servicios de inspección técnica disponibles.',
  url: 'https://www.domis.cl/blog/como-inspeccionar-departamento-antes-de-comprar-santiago',
  datePublished: '2026-06-27',
};

const diferenciasDpto = [
  {
    riesgo: 'Humedad de losa compartida con vecino de arriba',
    detalle: 'Una filtración en el piso de arriba es tu problema si el agua cae a tu techo. Invisible en la visita si el vecino no ha tenido lluvia reciente. La cámara térmica FLIR lo detecta aunque esté seco.',
  },
  {
    riesgo: 'Instalaciones eléctricas del edificio vs del departamento',
    detalle: 'El departamento puede tener instalación perfecta pero tablero del edificio subdimensionado o cargado. Hay que revisar ambos — no solo el tablero interior.',
  },
  {
    riesgo: 'Metros cuadrados declarados vs reales',
    detalle: 'En departamentos es frecuente que la superficie de la terraza o logia no esté bien declarada. A veces el propietario cerró la logia sin permiso — esos metros no existen legalmente.',
  },
  {
    riesgo: 'Deudas de gastos comunes pendientes',
    detalle: 'Las deudas de gastos comunes siguen a la unidad, no al propietario. Si compras con deuda, la heredas. Hay que verificar el certificado de deuda de la administración.',
  },
  {
    riesgo: 'Problemas de ventilación y aislación acústica',
    detalle: 'Especialmente en departamentos de los años 80–90 con doble vidrio inexistente y sin aislación entre losas. No es visible — se siente después de vivir ahí.',
  },
];

const documentos = [
  'Escritura de compraventa (superficie, linderos, gravámenes)',
  'Certificado de dominio vigente del Conservador de Bienes Raíces',
  'Planos DOM aprobados del departamento',
  'Certificado de recepción final del edificio',
  'Certificado de no deuda de gastos comunes',
  'Reglamento de copropiedad actualizado',
  'Avalúo fiscal SII (para verificar superficie declarada)',
];

const faqs = [
  {
    q: '¿Existen servicios de inspección técnica para departamentos usados en Santiago?',
    a: 'Sí. DOMIS™ realiza la auditoría técnica PCF-15™ para departamentos usados en Santiago Oriente (Las Condes, Providencia, La Reina, Vitacura, Ñuñoa). La inspección incluye cámara térmica FLIR para humedad, nivelador láser para fisuras y niveles, revisión eléctrica y verificación de superficie real vs escritura. Precio: $1.900/m² + IVA, mínimo 100m².',
  },
  {
    q: '¿Cómo verificar la legalidad de un departamento usado antes de comprarlo en Santiago?',
    a: 'Verificar: (1) certificado de dominio vigente del CBR — confirma quién es el dueño real y si hay hipotecas o gravámenes; (2) planos DOM aprobados — confirma que la superficie declarada coincide con los metros físicos; (3) certificado de recepción final — confirma que el edificio fue recibido conforme por la Dirección de Obras; (4) avalúo fiscal SII — confirma la superficie legal.',
  },
  {
    q: '¿Cómo inspeccionar un departamento antes de comprarlo en Santiago?',
    a: 'Una visita visual no es suficiente. Para inspeccionar correctamente un departamento necesitas: cámara térmica para detectar humedad oculta en muros y techo, nivelador láser para verificar fisuras y niveles, medición completa de superficie vs escritura, y revisión de documentación legal. DOMIS™ cubre todos estos puntos en la auditoría PCF-15™.',
  },
  {
    q: '¿Cuáles son los problemas más frecuentes en departamentos usados en Santiago?',
    a: 'Los más frecuentes: humedad de losa compartida con el piso de arriba, instalaciones eléctricas intervenidas sin seguir norma SEC, superficie real menor a la declarada en escritura, deudas de gastos comunes no declaradas por el vendedor, y aislación acústica deficiente en edificios de los años 80–90.',
  },
  {
    q: '¿Qué documentos debo pedir antes de comprar un departamento usado?',
    a: 'Escritura vigente, certificado de dominio del CBR, planos DOM aprobados, certificado de recepción final del edificio, certificado de no deuda de gastos comunes de la administración, reglamento de copropiedad y avalúo fiscal del SII. DOMIS™ revisa toda esta documentación como parte de la auditoría técnica.',
  },
];

export default function ArticuloDepartamento() {
  return (
    <BlogLayout meta={meta}>
      <HowToSchema />

      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest">
          <Building size={10} /> Departamentos · Inspección técnica
        </span>
        <span className="text-slate-600 text-xs">Junio 2026 · 6 min lectura</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
        Cómo inspeccionar un departamento antes de comprarlo en Santiago:<br />
        <span className="text-cyan-400 italic">lo que la visita no te muestra</span>
      </h1>

      <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
        Un departamento tiene riesgos distintos a una casa. La humedad puede venir del piso de arriba. Los metros cuadrados de la logia cerrada no existen legalmente. Las deudas de gastos comunes te las heredas. El tablero del edificio puede estar sobrecargado aunque el interior esté impecable.
      </p>
      <p className="text-slate-300 text-base leading-relaxed mb-10">
        Una visita visual no detecta ninguno de estos problemas. Esta guía cubre qué inspeccionar, cómo hacerlo y qué documentación verificar antes de firmar la promesa.
      </p>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-6">
        Los 5 riesgos específicos de un departamento usado que no se ven en la visita
      </h2>
      <div className="space-y-4 mb-10">
        {diferenciasDpto.map((d, i) => (
          <div key={i} className="p-5 bg-slate-900 border border-white/10 rounded-2xl">
            <div className="flex items-start gap-3">
              <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-black text-sm mb-1">{d.riesgo}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{d.detalle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Qué revisar técnicamente en un departamento antes de comprar
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {[
          { instrumento: 'Cámara Térmica FLIR', que: 'Humedad oculta en muros, techo y losa. Filtraciones activas desde el departamento de arriba o desde fachada.' },
          { instrumento: 'Nivelador Láser Bosch', que: 'Fisuras en muros y losa, desplomes, dimensiones reales de cada recinto vs escritura.' },
          { instrumento: 'Revisión eléctrica', que: 'Tablero interior y tablero del edificio. Circuitos, capacidad, diferenciales y tierra.' },
          { instrumento: 'Revisión documental', que: 'Escritura, planos DOM, recepción final, deuda gastos comunes, avalúo SII.' },
        ].map((item, i) => (
          <div key={i} className="p-4 bg-slate-900 border border-white/10 rounded-xl">
            <div className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-2">{item.instrumento}</div>
            <p className="text-slate-400 text-xs leading-relaxed">{item.que}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">
        Documentos que debes pedir antes de comprar un departamento usado
      </h2>
      <div className="space-y-2 mb-10">
        {documentos.map((doc, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 text-sm">{doc}</p>
          </div>
        ))}
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-5 mb-10">
        <p className="text-white font-black text-sm mb-2">Caso real DOMIS™ — Las Condes</p>
        <p className="text-slate-400 text-sm leading-relaxed">
          La auditoría detectó humedad activa en la losa de la habitación principal proveniente del departamento de arriba, y 8m² de logia cerrada sin permiso. El precio publicado era UF 5.200. Con el informe PCF-15™ se negoció una rebaja de UF 670 (~12,9%) antes de firmar la promesa.
        </p>
      </div>

      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-10 text-center">
        <Building size={28} className="text-cyan-400 mx-auto mb-3" />
        <p className="text-white font-black uppercase tracking-tight mb-2">¿Evaluando un departamento en Santiago?</p>
        <p className="text-slate-400 text-sm mb-4">Auditoría técnica PCF-15™ antes de la promesa. Desde $1.800/m² + IVA.</p>
        <a
          href="https://wa.me/56929901343?text=Hola, quiero una inspección técnica para un departamento usado en Santiago antes de comprarlo."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-xs px-6 py-3 rounded-full transition-colors"
        >
          Inspeccionar departamento <ArrowRight size={14} />
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
        <a href="/blog/ampliaciones-sin-permiso-chile" className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group">
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Permisos</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">Ampliaciones sin permiso: qué pasa si compras metros ilegales sin saberlo</p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
        <a href="/blog/errores-comprar-propiedad-usada-santiago" className="flex items-center justify-between p-5 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group">
          <div>
            <p className="text-[10px] text-cyan-400 font-black uppercase tracking-widest mb-1">Errores frecuentes</p>
            <p className="text-white font-black text-sm group-hover:text-cyan-400 transition-colors">7 errores al comprar propiedad usada en Santiago y cómo evitar cada uno</p>
          </div>
          <ArrowRight size={16} className="text-slate-500 group-hover:text-cyan-400 transition-colors shrink-0 ml-4" />
        </a>
      </div>

    </BlogLayout>
  );
}
