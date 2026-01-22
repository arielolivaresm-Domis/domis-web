import { useState, useMemo } from 'react';

/**
 * COMPONENTE: Calculator.tsx
 * Lógica completa de inversión para DOMIS™
 */
const Calculator = () => {
  const [pack, setPack] = useState(3);
  const [meters, setMeters] = useState(100);
  const [sourcing, setSourcing] = useState('none');

  const prices: Record<number, number> = { 1: 1900, 2: 1710, 3: 1520 };
  
  const calculations = useMemo(() => {
    const unitPrice = pack === 1 ? prices[1] : pack === 2 ? prices[2] : prices[3];
    const totalAuditNet = unitPrice * meters * pack;
    
    let sourcingNet = 0;
    let vipAlternatives = 0;

    if (sourcing === 'normal') {
      sourcingNet = 60000 * pack;
    } else if (sourcing === 'vip') {
      vipAlternatives = pack === 1 ? 2 : pack === 2 ? 3 : 5;
      sourcingNet = 50000 * vipAlternatives;
    }

    const subtotalNeto = totalAuditNet + sourcingNet;
    const iva = subtotalNeto * 0.19;
    const totalConIva = subtotalNeto + iva;

    const discountF1 = totalAuditNet * 0.60;
    const realCostF1 = totalConIva - discountF1;

    return { totalAuditNet, sourcingNet, totalConIva, discountF1, realCostF1, vipAlternatives };
  }, [pack, meters, sourcing]);

  return (
    <div className="bg-slate-900 text-white p-8 rounded-xl border border-cyan-500/30">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400 uppercase tracking-wider text-center">Estima tu Inversión Técnica</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* COLUMNA DE ENTRADA (INPUTS) */}
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase text-cyan-500 mb-2 font-bold tracking-widest">1. Propiedades a Auditar</label>
            <div className="flex gap-2">
              {[1, 2, 3].map((v) => (
                <button 
                  key={v}
                  onClick={() => setPack(v)}
                  className={`flex-1 py-4 border rounded-lg transition-all ${pack === v ? 'bg-cyan-600 border-cyan-400 shadow-lg shadow-cyan-500/20' : 'bg-slate-800 border-slate-700 hover:border-cyan-500/50'}`}
                >
                  <span className="block text-2xl font-black">{v}{v === 3 && '+'}</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest">{v === 1 ? 'Individual' : v === 2 ? 'Pack Dupla' : 'Pack Inversionista'}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-cyan-500 mb-2 font-bold tracking-widest">2. Metros Cuadrados Promedio (mín. 100 m²)</label>
            <div className="relative">
              <input 
                type="number" 
                value={meters === 0 ? '' : meters}
                min="100"
                onChange={(e) => setMeters(Number(e.target.value))}
                onBlur={() => setMeters((val) => Math.max(100, val))}
                className="w-full bg-slate-800 border border-slate-700 p-4 rounded-lg text-xl font-mono focus:border-cyan-400 outline-none pr-12"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-mono">m²</span>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase text-cyan-500 mb-2 font-bold tracking-widest">3. Servicio de Sourcing (Opcional)</label>
            <select 
              value={sourcing} 
              onChange={(e) => setSourcing(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 p-4 rounded-lg outline-none focus:border-cyan-400 appearance-none font-medium"
            >
              <option value="none">No necesito Sourcing (Ya tengo las propiedades)</option>
              <option value="normal">Sourcing Normal (+$60.000/propiedad)</option>
              <option value="vip">Sourcing VIP (+$50.000/alternativa)</option>
            </select>
            
            {sourcing === 'vip' && (
               <div className="mt-3 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                 <p className="text-xs text-cyan-300 font-bold">
                   ⚡ Pack {pack === 1 ? 'Individual' : pack === 2 ? 'Dupla' : 'Inversionista'} incluye: 
                   <span className="text-white ml-1">{calculations.vipAlternatives} Alternativas de búsqueda</span>
                 </p>
               </div>
            )}
          </div>
        </div>

        {/* COLUMNA DE RESULTADOS */}
        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-slate-700 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
            Fase 1: Auditoría
          </div>
          
          <div className="space-y-4 mt-4">
            <div className="flex justify-between text-slate-400 text-sm font-medium">
              <span>Auditoría Técnica ({pack}x):</span>
              <span className="font-mono font-medium">${calculations.totalAuditNet.toLocaleString()}</span>
            </div>
            
            {calculations.sourcingNet > 0 && (
              <div className="flex justify-between text-slate-400 text-sm font-medium">
                <span>
                  Sourcing ({sourcing === 'normal' ? `${pack} props` : `${calculations.vipAlternatives} alt.`}):
                </span>
                <span className="font-mono font-medium">${calculations.sourcingNet.toLocaleString()}</span>
              </div>
            )}

            <div className="border-t border-slate-700 pt-4 flex justify-between items-end">
              <div>
                <span className="block text-xs uppercase text-cyan-400 font-bold mb-1 tracking-widest">Inversión Total F1 (IVA Incl.)</span>
                <span className="text-4xl font-black font-mono text-white tracking-tight">${calculations.totalConIva.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* BENEFICIO FASE 2 */}
          <div className="mt-8 p-5 bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/50 rounded-xl relative animate-pulse">
            <div className="absolute -top-3 left-4 bg-cyan-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-cyan-500/20">
              Fase 2: Negociación
            </div>
            
            <div className="mt-2 text-center">
                <p className="text-xs text-cyan-300 font-bold mb-2 uppercase tracking-wider">
                  🎁 Beneficio Exclusivo por Éxito
                </p>
                <p className="text-[13px] text-slate-200 leading-relaxed font-medium italic">
                  Contrata la negociación técnica con DOMIS™ y descontamos el 60% del costo de tu auditoría (F1).
                </p>
                <div className="mt-3 pt-3 border-t border-cyan-500/30 flex justify-between items-center">
                  <span className="text-sm text-cyan-400 font-bold">Costo Real F1:</span>
                  <span className="text-2xl font-black font-mono text-white">${calculations.realCostF1.toLocaleString()}</span>
                </div>
            </div>
          </div>

          <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-black uppercase mt-8 hover:brightness-110 transition-all shadow-lg shadow-cyan-500/30 text-[10px] tracking-[0.2em]">
            Comenzar Auditoría Técnica
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;