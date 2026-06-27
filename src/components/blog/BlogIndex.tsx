import { useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';

const articulos = [
  {
    slug: '/blog/inspector-de-propiedades-santiago',
    badge: 'Inspector de propiedades · Santiago',
    titulo: 'Inspector de propiedades en Santiago: qué hace, cuánto cuesta y cómo elegir uno confiable',
    resumen: 'Inspector de propiedades, auditor técnico, inspección técnica inmobiliaria — mismo servicio, distinto alcance. PCF-15™ incluye FLIR, dron y detector gas. Desde $1.800/m² + IVA.',
    tiempo: '6 min lectura',
  },
  {
    slug: '/blog/vicios-ocultos-propiedad-chile',
    badge: 'Vicios ocultos · Ley Chile',
    titulo: 'Vicios ocultos en propiedad Chile: qué son, plazo legal para reclamar y cómo detectarlos antes de comprar',
    resumen: 'El Código Civil te protege — pero tienes 1 año para reclamar desde la entrega. Qué dice el artículo 1860, quién paga y por qué detectarlos antes de comprar siempre es mejor que demandar después.',
    tiempo: '7 min lectura',
  },
  {
    slug: '/blog/como-inspeccionar-departamento-antes-de-comprar-santiago',
    badge: 'Departamentos · Inspección técnica',
    titulo: 'Cómo inspeccionar un departamento antes de comprarlo en Santiago: guía técnica 2026',
    resumen: 'Humedad de losa compartida, logia cerrada sin permiso, deuda de gastos comunes heredada. Los 5 riesgos específicos de departamentos usados y cómo detectarlos antes de firmar.',
    tiempo: '6 min lectura',
  },
  {
    slug: '/blog/errores-comprar-propiedad-usada-santiago',
    badge: 'Guía comprador · Riesgos',
    titulo: '7 errores al comprar propiedad usada en Santiago y cómo evitar cada uno',
    resumen: 'Desde firmar la promesa antes de inspeccionar hasta creerle al corredor del vendedor — los errores más costosos del mercado y el orden correcto para comprar con certeza.',
    tiempo: '8 min lectura',
  },
  {
    slug: '/blog/fallas-ocultas-casas-usadas-santiago',
    badge: 'Fallas ocultas · Propiedades usadas',
    titulo: 'Fallas ocultas en casas usadas: lo que no ves en la visita puede costarte millones',
    resumen: 'Humedad activa detrás de muros recién pintados, electricidad fuera de norma, techumbre deteriorada. Las 6 fallas más frecuentes y cómo la cámara térmica FLIR las detecta.',
    tiempo: '7 min lectura',
  },
  {
    slug: '/blog/camara-termica-inspeccion-inmobiliaria',
    badge: 'Termografía · Instrumentos',
    titulo: 'Cámara térmica en inspección de propiedades: qué detecta que el ojo humano no puede ver',
    resumen: 'La FLIR convierte diferencias de temperatura en evidencia técnica: filtraciones activas, sobrecarga eléctrica, puentes térmicos. Todo sin tocar ni romper nada.',
    tiempo: '6 min lectura',
  },
  {
    slug: '/blog/ampliaciones-sin-permiso-chile',
    badge: 'Permisos · Irregularidades',
    titulo: 'Ampliaciones sin permiso en Chile: qué pasa si compras metros ilegales sin saberlo',
    resumen: 'Crédito hipotecario reducido, tasación inferior al precio pagado, multas y posible demolición. Cómo detectar metros no declarados antes de firmar la promesa.',
    tiempo: '6 min lectura',
  },
  {
    slug: '/blog/cuanto-cuesta-auditoria-tecnica-propiedad-santiago',
    badge: 'Precios · Auditoría técnica',
    titulo: 'Cuánto cuesta una auditoría técnica de propiedad en Santiago: precios, qué incluye y si vale la pena',
    resumen: 'Respuesta directa: $1.900/m² + IVA propiedad usada, $1.800/m² + IVA propiedad nueva. Mínimo 100m². Y por qué la matemática dice que siempre vale la pena.',
    tiempo: '5 min lectura',
  },
  {
    slug: '/blog/como-negociar-precio-propiedad-usada-santiago',
    badge: 'Negociación · Propiedades usadas',
    titulo: 'Cómo negociar el precio de una propiedad usada en Santiago (con evidencia técnica)',
    resumen: 'Los consejos genéricos dejan dinero sobre la mesa. La palanca real es llevar un informe técnico con hallazgos valorizados en UF antes de la promesa — no una oferta baja sin respaldo.',
    tiempo: '7 min lectura',
  },
  {
    slug: '/blog/buyer-agent-chile',
    badge: 'Buyer\'s Agent · Mercado inmobiliario',
    titulo: 'Buyer\'s agent en Chile: qué es, cómo funciona y por qué el mercado lo necesitaba',
    resumen: 'En Chile todos los corredores trabajan para el vendedor. Un buyer\'s agent trabaja exclusivamente para ti: audita la propiedad, detecta fallas y negocia el precio a tu favor.',
    tiempo: '7 min lectura',
  },
  {
    slug: '/blog/garantia-propiedades-nuevas-chile',
    badge: 'Guía técnica · Propiedades nuevas',
    titulo: 'Garantía de 3, 5 y 10 años en propiedades nuevas: qué cubre y cómo hacerla valer',
    resumen: 'La ley te entrega una protección real. Pero activarla cuando la necesitas depende de algo que casi nadie hace en el momento correcto: documentar el estado de la propiedad antes de firmar.',
    tiempo: '6 min lectura',
  },
  {
    slug: '/blog/que-revisar-al-comprar-propiedad-usada-santiago',
    badge: 'Guía técnica · Propiedades usadas',
    titulo: 'Qué revisar al comprar una propiedad usada en Santiago: checklist técnico completo 2026',
    resumen: 'Los 15 puntos del PCF-15™, los instrumentos profesionales que marcan la diferencia y cómo usar los hallazgos para negociar el precio antes de firmar.',
    tiempo: '8 min lectura',
  },
];

export default function BlogIndex() {
  useEffect(() => {
    document.title = 'Blog DOMIS™ — Guías técnicas para comprar propiedades en Santiago';
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', 'Guías técnicas de DOMIS™ para comprar propiedades usadas en Santiago con certeza: checklist de inspección, negociación, vicios ocultos y más.');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="flex flex-col leading-none group" aria-label="Ir al inicio">
            <div className="flex items-start">
              <span className="text-xl font-black text-white tracking-tight uppercase leading-none group-hover:text-cyan-50 transition-colors">DOMIS</span>
              <span className="text-cyan-500 text-sm font-bold ml-1 relative top-[-2px]">™</span>
            </div>
            <span className="text-[9px] text-cyan-500 font-bold tracking-[0.35em] uppercase leading-none mt-0.5">PROPERTY-AUDIT</span>
          </a>
          <span className="text-cyan-400 font-black uppercase tracking-widest text-xs">Blog</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-5">
            <BookOpen size={11} />
            Guías técnicas DOMIS™
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-tight mb-4">
            Compra con certeza,<br />
            <span className="text-cyan-400 italic">no con esperanza.</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Guías técnicas para compradores de propiedades en Santiago. Sin jerga inmobiliaria — solo lo que necesitas saber para tomar la mejor decisión.
          </p>
        </div>

        {/* Artículos */}
        <div className="space-y-6">
          {articulos.map((art) => (
            <a
              key={art.slug}
              href={art.slug}
              className="block p-6 bg-slate-900 border border-white/10 rounded-2xl hover:border-cyan-500/40 transition-all group"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                {art.badge}
              </div>
              <h2 className="text-white font-black text-lg leading-tight mb-3 group-hover:text-cyan-400 transition-colors">
                {art.titulo}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {art.resumen}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-xs uppercase tracking-widest">{art.tiempo}</span>
                <span className="flex items-center gap-1 text-cyan-400 text-xs font-black uppercase tracking-widest group-hover:gap-2 transition-all">
                  Leer guía <ArrowRight size={12} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Próximamente */}
        <div className="mt-10 p-5 border border-white/5 rounded-2xl text-center">
          <p className="text-slate-600 text-xs uppercase tracking-widest">Próximamente</p>
          <p className="text-slate-500 text-sm mt-1">Vicios ocultos y la ley · Cómo leer un estudio de títulos · Propiedades en verde: riesgos reales · Remodelación después de comprar</p>
        </div>
      </main>

      {/* Footer CTA */}
      <div className="border-t border-white/10 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">¿Estás evaluando una propiedad?</p>
          <a
            href="https://wa.me/56929901343?text=Hola, vi el blog de DOMIS™ y quiero saber más."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-colors"
          >
            Cotiza tu auditoría →
          </a>
        </div>
      </div>
    </div>
  );
}
