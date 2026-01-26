import { useState, useMemo } from 'react';

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

  // BLOQUE DE SEGURIDAD: Pre-calculamos el link para que sea instantáneo y sin errores
  const whatsappUrl = useMemo(() => {
    const pLabel = pack === 1 ? 'Individual' : pack === 2 ? 'Pack Dupla' : 'Pack Inversionista';
    const sLabel = sourcing === 'vip' ? 'Sourcing VIP' : sourcing === 'normal' ? 'Sourcing Normal' : 'Sin Sourcing';
    
    const text = `🛠️ *SOLICITUD DE AUDITORÍA FASE 1 - DOMIS™*\n\n` +
                 `• *Modelo:* ${pLabel}\n` +
                 `• *Superficie:* ${meters} m²\n` +
                 `• *Sourcing:* ${sLabel}\n` +
                 `• *Inversión F1:* $${calculations.totalConIva.toLocaleString()}\n\n` +
                 `*Deseo iniciar el protocolo de validación técnica.*`;

    // Usamos api.whatsapp.com para mayor compatibilidad entre App y Web
    return `https://api.whatsapp.com/send?phone=56929901343&text=${encodeURIComponent(text)}`;
  }, [pack, meters, sourcing, calculations.totalConIva]);

  return (
    <div className="bg-slate-900 text-white p-8 rounded-xl border border-cyan-500/30">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400 uppercase tracking-wider text-center">Estima tu Inversión Técnica</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-xs uppercase text-cyan-500 mb-2 font-bold tracking-widest">1. Propiedades a Auditar</label>
            <div className="flex gap-2">
              {[1, 2, 3].map((v) => (
                <button 
                  key={v}
                  onClick={() => setPack(v)}
                  className={`flex-1 py-4 border rounded-lg transition-all ${pack === v ? 'bg-cyan-600 border-cyan-400' : 'bg-slate-800 border-slate-700'}`}
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
                onChange={(e) => setMeters(Number(e.target.value))}
                onBlur={() => setMeters((v) => Math.max(100, v))}
                className="w-full bg-slate-800 border border-slate-700 p-4 rounded-lg text-xl font-mono focus:border-cyan-400 outline-none"
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
          </div>
        </div>

        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-slate-700 text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">Fase 1: Auditoría</div>
          
          <div className="space-y-4 mt-4">
            <div className="flex justify-between text-slate-400 text-sm font-medium">
              <span>Auditoría Técnica ({pack}x):</span>
              <span className="font-mono">${calculations.totalAuditNet.toLocaleString()}</span>
            </div>
            {calculations.sourcingNet > 0 && (
              <div className="flex justify-between text-slate-400 text-sm font-medium">
                <span>Sourcing:</span>
                <span className="font-mono">${calculations.sourcingNet.toLocaleString()}</span>
              </div>
            )}
            <div className="border-t border-slate-700 pt-4 flex justify-between items-end">
              <div>
                <span className="block text-xs uppercase text-cyan-400 font-bold mb-1 tracking-widest">Inversión Total F1 (IVA Incl.)</span>
                <span className="text-4xl font-black font-mono text-white">${calculations.totalConIva.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-xl font-black uppercase mt-8 hover:brightness-110 transition-all text-[10px] tracking-[0.2em]"
          >
            Comenzar Auditoría Técnica
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;