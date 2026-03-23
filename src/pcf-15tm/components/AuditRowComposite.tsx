/**
 * AuditRowComposite.tsx — PCF-15™ v3
 * Ítem de auditoría simplificado para recintos (living, dormitorios, baños, cocina).
 *
 * UX:
 *  - En terreno: medidas + escala 0/1P/2E/3B + foto + notas
 *  - En oficina:  expandir "▼ Tipo" → elegir sub-ítem → costo se calcula automáticamente
 *
 * Escala 0 = buenas condiciones (fotos y notas siempre disponibles, sin costo)
 */

import React, { useRef, useState, useCallback } from 'react';
import { AuditScore } from '../types.ts';
import { Escala, getClpByEscala, ALL_ITEMS } from '../costos';
import { CompositeItemConfig, calcCompositeCostClp } from '../compositeItems';

type ClpTiers = { premium: number; estandar: number; basico: number };

/**
 * Resuelve el precio para un ítem "Otro" según el label escrito:
 *
 * 1. Valor manual entre corchetes:  "Lavamanos [$60.000]"  → usa 60.000 para los 3 niveles
 * 2. Referencia de ítem en paréntesis: "Bidet (wc)" → toma los precios del ítem 'wc'
 *
 * Retorna { clp, hint } o null si no hay nada que resolver.
 */
function resolveFromLabel(label: string): { clp: ClpTiers; hint: string } | null {
  // 1. Precio manual: [$60.000] o [$60000] — punto como separador de miles (CLP)
  const priceMatch = label.match(/\[\$?([\d.,]+)\]/);
  if (priceMatch) {
    const raw = priceMatch[1].replace(/\./g, '').replace(/,/g, '');
    const price = parseInt(raw, 10);
    if (!isNaN(price) && price > 0) {
      return { clp: { premium: price, estandar: price, basico: price }, hint: `$${price.toLocaleString('es-CL')}` };
    }
  }

  // 2. Referencia a ítem existente: (wc), (horno), (campana), etc.
  const refMatch = label.match(/\(([^)[\]]+)\)/);
  if (refMatch) {
    const search = refMatch[1].trim().toLowerCase();
    const found = ALL_ITEMS.find(item =>
      item.key.toLowerCase().includes(search) ||
      item.label.toLowerCase().includes(search)
    );
    if (found) return { clp: found.clp, hint: found.label };
  }

  return null;
}

const MAX_PHOTOS = 10;

interface Props {
  config:       CompositeItemConfig;
  state:        AuditScore;
  onChange:     (updates: Partial<AuditScore>) => void;
  prefix:       string;
  uf:           number;
  showCosts?:   boolean;
  fieldMode?:   'terreno' | 'oficina';
  onMicClick?:  () => void;
  isListening?: boolean;
}

