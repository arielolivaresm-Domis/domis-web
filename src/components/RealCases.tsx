import { useState } from 'react';
import { ChevronRight, X, TrendingUp, Home, Building2, ChevronLeft } from 'lucide-react';
import Section from './layout/Section';

interface CaseData {
  id: number;
  name: string;
  age: string;
  profession: string;
  propertyType: 'casa' | 'depto';
  location: string;
  size: string;
  priceListed: string;
  priceListedUF: string;
  priceNegotiated: string;
  priceNegotiatedUF: string;
  savingsGross: string;
  discount: string;
  commissionDomis: string;
  savingsNet: string;
  keyService: string;
  quote: string;
  problem: string;
  findings: string[];
  economicResult: string;
  imageName: string;
}

const cases: CaseData[] = [
  {
    id: 1,
    name: "Carolina & Roberto",
    age: "Pediatra & Empresario",
    profession: "Familia con 2 hijos + bebé en camino",
    propertyType: "casa",
    location: "La Reina",
    size: "263m² en 898m²",
    priceListed: "$828.471.488",
    priceListedUF: "20.800 UF",
    priceNegotiated: "$679.406.620",
    priceNegotiatedUF: "17.056 UF",
    savingsGross: "$149.064.868",
    discount: "18%",
    commissionDomis: "$7.354.073",
    savingsNet: "$141.710.795",
    keyService: "Pack 2 Propiedades + Fase 2",
    quote: "Invertir $700M sin auditoría profesional era un riesgo que no podíamos tomar",
    problem: "Vivíamos en un departamento de 120m². Con el tercer hijo en camino, necesitábamos casa grande con jardín, cerca del colegio, en barrio familiar. Teníamos 2 opciones en La Reina pero no sabíamos cuál elegir sin datos técnicos reales.",
    findings: [
      "Casa 46 años con desgaste generalizado: pintura deteriorada, filtraciones por techumbre, sistemas obsoletos",
      "Sistema eléctrico antiguo: tablero sin protección diferencial, cableado de aluminio (no cumple norma actual)",
      "Cañerías galvanizadas corroídas con pérdida de presión generalizada",
      "Tasación IA reveló sobreprecio de 15.9% sobre valor real de mercado",
      "Total fallas cuantificadas: 220 UF ($8.7M)"
    ],
    economicResult: "Negociamos de 20.800 UF ($828.471.488) a 17.056 UF ($679.406.620). Descuento: 18% ($149.064.868). Después de pagar DOMIS™ ($7.354.073 que incluye descuentos: Fee -$400k + 40% Fase 1 -$245.927), el ahorro neto fue $141.710.795. Contratamos Fase 3 para remodelar antes de mudanza: $12.5M en 3 meses. Nos mudamos 2 semanas antes del nacimiento con casa impecable.",
    imageName: "carolina_roberto_familia.jpg"
  },
  {
    id: 2,
    name: "Andrea",
    age: "38 años",
    profession: "Arquitecta",
    propertyType: "casa",
    location: "Providencia",
    size: "151m² → 171m²",
    priceListed: "$669.150.048",
    priceListedUF: "16.800 UF",
    priceNegotiated: "$595.577.023",
    priceNegotiatedUF: "14.952 UF",
    savingsGross: "$73.573.025",
    discount: "11%",
    commissionDomis: "$5.354.073",
    savingsNet: "$68.218.952",
    keyService: "Pack 2 + Remodelación",
    quote: "Como arquitecta, creí que podía evaluarla yo misma. Sin instrumental profesional, estaba comprando a ciegas",
    problem: "Llevaba años buscando casa para mi familia. Tenía 2 casas en vista pero no sabía cuál elegir. Como arquitecta, pensé que podía evaluarlas yo misma, pero me di cuenta que sin instrumental profesional solo veía por encima.",
    findings: [
      "Termografía FLIR detectó infiltraciones invisibles: ΔT 22°C en muro poniente (humedad estructural oculta)",
      "Sistema eléctrico crítico: cableado aluminio antiguo, tablero sin protección diferencial, incumple SEC",
      "Grietas en muro de carga de 4mm (medición Bosch GSL 2) requieren refuerzo ingenieril",
      "Tasación IA mostró sobreprecio de 9% sobre valor real",
      "Total fallas: 350 UF ($13.9M)"
    ],
    economicResult: "Negocié de 16.800 UF ($669.150.048) a 14.952 UF ($595.577.023). Descuento: 11% ($73.573.025). Después de pagar DOMIS™ ($5.354.073 que incluye descuentos: Fee -$400k + 40% Fase 1 -$245.927), el ahorro neto fue $68.218.952. Contraté Fase 3 para remodelación completa: de 151m² a 171m², de 3D+3B a 4D+4B concepto abierto. Inversión remodelación: $70M en 5 meses. DOMIS™ no es un gasto, es la inversión más rentable del proyecto.",
    imageName: "andrea_arquitecta.jpg"
  },
  {
    id: 3,
    name: "Felipe",
    age: "35 años",
    profession: "Gerente de Finanzas, Padre de Familia",
    propertyType: "depto",
    location: "Las Condes",
    size: "180m²",
    priceListed: "$477.964.320",
    priceListedUF: "12.000 UF",
    priceNegotiated: "$435.059.532",
    priceNegotiatedUF: "10.920 UF",
    savingsGross: "$42.904.788",
    discount: "9%",
    commissionDomis: "$3.354.073",
    savingsNet: "$39.550.715",
    keyService: "Sourcing VIP + Fase 2",
    quote: "Con un hijo de 4 años y otro en camino, no tenía tiempo para buscar. DOMIS™ lo hizo por mí",
    problem: "Trabajo 10-12 horas al día en finanzas. Tengo un hijo de 4 años y mi mujer embarazada. Llevaba 8 años arrendando pero no tenía tiempo para buscar departamento cada fin de semana sin saber si valían la pena.",
    findings: [
      "Sourcing VIP: 4 propiedades visitadas en 2 días, 1 descartada inmediato por Informe Fast (humedad + 380 UF reparaciones)",
      "Infiltración en terraza detectada por termografía FLIR (ΔT 15°C) afectando dormitorio principal",
      "Sistema eléctrico con sobrecarga en circuito cocina, cableado subdimensionado",
      "Cañerías galvanizadas corroídas con riesgo de rotura a corto plazo",
      "Tasación IA reveló sobreprecio de 6.85%"
    ],
    economicResult: "Negocié de 12.000 UF ($477.964.320) a 10.920 UF ($435.059.532). Descuento: 9% ($42.904.788). Después de pagar DOMIS™ ($3.354.073 que incluye descuentos: Fee -$400k + 40% Fase 1 -$245.927), el ahorro neto fue $39.550.715. Ahorré meses de búsqueda, evité 3 malas opciones, y compré la indicada con casi $40M de ahorro neto. El Sourcing VIP es para gente que valora su tiempo y quiere certeza total.",
    imageName: "felipe_ejecutivo.jpg"
  }
];

