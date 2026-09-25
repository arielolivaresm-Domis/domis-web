import { useId, useMemo, useState } from 'react';
import { AlertTriangle, ArrowRight, Building2, Home, Info, Scale } from 'lucide-react';
import {
  TASAS_ADSCRITAS,
  TASA_MERCADO,
  PIE_MINIMO_FOGAES,
  BRECHA_USADA_ORIENTE,
  DESCUENTO_DOMIS,
  HONORARIOS,
  REMODELACION,
  TRAMO_4000,
  TIMBRES_GENERAL_PCT,
  TIMBRES_NUEVA_DFL2_PCT,
  CASOS_DOMIS,
  CASOS_PERIODO,
  SUBSIDIO_TOPE_UF,
  conIva,
  type NivelRemodelacion,
} from './config';
import { calcularNueva, calcularUsada, descuentoEquilibrio, type Perfil } from './comparador';
import { clp, uf, pct } from './hipoteca';
import { useValorUF } from './useValorUF';
import { CampoRango, Chip, inputCls } from './controles';
import { clamp, num } from './utils';

const WHATSAPP = '56929901343';
const TASA_DEFECTO = TASAS_ADSCRITAS.find(t => t.entidad === 'Banco Santander') ?? TASAS_ADSCRITAS[0];

const NIVELES: { key: NivelRemodelacion; label: string }[] = [
  { key: 'ninguna', label: 'Ninguna' },
  { key: 'basico', label: REMODELACION.basico.label },
  { key: 'estandar', label: REMODELACION.estandar.label },
  { key: 'integral', label: REMODELACION.integral.label },
  { key: 'manual', label: 'Monto propio' },
];

