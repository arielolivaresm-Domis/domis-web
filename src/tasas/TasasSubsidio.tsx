import { ArrowDown, Calculator, Clock, Home, PiggyBank, TrendingUp, Wallet } from 'lucide-react';
import {
  TASA_MERCADO,
  TASA_MERCADO_FUENTE,
  TASAS_ADSCRITAS,
  ENTIDADES_ADSCRITAS,
  TASAS_ACTUALIZADAS,
  TASAS_FECHA_CONSULTA,
  PIE_MINIMO_FOGAES,
  SUBSIDIO_TOPE_UF,
  SUBSIDIO_CUPOS,
  SUBSIDIO_VIGENCIA,
  SUBSIDIO_LEY,
  TRAMO_4000,
} from './config';
import { pct } from './hipoteca';

interface Props {
  // Al elegir una entidad, la calculadora toma su tasa con subsidio.
  onSimular: (tasa: number, entidad: string) => void;
}

const tasaMinima = Math.min(...TASAS_ADSCRITAS.map(t => t.tasa));

const CLAVES = [
  {
    icon: Wallet,
    titulo: 'El pie dejó de ser la barrera',
    texto: `Con la garantía estatal FOGAES puedes financiar con ${PIE_MINIMO_FOGAES}% de pie en vez del 20% habitual. Llegas antes a la compra con el mismo ahorro.`,
  },
  {
    icon: TrendingUp,
    titulo: 'Un punto menos de tasa es más poder de compra',
    texto: 'Un dividendo más bajo exige menos renta para aprobar el crédito. Con la misma renta, el banco te financia una propiedad de mayor valor.',
  },
  {
    icon: Clock,
    titulo: 'El beneficio tiene fecha de término',
    texto: `El programa contempla ${SUBSIDIO_CUPOS} cupos, disponibles hasta ${SUBSIDIO_VIGENCIA} o hasta que se agoten. La rebaja se mantiene durante toda la vida del crédito.`,
  },
  {
    icon: PiggyBank,
    titulo: 'Esperar también es una decisión',
    texto: 'Mientras el ahorro está quieto, los cupos se consumen y los precios en UF siguen su curso. Conviene simular hoy y decidir con números.',
  },
];

