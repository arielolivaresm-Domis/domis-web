import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, ArrowRight, X, Building2, Check } from 'lucide-react';

export default function BenefitFlyer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [propCount, setPropCount] = useState(1);
  const [domisCodes, setDomisCodes] = useState(['']);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isModalOpen]);

  const handleCountChange = (count: number) => {
    setPropCount(count);
    setDomisCodes(Array(count).fill(''));
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...domisCodes];
    newCodes[index] = value.toUpperCase();
    setDomisCodes(newCodes);
  };

  const whatsappNumber = "56929901343";
  
  const whatsappUrl = useMemo(() => {
    const codesString = domisCodes.filter(c => c.trim() !== '').join(', ');
    const message = `💎 *SOLICITUD FASE 2 - DOMIS™*\n\n• *Nombre:* ${nombre}\n• *Propiedades:* ${propCount}\n• *IDs DOMIS:* ${codesString}\n\nHola, quiero activar la negociación técnica Fase 2.`;
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
  }, [nombre, propCount, domisCodes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  const ModalPortal = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 font-sans">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
      
      <div className="relative z-[100000] w-full max-w-md bg-slate-900 border-2 border-cyan-500 rounded-[2.5rem] p-8 shadow-[0_0_60px_rgba(34,211,238,0.3)] animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
          <X size={24}/>
        </button>
        
        <div className="text-center mb-8">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter italic">Activar Fase 2</h3>
          <p className="text-cyan-500 text-[10px] font-black uppercase tracking-[0.2em]">Negociación Estratégica</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="text-left">
            <label className="block text-[10px] uppercase text-slate-400 font-black mb-2 tracking-widest">Nombre Completo</label>
            <input 
              required 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-500 transition-all" 
              placeholder="Ej: Ariel..." 
            />
          </div>

          <div className="text-left">
            <label className="block text-[10px] uppercase text-slate-400 font-black mb-2 tracking-widest">Propiedades a Negociar</label>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleCountChange(num)}
                  className={`py-3 rounded-xl font-black transition-all border ${
                    propCount === num 
                    ? 'bg-cyan-500 text-slate-950 border-cyan-500' 
                    : 'bg-slate-950 text-slate-500 border-slate-800 hover:border-cyan-500/50'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1 tracking-widest text-left">Códigos DOMIS™ (Fase 1)</label>
            {domisCodes.map((code, i) => (
              <div key={i} className="relative">
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" />
                <input 
                  required 
                  type="text" 
                  value={code} 
                  onChange={(e) => handleCodeChange(i, e.target.value)} 
                  className="w-full bg-slate-950 border border-slate-800 p-4 pl-12 rounded-xl text-white outline-none focus:border-cyan-500 uppercase font-mono text-sm" 
                  placeholder={`CÓDIGO PROPIEDAD ${i + 1}`} 
                />
              </div>
            ))}
          </div>

          <button 
            type="submit" 
            className="w-full bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-cyan-500/20 hover:bg-white transition-all active:scale-95 mt-4"
          >
             Solicitar Plan Maestro
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <section id="beneficio-fase2" className="py-24 bg-slate-950 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.2)] min-h-[650px] flex items-center justify-center bg-slate-900">
          
          <div className="absolute inset-0">
            <img 
              src="/DOMIS_Negociacion.webp" 
              alt="Negociación Estratégica DOMIS" 
              className="w-full h-full object-cover opacity-90 grayscale-[0.3] contrast-125" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20"></div>
          </div>

          <div className="relative z-10 p-8 md:p-16 flex flex-col items-center text-center max-w-5xl w-full">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg shadow-cyan-500/20">
              Fase 2: Modelo de Inversión
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 uppercase tracking-tighter drop-shadow-2xl leading-tight">
              💰 INVERSIÓN FASE 2
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-14 text-left max-w-4xl mx-auto">
              {/* BLOQUE INICIAL - GLASSMORPHISM ULTRA TRANSPARENTE */}
              <div className="bg-slate-950/10 backdrop-blur-2xl border-2 border-white/5 p-8 rounded-[2rem] flex flex-col h-full hover:border-cyan-500/40 transition-all group shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-sm">1</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">INICIAL</h3>
                </div>
                
                <div className="text-4xl font-mono text-cyan-400 font-black mb-6">$400.000</div>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {['Plan Maestro', '3 Escenarios', 'Tasación IA'].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white font-bold uppercase text-[11px] tracking-widest drop-shadow-md">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[9px] tracking-widest pt-4 border-t border-white/5">
                  <Check size={14} strokeWidth={4} />
                  Cobro inicio Fase 2 Negociación
                </div>
              </div>

              {/* BLOQUE ÉXITO - GLASSMORPHISM ULTRA TRANSPARENTE */}
              <div className="bg-slate-950/10 backdrop-blur-2xl border-2 border-white/5 p-8 rounded-[2rem] flex flex-col h-full hover:border-cyan-500/40 transition-all group shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-black text-sm">2</span>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">ÉXITO</h3>
                </div>
                
                <div className="text-4xl font-mono text-cyan-400 font-black mb-6 italic">10% AHORRO</div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="text-slate-300 font-black uppercase text-[10px] tracking-[0.2em] mb-2 drop-shadow-sm">Solo si compras:</li>
                  <li className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest leading-tight drop-shadow-md">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0"></span>
                    20% firma promesa compraventa
                  </li>
                  <li className="flex items-center gap-2 text-white font-bold uppercase text-[10px] tracking-widest leading-tight drop-shadow-md">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full flex-shrink-0"></span>
                    80% firma escritura
                  </li>
                </ul>

                <div className="flex items-center gap-2 text-cyan-400 font-black uppercase text-[10px] tracking-widest pt-4 border-t border-white/5">
                  <Check size={14} strokeWidth={4} />
                  Pago Seguro
                </div>
              </div>
            </div>

            <div className="mb-14">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2 uppercase tracking-tighter drop-shadow-2xl">
                🎁 <span className="text-cyan-400">40% OFF</span> AUDITORÍA
              </h2>
              <p className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] opacity-90 drop-shadow-md">al activar ambas fases</p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="group inline-flex items-center gap-4 px-12 py-6 bg-cyan-500 text-slate-950 font-black rounded-2xl uppercase tracking-[0.15em] text-sm hover:scale-105 hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-95 touch-manipulation"
            >
              <MessageCircle size={22} className="fill-current" />
              Activar Negociación
              <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {mounted && isModalOpen && createPortal(ModalPortal, document.body)}
    </section>
  );
}