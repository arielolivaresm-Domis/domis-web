import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom'; // IMPORTANTE: Para teletransportar el modal
import { MessageCircle, ArrowRight, X } from 'lucide-react';

const BenefitFlyer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [quantitySelect, setQuantitySelect] = useState('1');
  const [codes, setCodes] = useState<string[]>(['']);
  const [mounted, setMounted] = useState(false);

  // Aseguramos que el portal solo se intente renderizar en el cliente
  useEffect(() => {
    setMounted(true);
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // Bloquea el scroll de fondo
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const whatsappNumber = "56929901343"; 

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qty = e.target.value;
    setQuantitySelect(qty);
    let numInputs = qty === '2' ? 2 : qty === '3+' ? 3 : 1;

    setCodes(prevCodes => {
      const newCodes = [...prevCodes];
      while (newCodes.length < numInputs) newCodes.push('');
      if (newCodes.length > numInputs) newCodes.splice(numInputs);
      return newCodes;
    });
  };

  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.toUpperCase();
    setCodes(newCodes);
  };
  
  const whatsappUrl = useMemo(() => {
    const codesString = codes.filter(c => c.trim() !== '').join(', ');
    const message = `💎 *SOLICITUD FASE 2 - DOMIS™*\n\n` +
                    `• *Nombre:* ${nombre}\n` +
                    `• *Auditorías:* ${quantitySelect}\n` +
                    `• *IDs Protocolo:* ${codesString || 'Pendiente'}\n\n` +
                    `Hola, quiero activar la negociación por éxito para estos expedientes y aplicar el 60% OFF.`;
    return `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(message)}`;
  }, [nombre, quantitySelect, codes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank');
    setIsModalOpen(false);
  };

  // --- COMPONENTE DEL MODAL (Portal) ---
  const ModalContent = (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl transition-opacity" 
        onClick={() => setIsModalOpen(false)}
      ></div>
      
      <div className="relative z-[1000000] bg-slate-900 border border-cyan-500/50 w-full max-w-md h-fit max-h-[90dvh] rounded-[2.5rem] p-8 md:p-10 shadow-2xl overflow-y-auto animate-in fade-in zoom-in duration-300 font-sans">
        <button 
          onClick={() => setIsModalOpen(false)} 
          className="absolute top-8 right-8 text-slate-500 hover:text-white p-2"
        >
          <X size={24}/>
        </button>
        
        <div className="mb-8 text-left">
          <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Activar Fase 2</h3>
          <p className="text-slate-400 text-sm mt-1">Completa los datos para tu negociación.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1.5 tracking-widest">Nombre Completo</label>
            <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-400 text-base" placeholder="Tu nombre" />
          </div>

          <div className="text-left">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1.5 tracking-widest">Cantidad de Auditorías</label>
            <div className="relative">
              <select value={quantitySelect} onChange={handleQuantityChange} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-400 appearance-none cursor-pointer text-base">
                <option value="1">1 Auditoría</option>
                <option value="2">2 Auditorías (Pack Dupla)</option>
                <option value="3+">3+ Auditorías (Pack Inversionista)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500"><ArrowRight size={18} className="rotate-90" /></div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-[10px] uppercase text-cyan-500 font-black mb-1.5 tracking-widest text-left">Códigos de Fase 1</label>
            {codes.map((code, index) => (
              <input 
                key={index}
                required
                type="text" 
                value={code}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-400 placeholder:text-slate-700 uppercase text-base" 
                placeholder={`ID de propiedad ${index + 1}`}
              />
            ))}
          </div>

          <button type="submit" className="w-full bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-cyan-400 transition-all shadow-xl mt-4">
            Enviar y Abrir WhatsApp
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <section id="beneficio-fase2" className="py-20 bg-slate-950 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-1 md:p-1.5 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <div className="bg-slate-900 rounded-[2.3rem] p-8 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none z-0"
                   style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
              </div>

              <div className="relative z-10 flex flex-col items-center text-center font-sans">
                <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-cyan-500/20">
                  Fase 2: Negociación Técnica
                </div>

                <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">
                  💰 Cómo se paga Fase 2
                </h2>

                <p className="text-slate-300 text-lg md:text-xl max-w-3xl mb-10 font-light italic">
                  Pagas en dos momentos clave:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl mb-8 text-left">
                  <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2 font-black text-white uppercase tracking-tighter leading-none">
                      <span className="text-3xl mr-3 font-normal">1️⃣</span>
                      Fee Inicial
                    </div>
                    <div className="text-2xl md:text-3xl font-mono text-cyan-400 font-black">$500.000</div>
                    <p className="text-xs md:text-sm text-slate-400 mt-2 italic font-light">Entrega del Plan Maestro Técnico y estrategia.</p>
                  </div>

                  <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-2 font-black text-white uppercase tracking-tighter leading-none">
                      <span className="text-3xl mr-3 font-normal">2️⃣</span>
                      Al firmar éxito
                    </div>
                    <div className="text-2xl md:text-3xl font-mono text-cyan-400 font-black">15% del ahorro</div>
                    <p className="text-xs md:text-sm text-slate-400 mt-2 font-medium">Calculado únicamente sobre la rebaja lograda.</p>
                  </div>
                </div>

                <div className="w-full max-w-3xl h-px bg-slate-800 mb-12"></div>

                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                  <span className="text-cyan-400">60% OFF</span> EN AUDITORÍA
                </h2>

                <button 
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="group relative z-30 inline-flex items-center gap-3 px-10 md:px-12 py-5 bg-white text-slate-950 font-black rounded-full uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-all shadow-xl active:scale-95 touch-manipulation font-sans"
                >
                  <MessageCircle size={20} className="fill-current" />
                  Activar Negociación Fase 2
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RENDERIZAMOS EL PORTAL SOLO SI ESTÁ ABIERTO Y MONTADO */}
      {mounted && isModalOpen && createPortal(ModalContent, document.body)}
    </>
  );
};

export default BenefitFlyer;