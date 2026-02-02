import { useState } from 'react';
import { Search, Crown, Clock, MapPin, CheckCircle, FileText, Calculator, Info, MessageCircle } from 'lucide-react';

export default function Sourcing() {
  // Lógica de WhatsApp: Recibe data y segmenta el mensaje automáticamente
  const handleWhatsApp = (tipo: string, cantidad: number, meters: number, total: number) => {
    const telefono = "569XXXXXXXX"; 
    const mensaje = `Hola DOMIS™, configuré un Pack Sourcing ${tipo} por ${cantidad} propiedades de ${meters}m². Inversión: $${total.toLocaleString()} + IVA. Solicito activar Protocolo de Agilidad para iniciar visitas.`;
    window.open(`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
  };

  return (
    <section id="sourcing" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* HEADER ESTILO FOTO 1 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Search size={14} className="text-cyan-400" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">Módulo Sourcing</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
            Buscamos <span className="text-cyan-400">por ti</span>
          </h2>
          <p className="text-2xl md:text-3xl text-slate-300 font-light uppercase tracking-wide">
            Tu tiempo es <span className="text-cyan-500 font-bold">Dinero</span>
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm mt-6 leading-relaxed">
            Optimiza tu proceso de compra. Elige el nivel de precisión técnica que necesitas para una inversión inteligente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          <SourcingNormal onSelect={handleWhatsApp} />
          <SourcingVIP onSelect={handleWhatsApp} />
        </div>

        {/* NOTA DE EFICIENCIA (Cierre Operativo) */}
        <div className="max-w-4xl mx-auto bg-slate-900/30 border border-slate-800 rounded-2xl p-8 flex items-start gap-5 shadow-2xl">
          <Clock className="text-cyan-500 w-6 h-6 flex-shrink-0 mt-0.5" />
          <div className="space-y-3">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em]">En este mercado, el que se detiene, pierde</h4>
            <p className="text-sm text-slate-400 leading-relaxed italic">
              <span className="text-slate-200 font-bold not-italic">Nota de Eficiencia:</span> Para asegurar tus oportunidades, las visitas se coordinarán prioritariamente en conjunto. No obstante, si por razones de agenda no es posible sincronizar de inmediato, 
              <span className="mx-1 font-bold not-italic text-white"> DOMIS™ realizará la inspección técnica de forma autónoma</span> 
              para que tu negociación no se detenga por falta de tiempo. Recibirás tus informes de inmediato.
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
  
  // Lógica de negocio: 1->2, 2->4, 3->5
  const presentamos = efectiveCantidad === 1 ? 2 : efectiveCantidad === 2 ? 4 : 5;
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (efectiveCantidad * 60000);

  return (
    <div className="bg-slate-900/50 border border-white/10 p-10 rounded-3xl hover:border-slate-600 transition-all flex flex-col group relative">
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-slate-800 rounded-xl"><Search className="text-slate-300 w-6 h-6" /></div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing Normal</h3>
      </div>
      <p className="text-slate-400 text-sm mb-8 leading-relaxed">
        Barremos la red por ti y depuramos las opciones digitalmente. Te entregamos una selección de élite para que tú decidas qué auditamos a fondo. <span className="text-slate-200 font-bold italic">Ideal para liderar tu selección inicial con respaldo técnico.</span>
      </p>

      <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 mb-8 mt-auto">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block tracking-widest flex items-center gap-1"><Calculator size={10} /> Propiedades a Auditar:</label>
            <div className="flex gap-2">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
              <button onClick={() => setCantidad(3)} className={`flex-1 py-3 rounded-xl font-black border-2 ${cantidad === 3 ? 'bg-white text-slate-950 border-white' : 'border-slate-800 text-slate-500'}`}>
                {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none" min="3"/> : '3+'}
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-3 mt-4 flex items-center justify-between text-[10px] font-black uppercase tracking-wider border border-white/5">
              <span className="text-slate-400">Presentamos: <span className="text-white">{presentamos} Propiedades</span></span>
              <span className="text-cyan-400">Auditamos: {efectiveCantidad}</span>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-slate-500 mb-3 block">Metraje por propiedad (m²):</label>
            <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white font-mono" />
          </div>
          <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest"><Info size={10} className="inline mr-1" /> Inversión Total:</span>
            <span className="text-cyan-400 font-mono font-black text-xl">${total.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('Normal', efectiveCantidad, effectiveMeters, total)} className="w-full bg-slate-800 hover:bg-white hover:text-slate-950 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
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
  
  // Lógica VIP: 1->2, 2->4, 3->5 (según tus últimos requerimientos)
  const visitamos = efectiveCantidad === 1 ? 2 : efectiveCantidad === 2 ? 4 : 5;
  const pricePerM2 = cantidad === 1 ? 1900 : cantidad === 2 ? 1710 : 1520;
  const total = (efectiveCantidad * effectiveMeters * pricePerM2) + (visitamos * 50000);

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-cyan-500/30 p-10 rounded-3xl relative overflow-hidden flex flex-col shadow-2xl">
      <div className="absolute top-0 right-0 bg-cyan-500 text-slate-950 text-[10px] font-black px-5 py-2 rounded-bl-xl uppercase tracking-widest">Recomendado</div>
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-cyan-500/10 rounded-xl"><Crown className="text-cyan-400 w-6 h-6" /></div>
        <h3 className="text-2xl font-black text-white uppercase italic">Sourcing VIP</h3>
      </div>
      <p className="text-slate-400 text-sm mb-8 leading-relaxed">
        Coordinamos visitas para asistir en conjunto, pero si tu agenda se complica, <span className="text-white italic">DOMIS™ no se detiene</span>. Inspeccionamos, evaluamos y te entregamos el <span className="text-white font-bold underline">Informe FAST</span>. Tú decides sobre evidencia real.
      </p>

      <div className="bg-slate-950/80 rounded-2xl p-6 border border-cyan-900/20 mb-8 mt-auto shadow-inner">
        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black uppercase text-cyan-500 mb-3 block tracking-widest"><Calculator size={10} className="inline mr-1" /> Propiedades a Auditar:</label>
            <div className="flex gap-2">
              {[1, 2].map(n => <button key={n} onClick={() => setCantidad(n)} className={`flex-1 py-3 rounded-xl font-black transition-all border-2 ${cantidad === n ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500'}`}>{n}</button>)}
              <button onClick={() => setCantidad(3)} className={`flex-1 py-3 rounded-xl font-black border-2 ${cantidad === 3 ? 'bg-cyan-500 text-slate-950 border-cyan-500' : 'border-slate-800 text-slate-500'}`}>
                {cantidad === 3 ? <input type="number" value={cantidadCustom} onChange={e => setCantidadCustom(Number(e.target.value))} className="w-full bg-transparent text-center outline-none font-black" min="3"/> : '3+'}
              </button>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 mt-4 space-y-2 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2 text-white"><MapPin size={12} className="text-cyan-400" /><span>Visitamos con FAST: <strong className="text-cyan-400">{visitamos} propiedades</strong></span></div>
              <div className="flex items-center gap-2 text-slate-300"><CheckCircle size={12} className="text-cyan-400" /><span>Tú eliges para Auditoría Full: {efectiveCantidad}</span></div>
            </div>
          </div>
          <div>
            <label className="text-[10px] font-black uppercase text-cyan-500 mb-3 block">Metraje (m²):</label>
            <input type="number" value={meters} onChange={e => setMeters(Number(e.target.value))} className="w-full bg-slate-800 border border-cyan-900/30 rounded-xl px-4 py-3 text-white font-mono" />
          </div>
          <div className="pt-4 border-t border-cyan-900/20 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <FileText size={14} className="text-cyan-400" />
                <span className="text-[10px] font-black uppercase text-cyan-500 tracking-tighter">Inversión VIP:</span>
             </div>
            <span className="text-white font-mono font-black text-xl">${total.toLocaleString()} + IVA</span>
          </div>
        </div>
      </div>
      <button onClick={() => onSelect('VIP', efectiveCantidad, effectiveMeters, total)} className="w-full bg-cyan-500 hover:bg-white text-slate-950 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
        <Crown size={14} /> Seguridad VIP
      </button>
    </div>
  );
}