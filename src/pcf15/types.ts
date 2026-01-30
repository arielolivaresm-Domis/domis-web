export interface AuditItemConfig {
  id: string;
  l: string; // Label (Etiqueta)
  t: 'm2' | 'cnt' | 'fix' | 'spec'; // Type (Categoría técnica)
  v?: number; // Value/Cost per unit (Valor unitario)
  ph?: string; // Placeholder
}

export interface AuditScore {
  score: number; // Escala 0-7 (Basado en tu sistema de evaluación)
  qty: number;
  hasPhoto: boolean;
  cost: number;
}

export interface AuditState {
  [key: string]: AuditScore;
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
  offer: number | null; // Oferta manual
  margin: number;
}

export type Scenarios = {
  1: ScenarioData;
  2: ScenarioData;
  3: ScenarioData;
};

export type Orientation = 'N' | 'S' | 'O' | 'P' | ''; // Orientación (Norte, Sur, Oriente, Poniente)

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