import React, { useRef, useState } from 'react';
import { AuditItemConfig, AuditScore } from '../types.ts';
import { CHILEAN_NORMS } from '../normativeData.ts';

// Ítems permitidos para marcar "Suministro Cortado" (N/A)
const ALLOWED_NA_IDS = ['elec', 'agua', 'gas', 'luc', 'ench', 'art', 'wc', 'tin'];
const MAX_PHOTOS = 10; // Límite aumentado a 10 fotos por módulo

interface AuditRowProps {
  item: AuditItemConfig;
  state: AuditScore;
  onChange: (updates: Partial<AuditScore>) => void;
  prefix: string;
  showCosts?: boolean;
  onMicClick?: () => void;
  isListening?: boolean;
}

export const AuditRow: React.FC<AuditRowProps> = ({ item, state, onChange, prefix, showCosts = true, onMicClick, isListening }) => {
  const isSpec = item.t === 'spec';
  const showInput = item.t === 'm2' || item.t === 'cnt' || isSpec;
  const placeholder = item.ph || (item.t === 'm2' ? 'm²' : 'cant');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showThumbs, setShowThumbs] = useState(true);
  const [showNormModal, setShowNormModal] = useState(false);

  // Verificar si este ítem permite N/A
  const canHaveNa = ALLOWED_NA_IDS.includes(item.id);

  // Verificar si el ítem permite calculadora de medidas (W x L)
  const showCalculator = ['techo', 'p', 'm', 'c', 'v', 'mob', 'cub', 'cl', 'fach'].includes(item.id);

  const handleScoreClick = (s: number) => {
    // Si ponemos nota, quitamos el N/A automáticamente
    onChange({ score: s, isNa: false });
  };

  const handleMeasureChange = (field: 'measureW' | 'measureL', value: string) => {
      const numVal = parseFloat(value);
      const updates: Partial<AuditScore> = { [field]: isNaN(numVal) ? undefined : numVal };

      // Calcular nueva cantidad si ambas medidas existen
      const w = field === 'measureW' ? numVal : state.measureW;
      const l = field === 'measureL' ? numVal : state.measureL;

      if (w && l) {
          updates.qty = parseFloat((w * l).toFixed(2));
      }

      onChange(updates);
  };

  const handleNaClick = () => {
    const newNa = !state.isNa;
    if (newNa) {
        // Lógica "Suministro Cortado": Anula nota y llena observación
        onChange({
            isNa: true,
            score: 0,
            observation: "No auditado por corte de suministro. Revisión solo visual."
        });
    } else {
        onChange({ isNa: false, observation: "" });
    }
  };

  const handleApplyNorm = (normId: string) => {
      const norm = CHILEAN_NORMS.find(n => n.id === normId);
      if (norm) {
          // Auto-calificar y llenar texto
          const newScore = norm.gravity === 'Grave' ? 2 : 4; // 2=Malo(Grave), 4=Regular(Leve)
          onChange({
              score: newScore,
              observation: `${norm.text} (${norm.ref})`
          });
      }
      setShowNormModal(false);
  };

  const getFilteredNorms = () => {
      // Mapeo simple de prefijos a tags normativos
      let searchTags: string[] = [];
      if (prefix.includes('sys')) searchTags = ['sys', 'elec', 'gas', 'agua'];
      else if (prefix.includes('bth')) searchTags = ['bth', 'wet', 'agua'];
      else if (prefix.includes('kit')) searchTags = ['kit', 'wet', 'gas'];
      else if (prefix.includes('stair')) searchTags = ['stair'];
      else if (prefix.includes('ext')) searchTags = ['ext', 'win'];
      else if (prefix.includes('liv') || prefix.includes('drm')) searchTags = ['liv', 'dorm', 'win', 'door', 'piso', 'elec'];

      // Añadir tag por ID de item
      if (item.id.includes('gas')) searchTags.push('gas');
      if (item.id.includes('elec') || item.id.includes('ench')) searchTags.push('elec');
      if (item.id.includes('v')) searchTags.push('win');

      // Filtrar y ordenar: Primero los que coinciden con tags, luego el resto
      return [...CHILEAN_NORMS].sort((a, b) => {
          const aMatch = a.tags.some(t => searchTags.includes(t));
          const bMatch = b.tags.some(t => searchTags.includes(t));
          if (aMatch && !bMatch) return -1;
          if (!aMatch && bMatch) return 1;
          return 0;
      });
  };

  const handleCameraClick = () => {
    if ((state.photos?.length || 0) >= MAX_PHOTOS) {
        alert(`Límite alcanzado: Máximo ${MAX_PHOTOS} fotos por ítem.`);
        return;
    }
    fileInputRef.current?.click();
  };

  const handleMicClickLocal = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert("⚠️ Tu navegador no soporta dictado por voz nativo.\n\nTe recomendamos usar Google Chrome. En iPhone (Safari) esta función está limitada por Apple.");
        return;
    }
    if (onMicClick) onMicClick();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            // Compresión de imagen usando Canvas
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1024;
            const MAX_HEIGHT = 1024;
            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, width, height);

            // Exportar a JPEG con 70% de calidad
            const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);

            const currentPhotos = state.photos || [];
            if (currentPhotos.length >= MAX_PHOTOS) return;

            const newPhotos = [...currentPhotos, compressedBase64];
            onChange({
              hasPhoto: true,
              photoCount: newPhotos.length,
              photos: newPhotos
            });
            setShowThumbs(true);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetPhotos = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Borrar todas las fotos de este ítem?")) {
       onChange({ photoCount: 0, hasPhoto: false, photos: [] });
    }
  };

  const photoCount = state.photoCount || (state.photos?.length || 0);

  // --- LÓGICA DE SEMÁFORO HÍBRIDO ---
  let statusColor = "bg-slate-700"; // Default (Sin nota)
  let statusLabel = "PENDIENTE";

  if (state.score > 0) {
      if (state.score <= 2) { statusColor = "bg-red-600"; statusLabel = "GRAVE (NO)"; }
      else if (state.score <= 5) { statusColor = "bg-amber-500"; statusLabel = "OBS (LEVE)"; }
      else { statusColor = "bg-emerald-500"; statusLabel = "OK"; }
  } else if (state.isNa) {
      statusColor = "bg-blue-600";
      statusLabel = "S. CORTADO";
  }

  return (
    <div className="flex flex-col border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors group py-2 relative pl-3 break-inside-avoid">
      {/* BARRA DE ESTADO VERTICAL (MATRIZ) */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusColor} rounded-r`}></div>

      <div className="flex items-center justify-between">

        {/* COLUMNA 1: ÍTEM Y NORMA */}
        <div className="flex-1 flex items-center gap-2 pl-1">
            <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors print:text-black print:font-bold">{item.l}</span>
            <button onClick={() => setShowNormModal(true)} className={`text-[9px] px-1.5 rounded border uppercase tracking-wider transition-colors no-print bg-slate-700 text-rose-300 border-rose-500/50 hover:bg-rose-900`} title="Declarar Infracción Normativa">
                📖 NORMA
            </button>
        </div>

        {/* INPUT DE CANTIDAD / M2 */}
        {showInput && (
          <div className="mr-2 no-print flex items-center gap-1">
            {showCalculator && (
                <div className="flex items-center gap-1 mr-2">
                    <input
                        type="number"
                        placeholder="L"
                        title="Largo (m)"
                        className="w-12 h-7 text-center text-xs bg-slate-800 border border-slate-600 rounded text-slate-300 focus:border-emerald-500 outline-none"
                        value={state.measureL || ''}
                        onChange={(e) => handleMeasureChange('measureL', e.target.value)}
                    />
                    <span className="text-slate-500 text-[10px]">x</span>
                    <input
                        type="number"
                        placeholder="A"
                        title="Ancho (m)"
                        className="w-12 h-7 text-center text-xs bg-slate-800 border border-slate-600 rounded text-slate-300 focus:border-emerald-500 outline-none"
                        value={state.measureW || ''}
                        onChange={(e) => handleMeasureChange('measureW', e.target.value)}
                    />
                    <span className="text-slate-500 text-[10px]">=</span>
                    {(state.measureL || state.measureW) && (
                        <button
                            onClick={() => { handleMeasureChange('measureL', ''); handleMeasureChange('measureW', ''); onChange({qty: 0}); }}
                            className="text-red-400 hover:text-red-300 ml-1 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-red-900/30"
                            title="Limpiar medidas"
                        >×</button>
                    )}
                </div>
            )}
            <input
              type="number"
              className="w-14 h-7 text-center text-xs bg-slate-700 border border-slate-600 rounded text-white focus:border-emerald-500 outline-none transition-all font-bold"
              placeholder={placeholder}
              value={state.qty || ''}
              onChange={(e) => onChange({ qty: parseFloat(e.target.value) || 0 })}
            />
          </div>
        )}

        {/* SELECTOR DE NOTAS (UI) */}
        <div className="flex flex-col items-center mr-2 no-print">
            <div className="flex gap-[2px]">
                {/* Botón N/A (Azul) */}
                {canHaveNa && (
                    <button
                        onClick={handleNaClick}
                        className={`w-8 h-7 flex items-center justify-center text-[10px] font-bold rounded-sm border transition-all ${
                        state.isNa
                            ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.5)] z-10'
                            : 'bg-slate-800 border-slate-600 text-blue-400 hover:bg-blue-900/30'
                        }`}
                        title="Marcar Suministro Cortado"
                    >
                        N/A
                    </button>
                )}

                {/* Notas 1-7 */}
                {isSpec ? (
                    [1, 2, 3].map(n => {
                    const isActive = state.score === n;
                    return (
                        <button key={n} onClick={() => handleScoreClick(n)} className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-sm border transition-all ${isActive ? 'bg-amber-500 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>{n}</button>
                    );
                    })
                ) : (
                    [1, 2, 3, 4, 5, 6, 7].map(n => {
                    const isActive = state.score === n;
                    let colorClass = 'bg-slate-700 border-slate-600 text-slate-400';

                    if (isActive) {
                        if (n <= 2) colorClass = 'bg-red-600 text-white border-red-500';
                        else if (n <= 5) colorClass = 'bg-amber-500 text-slate-900 border-amber-400';
                        else colorClass = 'bg-emerald-500 text-white border-emerald-400';
                    }

                    return (
                        <button key={n} onClick={() => handleScoreClick(n)} className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-sm border transition-all ${colorClass} hover:opacity-80`}>
                        {n}
                        </button>
                    );
                    })
                )}
            </div>

            {state.isNa && (
                <div className="text-[9px] text-blue-400 font-bold mt-1 bg-blue-900/30 px-1 rounded animate-pulse whitespace-nowrap">
                   ⚠️ Suministro Cortado
                </div>
            )}
        </div>

        {/* VISTA IMPRESIÓN (MATRIZ) */}
        <div className="hidden print:flex gap-2 text-xs items-start mr-0 w-[45%] justify-between">
            <div className={`font-bold border px-1.5 py-0.5 rounded text-center min-w-[24px] ${state.score <= 2 && state.score > 0 ? 'bg-red-100 text-red-700 border-red-500' : ''}`}>
                {state.score || '-'}
            </div>
            <div className="italic text-gray-700 text-[10px] leading-tight flex-1 px-2 text-justify">
                {state.isNa ? "No auditado por corte de suministro." : state.observation || ''}
            </div>
            <div className="text-[9px] text-gray-500 font-mono text-right min-w-[30px]">
                {photoCount > 0 ? `#Ref` : ''}
            </div>
            <div className="w-4 h-4 border border-black rounded-sm"></div>
        </div>

        {/* COSTOS */}
        {showCosts && (
          <div className="w-20 text-right font-bold text-sm text-amber-500 mr-2 tabular-nums no-print">
              {state.cost > 0 ? `${state.cost.toFixed(1)} UF` : '0 UF'}
          </div>
        )}

        {/* BOTÓN CÁMARA */}
        <div className="relative w-8 h-7 no-print">
          <input type="file" accept="image/*" capture="environment" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          <button onClick={handleCameraClick} className={`w-full h-full flex items-center justify-center rounded border transition-colors relative ${photoCount > 0 ? (photoCount >= MAX_PHOTOS ? 'bg-amber-500/20 text-amber-500 border-amber-500' : 'bg-emerald-500/20 text-emerald-500 border-emerald-500') : 'bg-transparent text-slate-500 border-slate-600'}`} title={`Adjuntar Fotos (${photoCount}/${MAX_PHOTOS})`}>
            📷
            {photoCount > 0 && <span onClick={handleResetPhotos} className="absolute -top-2 -right-2 bg-emerald-500 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-900 shadow-sm cursor-pointer hover:bg-red-500 hover:text-white">{photoCount}</span>}
          </button>
        </div>
      </div>

      {/* THUMBNAILS FOTOS */}
      {photoCount > 0 && showThumbs && (
        <div className="flex gap-2 mt-2 px-1 overflow-x-auto pb-2 print:flex-wrap print:overflow-visible">
            {state.photos?.map((photo, idx) => (
                <div key={idx} className="relative group shrink-0 print:border print:border-gray-300">
                    <img src={photo} alt={`Foto ${idx+1}`} className="w-16 h-16 object-cover rounded border border-slate-600 shadow-sm" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-white font-bold rounded print:bg-transparent print:text-black print:items-end print:justify-end print:p-1">
                       #{idx+1}
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* TEXTAREA OBSERVACIÓN (PANTALLA) */}
      <div className="mt-2 pl-1 pr-2 no-print">
        <div className="flex gap-2 items-start bg-slate-900/30 p-1.5 rounded border border-slate-700/30 focus-within:border-slate-600 transition-colors">
            <textarea
              className="w-full bg-transparent text-[11px] text-slate-300 placeholder-slate-600 outline-none resize-none overflow-hidden"
              placeholder={`Observación técnica ${item.l}...`}
              rows={1}
              style={{minHeight: '20px'}}
              value={state.observation || ''}
              onChange={(e) => {
                onChange({ observation: e.target.value });
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
            {onMicClick && (
              <button onClick={handleMicClickLocal} className={`p-1 rounded-full transition-all text-[10px] ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>🎤</button>
            )}
        </div>
      </div>

      {/* MODAL NORMATIVO CONTEXTUAL */}
      {showNormModal && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="bg-slate-800 rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col border border-slate-600 shadow-2xl">
                  <div className="p-4 border-b border-slate-600 flex justify-between items-center">
                      <h3 className="text-white font-bold flex items-center gap-2">🚨 INFRACCIÓN NORMATIVA: {item.l}</h3>
                      <button onClick={() => setShowNormModal(false)} className="text-slate-400 hover:text-white">✕</button>
                  </div>
                  <div className="p-2 overflow-y-auto flex-1 space-y-2">
                      {getFilteredNorms().map(norm => (
                          <button key={norm.id} onClick={() => handleApplyNorm(norm.id)} className="w-full text-left p-3 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-emerald-500 transition-colors group">
                              <div className="flex justify-between items-start mb-1">
                                  <span className="text-xs font-bold text-white group-hover:text-emerald-400">{norm.label}</span>
                                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${norm.gravity === 'Grave' ? 'bg-red-600 text-white' : 'bg-amber-500 text-black'}`}>{norm.gravity}</span>
                              </div>
                              <p className="text-[11px] text-slate-300 italic mb-1">"{norm.text}"</p>
                              <div className="text-[9px] text-slate-500 font-mono">{norm.ref}</div>
                          </button>
                      ))}
                      {getFilteredNorms().length === 0 && <div className="text-center p-4 text-slate-500 text-sm">No se encontraron normas específicas para este contexto.</div>}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