export default function ComparadorNuevaUsada() {
  const { valor: U } = useValorUF();

  // Comunes
  const [perfil, setPerfil] = useState<Perfil>('vivir');
  const [m2, setM2] = useState(70);
  const [banos, setBanos] = useState(2);
  const [plazo, setPlazo] = useState(30);

  // Nueva
  const [precioNueva, setPrecioNueva] = useState(3500);
  const [pieNueva, setPieNueva] = useState(20);
  const [tasaNueva, setTasaNueva] = useState(TASA_DEFECTO.tasa);
  const [bancoNueva, setBancoNueva] = useState(TASA_DEFECTO.entidad);
  const [extras, setExtras] = useState(0);
  const [espera, setEspera] = useState(0);
  const [arriendo, setArriendo] = useState(15);

  // Usada
  const [publicada, setPublicada] = useState(Math.round(3500 * (1 - BRECHA_USADA_ORIENTE.trabajo / 100)));
  const [descuento, setDescuento] = useState(DESCUENTO_DOMIS.defecto);
  const [pieUsada, setPieUsada] = useState(20);
  const [tasaUsada, setTasaUsada] = useState(TASA_MERCADO);
  const [remodelacion, setRemodelacion] = useState<NivelRemodelacion>('estandar');
  const [remodelacionManual, setRemodelacionManual] = useState(250);
  const [tramo4000, setTramo4000] = useState(false);

  const comunes = useMemo(() => ({ m2, banos, plazoAnios: plazo, perfil, ufCLP: U }), [m2, banos, plazo, perfil, U]);
  const entradaNueva = useMemo(
    () => ({ precioUF: precioNueva, piePct: pieNueva, tasa: tasaNueva, extrasUF: extras, esperaMeses: espera, arriendoMesUF: arriendo }),
    [precioNueva, pieNueva, tasaNueva, extras, espera, arriendo],
  );
  const entradaUsada = useMemo(
    () => ({
      publicadoUF: publicada, descuentoPct: descuento, piePct: pieUsada, tasa: tasaUsada,
      remodelacion, remodelacionManualUF: remodelacionManual, tramo4000, tasaTramo4000: tasaNueva,
    }),
    [publicada, descuento, pieUsada, tasaUsada, remodelacion, remodelacionManual, tramo4000, tasaNueva],
  );

  const N = useMemo(() => calcularNueva(entradaNueva, comunes), [entradaNueva, comunes]);
  const S = useMemo(() => calcularUsada(entradaUsada, comunes), [entradaUsada, comunes]);
  const equilibrio = useMemo(() => descuentoEquilibrio(entradaNueva, entradaUsada, comunes), [entradaNueva, entradaUsada, comunes]);
  // Aporte neto de la negociación: costo total sin negociar − con negociación (ya descontados honorarios)
  const aporteNegociacion = useMemo(
    () => calcularUsada({ ...entradaUsada, descuentoPct: 0 }, comunes).totalUF - S.totalUF,
    [entradaUsada, comunes, S.totalUF],
  );

  const diferencia = N.totalUF - S.totalUF; // > 0: usada más barata
  const ganaUsada = diferencia > 0.5;
  const empate = Math.abs(diferencia) <= 0.5;
  const cajaExtra = S.inicialUF - N.inicialUF;
  const ahorroMes = N.dividendoUF - S.dividendoUF;
  const mesesRecupero = cajaExtra > 0 && ahorroMes > 0 ? Math.ceil(cajaExtra / ahorroMes) : null;
  const pctComision = perfil === 'invertir' ? HONORARIOS.comisionInversionPct : HONORARIOS.comisionVivirPct;
  const fmtPctIva = (p: number) => conIva(p).toLocaleString('es-CL', { maximumFractionDigits: 2 });

  const d = (valorUF: number) => (
    <span className="whitespace-nowrap">
      <span className="font-mono tabular-nums">{uf(valorUF)}</span>
      <span className="block text-[0.8em] text-slate-500 font-mono tabular-nums">{clp(valorUF * U)}</span>
    </span>
  );

  const mensajeWA = encodeURIComponent(
    `Hola equipo DOMIS™. Usé el comparador: nueva UF ${Math.round(precioNueva)} vs usada publicada UF ${Math.round(publicada)} (${m2} m²). ` +
    `Quiero evaluar la compra de una usada con auditoría y negociación.`,
  );

  return (
    <section id="comparador" aria-labelledby="cmp-titulo" className="px-4 sm:px-6 py-16 sm:py-20 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto">
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.2em] mb-4">Comparador DOMIS™</p>
        <h2 id="cmp-titulo" className="text-2xl sm:text-4xl font-black text-white tracking-tight text-balance">
          ¿Nueva con subsidio o usada bien comprada?
        </h2>
        <p className="mt-3 text-slate-400 max-w-2xl">
          Compara el costo real de las dos rutas: pie, gastos, dividendos, remodelación y honorarios incluidos. No solo la cuota.
        </p>

        {/* Comunes */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <fieldset className="col-span-2 sm:col-span-1">
            <legend className="text-sm text-slate-300 mb-2">Compro para</legend>
            <div className="inline-flex rounded-full bg-slate-950 p-1 border border-slate-800">
              {([['vivir', 'Vivir'], ['invertir', 'Invertir']] as [Perfil, string][]).map(([k, l]) => (
                <button key={k} type="button" aria-pressed={perfil === k} onClick={() => setPerfil(k)}
                  className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${perfil === k ? 'bg-cyan-400 text-slate-950' : 'text-slate-400 hover:text-white'}`}>
                  {l}
                </button>
              ))}
            </div>
          </fieldset>
          <CampoNum label="Superficie" sufijo="m²" valor={m2} onChange={v => setM2(clamp(Math.round(v), 20, 400))} />
          <CampoNum label="Baños" sufijo="" valor={banos} onChange={v => setBanos(clamp(Math.round(v), 1, 5))} />
          <CampoNum label="Plazo" sufijo="años" valor={plazo} onChange={v => setPlazo(clamp(Math.round(v), 5, 30))} />
        </div>

        {/* Entradas */}
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {/* NUEVA */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-white"><Building2 size={18} className="text-slate-400" aria-hidden="true" />Nueva con subsidio</h3>
            <CampoNum label="Precio" sufijo="UF" valor={precioNueva} onChange={v => setPrecioNueva(Math.max(v, 0))} />
            <div>
              <label htmlFor="cmp-banco" className="block text-sm text-slate-300 mb-2">Banco (tasa con subsidio)</label>
              <select id="cmp-banco" value={bancoNueva}
                onChange={e => { const t = TASAS_ADSCRITAS.find(x => x.entidad === e.target.value); setBancoNueva(e.target.value); if (t) setTasaNueva(t.tasa); }}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400">
                {TASAS_ADSCRITAS.map(t => <option key={t.entidad} value={t.entidad}>{t.entidad} — {pct(t.tasa)}</option>)}
                <option value="otra">Otra tasa</option>
              </select>
            </div>
            <CampoRango label="Tasa" sufijo="%" valor={tasaNueva} rango={{ min: 2, max: 8, step: 0.01 }}
              onChange={v => { setTasaNueva(v); setBancoNueva('otra'); }} />
            <Opciones label="Pie" valores={[PIE_MINIMO_FOGAES, 20]} valor={pieNueva} onChange={setPieNueva} sufijo="%" />
            <CampoNum label="Extras al contado (estacionamiento, bodega, equipamiento)" sufijo="UF" valor={extras} onChange={v => setExtras(Math.max(v, 0))} />
            <div className="grid grid-cols-2 gap-3">
              <CampoNum label="Espera (en verde)" sufijo="meses" valor={espera} onChange={v => setEspera(clamp(Math.round(v), 0, 48))} />
              <CampoNum label="Arriendo mientras" sufijo="UF/mes" valor={arriendo} onChange={v => setArriendo(Math.max(v, 0))} />
            </div>
          </div>

          {/* USADA */}
          <div className="rounded-2xl border border-cyan-400/30 bg-slate-900/40 p-5 sm:p-6 space-y-6">
            <h3 className="flex items-center gap-2 font-bold text-white"><Home size={18} className="text-cyan-400" aria-hidden="true" />Usada con DOMIS™</h3>
            <div>
              <CampoNum label="Precio publicado" sufijo="UF" valor={publicada} onChange={v => setPublicada(Math.max(v, 0))} />
              <button type="button" onClick={() => setPublicada(Math.round(precioNueva * (1 - BRECHA_USADA_ORIENTE.trabajo / 100)))}
                className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">
                Usar precio típico de una usada comparable (−{BRECHA_USADA_ORIENTE.trabajo}% vs nueva)
              </button>
            </div>
            <div>
              <CampoRango label="Negociación" sufijo="%" valor={descuento} rango={{ min: 0, max: 25, step: 0.5 }} onChange={setDescuento} />
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Referencia: {CASOS_DOMIS.length} operaciones negociadas por DOMIS™{CASOS_PERIODO ? ` entre ${CASOS_PERIODO}` : ''} ({CASOS_DOMIS.map(c => `${c.comuna} ${c.pct}%`).join(', ')}),
                medidas como precio publicado menos precio logrado. Es un resultado histórico de pocos casos, no un promedio de mercado ni una garantía: tu descuento puede ser menor o nulo.
              </p>
            </div>
            <CampoRango label="Tasa sin subsidio" sufijo="%" valor={tasaUsada} rango={{ min: 2, max: 8, step: 0.01 }} onChange={setTasaUsada} />
            <Opciones label="Pie" valores={[PIE_MINIMO_FOGAES, 20]} valor={pieUsada} onChange={setPieUsada} sufijo="%" />
            <fieldset>
              <legend className="text-sm text-slate-300 mb-2">Remodelación</legend>
              <div className="flex flex-wrap gap-2">
                {NIVELES.map(n => <Chip key={n.key} activo={remodelacion === n.key} onClick={() => setRemodelacion(n.key)}>{n.label}</Chip>)}
              </div>
              {remodelacion !== 'ninguna' && remodelacion !== 'manual' && (
                <p className="mt-2 text-xs text-slate-500">{REMODELACION[remodelacion].detalle}. Costos DOMIS™ 2026 con IVA: {uf(S.remodelacionUF)}.</p>
              )}
              {remodelacion === 'manual' && (
                <div className="mt-3"><CampoNum label="Monto remodelación" sufijo="UF" valor={remodelacionManual} onChange={v => setRemodelacionManual(Math.max(v, 0))} /></div>
              )}
            </fieldset>
            <label className="flex gap-3 items-start text-sm text-slate-300 cursor-pointer">
              <input type="checkbox" checked={tramo4000} onChange={e => setTramo4000(e.target.checked)} className="mt-1 accent-cyan-400" />
              <span>
                Simular Tramo 4.000 (subsidio UF {TRAMO_4000.subsidioUF} + tasa con subsidio)
                <span className="block text-xs text-amber-300/90">Anunciado para {TRAMO_4000.desde}; requisitos por confirmar en el reglamento.</span>
                {tramo4000 && !S.tramo4000Aplica && <span className="block text-xs text-red-400">No aplica: el precio supera UF {TRAMO_4000.topeUF.toLocaleString('es-CL')}.</span>}
              </span>
            </label>
          </div>
        </div>

        {/* Resultado */}
        <div className="mt-6 rounded-2xl border border-slate-800 overflow-hidden" aria-live="polite">
          <div className={`px-5 sm:px-6 py-5 flex gap-3 items-start ${ganaUsada ? 'bg-emerald-400/10 border-b border-emerald-400/30' : empate ? 'bg-slate-900 border-b border-slate-800' : 'bg-amber-400/10 border-b border-amber-400/30'}`}>
            <Scale size={22} className={ganaUsada ? 'text-emerald-400 shrink-0' : 'text-amber-300 shrink-0'} aria-hidden="true" />
            <div>
              <p className="text-lg sm:text-xl font-bold text-white">
                {empate ? 'Prácticamente empatan' : ganaUsada ? 'La usada con DOMIS™ sale más barata' : 'Con estos números, conviene la nueva'}
                {!empate && <> por <span className="font-mono tabular-nums">{uf(Math.abs(diferencia))}</span> <span className="text-slate-400 font-normal text-base">({clp(Math.abs(diferencia) * U)})</span></>}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {equilibrio === 0 && (aporteNegociacion > 0.5
                  ? <>A este precio la usada ya gana; la negociación suma <span className="font-mono tabular-nums text-white">{uf(aporteNegociacion)}</span> de ahorro neto, después de honorarios.</>
                  : 'A este precio la usada ya gana sin negociar.')}
                {equilibrio !== null && equilibrio > 0 && <>Punto de equilibrio: con <span className="font-mono tabular-nums text-white">{pct(equilibrio)}</span> de negociación la usada iguala a la nueva.</>}
                {equilibrio === null && 'Ni con 60% de negociación la usada iguala a la nueva: revisa precio o remodelación.'}
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">Comparación nueva con subsidio vs usada con DOMIS</caption>
              <thead className="bg-slate-900 text-slate-400 text-xs uppercase tracking-wider">
                <tr>
                  <th scope="col" className="text-left font-semibold px-4 sm:px-6 py-3"><span className="sr-only">Concepto</span></th>
                  <th scope="col" className="text-right font-semibold px-3 py-3">Nueva</th>
                  <th scope="col" className="text-right font-semibold px-4 sm:px-6 py-3 text-cyan-400">Usada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                <Fila k="Precio de compra" a={d(N.precioFinalUF)} b={d(S.precioFinalUF)} />
                <Fila k="Dividendo mensual" a={d(N.dividendoUF)} b={d(S.dividendoUF)} mejorB={S.dividendoUF < N.dividendoUF} />
                <Fila k="Renta referencial" nota="regla general: dividendo ≤ 25% de la renta" a={d(N.rentaUF)} b={d(S.rentaUF)} mejorB={S.rentaUF < N.rentaUF} />
                <Fila k="Plata al inicio" nota="pie + gastos + extras / remodelación + honorarios" a={d(N.inicialUF)} b={d(S.inicialUF)} mejorB={S.inicialUF < N.inicialUF} />
                <Fila k={`Costo total a ${plazo} años`} nota="todo lo que pagas" a={d(N.totalUF)} b={d(S.totalUF)} mejorB={S.totalUF < N.totalUF} fuerte />
                <Fila k="Costo final por m²" a={<span className="font-mono tabular-nums">{uf(N.costoM2UF)}</span>} b={<span className="font-mono tabular-nums">{uf(S.costoM2UF)}</span>} mejorB={S.costoM2UF < N.costoM2UF} />
              </tbody>
            </table>
          </div>

          {cajaExtra > 0.5 && (
            <p className="px-5 sm:px-6 py-4 border-t border-slate-800 text-sm text-slate-400 flex gap-2">
              <AlertTriangle size={15} className="text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                La usada pide <span className="font-mono tabular-nums text-white">{uf(cajaExtra)}</span> más al inicio.
                {mesesRecupero !== null
                  ? <> Con el menor dividendo se recupera en <span className="font-mono tabular-nums text-white">{mesesRecupero} meses</span> ({(mesesRecupero / 12).toFixed(1).replace('.', ',')} años).</>
                  : ' Su dividendo no es menor, así que la diferencia no se recupera mes a mes.'}
              </span>
            </p>
          )}

          {/* Desglose usada */}
          <div className="px-5 sm:px-6 py-5 border-t border-slate-800 bg-slate-900/40 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <p className="sm:col-span-2 text-xs uppercase tracking-widest text-slate-500 mb-1">Detalle de la usada</p>
            <Det k="Ahorro negociado" v={uf(S.ahorroNegociacionUF)} />
            <Det k="Remodelación" v={uf(S.remodelacionUF)} />
            <Det k={`Auditoría PCF-15™ (${clp(conIva(HONORARIOS.auditoriaUsadaM2))}/m², IVA incluido)`} v={clp(S.honorarios.auditoriaCLP)} />
            {S.honorarios.fase2 && <Det k={`Crédito ${HONORARIOS.creditoF1Pct * 100}% auditoría (Fase 2)`} v={`−${clp(S.honorarios.creditoF1CLP)}`} />}
            {S.honorarios.fase2 && <Det k={`Comisión de éxito ${fmtPctIva(pctComision)}% del ahorro, IVA incluido (mín. ${clp(conIva(HONORARIOS.anticipoMinimo))})`} v={clp(S.honorarios.comisionCLP)} />}
            <Det k="Honorarios DOMIS™ totales, IVA incluido" v={uf(S.honorarios.totalUF)} fuerte />
            {S.subsidioUF > 0 && <Det k="Subsidio Tramo 4.000 (simulado)" v={`−${uf(S.subsidioUF)}`} />}
          </div>

          <div className="px-5 sm:px-6 py-5 border-t border-slate-800">
            <a href={`https://wa.me/${WHATSAPP}?text=${mensajeWA}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 transition-colors">
              Evaluar una usada con DOMIS™ <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        <aside aria-labelledby="cmp-aviso" className="mt-6 rounded-2xl border border-slate-800 p-5 sm:p-6 text-xs text-slate-400 leading-relaxed">
          <p id="cmp-aviso" className="flex items-center gap-2 text-sm font-semibold text-slate-200"><Info size={15} className="text-cyan-400" aria-hidden="true" />Cómo leer esta comparación</p>
          <ul className="mt-3 space-y-2 list-disc pl-5">
            <li><span className="text-slate-200">Conflicto de interés:</span> DOMIS™ vende el servicio que aparece en una de las dos opciones. Te lo decimos para que evalúes el resultado con ese dato a la vista.</li>
            <li>El resultado depende de los valores que ingresas o que usamos por defecto. Con otros valores, la vivienda nueva con subsidio puede resultar más conveniente.</li>
            <li>El subsidio a la tasa (Ley 21.748, modificada por la Ley 21.836) aplica a viviendas nuevas, en primera venta, de hasta UF {SUBSIDIO_TOPE_UF.toLocaleString('es-CL')}, sujeto a requisitos y cupos. La tasa real la define el banco al evaluarte.</li>
            <li>
              Supuestos: nueva DFL-2 con impuesto de timbres {TIMBRES_NUEVA_DFL2_PCT.toString().replace('.', ',')}% y usada con {TIMBRES_GENERAL_PCT.toString().replace('.', ',')}%; remodelación y extras pagados al contado;
              precio típico de una usada comparable {BRECHA_USADA_ORIENTE.min}–{BRECHA_USADA_ORIENTE.max}% bajo la nueva en el sector oriente (Observatorio Habitacional MINVU); remodelación según costos DOMIS™ 2026.
            </li>
            <li>No considera: contribuciones, beneficios DFL-2 posteriores a la compra, gastos comunes, garantías legales de la vivienda nueva, variación de la UF ni tu situación tributaria.</li>
            <li>Honorarios con IVA incluido. Las condiciones del servicio constan en la propuesta y el contrato que se firman antes de empezar.</li>
            <li>Es una herramienta informativa, no una recomendación de compra ni una asesoría crediticia o de inversión.</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------

function CampoNum({ label, sufijo, valor, onChange }: { label: string; sufijo: string; valor: number; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-slate-300 mb-2">{label}</label>
      <div className="relative">
        <input id={id} type="number" inputMode="decimal" min={0} value={valor} onChange={e => onChange(num(e.target.value))}
          className={`${inputCls} ${sufijo ? (sufijo.length > 3 ? 'pr-16' : 'pr-10') : ''}`} />
        {sufijo && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{sufijo}</span>}
      </div>
    </div>
  );
}

function Opciones({ label, valores, valor, onChange, sufijo }: { label: string; valores: number[]; valor: number; onChange: (v: number) => void; sufijo: string }) {
  return (
    <fieldset>
      <legend className="text-sm text-slate-300 mb-2">{label}</legend>
      <div className="flex gap-2">
        {valores.map(v => <Chip key={v} activo={valor === v} onClick={() => onChange(v)}>{v}{sufijo}</Chip>)}
      </div>
    </fieldset>
  );
}

function Fila({ k, nota, a, b, mejorB, fuerte }: { k: string; nota?: string; a: React.ReactNode; b: React.ReactNode; mejorB?: boolean; fuerte?: boolean }) {
  return (
    <tr className={fuerte ? 'bg-slate-900/60' : undefined}>
      <th scope="row" className={`text-left px-4 sm:px-6 py-3 align-top ${fuerte ? 'text-white font-semibold' : 'text-slate-300 font-normal'}`}>
        {k}{nota && <span className="block text-xs text-slate-500 font-normal">{nota}</span>}
      </th>
      <td className="text-right px-3 py-3 align-top text-slate-200">{a}</td>
      <td className={`text-right px-4 sm:px-6 py-3 align-top ${mejorB === undefined ? 'text-slate-200' : mejorB ? 'text-emerald-300' : 'text-amber-200'}`}>{b}</td>
    </tr>
  );
}

function Det({ k, v, fuerte }: { k: string; v: string; fuerte?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className={fuerte ? 'text-slate-200 font-semibold' : 'text-slate-400'}>{k}</span>
      <span className={`font-mono tabular-nums ${fuerte ? 'text-white font-semibold' : 'text-slate-200'}`}>{v}</span>
    </div>
  );
}
