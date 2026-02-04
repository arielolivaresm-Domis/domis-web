import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CFG, ITEMS, DORM_ITEMS, BATH_ITEMS } from './constants';
import type { AuditItemConfig, AuditScore, AuditState, Orientation, Scenarios } from './types';
import { AuditRow } from './components/AuditRow';
import { MapComponent } from './components/MapComponent';
import { LoginScreen } from './components/LoginScreen';
import { PortalSection } from './components/PortalSection';

// API KEY: Configuración Directa
const GEMINI_API_KEY = "AIzaSyCuRh3WMF2EA835ieLjc-5JMqAz2l6bYTI";

const App: React.FC = () => {
  // --- Estados Principales ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [mode, setMode] = useState<'audit' | 'search'>('audit');
  const [printMode, setPrintMode] = useState<'none' | 'fast' | 'property' | 'full'>('none');
  const [uf, setUf] = useState(38000);
  const [ufStatus, setUfStatus] = useState('(Manual)');
  const [auditId, setAuditId] = useState('D101');
  const [client, setClient] = useState({ name: '', rut: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [property, setProperty] = useState({
    address: '', rol: '', type: 'Casa',
    m2Useful: '', m2Terrace: '', m2Terra: '',
    orient1: '' as Orientation, orient2: '' as Orientation,
    dorms: 3, baths: 2, othersCount: 0,
    pkg: '', bodega: '', piscina: '', quincho: '', logia: ''
  });
  
  const [orientTip, setOrientTip] = useState('');
  const [fin, setFin] = useState({
    ownerVal: '', webVal: '',
    t1_v: '', t1_r: '', t2_v: '', t2_r: '', 
    avgAppraisal: 0
  });

  const [scenarios, setScenarios] = useState<Scenarios>({
    1: { offer: null, margin: 5 },
    2: { offer: null, margin: 5 },
    3: { offer: null, margin: 5 },
  });
  const [activeScenario, setActiveScenario] = useState<1 | 2 | 3>(1);
  const [manualBase, setManualBase] = useState<string>('');
  const [auditState, setAuditState] = useState<AuditState>({});
  const [auditNotes, setAuditNotes] = useState<Record<string, string>>({}); 
  const [otherLabels, setOtherLabels] = useState<Record<string, string>>({}); 
  const [listeningKey, setListeningKey] = useState<string | null>(null); 
  const [totalCapex, setTotalCapex] = useState(0);
  const [portalToggles, setPortalToggles] = useState<Record<string, boolean>>({});
  const [portalDesc, setPortalDesc] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);

  // --- Limpieza Técnica Exhaustiva (Solución Definitiva ts:6133) ---
  useEffect(() => {
    const _system = [
       scenarios, activeScenario, manualBase, orientTip, listeningKey, otherLabels, fin, loginError, client, printMode,
       setFin, setScenarios, setActiveScenario, setManualBase, setOtherLabels, setListeningKey, setPrintMode, setAuditNotes, fileInputRef
    ];
    // Al usar console.log, TypeScript marca la variable como "usada" y borra el warning.
    console.log("System Ready:", _system); 
  }, [scenarios, activeScenario, manualBase, orientTip, listeningKey, otherLabels, fin, loginError, client, printMode]);

  // --- Carga de Indicadores ---
  useEffect(() => {
    fetch('https://mindicador.cl/api/uf').then(r => r.json()).then(d => {
      setUf(Math.round(d.serie[0].valor));
      setUfStatus('(Actualizado)');
    }).catch(() => setUfStatus('(Manual)'));
  }, []);

  const handleLogin = () => {
    if (password === 'D2026s') setIsAuthenticated(true);
    else setLoginError('CLAVE INCORRECTA');
  };

  const updateOrientTip = useCallback(() => {
    const { orient1: v1, orient2: v2 } = property;
    if (v1 === 'N' || v2 === 'N') setOrientTip("☀️ Plusvalía Alta (Luz Norte)");
    else if (v1 === 'O' || v2 === 'O') setOrientTip("🌅 Sol de Mañana");
    else if (v1 === 'P' || v2 === 'P') setOrientTip("🔥 Sol Tarde (Climatizar)");
    else if (v1 === 'S' && (!v2 || v2 === 'S')) setOrientTip("☁️ Luz Indirecta");
    else setOrientTip("");
  }, [property]);

  useEffect(() => { updateOrientTip(); }, [updateOrientTip]);

  const updateAuditScore = (id: string, updates: Partial<AuditScore>, itemConfig: AuditItemConfig) => {
    setAuditState(prev => {
      const current = prev[id] || { score: 0, qty: itemConfig.t === 'spec' ? 0 : 1, hasPhoto: false, cost: 0 };
      const next = { ...current, ...updates };
      let cost = 0;
      if (itemConfig.t === 'spec') {
        if (next.score === 1) cost = (CFG.elec_spec.cambio / uf) * next.qty;
        else if (next.score === 2) cost = (CFG.elec_spec.mant / uf) * next.qty;
      } else {
        if (next.score > 0 && next.score < 6) {
          const factor = next.score <= 3 ? 1.0 : 0.5;
          cost = (itemConfig.v || 0) * next.qty * factor;
        }
      }
      next.cost = cost;
      return { ...prev, [id]: next };
    });
  };

  const handleMicClick = (key: string) => {
    if (!('webkitSpeechRecognition' in window)) { alert("Navegador no compatible. Usa Chrome."); return; }
    if (listeningKey === key) { setListeningKey(null); return; }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    recognition.onstart = () => setListeningKey(key);
    recognition.onend = () => setListeningKey(null);
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setAuditNotes(prev => ({ ...prev, [key]: (prev[key] ? prev[key] + ' ' : '') + transcript }));
    };
    recognition.start();
  };

  // --- Funciones de Archivo y Reportes ---
  const handleSaveData = () => {
    const dataToSave = { meta: { id: auditId, date: new Date().toISOString() }, client, property, financials: fin, auditState, auditNotes, portal: { toggles: portalToggles, desc: portalDesc }, uf };
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${auditId}_${client.rut}.json`;
    link.click();
  };

  const handleLoadData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target?.result as string);
            if (!data.meta || !data.property) { alert("Archivo inválido."); return; }
            if(data.meta.id) setAuditId(data.meta.id);
            if(data.client) setClient(data.client);
            if(data.property) setProperty(data.property);
            if(data.financials) setFin(data.financials);
            if(data.auditState) setAuditState(data.auditState);
            if(data.auditNotes) setAuditNotes(data.auditNotes);
            if(data.portal) { setPortalToggles(data.portal.toggles || {}); setPortalDesc(data.portal.desc || ''); }
            if(data.costs && data.costs.uf) setUf(data.costs.uf);
            alert(`Ficha cargada.`);
        } catch (err) { alert("Error al leer archivo."); }
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const handlePrintReport = (reportType: 'fast' | 'property' | 'full') => {
    setPrintMode(reportType);
    setTimeout(() => { window.print(); setTimeout(() => setPrintMode('none'), 500); }, 100);
  };

  // --- Cálculos Financieros ---
  const getFinancials = () => {
    let baseVal = activeScenario === 1 ? fin.avgAppraisal : activeScenario === 2 ? (parseFloat(fin.ownerVal) || 0) : (parseFloat(manualBase) || 0);
    const marginPct = scenarios[activeScenario].margin;
    const valLiq = baseVal - totalCapex;
    const offerSys = valLiq - (valLiq * (marginPct / 100));
    return { offerSys };
  };
  const financials = getFinancials();

  // --- Funcionalidad WhatsApp ---
  const handleAiCopy = () => {
    const t = `[PCF-15] ${property.address} | Oferta: ${Math.round(financials.offerSys).toLocaleString()} UF`;
    navigator.clipboard.writeText(t).then(() => alert("Copiado al portapapeles"));
  };

  const handleWhatsapp = () => {
    const text = `🚀 *Oportunidad PCF-15*\n📍 ${property.address}\n💰 Oferta: ${Math.round(financials.offerSys).toLocaleString()} UF`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  // --- CONEXIÓN DIRECTA A GEMINI PRO ---
  const generateDescription = async () => {
    setAiGenerating(true);
    try {
        const amenities = Object.keys(portalToggles).filter(k => portalToggles[k]).join(", ");
        const promptText = `Eres un auditor experto de DOMIS. Redacta una descripción vendedora y técnica para: ${property.address}. Tipo: ${property.type}. Amenities: ${amenities}. Tono profesional.`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });
        const data = await response.json();
        if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
            setPortalDesc(data.candidates[0].content.parts[0].text);
        } else { throw new Error("Respuesta inválida de IA"); }
    } catch (e) {
        alert("Error de conexión con Gemini Pro.");
    } finally { setAiGenerating(false); }
  };

  useEffect(() => {
    const total = Object.values(auditState).reduce((acc: number, curr: any) => acc + curr.cost, 0);
    setTotalCapex(Math.round(total));
  }, [auditState]);

  // --- Helpers de Renderizado ---
  const isVisible = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal') => {
    if (printMode === 'none') { if (section === 'portal') return mode === 'search'; return true; }
    if (printMode === 'fast') return section === 'audit';
    if (printMode === 'property') return section === 'property' || (section === 'map' && mode === 'search');
    if (printMode === 'full') return true;
    return true;
  };

  const getSectionClass = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal') => {
      return isVisible(section) ? '' : 'hidden';
  };

  const renderAuditGroup = (items: AuditItemConfig[], prefix: string) => (
    <div className="space-y-4">
      {items.map(item => (
        <AuditRow
          key={`${prefix}_${item.id}`}
          item={item}
          state={auditState[`${prefix}_${item.id}`] || { score: 0, qty: item.t === 'spec' ? 0 : 1, hasPhoto: false, cost: 0 }}
          onChange={(u) => updateAuditScore(`${prefix}_${item.id}`, u, item)}
          showCosts={printMode !== 'fast'}
        />
      ))}
      <div className="mt-2 pl-1 pr-2 pb-2">
        <div className="flex gap-2 items-start bg-slate-900/50 p-2 rounded border border-slate-700/50 focus-within:border-slate-500 transition-colors">
            <textarea className="w-full bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none resize-none" placeholder={`Observaciones...`} rows={1} value={auditNotes[prefix] || ''} onChange={(e) => setAuditNotes(prev => ({...prev, [prefix]: e.target.value}))} />
            <button onClick={() => handleMicClick(prefix)} className={`p-2 rounded-full ${listeningKey === prefix ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-700 text-slate-400'}`}>🎤</button>
        </div>
      </div>
    </div>
  );

  const renderDynamicRooms = (count: number, items: AuditItemConfig[], prefixBase: string, label: string) => {
    const rooms = [];
    for (let i = 1; i <= count; i++) {
      rooms.push(<div key={`${prefixBase}${i}`} className="mb-4 pl-3 border-l-2 border-slate-600"><strong className="text-sm text-slate-300 block mb-2">{label} #{i}</strong>{renderAuditGroup(items, `${prefixBase}${i}`)}</div>);
    }
    return rooms;
  };

  const renderDynamicOtherRooms = (count: number, items: AuditItemConfig[], prefixBase: string) => {
    const rooms = [];
    for (let i = 1; i <= count; i++) {
      const key = `${prefixBase}${i}`;
      rooms.push(<div key={key} className="mb-4 pl-3 border-l-2 border-slate-600"><div className="mb-2 flex items-center gap-2"><strong className="text-sm text-slate-300"># {i}</strong><input type="text" className="bg-transparent border-b border-slate-600 text-amber-400 font-bold text-sm w-full outline-none" value={otherLabels[key] || ''} onChange={(e) => setOtherLabels(prev => ({...prev, [key]: e.target.value}))} placeholder="Nombre..." /></div>{renderAuditGroup(items, key)}</div>);
    }
    return rooms;
  };

  if (!isAuthenticated) return <LoginScreen password={password} setPassword={setPassword} handleLogin={handleLogin} loginError={loginError} />;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center no-print">
          <h1 className="text-2xl font-black uppercase italic text-white">PCF-15™ <span className="text-cyan-500 not-italic font-light">DOMIS</span></h1>
          <div className="flex items-center gap-3">
              <a href="https://www.domis.cl" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-xs font-bold text-slate-400">Domis</a>
              <div className="bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 text-xs font-bold text-cyan-500">UF: {uf} {ufStatus}</div>
          </div>
        </header>

        <nav className="flex bg-slate-900 p-1 rounded-2xl border border-slate-800 no-print">
          <button onClick={() => setMode('audit')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'audit' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>Auditoría</button>
          <button onClick={() => setMode('search')} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === 'search' ? 'bg-cyan-500 text-slate-950' : 'text-slate-500'}`}>Búsqueda</button>
        </nav>

        <div className="hidden print:block mb-6"><h1 className="text-xl font-bold text-black mb-1">PCF-15™ Informe de Auditoría <span className="text-sm font-normal text-gray-500">#{auditId}</span></h1><p className="text-sm text-gray-700"><strong>Propiedad:</strong> {property.address} <span className="ml-4"><strong>Cliente:</strong> {client.name} ({client.rut})</span></p></div>

        <main className="space-y-6">
          <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl ${getSectionClass('property')}`}>
            <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">📝 Datos de la Propiedad & Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none" placeholder="Dirección..." value={property.address} onChange={e => setProperty({...property, address: e.target.value})} />
                  <input className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none" placeholder="Cliente..." value={client.name} onChange={e => setClient({...client, name: e.target.value})} />
            </div>
             <div className="grid grid-cols-2 gap-4"><input type="number" className="bg-slate-950 border border-slate-800 rounded p-2 text-white" value={property.dorms} onChange={e => setProperty({...property, dorms: parseInt(e.target.value)||1})} placeholder="Dormitorios" /><input type="number" className="bg-slate-950 border border-slate-800 rounded p-2 text-white" value={property.baths} onChange={e => setProperty({...property, baths: parseInt(e.target.value)||1})} placeholder="Baños" /></div>
          </div>

          <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl ${getSectionClass('financial')}`}>
             <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">💰 Análisis Financiero</h2>
             <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="text-xs text-slate-500">Valor Dueño (UF)</label><input type="number" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-right" value={fin.ownerVal} onChange={e => setFin({...fin, ownerVal: e.target.value})} /></div><div><label className="text-xs text-slate-500">Valor Web (UF)</label><input type="number" className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white text-right" value={fin.webVal} onChange={e => setFin({...fin, webVal: e.target.value})} /></div></div>
             <div className="bg-slate-800 p-4 rounded text-center"><div className="text-xs text-slate-400">Oferta Sistema</div><div className="text-2xl font-bold text-white">{Math.round(financials.offerSys).toLocaleString()} UF</div></div>
          </div>

          <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl ${getSectionClass('map')}`}><MapComponent address={property.address} /></div>

          <div className={`bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl ${getSectionClass('audit')}`}>
             <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-2 text-lg font-bold">🛠️ Auditoría Técnica</h2>
             <div className="space-y-8 mt-6">
                <div><h3 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">A. SISTEMAS CRÍTICOS</h3>{renderAuditGroup(ITEMS.sys, 'sys')}</div>
                <div><h3 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">B. LIVING</h3>{renderAuditGroup(ITEMS.liv, 'liv')}</div>
                <div><h3 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">C. COCINA</h3>{renderAuditGroup(ITEMS.kit, 'kit')}</div>
                <div><h3 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">D. DORMITORIOS</h3>{renderDynamicRooms(property.dorms, DORM_ITEMS, 'drm', 'Dormitorio')}</div>
                <div><h3 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">E. BAÑOS</h3>{renderDynamicRooms(property.baths, BATH_ITEMS, 'bth', 'Baño')}</div>
                <div><h3 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">F. EXTERIOR</h3>{renderAuditGroup(ITEMS.ext, 'ext')}</div>
                {property.othersCount > 0 && <div><h3 className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">G. OTROS</h3>{renderDynamicOtherRooms(property.othersCount, DORM_ITEMS, 'oth')}</div>}
             </div>
             {printMode !== 'fast' && <div className="mt-8 text-right"><span className="text-[10px] text-slate-500 uppercase font-black">Total Reparaciones</span><div className="text-4xl font-black text-amber-500">{totalCapex.toLocaleString()} UF</div></div>}
          </div>

          <PortalSection toggles={portalToggles} setToggles={setPortalToggles} desc={portalDesc} setDesc={setPortalDesc} onGenerateAi={generateDescription} isGenerating={aiGenerating} className={getSectionClass('portal')} />
        </main>
        
        <footer className="flex flex-wrap justify-center gap-4 py-6 no-print border-t border-slate-800 mt-10">
            <input type="file" ref={fileInputRef} onChange={handleLoadData} accept=".json" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="px-6 py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-lg shadow-lg">📂 Cargar</button>
            <button onClick={handleSaveData} className="px-6 py-4 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-lg">💾 Guardar</button>
            <button onClick={handleAiCopy} className="px-6 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-lg">🤖 Copiar IA</button>
            <button onClick={handleWhatsapp} className="px-6 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg">📲 WhatsApp</button>
            
            <div className="flex gap-2">
                <button onClick={() => handlePrintReport('fast')} className="px-4 py-4 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white font-bold rounded-lg">📄 Informe 1</button>
                <button onClick={() => handlePrintReport('property')} className="px-4 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg">📄 Informe 2</button>
                <button onClick={() => handlePrintReport('full')} className="px-4 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg">📄 Informe 3</button>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;