import React from 'react';

/**
 * ESTRUCTURA DE RESULTADOS DE BÚSQUEDA ESPACIAL
 */
export interface PlaceResult {
  name: string;
  rating?: number;
}

/**
 * CATEGORÍAS TÉCNICAS DE AUDITORÍA DE ENTORNO
 * Sincronizado para soportar componentes visuales JSX.
 */
export interface PlaceCategory {
  key?: string;
  type?: string;
  label: string;
  icon?: React.ReactNode; 
  results?: PlaceResult[];
  totalCount?: number;
}