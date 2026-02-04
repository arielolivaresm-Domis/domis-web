export interface AuditItemConfig {
  id: string;
  l: string; // Label
  t: 'm2' | 'cnt' | 'fix' | 'spec'; // Type
  v?: number; // Value/Cost per unit
  ph?: string; // Placeholder
}

export interface AuditScore {
  score: number; // 0-7
  qty: number;
  hasPhoto: boolean;
  photoCount?: number;
  photos?: string[];
  cost: number;
  observation?: string;
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
  offer: number | null;
  margin: number;
}

export type Scenarios = {
  1: ScenarioData;
  2: ScenarioData;
  3: ScenarioData;
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