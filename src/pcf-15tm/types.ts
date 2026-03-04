export interface AuditItemConfig {
  id: string;
  l: string; // Label
  t: 'm2' | 'cnt' | 'fix' | 'spec'; // Type
  v?: number; // Value/Cost per unit (legacy UF)
  ph?: string; // Placeholder
  norm?: string; // Key for Chilean Normative (NCh, SEC, OGUC)
  clp?: { premium: number; estandar: number; basico: number }; // CLP tiers
  unidad?: string; // 'm²' | 'ml' | 'Uni' | 'GL' | etc.
  cod?: string;    // item code e.g. 'D-02'
}

export interface AuditScore {
  score: number; // legacy 0-7 (kept for backward compat)
  isNa?: boolean; // Suministro Cortado
  qty: number;
  hasPhoto: boolean;
  photoCount?: number; // Count of photos
  photos?: string[]; // Array of Base64 image strings
  cost: number; // in UF (for financial module)
  observation?: string; // Nota individual por ítem
  measureW?: number; // Ancho en metros
  measureL?: number; // Largo en metros
  // v2: cost tier system
  active?: boolean;        // toggle ON (needs work) / OFF (no action)
  escala?: 0 | 1 | 2 | 3; // 0=not set, 1=Premium, 2=Estándar, 3=Básico
  costClp?: number;        // calculated CLP subtotal
}

export interface AuditState {
  [key: string]: AuditScore;
}

export interface ToolData {
  id: string;
  name: string;
  model: string;
  verified: boolean;
}

export interface CommuneData {
  schools: string[];
  safe: string;
  trash: string;
  benefits: string;
}

export interface CommuneDB {
  [key: string]: CommuneData;
}

export interface ScenarioData {
  offer: number | null; // Manual offer override
  margin: number;
}

export type Scenarios = {
  1: ScenarioData;
  2: ScenarioData;
  3: ScenarioData;
  4: ScenarioData;
};

export type Orientation = 'N' | 'S' | 'O' | 'P' | '';

export interface PlaceResult {
  name: string;
  rating?: number;
}

export interface PlaceCategory {
  key?: string;
  type?: string;
  label: string;
  icon?: string;
  results?: PlaceResult[];
  totalCount?: number;
  skipRating?: boolean; // Permitir mostrar resultados con bajo rating (ej: Comisarías)
  radius?: number; // Radio de búsqueda personalizado en metros
}

export interface NormativeInfraction {
    id: string;
    label: string; // Falla Común
    ref: string;   // Normativa Vulnerada
    text: string;  // Texto Técnico
    gravity: 'Grave' | 'Leve';
    tags: string[]; // Para filtrado contextual (ej: 'gas', 'bth', 'stair')
}