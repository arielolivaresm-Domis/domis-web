import React from 'react';
import { CHILEAN_NORMS } from '../normativeData.ts';

export const NormativeAnnex: React.FC = () => {
  return (
    <div className="hidden print:block break-before-page">
      <div className="border border-gray-300 p-4 bg-white">
        <h1 className="text-sm font-black text-slate-800 uppercase text-center mb-1 border-b-2 border-slate-800 pb-1">
            📘 Guía de Inspección y Tips Normativos
        </h1>
        <p className="text-center text-[8px] font-bold text-gray-400 mb-3 uppercase tracking-widest">
            Checklist técnico · Normativa Chilena Vigente (SEC / OGUC / RIDAA)
        </p>

        <table className="w-full text-[8px] border-collapse">
            <thead>
                <tr className="bg-slate-100 border-b border-slate-300">
                    <th className="px-1.5 py-1 text-left text-slate-700 w-1/4">Ítem</th>
                    <th className="px-1.5 py-1 text-left text-slate-700">Criterio Técnico</th>
                    <th className="px-1.5 py-1 text-left text-slate-700 w-1/5">Norma</th>
                    <th className="px-1.5 py-1 text-center text-slate-700 w-12">Gravedad</th>
                </tr>
            </thead>
            <tbody>
                {CHILEAN_NORMS.map((norm) => (
                    <tr key={norm.id} className="border-b border-gray-100">
                        <td className="px-1.5 py-0.5 font-bold text-slate-700 align-top leading-tight">{norm.label}</td>
                        <td className="px-1.5 py-0.5 text-gray-600 align-top leading-tight">{norm.text}</td>
                        <td className="px-1.5 py-0.5 font-mono text-slate-500 align-top leading-tight">{norm.ref}</td>
                        <td className="px-1.5 py-0.5 align-top text-center">
                            <span className={`px-1.5 py-0.5 rounded font-bold text-[7px] ${norm.gravity === 'Grave' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                {norm.gravity.toUpperCase()}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="mt-3 text-[7px] text-gray-400 italic text-center">
            Guía de consulta rápida. No reemplaza el texto completo de las normativas oficiales vigentes en Chile.
        </div>
      </div>
    </div>
  );
};
