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
    problem: "Vivíamos en un departamento de 120m². Con el tercer hijo en camino, necesitábamos casa grande con jardín, cerca del colegio, en barrio familiar.",
    findings: [
      "Casa 46 años con desgaste generalizado: pintura deteriorada, filtraciones por techumbre",
      "Sistema eléctrico antiguo: tablero sin protección diferencial, cableado de aluminio",
      "Cañerías galvanizadas corroídas con pérdida de presión",
      "Tasación IA reveló sobreprecio de 15.9%",
      "Total fallas cuantificadas: 220 UF ($8.7M)"
    ],
    economicResult: "Negociamos de 20.800 UF a 17.056 UF. El ahorro neto fue $141.710.795.",
    imageName: "carolina_roberto_familia.jpg"
  },
  {
    id: 2,
    name: "Andrea",
    age: "38 años",
    profession: "Arquitecta, Madre de 5",
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
    problem: "Llevaba años buscando casa para mi familia de 5.",
    findings: [
      "Termografía FLIR detectó infiltraciones invisibles: ΔT 22°C",
      "Sistema eléctrico crítico: cableado aluminio antiguo",
      "Grietas en muro de carga de 4mm (medición Bosch GSL 2)",
      "Tasación IA mostró sobreprecio de 9%",
      "Total fallas: 350 UF ($13.9M)"
    ],
    economicResult: "Negocié de 16.800 UF a 14.952 UF. El ahorro neto fue $68.218.952.",
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
    problem: "Trabajo 10-12 horas al día. No tenía tiempo para buscar departamento cada fin de semana.",
    findings: [
      "Sourcing VIP: 4 propiedades visitadas en 2 días",
      "Infiltración en terraza detectada por termografía FLIR",
      "Sistema eléctrico con sobrecarga en circuito cocina",
      "Cañerías galvanizadas corroídas",
      "Tasación IA reveló sobreprecio de 6.85%"
    ],
    economicResult: "Negocié de 12.000 UF a 10.920 UF. El ahorro neto fue $39.550.715.",
    imageName: "felipe_ejecutivo.jpg"
  }
];

export default function RealCases() {
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % cases.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + cases.length) % cases.length);

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
            <button onClick={prevSlide} className="p-3 rounded-full bg-slate-900 border border-white/10 text-white"><ChevronLeft size={20} /></button>
            <button onClick={nextSlide} className="p-3 rounded-full bg-slate-900 border border-white/10 text-white"><ChevronRight size={20} /></button>
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
    <div onClick={onClick} className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl hover:border-cyan-500/50 transition-all cursor-pointer group">
      <div className="relative h-40">
        <div className="absolute inset-0 bg-slate-950/50 z-10"></div>
        <div className="absolute top-4 left-4 bg-cyan-500 px-3 py-1.5 rounded-full z-20">
          <span className="text-slate-950 text-[10px] font-black uppercase tracking-widest">{caso.discount} DCTO</span>
        </div>
        <div className="p-6 relative z-20">
          <h3 className="text-2xl font-black text-white uppercase leading-tight">{caso.name}</h3>
          <p className="text-cyan-400 font-black text-3xl mt-4">{caso.savingsNet}</p>
        </div>
      </div>
    </div>
  );
}

function CaseModal({ caso, onClose }: { caso: CaseData; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-slate-900 border-2 border-cyan-500 rounded-[2.5rem] p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24} /></button>
        <h3 className="text-3xl font-black text-white uppercase mb-4">{caso.name}</h3>
        <div className="space-y-6">
          <div className="bg-slate-950/50 p-6 rounded-xl border border-cyan-500/20">
            <h4 className="text-cyan-400 font-black mb-2 uppercase">Lo que Detectó PCF-15™ by DOMIS™</h4>
            <ul className="space-y-2">
              {caso.findings.map((f, i) => <li key={i} className="text-slate-300 text-sm">• {f}</li>)}
            </ul>
          </div>
          <div className="bg-cyan-500 p-6 rounded-xl">
             <div className="flex justify-between items-center text-slate-950">
               <span className="font-black uppercase">Ahorro Neto Final:</span>
               <span className="font-black text-3xl">{caso.savingsNet}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}