import { useState } from 'react';

export default function AuditPacks() {
  const [activePack, setActivePack] = useState<'individual' | 'dupla' | 'inversionista' | null>(null);

  const packs = [
    {
      id: 'individual',
      name: 'Pack 1: Individual',
      price: '$1.900',
      tag: 'Validación Total',
      icon: '🔍',
      features: ['Validación técnica de 1 propiedad', 'Checklist Normativo (OGUC)', 'Registro Fotográfico HD', 'Test de Humedad y Fugas'],
      color: 'cyan'
    },
    {
      id: 'dupla',
      name: 'Pack 2: Dupla',
      price: '$1.710',
      tag: '10% OFF Incluido',
      icon: '👥',
      features: ['Evaluación de 2 propiedades', 'Análisis Comparativo Técnico', 'Revisión Estructural Visual', 'Termografía Infrarroja'],
      color: 'white'
    },
    {
      id: 'inversionista',
      name: 'Pack 3+: Inversionista',
      price: '$1.520',
      tag: '20% OFF Incluido',
      icon: '🛡️',
      features: ['3 o más unidades simultáneas', 'Informe Maestro de Cartera', 'Análisis Eléctrico (Tableros)', 'Prioridad en Agenda Técnica'],
      color: 'red'
    }
  ];

  return (
    <section id="audit-packs" className="scroll-mt-24">
      
      {/* HEADER: EL ERROR MÁS CARO CON IMAGEN OPTIMIZADA */}
      <div className="relative rounded-[2rem] overflow-hidden mb-16 border-2 border-slate-800 shadow-2xl min-h-[450px] flex items-center justify-center">
        {/* FONDO: Solo la imagen optimizada con overlay */}
        <div className="absolute inset-0">
          <img 
            src="/DOMIS_error_mas_comun.webp" 
            alt="Error en propiedad inmobiliaria" 
            className="w-full h-full object-cover opacity-60 grayscale-[0.2] contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40"></div>
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
          
          <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-semibold drop-shadow-lg mb-4">
            No permitas que la emoción de la mudanza oculte fallas que <span className="text-white font-black underline decoration-red-500 underline-offset-4">tú terminarás pagando</span>.
          </p>
          <p className="text-cyan-400 font-mono text-sm uppercase tracking-widest font-bold">
            Mínimo técnico de 100 m² por propiedad
          </p>
        </div>
      </div>

      {/* SELECTOR DE 3 PACKS */}
      <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {packs.map((pack) => (
          <div 
            key={pack.id}
            className={`relative p-8 rounded-3xl border-2 cursor-pointer transition-all duration-500 flex flex-col ${
              activePack === pack.id 
                ? `bg-slate-900 border-${pack.color === 'white' ? 'slate-400' : pack.color + '-500'} shadow-2xl scale-[1.02]` 
                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
            }`}
            onClick={() => setActivePack(pack.id as any)}
          >
            <div className="relative z-10 flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <span className="text-3xl">{pack.icon}</span>
                </div>
                <div className="text-right">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">{pack.name}</h3>
                  <p className={`text-${pack.color === 'white' ? 'slate-400' : pack.color + '-400'} font-mono text-[10px] uppercase tracking-widest font-bold`}>
                    {pack.tag}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {pack.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm">
                    <span className="text-cyan-500 mt-1">✓</span>
                    <span className="font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-center mt-auto">
                <span className="block text-slate-400 text-[10px] uppercase tracking-widest mb-1">Valor por m² (Neto)</span>
                <div className="text-3xl font-black text-white mb-2">{pack.price}</div>
                <a 
                  href={`https://wa.me/56982348089?text=Hola,%20quiero%20información%20sobre%20el%20${encodeURIComponent(pack.name)}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`block w-full py-3 font-black uppercase rounded-xl transition-all mt-4 text-sm ${
                    pack.id === 'inversionista' ? 'bg-red-500 text-white hover:bg-red-400' : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400'
                  }`}
                >
                  Agendar Auditoría
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">
          * Valores + IVA. Consulta por planes personalizados para superficies mayores a 500 m².
        </p>
      </div>
    </section>
  );
}