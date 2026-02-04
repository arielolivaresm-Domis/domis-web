import React from 'react';
// Rectificación técnica para cumplimiento de reglas de TypeScript
import type { AuditItemConfig, AuditScore } from '../types';

interface AuditRowProps {
  item: AuditItemConfig;
  state: AuditScore;
  onChange: (updates: Partial<AuditScore>) => void;
  showCosts?: boolean;
}

export const AuditRow: React.FC<AuditRowProps> = ({ item, state, onChange, showCosts = true }) => {
  const isSpec = item.t === 'spec';
  const showInput = item.t === 'm2' || item.t === 'cnt' || isSpec;
  const placeholder = item.ph || (item.t === 'm2' ? 'm²' : 'cant');

  const handleScoreClick = (s: number) => {
    onChange({ score: s });
  };

  const handlePhotoClick = () => {
    // Registro de evidencia fotográfica para el informe final
    onChange({ hasPhoto: true });
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors">
      <span className="flex-1 text-sm text-slate-300 pl-1">{item.l}</span>
      
      {showInput && (
        <div className="mr-2">
          <input
            type="number"
            className="w-14 h-7 text-center text-xs bg-slate-700 border border-slate-600 rounded text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
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
              className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-sm border transition-colors ${
                state.score === n
                  ? 'bg-amber-500 text-slate-900 border-amber-600'
                  : 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600'
              }`}
            >
              {n}
            </button>
          ))
        ) : (
          <>
             <button
              onClick={() => handleScoreClick(0)}
              className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-sm border transition-colors ${
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
                if (n <= 3) activeClass = 'bg-red-500 text-white border-red-600';
                else if (n <= 5) activeClass = 'bg-amber-500 text-slate-900 border-amber-600';
                else activeClass = 'bg-cyan-500 text-slate-900 border-cyan-600';
              }
              return (
                <button
                  key={n}
                  onClick={() => handleScoreClick(n)}
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-sm border transition-colors ${
                    activeClass || 'bg-slate-700 border-slate-600 text-slate-400 hover:bg-slate-600'
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
        <div className="w-20 text-right font-bold text-sm text-amber-500 mr-2">
            {state.cost > 0 ? `${state.cost.toFixed(1)} UF` : '0 UF'}
        </div>
      )}

      <div className="relative w-8 h-7">
        <button
          onClick={handlePhotoClick}
          className={`w-full h-full flex items-center justify-center rounded border transition-colors ${
            state.hasPhoto
              ? 'bg-cyan-500/20 text-cyan-500 border-cyan-500'
              : 'bg-transparent text-slate-500 border-slate-600 hover:text-slate-300'
          }`}
        >
          📷
        </button>
      </div>
    </div>
  );
};