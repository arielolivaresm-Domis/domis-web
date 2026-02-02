import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info, MessageCircle } from 'lucide-react';

export default function Sourcing() {
  const handleWhatsApp = (tipo: string, cantidad: number, meters: number, total: number) => {
    const telefono = "569XXXXXXXX"; 
    const mensaje = `Hola DOMIS™, configuré un Pack Sourcing ${tipo} por ${cantidad} propiedades de ${meters}m². Inversión: $${total.toLocaleString()} + IVA. ¡Vamos por mí!`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER LIMPIO - ESTILO FOTO 1 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold font-black">Inteligencia de Mercado</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
            Buscamos <span className="text-cyan-400">por ti</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold italic underline decoration-cyan-500/30">Dinero</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
          <SourcingNormal onSelect={handleWhatsApp} />
          <SourcingVIP onSelect={handleWhatsApp} />
        </div>

        {/* LEYENDA MAESTRA DE CIERRE */}
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center gap-4 text-slate-800">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-slate-800"></div>
            <Clock size={24} className="text-cyan-500/40" />
            <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-slate-800"></div>
          </div>
          
          <p className="text-xl md:text-3xl text-slate-400 font-medium italic leading-relaxed max-w-4xl mx-auto px-4">
            "Coordinamos visitas para asistir en conjunto, pero si tu agenda se complica, <span className="text-white font-black not-italic border-b-2 border-cyan-500/30">DOMIS™ no se detiene.</span>"
          </p>
          
          <div className="pt-4">
             <span className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 uppercase tracking-[0.2em]">
               VAMOS POR TI
             </span>
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
  
  // Lógica: 1->2, 2->4, 3->5
  const presentamos = efectiveCantidad === 1 ? 2 : efectiveCantidad === 2 ? 4 : 5;
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (efectiveCantidad * 60000);

  return (
    <div className="bg-slate-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:border-slate-700 transition-all flex flex-col group relative shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-slate-800 rounded-xl group-hover:bg-cyan-500/10 transition-colors">
          <Search className="text-slate-300 w-6 h-6 group-hover:text-cyan-400" />
        </div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing Normal</h3>
      </div>
      
      <p className="text-slate-400 text-sm mb-8 leading-relaxed">
        Barremos la red por ti y depuramos las opciones digitalmente. Te entregamos una selección de élite para que tú decidas qué auditamos a fondo. <span className="text-slate-200">Ideal para liderar tu selección inicial con respaldo técnico.</span>
      </p>

      <div className="bg-slate-950/80 rounded-[2rem] p-8 border border-slate-800 mb-8 mt-auto">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-4 block tracking-widest flex items-center gap-1">
              <Calculator size={10} /> Propiedades a Auditar:
            </label>
            <div className="flex gap-2">
              {[1, 2].map(n => (
                <button key={n} onClick={() => setCantidad(n)} 
                  className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setCantidad(3)} 
                className={`flex-1 py-3 rounded-xl font-black border-2 transition-all ${cantidad === 3 ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}>
                {cantidad === 3 ? (
                  <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Math.max(3, Number(e.target.value)))} 
                    className="w-full bg-transparent text-center outline-none" min="3"/>
                ) : '3+'}
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3 mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest border border-white/5 text-slate-400">
              <span>Presentamos: <span className="text-white">{presentamos} Propiedades</span></span>
              <span className="text-cyan-400">Auditamos: {efectiveCantidad}</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block">Metraje por propiedad (m²):</label>
            <input type="number" value={meters} onChange={e => setMeters(Math.max(100, Number(e.target.value)))} 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono focus:border-cyan-500 outline-none" />
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-cyan-400 font-mono font-black text-xl">
            <span className="text-xs uppercase text-slate-500 font-black flex items-center gap-1"><Info size={10} /> TOTAL:</span>
            <span>${total.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('Normal', efectiveCantidad, effectiveMeters, total)} 
        className="w-full bg-slate-800 hover:bg-white hover:text-slate-950 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2">
        <MessageCircle size={14} /> Seleccionar Pack
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
  
  // Lógica VIP: 1->2, 2->3-4, 3->4-5
  const visitamos = efectiveCantidad === 1 ? 2 : efectiveCantidad === 2 ? 4 : 5;
  const labelVisitas = efectiveCantidad === 1 ? "2" : efectiveCantidad === 2 ? "3 a 4" : "4 a 5";
  
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (visitamos * 50000);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/40 p-10 rounded-[2.5rem] relative overflow-hidden flex flex-col shadow-[0_0_60px_rgba(34,211,238,0.1)] group">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-6 py-2 rounded-bl-2xl uppercase tracking-[0.2em]">Recomendado</div>
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-cyan-500/10 rounded-xl"><Crown className="text-cyan-400 w-6 h-6 animate-pulse" /></div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing VIP</h3>
      </div>
      
      <p className="text-slate-400 text-sm mb-8 leading-relaxed">
        Evaluamos en terreno cada opción que te entregamos. Recibes un <span className="text-white font-bold">Informe FAST</span> de cada propiedad para que puedas comparar estados reales. Tú filtras cuáles quieres descartar y decides cuáles auditamos con total certeza.
      </p>

      <div className="bg-slate-950/80 rounded-[2rem] p-8 border border-cyan-900/30 mb-8 mt-auto shadow-inner">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-cyan-500 mb-4 block tracking-widest flex items-center gap-1">
              <Calculator size={10} className="inline mr-1" /> Propiedades a Auditar:
            </label>
            <div className="flex gap-2">
              {[1, 2].map(n => (
                <button key={n} onClick={() => setCantidad(n)} 
                  className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500 hover:border-cyan-800'}`}>
                  {n}
                </button>
              ))}
              <button onClick={() => setCantidad(3)} 
                className={`flex-1 py-3 rounded-xl font-black border-2 transition-all ${cantidad === 3 ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500 hover:border-cyan-800'}`}>
                {cantidad === 3 ? (
                  <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Math.max(3, Number(e.target.value)))} 
                    className="w-full bg-transparent text-center outline-none font-black" min="3"/>
                ) : '3+'}
              </button>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 mt-4 space-y-2 text-[10px] font-bold uppercase tracking-wider text-slate-300">
              <div className="flex items-center gap-2 text-white">
                <MapPin size={12} className="text-cyan-400" />
                <span>Visitamos con FAST: <strong className="text-cyan-400">{labelVisitas} propiedades</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={12} className="text-cyan-400" />
                <span>Tú filtras y eliges: {efectiveCantidad} para Auditoría</span>
              </div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-cyan-500 mb-3 block">Metraje (m²):</label>
            <input type="number" value={meters} onChange={e => setMeters(Math.max(100, Number(e.target.value)))} 
              className="w-full bg-slate-800 border border-cyan-900/30 rounded-xl px-4 py-3 text-white font-mono focus:border-cyan-400 outline-none" />
          </div>
          <div className="pt-4 border-t border-cyan-900/20 flex justify-between items-center text-white font-mono font-black text-xl">
             <div className="flex items-center gap-1 text-[10px] text-cyan-500 uppercase font-black">
                <FileText size={12} /> TOTAL:
             </div>
            <span>${total.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('VIP', efectiveCantidad, effectiveMeters, total)} 
        className="w-full bg-cyan-500 hover:bg-white text-slate-950 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-[0_0_30px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2">
        <Crown size={14} /> Quiero Seguridad VIP
      </button>
    </div>
  );
}