const AuditRowComposite: React.FC<Props> = ({
  config, state, onChange, uf, showCosts = true, fieldMode = 'oficina', onMicClick, isListening,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expanded, setExpanded] = useState(false);

  const escala     = (state.escala ?? 0) as 0 | 1 | 2 | 3;
  const isActive   = escala > 0;
  const subGroups  = state.subGroups || {};
  const photoCount = state.photoCount || (state.photos?.length || 0);
  const costClp    = state.costClp || 0;

  const showCalculator = config.mainUnidad === 'm²';

  // ── Recalculate cost and persist ──────────────────────────────────────────

  const recalcAndSave = useCallback((
    extras:       Partial<AuditScore>,
    newEscala?:   0 | 1 | 2 | 3,
    newQty?:      number,
    newMeasureL?: number,
    newSG?:       typeof subGroups,
  ) => {
    const e  = newEscala   !== undefined ? newEscala   : escala;
    const q  = newQty      !== undefined ? newQty      : (state.qty      || 0);
    const ml = newMeasureL !== undefined ? newMeasureL : (state.measureL || 0);
    const sg = newSG       !== undefined ? newSG       : subGroups;
    const { costClp: c } = calcCompositeCostClp(config, { subGroups: sg, measureL: ml }, e, q, uf);
    const customList = sg['_custom']?.customList || [];
    const customTotal = customList.reduce((sum, item) => sum + (item.costClp || 0), 0);
    // Custom items REEMPLAZAN el calculado; si no hay, usa el calculado
    const calcFinal = customList.length > 0 ? customTotal : c;
    // Si el usuario cambió la escala → limpiar override y usar valor calculado
    const escalaChanged = newEscala !== undefined && newEscala !== escala;
    const override = escalaChanged ? undefined : state.costOverride;
    const finalClp = override !== undefined ? override : calcFinal;
    onChange({ ...extras, subGroups: sg, costClp: finalClp, costOverride: override, cost: uf > 0 ? finalClp / uf : 0, active: e > 0, escala: e });
  }, [escala, state.qty, state.measureL, state.costOverride, subGroups, config, uf, onChange]);

  // ── Custom items ──────────────────────────────────────────────────────────

  const handleAddCustomItem = useCallback(() => {
    const current = subGroups['_custom']?.customList || [];
    const newItem = { id: Date.now().toString(), label: '', costClp: 0 };
    const newSG = { ...subGroups, _custom: { ...subGroups['_custom'], customList: [...current, newItem] } };
    recalcAndSave({}, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  const handleCustomItemChange = useCallback((id: string, field: 'label' | 'costClp', value: string | number) => {
    const current = subGroups['_custom']?.customList || [];
    const updated = current.map(item => item.id === id ? { ...item, [field]: value } : item);
    const newSG = { ...subGroups, _custom: { ...subGroups['_custom'], customList: updated } };
    recalcAndSave({}, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  const handleRemoveCustomItem = useCallback((id: string) => {
    const current = subGroups['_custom']?.customList || [];
    const newSG = { ...subGroups, _custom: { ...subGroups['_custom'], customList: current.filter(item => item.id !== id) } };
    recalcAndSave({}, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  // ── Escala 0/1P/2E/3B ────────────────────────────────────────────────────

  const handleEscalaClick = useCallback((e: 0 | 1 | 2 | 3) => {
    recalcAndSave({}, e);
    if (e > 0) setExpanded(true); // auto-expand on first activation
  }, [recalcAndSave]);

  // ── Measurements ─────────────────────────────────────────────────────────

  const handleMeasureChange = useCallback((field: 'measureW' | 'measureL', value: string) => {
    const n   = parseFloat(value);
    const val = isNaN(n) ? undefined : n;
    const w   = field === 'measureW' ? (val || 0) : (state.measureW || 0);
    const l   = field === 'measureL' ? (val || 0) : (state.measureL || 0);
    const updates: Partial<AuditScore> = { [field]: val };
    if (w && l) {
      const qty = parseFloat((w * l).toFixed(2));
      updates.qty = qty;
      recalcAndSave(updates, undefined, qty, field === 'measureL' ? (val || 0) : (state.measureL || 0));
    } else {
      onChange(updates);
    }
  }, [state.measureW, state.measureL, recalcAndSave, onChange]);

  const handleQtyChange = useCallback((value: string) => {
    const qty = parseFloat(value) || 0;
    recalcAndSave({ qty }, undefined, qty);
  }, [recalcAndSave]);

  // ── Sub-item selection ────────────────────────────────────────────────────

  const handleGroupOnOff = useCallback((groupKey: string, active: boolean) => {
    const newSG = { ...subGroups, [groupKey]: { ...subGroups[groupKey], active } };
    recalcAndSave({}, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  const handleSelectSubItem = useCallback((groupKey: string, itemKey: string) => {
    const prev = subGroups[groupKey]?.selected;
    // toggle off if already selected
    const selected = prev === itemKey ? undefined : itemKey;
    const newSG = { ...subGroups, [groupKey]: { ...subGroups[groupKey], selected } };
    recalcAndSave({}, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  const handleToggleMultiItem = useCallback((groupKey: string, itemKey: string) => {
    const current  = subGroups[groupKey]?.selectedMulti || [];
    const newMulti = current.includes(itemKey)
      ? current.filter(k => k !== itemKey)
      : [...current, itemKey];
    const newSG = { ...subGroups, [groupKey]: { ...subGroups[groupKey], selectedMulti: newMulti } };
    recalcAndSave({}, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  const handleQtyPerItem = useCallback((groupKey: string, itemKey: string, qty: number) => {
    const gs = subGroups[groupKey] || {};
    const prevQtys = gs.selectedQtys || {};
    const newQtys = { ...prevQtys, [itemKey]: qty };
    // Keep selectedMulti in sync (items with qty > 0 are "selected")
    const newMulti = Object.entries(newQtys)
      .filter(([, q]) => q > 0)
      .map(([k]) => k);
    const newSG = { ...subGroups, [groupKey]: { ...gs, selectedQtys: newQtys, selectedMulti: newMulti } };
    recalcAndSave({}, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  const handleItemLabel = useCallback((groupKey: string, itemKey: string, label: string) => {
    const gs = subGroups[groupKey] || {};
    const resolved = resolveFromLabel(label);
    const prevOverrides = gs.priceOverrides || {};
    const newOverrides = resolved
      ? { ...prevOverrides, [itemKey]: resolved.clp }
      : (() => { const o = { ...prevOverrides }; delete o[itemKey]; return o; })();
    const newSG = {
      ...subGroups,
      [groupKey]: { ...gs, itemLabels: { ...(gs.itemLabels || {}), [itemKey]: label }, priceOverrides: newOverrides },
    };
    recalcAndSave({ subGroups: newSG }, undefined, undefined, undefined, newSG);
  }, [subGroups, recalcAndSave]);

  // ── Photos ────────────────────────────────────────────────────────────────

  const handleCameraClick = useCallback(() => {
    if ((state.photos?.length || 0) >= MAX_PHOTOS) {
      alert(`Máximo ${MAX_PHOTOS} fotos por ítem.`);
      return;
    }
    fileInputRef.current?.click();
  }, [state.photos]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = new Image();
      img.onload = () => {
        const canvas  = document.createElement('canvas');
        const MAX_DIM = 1024;
        let w = img.width, h = img.height;
        if (w > h) { if (w > MAX_DIM) { h *= MAX_DIM / w; w = MAX_DIM; } }
        else       { if (h > MAX_DIM) { w *= MAX_DIM / h; h = MAX_DIM; } }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d')?.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        const current    = state.photos || [];
        if (current.length >= MAX_PHOTOS) return;
        const newPhotos = [...current, compressed];
        onChange({ hasPhoto: true, photoCount: newPhotos.length, photos: newPhotos });
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }, [state.photos, onChange]);

  const handleResetPhotos = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Borrar todas las fotos de este ítem?')) {
      onChange({ photoCount: 0, hasPhoto: false, photos: [] });
    }
  }, [onChange]);

  // ── Mic ───────────────────────────────────────────────────────────────────

  const handleMicClick = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('⚠️ Tu navegador no soporta dictado por voz. Usa Google Chrome.');
      return;
    }
    onMicClick?.();
  }, [onMicClick]);

  // ── Style helpers ─────────────────────────────────────────────────────────

  // O=Azul(0) · N=Verde(3) · M=Amarillo(2) · U=Rojo(1)
  const escalaBtnClass = (e: 0 | 1 | 2 | 3) => {
    const sel = escala === e;
    if (e === 0) return sel ? 'bg-blue-600 text-white border-blue-400'              : 'bg-slate-800 border-slate-600 text-blue-400/60 hover:border-blue-500';
    if (e === 1) return sel ? 'bg-red-500 text-white border-red-400'                : 'bg-slate-800 border-slate-600 text-red-400/50 hover:border-red-500/50';
    if (e === 2) return sel ? 'bg-amber-400 text-slate-900 border-amber-300'        : 'bg-slate-800 border-slate-600 text-amber-400/50 hover:border-amber-400/50';
    return                   sel ? 'bg-emerald-500 text-white border-emerald-400'   : 'bg-slate-800 border-slate-600 text-emerald-400/50 hover:border-emerald-500/50';
  };

  const barColor = escala === 0 ? 'bg-blue-600/70'
                 : escala === 1 ? 'bg-red-500'
                 : escala === 2 ? 'bg-amber-400'
                 :                'bg-emerald-500';

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className={`flex flex-col border-b border-slate-700/50 py-2.5 relative pl-3 group transition-colors
      ${isActive ? 'hover:bg-slate-800/30' : 'hover:bg-emerald-950/20'}`}>

      {/* STATUS BAR */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${barColor} rounded-r`} />

      {/* ── MAIN ROW ── */}
      <div className="flex items-center gap-1.5 flex-wrap">

        {/* ESCALA 0 / 1P / 2E / 3B */}
        <div className="flex gap-[2px] no-print shrink-0">
          {([0, 1, 2, 3] as const).map(e => (
            <button
              key={e}
              onClick={() => handleEscalaClick(e)}
              className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded border transition-all ${escalaBtnClass(e)}`}
              title={e === 0 ? 'Óptimo' : e === 1 ? 'Urgente' : e === 2 ? 'Moderado' : 'Normal'}
            >
              {e === 0 ? 'O' : e === 1 ? 'U' : e === 2 ? 'M' : 'N'}
            </button>
          ))}
        </div>

        {/* LABEL */}
        <span className="text-sm font-semibold text-slate-200 flex-1 min-w-0">
          {config.label}
        </span>

        {/* L×A CALCULATOR */}
        {showCalculator && (
          <div className="flex items-center gap-1 no-print">
            <input
              type="number" placeholder="L" title="Largo (m)"
              className="w-11 h-7 text-center text-xs bg-slate-800 border border-slate-600 rounded text-slate-300 focus:border-emerald-500 outline-none"
              value={state.measureL || ''}
              onChange={e => handleMeasureChange('measureL', e.target.value)}
            />
            <span className="text-slate-500 text-[10px]">×</span>
            <input
              type="number" placeholder="A" title="Ancho (m)"
              className="w-11 h-7 text-center text-xs bg-slate-800 border border-slate-600 rounded text-slate-300 focus:border-emerald-500 outline-none"
              value={state.measureW || ''}
              onChange={e => handleMeasureChange('measureW', e.target.value)}
            />
          </div>
        )}

        {/* UNIT INPUT (para Uni / ml) — oculto si suppressMainQty */}
        {!showCalculator && !config.suppressMainQty && (
          <div className="flex items-center gap-1 no-print shrink-0">
            <input
              type="number" placeholder={config.mainUnidad}
              className="w-14 h-7 text-center text-xs bg-slate-700 border border-slate-600 rounded text-white focus:border-emerald-500 outline-none font-bold"
              value={state.qty || ''}
              onChange={e => handleQtyChange(e.target.value)}
            />
            <span className="text-slate-500 text-[9px]">{config.mainUnidad}</span>
          </div>
        )}

        {/* QTY DISPLAY (m²) — editable para ajuste manual */}
        {showCalculator && (
          <div className="flex items-center gap-0.5 no-print shrink-0">
            <input
              type="number"
              title="M² calculado (editable)"
              className="w-14 h-7 text-center text-xs bg-slate-800 border border-slate-700 rounded text-slate-400 focus:border-emerald-500 focus:text-white outline-none font-mono"
              value={state.qty || ''}
              placeholder="m²"
              onChange={e => handleQtyChange(e.target.value)}
            />
            <span className="text-slate-600 text-[9px]">m²</span>
          </div>
        )}

        {/* COST — editable */}
        {showCosts && isActive && (
          <div className="text-right shrink-0 no-print">
            <div className="flex items-center gap-0.5 justify-end">
              <span className="text-amber-400 font-bold text-[10px]">$</span>
              <input
                type="number"
                title="Valor referencial (editable)"
                className={`w-24 text-right text-xs font-bold tabular-nums bg-transparent border-b outline-none transition-colors ${
                  state.costOverride !== undefined
                    ? 'text-amber-300 border-amber-500'
                    : 'text-amber-400 border-transparent hover:border-amber-500/40 focus:border-amber-400'
                }`}
                value={costClp || ''}
                placeholder="0"
                onChange={e => {
                  const val = parseInt(e.target.value) || 0;
                  onChange({ costClp: val, costOverride: val, cost: uf > 0 ? val / uf : 0 });
                }}
              />
              {state.costOverride !== undefined && (
                <button
                  title="Restaurar valor calculado"
                  className="text-slate-500 hover:text-amber-400 text-[10px] ml-0.5"
                  onClick={() => onChange({ costOverride: undefined })}
                >↺</button>
              )}
            </div>
            <div className="text-slate-500 text-[9px] tabular-nums">
              {uf > 0 ? (costClp / uf).toFixed(1) : '0'} UF
            </div>
          </div>
        )}

        {/* EXPAND SUB-ITEMS — solo en modo oficina */}
        {fieldMode === 'oficina' && (
          <button
            onClick={() => setExpanded(v => !v)}
            className={`text-[10px] px-2 h-7 rounded border transition-colors no-print shrink-0 ${
              isActive
                ? 'bg-slate-800 border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white'
                : 'bg-slate-900 border-slate-700 text-slate-600 hover:border-slate-600 hover:text-slate-400'
            }`}
            title={isActive ? 'Ver sub-ítems' : 'Expandir (selecciona N/M/U primero)'}
          >
            {expanded ? '▲ Tipo' : '▼ Tipo'}
          </button>
        )}

        {/* CAMERA */}
        <div className="relative w-8 h-7 no-print shrink-0">
          <input
            type="file" accept="image/*" capture="environment"
            ref={fileInputRef} className="hidden" onChange={handleFileChange}
          />
          <button
            onClick={handleCameraClick}
            className={`w-full h-full flex items-center justify-center rounded border transition-colors relative ${
              photoCount > 0
                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500'
                : 'bg-transparent text-slate-500 border-slate-600 hover:border-slate-400'
            }`}
            title={`Fotos (${photoCount}/${MAX_PHOTOS})`}
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

      {/* BUENAS CONDICIONES badge */}
      {!isActive && (
        <div className="mt-0.5 ml-1 no-print">
          <span className="text-[9px] text-blue-500 font-medium">● Óptimo</span>
        </div>
      )}

      {/* ── SUB-ITEMS PANEL — solo en modo oficina ── */}
      {expanded && fieldMode === 'oficina' && (
        <div className={`mt-2 ml-1 rounded-lg border p-3 space-y-3 no-print ${
          isActive
            ? 'bg-slate-900/70 border-slate-700'
            : 'bg-slate-900/30 border-slate-800 opacity-60 pointer-events-none'
        }`}>
          {!isActive && (
            <p className="text-[10px] text-slate-500 italic">
              Selecciona N / M / U para activar sub-ítems.
            </p>
          )}
          {/* ── ÍTEMS ADICIONALES (custom) ── */}
          {isActive && (() => {
            const customList = subGroups['_custom']?.customList || [];
            return (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Ítems Adicionales</span>
                  <button
                    onClick={handleAddCustomItem}
                    className="text-[10px] px-2 py-0.5 rounded border bg-slate-700 border-slate-500 text-slate-300 hover:bg-emerald-900/40 hover:border-emerald-500 hover:text-emerald-300 transition-colors"
                  >➕ Agregar</button>
                </div>
                {customList.length > 0 && (
                  <div className="space-y-1.5 mb-2">
                    {customList.map(item => (
                      <div key={item.id} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Nombre del ítem"
                          className="flex-1 text-[11px] bg-slate-800 border border-slate-600 rounded px-2 py-1 text-white outline-none focus:border-amber-400"
                          value={item.label}
                          onChange={e => handleCustomItemChange(item.id, 'label', e.target.value)}
                        />
                        <input
                          type="number"
                          placeholder="CLP"
                          className="w-24 text-[11px] bg-slate-800 border border-slate-600 rounded px-2 py-1 text-amber-300 text-right outline-none focus:border-amber-400 font-mono"
                          value={item.costClp || ''}
                          onChange={e => handleCustomItemChange(item.id, 'costClp', parseInt(e.target.value) || 0)}
                        />
                        <span className="text-slate-600 text-[9px] shrink-0">CLP</span>
                        <button
                          onClick={() => handleRemoveCustomItem(item.id)}
                          className="text-red-500 hover:text-red-300 text-[11px] font-bold px-1"
                          title="Eliminar"
                        >✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()}

          {isActive && config.groups.map(group => {
            const gs          = subGroups[group.key] || {};
            const groupActive = !group.hasOnOff || gs.active;

            return (
              <div key={group.key}>
                {/* Group header */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                    {group.label}
                  </span>
                  {group.hasOnOff && (
                    <div className="flex gap-1 ml-auto">
                      <button
                        onClick={() => handleGroupOnOff(group.key, true)}
                        className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${
                          gs.active
                            ? 'bg-amber-500 text-slate-900 border-amber-400'
                            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-amber-500/50'
                        }`}
                      >ON</button>
                      <button
                        onClick={() => handleGroupOnOff(group.key, false)}
                        className={`text-[9px] px-2 py-0.5 rounded border transition-colors ${
                          !gs.active
                            ? 'bg-slate-600 text-white border-slate-400'
                            : 'bg-slate-800 border-slate-600 text-slate-400 hover:border-slate-400'
                        }`}
                      >OFF</button>
                    </div>
                  )}
                </div>

                {/* Sub-item list (qty per item) */}
                {groupActive && group.hasQtyPerItem && (
                  <div className="space-y-1">
                    {group.items.map(item => {
                      const qty = gs.selectedQtys?.[item.key] || 0;
                      const isSelected = qty > 0;
                      const isOtro = item.key.startsWith('otro_');
                      const customLabel = gs.itemLabels?.[item.key];
                      const displayLabel = customLabel || item.shortLabel;
                      const resolvedHint = gs.priceOverrides?.[item.key]
                        ? resolveFromLabel(customLabel || '')?.hint
                        : null;
                      return (
                        <div key={item.key} className="flex items-center gap-2">
                          {isOtro ? (
                            <div className="flex-1 flex flex-col min-w-0">
                              <input
                                type="text"
                                placeholder={`${item.shortLabel} — ej: Bidet (wc) o [$60.000]`}
                                className={`text-[11px] flex-1 min-w-0 bg-transparent border-b outline-none transition-colors ${
                                  isSelected
                                    ? 'text-white border-emerald-500/50 placeholder-emerald-800'
                                    : 'text-slate-400 border-slate-700 placeholder-slate-600'
                                } focus:border-amber-400 focus:text-amber-200`}
                                value={customLabel || ''}
                                onChange={e => handleItemLabel(group.key, item.key, e.target.value)}
                              />
                              {resolvedHint && (
                                <span className="text-[9px] text-amber-400 font-medium mt-0.5 truncate" title="Precio resuelto">
                                  ✓ {resolvedHint}
                                </span>
                              )}
                            </div>
                          ) : (
                            <span className={`text-[11px] flex-1 ${isSelected ? 'text-white font-medium' : 'text-slate-400'}`}>
                              {displayLabel}
                            </span>
                          )}
                          <input
                            type="number"
                            min="0"
                            placeholder="0"
                            className={`w-14 h-7 text-center text-xs rounded border outline-none transition-colors ${
                              isSelected
                                ? 'bg-emerald-900/50 border-emerald-500 text-white font-bold'
                                : 'bg-slate-800 border-slate-600 text-slate-300 focus:border-slate-400'
                            }`}
                            value={qty || ''}
                            onChange={e => handleQtyPerItem(group.key, item.key, parseInt(e.target.value) || 0)}
                          />
                          <span className="text-slate-500 text-[9px] w-5 shrink-0">Uni</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Sub-item pills (regular multi-select y single-select) */}
                {groupActive && !group.hasQtyPerItem && (
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map(item => {
                      const isSelected = group.multiSelect
                        ? (gs.selectedMulti || []).includes(item.key)
                        : gs.selected === item.key;

                      // show unit hint for non-m² items
                      const unitHint = item.unidad !== 'm²' ? ` (${item.unidad})` : '';

                      return (
                        <button
                          key={item.key}
                          onClick={() => group.multiSelect
                            ? handleToggleMultiItem(group.key, item.key)
                            : handleSelectSubItem(group.key, item.key)
                          }
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-all ${
                            isSelected
                              ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-sm'
                              : 'bg-slate-800 border-slate-600 text-slate-300 hover:border-emerald-500/50 hover:text-white'
                          }`}
                          title={`${item.shortLabel}${unitHint}`}
                        >
                          {item.shortLabel}{unitHint}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── PHOTOS ── */}
      {photoCount > 0 && (
        <div className="flex gap-2 mt-2 px-1 overflow-x-auto pb-1">
          {state.photos?.map((photo, idx) => (
            <div key={idx} className="relative shrink-0">
              <img
                src={photo} alt={`Foto ${idx + 1}`}
                className="w-16 h-16 object-cover rounded border border-slate-600 shadow-sm"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-xs text-white font-bold rounded">
                #{idx + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── OBSERVATION ── */}
      <div className="mt-2 pl-1 pr-2 no-print">
        <div className="flex gap-2 items-start bg-slate-900/30 p-1.5 rounded border border-slate-700/30 focus-within:border-slate-600 transition-colors">
          <textarea
            className="w-full bg-transparent text-[11px] text-slate-300 placeholder-slate-600 outline-none resize-none overflow-hidden"
            placeholder={`Observación ${config.label}${!isActive ? ' — buenas condiciones, documenta igualmente' : ''}...`}
            rows={1}
            style={{ minHeight: '20px' }}
            value={state.observation || ''}
            onChange={e => {
              onChange({ observation: e.target.value });
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          {onMicClick && (
            <button
              onClick={handleMicClick}
              className={`p-1 rounded-full text-[10px] transition-all ${
                isListening
                  ? 'bg-red-500/20 text-red-500 animate-pulse'
                  : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
              }`}
            >🎤</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuditRowComposite;
