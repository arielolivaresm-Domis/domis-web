import React from 'react';
import { AuditState, AuditScore } from '../types';
import { ITEMS, DORM_ITEMS, BATH_ITEMS, STAIR_ITEMS } from '../constants';

interface CriticalSummaryProps {
  auditState: AuditState;
}

export const CriticalSummary: React.FC<CriticalSummaryProps> = ({ auditState }) => {
  // 1. Encontrar todos los items rojos (Score 1 o 2)
  const redItems = (Object.entries(auditState) as [string, AuditScore][]).filter(([key, val]) => val.score > 0 && val.score <= 2);

  if (redItems.length === 0) return null;

  // Helper para buscar nombres
  const findItemLabel = (key: string): string => {
      const parts = key.split('_');
      const prefix = parts[0]; // sys, liv, drm1, etc.
      const id = parts[1]; // est, elec, p, etc.

      let itemList: any[] = [];
      let roomLabel = "";

      if (prefix === 'sys') { itemList = ITEMS.sys; roomLabel = "Sistemas"; }
      else if (prefix === 'liv') { itemList = ITEMS.liv; roomLabel = "Living/Comedor"; }
      else if (prefix === 'kit') { itemList = ITEMS.kit; roomLabel = "Cocina"; }
      else if (prefix === 'ext') { itemList = ITEMS.ext; roomLabel = "Exterior"; }
      else if (prefix.startsWith('drm')) { itemList = DORM_ITEMS; roomLabel = `Dormitorio ${prefix.replace('drm','')}`; }
      else if (prefix.startsWith('bth')) { itemList = BATH_ITEMS; roomLabel = `Baño ${prefix.replace('bth','')}`; }
      else if (prefix.startsWith('stair')) { itemList = STAIR_ITEMS; roomLabel = `Escalera ${prefix.replace('stair','')}`; }
      else if (prefix.startsWith('oth')) { itemList = ITEMS.liv; roomLabel = `Otro ${prefix.replace('oth','')}`; }

      const config = itemList.find((i: any) => i.id === id);
      return `${roomLabel} - ${config ? config.l : id}`;
  };

  return (
    <div className="hidden print:block break-after-page mb-8">
      <div className="border-4 border-red-600 p-6 rounded-lg bg-white shadow-xl">
        <h1 className="text-3xl font-black text-red-600 uppercase text-center mb-2">
            🚨 RESUMEN EJECUTIVO DE CRITICIDAD
        </h1>
        <p className="text-center text-sm font-bold text-gray-600 mb-6 uppercase tracking-widest">
            Hallazgos Graves & Inversión Inmediata Requerida
        </p>

        <table className="w-full text-xs border-collapse">
            <thead>
                <tr className="bg-red-100 border-b-2 border-red-300">
                    <th className="p-2 text-left text-red-800 w-1/4">UBICACIÓN / ÍTEM</th>
                    <th className="p-2 text-center text-red-800 w-16">NOTA</th>
                    <th className="p-2 text-left text-red-800">OBSERVACIÓN TÉCNICA (GRAVE)</th>
                    <th className="p-2 text-center text-red-800 w-24">FOTO REF.</th>
                </tr>
            </thead>
            <tbody>
                {redItems.map(([key, val], idx) => (
                    <tr key={key} className="border-b border-gray-200">
                        <td className="p-2 font-bold text-gray-800 align-top uppercase">
                            {findItemLabel(key)}
                        </td>
                        <td className="p-2 text-center align-top">
                            <span className="bg-red-600 text-white font-bold px-2 py-1 rounded block">
                                {val.score}
                            </span>
                        </td>
                        <td className="p-2 text-gray-700 italic align-top text-justify">
                            {val.observation || "Sin observación registrada."}
                        </td>
                        <td className="p-2 align-top text-center">
                            {val.photos && val.photos.length > 0 ? (
                                <img src={val.photos[0]} className="w-16 h-16 object-cover border border-gray-300 rounded mx-auto" alt="Ref" />
                            ) : (
                                <span className="text-gray-400">-</span>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="mt-6 p-3 bg-gray-100 border-l-4 border-red-600 text-[10px] text-gray-600 italic leading-tight">
            <strong>NOTA IMPORTANTE:</strong> Este resumen es un extracto técnico de la auditoría PCF-15. Solo incluye ítems calificados con nota 1.0 (Crítico) o 2.0 (Malo), los cuales representan riesgos funcionales, normativos o de seguridad inminente según estándares CDT.
        </div>
      </div>
    </div>
  );
};