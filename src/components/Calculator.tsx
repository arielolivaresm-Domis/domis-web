import { useState, useMemo } from 'react';

type Modalidad = 'nueva' | 'usada' | 'sourcing';

const MODALIDADES = [
  { key: 'nueva'    as Modalidad, label: 'Prop. Nueva',      sub: 'Pre-recepción / garantía', price: 1800 },
  { key: 'usada'    as Modalidad, label: 'Prop. Usada',      sub: 'Compra / venta',           price: 1900 },
  { key: 'sourcing' as Modalidad, label: 'Buscar + Auditar', sub: 'Sourcing incluido',         price: 2200 },
];

const SOURCING_RATIO: Record<number, { busca: string }> = {
  1: { busca: '2' },
  2: { busca: '3' },
  3: { busca: '4-5' },
};

const Calculator = () => {
  const [modalidad, setModalidad] = useState<Modalidad>('usada');
  const [meters, setMeters]       = useState(100);
  const [quiero, setQuiero]       = useState(1);

  const effectiveMeters = Math.max(100, meters);
  const currentMod      = MODALIDADES.find(m => m.key === modalidad)!;
  const ratio           = SOURCING_RATIO[quiero];

  const calculations = useMemo(() => {
    const totalAuditNet = currentMod.price * effectiveMeters;
    const iva           = totalAuditNet * 0.19;
    const totalConIva   = totalAuditNet + iva;
    const discountF1    = totalAuditNet * 0.60;
    const realCostF1    = totalConIva - discountF1;
    return { totalAuditNet, totalConIva, discountF1, realCostF1 };
  }, [modalidad, effectiveMeters]);

  const whatsappUrl = useMemo(() => {
    const mLabel = modalidad === 'nueva'
      ? 'Propiedad Nueva (pre-recepción)'
      : modalidad === 'usada'
        ? 'Propiedad Usada'
        : `Sourcing + Auditoría (${quiero} propiedad${quiero > 1 ? 'es' : ''})`;

    const text = `Hola, equipo DOMIS™. Quiero comenzar la Auditoría técnica Fase 1\n\n` +
                 `🛠️ *DATOS DE LA SIMULACIÓN:*\n` +
                 `• *Modalidad:* ${mLabel}\n` +
                 `• *Superficie:* ${effectiveMeters} m²\n` +
                 `• *Inversión Est. F1:* $${calculations.totalConIva.toLocaleString()}\n\n` +
                 `*Deseo iniciar el protocolo de validación técnica.*`;

    return `https://wa.me/56929901343?text=${encodeURIComponent(text)}`;
  }, [modalidad, effectiveMeters, quiero, calculations.totalConIva]);

  return (
    <div className="bg-slate-900 text-white p-8 rounded-xl border border-cyan-500/30">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400 uppercase tracking-wider text-center">Estima tu Inversión Técnica</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* INPUTS */}
        <div className="space-y-6">

          {/* 1. MODALIDAD */}
          <div>
            <label className="block text-xs uppercase text-cyan-500 mb-2 font-bold tracking-widest">1. Modalidad</label>
            <div className="flex gap-2">
              {MODALIDADES.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setModalidad(m.key)}
                  className={`flex-1 py-4 border rounded-lg transition-all flex flex-col items-center gap-1 ${
                    modalidad === m.key
                      ? 'bg-cyan-600 border-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-slate-800 border-slate-700 hover:border-cyan-500/50'
                  }`}
                >
                  <span className="block text-[11px] font-black leading-tight text-center px-1">{m.label}</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-cyan-400">${m.price.toLocaleString()}/m²</span>
                </button>
              ))}
            </div>
          </div>

          {/* SOURCING: cuántas quieres ver */}
          {modalidad === 'sourcing' && (
            <div>
              <label className="block text-xs uppercase text-cyan-500 mb-2 font-bold tracking-widest">
                2. ¿Cuántas propiedades quieres evaluar?
              </label>
              <div className="flex gap-2 mb-2">
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuiero(n)}
                    className={`flex-1 py-3 border rounded-lg font-black transition-all ${
                      quiero === n
                        ? 'bg-cyan-600 border-cyan-400'
                        : 'bg-slate-800 border-slate-700 hover:border-cyan-500/50'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-800/50 rounded-lg p-3 border border-slate-700">
                Quieres ver <span className="text-white font-black">{quiero}</span> → buscamos{' '}
                <span className="text-cyan-400 font-black">{ratio.busca}</span>, tú eliges{' '}
                <span className="text-white font-black">{quiero}</span>
              </p>
            </div>
          )}

          {/* M² */}
          <div>
            <label className="block text-xs uppercase text-cyan-500 mb-2 font-bold tracking-widest">
              {modalidad === 'sourcing' ? '3.' : '2.'} Metros Cuadrados (mín. 100 m²)
            </label>
            <div className="relative">
              <input
                type="number"
                value={meters === 0 ? '' : meters}
                onChange={(e) => setMeters(Number(e.target.value))}
                onBlur={() => setMeters((v) => Math.max(100, v))}
                className="w-full bg-slate-800 border border-slate-700 p-4 rounded-lg text-xl font-mono focus:border-cyan-400 outline-none pr-12 text-white"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono">m²</span>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-slate-700 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
            Fase 1: Auditoría
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex justify-between text-slate-400 text-sm font-medium">
              <span>Auditoría ({currentMod.sub}):</span>
              <span className="font-mono font-medium">${calculations.totalAuditNet.toLocaleString()}</span>
            </div>
            <div className="border-t border-slate-700 pt-4 flex justify-between items-end">
              <div>
                <span className="block text-xs uppercase text-cyan-400 font-bold mb-1 tracking-widest">Inversión Total F1 (IVA Incl.)</span>
                <span className="text-4xl font-black font-mono text-white tracking-tight">
                  ${calculations.totalConIva.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* FASE 2 BENEFIT */}
          <div className="mt-8 p-5 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/50 rounded-xl relative animate-pulse">
            <div className="absolute -top-3 left-4 bg-cyan-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-cyan-500/20">
              Fase 2: Negociación
            </div>
            <div className="mt-2">
              <p className="text-xs text-cyan-300 font-bold mb-2 uppercase tracking-wider flex items-center justify-center gap-2">
                <span className="text-lg">🎁</span> Beneficio Exclusivo por Éxito
              </p>
              <p className="text-[11px] text-slate-200 leading-relaxed text-center italic">
                Contrata la negociación técnica con <strong>DOMIS<span className="text-cyan-500 text-[9px] relative -top-1 ml-0.5">™</span></strong> y te descontamos el 60% del costo de tu auditoría (F1).
              </p>
              <div className="mt-4 pt-3 border-t border-cyan-500/30 flex justify-between items-center">
                <span className="text-sm text-cyan-400 font-bold">Costo Real F1:</span>
                <span className="text-3xl font-black font-mono text-white">${calculations.realCostF1.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-black uppercase mt-8 hover:brightness-110 transition-all shadow-lg shadow-cyan-500/30 text-[10px] tracking-[0.2em]"
          >
            Comenzar Auditoría Técnica
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
