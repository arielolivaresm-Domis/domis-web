import React from 'react';
import { CHILEAN_NORMS } from '../normativeData.ts';

export const NormativeAnnex: React.FC = () => {
  return (
    <div className="hidden print:block break-before-page">
      <div className="border border-gray-300 p-8 min-h-screen bg-white">
        <h1 className="text-xl font-black text-slate-800 uppercase text-center mb-2 border-b-2 border-slate-800 pb-2">
            📘 GUÍA DE INSPECCIÓN Y TIPS NORMATIVOS
        </h1>
        <p className="text-center text-xs font-bold text-gray-500 mb-6 uppercase tracking-widest">
            Checklist de Ejecución Técnica - Normativa Chilena Vigente (SEC / OGUC / RIDAA)
        </p>

        <table className="w-full text-[10px] border-collapse">
            <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                    <th className="p-2 text-left text-slate-800 w-1/4">QUÉ BUSCAR (ITEM)</th>
                    <th className="p-2 text-left text-slate-800">CRITERIO TÉCNICO</th>
                    <th className="p-2 text-left text-slate-800 w-1/5">NORMA (REF)</th>
                    <th className="p-2 text-center text-slate-800 w-16">GRAVEDAD</th>
                </tr>
            </thead>
            <tbody>
                {CHILEAN_NORMS.map((norm) => (
                    <tr key={norm.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-2 font-bold text-slate-700 align-top">
                            {norm.label}
                        </td>
                        <td className="p-2 text-gray-600 align-top">
                            {norm.text}
                        </td>
                        <td className="p-2 font-mono text-slate-500 align-top">
                            {norm.ref}
                        </td>
                        <td className="p-2 align-top text-center">
                            <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${norm.gravity === 'Grave' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                {norm.gravity.toUpperCase()}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        <div className="mt-8 text-[9px] text-gray-400 italic text-center">
            Este anexo es una guía de consulta rápida y no reemplaza el texto completo de las normativas oficiales vigentes en Chile.
        </div>
      </div>
    </div>
  );
};