import React from 'react';

export const TechnicalGuide: React.FC = () => {
  return (
    <div className="card bg-slate-900 border border-slate-700 rounded-xl p-6 mb-24 shadow-lg animate-fade-in break-inside-avoid">
      <h2 className="text-slate-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold flex items-center gap-2">
        📘 ANEXO: Guía Técnica y Normativa
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* COLUMNA 1: ESCALA Y NORMAS */}
        <div className="space-y-6">
            
            {/* ESCALA DE EVALUACIÓN */}
            <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                <h3 className="text-emerald-400 font-bold text-sm mb-3 uppercase">📊 Escala de Evaluación (Criterio PCF-15)</h3>
                <div className="space-y-2 text-xs">
                    <div className="flex gap-2">
                        <span className="bg-emerald-600 text-white px-2 py-0.5 rounded font-bold w-6 text-center">7</span>
                        <span className="text-slate-300"><strong className="text-white">Nuevo / Perfecto:</strong> Sin observaciones. Vida útil 100%.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-emerald-500 text-white px-2 py-0.5 rounded font-bold w-6 text-center">6</span>
                        <span className="text-slate-300"><strong className="text-white">Bueno:</strong> Desgaste mínimo imperceptible. Mantención preventiva.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-amber-500 text-slate-900 px-2 py-0.5 rounded font-bold w-6 text-center">5</span>
                        <span className="text-slate-300"><strong className="text-white">Normal:</strong> Desgaste por uso visible (pintura, sellos). Funcional.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-amber-600 text-white px-2 py-0.5 rounded font-bold w-6 text-center">4</span>
                        <span className="text-slate-300"><strong className="text-white">Regular:</strong> Requiere mantención correctiva menor (cambio accesorios).</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-red-500 text-white px-2 py-0.5 rounded font-bold w-6 text-center">3</span>
                        <span className="text-slate-300"><strong className="text-white">Malo:</strong> Falla funcional local. Requiere reparación profesional.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-red-600 text-white px-2 py-0.5 rounded font-bold w-6 text-center">2</span>
                        <span className="text-slate-300"><strong className="text-white">Muy Malo:</strong> Falla generalizada. Requiere reemplazo total del ítem.</span>
                    </div>
                    <div className="flex gap-2">
                        <span className="bg-red-700 text-white px-2 py-0.5 rounded font-bold w-6 text-center">1</span>
                        <span className="text-slate-300"><strong className="text-white">Crítico:</strong> Peligro inminente (riesgo eléctrico/estructural).</span>
                    </div>
                </div>
            </div>

            {/* GLOSARIO NORMATIVO */}
            <div className="bg-slate-800/50 p-4 rounded border border-slate-700">
                <h3 className="text-blue-400 font-bold text-sm mb-3 uppercase">📜 Glosario Normativo</h3>
                <ul className="text-xs space-y-2 text-slate-300">
                    <li><strong className="text-blue-200">OGUC:</strong> Ordenanza General de Urbanismo y Construcciones. Regula arquitectura, seguridad contra incendios y estabilidad.</li>
                    <li><strong className="text-blue-200">SEC (RIC):</strong> Superintendencia de Electricidad y Combustibles. Reglamentos de Instalaciones de Consumo (Pliegos RIC).</li>
                    <li><strong className="text-blue-200">RIDAA:</strong> Reglamento de Instalaciones Domiciliarias de Agua Potable y Alcantarillado.</li>
                    <li><strong className="text-blue-200">NCh:</strong> Normas Chilenas (INN). Estándares técnicos específicos (Hormigón, Acústica, Térmica).</li>
                </ul>
            </div>
        </div>

        {/* COLUMNA 2: PATOLOGÍAS */}
        <div className="space-y-6">
            {/* GUÍA DE GRIETAS */}
            <div className="bg-slate-800/50 p-4 rounded border border-amber-900/30">
                <h3 className="text-amber-400 font-bold text-sm mb-3 uppercase flex items-center gap-2">🏗️ Guía de Patologías: Muros y Estructura</h3>
                
                <div className="space-y-4">
                    <div>
                        <h4 className="text-xs font-bold text-white mb-1 border-b border-slate-600 pb-1">1. FISURA vs GRIETA</h4>
                        <p className="text-xs text-slate-300 mb-1">
                            <span className="text-emerald-400 font-bold">Fisura ({"<"} 1mm):</span> Afecta solo al recubrimiento (pintura/yeso). Estético. <br/>
                            <span className="text-red-400 font-bold">Grieta ({">"} 1.5mm):</span> Afecta al soporte (ladrillo/hormigón). Posible daño estructural.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-xs font-bold text-white mb-1 border-b border-slate-600 pb-1">2. DIAGNÓSTICO POR FORMA</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                           <div className="bg-slate-900 p-2 rounded border border-slate-700">
                                <div className="h-0.5 w-8 bg-slate-500 mb-1 rotate-45 origin-left mx-auto"></div>
                                <div className="font-bold text-amber-500 text-center">Diagonal (45°)</div>
                                <div className="text-[10px] text-center text-slate-400">Esfuerzo de Corte / Sismo. Revisar vigas y dinteles.</div>
                           </div>
                           <div className="bg-slate-900 p-2 rounded border border-slate-700">
                                <div className="h-8 w-0.5 bg-slate-500 mb-1 mx-auto"></div>
                                <div className="font-bold text-blue-400 text-center">Vertical</div>
                                <div className="text-[10px] text-center text-slate-400">Compresión o Dilatación térmica. Común en uniones.</div>
                           </div>
                           <div className="bg-slate-900 p-2 rounded border border-slate-700">
                                <div className="h-0.5 w-8 bg-slate-500 mb-1 mx-auto"></div>
                                <div className="font-bold text-slate-300 text-center">Horizontal</div>
                                <div className="text-[10px] text-center text-slate-400">Flexión o asentamiento del terreno. Revisar cimientos.</div>
                           </div>
                           <div className="bg-slate-900 p-2 rounded border border-slate-700">
                                <div className="text-center font-bold text-slate-500">🕸️</div>
                                <div className="font-bold text-slate-300 text-center">Mapa / Araña</div>
                                <div className="text-[10px] text-center text-slate-400">Retracción de fraguado (Estuco). Solo estético.</div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEGURIDAD ELECTRICA */}
            <div className="bg-slate-800/50 p-4 rounded border border-red-900/30">
                 <h3 className="text-red-400 font-bold text-sm mb-3 uppercase flex items-center gap-2">⚡ Seguridad Eléctrica (Tableros)</h3>
                 <ul className="text-xs space-y-2 text-slate-300">
                    <li className="flex gap-2 items-start"><span className="text-red-500 font-bold">✖</span> <span><strong>Sin Diferencial:</strong> Peligro de muerte por electrocución. (Nota máx: 3)</span></li>
                    <li className="flex gap-2 items-start"><span className="text-amber-500 font-bold">!</span> <span><strong>Automáticos antiguos (Tapones):</strong> Riesgo de incendio. Fuera de norma.</span></li>
                    <li className="flex gap-2 items-start"><span className="text-emerald-500 font-bold">✓</span> <span><strong>Norma Actual (Verde):</strong> Diferencial + Automáticos + Tierra (Conductor Verde/Amarillo).</span></li>
                 </ul>
            </div>
        </div>
      </div>
    </div>
  );
};