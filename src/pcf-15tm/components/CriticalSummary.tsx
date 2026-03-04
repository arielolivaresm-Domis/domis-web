import React from 'react';
import { AuditState, AuditScore } from '../types.ts';
import { GRUPOS_SC_COMPLETO, GRUPOS_EXTERIOR_COMPLETO, getGruposByRecinto, GrupoCosto } from '../constants.ts';

interface CriticalSummaryProps {
  auditState: AuditState;
}

// All groups used to look up item labels
const ALL_GROUPS: GrupoCosto[] = [
  ...GRUPOS_SC_COMPLETO,
  ...getGruposByRecinto('living_comedor'),
  ...getGruposByRecinto('cocina'),
  ...getGruposByRecinto('dormitorio'),
  ...getGruposByRecinto('bano'),
  ...getGruposByRecinto('otro'),
  ...GRUPOS_EXTERIOR_COMPLETO,
];

const ESCALA_LABELS: Record<number, string> = { 1: 'PREMIUM', 2: 'ESTÁNDAR', 3: 'BÁSICO' };

export const CriticalSummary: React.FC<CriticalSummaryProps> = ({ auditState }) => {
  // Show all active items (those requiring intervention)
  const activeItems = (Object.entries(auditState) as [string, AuditScore][]).filter(
    ([, val]) => val.active === true
  );

  if (activeItems.length === 0) return null;

  const findItemLabel = (key: string): string => {
    const parts = key.split('_');
    const itemKey = parts[parts.length - 1];
    const prefix = parts[0];

    let roomLabel = '';
    if (prefix === 'sys') roomLabel = 'Sistemas Críticos';
    else if (prefix === 'liv') roomLabel = 'Living/Comedor';
    else if (prefix === 'kit') roomLabel = 'Cocina/Logia';
    else if (prefix === 'ext') roomLabel = 'Exterior/Fachada';
    else if (prefix.startsWith('drm')) roomLabel = `Dormitorio ${prefix.replace('drm', '')}`;
    else if (prefix.startsWith('bth')) roomLabel = `Baño ${prefix.replace('bth', '')}`;
    else if (prefix.startsWith('stair')) roomLabel = `Escalera ${prefix.replace('stair', '')}`;
    else if (prefix.startsWith('oth')) roomLabel = `Recinto ${prefix.replace('oth', '')}`;

    // Search in all groups for label by item.key
    for (const grupo of ALL_GROUPS) {
      const found = grupo.items.find(i => i.key === itemKey);
      if (found) return `${roomLabel} — ${found.label}`;
    }
    return `${roomLabel} — ${itemKey}`;
  };

  return (
    <div className="hidden print:block break-after-page mb-8">
      <div className="border-4 border-amber-500 p-6 rounded-lg bg-white">
        <h1 className="text-3xl font-black text-amber-600 uppercase text-center mb-2">
          📋 ÍTEMS CON INTERVENCIÓN REQUERIDA
        </h1>
        <p className="text-center text-sm font-bold text-gray-600 mb-6 uppercase tracking-widest">
          Presupuesto de Remodelación — Escala de Costo
        </p>

        <table className="w-full text-xs border-collapse">
          <thead>
            <tr className="bg-amber-100 border-b-2 border-amber-300">
              <th className="p-2 text-left text-amber-800 w-1/4">UBICACIÓN / ÍTEM</th>
              <th className="p-2 text-center text-amber-800 w-20">ESCALA</th>
              <th className="p-2 text-left text-amber-800">OBSERVACIÓN TÉCNICA</th>
              <th className="p-2 text-right text-amber-800 w-28">COSTO CLP</th>
              <th className="p-2 text-center text-amber-800 w-20">FOTO REF.</th>
            </tr>
          </thead>
          <tbody>
            {activeItems.map(([key, val]) => (
              <tr key={key} className="border-b border-gray-200">
                <td className="p-2 font-bold text-gray-800 align-top">
                  {findItemLabel(key)}
                </td>
                <td className="p-2 text-center align-top">
                  <span className={`font-bold px-2 py-1 rounded block text-white text-[10px] ${val.escala === 1 ? 'bg-amber-500' : val.escala === 2 ? 'bg-blue-500' : 'bg-slate-500'}`}>
                    {val.escala ? ESCALA_LABELS[val.escala] : '—'}
                  </span>
                </td>
                <td className="p-2 text-gray-700 italic align-top">
                  {val.observation || 'Sin observación registrada.'}
                </td>
                <td className="p-2 text-right align-top font-bold text-gray-800">
                  {val.costClp ? `$${val.costClp.toLocaleString('es-CL')}` : '—'}
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

        <div className="mt-6 p-3 bg-gray-100 border-l-4 border-amber-500 text-[10px] text-gray-600 italic">
          <strong>NOTA:</strong> Este resumen incluye todos los ítems activados que requieren intervención, clasificados por escala de costo (Premium / Estándar / Básico).
        </div>
      </div>
    </div>
  );
};
