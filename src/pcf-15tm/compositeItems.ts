/**
 * compositeItems.ts — PCF-15™ v3
 * Configuración de ítems compuestos para la UX simplificada.
 * Un ítem compuesto agrupa sub-ítems bajo una sola fila:
 *   - Medidas en terreno (L×A, qty)
 *   - Escala 0/1P/2E/3B
 *   - Foto + notas siempre disponibles
 *   - Sub-ítem elegido en oficina (dropdown expandible)
 */

import {
  DEMOLICION, TABIQUERIA, PISO, MURO, CIELO, VENTANAS, PUERTAS,
  SC_TECHOS, ARTEFACTOS_BANO, MUEBLES, ARTEFACTOS_COCINA,
  ItemCosto, Escala, getClpByEscala,
} from './costos';

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface CompositeSubItem {
  key: string;
  shortLabel: string;
  unidad: string;
  clp: { premium: number; estandar: number; basico: number };
}

export interface CompositeGroup {
  key: string;
  label: string;
  hasOnOff: boolean;      // Demolición / Tabiquería tienen ON/OFF propio
  multiSelect: boolean;   // Artefactos permiten selección múltiple
  hasQtyPerItem?: boolean; // Cada ítem seleccionado tiene su propia cantidad (artefactos baño/cocina)
  items: CompositeSubItem[];
}

export interface CompositeItemConfig {
  key: string;
  label: string;
  mainUnidad: 'm²' | 'ml' | 'Uni';
  groups: CompositeGroup[];
  isArtefacto?: boolean;    // ON/OFF = buenas condiciones vs intervención
  autoFromKey?: string;     // Guardapolvo copia measureL desde este ítem
  suppressMainQty?: boolean; // Ocultar input qty principal (cuando hasQtyPerItem maneja las cantidades)
}

// ── Short labels ──────────────────────────────────────────────────────────────

const SL: Record<string, string> = {
  // Demolicion
  demolicion_tabique:          'Tabique',
  demolicion_muro_estructural: 'Muro estructural',
  retiro_piso:                 'Retiro piso',
  // Tabiqueria
  tabique_completo:    'Tabique completo',
  estructura_metalcon: 'Solo estructura',
  forrado_1cara:       'Forrado 1 cara',
  forrado_2caras:      'Forrado 2 caras',
  aislante_poliester:  'Aislante',
  // Muro terminación
  pintura_muro:           'Pintura',
  empaste_pintura_muro:   'Empaste + pintura',
  empaste_total_muro:     'Empaste total',
  impermeabilizante_muro: 'Impermeabilizante',
  // Piso terminación
  nivelacion_piso:     'Nivelación',
  piso_vinilico:       'Vinílico',
  piso_flotante:       'Flotante',
  porcelanato:         'Porcelanato',
  ceramica:            'Cerámica',
  porcelanato_terraza: 'P. terraza',
  deck_wpc:            'Deck WPC',
  guardapolvo:         'Guardapolvo',
  // Cielo terminación
  pintura_cielo:         'Pintura',
  empaste_pintura_cielo: 'Empaste + pintura',
  cielo_falso:           'Cielo falso',
  cornisa_decorativa:    'Cornisa',
  // Ventanas
  termopanel_pvc:  'Termopanel PVC',
  ventana_aluminio: 'Aluminio',
  ventana_clasica:  'Clásica (madera)',
  // Puertas
  puerta_interior:    'Interior',
  manilla_bisagras:   'Manilla + bisagras',
  puerta_acceso:      'Acceso',
  puerta_corredera:   'Corredera',
  chapa_inteligente:  'Chapa inteligente',
  puerta_cortafuego:  'Cortafuego',
  // Techos
  techo_asfaltico:          'Asfáltico',
  teja_colonial_ceramica:   'Colonial cerámica',
  teja_colonial_pvc:        'Colonial PVC',
  techo_americano:          'Americano',
  zinc_acanalado:           'Zinc',
  superboard_fibrocemento:  'Superboard',
  membrana_epdm:            'Impermeabilización',
  canaleta_bajada:          'Canaleta',
  estructura_techo_madera:  'Estructura',
  // Artefactos Baño
  wc:                    'WC',
  vanitorio_lavamanos:   'Vanitorio + lavamanos',
  griferia_vanitorio:    'Grifería vanitorio',
  espejo_led:            'Espejo LED',
  receptaculo_ducha:     'Receptáculo ducha',
  mampara_ducha:         'Mampara',
  griferia_ducha:        'Grifería ducha',
  tina_banera:           'Tina / bañera',
  set_accesorios_bano:   'Set accesorios',
  extraccion_forzada:    'Extracción forzada',
  otro_bano_1:           'Otro 1',
  otro_bano_2:           'Otro 2',
  otro_bano_3:           'Otro 3',
  otro_bano_4:           'Otro 4',
  otro_bano_5:           'Otro 5',
  ceramica_muro_bano:    'Cerámica muro',
  porcelanato_piso_bano: 'Porcelanato piso',
  // Muebles Cocina
  mueble_bajo:        'Mueble bajo',
  mueble_aereo:       'Mueble aéreo',
  meson_granito:      'Mesón',
  isla_cocina:        'Isla',
  torre_horno:        'Torre horno',
  ceramica_muro_cocina: 'Cerámica salpicadero',
  // Artefactos Cocina
  encimera_gas:       'Encimera gas',
  encimera_induccion: 'Encimera inducción',
  horno_empotrado:    'Horno',
  campana_extractor:  'Campana',
  lavaplatos:         'Lavaplatos',
  griferia_cocina:    'Grifería cocina',
  llave_paso_cocina:  'Llave de paso',
  otro_cocina_1:      'Otro 1',
  otro_cocina_2:      'Otro 2',
  otro_cocina_3:      'Otro 3',
  otro_cocina_4:      'Otro 4',
  otro_cocina_5:      'Otro 5',
};

