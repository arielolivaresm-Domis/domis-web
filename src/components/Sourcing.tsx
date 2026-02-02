import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info, MessageCircle } from 'lucide-react';

export default function Sourcing() {
  // Función de segmentación para WhatsApp (Product Intelligence)
  const handleWhatsApp = (tipo: string, cantidad: number, metros: number, total: number) => {
    const telefono = "569XXXXXXXX"; // Tu número real
    const mensaje = `Hola DOMIS™, he configurado un Pack Sourcing ${tipo} para ${cantidad} propiedades de ${metros}m² cada una. Mi inversión estimada es de $${total.toLocaleString()} + IVA. Solicito activar el Protocolo de Agilidad para iniciar el proceso técnico.`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER ESTRATÉGICO */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Inteligencia de Mercado</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
            Buscamos <span className="text-cyan-400">por ti</span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold">Dinero</span>
          </p>

          <p className="text-slate-400 max-w-2xl mx-auto text-[10px] md:text-xs leading-relaxed mt-6 uppercase font-black tracking-[0.2em] opacity-80">
            Optimiza tu proceso de compra. Elige el nivel de profundidad técnica necesario para una inversión de alta precisión.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <SourcingNormal onSelect={handleWhatsApp} />
          <SourcingVIP onSelect={handleWhatsApp} />
        </div>

        {/* NOTA DE EFICIENCIA GLOBAL (BUSINESS ENABLEMENT) */}
        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-[2.5rem] p-8 flex items-start gap-5 shadow-2xl">
          <div className="bg-cyan-500/20 p-3 rounded-xl">
            <Clock className="text-cyan-400 w-6 h-6" />
          </div>
          <div className="space-y-3">
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-2">
              Protocolo de Agilidad Operativa
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-bold uppercase tracking-wider italic">
              Para garantizar que no pierdas oportunidades de mercado, si no es posible coordinar una visita conjunta, 
              <span className="text-white not-italic"> DOMIS™ realizará la inspección técnica de forma autónoma.</span> 
              Recibirás tus informes con la misma rigurosidad técnica para asegurar tu posición en la negociación.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SourcingNormal({ onSelect }: { onSelect: any }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  
  const auditCost = efectiveCantidad * effectiveMeters * pricePerM2;
  const sourcingFee = efectiveCantidad * 60000;
  const totalCost = auditCost + sourcingFee;

  return (
    <div className="bg-slate-900/40 border border-white/5 p-8 md:p-12 rounded-[3rem] hover:border-slate-700 transition-all flex flex-col">
      <div className="mb-8">
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Sourcing Normal</h3>
        <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em] mb-6">Inteligencia Digital & Filtro Técnico</p>
        <p className="text-slate-400 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
          Optimizamos tu búsqueda mediante el análisis de datos. Depuramos las opciones digitalmente; tú seleccionas tu favorita y nosotros la auditamos. <span className="text-white">Ideal para liderar tu selección inicial con respaldo de élite.</span>
        </p>
      </div>

      <div className="bg-slate-950/80 rounded-[2rem] p-8 border border-slate-800 mb-8 mt-auto">
        <div className="space-y-6">
          <div>
            <label className="text-[9px] font-black uppercase text-slate-500 mb-4 block tracking-widest">Propiedades a auditar:</label>
            <div className="flex gap-2">
              {[1, 2].map((n) => (
                <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>{n}</button>
              ))}
              <div className="flex-1 relative">
                <button onClick={() => setCantidad(3)} className={`w-full py-3 rounded-xl font-black border-2 ${cantidad === 3 ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>
                  {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} className="w-full bg-transparent text-center outline-none font-black" min="3" /> : '3+'}
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-slate-500 mb-4 block tracking-widest">Metraje por propiedad:</label>
            <div className="relative">
              <input type="number" value={meters} onChange={(e) => setMeters(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono">m²</span>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
             <div className="flex items-center gap-1 text-[9px] text-slate-500 uppercase font-black"><Calculator size={10} /> <span>Total estimado:</span></div>
             <span className="text-cyan-400 font-mono font-black">${totalCost.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>

      <button onClick={() => onSelect('Normal', efectiveCantidad, effectiveMeters, totalCost)} className="w-full bg-slate-800 hover:bg-white hover:text-slate-950 text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 group">
        <MessageCircle size={16} className="group-hover:animate-bounce" /> Seleccionar Pack
      </button>
    </div>
  );
}

function SourcingVIP({ onSelect }: { onSelect: any }) {
  const [cantidad, setCantidad] = useState(1);
  const [cantidadCustom, setCantidadCustom] = useState(3);
  const [meters, setMeters] = useState(100);

  const efectiveCantidad = cantidad === 3 ? cantidadCustom : cantidad;
  const effectiveMeters = Math.max(100, meters);
  const visitamos = efectiveCantidad + 1;
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  
  const auditCost = efectiveCantidad * effectiveMeters * pricePerM2;
  const sourcingFee = visitamos * 50000;
  const totalCost = auditCost + sourcingFee;

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/40 p-8 md:p-12 rounded-[3rem] relative overflow-hidden flex flex-col shadow-[0_0_60px_rgba(34,211,238,0.1)]">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[9px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-[0.2em]">Recomendado</div>

      <div className="mb-8">
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Sourcing VIP</h3>
        <p className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.2em] mb-6">Delegación Técnica Total en Terreno</p>
        <p className="text-slate-400 text-[11px] font-bold uppercase leading-relaxed tracking-wider">
          <span className="text-white">Delegación técnica total en terreno.</span> Visitamos físicamente cada opción y te entregamos un <span className="text-white">Informe FAST</span>. Con tus informes, seleccionas cuáles auditamos. <span className="text-cyan-400 italic">Tomas decisiones con evidencia real, no fotos.</span>
        </p>
      </div>

      <div className="bg-slate-950/80 rounded-[2rem] p-8 border border-cyan-900/30 mb-8 mt-auto">
        <div className="space-y-6">
          <div>
            <label className="text-[9px] font-black uppercase text-cyan-500 mb-4 block tracking-widest flex items-center gap-1"><Calculator size={10}/> Propiedades a Auditar:</label>
            <div className="flex gap-2">
              {[1, 2].map((n) => (
                <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>{n}</button>
              ))}
              <div className="flex-1 relative">
                <button onClick={() => setCantidad(3)} className={`w-full py-3 rounded-xl font-black border-2 ${cantidad === 3 ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-800 text-slate-500'}`}>
                  {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={(e) => setCantidadCustom(Math.max(3, Number(e.target.value)))} className="w-full bg-transparent text-center outline-none font-black" min="3" /> : '3+'}
                </button>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[9px] font-black uppercase text-cyan-500 mb-4 block tracking-widest">Metraje por propiedad:</label>
            <div className="relative">
              <input type="number" value={meters} onChange={(e) => setMeters(Number(e.target.value))} className="w-full bg-slate-900 border border-cyan-900 rounded-xl px-4 py-3 text-white font-mono" />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-900 text-xs font-mono">m²</span>
            </div>
          </div>

          <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 space-y-2 text-[10px] font-bold uppercase text-slate-300 tracking-wider">
            <div className="flex items-center gap-2"><MapPin size={12} className="text-cyan-400" /><span>Visitamos: <strong className="text-white">{visitamos} propiedades</strong></span></div>
            <div className="flex items-center gap-2"><CheckCircle size={12} className="text-cyan-400" /><span>Tú eliges: <strong className="text-cyan-400">{efectiveCantidad}</strong></span></div>
            <div className="flex items-center gap-2"><FileText size={12} className="text-cyan-400" /><span>Auditoría completa: <strong className="text-white">{efectiveCantidad}</strong></span></div>
          </div>

          <div className="pt-4 border-t border-cyan-900/30 flex justify-between items-center">
             <div className="flex items-center gap-1 text-[9px] text-cyan-400 uppercase font-black"><Info size={10} /> <span>Inversión VIP:</span></div>
             <span className="text-white font-mono font-black text-xl">${totalCost.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>

      <button onClick={() => onSelect('VIP', efectiveCantidad, effectiveMeters, totalCost)} className="w-full bg-cyan-500 hover:bg-white text-slate-950 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center gap-3 group">
        <Crown size={16} className="group-hover:rotate-12 transition-transform" /> Quiero Seguridad VIP
      </button>
    </div>
  );
}