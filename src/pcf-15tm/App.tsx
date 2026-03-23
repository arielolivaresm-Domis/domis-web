import React, { useState, useEffect, useCallback, useRef } from 'react';
import JSZip from 'jszip';
import {
  DOMIS_SYSTEM_PROMPT,
  GRUPOS_SC_COMPLETO, GRUPOS_EXTERIOR_COMPLETO, ITEM_NORM_MAP,
  getGruposByRecinto, GrupoCosto, ItemCosto, TipoRecinto,
  getClpByEscala, Escala,
} from './constants';
import { ALL_ITEMS } from './costos';
import { AuditScore, AuditState, Orientation, PlaceCategory, Scenarios, ToolData } from './types';
import { AuditRow } from './components/AuditRow';
import AuditRowComposite from './components/AuditRowComposite';
import {
  getCompositeItemsByRecinto, COMPOSITE_TECHOS,
  calcCompositeCostClp, CompositeItemConfig,
} from './compositeItems';
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
  // TERRENO / OFICINA — persiste en localStorage
  const [fieldMode, setFieldMode] = useState<'terreno' | 'oficina'>(() => {
    return (localStorage.getItem('pcf15_fieldMode') as 'terreno' | 'oficina') || 'terreno';
  });
  const toggleFieldMode = (m: 'terreno' | 'oficina') => {
    setFieldMode(m);
    localStorage.setItem('pcf15_fieldMode', m);
  };

  const [uf, setUf] = useState(39700.00);
  const [ufInputValue, setUfInputValue] = useState('39700.00');
  const [ufStatus, setUfStatus] = useState('(Cargando...)');

  const [auditId, setAuditId] = useState('D101');
  const [verificationHash, setVerificationHash] = useState('');
  const [client, setClient] = useState({ name: '', rut: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // v5.2 Property State
  const [property, setProperty] = useState({
    address: '', rol: '', type: 'Casa',
    m2Useful: '',
    m2Municipal: '',
    m2Terrace: '', m2Terra: '',
    orient1: '' as Orientation, orient2: '' as Orientation, dorms: 3, baths: 2, stairs: 0,
    othersCount: 0
  });

  const [, setOrientTip] = useState('');
  const [fin, setFin] = useState({
    ownerVal: '', webVal: '', t1_v: '', t1_r: '', t2_v: '', t2_r: '', avgAppraisal: 0
  });
  const [appraisalSource, setAppraisalSource] = useState<'t1' | 't2' | 'avg'>('t1');
  const [scenarios, setScenarios] = useState<Scenarios>({
    1: { offer: null, margin: 10 },
    2: { offer: null, margin: 10 },
    3: { offer: null, margin: 10 },
    4: { offer: null, margin: 15 },
  });
  const [activeScenario, setActiveScenario] = useState<1 | 2 | 3 | 4>(1);
  const [manualCapex, setManualCapex] = useState<number | ''>('');
  const [successFeePct, setSuccessFeePct] = useState(10);
  const [auditState, setAuditState] = useState<AuditState>({});

  const [auditNotes, setAuditNotes] = useState<Record<string, string>>({});
  const [otherLabels, setOtherLabels] = useState<Record<string, string>>({});
  const [listeningKey, setListeningKey] = useState<string | null>(null);
  const [totalCapex, setTotalCapex] = useState(0);
  const [totalCapexClp, setTotalCapexClp] = useState(0);
  const [portalToggles, setPortalToggles] = useState<Record<string, boolean>>({});
  const [portalDesc, setPortalDesc] = useState('');
  const [aiGenerating, setAiGenerating] = useState(false);
  const [isGeneratingId, setIsGeneratingId] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [entornoData, setEntornoData] = useState<{ places: PlaceCategory[]; commune: { name: string; data: any } | null } | null>(null);

  // Detección de conectividad
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Tools
  const [tools, setTools] = useState<ToolData[]>([{ id: '1', name: 'Nivel Láser', model: 'Genérico', verified: true }]);
  const [checklistImg, setChecklistImg] = useState<string | null>(null);
  const [propertyPhoto, setPropertyPhoto] = useState<string | null>(null);
  const propertyPhotoRef = useRef<HTMLInputElement>(null);

  // Helper: Procesar el string JSON y cargar estado
  const processJsonData = useCallback((jsonStr: string) => {
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
              setUfInputValue(data.costs.uf.toString());
          }
          if(data.costs && data.costs.manualCapex !== undefined) setManualCapex(data.costs.manualCapex);
          if(data.tools) setTools(data.tools);
          if(data.checklistImg) setChecklistImg(data.checklistImg);
          if(data.propertyPhoto) setPropertyPhoto(data.propertyPhoto);
          if(data.successFeePct !== undefined) setSuccessFeePct(data.successFeePct);

          console.log(`✅ Ficha ${data.meta.id} (v${data.meta.version || '?'}) cargada exitosamente.`);
      } catch (err) { alert("Error crítico al procesar los datos."); }
  }, []);

  // --- AUTO-SAVE LOGIC ---
  useEffect(() => {
    const saved = localStorage.getItem('pcf15_autosave');
    if (saved) {
        if (window.confirm("Hay una ficha guardada automáticamente en tu navegador. ¿Deseas recuperarla?")) {
            processJsonData(saved);
        } else {
            localStorage.removeItem('pcf15_autosave');
        }
    }
  }, [processJsonData]);

  useEffect(() => {
    if (!isAuthenticated) return;
    const dataToSave = {
        meta: { version: '5.2', date: new Date().toISOString(), id: auditId, hash: verificationHash },
        client, property, financials: fin, scenarios, activeScenario, auditState, auditNotes, otherLabels,
        portal: { toggles: portalToggles, desc: portalDesc }, costs: { uf, totalCapex, manualCapex },
        tools, checklistImg, propertyPhoto, successFeePct
    };
    localStorage.setItem('pcf15_autosave', JSON.stringify(dataToSave));
  }, [client, property, fin, scenarios, activeScenario, auditState, auditNotes, otherLabels, portalToggles, portalDesc, uf, totalCapex, manualCapex, tools, checklistImg, successFeePct, auditId, verificationHash, isAuthenticated]);

  const handleClearForm = () => {
      if (window.confirm("⚠️ ¿Estás seguro de borrar toda la ficha actual? Se perderán todos los datos no exportados.")) {
          localStorage.removeItem('pcf15_autosave');
          window.location.reload();
      }
  };

  // UF FETCHING LOGIC (Mindicador.cl Exact Value)
  const fetchUfValue = async () => {
    setUfStatus('...');
    try {
      const res = await fetch('https://mindicador.cl/api/uf', { cache: 'no-store' });
      const data = await res.json();

      if (data.serie && data.serie.length > 0) {
         const latest = data.serie[0];
         setUf(latest.valor);
         setUfInputValue(latest.valor.toString());

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
      setUfInputValue(val);
      const num = parseFloat(val);
      if (!isNaN(num)) {
          setUf(num);
      }
      setUfStatus('(Manual)');
  };

  useEffect(() => {
    fetchUfValue();
    setVerificationHash(Math.random().toString(36).substring(2, 10).toUpperCase());
  }, []);

  const handleOpenSii = () => {
      const year = new Date().getFullYear();
      window.open(`https://www.sii.cl/valores_y_fechas/uf/uf${year}.htm`, '_blank');
  };

  const handleLogin = () => {
    if (password === import.meta.env.VITE_ACCESS_PASSWORD) setIsAuthenticated(true);
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

  // v5.2 — CLP-based cost calculation
  const updateAuditScore = (id: string, updates: Partial<AuditScore>, item: ItemCosto) => {
    setAuditState(prev => {
      const current = prev[id] || { active: false, escala: 0, qty: 1, score: 0, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' };
      const next = { ...current, ...updates };
      let costClp = 0;
      if (next.active && !next.isNa && next.escala && next.escala > 0 && next.qty > 0) {
        costClp = next.qty * getClpByEscala(item, next.escala as Escala);
      }
      next.costClp = costClp;
      next.cost = uf > 0 ? costClp / uf : 0;
      return { ...prev, [id]: next };
    });
  };

  // Activate all inactive items in a group with Estándar scale
  const handleActivarGrupo = (prefixBase: string, items: ItemCosto[]) => {
    const updates: AuditState = {};
    items.forEach(item => {
        const key = `${prefixBase}_${item.key}`;
        const current = auditState[key];
        if (!current?.active) {
            const escala: Escala = 2;
            const qty = 1;
            const costClp = qty * getClpByEscala(item, escala);
            updates[key] = {
              score: 0,
              active: true,
              escala,
              qty,
              hasPhoto: false,
              photoCount: 0,
              photos: [],
              cost: uf > 0 ? costClp / uf : 0,
              costClp,
              observation: '',
            };
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
        meta: { version: '5.2', date: new Date().toISOString(), id: auditId, hash: verificationHash },
        client, property, financials: fin, scenarios, activeScenario, auditState, auditNotes, otherLabels,
        portal: { toggles: portalToggles, desc: portalDesc }, costs: { uf, totalCapex, manualCapex },
        tools, checklistImg, propertyPhoto, successFeePct
    };

    // Filename: PCF15_NombreCliente_AuditID.zip
    const safeName = (client.name || 'SinNombre').trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_\-áéíóúÁÉÍÓÚñÑ]/g, '');
    const safeId = auditId || 'D000';

    const zip = new JSZip();
    zip.file(`${safeId}_${client.rut || 'DATA'}_v5.2.json`, JSON.stringify(dataToSave, null, 2));

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
        link.download = photoCount > 0 ? `PCF15_${safeName}_${safeId}.zip` : `PCF15_${safeName}_${safeId}.json`;
        link.click();
        if (photoCount > 0) alert(`✅ Pack v5.2 descargado con éxito.\n📄 1 Informe JSON\n📷 ${photoCount} Fotos renombradas.`);
    } catch (e) {
        console.error(e);
        alert("Error al generar el archivo ZIP.");
    }
  };

  const handleLoadData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.name.toLowerCase().endsWith('.zip')) {
        try {
            const zip = await JSZip.loadAsync(file);
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
        const reader = new FileReader();
        reader.onload = (e) => processJsonData(e.target?.result as string);
        reader.readAsText(file);
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleLoadAutosave = () => {
    const saved = localStorage.getItem('pcf15_autosave');
    if (!saved) { alert("No hay ningún autosave guardado en este dispositivo."); return; }
    try {
        const data = JSON.parse(saved);
        const clientName = data.client?.name || 'Sin nombre';
        const date = data.meta?.date ? new Date(data.meta.date).toLocaleString('es-CL') : '?';
        if (window.confirm(`¿Restaurar autosave?\nCliente: ${clientName}\nFecha: ${date}\n\nSe reemplazará la ficha actual.`)) {
            processJsonData(saved);
        }
    } catch {
        alert("❌ Error al leer el autosave. El archivo puede estar corrupto.");
    }
  };

  // --- IA FUNCTIONS ---
  const handleGenerateAuditId = async () => {
    if (!property.address) { alert("Ingresa dirección."); return; }
    setIsGeneratingId(true);
    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `${DOMIS_SYSTEM_PROMPT}\nGenera un ID único (Máx 6 chars, mayúsculas/números) para auditoría en: "${property.address}". Formato: LC1024. SOLO EL CÓDIGO.`;
      const response = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: prompt });
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
        const response = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: prompt });
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

  // v5.2 — totalCapex recalc from CLP
  useEffect(() => {
    const totalClp = (Object.values(auditState) as AuditScore[])
      .reduce((acc, curr) => acc + (curr.costClp || 0), 0);
    setTotalCapexClp(totalClp);
    setTotalCapex(uf > 0 ? Math.round(totalClp / uf) : 0);
  }, [auditState, uf]);

  useEffect(() => {
    const v1 = parseFloat(fin.t1_v) || 0; const v2 = parseFloat(fin.t2_v) || 0;
    let computed = 0;
    if (appraisalSource === 't1') computed = v1;
    else if (appraisalSource === 't2') computed = v2 || v1;
    else computed = (v1 && v2) ? (v1 + v2) / 2 : (v1 || v2);
    setFin(f => ({ ...f, avgAppraisal: computed }));
  }, [fin.t1_v, fin.t2_v, appraisalSource]);

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
    const finalCLP = (savings * (successFeePct / 100)) * uf;

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
  const displayOfferSys = (scenarios[activeScenario].offer !== null) ? scenarios[activeScenario].offer : financials.offerSys;
  const displayOfferLabel = activeScenario === 3 ? "OFERTA SUGERIDA (Calc)" : ((scenarios[activeScenario].offer !== null) ? "OFERTA CIERRE FINAL" : "OFERTA SUGERIDA (SISTEMA)");

  const handleWhatsapp = () => {
    const text = `🚀 *Oportunidad PCF-15*\n📍 ${property.address}\n💰 Oferta: ${Math.round(financials.offerSys).toLocaleString()} UF`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
  };

  // --- VISIBILITY LOGIC ---
  const isVisible = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal' | 'guide') => {
    if (printMode === 'none') {
        if (section === 'portal') return mode === 'search';
        return true;
    }

    if (printMode === 'work_order') return false;
    if (printMode === 'fast') return false;
    if (printMode === 'normal') return false;
    if (printMode === 'full') return false;
    if (printMode === 'investor') return false;


    if (printMode === 'full') {
        return true;
    }

    if (printMode === 'investor') {
        return true;
    }

    return true;
  };

  const getSectionClass = (section: 'property' | 'financial' | 'map' | 'audit' | 'portal' | 'guide') => isVisible(section) ? '' : 'hidden';

  // v3 — Update para composite items (recintos simplificados)
  const updateCompositeAuditScore = useCallback((
    key: string,
    updates: Partial<AuditScore>,
    config: CompositeItemConfig,
  ) => {
    setAuditState(prev => {
      const current = prev[key] || { score: 0, active: false, escala: 0, qty: 0, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '', subGroups: {} };
      const merged  = { ...current, ...updates };
      const escala  = (merged.escala || 0) as 0 | 1 | 2 | 3;
      const qty     = merged.qty || 0;
      const { costClp, cost } = calcCompositeCostClp(config, merged, escala, qty, uf);
      const newState = { ...prev, [key]: { ...merged, costClp, cost, active: escala > 0 } };

      // Auto-copy Muro measureL → Piso (para cálculo de Guardapolvo)
      if (config.key === 'muro' && updates.measureL !== undefined) {
        const pisoKey = key.replace(/_muro$/, '_piso');
        if (newState[pisoKey]) {
          newState[pisoKey] = { ...newState[pisoKey], measureL: updates.measureL };
        }
      }
      return newState;
    });
  }, [uf]);

  // v3 — Render composite items para un recinto
  const renderCompositeRecinto = (configs: CompositeItemConfig[], prefixBase: string) => {
    const totalClp = configs.reduce((acc, c) =>
      acc + (auditState[`${prefixBase}_${c.key}`]?.costClp || 0), 0);

    return (
      <div className="mb-2">
        {totalClp > 0 && fieldMode === 'oficina' && printMode === 'none' && (
          <div className="flex items-center gap-2 mb-2 text-xs">
            <span className="text-slate-500">Total recinto:</span>
            <span className="text-amber-400 font-bold">${totalClp.toLocaleString('es-CL')}</span>
            <span className="text-slate-500">≈ {uf > 0 ? (totalClp / uf).toFixed(1) : '0'} UF</span>
          </div>
        )}
        {configs.map(config => {
          const key = `${prefixBase}_${config.key}`;
          return (
            <div key={key} className={printMode === 'fast' ? 'hidden' : ''}>
              <AuditRowComposite
                config={config}
                state={auditState[key] || { score: 0, active: false, escala: 0, qty: 0, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '', subGroups: {} }}
                onChange={u => updateCompositeAuditScore(key, u, config)}
                prefix={prefixBase}
                uf={uf}
                showCosts={(printMode === 'full' || printMode === 'investor' || printMode === 'none') && fieldMode === 'oficina'}
                fieldMode={fieldMode}
                onMicClick={() => handleMicClick(key, true)}
                isListening={listeningKey === key}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // v5.2 — Render groups from GrupoCosto[]
  const renderRecintoGrupos = (grupos: GrupoCosto[], prefixBase: string) => {
    return grupos.map(grupo => {
      // Sort: active items first, inactive at bottom
      const sorted = [...grupo.items].sort((a, b) => {
        const aOn = auditState[`${prefixBase}_${a.key}`]?.active ?? false;
        const bOn = auditState[`${prefixBase}_${b.key}`]?.active ?? false;
        if (aOn === bOn) return 0;
        return aOn ? -1 : 1;
      });

      const grupoClp = grupo.items.reduce((acc, item) =>
        acc + (auditState[`${prefixBase}_${item.key}`]?.costClp || 0), 0);

      return (
        <div key={`${prefixBase}_${grupo.key}`} className="mb-4">
          <div className="flex justify-between items-center mb-2 border-b border-amber-500/20 pb-1">
            <div className="flex gap-4 items-center">
              <span className="text-xs font-bold text-amber-400 uppercase">{grupo.label}</span>
              {grupoClp > 0 && (
                <span className="text-xs text-red-400 font-bold">
                  Subtotal: <span className="text-white">{grupoClp.toLocaleString('es-CL')} CLP</span>
                  <span className="text-slate-500 ml-1">≈ {uf > 0 ? (grupoClp / uf).toFixed(1) : '0'} UF</span>
                </span>
              )}
            </div>
            <button
              onClick={() => handleActivarGrupo(prefixBase, grupo.items)}
              className="text-[10px] bg-emerald-900/50 hover:bg-emerald-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 transition-colors ml-auto no-print"
            >
              ✓ Activar Grupo Estándar
            </button>
          </div>
          {sorted.map(item => {
            const key = `${prefixBase}_${item.key}`;
            const itemWithNorm = { ...item, norm: ITEM_NORM_MAP[item.key] };
            return (
              <div key={key} className={printMode === 'fast' ? 'hidden' : ''}>
                <AuditRow
                  item={itemWithNorm}
                  state={auditState[key] || { score: 0, active: false, escala: 0, qty: 1, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '' }}
                  onChange={(u) => updateAuditScore(key, u, item)}
                  prefix={prefixBase}
                  uf={uf}
                  showCosts={printMode === 'full' || printMode === 'investor' || printMode === 'none'}
                  onMicClick={() => handleMicClick(key, true)}
                  isListening={listeningKey === key}
                />
              </div>
            );
          })}
        </div>
      );
    });
  };

  const renderSectionWithNotes = (grupos: GrupoCosto[], prefixBase: string, noteLabel: string) => (
    <div className="space-y-0">
      {renderRecintoGrupos(grupos, prefixBase)}
      <div className={`mt-2 pl-1 pr-2 pb-2 ${printMode === 'fast' ? 'hidden' : ''}`}>
        <div className="flex gap-2 items-start bg-slate-900/50 p-2 rounded border border-slate-700/50 focus-within:border-slate-500 transition-colors">
            <textarea
              className="w-full bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none resize-none"
              placeholder={`Observaciones Globales ${noteLabel}...`}
              rows={2}
              value={auditNotes[prefixBase] || ''}
              onChange={(e) => setAuditNotes(prev => ({...prev, [prefixBase]: e.target.value}))}
            />
            <button
              onClick={() => handleMicClick(prefixBase)}
              className={`p-2 rounded-full transition-all ${listeningKey === prefixBase ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
              title="Dictar nota global"
            >
              🎤
            </button>
        </div>
      </div>
    </div>
  );

  // v3 — Sección de recinto con composite items + textarea de notas globales
  const renderSectionComposite = (
    tipo: 'living_comedor' | 'dormitorio' | 'bano' | 'cocina',
    prefixBase: string,
    noteLabel: string,
    extraGrupos?: GrupoCosto[], // closets u otros que siguen con AuditRow
  ) => {
    const configs = getCompositeItemsByRecinto(tipo);
    return (
      <div className="space-y-0">
        {renderCompositeRecinto(configs, prefixBase)}
        {/* Closets u otros grupos legacy que quedan sin cambios */}
        {extraGrupos && renderRecintoGrupos(extraGrupos, prefixBase)}
        <div className={`mt-2 pl-1 pr-2 pb-2 ${printMode === 'fast' ? 'hidden' : ''}`}>
          <div className="flex gap-2 items-start bg-slate-900/50 p-2 rounded border border-slate-700/50 focus-within:border-slate-500 transition-colors">
            <textarea
              className="w-full bg-transparent text-sm text-slate-300 placeholder-slate-600 outline-none resize-none"
              placeholder={`Observaciones Globales ${noteLabel}...`}
              rows={2}
              value={auditNotes[prefixBase] || ''}
              onChange={(e) => setAuditNotes(prev => ({...prev, [prefixBase]: e.target.value}))}
            />
            <button
              onClick={() => handleMicClick(prefixBase)}
              className={`p-2 rounded-full transition-all ${listeningKey === prefixBase ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
              title="Dictar nota global"
            >🎤</button>
          </div>
        </div>
      </div>
    );
  };

  const renderDynamicRooms = (count: number, tipo: TipoRecinto, prefixBase: string, label: string) => {
    const rooms = [];
    const isComposite = tipo === 'dormitorio' || tipo === 'bano';
    for (let i = 1; i <= count; i++) {
      const prefix = `${prefixBase}${i}`;
      if (isComposite) {
        // dormitorios: composite + closets con AuditRow legacy
        // baños: composite (artefactos ya incluido en getCompositeItemsByRecinto)
        const extraGrupos = tipo === 'dormitorio'
          ? getGruposByRecinto('dormitorio').filter(g => g.key === 'closets')
          : undefined;
        rooms.push(
          <div key={prefix} className="mb-4 pl-3 border-l-2 border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-sm text-slate-300">{label} #{i}</strong>
            </div>
            {renderSectionComposite(tipo as 'dormitorio' | 'bano', prefix, `${label} #${i}`, extraGrupos)}
          </div>
        );
      } else {
        const grupos = getGruposByRecinto(tipo);
        rooms.push(
          <div key={prefix} className="mb-4 pl-3 border-l-2 border-slate-600">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-sm text-slate-300">{label} #{i}</strong>
            </div>
            {renderSectionWithNotes(grupos, prefix, `${label} #${i}`)}
          </div>
        );
      }
    }
    return rooms;
  };

  const renderDynamicOtherRooms = (count: number, tipo: TipoRecinto, prefixBase: string) => {
    const rooms = [];
    for (let i = 1; i <= count; i++) {
      const key = `${prefixBase}${i}`;
      const labelName = otherLabels[key] || `Recinto #${i}`;
      const grupos = getGruposByRecinto(tipo);
      rooms.push(
        <div key={key} className="mb-4 pl-3 border-l-2 border-slate-600">
          <div className="mb-2 flex items-center gap-2">
             <strong className="text-sm text-slate-300"># {i}</strong>
             <input
               type="text"
               className="bg-transparent border-b border-slate-600 text-amber-400 font-bold text-sm focus:border-amber-400 outline-none w-full placeholder-slate-600"
               placeholder="Nombre..."
               value={otherLabels[key] || ''}
               onChange={(e) => setOtherLabels(prev => ({...prev, [key]: e.target.value}))}
             />
          </div>
          {renderSectionWithNotes(grupos, key, labelName)}
        </div>
      );
    }
    return rooms;
  };

  if (!isAuthenticated) return <LoginScreen password={password} setPassword={setPassword} handleLogin={handleLogin} loginError={loginError} />;

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-slate-900 text-xs font-bold text-center py-2 flex items-center justify-center gap-2 no-print">
          <span>📵</span> Sin conexión — Modo offline activo. Mapa y Gemini AI no disponibles. El formulario funciona normalmente.
        </div>
      )}
      <div className={`flex justify-between items-center mb-6 no-print ${!isOnline ? 'mt-8' : ''}`}>
        <h1 className="text-2xl font-bold flex items-center gap-2 text-white">PCF-15™ <span className="font-light text-emerald-400">By Domis v5.2</span></h1>
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

      {/* v5.2 Print Header & Disclaimer */}
      <div className={`hidden mb-8 ${(printMode === 'none') ? 'print:block' : ''}`}>
        <div className="flex justify-between items-start border-b-2 border-slate-300 pb-4 mb-4">
           <div>
             <h1 className="text-2xl font-bold text-black mb-1">PCF-15™ Informe Técnico {printMode === 'fast' ? '(FAST)' : printMode === 'full' ? '(FINANCIERO)' : printMode === 'investor' ? '(ESTRATÉGICO)' : '(CLIENTE)'}</h1>
             <p className="text-sm text-gray-700"><strong>Propiedad:</strong> {property.address} <span className="ml-4"><strong>Cliente:</strong> {client.name}</span></p>
             <div className="text-[10px] text-slate-500 mt-1 font-mono">ID: {auditId} | HASH: {verificationHash}</div>
             <div className="mt-2 text-[9px] text-gray-400 italic bg-gray-50 p-1 border border-gray-200 inline-block">
                Inspección bajo estándares del Manual de Tolerancia CDT y Ley 20.016 (Garantías: 3, 5 y 10 años).
             </div>
           </div>
           <div className="text-right">
              <div className="text-[9px] text-slate-400">{new Date().toLocaleDateString()}</div>
           </div>
        </div>

        {/* PRINT-ONLY TOOL LIST */}
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

      {/* ── FAST PRINT BLOCK — 1 página ── */}
      {printMode === 'fast' && (() => {
        const evaluated = Object.values(auditState);
        const countO = evaluated.filter(s => s.escala === 0).length;
        const countN = evaluated.filter(s => s.escala === 3).length;
        const countM = evaluated.filter(s => s.escala === 2).length;
        const countU = evaluated.filter(s => s.escala === 1).length;
        const deductN = countN * 1;
        const deductM = countM * 4;
        const deductU = countU * 10;
        const totalDeduct = deductN + deductM + deductU;
        const score = Math.max(0, 1000 - totalDeduct);
        const pct = (score / 1000) * 100;
        const scoreColor   = pct >= 85 ? 'text-blue-600'    : pct >= 70 ? 'text-emerald-600' : pct >= 55 ? 'text-amber-500'  : 'text-red-600';
        const barColor     = pct >= 85 ? 'bg-blue-500'      : pct >= 70 ? 'bg-emerald-500'   : pct >= 55 ? 'bg-amber-400'    : 'bg-red-500';
        const borderColor  = pct >= 85 ? 'border-blue-400'  : pct >= 70 ? 'border-emerald-400' : pct >= 55 ? 'border-amber-400' : 'border-red-400';

        return (
          <div className="print:block text-black bg-white" style={{ fontFamily: 'system-ui, sans-serif', padding: '24px 28px' }}>

            {/* ── CABECERA ── */}
            <div className="flex justify-between items-center pb-2 mb-3" style={{ borderBottom: '3px solid #0f172a' }}>
              <div>
                <div className="font-black text-black" style={{ fontSize: 20 }}>PCF-15™ <span style={{ fontWeight: 400, color: '#64748b', fontSize: 13 }}>Ficha Rápida de Evaluación</span></div>
              </div>
              <div className="text-right">
                <div className="font-black" style={{ fontSize: 13, color: '#334155' }}>DOMIS™</div>
                <div style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'monospace' }}>{auditId} · {new Date().toLocaleDateString('es-CL')}</div>
              </div>
            </div>

            {/* ── DATOS + FOTO (lado a lado si hay foto) ── */}
            <div className={`mb-3 ${propertyPhoto ? 'grid gap-3' : ''}`} style={propertyPhoto ? { gridTemplateColumns: '1fr 160px' } : {}}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 12px' }}>
                <div className="grid grid-cols-2 gap-x-6" style={{ fontSize: 10 }}>
                  {[
                    ['Dirección', property.address || '—'],
                    ['Cliente', client.name || '—'],
                    ['ROL SII', property.rol || '—'],
                    ['RUT', client.rut || '—'],
                    ['Tipo', property.type],
                    ['Superficie útil', `${property.m2Useful || '—'} m²`],
                    ['Dormitorios', String(property.dorms)],
                    ['Baños', String(property.baths)],
                  ].map(([label, val]) => (
                    <div key={label} style={{ marginBottom: 3 }}>
                      <span style={{ color: '#94a3b8', fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                      <div style={{ color: '#1e293b', fontWeight: 600 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
              {propertyPhoto && (
                <img src={propertyPhoto} alt="Propiedad" style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }} />
              )}
            </div>

            {/* ── SCORE + BARRA ── */}
            <div className={`mb-3 ${borderColor}`} style={{ border: '3px solid', borderRadius: 12, overflow: 'hidden' }}>
              <div className="grid" style={{ gridTemplateColumns: '1fr 2fr' }}>
                {/* izquierda: base vs lograda */}
                <div style={{ background: '#f1f5f9', borderRight: '2px solid #e2e8f0', padding: '10px 0', textAlign: 'center' }}>
                  <div style={{ fontSize: 8, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Nota Base</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: '#64748b', lineHeight: 1 }}>1000</div>
                  <div style={{ height: 1, background: '#e2e8f0', margin: '6px 12px' }} />
                  <div style={{ fontSize: 8, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Nota Lograda</div>
                  <div className={scoreColor} style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}>{score}</div>
                </div>
                {/* derecha: barra + desglose rápido */}
                <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
                  <div style={{ height: 18, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
                    <div className={barColor} style={{ height: '100%', width: `${pct}%`, borderRadius: 99 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: '#64748b', fontWeight: 700 }}>
                    <span>0</span><span style={{ fontWeight: 900, color: '#0f172a' }}>{pct.toFixed(1)}%</span><span>1000</span>
                  </div>
                  {/* mini tarjetas inline */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, marginTop: 4 }}>
                    {[
                      { letter: 'O', count: countO, deduct: 0,       bg: '#eff6ff', border: '#93c5fd', lc: '#1d4ed8', tc: '#1e40af' },
                      { letter: 'N', count: countN, deduct: deductN,  bg: '#f0fdf4', border: '#86efac', lc: '#16a34a', tc: '#15803d' },
                      { letter: 'M', count: countM, deduct: deductM,  bg: '#fffbeb', border: '#fcd34d', lc: '#d97706', tc: '#b45309' },
                      { letter: 'U', count: countU, deduct: deductU,  bg: '#fef2f2', border: '#fca5a5', lc: '#dc2626', tc: '#b91c1c' },
                    ].map(({ letter, count, deduct, bg, border, lc, tc }) => (
                      <div key={letter} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 8, padding: '6px 4px', textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 900, color: tc }}>{count}</div>
                        <div style={{ display: 'inline-block', background: lc, color: letter === 'M' ? '#1e293b' : '#fff', fontSize: 10, fontWeight: 900, padding: '1px 7px', borderRadius: 4, marginBottom: 2 }}>{letter}</div>
                        <div style={{ fontSize: 8, fontWeight: 700, color: tc }}>{letter === 'O' ? 'Óptimo' : letter === 'N' ? 'Normal' : letter === 'M' ? 'Moderado' : 'Urgente'}</div>
                        <div style={{ fontSize: 9, fontWeight: 900, color: deduct > 0 ? '#dc2626' : '#64748b', marginTop: 2 }}>
                          {deduct > 0 ? `−${deduct}` : '0'} pts
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: 'right', fontSize: 10, color: '#64748b', borderTop: '1px solid #e2e8f0', paddingTop: 4 }}>
                    Total descontado: <strong style={{ color: '#dc2626' }}>−{totalDeduct} pts</strong>
                    <span style={{ marginLeft: 12 }}>Nota lograda: <strong style={{ fontSize: 13 }} className={scoreColor}>{score} / 1000</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── GLOSARIO ── */}
            <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 8 }}>
              <div style={{ fontSize: 8, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Glosario de Evaluación</div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { letter: 'O', name: 'Óptimo',   desc: 'Sin intervención. No descuenta.',        bg: '#eff6ff', border: '#93c5fd', lbg: '#2563eb', lc: '#fff',     tc: '#1d4ed8' },
                  { letter: 'N', name: 'Normal',   desc: 'Mantención básica. −1 pt por ítem.',     bg: '#f0fdf4', border: '#86efac', lbg: '#22c55e', lc: '#fff',     tc: '#15803d' },
                  { letter: 'M', name: 'Moderado', desc: 'Corrección planificada. −4 pts / ítem.', bg: '#fffbeb', border: '#fcd34d', lbg: '#f59e0b', lc: '#1e293b', tc: '#b45309' },
                  { letter: 'U', name: 'Urgente',  desc: 'Acción inmediata. −10 pts por ítem.',    bg: '#fef2f2', border: '#fca5a5', lbg: '#ef4444', lc: '#fff',     tc: '#b91c1c' },
                ].map(({ letter, name, desc, bg, border, lbg, lc, tc }) => (
                  <div key={letter} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: '6px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ background: lbg, color: lc, fontWeight: 900, fontSize: 13, padding: '3px 8px', borderRadius: 5, flexShrink: 0 }}>{letter}</span>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 900, color: tc }}>{name}</div>
                      <div style={{ fontSize: 8, color: '#64748b' }}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 7, color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', marginTop: 8 }}>
                PCF-15™ by DOMIS™ — Nota sobre base 1000 pts · Inspección bajo estándares CDT y Ley 20.016
              </div>
            </div>

          </div>
        );
      })()}

      {/* ── NORMAL PRINT BLOCK — informe técnico completo sin precios ── */}
      {printMode === 'normal' && (() => {
        const allItemsMap = new Map(ALL_ITEMS.map(i => [i.key, i.label]));
        const compositeLabels: Record<string, string> = {
          muro: 'Muro', piso: 'Piso', cielo: 'Cielo', ventana: 'Ventana',
          puerta: 'Puerta', techos: 'Techos', artefactos_bano: 'Artefactos Baño',
          muebles: 'Muebles Cocina', artefactos_cocina: 'Artefactos Cocina',
        };

        const sectionOf = (key: string): string => {
          if (key.startsWith('sys'))    return 'Sistemas Críticos';
          if (key.startsWith('liv'))    return 'Living / Comedor';
          if (key.startsWith('kit'))    return 'Cocina / Logia';
          if (key.startsWith('ext'))    return 'Exterior / Fachada';
          const drmM = key.match(/^drm(\d+)/); if (drmM) return `Dormitorio ${drmM[1]}`;
          const bthM = key.match(/^bth(\d+)/); if (bthM) return `Baño ${bthM[1]}`;
          const stM  = key.match(/^stair(\d+)/); if (stM) return `Escalera ${stM[1]}`;
          const othM = key.match(/^oth(\d+)/); if (othM) return otherLabels[`oth${othM[1]}`] || `Recinto ${othM[1]}`;
          return 'Otros';
        };

        const itemLabelOf = (key: string): string => {
          const subKey = key.replace(/^[a-z]+\d*_/, '');
          return compositeLabels[subKey] || allItemsMap.get(subKey) || subKey.replace(/_/g, ' ');
        };

        const noteKeyOf = (section: string): string => {
          if (section === 'Sistemas Críticos') return 'sys';
          if (section === 'Living / Comedor')  return 'liv';
          if (section === 'Cocina / Logia')    return 'kit';
          if (section === 'Exterior / Fachada') return 'ext';
          const dm = section.match(/^Dormitorio (\d+)/); if (dm) return `drm${dm[1]}`;
          const bm = section.match(/^Baño (\d+)/);       if (bm) return `bth${bm[1]}`;
          return '';
        };

        const escalaMeta: Record<number, { letter: string; name: string; lbg: string; lc: string; bg: string; border: string; tc: string }> = {
          0: { letter: 'O', name: 'Óptimo',   lbg: '#2563eb', lc: '#fff',     bg: '#eff6ff', border: '#93c5fd', tc: '#1d4ed8' },
          3: { letter: 'N', name: 'Normal',   lbg: '#22c55e', lc: '#fff',     bg: '#f0fdf4', border: '#86efac', tc: '#15803d' },
          2: { letter: 'M', name: 'Moderado', lbg: '#f59e0b', lc: '#1e293b', bg: '#fffbeb', border: '#fcd34d', tc: '#b45309' },
          1: { letter: 'U', name: 'Urgente',  lbg: '#ef4444', lc: '#fff',     bg: '#fef2f2', border: '#fca5a5', tc: '#b91c1c' },
        };

        // Agrupar ítems evaluados por sección
        const grouped: Record<string, { key: string; state: AuditScore; label: string; norm?: string }[]> = {};
        Object.entries(auditState).forEach(([key, state]) => {
          const section = sectionOf(key);
          const subKey = key.replace(/^[a-z]+\d*_/, '');
          if (!grouped[section]) grouped[section] = [];
          grouped[section].push({ key, state, label: itemLabelOf(key), norm: ITEM_NORM_MAP[subKey] });
        });

        // Orden canónico de secciones
        const sectionOrder = [
          'Sistemas Críticos', 'Living / Comedor', 'Cocina / Logia',
          ...Array.from({ length: property.dorms }, (_, i) => `Dormitorio ${i + 1}`),
          ...Array.from({ length: property.baths }, (_, i) => `Baño ${i + 1}`),
          ...Array.from({ length: property.stairs }, (_, i) => `Escalera ${i + 1}`),
          'Exterior / Fachada',
        ];
        const sections = [...new Set([...sectionOrder, ...Object.keys(grouped)])].filter(s => grouped[s]?.length);

        const sectionColors: Record<string, string> = {
          'Sistemas Críticos': '#f59e0b', 'Living / Comedor': '#6366f1', 'Cocina / Logia': '#06b6d4',
          'Exterior / Fachada': '#10b981',
        };
        const getSectionColor = (s: string) => {
          if (sectionColors[s]) return sectionColors[s];
          if (s.startsWith('Dormitorio')) return '#8b5cf6';
          if (s.startsWith('Baño')) return '#0ea5e9';
          if (s.startsWith('Escalera')) return '#f97316';
          return '#64748b';
        };

        return (
          <div className="print:block bg-white text-black" style={{ fontFamily: 'system-ui, sans-serif', padding: '28px 32px' }}>

            {/* ── CABECERA ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '4px solid #0f172a', paddingBottom: 10, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a' }}>PCF-15™ <span style={{ fontWeight: 400, color: '#64748b', fontSize: 14 }}>Informe Técnico de Auditoría</span></div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>DOMIS™ — Sistema de Evaluación Inmobiliaria</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>DOMIS™</div>
                <div style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'monospace' }}>{auditId} · {new Date().toLocaleDateString('es-CL')}</div>
              </div>
            </div>

            {/* ── FOTO + DATOS PROPIEDAD ── */}
            <div style={{ display: 'grid', gridTemplateColumns: propertyPhoto ? '1fr 180px' : '1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Datos de la Propiedad & Cliente</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px', fontSize: 11 }}>
                  {[
                    ['Dirección', property.address || '—'],
                    ['Cliente', client.name || '—'],
                    ['ROL SII', property.rol || '—'],
                    ['RUT', client.rut || '—'],
                    ['Tipo', property.type],
                    ['Superficie útil', `${property.m2Useful || '—'} m²`],
                    ['M² Municipal', `${property.m2Municipal || '—'} m²`],
                    ['Orientación', [property.orient1, property.orient2].filter(Boolean).join(' / ') || '—'],
                    ['Dormitorios', String(property.dorms)],
                    ['Baños', String(property.baths)],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span style={{ color: '#94a3b8', fontSize: 8, fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
                      <div style={{ color: '#1e293b', fontWeight: 600 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
              {propertyPhoto && (
                <img src={propertyPhoto} alt="Propiedad" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              )}
            </div>

            {/* ── ENTORNO & PLUSVALÍA ── */}
            {entornoData && (
              <div style={{ marginBottom: 20, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 10, fontWeight: 900, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  📍 Entorno & Plusvalía — Radio 2–4 km · {entornoData.commune?.name || property.address}
                </div>
                {entornoData.commune?.data && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 10, marginBottom: 10 }}>
                    <div><span style={{ fontWeight: 700, color: '#166534' }}>Seguridad:</span> <span style={{ color: '#1e293b' }}>{entornoData.commune.data.safe}</span></div>
                    <div><span style={{ fontWeight: 700, color: '#166534' }}>Basura:</span> <span style={{ color: '#1e293b' }}>{entornoData.commune.data.trash}</span></div>
                    <div><span style={{ fontWeight: 700, color: '#166534' }}>Beneficios:</span> <span style={{ color: '#1e293b' }}>{entornoData.commune.data.benefits}</span></div>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {entornoData.places.filter(p => p.totalCount !== undefined).map((cat, i) => (
                    <div key={i} style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: 7, padding: '6px 8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontWeight: 900, color: '#166534', marginBottom: 3 }}>
                        <span>{cat.label}</span><span>{cat.totalCount}</span>
                      </div>
                      {cat.results?.slice(0, 2).map((r, ri) => (
                        <div key={ri} style={{ fontSize: 8, color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>{r.name.substring(0, 22)}</span>
                          {r.rating && <span style={{ color: '#d97706', fontWeight: 700 }}>{r.rating}★</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── AUDITORÍA TÉCNICA ── */}
            <div style={{ fontSize: 10, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '2px solid #0f172a', paddingBottom: 4, marginBottom: 14 }}>
              Auditoría Técnica
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {sections.map(section => {
                const items = grouped[section];
                const sectionColor = getSectionColor(section);
                const noteKey = noteKeyOf(section);
                const sectionNote = noteKey ? auditNotes[noteKey] : null;

                return (
                  <div key={section} style={{ border: `2px solid ${sectionColor}20`, borderRadius: 10, overflow: 'hidden' }}>
                    {/* Cabecera sección */}
                    <div style={{ background: sectionColor, padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#fff', fontWeight: 900, fontSize: 12 }}>{section}</span>
                      <span style={{ color: '#ffffff99', fontSize: 9 }}>{items.length} ítem{items.length !== 1 ? 's' : ''} evaluado{items.length !== 1 ? 's' : ''}</span>
                    </div>

                    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {items.map(({ key, state, label, norm }) => {
                        const meta = escalaMeta[state.escala ?? 0];
                        return (
                          <div key={key} style={{ background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 8, padding: '8px 10px' }}>
                            {/* Fila principal: badge + label + norm */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ background: meta.lbg, color: meta.lc, fontWeight: 900, fontSize: 12, padding: '2px 9px', borderRadius: 5, flexShrink: 0 }}>
                                {meta.letter}
                              </span>
                              <span style={{ fontWeight: 700, fontSize: 12, color: '#0f172a' }}>{label}</span>
                              {state.qty > 0 && state.qty !== 1 && (
                                <span style={{ fontSize: 9, color: '#64748b', marginLeft: 4 }}>× {state.qty}</span>
                              )}
                              {(state.measureL || state.measureW) && (
                                <span style={{ fontSize: 9, color: '#64748b' }}>
                                  {state.measureL ? `L: ${state.measureL}m` : ''}{state.measureW ? ` A: ${state.measureW}m` : ''}
                                </span>
                              )}
                              {norm && (
                                <span style={{ marginLeft: 'auto', fontSize: 8, color: meta.tc, fontWeight: 700, background: '#fff', padding: '1px 6px', borderRadius: 4, border: `1px solid ${meta.border}`, flexShrink: 0 }}>
                                  {norm}
                                </span>
                              )}
                            </div>

                            {/* Observación */}
                            {state.observation && (
                              <div style={{ fontSize: 10, color: '#334155', background: '#ffffff99', borderRadius: 5, padding: '4px 8px', marginBottom: 4, borderLeft: `3px solid ${meta.lbg}` }}>
                                <span style={{ fontWeight: 700, color: meta.tc }}>Observación: </span>{state.observation}
                              </div>
                            )}

                            {/* Fotos */}
                            {state.photos && state.photos.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                                {state.photos.map((photo, pi) => (
                                  <img key={pi} src={photo} alt={`Foto ${pi + 1}`}
                                    style={{ width: 90, height: 68, objectFit: 'cover', borderRadius: 5, border: `1px solid ${meta.border}` }}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Nota global de sección */}
                      {sectionNote && (
                        <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 7, padding: '6px 10px', fontSize: 10, color: '#334155' }}>
                          <span style={{ fontWeight: 700, color: '#64748b' }}>Notas generales: </span>{sectionNote}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── PIE ── */}
            <div style={{ marginTop: 20, borderTop: '2px solid #e2e8f0', paddingTop: 10, fontSize: 8, color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
              <span>PCF-15™ by DOMIS™ — Informe técnico de auditoría inmobiliaria</span>
              <span>Bajo estándares CDT y Ley 20.016 · {new Date().toLocaleDateString('es-CL')}</span>
            </div>

          </div>
        );
      })()}

      {/* ── FULL / INVESTOR PRINT BLOCK ── */}
      {(printMode === 'full' || printMode === 'investor') && (() => {
        const showInvestor = printMode === 'investor';
        const allItemsMap = new Map(ALL_ITEMS.map(i => [i.key, i.label]));
        const compositeLabels: Record<string, string> = {
          muro: 'Muro', piso: 'Piso', cielo: 'Cielo', ventana: 'Ventana',
          puerta: 'Puerta', techos: 'Techos', artefactos_bano: 'Artefactos Baño',
          muebles: 'Muebles Cocina', artefactos_cocina: 'Artefactos Cocina',
        };
        const sectionOf = (key: string): string => {
          if (key.startsWith('sys'))    return 'Sistemas Críticos';
          if (key.startsWith('liv'))    return 'Living / Comedor';
          if (key.startsWith('kit'))    return 'Cocina / Logia';
          if (key.startsWith('ext'))    return 'Exterior / Fachada';
          const drmM = key.match(/^drm(\d+)/); if (drmM) return `Dormitorio ${drmM[1]}`;
          const bthM = key.match(/^bth(\d+)/); if (bthM) return `Baño ${bthM[1]}`;
          const stM  = key.match(/^stair(\d+)/); if (stM) return `Escalera ${stM[1]}`;
          const othM = key.match(/^oth(\d+)/); if (othM) return otherLabels[`oth${othM[1]}`] || `Recinto ${othM[1]}`;
          return 'Otros';
        };
        const itemLabelOf = (key: string) => {
          const subKey = key.replace(/^[a-z]+\d*_/, '');
          return compositeLabels[subKey] || allItemsMap.get(subKey) || subKey.replace(/_/g, ' ');
        };
        const noteKeyOf = (section: string) => {
          if (section === 'Sistemas Críticos') return 'sys';
          if (section === 'Living / Comedor')  return 'liv';
          if (section === 'Cocina / Logia')    return 'kit';
          if (section === 'Exterior / Fachada') return 'ext';
          const dm = section.match(/^Dormitorio (\d+)/); if (dm) return `drm${dm[1]}`;
          const bm = section.match(/^Baño (\d+)/);       if (bm) return `bth${bm[1]}`;
          return '';
        };
        const escalaMeta: Record<number, { letter: string; lbg: string; lc: string; bg: string; border: string; tc: string }> = {
          0: { letter: 'O', lbg: '#2563eb', lc: '#fff',     bg: '#eff6ff', border: '#93c5fd', tc: '#1d4ed8' },
          3: { letter: 'N', lbg: '#22c55e', lc: '#fff',     bg: '#f0fdf4', border: '#86efac', tc: '#15803d' },
          2: { letter: 'M', lbg: '#f59e0b', lc: '#1e293b', bg: '#fffbeb', border: '#fcd34d', tc: '#b45309' },
          1: { letter: 'U', lbg: '#ef4444', lc: '#fff',     bg: '#fef2f2', border: '#fca5a5', tc: '#b91c1c' },
        };
        const grouped: Record<string, { key: string; state: AuditScore; label: string; norm?: string }[]> = {};
        Object.entries(auditState).forEach(([key, state]) => {
          const section = sectionOf(key);
          const subKey = key.replace(/^[a-z]+\d*_/, '');
          if (!grouped[section]) grouped[section] = [];
          grouped[section].push({ key, state, label: itemLabelOf(key), norm: ITEM_NORM_MAP[subKey] });
        });
        const sectionOrder = [
          'Sistemas Críticos', 'Living / Comedor', 'Cocina / Logia',
          ...Array.from({ length: property.dorms }, (_, i) => `Dormitorio ${i + 1}`),
          ...Array.from({ length: property.baths }, (_, i) => `Baño ${i + 1}`),
          ...Array.from({ length: property.stairs }, (_, i) => `Escalera ${i + 1}`),
          'Exterior / Fachada',
        ];
        const sections = [...new Set([...sectionOrder, ...Object.keys(grouped)])].filter(s => grouped[s]?.length);
        const getSectionColor = (s: string) => {
          if (s === 'Sistemas Críticos') return '#f59e0b';
          if (s === 'Living / Comedor')  return '#6366f1';
          if (s === 'Cocina / Logia')    return '#06b6d4';
          if (s === 'Exterior / Fachada') return '#10b981';
          if (s.startsWith('Dormitorio')) return '#8b5cf6';
          if (s.startsWith('Baño'))       return '#0ea5e9';
          if (s.startsWith('Escalera'))   return '#f97316';
          return '#64748b';
        };

        // Financiero: calcular los 3 escenarios
        const appraisal = fin.avgAppraisal || 0;
        const sc1 = appraisal * 0.8;
        const sc2 = appraisal - totalCapex;
        const sc3 = scenarios[3].offer !== null ? scenarios[3].offer! : (appraisal - (manualCapex !== '' ? Number(manualCapex) : totalCapex));
        const sc4_price = (appraisal - totalCapex) * 0.85;
        const allOffers = [sc1, sc2, sc3].filter(v => v > 0);
        const rangeMin = allOffers.length ? Math.min(...allOffers) : 0;
        const rangeMax = allOffers.length ? Math.max(...allOffers) : 0;

        return (
          <div className="print:block bg-white text-black" style={{ fontFamily: 'system-ui, sans-serif', padding: '28px 32px' }}>

            {/* ── CABECERA ── */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '4px solid #0f172a', paddingBottom: 10, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a' }}>
                  PCF-15™ <span style={{ fontWeight: 400, color: '#64748b', fontSize: 14 }}>{showInvestor ? 'Informe Estratégico (Inversionista)' : 'Informe Financiero Completo'}</span>
                </div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>DOMIS™ — Sistema de Evaluación Inmobiliaria</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#334155' }}>DOMIS™</div>
                <div style={{ fontSize: 9, color: '#94a3b8', fontFamily: 'monospace' }}>{auditId} · {new Date().toLocaleDateString('es-CL')}</div>
              </div>
            </div>

            {/* ── FOTO + DATOS ── */}
            <div style={{ display: 'grid', gridTemplateColumns: propertyPhoto ? '1fr 180px' : '1fr', gap: 16, marginBottom: 16 }}>
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 9, fontWeight: 900, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Datos de la Propiedad & Cliente</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 24px', fontSize: 11 }}>
                  {[
                    ['Dirección', property.address || '—'], ['Cliente', client.name || '—'],
                    ['ROL SII', property.rol || '—'],       ['RUT', client.rut || '—'],
                    ['Tipo', property.type],                ['Superficie útil', `${property.m2Useful || '—'} m²`],
                    ['M² Municipal', `${property.m2Municipal || '—'} m²`], ['Orientación', [property.orient1, property.orient2].filter(Boolean).join(' / ') || '—'],
                    ['Dormitorios', String(property.dorms)], ['Baños', String(property.baths)],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <span style={{ color: '#94a3b8', fontSize: 8, fontWeight: 700, textTransform: 'uppercase' }}>{label}</span>
                      <div style={{ color: '#1e293b', fontWeight: 600 }}>{val}</div>
                    </div>
                  ))}
                </div>
              </div>
              {propertyPhoto && (
                <img src={propertyPhoto} alt="Propiedad" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, border: '1px solid #e2e8f0' }} />
              )}
            </div>

            {/* ── ENTORNO ── */}
            {entornoData && (
              <div style={{ marginBottom: 20, background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 10, padding: '12px 16px' }}>
                <div style={{ fontSize: 10, fontWeight: 900, color: '#15803d', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                  📍 Entorno & Plusvalía — Radio 2–4 km · {entornoData.commune?.name || property.address}
                </div>
                {entornoData.commune?.data && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: 10, marginBottom: 10 }}>
                    <div><span style={{ fontWeight: 700, color: '#166534' }}>Seguridad:</span> <span>{entornoData.commune.data.safe}</span></div>
                    <div><span style={{ fontWeight: 700, color: '#166534' }}>Basura:</span> <span>{entornoData.commune.data.trash}</span></div>
                    <div><span style={{ fontWeight: 700, color: '#166534' }}>Beneficios:</span> <span>{entornoData.commune.data.benefits}</span></div>
                  </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {entornoData.places.filter(p => p.totalCount !== undefined).map((cat, i) => (
                    <div key={i} style={{ background: '#fff', border: '1px solid #bbf7d0', borderRadius: 7, padding: '6px 8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, fontWeight: 900, color: '#166534', marginBottom: 3 }}>
                        <span>{cat.label}</span><span>{cat.totalCount}</span>
                      </div>
                      {cat.results?.slice(0, 2).map((r, ri) => (
                        <div key={ri} style={{ fontSize: 8, color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '80%' }}>{r.name.substring(0, 22)}</span>
                          {r.rating && <span style={{ color: '#d97706', fontWeight: 700 }}>{r.rating}★</span>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── AUDITORÍA CON VALORES ── */}
            <div style={{ fontSize: 10, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '2px solid #0f172a', paddingBottom: 4, marginBottom: 14 }}>
              Auditoría Técnica
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 24 }}>
              {sections.map(section => {
                const items = grouped[section];
                const sectionColor = getSectionColor(section);
                const noteKey = noteKeyOf(section);
                const sectionNote = noteKey ? auditNotes[noteKey] : null;
                const sectionTotal = items.reduce((acc, { state }) => acc + (state.costClp || 0), 0);
                return (
                  <div key={section} style={{ border: `2px solid ${sectionColor}30`, borderRadius: 10, overflow: 'hidden' }}>
                    <div style={{ background: sectionColor, padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#fff', fontWeight: 900, fontSize: 12 }}>{section}</span>
                      <div style={{ textAlign: 'right' }}>
                        {sectionTotal > 0 && (
                          <span style={{ color: '#ffffffcc', fontSize: 10, fontWeight: 700 }}>
                            Subtotal: <strong style={{ color: '#fff' }}>${sectionTotal.toLocaleString('es-CL')} · {uf > 0 ? (sectionTotal / uf).toFixed(1) : '0'} UF</strong>
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {items.map(({ key, state, label, norm }) => {
                        const meta = escalaMeta[state.escala ?? 0];
                        return (
                          <div key={key} style={{ background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 8, padding: '7px 10px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                              <span style={{ background: meta.lbg, color: meta.lc, fontWeight: 900, fontSize: 12, padding: '2px 9px', borderRadius: 5, flexShrink: 0 }}>{meta.letter}</span>
                              <span style={{ fontWeight: 700, fontSize: 12, color: '#0f172a' }}>{label}</span>
                              {state.qty > 0 && state.qty !== 1 && <span style={{ fontSize: 9, color: '#64748b' }}>× {state.qty}</span>}
                              {norm && <span style={{ marginLeft: 'auto', fontSize: 8, color: meta.tc, fontWeight: 700, background: '#fff', padding: '1px 6px', borderRadius: 4, border: `1px solid ${meta.border}`, flexShrink: 0 }}>{norm}</span>}
                              {/* COSTOS */}
                              {(state.costClp || 0) > 0 && (
                                <span style={{ marginLeft: norm ? 4 : 'auto', fontSize: 10, fontWeight: 900, color: '#dc2626', background: '#fef2f2', padding: '1px 8px', borderRadius: 5, border: '1px solid #fca5a5', flexShrink: 0 }}>
                                  ${(state.costClp || 0).toLocaleString('es-CL')} · {uf > 0 ? ((state.costClp || 0) / uf).toFixed(1) : '0'} UF
                                </span>
                              )}
                            </div>
                            {state.observation && (
                              <div style={{ fontSize: 10, color: '#334155', background: '#ffffff99', borderRadius: 5, padding: '3px 8px', marginBottom: 4, borderLeft: `3px solid ${meta.lbg}` }}>
                                <span style={{ fontWeight: 700, color: meta.tc }}>Observación: </span>{state.observation}
                              </div>
                            )}
                            {state.photos && state.photos.length > 0 && (
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4 }}>
                                {state.photos.map((photo, pi) => (
                                  <img key={pi} src={photo} alt={`Foto ${pi + 1}`} style={{ width: 90, height: 68, objectFit: 'cover', borderRadius: 5, border: `1px solid ${meta.border}` }} />
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                      {sectionNote && (
                        <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: 7, padding: '6px 10px', fontSize: 10, color: '#334155' }}>
                          <span style={{ fontWeight: 700, color: '#64748b' }}>Notas generales: </span>{sectionNote}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── TOTAL CAPEX ── */}
            <div style={{ background: '#fef2f2', border: '2px solid #fca5a5', borderRadius: 10, padding: '12px 20px', marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 900, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Remodelación (CAPEX)</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: '#0f172a' }}>${totalCapexClp.toLocaleString('es-CL')} CLP</div>
                <div style={{ fontSize: 14, color: '#b45309', fontWeight: 700 }}>≈ {totalCapex.toLocaleString()} UF</div>
              </div>
            </div>

            {/* ── ANÁLISIS FINANCIERO ── */}
            {appraisal > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 900, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '2px solid #0f172a', paddingBottom: 4, marginBottom: 14 }}>
                  Análisis Financiero
                </div>

                {/* Tasación base */}
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: '10px 14px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: '#64748b', fontWeight: 700 }}>Tasación Comercial (base)</span>
                  <span style={{ fontSize: 16, fontWeight: 900, color: '#0f172a' }}>{Math.round(appraisal).toLocaleString()} UF</span>
                </div>

                {/* 3 escenarios */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                  {[
                    { label: 'Piso Banco (80%)', desc: 'Valor mínimo bancario sobre tasación', offer: sc1, color: '#3b82f6', bg: '#eff6ff', border: '#93c5fd' },
                    { label: 'Técnico (CAPEX)',  desc: 'Tasación menos costo de remodelación', offer: sc2, color: '#10b981', bg: '#f0fdf4', border: '#86efac' },
                    { label: 'Dashboard Manual', desc: 'Oferta ajustada manualmente por inspector', offer: sc3, color: '#f59e0b', bg: '#fffbeb', border: '#fcd34d' },
                  ].map(({ label, desc, offer, color, bg, border }) => (
                    <div key={label} style={{ background: bg, border: `2px solid ${border}`, borderRadius: 10, padding: '10px 12px', textAlign: 'center' }}>
                      <div style={{ fontSize: 9, fontWeight: 900, color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{Math.round(offer).toLocaleString()}</div>
                      <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>UF</div>
                      <div style={{ fontSize: 8, color: '#94a3b8', marginTop: 6, fontStyle: 'italic' }}>{desc}</div>
                    </div>
                  ))}
                </div>

                {/* Rango de negociación */}
                <div style={{ background: '#0f172a', borderRadius: 10, padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Rango de Negociación</div>
                    <div style={{ fontSize: 9, color: '#64748b', fontStyle: 'italic', maxWidth: 280 }}>
                      Los valores anteriores son referencias sugeridas. El margen real de negociación se mueve entre el mínimo y el máximo del rango.
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Mínimo</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#f87171' }}>{Math.round(rangeMin).toLocaleString()} <span style={{ fontSize: 11 }}>UF</span></div>
                      </div>
                      <div style={{ color: '#475569', fontSize: 20, fontWeight: 900 }}>—</div>
                      <div>
                        <div style={{ fontSize: 8, color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Máximo</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#34d399' }}>{Math.round(rangeMax).toLocaleString()} <span style={{ fontSize: 11 }}>UF</span></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* INVESTOR: escenario adicional */}
                {showInvestor && (
                  <div style={{ marginTop: 14, background: '#4c1d95', borderRadius: 10, padding: '14px 20px' }}>
                    <div style={{ fontSize: 10, fontWeight: 900, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>⚡ Análisis Inversionista</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      <div style={{ background: '#3b0764', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Precio Inversionista</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{Math.round(sc4_price).toLocaleString()}</div>
                        <div style={{ fontSize: 9, color: '#a78bfa' }}>UF</div>
                      </div>
                      <div style={{ background: '#3b0764', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>Tasación Final</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: '#fff' }}>{Math.round(appraisal).toLocaleString()}</div>
                        <div style={{ fontSize: 9, color: '#a78bfa' }}>UF</div>
                      </div>
                      <div style={{ background: '#3b0764', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ fontSize: 9, color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>ROI Estimado</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: sc4_price > 0 ? '#34d399' : '#f87171' }}>
                          {sc4_price > 0 ? (((appraisal - totalCapex - sc4_price) / sc4_price) * 100).toFixed(1) : '—'}
                        </div>
                        <div style={{ fontSize: 9, color: '#a78bfa' }}>%</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── PIE ── */}
            <div style={{ borderTop: '2px solid #e2e8f0', paddingTop: 10, fontSize: 8, color: '#94a3b8', display: 'flex', justifyContent: 'space-between' }}>
              <span>PCF-15™ by DOMIS™ — {showInvestor ? 'Informe Estratégico' : 'Informe Financiero Completo'}</span>
              <span>Bajo estándares CDT y Ley 20.016 · {new Date().toLocaleDateString('es-CL')}</span>
            </div>

          </div>
        );
      })()}

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
        {/* FOTO DE PROPIEDAD */}
        <div className="mb-4 flex items-center gap-3">
          <button
            onClick={() => propertyPhotoRef.current?.click()}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 border border-slate-500 text-slate-300 px-3 py-2 rounded text-xs font-bold transition-colors"
          >
            🏠 {propertyPhoto ? 'Cambiar foto propiedad' : 'Agregar foto propiedad'}
          </button>
          {propertyPhoto && (
            <div className="flex items-center gap-2">
              <img src={propertyPhoto} alt="Propiedad" className="h-12 w-16 object-cover rounded border border-slate-600" />
              <button onClick={() => setPropertyPhoto(null)} className="text-red-400 hover:text-red-300 text-xs font-bold">✕</button>
            </div>
          )}
          <input
            type="file" ref={propertyPhotoRef} className="hidden" accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => setPropertyPhoto(ev.target?.result as string);
              reader.readAsDataURL(file);
              if (propertyPhotoRef.current) propertyPhotoRef.current.value = '';
            }}
          />
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
         <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">💰 Análisis Financiero</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Venta Dueño (UF)</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white font-bold text-right" value={fin.ownerVal} onChange={e => setFin({...fin, ownerVal: e.target.value})} /></div>
            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Valor Portal Web (UF)</label><input type="number" className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white font-bold text-right" value={fin.webVal} onChange={e => setFin({...fin, webVal: e.target.value})} /></div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 bg-slate-900/30 p-3 rounded border border-slate-700/50">
           <div>
             <div className="flex items-center justify-between mb-1">
               <label className="text-xs font-bold text-blue-400 uppercase">Tasación 1 (UF)</label>
               <button onClick={() => setAppraisalSource('t1')} className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${appraisalSource === 't1' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>USAR</button>
             </div>
             <input type="number" className={`w-full bg-slate-700 rounded p-2 text-white font-bold text-right border ${appraisalSource === 't1' ? 'border-blue-500' : 'border-slate-600'}`} placeholder="Ej: 5000" value={fin.t1_v} onChange={e => setFin({...fin, t1_v: e.target.value})} />
           </div>
           <div>
             <div className="flex items-center justify-between mb-1">
               <label className="text-xs font-bold text-slate-400 uppercase">Tasación 2 (Opcional)</label>
               <button onClick={() => setAppraisalSource('t2')} className={`text-[10px] font-bold px-2 py-0.5 rounded transition-colors ${appraisalSource === 't2' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}>USAR</button>
             </div>
             <input type="number" className={`w-full bg-slate-700 rounded p-2 text-white font-bold text-right border ${appraisalSource === 't2' ? 'border-blue-500' : 'border-slate-600'}`} placeholder="0" value={fin.t2_v} onChange={e => setFin({...fin, t2_v: e.target.value})} />
           </div>
           <div className="bg-red-900/20 border border-red-800 rounded p-2 flex flex-col justify-center"><label className="block text-[10px] font-bold text-red-400 uppercase mb-0.5">Valor Liquidación (80%)</label><div className="text-lg font-bold text-red-200 text-right">{Math.round(financials.liquidationVal).toLocaleString()} UF</div><div className="text-[9px] text-red-500 font-bold text-right">⚠️ Zona Riesgo Banco</div></div>
         </div>
         <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-4">
             <div className="flex border-b border-slate-600 mb-4 no-print overflow-x-auto">
                <button onClick={() => setActiveScenario(1)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 1 ? 'text-blue-400 border-blue-400 bg-blue-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>🏦 PISO BANCO</button>
                <button onClick={() => setActiveScenario(2)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 2 ? 'text-emerald-400 border-emerald-400 bg-emerald-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>🛠️ TÉCNICO</button>
                <button onClick={() => setActiveScenario(3)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 3 ? 'text-amber-400 border-amber-400 bg-amber-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'}`}>🎛️ DASHBOARD MANUAL</button>
                <button onClick={() => setActiveScenario(4)} className={`px-4 py-2 text-xs font-bold transition-colors border-b-2 whitespace-nowrap ${activeScenario === 4 ? 'text-purple-400 border-purple-400 bg-purple-900/20' : 'text-slate-500 border-transparent hover:text-slate-300'} ${(printMode === 'full' || printMode === 'normal') ? 'hidden' : ''}`}>⚡ INVERSIONISTA</button>
             </div>
             <div className="animate-fade-in">
                 <div className="grid grid-cols-3 gap-4 mb-4">
                     <div className="bg-slate-800 p-2 rounded border border-slate-600">
                         <label className="block text-xs font-bold text-blue-400 mb-1">{financials.labelText} (Base)</label>
                         <div className="text-xl text-white font-bold">{Math.round(financials.baseVal).toLocaleString()} UF</div>
                     </div>
                     <div className="bg-slate-800 p-2 rounded border border-red-900/50">
                         <label className="block text-xs font-bold text-red-400 mb-1">Remodelación (CAPEX)</label>
                         {activeScenario === 3 ? (
                             <input
                                 type="number"
                                 className="w-full bg-slate-900/50 border border-red-500/50 rounded px-2 py-1 text-xl text-red-200 font-bold outline-none focus:border-red-500"
                                 value={manualCapex}
                                 onChange={(e) => setManualCapex(e.target.value === '' ? '' : parseFloat(e.target.value))}
                             />
                         ) : (
                             <div className="text-xl text-red-200 font-bold">-{financials.currentCapex.toLocaleString()} UF</div>
                         )}
                     </div>
                     <div className="bg-emerald-900/30 p-2 rounded border border-emerald-600/50">
                         <label className="block text-xs font-bold text-emerald-400 mb-1">Oferta Sistema</label>
                         {activeScenario === 3 ? (
                             <input
                                 type="number"
                                 className="w-full bg-emerald-900/50 border border-emerald-500/50 rounded px-2 py-1 text-xl text-emerald-400 font-bold outline-none focus:border-emerald-500"
                                 value={Math.round(financials.offerSys)}
                                 onChange={(e) => {
                                     const val = parseFloat(e.target.value);
                                     if (!isNaN(val)) {
                                         setManualCapex(financials.baseVal - val);
                                     }
                                 }}
                             />
                         ) : (
                             <div className="text-xl text-emerald-400 font-bold">{Math.round(financials.offerSys).toLocaleString()} UF</div>
                         )}
                     </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-emerald-900/20 border border-emerald-500/30 p-3 rounded">
                         <label className="block text-xs font-bold text-emerald-400 uppercase mb-1">💰 {displayOfferLabel}</label>
                         {activeScenario === 3 ? (
                             <input
                                 type="number"
                                 className="w-full bg-emerald-900/50 border border-emerald-500 rounded px-2 py-1 text-3xl font-bold text-white outline-none focus:border-emerald-400"
                                 value={scenarios[3].offer !== null ? scenarios[3].offer! : Math.round(financials.offerSys)}
                                 onChange={(e) => {
                                     const val = e.target.value === '' ? null : parseFloat(e.target.value);
                                     setScenarios(prev => ({ ...prev, 3: { ...prev[3], offer: val } }));
                                 }}
                             />
                         ) : (
                             <div className="text-3xl font-bold text-white mb-1">{Math.round(displayOfferSys!).toLocaleString()} UF</div>
                         )}
                     </div>
                     <div className="bg-emerald-900/40 border border-emerald-500 p-3 rounded shadow-lg shadow-emerald-900/30"><label className="block text-xs font-bold text-emerald-300 uppercase mb-1">🤑 AHORRO GENERADO</label><div className="text-3xl font-bold text-white mb-1">{Math.round(financials.savings).toLocaleString()} UF</div></div>
                     <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded">
                         <div className="flex items-center justify-between mb-1">
                             <label className="text-xs font-bold text-blue-400 uppercase">🤝 Honorario Éxito</label>
                             <div className="flex items-center gap-1">
                                 <input type="number" className="w-12 bg-slate-700 border border-blue-500/50 rounded px-1 py-0.5 text-xs text-blue-300 font-bold text-right outline-none" value={successFeePct} onChange={e => setSuccessFeePct(parseFloat(e.target.value) || 10)} min={1} max={100} />
                                 <span className="text-xs text-blue-400 font-bold">%</span>
                             </div>
                         </div>
                         <div className="text-3xl font-bold text-white mb-1">${Math.round(financials.finalCLP / 1000000).toLocaleString()} M</div>
                     </div>
                 </div>
             </div>
         </div>
      </div>

      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('map')}`}>
        <h2 className="text-emerald-400 border-b border-slate-700 pb-2 mb-4 text-lg font-bold">📍 Entorno & Plusvalía</h2>
        <MapComponent
          address={property.address}
          isOnline={isOnline}
          onPlacesLoaded={(places, commune) => setEntornoData({ places, commune })}
        />
      </div>

      <div className={`card bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6 shadow-lg ${getSectionClass('audit')}`}>
        <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-4">
            <h2 className="text-emerald-400 text-lg font-bold">🛠️ Auditoría Técnica PCF-15</h2>
            {printMode === 'fast' && <div className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-bold">RESUMEN EJECUTIVO</div>}
        </div>

        {/* TOGGLE TERRENO / OFICINA */}
        {printMode === 'none' && (
          <div className="flex items-center gap-2 mb-4 no-print">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Modo:</span>
            <div className="flex rounded-lg overflow-hidden border border-slate-600">
              <button
                onClick={() => toggleFieldMode('terreno')}
                className={`px-4 py-1.5 text-xs font-bold transition-colors ${
                  fieldMode === 'terreno'
                    ? 'bg-amber-500 text-slate-900'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >📍 Terreno</button>
              <button
                onClick={() => toggleFieldMode('oficina')}
                className={`px-4 py-1.5 text-xs font-bold transition-colors ${
                  fieldMode === 'oficina'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >💻 Oficina</button>
            </div>
            <span className="text-[10px] text-slate-600 italic">
              {fieldMode === 'terreno' ? 'Medidas · escala · foto · notas' : 'Sub-ítems · tipos · costos'}
            </span>
          </div>
        )}


        <CriticalSummary auditState={auditState} />


        <div className={`space-y-6 ${printMode === 'fast' ? 'hidden' : ''}`}>

          <ToolRegistry tools={tools} setTools={setTools} checklistImg={checklistImg} setChecklistImg={setChecklistImg} />

          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">⚡ Sistemas Críticos (SC)</h3>
             {/* Techos: ítem compuesto con dropdown */}
             <div className="mb-4">
               <div className="flex items-center mb-2 border-b border-amber-500/20 pb-1">
                 <span className="text-xs font-bold text-amber-400 uppercase">Techos</span>
               </div>
               <AuditRowComposite
                 config={COMPOSITE_TECHOS}
                 state={auditState['sys_techos'] || { score: 0, active: false, escala: 0, qty: 0, hasPhoto: false, photoCount: 0, photos: [], cost: 0, observation: '', subGroups: {} }}
                 onChange={u => updateCompositeAuditScore('sys_techos', u, COMPOSITE_TECHOS)}
                 prefix="sys"
                 uf={uf}
                 showCosts={printMode === 'full' || printMode === 'investor' || printMode === 'none'}
                 onMicClick={() => handleMicClick('sys_techos', true)}
                 isListening={listeningKey === 'sys_techos'}
               />
             </div>
             {/* Resto SC (Sistemas Base, Eléctrico, Especiales) con AuditRow original */}
             {renderSectionWithNotes(GRUPOS_SC_COMPLETO.filter(g => g.key !== 'sc_techos'), 'sys', 'Sistemas')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🛋️ Living / Comedor (LC)</h3>
             {renderSectionComposite('living_comedor', 'liv', 'Living')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">💧 Cocina / Logia (CL)</h3>
             {renderSectionComposite('cocina', 'kit', 'Cocina')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🛏️ Dormitorios (D#)</h3>
             {renderDynamicRooms(property.dorms, 'dormitorio', 'drm', 'Dormitorio')}
          </div>
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🚿 Baños (B#)</h3>
             {renderDynamicRooms(property.baths, 'bano', 'bth', 'Baño')}
          </div>
          {property.stairs > 0 && (
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
              <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🪜 Escaleras (E#)</h3>
              {renderDynamicRooms(property.stairs, 'otro', 'stair', 'Escalera')}
            </div>
          )}
          {property.othersCount > 0 && (
            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
              <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🚪 Otros Recintos (O#)</h3>
              {renderDynamicOtherRooms(property.othersCount, 'otro', 'oth')}
            </div>
          )}
          <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
             <h3 className="text-sm font-bold text-amber-500 mb-3 uppercase flex items-center gap-2">🏡 Exterior / Fachada (Fe)</h3>
             {renderSectionWithNotes(GRUPOS_EXTERIOR_COMPLETO, 'ext', 'Exterior')}
          </div>

          <div className="mt-6 border-t border-slate-600 pt-4 bg-red-900/10 p-4 rounded-lg flex justify-between items-center">
            <h3 className="text-red-400 font-bold uppercase text-sm md:text-base">🚨 Costo Total Remodelación (Capex)</h3>
            <div className="flex flex-col items-end">
              <div className="text-xl md:text-2xl font-bold text-white">
                {totalCapexClp.toLocaleString('es-CL')} CLP
              </div>
              <div className="text-base text-amber-400">
                ≈ {totalCapex.toLocaleString()} UF
              </div>
            </div>
          </div>
        </div>
      </div>

      <PortalSection toggles={portalToggles} setToggles={setPortalToggles} desc={portalDesc} setDesc={setPortalDesc} onGenerateAi={generateDescription} isGenerating={aiGenerating} isOnline={isOnline} className={getSectionClass('portal')} />

      {/* TECHNICAL LEGEND */}
      <div className={getSectionClass('guide')}>
        <TechnicalGuide />
      </div>

      {/* NORMATIVE ANNEX (VISIBLE IN ALL PRINTS EXCEPT WORK ORDER) */}
      {printMode !== 'work_order' && printMode !== 'none' && <NormativeAnnex />}

      {/* WORK ORDER COMPONENT (ONLY VISIBLE IN WORK_ORDER MODE) */}
      {printMode === 'work_order' && <WorkOrder auditState={auditState} propertyAddress={property.address} />}

      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-700 p-4 flex justify-between items-center z-40 no-print">
         <div className="flex gap-2">
            <button onClick={() => { if(confirm("¿Generar y Descargar PACK (JSON + FOTOS)?")) handleSaveData(); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded font-bold text-xs transition-colors shadow-lg shadow-emerald-900/50">💾 GUARDAR PACK</button>
            <button onClick={handleLoadAutosave} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-bold text-xs transition-colors border border-slate-600" title="Restaurar último guardado automático en este dispositivo">🔄 AUTOSAVE</button>
            <button onClick={() => fileInputRef.current?.click()} className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded font-bold text-xs transition-colors border border-slate-600" title="Abrir ficha archivada (ZIP o JSON)">📂 Abrir Ficha</button>
            <input type="file" ref={fileInputRef} className="hidden" accept="application/json,.zip" onChange={handleLoadData} />
            <button onClick={handleClearForm} className="bg-red-900/50 hover:bg-red-800 text-red-400 px-3 py-2 rounded font-bold text-xs transition-colors border border-red-800" title="Borrar ficha actual">🗑️</button>
         </div>
         <div className="flex gap-2">
             <button onClick={() => handlePrintReport('fast')} className="bg-amber-600 hover:bg-amber-500 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Ficha rápida con nota /1000">⚡ FAST</button>
             <button onClick={() => handlePrintReport('normal')} className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Auditoría completa sin precios">📄 NORMAL</button>
             <button onClick={() => handlePrintReport('full')} className="bg-emerald-700 hover:bg-emerald-600 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Auditoría + costos + análisis financiero">💰 FULL</button>
             <button onClick={() => handlePrintReport('investor')} className="bg-purple-700 hover:bg-purple-600 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Informe estratégico con análisis inversionista">📊 INVESTOR</button>
             <button onClick={() => handlePrintReport('work_order')} className="bg-slate-100 hover:bg-white text-black border border-slate-400 px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg" title="Orden de Trabajo para Contratista">👷 WORK ORDER</button>
             <button onClick={handleWhatsapp} className="bg-green-600 hover:bg-green-500 text-white px-3 py-2 rounded font-bold text-xs transition-colors shadow-lg">📱</button>
         </div>
      </div>
    </div>
  );
};

export default App;
