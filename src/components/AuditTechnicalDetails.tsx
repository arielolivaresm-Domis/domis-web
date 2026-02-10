import { useState } from 'react';
import { ChevronDown, Zap, HardHat, Droplets, Flame, Home, Globe } from 'lucide-react';
import Section from './layout/Section';

const auditCategories = [
  {
    id: 'electrico',
    icon: <Zap className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Sistema Eléctrico',
    color: 'cyan',
    items: [
      'Termografía FLIR de tableros y circuitos',
      'Medición de cargas y protecciones',
      'Verificación normativa SEC (RIC N°10)',
      'Estado de cableado y conexiones'
    ]
  },
  {
    id: 'estructura',
    icon: <HardHat className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Estructura',
    color: 'orange',
    items: [
      'Medición de grietas con calibre digital',
      'Nivel láser 360° (pisos y muros)',
      'Desplomes y verticalidad',
      'Estado de vigas y pilares'
    ]
  },
  {
    id: 'humedad',
    icon: <Droplets className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Humedad e Infiltraciones',
    color: 'blue',
    items: [
      'Higrometría digital no invasiva',
      'Detección de filtraciones ocultas',
      'Mapeo térmico de humedades',
      'Evaluación de sellos y juntas'
    ]
  },
  {
    id: 'gas',
    icon: <Flame className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Gas y Calefacción',
    color: 'red',
    items: [
      'Detector ultrasónico de fugas',
      'Revisión de cañerías y conexiones',
      'Verificación DS 66 (normativa gas)',
      'Estado de sistemas de combustión'
    ]
  },
  {
    id: 'envolvente',
    icon: <Home className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Envolvente y Terminaciones',
    color: 'purple',
    items: [
      'Escaneo de puentes térmicos',
      'Estado de ventanas y puertas',
      'Aislación térmica y acústica',
      'Calidad de terminaciones'
    ]
  },
  {
    id: 'entorno',
    icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
    title: 'Entorno y Plusvalía (3km)',
    color: 'green',
    items: [
      'Colegios y centros educativos',
      'Servicios y comercio',
      'Transporte público',
      'Proyectos urbanos futuros'
    ]
  }
];

export default function AuditTechnicalDetails() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id);
  };

  return (
    <Section id="auditoria-tecnica" className="py-12 md:py-24 bg-slate-950">
      
      <div className="relative rounded-none md:rounded-[2.5rem] overflow-hidden border-y md:border border-white/10 bg-slate-950 shadow-2xl">
        
        {/* TEXTURA DE FONDO */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/wireframe.png')] opacity-[0.03] bg-repeat pointer-events-none"></div>

        <div className="p-6 md:p-16 relative z-10">
          
          {/* HEADER */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-6">
              <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-black">
                Sistema Profesional
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
              Protocolo de <br />
              <span className="text-cyan-400">Auditoría PCF-15™</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
              Superamos la inspección visual. Escaneo activo con instrumentación avanzada de precisión.
            </p>
          </div>

          {/* LAYOUT: SCREENSHOT + ACORDEÓN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            
            {/* COLUMNA IZQUIERDA - SCREENSHOT */}
            <div className="relative md:sticky md:top-24 md:self-start">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 group">
                {/* Badge flotante */}
                <div className="absolute top-4 left-4 z-10 bg-cyan-500 text-slate-950 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg">
                  Sistema Real PCF-15™
                </div>
                
                {/* Screenshot */}
                <img 
                  src="/PHOTO-2026-02-05-16-15-46.jpg"
                  alt="Sistema PCF-15 en acción"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay sutil */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Texto debajo del screenshot */}
              <div className="mt-6 text-center md:text-left">
                <p className="text-slate-400 text-sm leading-relaxed">
                  <span className="text-cyan-400 font-bold">Plataforma profesional</span> para registro técnico de cada propiedad auditada.
                </p>
              </div>
            </div>

            {/* COLUMNA DERECHA - ACORDEÓN */}
            <div className="space-y-3">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-6">
                🔍 Sistemas que Auditamos:
              </h3>

              {auditCategories.map((category) => (
                <div 
                  key={category.id}
                  className="bg-slate-900/40 border border-white/5 rounded-xl md:rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
                >
                  {/* HEADER - CLICKEABLE */}
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full flex items-center justify-between p-4 md:p-6 text-left group"
                  >
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className={`p-2 md:p-3 bg-${category.color}-500/10 rounded-lg border border-${category.color}-500/20 text-${category.color}-400 group-hover:bg-${category.color}-500/20 transition-all`}>
                        {category.icon}
                      </div>
                      <span className="text-base md:text-lg font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                        {category.title}
                      </span>
                    </div>

                    {/* FLECHA */}
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                        openCategory === category.id ? 'rotate-180 text-cyan-400' : ''
                      }`}
                    />
                  </button>

                  {/* CONTENIDO EXPANDIBLE */}
                  <div 
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      openCategory === category.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 border-t border-white/5">
                      <ul className="space-y-3">
                        {category.items.map((item, index) => (
                          <li key={index} className="flex items-start gap-3 text-slate-300 text-sm md:text-base">
                            <span className="text-cyan-400 text-lg shrink-0">•</span>
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* FOOTER - CTA */}
          <div className="mt-12 md:mt-16 pt-8 border-t border-white/5 text-center">
            <p className="text-slate-400 text-sm md:text-base mb-6">
              ¿Quieres ver el sistema en acción en tu propiedad?
            </p>
            <a 
              href="#auditoria-directa"
              className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-5 bg-cyan-500 hover:bg-white text-slate-950 font-black rounded-xl uppercase tracking-widest text-xs md:text-sm transition-all shadow-lg"
            >
              Solicitar Auditoría PCF-15™
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

        </div>
      </div>
    </Section>
  );
}