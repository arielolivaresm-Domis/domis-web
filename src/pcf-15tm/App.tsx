import React, { useState, useEffect, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import { CFG, ITEMS, DORM_ITEMS, BATH_ITEMS, STAIR_ITEMS, DOMIS_SYSTEM_PROMPT, NORMATIVA_DB } from './constants';
import { AuditItemConfig, AuditScore, AuditState, Orientation, Scenarios, ToolData } from './types';
import { AuditRow } from './components/AuditRow';
import { MapComponent } from './components/MapComponent';
import { LoginScreen } from './components/LoginScreen';
import { PortalSection } from './components/PortalSection';
import { TechnicalGuide } from './components/TechnicalGuide';
import { ToolRegistry } from './components/ToolRegistry';
import { CriticalSummary } from './components/CriticalSummary';
import { NormativeAnnex } from './components/NormativeAnnex';
import { WorkOrder } from './components/WorkOrder';

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [mode, setMode] = useState<'audit' | 'search'>('audit');
  // MODES: 'none' (screen), 'fast' (score only), 'normal' (client/tech), 'full' (negotiation), 'investor' (internal), 'work_order' (contractor)
  const [printMode, setPrintMode] = useState<'none' | 'fast' | 'normal' | 'full' | 'investor' | 'work_order'>('none');
  
  const [uf, setUf] = useState(39700.00); 
  const [ufInputValue, setUfInputValue] = useState('39700.00'); // Estado local para edición de input sin conflictos de parsing
  const [ufStatus, setUfStatus] = useState('(Cargando...)');
  
  const [auditId, setAuditId] = useState('D101');
  const [verificationHash, setVerificationHash] = useState('');
  const [client, setClient] = useState({ name: '', rut: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // v5.1 Property State
  const [property, setProperty] = useState({
    address: '', rol: '', type: 'Casa', 
    m2Useful: '', 
    m2Municipal: '', 
    m2Terrace: '', m2Terra: '',
    orient1: '' as Orientation, orient2: '' as Orientation, dorms: 3, baths: 2, stairs: 0,
    othersCount: 0
  });
  
  const [orientTip, setOrientTip] = useState('');
  const [fin, setFin] = useState({
    ownerVal: '', webVal: '', t1_v: '', t1_r: '', t2_v: '', t2_r: '', avgAppraisal: 0
  });
  const [scenarios, setScenarios] = useState<Scenarios>({
    1: { offer: null, margin: 10 }, 
    2: { offer: null, margin: 10 }, 
    3: { offer: null, margin: 10 },
    4: { offer: null, margin: 15 },
  });
  const [activeScenario, setActiveScenario] = useState<1 | 2 | 3 | 4>(1);
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
  
  // Tools
  const [tools, setTools] = useState<ToolData[]>([{ id: '1', name: 'Nivel Láser', model: 'Genérico', verified: true }]);
  const [checklistImg, setChecklistImg] = useState<string | null>(null);

  // UF FETCHING LOGIC (Mindicador.cl Exact Value)
  const fetchUfValue = async () => {
    setUfStatus('...');
    try {
      // Usamos cache: 'no-store' para evitar datos antiguos
      const res = await fetch('https://mindicador.cl/api/uf', { cache: 'no-store' });
      const data = await res.json();
      
      if (data.serie && data.serie.length > 0) {
         // Tomamos siempre el PRIMER valor (el más reciente publicado por la API)
         const latest = data.serie[0];
         setUf(latest.valor);
         setUfInputValue(latest.valor.toString()); // Sincronizamos el input visual

         // Verificamos si corresponde a hoy para el status
         const today = new Date();
         const latestDate = new Date(latest.fecha);
         
         const isSameDate = latestDate.getDate() === today.getDate() && 
                            latestDate.getMonth() === today.getMonth() && 
                            latestDate.getFullYear() === today.getFullYear();

         if (isSameDate) {
            setUfStatus('(Hoy)');
         } else {
            setUfStatus(`(${latestDate.getDate()}/${latestDate.getMonth() + 1})`);
         }
      } else {
         throw new Error("Formato API incorrecto");
      }
    } catch (e) {
      console.error("Error fetching UF:", e);
      setUfStatus('(Manual)');
    }
  };

  const handleUfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setUfInputValue(val); // Permitir escritura libre (ej: "39000.") sin parseo inmediato que borre el punto
      const num = parseFloat(val);
      if (!isNaN(num)) {
          setUf(num);
      }
      setUfStatus('(Manual)');
  };

  useEffect(() => {
    fetchUfValue();
    // Generar Hash inicial
    setVerificationHash(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);

  const handleOpenSii = () => {
      const year = new Date().getFullYear();
      window.open(`https://www.sii.cl/valores_y_fechas/uf/uf${year}.htm`, '_blank');
  };

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
      const current = prev[id] || { score: 0, isNa: false, qty: itemConfig.t === 'spec' ? 0 : 1, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' };
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
            updates[key] = { score: 7, isNa: false, qty: item.t === 'spec' ? 0 : 1, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' };
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

  const handlePrintReport = (reportType: 'fast' | 'normal' | 'full' | 'investor' | 'work_order') => {
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
        meta: { version: '5.1', date: new Date().toISOString(), id: auditId, hash: verificationHash },
        client, property, financials: fin, scenarios, activeScenario, auditState, auditNotes, otherLabels,
        portal: { toggles: portalToggles, desc: portalDesc }, costs: { uf, totalCapex, manualCapex },
        tools, checklistImg
    };

    const zip = new JSZip();
    zip.file(`${auditId}_${client.rut || 'DATA'}_v5.1.json`, JSON.stringify(dataToSave, null, 2));

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

    if (checklistImg) {
        const checkData = checklistImg.split(';base64,').pop();
        if(checkData) zip.file(`CHECKLIST_CALIBRACION.jpg`, checkData, { base64: true });
    }

    try {
        const content = await zip.generateAsync({ type: 'blob' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = photoCount > 0 ? `PACK_PCF15_${auditId}_v5.1.zip` : `${auditId}_${client.rut}_v5.1.json`;
        link.click();
        if (photoCount > 0) alert(`✅ Pack v5.1 descargado con éxito.\n📄 1 Informe JSON\n📷 ${photoCount} Fotos renombradas.`);
    } catch (e) {
        console.error(e);
        alert("Error al generar el archivo ZIP.");
    }
  };

  const handleLoadData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Helper: Procesar el string JSON y cargar estado
    const processJsonData = (jsonStr: string) => {
        try {
            const data = JSON.parse(jsonStr);
            if (!data.meta || !data.property) { alert("El archivo no contiene datos válidos de PCF-15."); return; }
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
            if(data.costs && data.costs.uf) {
                setUf(data.costs.uf);
                setUfInputValue(data.costs.uf.toString()); // Sincronizar input al cargar
            }
            if(data.costs && data.costs.manualCapex !== undefined) setManualCapex(data.costs.manualCapex);
            if(data.tools) setTools(data.tools);
            if(data.checklistImg) setChecklistImg(data.checklistImg);

            alert(`✅ Ficha ${data.meta.id} (v${data.meta.version || '?'}) cargada exitosamente.`);
        } catch (err) { alert("Error crítico al procesar los datos."); }
    };

    // Si es ZIP (PACK), extraemos el JSON interno
    if (file.name.toLowerCase().endsWith('.zip')) {
        try {
            const zip = await JSZip.loadAsync(file);
            // Buscar archivo JSON dentro del ZIP
            const jsonFileName = Object.keys(zip.files).find(name => name.toLowerCase().endsWith('.json'));
            
            if (jsonFileName) {
                const jsonStr = await zip.files[jsonFileName].async("string");
                processJsonData(jsonStr);
            } else {
                alert("❌ El archivo ZIP no contiene un archivo .json válido.");
            }
        } catch (e) {
            console.error(e);
            alert("Error al leer el archivo ZIP. Asegúrate de que no esté corrupto.");
        }
    } else {
        // Carga normal de JSON (Legacy)
        const reader = new FileReader();
        reader.onload = (e) => processJsonData(e.target?.result as string);
        reader.readAsText(file);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getGroupAverage = (prefix: string, items: AuditItemConfig[]): string | null => {
    let totalScore = 0; let count = 0;
    items.forEach(item => {
        const itemState = auditState[`${prefix}_${item.id}`];
        if (itemState && itemState.score > 0 && !itemState.isNa) { 
            totalScore += itemState.score; 
            count++; 
        }
    });
    return count > 0 ? (totalScore / count).toFixed(1) : null;
  };

  // Calculate Global Average for Fast Report
  const getGlobalAverage = (): string => {
    let totalScore = 0; let count = 0;
    (Object.values(auditState) as AuditScore[]).forEach(item => {
        if (item.score > 0 && !item.isNa) { totalScore += item.score; count++; }
    });
    return count > 0 ? (totalScore / count).toFixed(1) : "0.0";
  };

  // --- IA FUNCTIONS ---
  const handleGenerateAuditId = async () => {
    if (!property.address) { alert("Ingresa dirección."); return; }
    setIsGeneratingId(true);
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `${DOMIS_SYSTEM_PROMPT}\nGenera un ID único (Máx 6 chars, mayúsculas/números) para auditoría en: "${property.address}". Formato: LC1024. SOLO EL CÓDIGO.`;
      const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      const code = response.text?.trim().replace(/[^A-Z0-9]/g, '').substring(0, 6) || 'ERR00';
      setAuditId(code);
    } catch (e: any) { 
      console.error(e); 
      if (e.message?.includes('403') || e.toString().toLowerCase().includes('permission')) {
        alert("⛔ ERROR PERMISOS GEMINI AI:\n\nTu API Key no tiene permisos para usar la IA (Generative Language API).\n\nSOLUCIÓN:\n1. Ve a Google Cloud Console\n2. Edita tu API Key\n3. En 'Restricciones de API', asegúrate de incluir 'Generative Language API'\n4. O selecciona 'No restringir clave' temporalmente.");
      } else {
        alert(`Error IA: ${e.message || 'Desconocido'}`); 
      }
    } finally { setIsGeneratingId(false); }
  };

  const generateDescription = async () => {
    setAiGenerating(true);
    try {
        const { GoogleGenAI } = await import("@google/genai");
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const amenities = Object.keys(portalToggles).filter(k => portalToggles[k]).join(", ");
        const prompt = `${DOMIS_SYSTEM_PROMPT}\nEscribe una descripción inmobiliaria profesional y vendedora para: ${property.address}. Tipo: ${property.type}. ${property.m2Useful}m2 útiles. Amenities: ${amenities}.`;
        const response = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
        setPortalDesc(response.text || '');
    } catch (e: any) { 
      console.error(e);
      if (e.message?.includes('403') || e.toString().toLowerCase().includes('permission')) {
        alert("⛔ ERROR PERMISOS GEMINI AI:\n\nTu API Key no tiene permisos para usar la IA (Generative Language API).\n\nSOLUCIÓN:\n1. Ve a Google Cloud Console\n2. Edita tu API Key\n3. En 'Restricciones de API', asegúrate de incluir 'Generative Language API'\n4. O selecciona 'No restringir clave' temporalmente.");
      } else {
        alert(`Error IA: ${e.message || 'Desconocido'}`); 
      }
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
    const appraisal = fin.avgAppraisal || 0;
    let baseVal = 0; 
    let labelText = "";
    let usedCapex = 0;
    let offerSys = 0;

    if (activeScenario === 1) {
        baseVal = appraisal * 0.8;
        usedCapex = 0; 
        offerSys = baseVal;
        labelText = "Piso Banco (80%)";
    } else if (activeScenario === 2) {
        baseVal = appraisal;
        usedCapex = totalCapex;
        offerSys = baseVal - usedCapex;
        labelText = "Tasación (100%)";
    } else if (activeScenario === 3) {
        baseVal = appraisal;
        usedCapex = manualCapex !== '' ? Number(manualCapex) : totalCapex;
        offerSys = baseVal - usedCapex;
        labelText = "Tasación Real";
    } else {
        baseVal = appraisal;
        usedCapex = totalCapex;
        offerSys = (appraisal - totalCapex) * 0.85; 
        labelText = "Tasación";
    }
    
    const netBeforeMargin = appraisal - totalCapex;
    const investorPrice = netBeforeMargin * 0.85; 
    const investorRoi = investorPrice > 0 ? ((appraisal - totalCapex - investorPrice) / investorPrice) * 100 : 0;
    const rejectionRisk = investorPrice < (appraisal * 0.70);

    const manualOfferVal = scenarios[activeScenario].offer;
    const offerFinal = manualOfferVal !== null ? manualOfferVal : offerSys;
    
    const ownerPrice = parseFloat(fin.ownerVal) || 0;
    const savings = (ownerPrice > offerFinal) ? ownerPrice - offerFinal : 0;
    const finalCLP = (savings * 0.10) * uf;

    const minFee = 2000000;
    let suggestedCap = 0;
    if (ownerPrice < 12000) suggestedCap = 4000000;
    else if (ownerPrice <= 18000) suggestedCap = 6000000;
    else suggestedCap = 8000000;

    const liquidationVal = (parseFloat(fin.t1_v) || 0) * 0.8;

    return { 
        baseVal, labelText, offerSys, offerFinal, savings, finalCLP, 
        currentCapex: usedCapex, 
        suggestedCap, minFee, liquidationVal,
        investorPrice, rejectionRisk, investorRoi, appraisal
    };
  };

  const financials = getFinancials();
  const displayOfferSys = (printMode === 'full' && scenarios[activeScenario].offer !== null) ? scenarios[activeScenario].offer : financials.offerSys;
  const displayOfferLabel = activeScenario === 3 ? "OFERTA SUGERIDA (Calc)" : ((printMode === 'full' && scenarios[activeScenario].offer !== null) ? "OFERTA CIERRE FINAL" : "OFERTA SUGERIDA (SISTEMA)");

  const handleWhatsapp = () => {
    const text = `🚀 *Oportunidad PCF-15*\n📍 ${property.address}\n💰 Oferta: ${Math.round(financials.offerSys).toLocaleString()} UF`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  // --- UPDATED VISIBILITY LOGIC ---
  const isVisible = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal' | 'guide') => {
    if (printMode === 'none') {
        if (section === 'portal') return mode === 'search';
        return true; 
    }
    
    // WORK ORDER: Only audit content (filtered internally), hide others
    if (printMode === 'work_order') return false; 
    
    // FAST: Only Show Summary Score (Special Component inside Audit)
    if (printMode === 'fast') {
        return section === 'audit'; 
    }
    
    // NORMAL: Show Technical, Hide Financials
    if (printMode === 'normal') {
        if (section === 'financial') return false;
        return true;
    }
    
    // FULL: Show Financials
    if (printMode === 'full') {
        return true; 
    }
    
    // INVESTOR: Show Everything
    if (printMode === 'investor') {
        return true;
    }

    return true;
  };
  
  const getSectionClass = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal' | 'guide') => isVisible(section) ? '' : 'hidden';

  const renderAuditGroup = (items: AuditItemConfig[], prefix: string, label?: string) => {
    const avg = getGroupAverage(prefix, items);
    const sectionCost = items.reduce((acc, item) => {
        const key = `${prefix}_${item.id}`;
        return acc + (auditState[key]?.cost || 0);
    }, 0);

    return (
    <div className="space-y-0">
      <div className="flex justify-between items-end mb-2 border-b border-amber-500/20 pb-1">
        <div className="flex gap-4 items-end">
             {avg && ( <div className="text-xs text-amber-400 font-bold">Nota Promedio {label}: <span className="text-white text-sm">{avg}</span></div> )}
             <div className="text-xs text-red-400 font-bold">Subtotal: <span className="text-white text-sm">{Math.round(sectionCost)} UF</span></div>
        </div>
        <button onClick={() => handleFastCheck(prefix, items)} className="text-[10px] bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 transition-colors ml-auto no-print">✓ Fast-Track 7</button>
      </div>
      {items.map(item => (
        <div key={`${prefix}_${item.id}`} className={printMode === 'fast' ? 'hidden' : ''}>
           <AuditRow 
             item={item} 
             state={auditState[`${prefix}_${item.id}`] || { score: 0, isNa: false, qty: item.t === 'spec' ? 0 : 1, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' }} 
             onChange={(u) => updateAuditScore(`${prefix}_${item.id}`, u, item)} 
             prefix={prefix} 
             showCosts={printMode === 'full' || printMode === 'investor' || printMode === 'none'}
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
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6 no-print">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-white">PCF-15™ <span className="font-light text-emerald-400">By Domis v5.1</span></h1>
        <div className="flex items-center gap-3">
            <a href="https://www.domis.cl" className="flex items-center gap-1 px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded border border-slate-500 transition-colors" title="Volver al sitio principal">
              ⬅ Domis.cl
            </a>
            <div className="bg-emerald-500/10 border border-emerald-500 rounded-full pl-4 pr-2 py-1 flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-400">UF:</span>
              <input type="number" value={ufInputValue} onChange={handleUfChange} className="w-24 bg-transparent border-none text-emerald-400 font-bold text-right outline-none" step="0.01" />
              <div className="flex flex-col text-[8px] leading-tight text-right">
                <span className="text-slate-400">{ufStatus}</span>
                <button onClick={handleOpenSii} className="text-blue-400 hover:text-blue-300 font-bold underline decoration-blue-500/30">Ver SII</button>
              </div>
            </div>
        </div>
      </div>

      <div className="flex border border-slate-600 rounded-lg overflow-hidden mb-6 no-print">
        <button onClick={() => setMode('audit')} className={`flex-1 py-3 font-bold text-sm transition-colors ${mode === 'audit' ? 'bg-emerald-900/40 text-white border-b-2 border-emerald-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🏠 AUDITORÍA</button>
        <button onClick={() => setMode('search')} className={`flex-1 py-3 font-bold text-sm transition-colors ${mode === 'search' ? 'bg-emerald-900/40 text-white border-b-2 border-emerald-500' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>🔍 BÚSQUEDA + PORTAL</button>
      </div>
      
      {/* v5.1 Print Header & Disclaimer */}
      <div className={`hidden print:block mb-8 ${printMode === 'work_order' ? 'hidden' : ''}`}>
        <div className="flex justify-between items-start border-b-2 border-slate-300 pb-4 mb-4">
           <div>
             <h1 className="text-2xl font-bold text-black mb-1">PCF-15™ Informe Técnico {printMode === 'fast' ? '(FAST)' : printMode === 'full' ? '(FINANCIERO)' : printMode === 'investor' ? '(ESTRATÉGICO)' : '(CLIENTE)'}</h1>
             <p className="text-sm text-gray-700"><strong>Propiedad:</strong> {property.address} <span className="ml-4"><strong>Cliente:</strong> {client.name}</span></p>
             <div className="text-[10px] text-slate-500 mt-1 font-mono">ID: {auditId} | HASH: {verificationHash}</div>
             {/* LEGAL DISCLAIMER */}
             <div className="mt-2 text-[9px] text-gray-400 italic bg-gray-50 p-1 border border-gray-200 inline-block">
                Inspección bajo estándares del Manual de Tolerancia CDT y Ley 20.016 (Garantías: 3, 5 y 10 años).
             </div>
           </div>
           <div className="text-right">
              <div className="text-[9px] text-slate-400">{new Date().toLocaleDateString()}</div>
           </div>
        </div>
        
        {/* PRINT-ONLY TOOL LIST (NOT IN WORK ORDER) */}
        <div className="mb-6 border-b border-gray-300 pb-4">
            <h3 className="text-xs font-bold text-black uppercase mb-2">INSTRUMENTAL TÉCNICO Y CALIBRACIÓN</h3>
            <table className="w-full text-[10px] text-left">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-1">Equipo</th>
                        <th className="p-1">Modelo</th>
                        <th className="p-1 text-center">Verificación</th>
                    </tr>
                </thead>
                <tbody>
                    {tools.map(t => (
                        <tr key={t.id} className="border-b border-gray-200">
                            <td className="p-1">{t.name}</td>
                            <td className="p-1">{t.model}</td>
                            <td className="p-1 text-center font-bold">{t.verified ? 'OK' : 'PEND'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {checklistImg && (
                <div className="mt-2">
                     <div className="text-[9px] text-gray-500 italic">Anexo: Ver foto de checklist adjunta.</div>
                </div>
            )}
        </div>
      </div>

      {/* --- RENDER SECTIONS BASED ON VISIBILITY --- */}

      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('property')}`}>
        <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">📝 Datos de la Propiedad & Cliente</h2>
        
        {/* IDENTIFICACION */}
        <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 mb-6">
            <h3 className="text-xs font-bold text-blue-400 uppercase mb-3">👤 IDENTIFICACIÓN & REGISTRO</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Nº Registro</label>
                    <div className="flex gap-2">
                        <input className="w-full bg-slate-700 border border-blue-500/50 rounded p-2 text-blue-400 font-bold tracking-wider uppercase" value={auditId} onChange={e => setAuditId(e.target.value)} placeholder="D101" />
                        <button onClick={handleGenerateAuditId} disabled={isGeneratingId} className="bg-blue-600 hover:bg-blue-500 text-white rounded px-3 py-2 disabled:opacity-50 transition-colors">✨</button>
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

        {/* SURFACE AREA & ALERTS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
           <div><label className="block text-xs font-bold text-emerald-400 uppercase mb-1">M² Reales (Útil)</label><input type="number" className="w-full bg-slate-700 border border-emerald-600/50 rounded p-2 text-white font-bold text-right" value={property.m2Useful} onChange={e => setProperty({...property, m2Useful: e.target.value})} /></div>
           <div><label className="block text-xs font-bold text-blue-400 uppercase mb-1">M² Municipal (SII)</label><input type="number" className="w-full bg-slate-700 border border-blue-600/50 rounded p-2 text-white font-bold text-right" value={property.m2Municipal} onChange={e => setProperty({...property, m2Municipal: e.target.value})} /></div>
           <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">M² Terraza</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white font-bold text-right" value={property.m2Terrace} onChange={e => setProperty({...property, m2Terrace: e.target.value})} /></div>
           <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">M² Terreno</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white font-bold text-right" value={property.m2Terra} onChange={e => setProperty({...property, m2Terra: e.target.value})} /></div>
           <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Orientación</label>
             <div className="flex gap-2">
               <select className="w-1/2 bg-slate-700 border border-slate-600 rounded p-2 text-white text-xs" value={property.orient1} onChange={e => setProperty({...property, orient1: e.target.value as Orientation})}><option value="">P...</option><option value="N">N</option><option value="O">O</option><option value="P">P</option><option value="S">S</option></select>
               <select className="w-1/2 bg-slate-700 border border-slate-600 rounded p-2 text-white text-xs" value={property.orient2} onChange={e => setProperty({...property, orient2: e.target.value as Orientation})}><option value="">S...</option><option value="N">N</option><option value="O">O</option><option value="P">P</option><option value="S">S</option></select>
             </div>
          </div>
        </div>

        {/* RED ALERT FOR M2 DISCREPANCY */}
        {parseFloat(property.m2Useful) < parseFloat(property.m2Municipal) && property.m2Useful && property.m2Municipal && (
             <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded mb-4 text-xs font-bold flex items-center gap-2 animate-pulse">
                <span>⚠️</span> Discrepancia de Superficie Detectada: M² Reales menores a Municipales. Verificar regularización (Ley del Mono).
             </div>
        )}
        
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mb-4">
           <div className="col-span-1 md:col-span-2">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Dormitorios</label>
             <div className="flex items-center bg-slate-700 rounded border border-slate-600 overflow-hidden">
                <button className="px-3 py-2 text-slate-300 hover:bg-slate-600 hover:text-white font-bold transition-colors" onClick={() => setProperty({...property, dorms: Math.max(1, property.dorms - 1)})}>-</button>
                <input type="number" className="w-full bg-transparent text-center text-white font-bold outline-none appearance-none m-0" value={property.dorms} onChange={e => setProperty({...property, dorms: Math.max(1, parseInt(e.target.value)||1)})} />
                <button className="px-3 py-2 text-slate-300 hover:bg-slate-600 hover:text-white font-bold transition-colors" onClick={() => setProperty({...property, dorms: property.dorms + 1})}>+</button>
             </div>
           </div>
           <div className="col-span-1 md:col-span-2">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Baños</label>
             <div className="flex items-center bg-slate-700 rounded border border-slate-600 overflow-hidden">
                <button className="px-3 py-2 text-slate-300 hover:bg-slate-600 hover:text-white font-bold transition-colors" onClick={() => setProperty({...property, baths: Math.max(1, property.baths - 1)})}>-</button>
                <input type="number" className="w-full bg-transparent text-center text-white font-bold outline-none appearance-none m-0" value={property.baths} onChange={e => setProperty({...property, baths: Math.max(1, parseInt(e.target.value)||1)})} />
                <button className="px-3 py-2 text-slate-300 hover:bg-slate-600 hover:text-white font-bold transition-colors" onClick={() => setProperty({...property, baths: property.baths + 1})}>+</button>
             </div>
           </div>
           <div className="col-span-1">
             <label className="block text-xs font-bold text-amber-500 uppercase mb-1">Escaleras</label>
             <div className="flex items-center bg-slate-700 rounded border border-amber-600 overflow-hidden">
                <button className="px-1 py-2 text-amber-500 hover:bg-amber-900/30 font-bold transition-colors w-6" onClick={() => setProperty({...property, stairs: Math.max(0, property.stairs - 1)})}>-</button>
                <input type="number" className="w-full bg-transparent text-center text-amber-500 font-bold outline-none appearance-none m-0 px-0" value={property.stairs} onChange={e => setProperty({...property, stairs: Math.max(0, parseInt(e.target.value)||0)})} />
                <button className="px-1 py-2 text-amber-500 hover:bg-amber-900/30 font-bold transition-colors w-6" onClick={() => setProperty({...property, stairs: property.stairs + 1})}>+</button>
             </div>
           </div>
        </div>
        <div className="mb-4 text-right flex justify-end items-center gap-2">
             <label className="text-xs font-bold text-amber-500 uppercase">Otros Recintos:</label>
             <div className="flex items-center bg-slate-700 rounded border border-amber-600 overflow-hidden w-28">
                <button className="px-2 py-1 text-amber-500 hover:bg-amber-900/30 font-bold transition-colors" onClick={() => setProperty({...property, othersCount: Math.max(0, property.othersCount - 1)})}>-</button>
                <input type="number" className="w-full bg-transparent text-center text-amber-500 font-bold outline-none appearance-none m-0" value={property.othersCount} onChange={e => setProperty({...property, othersCount: Math.max(0, parseInt(e.target.value)||0)})} />
                <button className="px-2 py-1 text-amber-500 hover:bg-amber-900/30 font-bold transition-colors" onClick={() => setProperty({...property, othersCount: property.othersCount + 1})}>+</button>
             </div>
        </div>
      </div>

      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('financial')}`}>
         {/* ... (Financial Content is visible but hidden by CSS in work_order mode via getSectionClass) ... */}
         {/* Reusing existing financial UI code */}
         <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">💰 Análisis Financiero</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Venta Dueño (UF)</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white font-bold text-right" value={fin.ownerVal} onChange={e => setFin({...fin, ownerVal: e.target.value})} /></div>
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Portal Web (UF)</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white font-bold text-right" value={fin.webVal} onChange={e => setFin({...fin, webVal: e.target.value})} /></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-slate-900/30 p-3 rounded border border-slate-700/50">
           <div><label className="block text-xs font-bold text-blue-400 uppercase mb-1">Tasación Comercial (UF)</label><input type="number" className="w-full bg-slate-700 border border-blue-500/30 rounded p-2 text-white font-bold text-right" placeholder="Ej: 5000" value={fin.t1_v} onChange={e => setFin({...fin, t1_v: e.target.value})} /></div>
           <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tasación 2 (Opcional)</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white font-bold text-right" placeholder="0" value={fin.t2_v} onChange={e => setFin({...fin, t2_v: e.target.value})} /></div>
           <div className="bg-red-900/20 border border-red-800 rounded p-2 flex flex-col justify-center"><label className="block text-[10px] font-bold text-red-400 uppercase mb-0.5">Valor Liquidación (80%)</label><div className="text-lg font-bold text-red-200 text-right">{Math.round(financials.liquidationVal).toLocaleString()} UF</div><div className="text-[9px] text-red-500 font-bold text-right">⚠️ Zona Riesgo Banco</div></div>
         </div>
         {/* ... Rest of financial UI ... */}
         <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-4">
             <div className="flex border-b border-slate-600 mb-4 no-print overflow-x-auto">
                <button onClick={() => setActiveScenario(1)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 1 ? 'text-blue-400 border-blue-400 bg-blue-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>🏦 PISO BANCO</button>
                <button onClick={() => setActiveScenario(2)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 2 ? 'text-emerald-400 border-emerald-400 bg-emerald-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>🛠️ TÉCNICO</button>
                <button onClick={() => setActiveScenario(3)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 3 ? 'text-amber-400 border-amber-400 bg-amber-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>🎛️ DASHBOARD MANUAL</button>
                <button onClick={() => setActiveScenario(4)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 4 ? 'text-purple-400 border-purple-400 bg-purple-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'} ${(printMode === 'full' || printMode === 'normal') ? 'hidden' : ''}`}>⚡ INVERSIONISTA</button>
             </div>
             {/* Simple standard view for brevity in this update, assuming previous logic holds */}
             <div className="animate-fade-in">
                 <div className="grid grid-cols-3 gap-4 mb-4">
                     <div className="bg-slate-800 p-2 rounded border border-slate-600"><label className="block text-xs font-bold text-blue-400 mb-1">{financials.labelText} (Base)</label><div className="text-xl text-white font-bold">{Math.round(financials.baseVal).toLocaleString()} UF</div></div>
                     <div className="bg-slate-800 p-2 rounded border border-red-900/50"><label className="block text-xs font-bold text-red-400 mb-1">Remodelación (CAPEX)</label><div className="text-xl text-red-200 font-bold">-{financials.currentCapex.toLocaleString()} UF</div></div>
                     <div className="bg-emerald-900/30 p-2 rounded border border-emerald-600/50"><label className="block text-xs font-bold text-emerald-400 mb-1">Oferta Sistema</label><div className="text-xl text-emerald-400 font-bold">{Math.round(financials.offerSys).toLocaleString()} UF</div></div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded"><label className="block text-xs font-bold text-emerald-400 uppercase mb-1">💰 {displayOfferLabel}</label><div className="text-3xl font-bold text-white mb-1">{Math.round(displayOfferSys).toLocaleString()} UF</div></div>
                     <div className="bg-emerald-900/40 border border-emerald-500 p-3 rounded shadow-lg shadow-emerald-900/30"><label className="block text-xs font-bold text-emerald-300 uppercase mb-1">🤑 AHORRO GENERADO</label><div className="text-3xl font-bold text-white mb-1">{Math.round(financials.savings).toLocaleString()} UF</div></div>
                     <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded"><label className="block text-xs font-bold text-blue-400 uppercase mb-1">🤝 Honorario Éxito (10%)</label><div className="text-3xl font-bold text-white mb-1">${Math.round(financials.finalCLP / 1000000).toLocaleString()} M</div></div>
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
            <h2 className="text-emerald-400 text-lg font-bold">🛠️ Auditoría Técnica PCF-15</h2>
            {printMode === 'fast' && <div className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-bold">RESUMEN EJECUTIVO</div>}
        </div>

        {/* --- FAST TRACK SCORE DISPLAY --- */}
        {printMode === 'fast' && (
             <div className="flex flex-col items-center justify-center py-8 bg-slate-900/50 rounded-lg border border-slate-600 animate-fade-in">
                 <div className="text-center mb-6">
                     <h3 className="text-slate-400 uppercase text-sm font-bold tracking-widest mb-2">CALIFICACIÓN GLOBAL DE LA PROPIEDAD</h3>
                     <div className="text-6xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                         {getGlobalAverage()} <span className="text-2xl text-slate-500 font-normal">/ 7.0</span>
                     </div>
                 </div>
                 <div className="w-full max-w-md px-6">
                     <div className="h-4 bg-slate-700 rounded-full overflow-hidden relative border border-slate-600">
                         <div className={`h-full absolute left-0 top-0 transition-all duration-1000 ${parseFloat(getGlobalAverage()) >= 6 ? 'bg-emerald-500' : parseFloat(getGlobalAverage()) >= 4 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${(parseFloat(getGlobalAverage()) / 7) * 100}%`}}></div>
                     </div>
                 </div>
             </div>
        )}

        <CriticalSummary auditState={auditState} />
        
        <div className={`space-y-6 ${printMode === 'fast' ? 'hidden' : ''}`}>
          
          <ToolRegistry tools={tools} setTools={setTools} checklistImg={checklistImg} setChecklistImg={setChecklistImg} />

          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">⚡ Sistemas Críticos (SC)</h3>
             {renderAuditGroup(ITEMS.sys, 'sys', 'Sistemas')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🛋️ Living / Comedor (LC)</h3>
             {renderAuditGroup(ITEMS.liv, 'liv', 'Living')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">💧 Cocina / Logia (CL)</h3>
             {renderAuditGroup(ITEMS.kit, 'kit', 'Cocina')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🛏️ Dormitorios (D#)</h3>
             {renderDynamicRooms(property.dorms, DORM_ITEMS, 'drm', 'Dormitorio')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🚿 Baños (B#)</h3>
             {renderDynamicRooms(property.baths, BATH_ITEMS, 'bth', 'Baño')}
          </div>
          {property.stairs > 0 && (
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
              <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🪜 Escaleras (E#)</h3>
              {renderDynamicRooms(property.stairs, STAIR_ITEMS, 'stair', 'Escalera')}
            </div>
          )}
          {property.othersCount > 0 && (
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
              <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🚪 Otros Recintos (O#)</h3>
              {renderDynamicOtherRooms(property.othersCount, ITEMS.liv, 'oth')}
            </div>
          )}
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🏡 Exterior / Fachada (Fe)</h3>
             {renderAuditGroup(ITEMS.ext, 'ext', 'Exterior')}
          </div>
          
          <div className="mt-6 border-t border-slate-600 pt-4 bg-red-900/10 p-4 rounded-lg flex justify-between items-center">
            <h3 className="text-red-400 font-bold uppercase text-sm md:text-base">🚨 Costo Total Remodelación (Capex)</h3>
            <div className="text-xl md:text-2xl font-bold text-white">{totalCapex.toLocaleString()} UF</div>
          </div>
        </div>
      </div>

      <PortalSection toggles={portalToggles} setToggles={setPortalToggles} desc={portalDesc} setDesc={setPortalDesc} onGenerateAi={generateDescription} isGenerating={aiGenerating} className={getSectionClass('portal')} />

      {/* TECHNICAL LEGEND */}
      <div className={getSectionClass('guide')}>
        <TechnicalGuide />
      </div>

      {/* NEW: NORMATIVE ANNEX (VISIBLE IN ALL PRINTS EXCEPT WORK ORDER) */}
      {printMode !== 'work_order' && printMode !== 'none' && <NormativeAnnex />}
      
      {/* NEW: WORK ORDER COMPONENT (ONLY VISIBLE IN WORK_ORDER MODE) */}
      {printMode === 'work_order' && <WorkOrder auditState={auditState} propertyAddress={property.address} />}

      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 p-4 flex justify-between items-center z-40 no-print">
         <div className="flex gap-2">
            <button onClick={() => { if(confirm("¿Generar y Descargar PACK (JSON + FOTOS)?")) handleSaveData(); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded font-bold text-xs transition-colors shadow-lg shadow-emerald-900/50">💾 GUARDAR PACK</button>
            <button onClick={() => fileInputRef.current?.click()} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-bold text-xs transition-colors border border-slate-600">📂 CARGAR PACK / FICHA</button>
            <input type="file" ref={fileInputRef} className="hidden" accept="application/json,.zip" onChange={handleLoadData} />
         </div>
         <div className="flex gap-2">
             <button onClick={() => handlePrintReport('fast')} className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Informe Resumido con Notas">⚡ FAST</button>
             <button onClick={() => handlePrintReport('normal')} className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Informe Cliente (Sin precios)">📄 NORMAL</button>
             <button onClick={() => handlePrintReport('full')} className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Análisis Financiero Dueño">💰 FULL</button>
             <button onClick={() => handlePrintReport('work_order')} className="bg-slate-100 hover:bg-white text-black border border-slate-400 px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Orden de Trabajo para Contratista">👷 WORK ORDER</button>
             <button onClick={handleWhatsapp} className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg">📱</button>
         </div>
      </div>
    </div>
  );
};

export default App;