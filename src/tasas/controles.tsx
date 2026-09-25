import { useId } from 'react';
import { clamp, num } from './utils';

// Controles compartidos del simulador y el comparador

export const inputCls =
  'w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 font-mono tabular-nums text-white text-right focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors';

export function CampoRango({
  label, sufijo, valor, rango, onChange,
}: { label: string; sufijo: string; valor: number; rango: { min: number; max: number; step: number }; onChange: (v: number) => void }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <label htmlFor={id} className="text-sm text-slate-300">{label}</label>
        <div className="relative w-28">
          <input id={id} type="number" inputMode="decimal" min={rango.min} max={rango.max} step={rango.step} value={valor} onChange={e => onChange(clamp(num(e.target.value), 0, rango.max))} className={`${inputCls} ${sufijo === '%' ? 'pr-7' : 'pr-12'}`} />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">{sufijo}</span>
        </div>
      </div>
      <input
        aria-label={`${label}, deslizador`}
        type="range"
        min={rango.min}
        max={rango.max}
        step={rango.step}
        value={clamp(valor, rango.min, rango.max)}
        onChange={e => onChange(num(e.target.value))}
        className="w-full accent-cyan-400 cursor-pointer"
      />
    </div>
  );
}

export function Chip({ activo, onClick, children }: { activo: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={activo}
      onClick={onClick}
      className={`rounded-full border px-3 py-1 text-xs font-mono tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${activo ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300' : 'border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'}`}
    >
      {children}
    </button>
  );
}

export function Linea({ k, v, fuerte }: { k: string; v: React.ReactNode; fuerte?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className={fuerte ? 'text-slate-200 font-semibold' : 'text-slate-400'}>{k}</dt>
      <dd className={`text-right ${fuerte ? 'text-white font-semibold' : 'text-slate-200'}`}>{v}</dd>
    </div>
  );
}
