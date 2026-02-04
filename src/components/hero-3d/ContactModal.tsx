import { useState } from 'react';
import { X, Send } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ nombre: '', telefono: '', email: '' });
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // 🔗 URL de Google Apps Script
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_pfwUzZ0KKIUC7r7zvJPQWb6OPzKqc_WAl2U_LphBgxi1uh1jdLd9eUf4Q1HPXRjm/exec";

    try {
      // 📡 Registro silencioso en Google (arielom@domis.cl)
      await fetch(GOOGLE_SCRIPT_URL, { 
        method: "POST",
        mode: "no-cors", 
        body: JSON.stringify({
          Asunto: "CONSULTA SISTEMA DOMIS",
          Nombre: formData.nombre,
          Telefono: formData.telefono,
          Email: formData.email,
        }),
      });
    } catch (error) { 
      console.error("Error Google Script:", error); 
    }

    // 📱 Apertura de WhatsApp con mensaje estructurado
    const msg = `*CONSULTA: INFORMACIÓN SISTEMA DOMIS™*%0A%0A` +
      `Hola equipo, me interesa conocer los detalles del sistema.%0A%0A` +
      `*MIS DATOS:*%0A` +
      `👤 Nombre: ${formData.nombre}%0A` +
      `📱 WhatsApp: ${formData.telefono}%0A` +
      `📧 Email: ${formData.email}%0A%0A` +
      `[REF: PORTADA-DOMIS]`;

    window.open(`https://wa.me/56929901343?text=${msg}`, '_blank');
    
    setIsSending(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-slate-800 p-6 flex justify-between items-center border-b border-white/5 text-white">
          <div className="text-left">
            <h3 className="font-black uppercase italic tracking-tighter text-xl leading-none">Saber más</h3>
            <p className="text-cyan-500 text-[10px] font-black uppercase tracking-widest mt-1">Conexión Directa DOMIS™</p>
          </div>
          <button onClick={onClose}><X size={24} className="text-slate-500 hover:text-white transition-colors" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5 text-left">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 text-left">Nombre y Apellido</label>
            <input required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-cyan-500 transition-all" placeholder="Juan Pérez" onChange={e => setFormData({...formData, nombre: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 text-left">WhatsApp</label>
            <input required className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-cyan-500 transition-all" placeholder="+56 9..." onChange={e => setFormData({...formData, telefono: e.target.value})} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block ml-1 text-left">Email</label>
            <input required type="email" className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-cyan-500 transition-all" placeholder="ariel@domis.cl" onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <button disabled={isSending} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
            {isSending ? "Conectando..." : <><Send size={16} /> Enviar Consulta</>}
          </button>
        </form>
      </div>
    </div>
  );
}