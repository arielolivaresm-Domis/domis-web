import React, { useRef, useState, useCallback } from 'react';
import { AuditScore } from '../types.ts';
import { ItemCosto, Escala, getClpByEscala } from '../costos';
import { CHILEAN_NORMS } from '../normativeData.ts';

const MAX_PHOTOS = 10;

// Ítems que permiten marcar "Suministro Cortado" (N/A)
const NA_KEYS = new Set([
  'elec', 'agua', 'gas',
  'tablero_electrico', 'inst_electrica_completa', 'cambio_cableado',
  'punto_electrico', 'calefon_gas', 'calefon_electrico',
  'wc', 'vanitorio_lavamanos', 'receptaculo_ducha',
]);

interface AuditRowProps {
  item: ItemCosto & { norm?: string };
  state: AuditScore;
  onChange: (updates: Partial<AuditScore>) => void;
  prefix: string;
  uf: number;
  showCosts?: boolean;
  onMicClick?: () => void;
  isListening?: boolean;
}

const AuditRowInner: React.FC<AuditRowProps> = ({
  item, state, onChange, prefix, uf, showCosts = true, onMicClick, isListening
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showThumbs, setShowThumbs] = useState(true);
  const [showNormModal, setShowNormModal] = useState(false);

  const active = state.active ?? false;
  const escala = (state.escala ?? 0) as 0 | Escala;
  const canHaveNa = NA_KEYS.has(item.key);
  const showCalculator = item.unidad === 'm²';

  // ---- handlers ----

  const handleToggle = useCallback(() => {
    const newActive = !active;
    const updates: Partial<AuditScore> = { active: newActive };
    if (newActive && !state.escala) {
      updates.escala = 2;
    }
    const newEscala = (updates.escala ?? (state.escala as Escala) ?? 2) as Escala;
    const qty = state.qty || 0;
    const costClp = newActive && newEscala > 0 && qty > 0
      ? qty * getClpByEscala(item, newEscala)
      : 0;
    updates.costClp = costClp;
    updates.cost = costClp / uf;
    onChange(updates);
  }, [active, state.escala, state.qty, item, uf, onChange]);

  const handleEscalaClick = useCallback((e: Escala) => {
    const qty = state.qty || 0;
    const costClp = qty > 0 ? qty * getClpByEscala(item, e) : 0;
    onChange({ active: true, escala: e, costClp, cost: costClp / uf });
  }, [state.qty, item, uf, onChange]);

  const handleQtyChange = useCallback((val: number) => {
    const e = (escala > 0 ? escala : 2) as Escala;
    const costClp = active && val > 0 ? val * getClpByEscala(item, e) : 0;
    onChange({ qty: val, costClp, cost: costClp / uf });
  }, [escala, active, item, uf, onChange]);

  const handleMeasureChange = useCallback((field: 'measureW' | 'measureL', value: string) => {
    const numVal = parseFloat(value);
    const updates: Partial<AuditScore> = { [field]: isNaN(numVal) ? undefined : numVal };
    const w = field === 'measureW' ? numVal : state.measureW;
    const l = field === 'measureL' ? numVal : state.measureL;
    if (w && l) {
      const qty = parseFloat((w * l).toFixed(2));
      const e = (escala > 0 ? escala : 2) as Escala;
      const costClp = active && qty > 0 ? qty * getClpByEscala(item, e) : 0;
      updates.qty = qty;
      updates.costClp = costClp;
      updates.cost = costClp / uf;
    }
    onChange(updates);
  }, [state.measureW, state.measureL, escala, active, item, uf, onChange]);

  const handleNaClick = useCallback(() => {
    const newNa = !state.isNa;
    if (newNa) {
      onChange({ isNa: true, active: false, costClp: 0, cost: 0,
        observation: 'No auditado por corte de suministro. Revisión solo visual.' });
    } else {
      onChange({ isNa: false, observation: '' });
    }
  }, [state.isNa, onChange]);

  const handleApplyNorm = useCallback((normId: string) => {
    const norm = CHILEAN_NORMS.find(n => n.id === normId);
    if (norm) {
      onChange({
        active: true,
        escala: norm.gravity === 'Grave' ? 1 : 2,
        observation: `${norm.text} (${norm.ref})`
      });
    }
    setShowNormModal(false);
  }, [item, onChange]);

  const getFilteredNorms = useCallback(() => {
    let searchTags: string[] = [];
    if (prefix.includes('sys')) searchTags = ['sys', 'elec', 'gas', 'agua'];
    else if (prefix.includes('bth')) searchTags = ['bth', 'wet', 'agua'];
    else if (prefix.includes('kit')) searchTags = ['kit', 'wet', 'gas'];
    else if (prefix.includes('stair')) searchTags = ['stair'];
    else if (prefix.includes('ext')) searchTags = ['ext', 'win'];
    else if (prefix.includes('liv') || prefix.includes('drm')) searchTags = ['liv', 'dorm', 'win', 'door', 'piso', 'elec'];

    return [...CHILEAN_NORMS].sort((a, b) => {
      const aMatch = a.tags.some(t => searchTags.includes(t));
      const bMatch = b.tags.some(t => searchTags.includes(t));
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [prefix]);

  const handleCameraClick = useCallback(() => {
    if ((state.photos?.length || 0) >= MAX_PHOTOS) {
      alert(`Límite alcanzado: Máximo ${MAX_PHOTOS} fotos por ítem.`);
      return;
    }
    fileInputRef.current?.click();
  }, [state.photos]);

  const handleMicClickLocal = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('⚠️ Tu navegador no soporta dictado por voz nativo.\n\nTe recomendamos usar Google Chrome.');
      return;
    }
    if (onMicClick) onMicClick();
  }, [onMicClick]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_DIM = 1024;
          let w = img.width, h = img.height;
          if (w > h) { if (w > MAX_DIM) { h *= MAX_DIM / w; w = MAX_DIM; } }
          else       { if (h > MAX_DIM) { w *= MAX_DIM / h; h = MAX_DIM; } }
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL('image/jpeg', 0.7);
          const current = state.photos || [];
          if (current.length >= MAX_PHOTOS) return;
          const newPhotos = [...current, compressed];
          onChange({ hasPhoto: true, photoCount: newPhotos.length, photos: newPhotos });
          setShowThumbs(true);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [state.photos, onChange]);

  const handleResetPhotos = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Borrar todas las fotos de este ítem?')) {
      onChange({ photoCount: 0, hasPhoto: false, photos: [] });
    }
  }, [onChange]);

  const photoCount = state.photoCount || (state.photos?.length || 0);
  const costClp = state.costClp || 0;

  // Semáforo
  let barColor = 'bg-slate-700';
  if (state.isNa) barColor = 'bg-slate-500';
  else if (active && escala === 1) barColor = 'bg-red-500';
  else if (active && escala === 2) barColor = 'bg-amber-400';
  else if (active && escala === 3) barColor = 'bg-emerald-500';
  else if (!active) barColor = 'bg-blue-600/70';

  // Escala label para impresión
  const escalaLabel = escala === 1 ? 'URGENTE' : escala === 2 ? 'MODERADO' : escala === 3 ? 'NORMAL' : 'ÓPTIMO';

  return (
    <div className={`flex flex-col border-b border-slate-700/50 transition-colors group py-2 relative pl-3 break-inside-avoid
      ${active ? 'hover:bg-slate-800/30' : 'opacity-50'}`}>

      {/* BARRA DE ESTADO VERTICAL */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${barColor} rounded-r`}></div>

      <div className="flex items-center justify-between gap-1 flex-wrap">

        {/* BOTÓN O — Óptimo (toggle on/off) */}
        <button
          onClick={handleToggle}
          className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded border transition-all no-print shrink-0 ${
            !active
              ? 'bg-blue-600 text-white border-blue-400'
              : 'bg-slate-800 border-slate-600 text-blue-400/50 hover:border-blue-500'
          }`}
          title={active ? 'Marcar como Óptimo' : 'Óptimo'}
        >O</button>

        {/* LABEL + CÓDIGO + NORMA */}
        <div className="flex-1 flex items-center gap-1 min-w-0">
          <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors print:text-black print:font-bold truncate">
            {item.label}
          </span>
          <span className="text-[8px] text-slate-600 font-mono shrink-0">{item.cod}</span>
          <button
            onClick={() => setShowNormModal(true)}
            className="text-[9px] px-1 rounded border bg-slate-700 text-rose-300 border-rose-500/50 hover:bg-rose-900 transition-colors no-print shrink-0"
            title="Declarar Infracción Normativa"
          >📖</button>
        </div>

        {/* CALCULADORA L×A (solo m²) */}
        {showCalculator && (
          <div className="flex items-center gap-1 no-print">
            <input type="number" placeholder="L" title="Largo (m)"
              className="w-11 h-7 text-center text-xs bg-slate-800 border border-slate-600 rounded text-slate-300 focus:border-emerald-500 outline-none"
              value={state.measureL || ''}
              onChange={(e) => handleMeasureChange('measureL', e.target.value)}
            />
            <span className="text-slate-500 text-[10px]">×</span>
            <input type="number" placeholder="A" title="Ancho (m)"
              className="w-11 h-7 text-center text-xs bg-slate-800 border border-slate-600 rounded text-slate-300 focus:border-emerald-500 outline-none"
              value={state.measureW || ''}
              onChange={(e) => handleMeasureChange('measureW', e.target.value)}
            />
            {(state.measureL || state.measureW) && (
              <button
                onClick={() => { handleMeasureChange('measureL', ''); handleMeasureChange('measureW', ''); onChange({ qty: 0 }); }}
                className="text-red-400 text-xs font-bold w-4 h-4 flex items-center justify-center rounded-full bg-red-900/30 hover:bg-red-700"
              >×</button>
            )}
          </div>
        )}

        {/* INPUT MEDIDA */}
        <div className="flex items-center gap-1 no-print shrink-0">
          <input
            type="number"
            className="w-16 h-7 text-center text-xs bg-slate-700 border border-slate-600 rounded text-white focus:border-emerald-500 outline-none font-bold"
            placeholder={item.unidad || 'cant'}
            value={state.qty || ''}
            onChange={(e) => handleQtyChange(parseFloat(e.target.value) || 0)}
          />
          <span className="text-slate-500 text-[9px] shrink-0">{item.unidad}</span>
        </div>

        {/* N/A */}
        {canHaveNa && (
          <button
            onClick={handleNaClick}
            className={`w-8 h-7 flex items-center justify-center text-[10px] font-bold rounded border transition-all no-print shrink-0 ${
              state.isNa
                ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                : 'bg-slate-800 border-slate-600 text-blue-400 hover:bg-blue-900/30'
            }`}
            title="Suministro Cortado"
          >N/A</button>
        )}

        {/* ESCALA U / M / N — U=Rojo(1) · M=Amarillo(2) · N=Verde(3) */}
        <div className="flex gap-[2px] no-print shrink-0">
          {([1, 2, 3] as Escala[]).map(e => {
            const isActiveScale = escala === e;
            const colorMap: Record<number, string> = {
              1: isActiveScale ? 'bg-red-500 text-white border-red-400'               : 'bg-slate-800 border-slate-600 text-red-400/50 hover:border-red-500/50',
              2: isActiveScale ? 'bg-amber-400 text-slate-900 border-amber-300'       : 'bg-slate-800 border-slate-600 text-amber-400/50 hover:border-amber-400/50',
              3: isActiveScale ? 'bg-emerald-500 text-white border-emerald-400'       : 'bg-slate-800 border-slate-600 text-emerald-400/50 hover:border-emerald-500/50',
            };
            const label = e === 1 ? 'U' : e === 2 ? 'M' : 'N';
            return (
              <button
                key={e}
                onClick={() => handleEscalaClick(e)}
                className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded border transition-all hover:opacity-90
                  ${colorMap[e]}`}
                title={e === 1 ? 'Urgente' : e === 2 ? 'Moderado' : 'Normal'}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* COSTO CLP */}
        {showCosts && costClp > 0 && (
          <div className="w-28 text-right shrink-0 no-print">
            <div className="text-amber-400 font-bold text-xs tabular-nums">
              ${costClp.toLocaleString('es-CL')}
            </div>
            <div className="text-slate-500 text-[9px] tabular-nums">
              {(costClp / uf).toFixed(1)} UF
            </div>
          </div>
        )}

        {/* VISTA IMPRESIÓN */}
        <div className="hidden print:flex gap-2 text-xs items-start w-[45%] justify-between">
          <div className={`font-bold border px-1.5 py-0.5 rounded text-center min-w-[52px] text-[9px]
            ${active ? 'bg-amber-100 text-amber-800 border-amber-400' : 'bg-gray-100 text-gray-400 border-gray-300'}`}>
            {active ? escalaLabel : 'OFF'}
          </div>
          <div className="italic text-gray-700 text-[10px] leading-tight flex-1 px-2 text-justify">
            {state.isNa ? 'No auditado por corte de suministro.' : state.observation || ''}
          </div>
          <div className="text-[9px] text-gray-500 font-mono text-right min-w-[30px]">
            {photoCount > 0 ? '#Ref' : ''}
          </div>
          <div className="w-4 h-4 border border-black rounded-sm"></div>
        </div>

        {/* BOTÓN CÁMARA */}
        <div className="relative w-8 h-7 no-print shrink-0">
          <input type="file" accept="image/*" capture="environment"
            ref={fileInputRef} className="hidden" onChange={handleFileChange} />
          <button
            onClick={handleCameraClick}
            className={`w-full h-full flex items-center justify-center rounded border transition-colors relative ${
              photoCount > 0
                ? (photoCount >= MAX_PHOTOS
                    ? 'bg-amber-500/20 text-amber-500 border-amber-500'
                    : 'bg-emerald-500/20 text-emerald-500 border-emerald-500')
                : 'bg-transparent text-slate-500 border-slate-600'
            }`}
            title={`Adjuntar Fotos (${photoCount}/${MAX_PHOTOS})`}
          >
            📷
            {photoCount > 0 && (
              <span
                onClick={handleResetPhotos}
                className="absolute -top-2 -right-2 bg-emerald-500 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-900 shadow-sm cursor-pointer hover:bg-red-500 hover:text-white"
              >{photoCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* THUMBNAILS */}
      {photoCount > 0 && showThumbs && (
        <div className="flex gap-2 mt-2 px-1 overflow-x-auto pb-2 print:flex-wrap print:overflow-visible">
          {state.photos?.map((photo, idx) => (
            <div key={idx} className="relative shrink-0 print:border print:border-gray-300">
              <img src={photo} alt={`Foto ${idx + 1}`}
                className="w-16 h-16 object-cover rounded border border-slate-600 shadow-sm" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-white font-bold rounded print:bg-transparent">
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* OBSERVACIÓN */}
      <div className="mt-2 pl-1 pr-2 no-print">
        <div className="flex gap-2 items-start bg-slate-900/30 p-1.5 rounded border border-slate-700/30 focus-within:border-slate-600 transition-colors">
          <textarea
            className="w-full bg-transparent text-[11px] text-slate-300 placeholder-slate-600 outline-none resize-none overflow-hidden"
            placeholder={`Observación técnica ${item.label}...`}
            rows={1}
            style={{ minHeight: '20px' }}
            value={state.observation || ''}
            onChange={(e) => {
              onChange({ observation: e.target.value });
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          {onMicClick && (
            <button
              onClick={handleMicClickLocal}
              className={`p-1 rounded-full transition-all text-[10px] ${
                isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >🎤</button>
          )}
        </div>
      </div>

      {/* MODAL NORMATIVO */}
      {showNormModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg max-w-lg w-full max-h-[80vh] flex flex-col border border-slate-600 shadow-2xl">
            <div className="p-4 border-b border-slate-600 flex justify-between items-center">
              <h3 className="text-white font-bold">🚨 INFRACCIÓN NORMATIVA: {item.label}</h3>
              <button onClick={() => setShowNormModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <div className="p-2 overflow-y-auto flex-1 space-y-2">
              {getFilteredNorms().map(norm => (
                <button key={norm.id} onClick={() => handleApplyNorm(norm.id)}
                  className="w-full text-left p-3 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 hover:border-emerald-500 transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400">{norm.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${norm.gravity === 'Grave' ? 'bg-red-600 text-white' : 'bg-amber-500 text-black'}`}>
                      {norm.gravity}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 italic mb-1">"{norm.text}"</p>
                  <div className="text-[9px] text-slate-500 font-mono">{norm.ref}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const AuditRow = React.memo(AuditRowInner);
