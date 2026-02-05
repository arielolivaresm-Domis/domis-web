import React, { useRef } from 'react';
import { AuditItemConfig, AuditScore } from '../types.ts';

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
  
  const handleScoreClick = (s: number) => {
    onChange({ score: s });
  };

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const currentPhotos = state.photos || [];
        const newPhotos = [...currentPhotos, base64String];
        onChange({ 
          hasPhoto: true, 
          photoCount: newPhotos.length,
          photos: newPhotos
        });
      };
      reader.readAsDataURL(file);
    }
    // Clear input so same file can be selected again if needed
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetPhotos = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Borrar fotos de este ítem?")) {
       onChange({ photoCount: 0, hasPhoto: false, photos: [] });
    }
  };

  const photoCount = state.photoCount || (state.photos?.length || 0);

  return (
    <div className="flex flex-col border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors group py-2">
      <div className="flex items-center justify-between">
        <span className="flex-1 text-sm text-slate-300 pl-1 font-medium group-hover:text-white transition-colors">{item.l}</span>
        
        {showInput && (
          <div className="mr-2">
            <input
              type="number"
              className="w-14 h-7 text-center text-xs bg-slate-700 border border-slate-600 rounded text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
              placeholder={placeholder}
              value={state.qty || ''}
              onChange={(e) => onChange({ qty: parseFloat(e.target.value) || 0 })}
            />
          </div>
        )}

        <div className="flex gap-[2px] mr-2">
          {isSpec ? (
            [1, 2, 3].map(n => (
              <button
                key={n}
                onClick={() => handleScoreClick(n)}
                className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-sm border transition-all ${
                  state.score === n
                    ? 'bg-amber-500 text-slate-900 border-amber-600 scale-105 shadow-sm'
                    : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-white'
                }`}
              >
                {n}
              </button>
            ))
          ) : (
            <>
              <button
                onClick={() => handleScoreClick(0)}
                className={`w-7 h-7 flex items-center justify-center text-[10px] font-bold rounded-sm border transition-all ${
                  state.score === 0
                    ? 'bg-slate-500 text-white border-slate-400'
                    : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600'
                }`}
              >
                N/A
              </button>
              {[1, 2, 3, 4, 5, 6, 7].map(n => {
                let activeClass = '';
                if (state.score === n) {
                  if (n <= 3) activeClass = 'bg-red-500 text-white border-red-600 shadow-red-500/20';
                  else if (n <= 5) activeClass = 'bg-amber-500 text-slate-900 border-amber-600 shadow-amber-500/20';
                  else activeClass = 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/20';
                }
                return (
                  <button
                    key={n}
                    onClick={() => handleScoreClick(n)}
                    className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-sm border transition-all ${
                      activeClass || 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600 hover:text-white'
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            </>
          )}
        </div>

        {showCosts && (
          <div className="w-20 text-right font-bold text-sm text-amber-500 mr-2 tabular-nums">
              {state.cost > 0 ? `${state.cost.toFixed(1)} UF` : '0 UF'}
          </div>
        )}

        <div className="relative w-8 h-7">
          {/* Hidden File Input */}
          <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            ref={fileInputRef} 
            className="hidden" 
            onChange={handleFileChange}
          />
          <button
            onClick={handleCameraClick}
            className={`w-full h-full flex items-center justify-center rounded border transition-colors relative ${
              photoCount > 0
                ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500'
                : 'bg-transparent text-slate-500 border-slate-600 hover:text-slate-300'
            }`}
            title="Tomar Foto"
          >
            📷
            {photoCount > 0 && (
              <span 
                onClick={handleResetPhotos}
                className="absolute -top-2 -right-2 bg-emerald-500 text-slate-900 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-slate-900 shadow-sm cursor-pointer hover:bg-red-500 hover:text-white"
                title="Borrar fotos"
              >
                  {photoCount}
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-2 pl-1 pr-2">
        <div className="flex gap-2 items-start bg-slate-900/30 p-1.5 rounded border border-slate-700/30 focus-within:border-slate-600 transition-colors">
            <textarea 
              className="w-full bg-transparent text-[11px] text-slate-300 placeholder-slate-600 outline-none resize-none overflow-hidden" 
              placeholder={`Observación ${item.l}...`} 
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
              <button 
                onClick={onMicClick} 
                className={`p-1 rounded-full transition-all text-[10px] ${isListening ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`} 
                title="Dictar nota"
              >
                🎤
              </button>
            )}
        </div>
      </div>
    </div>
  );
};