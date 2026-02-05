import React from 'react';

export interface AuditItemConfig {
  id: string;
  l: string; // Label
  t: 'm2' | 'cnt' | 'fix' | 'spec'; // Type
  v?: number; // Value/Cost per unit
  ph?: string; // Placeholder
  category?: string; // Categoría para filtrado (Agregado para PCF-15)
}

export interface AuditScore {
  score: number; // 0-7
  qty: number;
  hasPhoto: boolean;
  photoCount?: number; // Count of photos (Legacy, kept for UI)
  photos?: string[]; // Array of Base64 image strings
  cost: number;
  observation?: string; // Nota individual por ítem
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
  offer: number | null; // Manual offer override
  margin: number;
}

export type Scenarios = {
  1: ScenarioData;
  2: ScenarioData;
  3: ScenarioData;
};

// Orientación extendida para soporte total de brújula
export type Orientation = 'N' | 'S' | 'O' | 'P' | 'NE' | 'NW' | 'SE' | 'SW' | '';

export interface PlaceResult {
  name: string;
  rating?: number;
}

export interface PlaceCategory {
  key?: string;
  type?: string;
  label: string;
  icon?: React.ReactNode | string; // Soporta componentes SVG o strings
  results?: PlaceResult[];
  totalCount?: number;
}