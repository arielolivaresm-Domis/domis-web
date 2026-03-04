import React from 'react';
import { AuditState, AuditScore } from '../types.ts';
import { GRUPOS_SC_COMPLETO, GRUPOS_EXTERIOR_COMPLETO, getGruposByRecinto, GrupoCosto } from '../constants.ts';

interface WorkOrderProps {
  auditState: AuditState;
  propertyAddress: string;
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

export const WorkOrder: React.FC<WorkOrderProps> = ({ auditState, propertyAddress }) => {
  // Show active items (those requiring work)
  const workItems = (Object.entries(auditState) as [string, AuditScore][]).filter(
    ([, val]) => val.active === true
  );

  const findItemLabel = (key: string): string => {
    const parts = key.split('_');
    const itemKey = parts[parts.length - 1];
    const prefix = parts[0];

    let roomLabel = '';
    if (prefix === 'sys') roomLabel = 'Sistemas Generales';
    else if (prefix === 'liv') roomLabel = 'Living / Comedor';
    else if (prefix === 'kit') roomLabel = 'Cocina / Logia';
    else if (prefix === 'ext') roomLabel = 'Exterior';
    else if (prefix.startsWith('drm')) roomLabel = `Dormitorio ${prefix.replace('drm', '')}`;
    else if (prefix.startsWith('bth')) roomLabel = `Baño ${prefix.replace('bth', '')}`;
    else if (prefix.startsWith('stair')) roomLabel = `Escalera ${prefix.replace('stair', '')}`;
    else if (prefix.startsWith('oth')) roomLabel = `Otro Recinto ${prefix.replace('oth', '')}`;

    for (const grupo of ALL_GROUPS) {
      const found = grupo.items.find(i => i.key === itemKey);
      if (found) return `${roomLabel} > ${found.label}`;
    }
    return `${roomLabel} > ${itemKey}`;
  };

  return (
    <div className="hidden print:block min-h-screen bg-white">
      <div className="border-2 border-black p-8">
        <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-4">
            <div>
                <h1 className="text-2xl font-black uppercase tracking-wider">ORDEN DE TRABAJO (WORK ORDER)</h1>
                <p className="text-sm font-bold">Propiedad: {propertyAddress}</p>
            </div>
            <div className="text-right">
                <div className="border border-black px-4 py-2">
                    <div className="text-[10px] font-bold uppercase">Fecha Emisión</div>
                    <div className="text-sm">{new Date().toLocaleDateString()}</div>
                </div>
            </div>
        </div>

        <p className="text-xs mb-4 italic">
            Instrucciones: Ejecutar las reparaciones indicadas. Marcar la casilla "Realizado" una vez completada y verificada la tarea.
        </p>

        <table className="w-full text-xs border-collapse border border-black">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-black p-2 text-center w-12">#</th>
                    <th className="border border-black p-2 text-left w-1/3">UBICACIÓN / ÍTEM</th>
                    <th className="border border-black p-2 text-left">DETALLE TÉCNICO / INSTRUCCIÓN</th>
                    <th className="border border-black p-2 text-center w-24">REALIZADO</th>
                </tr>
            </thead>
            <tbody>
                {workItems.length > 0 ? (
                    workItems.map(([key, val], idx) => (
                        <tr key={key}>
                            <td className="border border-black p-2 text-center font-bold">{idx + 1}</td>
                            <td className="border border-black p-2 font-bold">{findItemLabel(key)}</td>
                            <td className="border border-black p-2">{val.observation}</td>
                            <td className="border border-black p-2 text-center">
                                <div className="w-6 h-6 border-2 border-black mx-auto"></div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={4} className="p-8 text-center italic text-gray-500">No hay ítems activos para esta propiedad.</td>
                    </tr>
                )}
            </tbody>
        </table>

        <div className="mt-12 flex justify-between gap-8">
            <div className="flex-1 border-t border-black pt-2 text-center text-xs font-bold">FIRMA CONTRATISTA</div>
            <div className="flex-1 border-t border-black pt-2 text-center text-xs font-bold">FIRMA SUPERVISOR</div>
        </div>
      </div>
    </div>
  );
};