export default function RealCases() {
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cases.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <Section id="casos-reales" className="py-12 md:py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] md:text-[14px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg">
            Casos Reales Verificables
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none mb-4">
            Resultados <span className="text-cyan-400">Verificables</span>
          </h2>
          <p className="text-xl md:text-3xl font-black text-white/80 tracking-tight mb-4">
            Auditorías que se pagan solas
          </p>
          <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">
            Propiedades reales · Ahorros reales · Clientes reales
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8">
          {cases.map((caso) => (
            <CaseCard key={caso.id} caso={caso} onClick={() => setSelectedCase(caso)} />
          ))}
        </div>

        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {cases.map((caso) => (
                <div key={caso.id} className="min-w-full px-2">
                  <CaseCard caso={caso} onClick={() => setSelectedCase(caso)} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-slate-900 border border-white/10 text-white hover:border-cyan-500 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {cases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-cyan-500 w-8' : 'bg-slate-700'
                  }`}
                  aria-label={`Ir a caso ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-slate-900 border border-white/10 text-white hover:border-cyan-500 transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a 
            href="#auditoria-directa"
            className="inline-flex items-center justify-center gap-3 px-8 md:px-12 py-4 md:py-6 bg-cyan-500 text-slate-950 font-black rounded-2xl uppercase tracking-widest text-[11px] md:text-sm hover:bg-white transition-all shadow-xl active:scale-95"
          >
            Solicitar Mi Auditoría
            <ChevronRight size={20} />
          </a>
        </div>
      </div>

      {selectedCase && (
        <CaseModal caso={selectedCase} onClose={() => setSelectedCase(null)} />
      )}
    </Section>
  );
}

function CaseCard({ caso, onClick }: { caso: CaseData; onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl hover:border-cyan-500/50 transition-all duration-500 group cursor-pointer"
    >
      <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/50 z-10"></div>
        
        <img 
          src={`/${caso.imageName}`}
          alt={caso.name}
          className="w-full h-full object-cover object-top opacity-60 group-hover:scale-105 transition-transform duration-700 blur-[1.5px]"
        />
        
        <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 border border-white/10 z-20">
          {caso.propertyType === 'casa' ? <Home size={14} className="text-cyan-400" /> : <Building2 size={14} className="text-cyan-400" />}
          <span className="text-white text-[10px] font-black uppercase tracking-widest">{caso.propertyType}</span>
        </div>

        <div className="absolute top-4 left-4 bg-cyan-500 px-3 py-1.5 rounded-full shadow-lg z-20">
          <span className="text-slate-950 text-[10px] font-black uppercase tracking-widest">{caso.discount} DCTO</span>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">{caso.name}</h3>
          <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-1">
            {caso.age}
          </p>
          <p className="text-slate-500 text-[9px] mt-1">{caso.profession}</p>
        </div>

        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="text-cyan-400">📍</span>
          <span className="text-cyan-400 font-bold">{caso.location}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400 text-xs">{caso.size}</span>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mb-4 backdrop-blur-sm">
          <div className="flex items-baseline justify-between mb-1">
            <span className="text-cyan-400 text-[10px] uppercase tracking-widest font-black">Ahorro Neto Final</span>
            <TrendingUp size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">{caso.savingsNet}</div>
          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-400">Descuento: <span className="text-white font-bold">{caso.discount}</span></span>
          </div>
        </div>

        <div className="mb-4 px-3 py-2 bg-slate-950/50 rounded-lg border border-white/5">
          <p className="text-[10px] text-cyan-400 uppercase tracking-widest font-black mb-1">Servicio Usado</p>
          <p className="text-xs text-slate-300 font-bold">{caso.keyService}</p>
        </div>

        <blockquote className="mb-6 pl-4 border-l-2 border-cyan-500/30">
          <p className="text-sm text-slate-300 italic leading-relaxed">&quot;{caso.quote}&quot;</p>
        </blockquote>

        <button
          className="w-full flex items-center justify-center gap-2 bg-slate-950 border border-white/10 hover:border-cyan-500 hover:bg-cyan-500/10 text-white py-3 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all"
        >
          Ver Caso Completo
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function CaseModal({ caso, onClose }: { caso: CaseData; onClose: () => void }) {
  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md" 
      onClick={onClose}
    >
      <div 
        className="relative z-[100000] w-full max-w-4xl bg-slate-900 border-2 border-cyan-500 rounded-[2.5rem] p-8 md:p-12 shadow-[0_0_60px_rgba(34,211,238,0.3)] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase mb-4">
            Caso Real Verificable
          </div>
          <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">{caso.name}</h3>
          <p className="text-cyan-400 text-sm uppercase tracking-widest">{caso.age}</p>
          <p className="text-slate-400 text-xs mt-1">{caso.profession}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase mb-1 tracking-widest">Ubicación</p>
            <p className="text-white font-bold text-sm">{caso.location}</p>
          </div>
          <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase mb-1 tracking-widest">Superficie</p>
            <p className="text-white font-bold text-sm">{caso.size}</p>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
            <p className="text-[10px] text-cyan-400 uppercase mb-1 tracking-widest">Descuento</p>
            <p className="text-white font-black text-lg">{caso.discount}</p>
          </div>
          <div className="bg-cyan-500/10 p-4 rounded-xl border border-cyan-500/20">
            <p className="text-[10px] text-cyan-400 uppercase mb-1 tracking-widest">Ahorro Neto</p>
            <p className="text-cyan-400 font-black text-sm">{caso.savingsNet}</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="text-red-500">⚠️</span> El Problema
            </h4>
            <div className="bg-slate-950/50 p-6 rounded-xl border border-white/5">
              <p className="text-slate-300 leading-relaxed">{caso.problem}</p>
            </div>
          </div>

          <div>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="text-cyan-400">🔍</span> Lo que Detectó PCF-15™ by DOMIS™
            </h4>
            <div className="bg-slate-950/50 p-6 rounded-xl border border-cyan-500/20 space-y-3">
              {caso.findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-cyan-400 text-xl shrink-0">•</span>
                  <p className="text-slate-300 text-sm leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-4 flex items-center gap-3">
              <span className="text-green-400">💰</span> Resultado Económico
            </h4>
            <div className="bg-gradient-to-br from-slate-950/80 to-slate-900/80 p-6 rounded-xl border border-cyan-500/20">
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Precio inicial:</span>
                  <div className="text-right">
                    <span className="text-white font-bold text-sm">{caso.priceListed}</span>
                    <span className="text-slate-500 text-xs ml-2">({caso.priceListedUF})</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Precio negociado:</span>
                  <div className="text-right">
                    <span className="text-white font-bold text-sm">{caso.priceNegotiated}</span>
                    <span className="text-slate-500 text-xs ml-2">({caso.priceNegotiatedUF})</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-cyan-500/20">
                  <span className="text-cyan-400 text-sm font-bold">Descuento logrado:</span>
                  <div className="text-right">
                    <span className="text-cyan-400 font-black text-lg">{caso.savingsGross}</span>
                    <span className="text-cyan-500 text-sm ml-2">({caso.discount})</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <span className="text-slate-400 text-sm">Comisión DOMIS™:</span>
                  <span className="text-white font-bold text-sm">-{caso.commissionDomis}</span>
                </div>
                <div className="text-xs text-slate-500 pl-4 pb-3 border-b border-white/5">
                  (Incluye descuentos: Fee -$400.000 + 40% Fase 1 -$245.927)
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 p-4 rounded-xl border border-cyan-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-white font-black text-base uppercase tracking-wide">Ahorro Neto Final:</span>
                  <span className="text-cyan-400 font-black text-2xl md:text-3xl">{caso.savingsNet}</span>
                </div>
              </div>

              <p className="text-slate-300 leading-relaxed font-medium mt-6 text-sm">{caso.economicResult}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}