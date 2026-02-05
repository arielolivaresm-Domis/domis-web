import React, { useState, useEffect, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import { CFG, ITEMS, DORM_ITEMS, BATH_ITEMS, STAIR_ITEMS, DOMIS_SYSTEM_PROMPT } from './constants.ts';
import { AuditItemConfig, AuditScore, AuditState, Orientation, Scenarios } from './types.ts';
import { AuditRow } from './components/AuditRow.tsx';
import { MapComponent } from './components/MapComponent.tsx';
import { LoginScreen } from './components/LoginScreen.tsx';
import { PortalSection } from './components/PortalSection.tsx';

/**
 * PCF-15™ Master Configuration
 * Version: 4.1 (React 19 + GenAI 1.37.0)
 * Status: Production Ready
 */

// SAFETY: Polyfill para el entorno del navegador y API de Gemini
const process = (window as any).process || { env: { API_KEY: 'AIzaSyDoaVm8Z-3qIrVg08sa0_HYctbdwwAdDnQ' } };

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [mode, setMode] = useState<'audit' | 'search'>('audit');
  const [printMode, setPrintMode] = useState<'none' | 'fast' | 'normal' | 'full'>('none');
  const [uf, setUf] = useState(38000);
  const [ufStatus, setUfStatus] = useState('(Manual)');
  const [auditId, setAuditId] = useState('D101');
  const [verificationHash, setVerificationHash] = useState('');
  const [client, setClient] = useState({ name: '', rut: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // v4.1 Estado de la Propiedad con tipado estricto
  const [property, setProperty] = useState({
    address: '', rol: '', type: 'Casa', m2Useful: '', m2Terrace: '', m2Terra: '',
    orient1: '' as Orientation, orient2: '' as Orientation, dorms: 3, baths: 2, stairs: 0,
    othersCount: 0
  });
  
  const [orientTip, setOrientTip] = useState('');
  const [fin, setFin] = useState({
    ownerVal: '', webVal: '', t1_v: '', t1_r: '', t2_v: '', t2_r: '', avgAppraisal: 0
  });

  // ESTADOS BLINDADOS PARA VERCEL (BUILD SAFE)
  const [scenarios, setScenarios] = useState<Scenarios>({
    1: { offer: null, margin: 10 }, 
    2: { offer: null, margin: 10 }, 
    3: { offer: null, margin: 10 },
  });
  const [activeScenario, setActiveScenario] = useState<1 | 2 | 3>(1);
  const [manualBase, setManualBase] = useState<string>('');
  const [manualCapex, setManualCapex] = useState<number | ''>(''); 
  const [auditState, setAuditState] = useState<AuditState>({});
  
  const [auditNotes, setAuditNotes] = useState<Record<string, string>>({});
  const [otherLabels, setOtherLabels] = useState<Record<string, string>>({});
  const [listeningKey, setListeningKey] = useState<string | null>(null);
  const [totalCapex, setTotalCapex] = useState(0);
  const [portalToggles, setPortalToggles] = useState<Record<string, boolean>>({});
  const [portalDesc, setPortalDesc] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [isGeneratingId, setIsGeneratingId] = useState(false);
  
  useEffect(() => {
    fetch('https://mindicador.cl/api/uf')
      .then(r => r.json())
      .then(d => { setUf(Math.round(d.serie[0].valor)); setUfStatus('(Actualizado)'); })
      .catch(() => setUfStatus('(Manual)'));
      
    setVerificationHash(Math.random().toString(36).substring(2, 10).toUpperCase());
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

  // FUNCIÓN DE ACTUALIZACIÓN CON CIERRE TÉCNICO DE TIPOS
  const updateAuditScore = (id: string, updates: Partial<AuditScore>, itemConfig: AuditItemConfig) => {
    setAuditState((prev: AuditState) => {
      const current = prev[id] || { score: 0, qty: itemConfig.t === 'spec' ? 0 : 1, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' };
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

  const handleFastCheck = (prefix: string, items: AuditItemConfig[]) => {
    const updates: AuditState = {};
    items.forEach(item => {
        const key = `${prefix}_${item.id}`;
        if (!auditState[key] || auditState[key].score === 0) {
            updates[key] = { score: 7, qty: item.t === 'spec' ? 0 : 1, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' };
        }
    });
    setAuditState(prev => ({ ...prev, ...updates }));
  };

  const handleMicClick = (key: string, isItemNote: boolean = false) => {
    if (!('webkitSpeechRecognition' in window)) { alert("Usa Chrome."); return; }
    if (listeningKey === key) { setListeningKey(null); return; }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'es-ES';
    
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (isItemNote) {
           setAuditState(prev => {
             const current = prev[key] || { score: 0, qty: 0, hasPhoto: false, cost: 0, observation: '' };
             return {
               ...prev,
               [key]: { ...current, observation: (current.observation ? current.observation + ' ' : '') + transcript }
             };
           });
        } else {
           setAuditNotes(prev => ({ ...prev, [key]: (prev[key] ? prev[key] + ' ' : '') + transcript }));
        }
    };
    recognition.onstart = () => setListeningKey(key);
    recognition.onend = () => setListeningKey(null);
    recognition.start();
  };

  const handlePrintReport = (reportType: 'fast' | 'normal' | 'full') => {
    setPrintMode(reportType);
    setTimeout(() => { window.print(); setTimeout(() => setPrintMode('none'), 500); }, 100);
  };

  const getExportPrefix = (key: string): string => {
    if (key.startsWith('sys')) return 'SC';
    if (key.startsWith('liv')) return 'LC';
    if (key.startsWith('kit')) return 'CL';
    if (key.startsWith('ext')) return 'FE';
    if (key.startsWith('drm')) return key.replace('drm', 'D');
    if (key.startsWith('bth')) return key.replace('bth', 'B');
    if (key.startsWith('stair')) return key.replace('stair', 'E');
    if (key.startsWith('oth')) return key.replace('oth', 'O');
    return 'XX';
  };

  const handleSaveData = async () => {
    const dataToSave = {
        meta: { version: '4.1', date: new Date().toISOString(), id: auditId, hash: verificationHash },
        client, property, financials: fin, scenarios, activeScenario, auditState, auditNotes, otherLabels,
        portal: { toggles: portalToggles, desc: portalDesc }, costs: { uf, totalCapex, manualCapex }
    };

    const zip = new JSZip();
    zip.file(`${auditId}_${client.rut || 'DATA'}.json`, JSON.stringify(dataToSave, null, 2));

    let photoCount = 0;
    Object.entries(auditState).forEach(([key, value]) => {
        const auditItem = value as AuditScore;
        if (auditItem.photos && auditItem.photos.length > 0) {
            const parts = key.split('_');
            const itemId = parts.pop();
            const prefixRaw = parts.join('_');
            const exportPrefix = getExportPrefix(prefixRaw);
            
            auditItem.photos.forEach((base64String, index) => {
                const filename = `${exportPrefix}_${itemId}_${index + 1}.jpg`;
                const imgData = base64String.split(';base64,').pop();
                if (imgData) {
                    zip.file(filename, imgData, { base64: true });
                    photoCount++;
                }
            });
        }
    });

    try {
        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = photoCount > 0 ? `PACK_PCF15_${auditId}.zip` : `${auditId}_${client.rut}.json`;
        link.click();
        if (photoCount > 0) alert(`✅ Pack descargado con éxito.\n📄 1 Informe JSON\n📷 ${photoCount} Fotos renombradas.`);
    } catch (e) {
        console.error(e);
        alert("Error al generar el archivo ZIP.");
    }
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
            if(data.meta.hash) setVerificationHash(data.meta.hash);
            if(data.client) setClient(data.client);
            if(data.property) setProperty(data.property);
            if(data.financials) setFin(data.financials);
            if(data.scenarios) setScenarios(data.scenarios);
            if(data.activeScenario) setActiveScenario(data.activeScenario);
            if(data.auditState) setAuditState(data.auditState);
            if(data.auditNotes) setAuditNotes(data.auditNotes);
            if(data.otherLabels) setOtherLabels(data.otherLabels);
            if(data.portal) { setPortalToggles(data.portal.toggles || {}); setPortalDesc(data.portal.desc || ''); }
            if(data.costs && data.costs.uf) setUf(data.costs.uf);
            if(data.costs && data.costs.manualCapex !== undefined) setManualCapex(data.costs.manualCapex);
            alert(`Ficha ${data.meta.id} cargada.`);
        } catch (err) { alert("Error al leer archivo."); }
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const getGroupAverage = (prefix: string, items: AuditItemConfig[]): string | null => {
    let totalScore = 0; let count = 0;
    items.forEach(item => {
        const score = auditState[`${prefix}_${item.id}`]?.score || 0;
        if (score > 0) { totalScore += score; count++; }
    });
    return count > 0 ? (totalScore / count).toFixed(1) : null;
  };

  const getGlobalAverage = (): string => {
    let totalScore = 0; let count = 0;
    (Object.values(auditState) as AuditScore[]).forEach(item => {
        if (item.score > 0) { totalScore += item.score; count++; }
    });
    return count > 0 ? (totalScore / count).toFixed(1) : "0.0";
  };

  // --- IA FUNCTIONS (v1.37.0 COMPATIBLE) ---
  const handleGenerateAuditId = async () => {
    if (!property.address) { alert("Ingresa dirección."); return; }
    setIsGeneratingId(true);
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const genAI = new GoogleGenAI(process.env.API_KEY || "AIzaSyDoaVm8Z-3qIrVg08sa0_HYctbdwwAdDnQ");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `${DOMIS_SYSTEM_PROMPT}\nGenera un ID único (Máx 6 chars, mayúsculas/números) para auditoría en: "${property.address}". Formato: LC1024. SOLO EL CÓDIGO.`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const code = response.text().trim().replace(/[^A-Z0-9]/g, '').substring(0, 6) || 'ERR00';
      setAuditId(code);
    } catch (e) { 
      console.error(e); 
      alert("Error IA."); 
    } finally { setIsGeneratingId(false); }
  };

  const generateDescription = async () => {
    setAiGenerating(true);
    try {
        const { GoogleGenAI } = await import("@google/genai");
        const genAI = new GoogleGenAI(process.env.API_KEY || "AIzaSyDoaVm8Z-3qIrVg08sa0_HYctbdwwAdDnQ");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const amenities = Object.keys(portalToggles).filter(k => portalToggles[k]).join(", ");
        const prompt = `${DOMIS_SYSTEM_PROMPT}\nEscribe una descripción inmobiliaria profesional y vendedora para: ${property.address}. Tipo: ${property.type}. ${property.m2Useful}m2 útiles. Amenities: ${amenities}.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        setPortalDesc(response.text() || '');
    } catch (e) { 
      console.error(e); 
      alert("Error IA."); 
    } finally { setAiGenerating(false); }
  };

  useEffect(() => {
    const scores = Object.values(auditState) as AuditScore[];
    const total = scores.reduce((acc, curr) => acc + curr.cost, 0);
    setTotalCapex(Math.round(total));
  }, [auditState]);

  useEffect(() => {
    const v1 = parseFloat(fin.t1_v) || 0; const v2 = parseFloat(fin.t2_v) || 0;
    setFin(f => ({ ...f, avgAppraisal: (v1 && v2) ? (v1 + v2) / 2 : (v1 || v2) }));
  }, [fin.t1_v, fin.t2_v]);

  const getFinancials = () => {
    let baseVal = 0; let labelText = "";
    if (activeScenario === 1) { baseVal = fin.avgAppraisal; labelText = "Tasación Ref."; }
    else if (activeScenario === 2) { baseVal = parseFloat(fin.ownerVal) || 0; labelText = "Valor Dueño"; }
    else { baseVal = parseFloat(manualBase) || 0; labelText = "Tu Base Manual"; }

    const currentCapex = (activeScenario === 3 && manualCapex !== '') ? Number(manualCapex) : totalCapex;
    const valNeto = baseVal - currentCapex;
    const marginPct = scenarios[activeScenario].margin;
    const offerSys = valNeto - (valNeto * (marginPct / 100));
    
    const manualOfferVal = scenarios[activeScenario].offer;
    const offerFinal = manualOfferVal !== null ? manualOfferVal : offerSys;
    const ownerPrice = parseFloat(fin.ownerVal) || 0;
    const savings = (ownerPrice > offerFinal) ? ownerPrice - offerFinal : 0;
    
    let finalCLP = (savings * 0.15) * uf;
    if (finalCLP < 2000000) finalCLP = 2000000; else if (finalCLP > 6000000) finalCLP = 6000000;

    return { baseVal, labelText, offerSys, offerFinal, savings, commUF: savings * 0.15, finalCLP, currentCapex };
  };

  const financials = getFinancials();
  const displayOfferSys = (printMode === 'full' && scenarios[activeScenario].offer !== null) ? scenarios[activeScenario].offer : financials.offerSys;
  const displayOfferLabel = (printMode === 'full' && scenarios[activeScenario].offer !== null) ? "OFERTA CIERRE FINAL" : "OFERTA SUGERIDA (SISTEMA)";

  const handleWhatsapp = () => {
    const text = `🚀 *Oportunidad PCF-15*\n📍 ${property.address}\n💰 Oferta: ${Math.round(financials.offerSys).toLocaleString()} UF`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  const isVisible = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal') => {
    if (printMode === 'none') return section === 'portal' ? mode === 'search' : true; 
    if (printMode === 'fast') return section === 'property' || section === 'audit';
    if (printMode === 'normal') return section !== 'financial' && (section === 'portal' ? mode === 'search' : true);
    return true;
  };
  
  const getSectionClass = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal') => isVisible(section) ? '' : 'hidden';

  const renderAuditGroup = (items: AuditItemConfig[], prefix: string, label?: string) => {
    const avg = getGroupAverage(prefix, items);
    return (
    <div className="space-y-0">
      <div className="flex justify-between items-end mb-2 border-b border-amber-500/20 pb-1">
        {avg && ( <div className="text-xs text-amber-400 font-bold">Nota Promedio {label}: <span className="text-white text-sm">{avg}</span></div> )}
        <button onClick={() => handleFastCheck(prefix, items)} className="text-[10px] bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 transition-colors ml-auto no-print">✓ Fast-Track 7</button>
      </div>
      {items.map(item => (
        <div key={`${prefix}_${item.id}`} className={printMode === 'fast' ? 'hidden' : ''}>
           <AuditRow 
             item={item} 
             state={auditState[`${prefix}_${item.id}`] || { score: 0, qty: item.t === 'spec' ? 0 : 1, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' }} 
             onChange={(u) => updateAuditScore(`${prefix}_${item.id}`, u, item)} 
             prefix={prefix} 
             showCosts={printMode === 'full' || printMode === 'none'}
             onMicClick={() => handleMicClick(`${prefix}_${item.id}`, true)}
             isListening={listeningKey === `${prefix}_${item.id}`}
           />
        </div>
      ))}
      <div className={`mt-2 pl-1 pr-2 pb-2 ${printMode === 'fast' ? 'hidden' : ''}`}>
        <div className="flex gap-2 items-start bg-slate-900/50 p-2 rounded border border-slate-700/50 focus-within:border-slate-500 transition-colors">
            <textarea className="w-full bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none resize-none" placeholder={`Observaciones Globales ${label}...`} rows={2} value={auditNotes[prefix] || ''} onChange={(e) => setAuditNotes(prev => ({...prev, [prefix]: e.target.value}))} />
            <button onClick={() => handleMicClick(prefix)} className={`p-2 rounded-full transition-all ${listeningKey === prefix ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`} title="Dictar nota global">🎤</button>
        </div>
      </div>
    </div>
  )};

  const renderDynamicRooms = (count: number, items: AuditItemConfig[], prefixBase: string, label: string) => {
    const rooms = [];
    for (let i = 1; i <= count; i++) {
      rooms.push(<div key={`${prefixBase}${i}`} className="mb-4 pl-3 border-l-2 border-slate-600"><div className="flex justify-between items-center mb-2"><strong className="text-sm text-slate-300">{label} #{i}</strong></div>{renderAuditGroup(items, `${prefixBase}${i}`, `${label} #${i}`)}</div>);
    }
    return rooms;
  };

  const renderDynamicOtherRooms = (count: number, items: AuditItemConfig[], prefixBase: string) => {
    const rooms = [];
    for (let i = 1; i <= count; i++) {
      const key = `${prefixBase}${i}`;
      const labelName = otherLabels[key] || `Recinto #${i}`;
      rooms.push(
        <div key={key} className="mb-4 pl-3 border-l-2 border-slate-600">
          <div className="mb-2 flex items-center gap-2">
             <strong className="text-sm text-slate-300"># {i}</strong>
             <input type="text" className="bg-transparent border-b border-slate-600 text-amber-400 font-bold text-sm focus:border-amber-400 outline-none w-full placeholder-slate-600" placeholder="Nombre..." value={otherLabels[key] || ''} onChange={(e) => setOtherLabels(prev => ({...prev, [key]: e.target.value}))} />
          </div>
          {renderAuditGroup(items, key, labelName)}
        </div>
      );
    }
    return rooms;
  };

  if (!isAuthenticated) return <LoginScreen password={password} setPassword={setPassword} handleLogin={handleLogin} loginError={loginError} />;

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold flex items-center gap-2">PCF-15™ <span className="font-light text-emerald-400">By Domis v4.1</span></h1>
        <div className="flex items-center gap-3">
            <a href="https://www.domis.cl" className="flex items-center gap-1 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded border border-slate-500 transition-colors shadow-sm">⬅ Domis.cl</a>
            <div className="bg-emerald-500/10 border border-emerald-500 rounded-full px-4 py-1 flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">UF:</span>
              <input type="number" value={uf} onChange={(e) => setUf(parseInt(e.target.value) || 0)} className="w-16 bg-transparent border-none text-emerald-400 font-bold text-right outline-none" />
              <span className="text-[10px] text-slate-400">{ufStatus}</span>
            </div>
        </div>
      </div>

      <div className="flex border border-slate-600 rounded-lg overflow-hidden mb-6 no-print">
        <button onClick={() => setMode('audit')} className={`flex-1 py-3 font-bold text-sm transition-colors ${mode === 'audit' ? 'bg-emerald-900/40 text-white border-b-2 border-emerald-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🏠 AUDITORÍA</button>
        <button onClick={() => setMode('search')} className={`flex-1 py-3 font-bold text-sm transition-colors ${mode === 'search' ? 'bg-emerald-900/40 text-white border-b-2 border-emerald-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🔍 BÚSQUEDA + PORTAL</button>
      </div>
      
      {/* Print Header */}
      <div className="hidden print:block mb-8">
        <div className="flex justify-between items-start border-b-2 border-slate-300 pb-4 mb-4 text-black">
           <div>
             <h1 className="text-2xl font-bold mb-1">PCF-15™ Informe Técnico</h1>
             <p className="text-sm"><strong>Propiedad:</strong> {property.address} <span className="ml-4"><strong>Cliente:</strong> {client.name}</span></p>
             <div className="text-[10px] text-slate-500 mt-1 font-mono">ID: {auditId} | HASH: {verificationHash}</div>
           </div>
           <div className="text-right text-xs">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('property')}`}>
        <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">📝 Datos de la Propiedad & Cliente</h2>
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-6">
            <h3 className="text-xs font-bold text-blue-400 uppercase mb-3">👤 IDENTIFICACIÓN & REGISTRO</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nº Registro</label>
                    <div className="flex gap-2">
                        <input className="w-full bg-slate-700 border border-blue-500/50 rounded p-2 text-blue-400 font-bold uppercase" value={auditId} onChange={e => setAuditId(e.target.value)} />
                        <button onClick={handleGenerateAuditId} disabled={isGeneratingId} className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2 disabled:opacity-50 transition-colors shadow-lg">✨</button>
                    </div>
                </div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Cliente</label><input className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white" value={client.name} onChange={e => setClient({...client, name: e.target.value})} /></div>
                <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">RUT</label><input className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white" value={client.rut} onChange={e => setClient({...client, rut: e.target.value})} /></div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dirección</label><input className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white" value={property.address} onChange={e => setProperty({...property, address: e.target.value})} /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">ROL</label><input className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white" value={property.rol} onChange={e => setProperty({...property, rol: e.target.value})} /></div>
          <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo</label><select className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white" value={property.type} onChange={e => setProperty({...property, type: e.target.value})}><option>Casa</option><option>Departamento</option></select></div>
        </div>
      </div>

      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('financial')}`}>
         <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">💰 Análisis Financiero</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Venta Dueño (UF)</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 font-bold text-right text-white" value={fin.ownerVal} onChange={e => setFin({...fin, ownerVal: e.target.value})} /></div>
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Portal Web (UF)</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 font-bold text-right text-white" value={fin.webVal} onChange={e => setFin({...fin, webVal: e.target.value})} /></div>
         </div>
         <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-4">
             <div className="flex border-b border-slate-600 mb-4 no-print">
                {[1, 2, 3].map(n => ( 
                  <button key={n} onClick={() => { setActiveScenario(n as 1|2|3); if (n === 3 && manualCapex === '') setManualCapex(totalCapex); }} className={`flex-1 py-2 text-xs font-bold transition-colors border-b-2 ${activeScenario === n ? 'text-blue-400 border-blue-400' : 'text-slate-500 border-transparent'}`}>
                    {n === 1 ? '1. TASACIÓN' : n === 2 ? '2. DUEÑO' : '3. MANUAL'}
                  </button> 
                ))}
             </div>
             <div className="grid grid-cols-3 gap-4 mb-4">
                 <div className="bg-slate-800 p-2 rounded border border-slate-600">
                    <label className="block text-xs font-bold text-blue-400 mb-1">{financials.labelText}</label>
                    <div className="text-xl font-bold text-white">{Math.round(financials.baseVal).toLocaleString()} UF</div>
                    {activeScenario === 3 && <input type="number" className="w-full mt-1 bg-slate-700 border border-blue-500/50 rounded text-xs p-1 text-white" value={manualBase} onChange={e => setManualBase(e.target.value)} />}
                 </div>
                 <div className="bg-slate-800 p-2 rounded border border-red-900/50">
                    <label className="block text-xs font-bold text-red-400 mb-1">Remodelación</label>
                    <div className="text-xl text-red-200 font-bold">-{financials.currentCapex.toLocaleString()} UF</div>
                    {activeScenario === 3 && <input type="number" className="w-full mt-1 bg-slate-700 border border-red-500/50 rounded text-xs p-1 text-white" value={manualCapex} onChange={e => setManualCapex(Number(e.target.value))} />}
                 </div>
                 <div className="bg-emerald-900/30 p-2 rounded border border-emerald-600/50 text-emerald-400">
                    <label className="block text-xs font-bold mb-1">Oferta Sistema</label>
                    <div className="text-xl font-bold">{Math.round(financials.offerSys).toLocaleString()} UF</div>
                 </div>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded">
                    <label className="block text-xs font-bold text-emerald-400 uppercase mb-1">💰 {displayOfferLabel}</label>
                    <div className="text-3xl font-bold text-white">{Math.round(displayOfferSys).toLocaleString()} UF</div>
                    <div className="text-xs text-slate-400">Ahorro vs Dueño: {Math.round(financials.savings).toLocaleString()} UF</div>
                 </div>
                 <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
                    <label className="block text-xs font-bold text-blue-400 uppercase mb-1">🤝 Honorario (15%)</label>
                    <div className="text-3xl font-bold text-white">${Math.round(financials.finalCLP / 1000000).toLocaleString()} M</div>
                    <div className="text-xs text-slate-400">CLP + IVA</div>
                 </div>
             </div>
         </div>
      </div>
      
      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('map')}`}>
        <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">📍 Entorno & Plusvalía</h2>
        <MapComponent address={property.address} />
      </div>

      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('audit')}`}>
        <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-4">
            <h2 className="text-emerald-400 text-lg font-bold">🛠️ Auditoría Técnica</h2>
            {printMode === 'fast' && <div className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-bold">Nota: {getGlobalAverage()}</div>}
        </div>
        <div className="space-y-6">
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase">⚡ Sistemas Críticos (SC)</h3>
             {renderAuditGroup(ITEMS.sys, 'sys', 'Sistemas')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase">🛋️ Living / Comedor (LC)</h3>
             {renderAuditGroup(ITEMS.liv, 'liv', 'Living')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase">💧 Cocina / Logia (CL)</h3>
             {renderAuditGroup(ITEMS.kit, 'kit', 'Cocina')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase">🛏️ Dormitorios (D#)</h3>
             {renderDynamicRooms(property.dorms, DORM_ITEMS, 'drm', 'Dormitorio')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase">🚿 Baños (B#)</h3>
             {renderDynamicRooms(property.baths, BATH_ITEMS, 'bth', 'Baño')}
          </div>
        </div>
      </div>

      <PortalSection toggles={portalToggles} setToggles={setPortalToggles} desc={portalDesc} setDesc={setPortalDesc} onGenerateAi={generateDescription} isGenerating={aiGenerating} className={getSectionClass('portal')} />

      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 p-4 flex justify-between items-center z-40 no-print">
         <div className="flex gap-2">
            <button onClick={() => { if(confirm("¿Guardar PACK?")) handleSaveData(); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded font-bold text-xs shadow-lg transition-all">💾 GUARDAR PACK</button>
            <button onClick={() => fileInputRef.current?.click()} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-bold text-xs border border-slate-600 transition-all">📂 ABRIR JSON</button>
            <input type="file" ref={fileInputRef} className="hidden" accept="application/json" onChange={handleLoadData} />
         </div>
         <div className="flex gap-2">
             <button onClick={() => handlePrintReport('fast')} className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded font-bold text-xs shadow-lg transition-all">⚡ FAST</button>
             <button onClick={() => handlePrintReport('normal')} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded font-bold text-xs shadow-lg transition-all">📄 NORMAL</button>
             <button onClick={() => handlePrintReport('full')} className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded font-bold text-xs shadow-lg transition-all">💰 FULL</button>
         </div>
      </div>
    </div>
  );
};

export default App;