function toSubItems(items: ItemCosto[], keys?: string[]): CompositeSubItem[] {
  const filtered = keys ? items.filter(i => keys.includes(i.key)) : items;
  return filtered.map(item => ({
    key:        item.key,
    shortLabel: SL[item.key] || item.label,
    unidad:     item.unidad,
    clp:        item.clp,
  }));
}

// ── Composite item configs ────────────────────────────────────────────────────

export const COMPOSITE_MURO: CompositeItemConfig = {
  key: 'muro',
  label: 'Muro',
  mainUnidad: 'm²',
  groups: [
    {
      key: 'demolicion',
      label: 'Demolición',
      hasOnOff: true,
      multiSelect: false,
      items: toSubItems(DEMOLICION.items, ['demolicion_tabique', 'demolicion_muro_estructural']),
    },
    {
      key: 'tabiqueria',
      label: 'Tabiquería',
      hasOnOff: true,
      multiSelect: false,
      items: toSubItems(TABIQUERIA.items),
    },
    {
      key: 'terminacion',
      label: 'Terminación',
      hasOnOff: false,
      multiSelect: false,
      items: toSubItems(MURO.items),
    },
  ],
};

export const COMPOSITE_PISO: CompositeItemConfig = {
  key: 'piso',
  label: 'Piso',
  mainUnidad: 'm²',
  autoFromKey: 'muro', // guardapolvo auto-copia measureL desde muro
  groups: [
    {
      key: 'demolicion',
      label: 'Demolición',
      hasOnOff: true,
      multiSelect: false,
      items: toSubItems(DEMOLICION.items, ['retiro_piso']),
    },
    {
      key: 'terminacion',
      label: 'Terminación',
      hasOnOff: false,
      multiSelect: false,
      items: toSubItems(PISO.items),
    },
  ],
};

export const COMPOSITE_CIELO: CompositeItemConfig = {
  key: 'cielo',
  label: 'Cielo',
  mainUnidad: 'm²',
  groups: [
    {
      key: 'terminacion',
      label: 'Terminación',
      hasOnOff: false,
      multiSelect: false,
      items: toSubItems(CIELO.items),
    },
  ],
};

export const COMPOSITE_VENTANA: CompositeItemConfig = {
  key: 'ventana',
  label: 'Ventana',
  mainUnidad: 'm²',
  groups: [
    {
      key: 'tipo',
      label: 'Tipo',
      hasOnOff: false,
      multiSelect: false,
      items: toSubItems(VENTANAS.items),
    },
  ],
};

export const COMPOSITE_PUERTA: CompositeItemConfig = {
  key: 'puerta',
  label: 'Puerta',
  mainUnidad: 'Uni',
  groups: [
    {
      key: 'tipo',
      label: 'Tipo',
      hasOnOff: false,
      multiSelect: false,
      items: toSubItems(PUERTAS.items),
    },
  ],
};

export const COMPOSITE_TECHOS: CompositeItemConfig = {
  key: 'techos',
  label: 'Techos',
  mainUnidad: 'm²',
  groups: [
    {
      key: 'tipo',
      label: 'Tipo de techo',
      hasOnOff: false,
      multiSelect: false,
      items: toSubItems(SC_TECHOS.items),
    },
  ],
};

export const COMPOSITE_ARTEFACTOS_BANO: CompositeItemConfig = {
  key: 'artefactos_bano',
  label: 'Artefactos',
  mainUnidad: 'Uni',
  isArtefacto: true,
  suppressMainQty: true,
  groups: [
    {
      key: 'artefactos',
      label: 'Artefactos',
      hasOnOff: false,
      multiSelect: true,
      hasQtyPerItem: true,
      items: toSubItems(ARTEFACTOS_BANO.items, [
        'wc', 'vanitorio_lavamanos', 'griferia_vanitorio', 'espejo_led',
        'receptaculo_ducha', 'mampara_ducha', 'griferia_ducha', 'tina_banera',
        'set_accesorios_bano', 'extraccion_forzada',
        'otro_bano_1', 'otro_bano_2', 'otro_bano_3', 'otro_bano_4', 'otro_bano_5',
      ]),
    },
  ],
};

