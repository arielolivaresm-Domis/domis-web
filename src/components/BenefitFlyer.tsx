import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { MessageCircle, ArrowRight, X, Zap } from 'lucide-react';

const BenefitFlyer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [quantitySelect, setQuantitySelect] = useState('1');
  const [codes, setCodes] = useState<string[]>(['']);
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

  const whatsappNumber = "56929901343"; 

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qty = e.target.value;
    setQuantitySelect(qty);
    const numInputs = qty === '2' ? 2 : qty === '3+' ? 3 : 1;
    setCodes(prev => {
      const next = [...prev];
      while (next.length < numInputs) next.push('');
      return next.slice(0, numInputs);
    });
  };

  const handleCodeChange = (index: number, value: string) => {
    const next = [...codes];
    next[index] = value.toUpperCase();
    setCodes(next);
  };
  
  const whatsappUrl = useMemo(() => {
    const codesString = codes.filter(c => c.trim() !== '').join(', ');
    const message = `💎 *SOLICITUD FASE 2 - DOMIS™*\n\n• *Nombre:* ${nombre}\n• *Auditorías:* ${quantitySelect}\n• *IDs:* ${codesString}\n\nHola, quiero activar la negociación técnica.`;
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
  }, [nombre, quantitySelect, codes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  const ModalPortal = (
    <div className="fixed inset-0 z-[1000000] flex items-center justify-center p-4" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100dvh' }}>
      <div className="absolute inset-0 bg-slate-950/98 backdrop-blur-xl" onClick={() => setIsModalOpen(false)} />
      <div className="relative z-[1000001] w-full max-w-md bg-slate-900 border border-cyan-500/50 rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[90dvh] animate-in fade-in zoom-in duration-300 font-sans">
        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 p-2"><X size={24}/></button>
        <h3 className="text-2xl font-black text-white uppercase mb-6 tracking-tighter italic">Activar Fase 2</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1.5 tracking-widest font-sans">Nombre Completo</label>
            <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-400 font-sans" placeholder="Tu nombre" />
          </div>
          <div className="text-left font-sans">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1.5 tracking-widest">Cantidad</label>
            <select value={quantitySelect} onChange={handleQuantityChange} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none cursor-pointer">
              <option value="1">1 Propiedad</option>
              <option value="2">2 Propiedades</option>
              <option value="3+">3+ Propiedades</option>
            </select>
          </div>
          <div className="space-y-3 font-sans">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1.5 tracking-widest text-left">IDs de Fase 1</label>
            {codes.map((code, i) => (
              <input key={i} required type="text" value={code} onChange={(e) => handleCodeChange(i, e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white uppercase" placeholder={`ID Propiedad ${i + 1}`} />
            ))}
          </div>
          <button type="submit" className="w-full bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-cyan-500/20 mt-4 font-sans">
             Solicitar Negociación
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      {/* 🚀 EL ÚNICO BOTÓN MÓVIL (Sustituye al Header) */}
      <div className="md:hidden fixed bottom-8 right-6 z-[999999] flex flex-col items-end gap-3">
        <div className="bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-3 py-1 rounded-lg shadow-xl animate-fade-in">
          <span className="text-cyan-400 text-[9px] font-black uppercase tracking-widest">Activar Fase 2</span>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="relative bg-cyan-500 text-slate-950 w-16 h-16 rounded-full shadow-[0_0_40px_rgba(34,211,238,0.7)] flex items-center justify-center animate-bounce-slow active:scale-90 transition-all group"
        >
          <span className="absolute inset-0 rounded-full bg-cyan-500 animate-ping opacity-25"></span>
          <Zap size={30} fill="currentColor" />
        </button>
      </div>

      <section id="beneficio-fase2" className="py-20 bg-slate-950 px-6 relative overflow-hidden font-sans">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-1 md:p-1.5 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <div className="bg-slate-900 rounded-[2.3rem] p-8 md:p-16 relative overflow-hidden">
              <div className="relative z-10 flex flex-col items-center text-center">
                
                <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                  Protocolo Fase 2
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black text-white mb-10 uppercase tracking-tighter">
                   Negociación por Éxito
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-12 text-left">
                  <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
                    <div className="text-cyan-500 font-black text-[10px] uppercase mb-2">Paso 1</div>
                    <div className="text-2xl text-white font-black">$500.000 <span className="text-slate-500 text-xs font-light tracking-normal">(Fee)</span></div>
                  </div>
                  <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
                    <div className="text-cyan-500 font-black text-[10px] uppercase mb-2">Paso 2</div>
                    <div className="text-2xl text-white font-black">15% Ahorro <span className="text-slate-500 text-xs font-light tracking-normal">(Baja de precio)</span></div>
                  </div>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 uppercase tracking-tighter">
                  <span className="text-cyan-400">60% OFF</span> EN AUDITORÍA
                </h2>

                <button 
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group relative z-20 inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-950 font-black rounded-full uppercase tracking-widest text-sm shadow-xl active:scale-95 touch-manipulation"
                >
                  <MessageCircle size={20} className="fill-current" />
                  Activar Negociación
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {mounted && isModalOpen && createPortal(ModalPortal, document.body)}
    </>
  );
};

export default BenefitFlyer;