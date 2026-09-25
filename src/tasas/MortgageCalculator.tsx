import { useId, useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertTriangle, ChevronDown, RefreshCw } from 'lucide-react';
import {
  DEFAULTS,
  RANGOS,
  TASA_MERCADO,
  TASAS_ADSCRITAS,
  SUBSIDIO_TOPE_UF,
  PIE_MINIMO_FOGAES,
  GASTOS_OPERACIONALES_PCT,
  RATIO_DIVIDENDO_RENTA,
  TIMBRES_GENERAL_PCT,
} from './config';
import { calcularCredito, clp, uf, pct } from './hipoteca';
import { useValorUF } from './useValorUF';
import { CampoRango, Chip, Linea, inputCls } from './controles';
import { clamp, num } from './utils';

type Moneda = '$' | 'UF';

export interface TasaExterna {
  valor: number;
  entidad: string;
  nonce: number; // cambia en cada clic para re-aplicar aunque la tasa sea la misma
}

interface Props {
  tasaExterna?: TasaExterna | null;
}

const MEJOR_TASA = Math.min(...TASAS_ADSCRITAS.map(t => t.tasa));

export default function MortgageCalculator({ tasaExterna }: Props) {
  const ufDia = useValorUF();
  const [moneda, setMoneda] = useState<Moneda>('UF');
  const [precioUF, setPrecioUF] = useState(DEFAULTS.precioUF);
  const [piePct, setPiePct] = useState(DEFAULTS.piePct);
  const [bonoPiePct, setBonoPiePct] = useState(DEFAULTS.bonoPiePct);
  const [tasa, setTasa] = useState(DEFAULTS.tasa);
  const [entidad, setEntidad] = useState<string | null>(null);
  const [plazo, setPlazo] = useState(DEFAULTS.plazoAnios);
  const [verTabla, setVerTabla] = useState(false);

  // Tasa elegida desde la tabla: se aplica una vez por clic (nonce)
  const [nonceAplicado, setNonceAplicado] = useState<number | null>(null);
  if (tasaExterna && tasaExterna.nonce !== nonceAplicado) {
    setNonceAplicado(tasaExterna.nonce);
    setTasa(tasaExterna.valor);
    setEntidad(tasaExterna.entidad);
  }

  const U = ufDia.valor;
  const r = useMemo(
    () => calcularCredito({ precioUF, piePct, bonoPiePct, tasaAnual: tasa, plazoAnios: plazo, timbresPct: TIMBRES_GENERAL_PCT }),
    [precioUF, piePct, bonoPiePct, tasa, plazo],
  );
  const rMercado = useMemo(
    () => calcularCredito({ precioUF, piePct, bonoPiePct, tasaAnual: TASA_MERCADO, plazoAnios: plazo, timbresPct: TIMBRES_GENERAL_PCT }),
    [precioUF, piePct, bonoPiePct, plazo],
  );

  // Moneda de entrada: los montos se guardan en UF y se muestran en la moneda elegida
  const aMoneda = (valorUF: number) => (moneda === 'UF' ? +valorUF.toFixed(2) : Math.round(valorUF * U));
  const desdeMoneda = (v: number) => (moneda === 'UF' ? v : v / U);
  const doble = (valorUF: number) => (
    <>
      <span className="font-mono tabular-nums">{clp(valorUF * U)}</span>
      <span className="text-slate-500 font-mono tabular-nums text-[0.85em]"> / {uf(valorUF)}</span>
    </>
  );

  const ahorroMes = rMercado.dividendoMes1UF - r.dividendoMes1UF;
  const ahorroTotal = rMercado.totalPagadoUF - r.totalPagadoUF;
  const fueraTope = precioUF > SUBSIDIO_TOPE_UF;
  const pieBajo = piePct < PIE_MINIMO_FOGAES;

  const desglose = [
    { nombre: 'Pie y bono pie', valor: r.pieUF + r.bonoPieUF, color: '#22d3ee' },
    { nombre: 'Capital del préstamo', valor: r.prestamoUF, color: '#0e7490' },
    { nombre: 'Intereses', valor: r.totalInteresesUF, color: '#f59e0b' },
    { nombre: 'Seguros', valor: r.totalSegurosUF, color: '#a78bfa' },
    { nombre: 'Gastos operacionales', valor: r.gastosOperacionalesUF, color: '#64748b' },
  ];

  return (
    <section id="simulador" aria-labelledby="sim-titulo" className="px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800/80 scroll-mt-4">
      <div className="max-w-5xl mx-auto">
        <h2 id="sim-titulo" className="text-2xl sm:text-4xl font-black text-white tracking-tight">Simulador de crédito hipotecario</h2>
        <p className="mt-3 text-slate-400 max-w-2xl">
          Ajusta precio, pie, tasa y plazo. Todo se recalcula al instante.
        </p>

        {/* Barra moneda + UF */}
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3">
          <fieldset className="flex items-center gap-3">
            <legend className="sr-only">Moneda de ingreso</legend>
            <span className="text-sm text-slate-400">Ingresar montos en</span>
            <div className="inline-flex rounded-full bg-slate-950 p-1 border border-slate-800">
              {(['UF', '$'] as Moneda[]).map(m => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={moneda === m}
                  onClick={() => setMoneda(m)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${moneda === m ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="text-sm text-slate-400 flex items-center gap-2">
            {ufDia.cargando && <RefreshCw size={13} className="animate-spin" aria-hidden="true" />}
            Valor UF{ufDia.fecha ? ` al ${ufDia.fecha}` : ' (referencial)'}:
            <span className="font-mono tabular-nums text-slate-200">{clp(U)}</span>
          </p>
        </div>

        <div className="mt-6 grid lg:grid-cols-[1fr_1.05fr] gap-6">
          {/* ------------------------- INPUTS ------------------------- */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 space-y-7">
            <CampoMonto
              label="Precio de la propiedad"
              moneda={moneda}
              valor={aMoneda(precioUF)}
              onChange={v => setPrecioUF(Math.max(desdeMoneda(v), 0))}
            />

            <CampoPorcentaje
              label="Pie"
              moneda={moneda}
              monto={aMoneda(r.pieUF)}
              porcentaje={piePct}
              rango={RANGOS.piePct}
              onMonto={v => setPiePct(clamp((desdeMoneda(v) / (precioUF || 1)) * 100, 0, 100))}
              onPorcentaje={p => setPiePct(clamp(p, 0, 100))}
              nota={pieBajo ? `Bajo ${PIE_MINIMO_FOGAES}% de pie no aplica la garantía FOGAES.` : piePct < 20 ? 'Pie bajo 20% requiere garantía estatal FOGAES.' : undefined}
            />

            <CampoPorcentaje
              label="Bono pie (opcional)"
              moneda={moneda}
              monto={aMoneda(r.bonoPieUF)}
              porcentaje={bonoPiePct}
              rango={RANGOS.bonoPiePct}
              onMonto={v => setBonoPiePct(clamp((desdeMoneda(v) / (precioUF || 1)) * 100, 0, 100 - piePct))}
              onPorcentaje={p => setBonoPiePct(clamp(p, 0, 100 - piePct))}
            />

            <div className="rounded-xl bg-cyan-400/10 border border-cyan-400/30 px-4 py-3">
              <p className="text-xs uppercase tracking-widest text-cyan-400">Monto del préstamo</p>
              <p className="mt-1 text-lg font-bold text-white">{doble(r.prestamoUF)}</p>
            </div>

            <div>
              <CampoRango
                label="Tasa de interés anual"
                sufijo="%"
                valor={tasa}
                rango={RANGOS.tasa}
                onChange={v => { setTasa(v); setEntidad(null); }}
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <Chip activo={Math.abs(tasa - TASA_MERCADO) < 0.001} onClick={() => { setTasa(TASA_MERCADO); setEntidad(null); }}>
                  Mercado {pct(TASA_MERCADO)}
                </Chip>
                <Chip activo={Math.abs(tasa - MEJOR_TASA) < 0.001} onClick={() => { setTasa(MEJOR_TASA); setEntidad(TASAS_ADSCRITAS[0].entidad); }}>
                  Mejor con subsidio {pct(MEJOR_TASA)}
                </Chip>
              </div>
              {entidad && <p className="mt-2 text-xs text-cyan-400">Tasa con subsidio de {entidad}</p>}
            </div>

            <CampoRango label="Plazo" sufijo="años" valor={plazo} rango={{ ...RANGOS.plazoAnios, step: 1 }} onChange={v => setPlazo(Math.round(v))} />
          </div>

          {/* ------------------------- OUTPUTS ------------------------- */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-cyan-400/40 bg-slate-900 p-5 sm:p-6" aria-live="polite">
              <p className="text-xs uppercase tracking-widest text-slate-400">Dividendo mensual estimado</p>
              <p className="mt-2 font-mono tabular-nums text-3xl sm:text-4xl font-bold text-white">{clp(r.dividendoMes1UF * U)}</p>
              <p className="font-mono tabular-nums text-cyan-300">{uf(r.dividendoMes1UF)}</p>

              <dl className="mt-5 space-y-2 text-sm">
                <Linea k="Capital + intereses" v={doble(r.cuotaUF)} />
                <Linea k="Seguro de desgravamen" v={doble(r.seguroDesgravamenMes1)} />
                <Linea k="Seguro incendio y sismo" v={doble(r.seguroIncendioMes)} />
              </dl>

              <div className="mt-5 pt-5 border-t border-slate-800">
                <p className="text-sm text-slate-400">Renta referencial</p>
                <p className="mt-1 text-lg font-bold text-white">{doble(r.rentaNecesariaUF)}</p>
                <p className="mt-1 text-xs text-slate-500">Regla general del mercado: dividendo hasta el {RATIO_DIVIDENDO_RENTA * 100}% de la renta líquida. Cada banco aplica sus propios criterios; no es una evaluación de tu caso.</p>
              </div>

              {ahorroMes > 0.005 && (
                <div className="mt-5 rounded-xl bg-emerald-400/10 border border-emerald-400/30 px-4 py-3 text-sm">
                  <p className="text-emerald-300 font-semibold">
                    Frente a la tasa de mercado ({pct(TASA_MERCADO)}) el dividendo estimado es <span className="font-mono tabular-nums">{clp(ahorroMes * U)}</span> menor al mes.
                  </p>
                  <p className="text-emerald-200/80 mt-1">
                    En todo el crédito: <span className="font-mono tabular-nums">{clp(ahorroTotal * U)}</span> menos · la renta referencial baja{' '}
                    <span className="font-mono tabular-nums">{clp((rMercado.rentaNecesariaUF - r.rentaNecesariaUF) * U)}</span>.
                  </p>
                </div>
              )}

              {fueraTope && (
                <p className="mt-4 flex gap-2 text-xs text-amber-300">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
                  El precio supera el tope de UF {SUBSIDIO_TOPE_UF.toLocaleString('es-CL')}: esta propiedad no accede al subsidio a la tasa.
                </p>
              )}
            </div>

            {/* Desglose */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6">
              <h3 className="font-semibold text-white">Costo total del crédito</h3>
              <div className="mt-4 grid gap-5 items-center">
                <div className="h-40 w-40 mx-auto" aria-hidden="true">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={desglose} dataKey="valor" nameKey="nombre" innerRadius="62%" outerRadius="100%" stroke="#020617" strokeWidth={2} isAnimationActive={false}>
                        {desglose.map(d => <Cell key={d.nombre} fill={d.color} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="space-y-2 text-sm">
                  {desglose.map(d => (
                    <li key={d.nombre} className="flex items-baseline gap-2">
                      <span className="h-2.5 w-2.5 rounded-sm shrink-0 translate-y-[1px]" style={{ background: d.color }} aria-hidden="true" />
                      <span className="text-slate-300 flex-1">{d.nombre}</span>
                      <span className="font-mono tabular-nums text-slate-200">{clp(d.valor * U)}</span>
                      <span className="font-mono tabular-nums text-slate-500 w-14 text-right">{pct((d.valor / r.totalPagadoUF) * 100)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="mt-5 pt-5 border-t border-slate-800 space-y-2 text-sm">
                <Linea k={`Total pagado (${plazo * 12} dividendos + pie + gastos)`} v={doble(r.totalPagadoUF)} fuerte />
                <Linea k={`Gastos operacionales + timbres (${GASTOS_OPERACIONALES_PCT}% + ${TIMBRES_GENERAL_PCT.toString().replace('.', ',')}% del préstamo)`} v={doble(r.gastosOperacionalesUF)} />
                <Linea k="Último dividendo" v={<span className="font-mono tabular-nums">{r.fechaTermino.toLocaleDateString('es-CL', { month: '2-digit', year: 'numeric' })}</span>} />
              </dl>
            </div>
          </div>
        </div>

        {/* Amortización */}
        <div className="mt-6 rounded-2xl border border-slate-800">
          <button
            type="button"
            aria-expanded={verTabla}
            aria-controls="tabla-amortizacion"
            onClick={() => setVerTabla(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-white hover:bg-slate-900/60 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 transition-colors"
          >
            Tabla de amortización por año
            <ChevronDown size={18} className={`text-cyan-400 transition-transform ${verTabla ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {verTabla && (
            <div id="tabla-amortizacion" className="overflow-x-auto border-t border-slate-800">
              <table className="w-full text-sm min-w-[640px]">
                <thead className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
                  <tr>
                    {['Año', 'Pago anual', 'Intereses', 'Amortización', 'Seguros', 'Saldo'].map(h => (
                      <th key={h} scope="col" className={`px-4 py-3 font-semibold ${h === 'Año' ? 'text-left' : 'text-right'}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono tabular-nums">
                  {r.tabla.map(f => (
                    <tr key={f.anio} className="hover:bg-slate-900/60">
                      <th scope="row" className="text-left px-4 py-2 text-slate-300 font-normal">{f.anio}</th>
                      <td className="text-right px-4 py-2 text-slate-200">{clp(f.pagoAnual * U)}</td>
                      <td className="text-right px-4 py-2 text-amber-300/90">{clp(f.intereses * U)}</td>
                      <td className="text-right px-4 py-2 text-cyan-300/90">{clp(f.amortizacion * U)}</td>
                      <td className="text-right px-4 py-2 text-violet-300/90">{clp(f.seguros * U)}</td>
                      <td className="text-right px-4 py-2 text-slate-400">{uf(f.saldo)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-4 py-3 text-xs text-slate-500">Montos en pesos al valor UF de hoy. El crédito se paga en UF, así que los pesos reales suben con la inflación.</p>
            </div>
          )}
        </div>
        <aside className="mt-6 rounded-2xl border border-slate-800 p-5 text-xs text-slate-400 leading-relaxed">
          <p className="text-sm font-semibold text-slate-200">Este simulador es referencial</p>
          <ul className="mt-2 space-y-1.5 list-disc pl-5">
            <li>No es una cotización ni una oferta de crédito. DOMIS™ no otorga créditos ni evalúa tu capacidad de pago.</li>
            <li>Los seguros (desgravamen, incendio y sismo) y los gastos operacionales (tasación, estudio de títulos, notaría, Conservador e impuesto de timbres) son estimaciones propias basadas en valores promedio de mercado; pueden variar significativamente.</li>
            <li>El resultado no es la Carga Anual Equivalente (CAE), el indicador oficial del costo total del crédito. Solo la institución financiera puede entregártela en su cotización formal: pídela siempre y úsala para comparar.</li>
            <li>No guardamos los datos que ingresas.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------
// Controles
// --------------------------------------------------------------------------


function CampoMonto({ label, moneda, valor, onChange }: { label: string; moneda: Moneda; valor: number; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{moneda}</span>
        <input id={id} type="number" inputMode="decimal" min={0} value={valor} onChange={e => onChange(num(e.target.value))} className={`${inputCls} pl-10`} />
      </div>
    </div>
  );
}

function CampoPorcentaje({
  label, moneda, monto, porcentaje, rango, onMonto, onPorcentaje, nota,
}: {
  label: string; moneda: Moneda; monto: number; porcentaje: number; rango: { min: number; max: number };
  onMonto: (v: number) => void; onPorcentaje: (p: number) => void; nota?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={`${id}-m`} className="block text-sm text-slate-300 mb-2">{label}</label>
      <div className="grid grid-cols-[1fr_96px] gap-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{moneda}</span>
          <input id={`${id}-m`} type="number" inputMode="decimal" min={0} value={monto} onChange={e => onMonto(num(e.target.value))} className={`${inputCls} pl-10`} />
        </div>
        <div className="relative">
          <input aria-label={`${label} en porcentaje`} type="number" inputMode="decimal" min={0} max={100} step={0.5} value={+porcentaje.toFixed(2)} onChange={e => onPorcentaje(num(e.target.value))} className={`${inputCls} pr-7`} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">%</span>
        </div>
      </div>
      <input
        aria-label={`${label}, deslizador`}
        type="range"
        min={rango.min}
        max={rango.max}
        step={0.5}
        value={clamp(porcentaje, rango.min, rango.max)}
        onChange={e => onPorcentaje(num(e.target.value))}
        className="mt-3 w-full accent-cyan-400 cursor-pointer"
      />
      {nota && <p className="mt-1 text-xs text-amber-300/90">{nota}</p>}
    </div>
  );
}