export const COMPOSITE_MUEBLES: CompositeItemConfig = {
  key: 'muebles',
  label: 'Muebles',
  mainUnidad: 'ml',
  isArtefacto: true,
  groups: [
    {
      key: 'muebles',
      label: 'Muebles',
      hasOnOff: false,
      multiSelect: true,
      items: toSubItems(MUEBLES.items),
    },
  ],
};

export const COMPOSITE_ARTEFACTOS_COCINA: CompositeItemConfig = {
  key: 'artefactos_cocina',
  label: 'Artefactos Cocina',
  mainUnidad: 'Uni',
  isArtefacto: true,
  suppressMainQty: true,
  groups: [
    {
      key: 'artefactos',
      label: 'Artefactos',
      hasOnOff: false,
      multiSelect: true,
      hasQtyPerItem: true,
      items: toSubItems(ARTEFACTOS_COCINA.items, [
        'encimera_gas', 'encimera_induccion', 'horno_empotrado', 'campana_extractor',
        'lavaplatos', 'griferia_cocina', 'llave_paso_cocina',
        'otro_cocina_1', 'otro_cocina_2', 'otro_cocina_3', 'otro_cocina_4', 'otro_cocina_5',
      ]),
    },
  ],
};

// ── Room composite sets ───────────────────────────────────────────────────────

const COMPOSITE_BASE_RECINTO: CompositeItemConfig[] = [
  COMPOSITE_MURO,
  COMPOSITE_PISO,
  COMPOSITE_CIELO,
  COMPOSITE_VENTANA,
  COMPOSITE_PUERTA,
];

export type TipoRecintoComposite = 'living_comedor' | 'dormitorio' | 'bano' | 'cocina';

export function getCompositeItemsByRecinto(tipo: TipoRecintoComposite): CompositeItemConfig[] {
  const base = [...COMPOSITE_BASE_RECINTO];
  if (tipo === 'bano')   return [...base, COMPOSITE_ARTEFACTOS_BANO];
  if (tipo === 'cocina') return [...base, COMPOSITE_MUEBLES, COMPOSITE_ARTEFACTOS_COCINA];
  return base; // living_comedor, dormitorio (closets se renderizan aparte con AuditRow)
}

// ── Cost calculation ──────────────────────────────────────────────────────────

type SubGroupsState = Record<string, {
  active?: boolean;
  selected?: string;
  selectedMulti?: string[];
  selectedQtys?: Record<string, number>;
  itemLabels?: Record<string, string>;
  priceOverrides?: Record<string, { premium: number; estandar: number; basico: number }>;
}>;

export function calcCompositeCostClp(
  config: CompositeItemConfig,
  state: { subGroups?: SubGroupsState; measureL?: number },
  escala: 0 | 1 | 2 | 3,
  qty: number,
  uf: number,
): { costClp: number; cost: number } {
  if (!escala) return { costClp: 0, cost: 0 };

  let total = 0;
  const sg = state.subGroups || {};

  for (const group of config.groups) {
    const gs = sg[group.key] || {};

    // Skip ON/OFF groups that are turned off
    if (group.hasOnOff && !gs.active) continue;

    if (group.multiSelect) {
      if (group.hasQtyPerItem) {
        // Per-item quantities (artefactos baño/cocina)
        const qtys = gs.selectedQtys || {};
        for (const [key, qty] of Object.entries(qtys)) {
          if (!qty || qty <= 0) continue;
          const item = group.items.find(i => i.key === key);
          if (!item) continue;
          // Usar precio resuelto por referencia si existe, si no usar precio del ítem
          const effectiveClp = gs.priceOverrides?.[key] || item.clp;
          const price = escala === 1 ? effectiveClp.premium
                      : escala === 2 ? effectiveClp.estandar
                      : effectiveClp.basico;
          total += price * qty;
        }
      } else {
        for (const key of (gs.selectedMulti || [])) {
          const item = group.items.find(i => i.key === key);
          if (!item) continue;
          const price = getClpByEscala(item as unknown as ItemCosto, escala as Escala);
          total += price; // Uni × 1
        }
      }
    } else {
      const key = gs.selected;
      if (!key) continue;
      const item = group.items.find(i => i.key === key);
      if (!item) continue;
      const price = getClpByEscala(item as unknown as ItemCosto, escala as Escala);
      // guardapolvo (ml) uses measureL; Uni items use 1; m² items use qty
      const itemQty = item.unidad === 'ml'  ? (state.measureL || 0)
                    : item.unidad === 'Uni' ? 1
                    : qty;
      total += price * itemQty;
    }
  }

  const costClp = total;
  const cost    = uf > 0 ? costClp / uf : 0;
  return { costClp, cost };
}
