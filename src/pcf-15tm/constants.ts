import { AuditItemConfig, CommuneDB } from './types.ts';

// --- CONFIGURACIÓN DE COSTOS (UF) ---
export const CFG = {
  elec_spec: { cambio: 1200000, mant: 450000 }, // Valores en CLP para conversión
  m2_paint: 0.25,
  m2_floor: 0.85,
  unit_light: 0.15,
  unit_plug: 0.12
};

// --- PROMPT MAESTRO DOMIS™ ---
export const DOMIS_SYSTEM_PROMPT = `Actúa como un Especialista Senior en Auditoría Inmobiliaria (Ingeniería Civil y Arquitectura). 
Tu objetivo es analizar fallas estructurales, eléctricas y sanitarias bajo normativa chilena (OGUC, RIDAA, RIC). 
Usa un tono técnico, preciso y preventivo. No inventes datos; si no hay información, solicita inspección con instrumental Bosch/FLIR.`;

// --- BASE DE DATOS COMUNAL ---
export const COMMUNE_DB: CommuneDB = {
  "SANTIAGO": {
    schools: ["Instituto Nacional", "Liceo 1", "Colegio San Ignacio"],
    safe: "Patrullaje preventivo 24/7, cámaras municipales activas.",
    trash: "Recolección nocturna diaria. Puntos limpios en parques.",
    benefits: "Acceso a Metro líneas 1, 2, 3, 5. Cercanía a centros médicos."
  },
  "PROVIDENCIA": {
    schools: ["San Ignacio", "Mariano", "Liceo 7"],
    safe: "Seguridad Providencia integrada con Carabineros.",
    trash: "Sistema de reciclaje casa a casa. Alta eficiencia.",
    benefits: "Tarjeta Vecino con descuentos en salud y cultura."
  }
};

// --- ÍTEMS DE AUDITORÍA POR ZONA ---
export const ITEMS = {
  sys: [
    { id: 'elec', l: 'Tablero Eléctrico (Automáticos/Dif)', t: 'spec', v: 0, ph: 'Cant' },
    { id: 'gas', l: 'Red de Gas / Calefón (Sello Verde)', t: 'fix', v: 2.5 },
    { id: 'water', l: 'Matriz Agua / Presión', t: 'fix', v: 1.8 }
  ] as AuditItemConfig[],
  
  liv: [
    { id: 'floor', l: 'Pisos (Flotante/Porcelanato)', t: 'm2', v: 0.85 },
    { id: 'walls', l: 'Muros / Pintura', t: 'm2', v: 0.22 },
    { id: 'win', l: 'Ventanales / Termopanel', t: 'cnt', v: 4.5 }
  ] as AuditItemConfig[],

  kit: [
    { id: 'furn', l: 'Muebles / Cubiertas', t: 'cnt', v: 12.0 },
    { id: 'grif', l: 'Grifería / Lavaplatos', t: 'cnt', v: 2.1 },
    { id: 'oven', l: 'Encimera / Horno / Campana', t: 'fix', v: 8.5 }
  ] as AuditItemConfig[],

  ext: [
    { id: 'paint', l: 'Fachada / Pintura Exterior', t: 'm2', v: 0.35 },
    { id: 'roof', l: 'Techumbre / Canaletas', t: 'fix', v: 15.0 },
    { id: 'garden', l: 'Riego / Paisajismo', t: 'fix', v: 5.0 }
  ] as AuditItemConfig[]
};

export const DORM_ITEMS: AuditItemConfig[] = [
  { id: 'floor', l: 'Piso / Alfombra', t: 'm2', v: 0.75 },
  { id: 'closet', l: 'Clóset / Puertas', t: 'cnt', v: 3.5 },
  { id: 'paint', l: 'Muros / Cielos', t: 'm2', v: 0.22 }
];

export const BATH_ITEMS: AuditItemConfig[] = [
  { id: 'wc', l: 'Sanitarios / WC', t: 'cnt', v: 3.2 },
  { id: 'shower', l: 'Ducha / Tina / Shower', t: 'cnt', v: 7.5 },
  { id: 'vanity', l: 'Vanitorio / Espejo', t: 'cnt', v: 2.8 }
];

export const STAIR_ITEMS: AuditItemConfig[] = [
  { id: 'steps', l: 'Peldaños / Huella', t: 'cnt', v: 0.5 },
  { id: 'rail', l: 'Pasamanos / Seguridad', t: 'fix', v: 4.0 }
];

export const PORTAL_DATA = {
  amb: ['Living', 'Comedor', 'Cocina Tradicional', 'Kitchenette', 'Logia', 'Terraza', 'Escritorio', 'Walk-in Closet'],
  ser: ['Agua Caliente', 'Calefacción central', 'Gas Natural', 'Alarma', 'Citófono'],
  seg: ['Conserjería 24h', 'Portón Eléctrico', 'Cámaras Vigilancia', 'Piscina', 'Quincho', 'Gimnasio']
};

export const NORMATIVA_DB = {
  elec: "Norma RIC N°10: Tableros deben contar con rotulación y protectores diferenciales.",
  gas: "Decreto 66: Instalaciones deben contar con Sello Verde vigente.",
  san: "RIDAA Art 54: Presión mínima en artefactos debe ser 4 m.c.a."
};