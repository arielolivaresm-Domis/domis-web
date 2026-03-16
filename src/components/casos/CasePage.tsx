import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface CaseData {
  slug: string;
  cliente: string;
  comuna: string;
  ahorro: string;
  porcentaje: string;
  precioOriginal: string;
  precioFinal: string;
  hallazgos: string[];
  historia: string[];
  schemaJson: object;
  metaTitle: string;
  metaDescription: string;
}

export default function CasePage({ data }: { data: CaseData }) {
  useEffect(() => {
    document.title = data.metaTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', data.metaDescription);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `schema-caso-${data.slug}`;
    script.text = JSON.stringify(data.schemaJson);
    document.head.appendChild(script);

    return () => {
      document.title = 'DOMIS™ | Negociación Técnica Inmobiliaria';
      document.getElementById(`schema-caso-${data.slug}`)?.remove();
    };
  }, [data]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-10">
          <Link to="/" className="hover:text-white transition-colors">domis.cl</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Casos reales</span>
          <span className="mx-2">/</span>
          <span className="text-slate-400">{data.cliente}</span>
        </nav>

        {/* Header del caso */}
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-amber-400 mb-3">
            Caso real documentado — {data.comuna}
          </p>
          <h1 className="text-4xl font-bold text-white leading-tight mb-4">
            {data.cliente} ahorró <span className="text-amber-400">{data.ahorro}</span>
          </h1>
          <p className="text-xl text-slate-400">
            {data.porcentaje} del precio de publicación — antes de firmar la promesa de compra.
          </p>
        </header>

        {/* Números clave */}
        <section className="grid grid-cols-3 gap-4 mb-12" aria-label="Resumen del caso">
          <div className="bg-slate-900 rounded-xl p-5 text-center border border-slate-800">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Precio original</p>
            <p className="text-lg font-bold text-slate-200">{data.precioOriginal}</p>
          </div>
          <div className="bg-amber-950 rounded-xl p-5 text-center border border-amber-800">
            <p className="text-xs text-amber-400 uppercase tracking-wide mb-1">Ahorro logrado</p>
            <p className="text-lg font-bold text-amber-300">{data.ahorro}</p>
          </div>
          <div className="bg-slate-900 rounded-xl p-5 text-center border border-slate-800">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Precio final</p>
            <p className="text-lg font-bold text-slate-200">{data.precioFinal}</p>
          </div>
        </section>

        {/* Historia */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">El caso</h2>
          {data.historia.map((parrafo, i) => (
            <p key={i} className="text-slate-300 leading-relaxed mb-4">{parrafo}</p>
          ))}
        </section>

        {/* Hallazgos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            Lo que encontró la auditoría PCF-15™
          </h2>
          <ul className="space-y-3">
            {data.hallazgos.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-300">
                <span className="mt-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 border border-slate-700 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            ¿Estás comprando en {data.comuna} o comunas cercanas?
          </h2>
          <p className="text-slate-400 mb-6">
            La auditoría PCF-15™ se realiza antes de que firmes cualquier documento.
            Un DM puede ser la decisión más rentable que tomes en este proceso.
          </p>
          <a
            href="https://www.instagram.com/domis.chile"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-400 text-slate-950 font-bold px-8 py-3 rounded-xl hover:bg-amber-300 transition-colors"
          >
            Escribir a @domis.chile
          </a>
          <p className="text-slate-600 text-sm mt-4">
            O por email a <a href="mailto:ariel@domis.cl" className="text-slate-400 hover:text-white">ariel@domis.cl</a>
          </p>
        </section>

        {/* Otros casos */}
        <nav className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm mb-4">Otros casos documentados</p>
          <div className="flex flex-col gap-2">
            {data.slug !== 'carolina-la-reina' && (
              <Link to="/casos/carolina-la-reina" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Carolina & Roberto — La Reina: $141.710.795 ahorrados (18%) →
              </Link>
            )}
            {data.slug !== 'andrea-providencia' && (
              <Link to="/casos/andrea-providencia" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Andrea — Providencia: $68.218.952 ahorrados (11%) →
              </Link>
            )}
            {data.slug !== 'felipe-las-condes' && (
              <Link to="/casos/felipe-las-condes" className="text-slate-400 hover:text-amber-400 transition-colors text-sm">
                Felipe — Las Condes: $39.550.715 ahorrados (9%) →
              </Link>
            )}
          </div>
        </nav>

      </div>
    </div>
  );
}
