import { useState, useMemo } from 'react';
import { MessageCircle, ArrowRight, CheckCircle2, AlertTriangle, X, Plus } from 'lucide-react';

const BenefitFlyer = () => {
  // --- ESTADOS DINÁMICOS ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nombre, setNombre] = useState('');
  const [quantitySelect, setQuantitySelect] = useState('1');
  // Estado para manejar múltiples códigos: inicia con un espacio vacío
  const [codes, setCodes] = useState<string[]>(['']); 

  const whatsappNumber = "56929901343"; 

  // --- LÓGICA: Al cambiar la cantidad del dropdown ---
  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const qty = e.target.value;
    setQuantitySelect(qty);
    
    let numInputs = 1;
    if (qty === '2') numInputs = 2;
    if (qty === '3+') numInputs = 3; // Mostramos 3 campos para el pack grande

    // Ajustar el array de códigos según la cantidad seleccionada
    setCodes(prevCodes => {
      const newCodes = [...prevCodes];
      // Si faltan campos, agregar vacíos
      while (newCodes.length < numInputs) newCodes.push('');
      // Si sobran campos, recortar
      if (newCodes.length > numInputs) newCodes.splice(numInputs);
      return newCodes;
    });
  };

  // --- LÓGICA: Al escribir en un campo de código específico ---
  const handleCodeChange = (index: number, value: string) => {
    const newCodes = [...codes];
    newCodes[index] = value.toUpperCase(); // Forzar mayúsculas
    setCodes(newCodes);
  };
  
  const whatsappUrl = useMemo(() => {
    // Unir los códigos con comas para el mensaje
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

  return (
    <section id="beneficio-fase2" className="py-20 bg-slate-950 px-6 overflow-hidden relative">
      <div className="max-w-5xl mx-auto">
        <div className="relative bg-gradient-to-br from-cyan-600 to-blue-800 rounded-[2.5rem] p-1 md:p-1.5 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
          <div className="bg-slate-900 rounded-[2.3rem] p-8 md:p-16 relative overflow-hidden">
            
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                 style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[11px] font-black uppercase tracking-[0.2em] mb-8 shadow-lg shadow-cyan-500/20">
                Fase 2: Negociación Técnica
              </div>

              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight uppercase">
                💰 Cómo se paga Fase 2
              </h2>

              <p className="text-slate-300 text-lg md:text-xl max-w-3xl mb-10 font-light">
                Pagas en dos momentos clave:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8 text-left">
                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">1️⃣</span>
                    <h3 className="text-xl font-black text-white uppercase">Fee Inicial</h3>
                  </div>
                  <div className="text-3xl font-mono text-cyan-400 font-black">$500.000</div>
                  <p className="text-sm text-slate-400">Entrega del Plan Maestro Técnico y estrategia.</p>
                </div>

                <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">2️⃣</span>
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter text-[13px] md:text-base">Al firmar promesa de compraventa</h3>
                  </div>
                  <div className="text-2xl font-mono text-cyan-400 font-black">15% del ahorro</div>
                  <p className="text-sm text-slate-400">Calculado sobre la baja de precio lograda.</p>
                </div>
              </div>

              <div className="space-y-3 w-full max-w-3xl mb-12">
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <CheckCircle2 className="text-cyan-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-300">Comisión solo si cerramos con éxito.</p>
                </div>
                <div className="flex items-start gap-3 text-left bg-slate-800/30 p-4 rounded-xl border border-slate-700/50">
                  <AlertTriangle className="text-amber-500 shrink-0" size={18} />
                  <p className="text-sm text-slate-300">Fee no reembolsable (protege el peritaje técnico).</p>
                </div>
              </div>

              <div className="w-full max-w-3xl h-px bg-slate-800 mb-12"></div>

              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase">
                <span className="text-cyan-400">60% OFF</span> EN AUDITORÍA
              </h2>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-white text-slate-950 font-black rounded-full uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl"
              >
                <MessageCircle size={20} className="fill-current" />
                Activar Negociación Fase 2
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DINÁMICO Y CENTRADO */}
      {isModalOpen && (
        // ESTRUCTURA DE CENTRADO "INDESTRUCTIBLE"
        <div className="fixed inset-0 z-[10000] flex justify-center items-center p-4 overflow-y-auto bg-slate-950/90 backdrop-blur-md supports-[height:100cqh]:h-[100cqh] supports-[height:100svh]:h-[100svh]">
          
          {/* Capa de cierre al hacer clic fuera */}
          <div className="fixed inset-0" onClick={() => setIsModalOpen(false)}></div>
          
          {/* Contenedor del Modal */}
          <div className="relative bg-slate-900 border border-cyan-500/50 w-full max-w-md rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_80px_rgba(34,211,238,0.2)] animate-in fade-in zoom-in duration-300 my-auto">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white p-2 transition-colors z-20"><X size={24}/></button>
            
            <div className="mb-8 text-left relative z-10">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Activar Fase 2</h3>
              <p className="text-slate-400 text-sm mt-1">Ingresa los IDs de tus reportes de Fase 1.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              {/* 1. NOMBRE */}
              <div className="text-left">
                <label className="block text-[10px] uppercase text-cyan-500 font-black mb-2 tracking-widest">Nombre Completo</label>
                <input required type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-400 transition-all font-medium" placeholder="Ariel Smith" />
              </div>

              {/* 2. CANTIDAD (Selector) */}
              <div className="text-left">
                <label className="block text-[10px] uppercase text-cyan-500 font-black mb-2 tracking-widest">Auditorías a Negociar</label>
                <div className="relative">
                  <select value={quantitySelect} onChange={handleQuantityChange} className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-400 appearance-none font-medium cursor-pointer">
                    <option value="1">1 Auditoría</option>
                    <option value="2">2 Auditorías (Pack Dupla)</option>
                    <option value="3+">3+ Auditorías (Pack Inversionista)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500"><ArrowRight size={18} className="rotate-90" /></div>
                </div>
              </div>

              {/* 3. CÓDIGOS DINÁMICOS (Se generan según la cantidad) */}
              <div className="space-y-3">
                <label className="block text-[10px] uppercase text-cyan-500 font-black tracking-widest">Códigos de Auditoría (Fase 1)</label>
                {codes.map((code, index) => (
                  <input 
                    key={index}
                    required
                    type="text" 
                    value={code}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-xl text-white outline-none focus:border-cyan-400 transition-all font-medium placeholder:text-slate-700 uppercase" 
                    placeholder={`Ej: DOM-452${index + 1}`}
                  />
                ))}
                {quantitySelect === '3+' && (
                  <p className="text-xs text-slate-500 italic flex items-center gap-1"><Plus size={12}/> Si tienes más de 3, indícalos en el chat de WhatsApp.</p>
                )}
              </div>

              <button type="submit" className="w-full bg-cyan-500 text-slate-950 py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-cyan-400 transition-all shadow-xl shadow-cyan-500/20 mt-4 group">
                <span className="flex items-center justify-center gap-2">Enviar y Negociar<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></span>
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default BenefitFlyer;