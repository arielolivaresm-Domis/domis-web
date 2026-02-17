
export interface AuditItemConfig {
  id: string;
  l: string; // Label
  t: 'm2' | 'cnt' | 'fix' | 'spec'; // Type
  v?: number; // Value/Cost per unit
  ph?: string; // Placeholder
  norm?: string; // Key for Chilean Normative (NCh, SEC, OGUC)
}

export interface AuditScore {
  score: number; // 0-7
  isNa?: boolean; // Suministro Cortado
  qty: number;
  hasPhoto: boolean;
  photoCount?: number; // Count of photos
  photos?: string[]; // Array of Base64 image strings
  cost: number;
  observation?: string; // Nota individual por ítem
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
}

export interface NormativeInfraction {
    id: string;
    label: string; // Falla Común
    ref: string;   // Normativa Vulnerada
    text: string;  // Texto Técnico
    gravity: 'Grave' | 'Leve';
    tags: string[]; // Para filtrado contextual (ej: 'gas', 'bth', 'stair')
}
