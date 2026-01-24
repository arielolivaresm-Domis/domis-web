import { useState } from 'react';

export default function AuditPacks() {
  const [activePack, setActivePack] = useState<'ess' | 'adv' | null>(null);

  const commonFeatures = [
    { icon: '📋', text: 'Checklist Normativo (OGUC)' },
    { icon: '📸', text: 'Registro Fotográfico HD' },
    { icon: '🏗️', text: 'Revisión Estructural Visual' },
    { icon: '💧', text: 'Test de Humedad y Fugas' },
  ];

  const advancedFeatures = [
    { icon: '⚡', text: 'Análisis Eléctrico (Tableros)' },
    { icon: '🌡️', text: 'Termografía Infrarroja' },
    { icon: '🚽', text: 'Prueba de Presión Sanitaria' },
    { icon: '📜', text: 'Revisión de Planos Municipales' },
  ];

  return (
    <section id="audit-packs" className="scroll-mt-24">
      
      {/* HEADER: EL ERROR MÁS CARO CON IMAGEN OPTIMIZADA WEBP */}
      <div className="relative rounded-[2rem] overflow-hidden mb-16 border-2 border-slate-800 shadow-2xl min-h-[450px] flex items-center justify-center">
        {/* FONDO TÉCNICO */}
        <div className="absolute inset-0">
          <img 
            src="/DOMIS_error_mas_comun.webp" 
            alt="Error en propiedad inmobiliaria" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.2] contrast-110"
          />
          {/* Overlay gradiente para asegurar contraste del texto */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
          {/* Trama técnica de wireframe sutil */}
          <div className="absolute inset-0 bg-[url('/wireframe.png')] opacity-10 bg-repeat mix-blend-overlay"></div>
        </div>

        {/* CONTENIDO DEL HEADER */}
        <div className="relative z-10 p-8 md:p-16 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full mb-8">
            <span className="text-[10px] md:text-xs font-mono text-red-500 uppercase tracking-[0.3em] font-black">
              Alerta de Riesgo Inmobiliario
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
            90% EL ERROR <span className="text-red-500">MÁS CARO</span><br className="hidden md:block" />
            ES NO AUDITAR
          </h2>
          
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-semibold drop-shadow-lg">
            No permitas que la emoción de la mudanza oculte fallas que <span className="text-white font-black underline decoration-red-500 underline-offset-4">tú terminarás pagando</span>. 
            Nuestra auditoría detecta lo que el ojo inexperto ignora.
          </p>
        </div>
      </div>

      {/* SELECTOR DE PACKS */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* PACK ESENCIAL */}
        <div 
          className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 group ${
            activePack === 'ess' 
              ? 'bg-slate-900 border-cyan-500 shadow-2xl shadow-cyan-500/20 scale-[1.02]' 
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}
          onClick={() => setActivePack('ess')}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-4xl">🔍</span>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Esencial</h3>
                <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest">Detección Rápida</p>
              </div>
            </div>

            <ul className="space-y-4 mb-12">
              {commonFeatures.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300">
                  <span className="text-cyan-500">{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
              <span className="block text-slate-400 text-xs uppercase tracking-widest mb-1">Inversión Única</span>
              <div className="text-4xl font-black text-white mb-2">3.5 UF</div>
              <a href="https://wa.me/56982348089?text=Quiero%20agendar%20el%20Pack%20Esencial" target="_blank" rel="noreferrer" className="block w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase rounded-xl transition-all mt-4">
                Agendar Visita
              </a>
            </div>
          </div>
        </div>

        {/* PACK AVANZADO */}
        <div 
          className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 group ${
            activePack === 'adv' 
              ? 'bg-slate-900 border-red-500 shadow-2xl shadow-red-500/20 scale-[1.02]' 
              : 'bg-slate-950 border-slate-800 hover:border-slate-700'
          }`}
          onClick={() => setActivePack('adv')}
        >
          <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-20">
            Más Solicitado
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <span className="text-4xl">🛡️</span>
              </div>
              <div className="text-right">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Avanzado</h3>
                <p className="text-red-400 font-mono text-sm uppercase tracking-widest">Seguridad Total</p>
              </div>
            </div>

            <ul className="space-y-4 mb-12">
              {[...commonFeatures, ...advancedFeatures].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300">
                  <span className={`text-${idx < 4 ? 'cyan' : 'red'}-500`}>{item.icon}</span>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center">
              <span className="block text-slate-400 text-xs uppercase tracking-widest mb-1">Inversión Única</span>
              <div className="text-4xl font-black text-white mb-2">5.5 UF</div>
              <a href="https://wa.me/56982348089?text=Quiero%20agendar%20el%20Pack%20Avanzado" target="_blank" rel="noreferrer" className="block w-full py-3 bg-red-500 hover:bg-red-400 text-white font-black uppercase rounded-xl transition-all mt-4">
                Blindar mi Compra
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}