export default function TasasSubsidio({ onSimular }: Props) {
  return (
    <section aria-labelledby="tasas-titulo" className="px-4 sm:px-6 pt-16 sm:pt-24 pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">
          Subsidio a la tasa hipotecaria · {TASAS_ACTUALIZADAS}
        </p>
        <h1 id="tasas-titulo" className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.05] max-w-3xl text-balance">
          Tu poder de compra real no es el que crees
        </h1>
        <p className="mt-5 text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          El subsidio del Estado a la tasa hipotecaria baja el dividendo de toda la vida del crédito.
          Eso cambia cuánto puedes comprar con la misma renta.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 max-w-xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs uppercase tracking-widest text-slate-500">Sin subsidio</p>
            <p className="mt-2 font-mono text-3xl sm:text-4xl font-bold text-slate-300 tabular-nums">{pct(TASA_MERCADO)}</p>
            <p className="mt-1 text-xs text-slate-500">promedio de mercado</p>
          </div>
          <div className="rounded-2xl border border-cyan-400/40 bg-cyan-400/5 p-5">
            <p className="text-xs uppercase tracking-widest text-cyan-400">Con subsidio</p>
            <p className="mt-2 font-mono text-3xl sm:text-4xl font-bold text-cyan-300 tabular-nums">
              <span className="text-base font-sans font-semibold text-cyan-400/80 mr-1">desde</span>{pct(tasaMinima)}
            </p>
            <p className="mt-1 text-xs text-slate-500">mejor tasa adscrita</p>
          </div>
        </div>

        {/* Tabla adscritas */}
        <div className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Tasa con subsidio, entidad por entidad</h2>
          <p className="mt-2 text-sm text-slate-400">
            Tasas publicadas por cada entidad, de menor a mayor. Toca <span className="text-cyan-400">Simular</span> para cargar esa tasa en la calculadora.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800">
            <table className="w-full text-sm">
              <caption className="sr-only">Tasas hipotecarias con subsidio por entidad</caption>
              <thead className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th scope="col" className="text-left font-semibold px-4 py-3">Entidad</th>
                  <th scope="col" className="text-right font-semibold px-2 py-3">Con subsidio</th>
                  <th scope="col" className="text-right font-semibold px-2 py-3 hidden sm:table-cell">vs mercado</th>
                  <th scope="col" className="px-3 py-3"><span className="sr-only">Acción</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {TASAS_ADSCRITAS.map((t, idx) => (
                  <tr key={t.entidad} className="bg-slate-950 hover:bg-slate-900/70 transition-colors">
                    <th scope="row" className="text-left font-medium text-slate-200 px-4 py-3">
                      {t.entidad}
                      {idx === 0 && <span className="ml-2 align-middle text-[10px] uppercase tracking-wider text-cyan-400 border border-cyan-400/40 rounded-full px-1.5 py-0.5">Mejor</span>}
                      {t.nota && <span className="block text-xs font-normal text-slate-500 mt-0.5">{t.nota}</span>}
                      <a href={t.fuente} target="_blank" rel="noopener noreferrer" className="text-[11px] font-normal text-slate-500 underline underline-offset-2 hover:text-cyan-300">Fuente</a>
                    </th>
                    <td className="text-right font-mono tabular-nums font-bold text-white px-2 py-3">{pct(t.tasa)}</td>
                    <td className="text-right font-mono tabular-nums text-emerald-400 px-2 py-3 hidden sm:table-cell">−{(TASA_MERCADO - t.tasa).toFixed(2).replace('.', ',')}</td>
                    <td className="text-right px-3 py-2">
                      <button
                        type="button"
                        onClick={() => onSimular(t.tasa, t.entidad)}
                        aria-label={`Simular con tasa de ${t.entidad}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-cyan-400 hover:text-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
                      >
                        <Calculator size={13} aria-hidden="true" />
                        <span className="hidden sm:inline">Simular</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Ofertas comerciales publicadas por cada institución, consultadas el {TASAS_FECHA_CONSULTA} en la fuente indicada ({TASAS_ACTUALIZADAS}). Pueden cambiar sin aviso
            y cada institución confirma la tasa aplicable solo después de evaluarte. No existe una tabla oficial única por entidad.
            Diferencia en puntos porcentuales contra la tasa promedio de mercado ({pct(TASA_MERCADO)}, {TASA_MERCADO_FUENTE}).
            <span className="block mt-1.5">La tasa de interés no es el costo total del crédito: pide a cada banco la Carga Anual Equivalente (CAE). DOMIS™ no tiene relación comercial con estas instituciones ni recibe pagos de ellas; sus nombres y marcas pertenecen a sus titulares.</span>
          </p>
        </div>

        {/* Entidades adscritas — listado oficial MINVU */}
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Dónde pedirlo: {ENTIDADES_ADSCRITAS.length} entidades adscritas</h2>
          <p className="mt-2 text-sm text-slate-400 max-w-2xl">
            Listado oficial del MINVU (minvu.gob.cl/fogaes, consultado el {TASAS_FECHA_CONSULTA}). El subsidio se aplica automáticamente al aprobar el crédito en cualquiera de ellas; no hay postulación aparte.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {ENTIDADES_ADSCRITAS.map(e => (
              <li key={e} className="rounded-full border border-slate-800 bg-slate-900/40 px-3 py-1.5 text-sm text-slate-300">{e}</li>
            ))}
          </ul>
        </div>

        {/* Claves */}
        <div className="mt-16">
          <h2 className="text-xl sm:text-2xl font-bold text-white">Lo que pocos explican del subsidio</h2>
          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {CLAVES.map(({ icon: Icon, titulo, texto }) => (
              <article key={titulo} className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
                <Icon size={20} className="text-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 font-semibold text-white">{titulo}</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">{texto}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Requisitos */}
        <div className="mt-10 rounded-2xl border border-slate-800 p-6 text-sm text-slate-400 leading-relaxed">
          <p className="font-semibold text-slate-200 mb-2">Requisitos generales</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Vivienda nueva (primera venta), de hasta UF {SUBSIDIO_TOPE_UF.toLocaleString('es-CL')}.</li>
            <li>Comprador persona natural.</li>
            <li>Crédito cursado con una entidad adscrita al programa.</li>
          </ul>
          <p className="mt-3 text-xs text-slate-500">Condiciones según {SUBSIDIO_LEY} (ampliación del subsidio y FOGAES).</p>
        </div>

        {/* Tramo 4.000 — usadas */}
        <div className="mt-4 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6 flex gap-4">
          <Home size={20} className="text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="text-sm leading-relaxed">
            <p className="font-semibold text-white">Viviendas usadas: Tramo 4.000, desde {TRAMO_4000.desde}</p>
            <p className="mt-1 text-slate-400">
              Un nuevo tramo extiende el subsidio a la tasa y la garantía FOGAES a viviendas nuevas <span className="text-slate-200">o usadas</span> de
              hasta UF {TRAMO_4000.topeUF.toLocaleString('es-CL')} (UF {TRAMO_4000.topeZonasExtremasUF.toLocaleString('es-CL')} en zonas extremas),
              para primera o segunda vivienda. Suma un subsidio de UF {TRAMO_4000.subsidioUF} con ahorro mínimo de UF {TRAMO_4000.ahorroMinimoUF}.
              Parte con {TRAMO_4000.cupos} cupos en convocatoria especial. Según anuncio del Gobierno; requisitos por confirmar en el reglamento.
            </p>
          </div>
        </div>

        <a
          href="#simulador"
          className="mt-12 inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-colors"
        >
          Calcula tu poder de compra <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
