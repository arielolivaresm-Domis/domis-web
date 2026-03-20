import React from 'react';

export const TechnicalGuide: React.FC = () => {
  return (
    <div className="card bg-slate-900 border border-slate-700 rounded-xl p-4 mb-24 shadow-lg animate-fade-in break-inside-avoid">
      <h2 className="text-slate-400 border-b border-slate-700 pb-2 mb-3 text-sm font-bold flex items-center gap-2">
        📘 ANEXO: Guía Técnica y Normativa
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* COLUMNA 1 */}
        <div className="space-y-3">

          {/* ESCALA */}
          <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
            <h3 className="text-emerald-400 font-bold text-xs mb-2 uppercase">📊 Escala PCF-15™</h3>
            <div className="space-y-1.5">
              {[
                { letter: 'O', bg: 'bg-blue-600',   tc: 'text-blue-300',   label: 'Óptimo',   desc: 'Sin intervención. Estado adecuado.' },
                { letter: 'N', bg: 'bg-emerald-500', tc: 'text-emerald-300', label: 'Normal',   desc: 'Mantención básica. Baja prioridad.' },
                { letter: 'M', bg: 'bg-amber-400 text-slate-900', tc: 'text-amber-300', label: 'Moderado', desc: 'Corrección planificada. Prioridad media.' },
                { letter: 'U', bg: 'bg-red-500',     tc: 'text-red-300',    label: 'Urgente',  desc: 'Acción inmediata. Riesgo presente.' },
              ].map(({ letter, bg, tc, label, desc }) => (
                <div key={letter} className="flex gap-2 items-center">
                  <span className={`${bg} text-white px-2 py-0.5 rounded font-black text-xs shrink-0 w-6 text-center`}>{letter}</span>
                  <span className="text-[11px] text-slate-300"><strong className={tc}>{label}:</strong> {desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* GLOSARIO NORMATIVO */}
          <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
            <h3 className="text-blue-400 font-bold text-xs mb-2 uppercase">📜 Glosario Normativo</h3>
            <ul className="text-[11px] space-y-1 text-slate-300">
              <li><strong className="text-blue-200">OGUC:</strong> Urbanismo y Construcciones. Arquitectura, incendios, estabilidad.</li>
              <li><strong className="text-blue-200">SEC (RIC):</strong> Electricidad y Combustibles. Instalaciones de consumo.</li>
              <li><strong className="text-blue-200">RIDAA:</strong> Instalaciones Domiciliarias de Agua Potable y Alcantarillado.</li>
              <li><strong className="text-blue-200">NCh:</strong> Normas Chilenas (INN). Hormigón, Acústica, Térmica.</li>
            </ul>
          </div>
        </div>

        {/* COLUMNA 2 */}
        <div className="space-y-3">

          {/* PATOLOGÍAS */}
          <div className="bg-slate-800/50 p-3 rounded border border-amber-900/30">
            <h3 className="text-amber-400 font-bold text-xs mb-2 uppercase">🏗️ Patologías: Muros</h3>
            <p className="text-[11px] text-slate-300 mb-2">
              <span className="text-emerald-400 font-bold">Fisura (&lt;1mm):</span> Solo recubrimiento. Estético. &nbsp;
              <span className="text-red-400 font-bold">Grieta (&gt;1.5mm):</span> Soporte estructural. Revisar.
            </p>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              {[
                { label: 'Diagonal 45°', color: 'text-amber-500', desc: 'Corte / Sismo. Revisar vigas.' },
                { label: 'Vertical',     color: 'text-blue-400',  desc: 'Compresión / Dilatación térmica.' },
                { label: 'Horizontal',   color: 'text-slate-300', desc: 'Flexión / Asentamiento terreno.' },
                { label: '🕸️ Araña',    color: 'text-slate-400', desc: 'Retracción estuco. Estético.' },
              ].map(({ label, color, desc }) => (
                <div key={label} className="bg-slate-900 p-1.5 rounded border border-slate-700">
                  <div className={`font-bold ${color} text-center text-[10px]`}>{label}</div>
                  <div className="text-[9px] text-center text-slate-400 mt-0.5">{desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ELÉCTRICA */}
          <div className="bg-slate-800/50 p-3 rounded border border-red-900/30">
            <h3 className="text-red-400 font-bold text-xs mb-2 uppercase">⚡ Seguridad Eléctrica</h3>
            <ul className="text-[11px] space-y-1.5 text-slate-300">
              <li className="flex gap-2 items-start">
                <span className="bg-red-500 text-white px-1 py-0.5 rounded font-black text-[9px] shrink-0">U</span>
                <span><strong>Sin Diferencial:</strong> Peligro electrocución. Reemplazo inmediato.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="bg-amber-400 text-slate-900 px-1 py-0.5 rounded font-black text-[9px] shrink-0">M</span>
                <span><strong>Tapones antiguos:</strong> Riesgo incendio. Fuera norma SEC.</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="bg-blue-600 text-white px-1 py-0.5 rounded font-black text-[9px] shrink-0">O</span>
                <span><strong>Norma actual:</strong> Diferencial + Automáticos + Tierra. Sin intervención.</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
