import React, { useRef } from 'react';
import { ToolData } from '../types.ts';

interface ToolRegistryProps {
  tools: ToolData[];
  setTools: React.Dispatch<React.SetStateAction<ToolData[]>>;
  checklistImg: string | null;
  setChecklistImg: (img: string | null) => void;
}

export const ToolRegistry: React.FC<ToolRegistryProps> = ({ tools, setTools, checklistImg, setChecklistImg }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addTool = () => {
    setTools([...tools, { id: Date.now().toString(), name: '', model: '', verified: true }]);
  };

  const updateTool = (id: string, field: keyof ToolData, value: any) => {
    setTools(tools.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const removeTool = (id: string) => {
    setTools(tools.filter(t => t.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setChecklistImg(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mb-6 animate-fade-in break-inside-avoid">
      <h3 className="text-emerald-400 font-bold text-sm mb-4 flex items-center gap-2 border-b border-slate-700 pb-2">
        🧰 TRAZABILIDAD DE INSTRUMENTAL TÉCNICO
      </h3>
      
      <div className="mb-4">
        {tools.map((tool, index) => (
          <div key={tool.id} className="flex gap-2 mb-2 items-center">
            <span className="text-slate-500 text-xs w-6">#{index + 1}</span>
            <input 
              className="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white placeholder-slate-500"
              placeholder="Nombre Equipo (Ej: Nivel Láser)"
              value={tool.name}
              onChange={(e) => updateTool(tool.id, 'name', e.target.value)}
            />
            <input 
              className="flex-1 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs text-white placeholder-slate-500"
              placeholder="Modelo (Ej: Bosch GLM50)"
              value={tool.model}
              onChange={(e) => updateTool(tool.id, 'model', e.target.value)}
            />
            <label className="flex items-center gap-1 cursor-pointer bg-slate-800 px-2 py-1 rounded border border-slate-600">
                <input 
                  type="checkbox" 
                  checked={tool.verified} 
                  onChange={(e) => updateTool(tool.id, 'verified', e.target.checked)}
                />
                <span className="text-[10px] text-emerald-400 font-bold">CALIB OK</span>
            </label>
            <button onClick={() => removeTool(tool.id)} className="text-red-500 hover:text-red-400 font-bold px-2 no-print">×</button>
          </div>
        ))}
        <button onClick={addTool} className="text-xs bg-slate-700 hover:bg-slate-600 text-emerald-400 px-3 py-1 rounded border border-slate-600 transition-colors no-print">
          + Agregar Equipo
        </button>
      </div>

      <div className="flex items-center gap-4 bg-slate-800 p-3 rounded border border-slate-600">
        <div className="flex-1">
            <h4 className="text-xs font-bold text-slate-300 uppercase mb-1">📋 Checklist Pre-Uso (Evidencia)</h4>
            <p className="text-[10px] text-slate-500">Sube foto del checklist físico de calibración firmado.</p>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
        {checklistImg ? (
            <div className="relative group">
                <img src={checklistImg} alt="Checklist" className="h-16 w-auto rounded border border-slate-500" />
                <button onClick={() => setChecklistImg(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs border border-white no-print">×</button>
            </div>
        ) : (
            <button onClick={() => fileInputRef.current?.click()} className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded font-bold transition-colors no-print">
                📷 Subir Foto Checklist
            </button>
        )}
      </div>

      {/* PRINT VIEW OF CHECKLIST */}
      {checklistImg && (
        <div className="hidden print:block mt-4 border-t border-slate-300 pt-2">
             <div className="text-[10px] font-bold text-black mb-1">ANEXO: EVIDENCIA DE CALIBRACIÓN EN TERRENO</div>
             <img src={checklistImg} className="max-h-[150px] object-contain border border-gray-300" />
        </div>
      )}
    </div>
  );
};