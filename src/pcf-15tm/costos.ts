// ============================================================================
// DOMIS™ — TABLA MAESTRA DE COSTOS DE REMODELACIÓN CHILE 2026
// Fuente: Tabla_Costos_Remodelacion_Chile_2026_v2.xlsx
// Valores en CLP neto sin IVA
// Generado: 04-03-2026
// ============================================================================

export const UF_VALOR = 39270
export const clpToUf = (clp: number): number =>
  Math.round((clp / UF_VALOR) * 100) / 100

// ----------------------------------------------------------------------------
// TIPOS
// ----------------------------------------------------------------------------

export type Escala = 1 | 2 | 3 // 1=Premium · 2=Estándar · 3=Básico
export type Unidad = 'm²' | 'ml' | 'Uni' | 'GL' | 'Viaje' | 'Mes' | 'Set' | 'Día' | 'cant'

export interface ClpEscala {
  premium:  number  // escala 1
  estandar: number  // escala 2
  basico:   number  // escala 3
}

export interface ItemCosto {
  key:     string
  cod:     string
  label:   string
  unidad:  Unidad
  clp:     ClpEscala
}

export interface GrupoCosto {
  key:    string
  label:  string
  items:  ItemCosto[]
}

// Función helper: obtener CLP según escala seleccionada
export const getClpByEscala = (item: ItemCosto, escala: Escala): number => {
  if (escala === 1) return item.clp.premium
  if (escala === 2) return item.clp.estandar
  return item.clp.basico
}

// Función helper: calcular subtotal
export const calcSubtotal = (item: ItemCosto, medida: number, escala: Escala): number =>
  medida * getClpByEscala(item, escala)


// ============================================================================
// DEMOLICIÓN
// ============================================================================
export const DEMOLICION: GrupoCosto = {
  key: 'demolicion',
  label: 'Demolición',
  items: [
    {
      key: 'demolicion_tabique',
      cod: 'D-02',
      label: 'Demolición tabique Metalcon',
      unidad: 'm²',
      clp: { premium: 8000, estandar: 5000, basico: 3000 }
    },
    {
      key: 'demolicion_muro_estructural',
      cod: 'D-03',
      label: 'Demolición muro estructural',
      unidad: 'm²',
      clp: { premium: 180000, estandar: 120000, basico: 75000 }
    },
    {
      key: 'retiro_piso',
      cod: 'D-04',
      label: 'Retiro / levante piso existente',
      unidad: 'm²',
      clp: { premium: 6000, estandar: 3500, basico: 2000 }
    },
    {
      key: 'camion_demolicion',
      cod: 'D-01',
      label: 'Camión demolición / retiro escombros',
      unidad: 'Viaje',
      clp: { premium: 250000, estandar: 220000, basico: 210000 }
    },
    {
      key: 'tecle_extraccion',
      cod: 'D-05',
      label: 'Arriendo tecle de extracción (por mes)',
      unidad: 'Mes',
      clp: { premium: 700000, estandar: 500000, basico: 350000 }
    },
  ]
}


// ============================================================================
// TABIQUERÍA
// ============================================================================
export const TABIQUERIA: GrupoCosto = {
  key: 'tabiqueria',
  label: 'Tabiquería',
  items: [
    {
      key: 'tabique_completo',
      cod: 'T-05',
      label: 'Tabique completo (estructura + 2 caras + aislante)',
      unidad: 'm²',
      clp: { premium: 28000, estandar: 23500, basico: 21500 }
    },
    {
      key: 'estructura_metalcon',
      cod: 'T-01',
      label: 'Solo estructura Metalcon (solera + montante)',
      unidad: 'm²',
      clp: { premium: 12000, estandar: 9500, basico: 9000 }
    },
    {
      key: 'forrado_1cara',
      cod: 'T-02',
      label: 'Forrado 1 cara (placa yeso 12.5mm)',
      unidad: 'm²',
      clp: { premium: 7000, estandar: 5500, basico: 5000 }
    },
    {
      key: 'forrado_2caras',
      cod: 'T-03',
      label: 'Forrado 2 caras (placa yeso)',
      unidad: 'm²',
      clp: { premium: 7000, estandar: 5500, basico: 5000 }
    },
    {
      key: 'aislante_poliester',
      cod: 'T-04',
      label: 'Aislante lana de poliéster interior',
      unidad: 'm²',
      clp: { premium: 4000, estandar: 3000, basico: 2500 }
    },
  ]
}


// ============================================================================
// PISO
// ============================================================================
export const PISO: GrupoCosto = {
  key: 'piso',
  label: 'Piso',
  items: [
    {
      key: 'nivelacion_piso',
      cod: 'P-01',
      label: 'Nivelación / afinado de piso',
      unidad: 'm²',
      clp: { premium: 3500, estandar: 2000, basico: 1500 }
    },
    {
      key: 'piso_vinilico',
      cod: 'P-02',
      label: 'Piso vinílico / LVP',
      unidad: 'm²',
      clp: { premium: 45000, estandar: 27000, basico: 20000 }
    },
    {
      key: 'piso_flotante',
      cod: 'P-03',
      label: 'Piso flotante laminado',
      unidad: 'm²',
      clp: { premium: 50000, estandar: 28000, basico: 18000 }
    },
    {
      key: 'porcelanato',
      cod: 'P-04',
      label: 'Porcelanato',
      unidad: 'm²',
      clp: { premium: 85000, estandar: 45000, basico: 32000 }
    },
    {
      key: 'ceramica',
      cod: 'P-05',
      label: 'Cerámica piso',
      unidad: 'm²',
      clp: { premium: 55000, estandar: 32000, basico: 22000 }
    },
    {
      key: 'porcelanato_terraza',
      cod: 'P-06',
      label: 'Porcelanato terraza',
      unidad: 'm²',
      clp: { premium: 90000, estandar: 50000, basico: 35000 }
    },
    {
      key: 'deck_wpc',
      cod: 'P-07',
      label: 'Deck madera / WPC',
      unidad: 'm²',
      clp: { premium: 140000, estandar: 95000, basico: 65000 }
    },
    {
      key: 'guardapolvo',
      cod: 'P-08',
      label: 'Guardapolvo',
      unidad: 'ml',
      clp: { premium: 18000, estandar: 12000, basico: 7000 }
    },
  ]
}


// ============================================================================
// MURO
// ============================================================================
export const MURO: GrupoCosto = {
  key: 'muro',
  label: 'Muro',
  items: [
    {
      key: 'pintura_muro',
      cod: 'M-01',
      label: 'Solo pintura (base en buen estado)',
      unidad: 'm²',
      clp: { premium: 9000, estandar: 7000, basico: 5000 }
    },
    {
      key: 'empaste_pintura_muro',
      cod: 'M-02',
      label: 'Empaste + aparejo + pintura',
      unidad: 'm²',
      clp: { premium: 16000, estandar: 13000, basico: 10500 }
    },
    {
      key: 'empaste_total_muro',
      cod: 'M-03',
      label: 'Empaste total + 3 manos (base deteriorada)',
      unidad: 'm²',
      clp: { premium: 22000, estandar: 17000, basico: 14000 }
    },
    {
      key: 'impermeabilizante_muro',
      cod: 'M-04',
      label: 'Impermeabilizante de muro (zona húmeda)',
      unidad: 'm²',
      clp: { premium: 7000, estandar: 5000, basico: 4000 }
    },
  ]
}


// ============================================================================
// CIELO
// ============================================================================
export const CIELO: GrupoCosto = {
  key: 'cielo',
  label: 'Cielo',
  items: [
    {
      key: 'pintura_cielo',
      cod: 'C-01',
      label: 'Pintura cielo (base en buen estado)',
      unidad: 'm²',
      clp: { premium: 8000, estandar: 6500, basico: 5000 }
    },
    {
      key: 'empaste_pintura_cielo',
      cod: 'C-02',
      label: 'Empaste + aparejo + pintura cielo',
      unidad: 'm²',
      clp: { premium: 15000, estandar: 12000, basico: 9500 }
    },
    {
      key: 'cielo_falso',
      cod: 'C-03',
      label: 'Cielo falso (placa yeso / Superboard)',
      unidad: 'm²',
      clp: { premium: 30000, estandar: 22000, basico: 18000 }
    },
    {
      key: 'cornisa_decorativa',
      cod: 'C-04',
      label: 'Cornisa decorativa (yeso o PVC)',
      unidad: 'ml',
      clp: { premium: 35000, estandar: 22000, basico: 15000 }
    },
  ]
}


// ============================================================================
// VENTANAS
// ============================================================================
export const VENTANAS: GrupoCosto = {
  key: 'ventanas',
  label: 'Ventanas',
  items: [
    {
      key: 'termopanel_pvc',
      cod: 'A-03',
      label: 'Ventana termopanel PVC',
      unidad: 'm²',
      clp: { premium: 350000, estandar: 220000, basico: 150000 }
    },
  ]
}


// ============================================================================
// PUERTAS
// ============================================================================
export const PUERTAS: GrupoCosto = {
  key: 'puertas',
  label: 'Puertas',
  items: [
    {
      key: 'puerta_interior',
      cod: 'RP-01',
      label: 'Puerta interior completa (marco + manilla + barniz)',
      unidad: 'Uni',
      clp: { premium: 380000, estandar: 185000, basico: 130000 }
    },
    {
      key: 'manilla_bisagras',
      cod: 'RP-02',
      label: 'Solo cambio manilla + bisagras',
      unidad: 'Uni',
      clp: { premium: 55000, estandar: 28000, basico: 18000 }
    },
    {
      key: 'puerta_acceso',
      cod: 'A-02',
      label: 'Puerta acceso / entrada',
      unidad: 'Uni',
      clp: { premium: 600000, estandar: 280000, basico: 180000 }
    },
    {
      key: 'puerta_corredera',
      cod: 'A-04',
      label: 'Puerta corredera (supply + rieles)',
      unidad: 'Uni',
      clp: { premium: 1500000, estandar: 800000, basico: 550000 }
    },
    {
      key: 'chapa_inteligente',
      cod: 'RP-03',
      label: 'Chapa inteligente / cerradura digital',
      unidad: 'Uni',
      clp: { premium: 600000, estandar: 250000, basico: 130000 }
    },
    {
      key: 'puerta_cortafuego',
      cod: 'RP-04',
      label: 'Puerta cortafuego EI30/EI60',
      unidad: 'Uni',
      clp: { premium: 1500000, estandar: 750000, basico: 450000 }
    },
  ]
}


// ============================================================================
// CLOSETS (solo dormitorios)
// ============================================================================
export const CLOSETS: GrupoCosto = {
  key: 'closets',
  label: 'Closets',
  items: [
    {
      key: 'closet_melamina',
      cod: 'CL-01',
      label: 'Closet melamina (cuerpo + puertas + herrajes)',
      unidad: 'ml',
      clp: { premium: 700000, estandar: 472500, basico: 300000 }
    },
    {
      key: 'walking_closet',
      cod: 'CL-02',
      label: 'Walking closet a medida (melamina premium)',
      unidad: 'ml',
      clp: { premium: 1200000, estandar: 750000, basico: 550000 }
    },
  ]
}


// ============================================================================
// MUEBLES (solo cocina / logia / pasillos)
// ============================================================================
export const MUEBLES: GrupoCosto = {
  key: 'muebles',
  label: 'Muebles',
  items: [
    {
      key: 'mueble_bajo',
      cod: 'K-01',
      label: 'Mueble bajo con cubierta melamina',
      unidad: 'ml',
      clp: { premium: 750000, estandar: 475000, basico: 350000 }
    },
    {
      key: 'mueble_aereo',
      cod: 'K-02',
      label: 'Mueble aéreo melamina',
      unidad: 'ml',
      clp: { premium: 600000, estandar: 400000, basico: 280000 }
    },
    {
      key: 'meson_granito',
      cod: 'K-03',
      label: 'Mesón / cubierta (granito o cuarzo)',
      unidad: 'ml',
      clp: { premium: 600000, estandar: 320000, basico: 200000 }
    },
    {
      key: 'isla_cocina',
      cod: 'K-05',
      label: 'Isla de cocina (melamina + cubierta)',
      unidad: 'ml',
      clp: { premium: 1000000, estandar: 600000, basico: 450000 }
    },
    {
      key: 'torre_horno',
      cod: 'K-04',
      label: 'Torre horno + microondas',
      unidad: 'Uni',
      clp: { premium: 1200000, estandar: 750000, basico: 500000 }
    },
    {
      key: 'ceramica_muro_cocina',
      cod: 'K-06',
      label: 'Cerámica muro cocina / salpicadero',
      unidad: 'm²',
      clp: { premium: 60000, estandar: 38000, basico: 28000 }
    },
  ]
}


// ============================================================================
// ARTEFACTOS BAÑO (solo baños)
// ============================================================================
export const ARTEFACTOS_BANO: GrupoCosto = {
  key: 'artefactos_bano',
  label: 'Artefactos Baño',
  items: [
    {
      key: 'wc',
      cod: 'BA-01',
      label: 'WC one-piece (supply + instalación + sello)',
      unidad: 'Uni',
      clp: { premium: 600000, estandar: 250000, basico: 120000 }
    },
    {
      key: 'vanitorio_lavamanos',
      cod: 'BA-02',
      label: 'Vanitorio + lavamanos (supply + sifón)',
      unidad: 'Uni',
      clp: { premium: 800000, estandar: 350000, basico: 130000 }
    },
    {
      key: 'griferia_vanitorio',
      cod: 'BA-03',
      label: 'Grifería vanitorio monocomando',
      unidad: 'Uni',
      clp: { premium: 250000, estandar: 110000, basico: 65000 }
    },
    {
      key: 'espejo_led',
      cod: 'BA-04',
      label: 'Espejo retroiluminado LED',
      unidad: 'Uni',
      clp: { premium: 350000, estandar: 130000, basico: 80000 }
    },
    {
      key: 'receptaculo_ducha',
      cod: 'BA-05',
      label: 'Receptáculo ducha 80×80 cm',
      unidad: 'Uni',
      clp: { premium: 600000, estandar: 300000, basico: 200000 }
    },
    {
      key: 'mampara_ducha',
      cod: 'BA-06',
      label: 'Mampara ducha (supply + instalación)',
      unidad: 'Uni',
      clp: { premium: 500000, estandar: 200000, basico: 130000 }
    },
    {
      key: 'griferia_ducha',
      cod: 'BA-07',
      label: 'Grifería ducha monocomando + barra + cabezal',
      unidad: 'Uni',
      clp: { premium: 350000, estandar: 120000, basico: 60000 }
    },
    {
      key: 'tina_banera',
      cod: 'BA-08',
      label: 'Tina / bañera (supply + instalación)',
      unidad: 'Uni',
      clp: { premium: 2000000, estandar: 450000, basico: 200000 }
    },
    {
      key: 'set_accesorios_bano',
      cod: 'BA-09',
      label: 'Set accesorios (toallero + portarollos + percha)',
      unidad: 'Set',
      clp: { premium: 200000, estandar: 90000, basico: 50000 }
    },
    {
      key: 'extraccion_forzada',
      cod: 'BA-10',
      label: 'Ventilador / extracción forzada baño',
      unidad: 'Uni',
      clp: { premium: 150000, estandar: 80000, basico: 50000 }
    },
    {
      key: 'ceramica_muro_bano',
      cod: 'B-01',
      label: 'Cerámica muro baño',
      unidad: 'm²',
      clp: { premium: 75000, estandar: 40000, basico: 28000 }
    },
    {
      key: 'porcelanato_piso_bano',
      cod: 'B-02',
      label: 'Porcelanato piso baño',
      unidad: 'm²',
      clp: { premium: 90000, estandar: 48000, basico: 32000 }
    },
  ]
}


// ============================================================================
// ARTEFACTOS COCINA (solo cocina)
// ============================================================================
export const ARTEFACTOS_COCINA: GrupoCosto = {
  key: 'artefactos_cocina',
  label: 'Artefactos Cocina',
  items: [
    {
      key: 'encimera_gas',
      cod: 'KA-01',
      label: 'Encimera a gas (4 platos)',
      unidad: 'Uni',
      clp: { premium: 400000, estandar: 200000, basico: 150000 }
    },
    {
      key: 'encimera_induccion',
      cod: 'KA-02',
      label: 'Encimera inducción (4 zonas)',
      unidad: 'Uni',
      clp: { premium: 500000, estandar: 250000, basico: 180000 }
    },
    {
      key: 'horno_empotrado',
      cod: 'KA-03',
      label: 'Horno empotrado eléctrico',
      unidad: 'Uni',
      clp: { premium: 700000, estandar: 340000, basico: 200000 }
    },
    {
      key: 'campana_extractor',
      cod: 'KA-04',
      label: 'Campana / extractor cocina',
      unidad: 'Uni',
      clp: { premium: 450000, estandar: 200000, basico: 120000 }
    },
    {
      key: 'lavaplatos',
      cod: 'KA-05',
      label: 'Lavaplatos (supply + fitting)',
      unidad: 'Uni',
      clp: { premium: 300000, estandar: 130000, basico: 80000 }
    },
    {
      key: 'griferia_cocina',
      cod: 'KA-06',
      label: 'Grifería cocina (supply + instalación)',
      unidad: 'Uni',
      clp: { premium: 300000, estandar: 120000, basico: 60000 }
    },
    {
      key: 'llave_paso_cocina',
      cod: 'KA-07',
      label: 'Llave de paso y fitting cocina',
      unidad: 'Uni',
      clp: { premium: 60000, estandar: 35000, basico: 28000 }
    },
  ]
}


// ============================================================================
// SISTEMAS CRÍTICOS — TECHOS
// ============================================================================
export const SC_TECHOS: GrupoCosto = {
  key: 'sc_techos',
  label: 'Techos',
  items: [
    {
      key: 'techo_asfaltico',
      cod: 'TC-01',
      label: 'Techo asfáltico (fieltro + lámina + inst.)',
      unidad: 'm²',
      clp: { premium: 60000, estandar: 38000, basico: 25000 }
    },
    {
      key: 'teja_colonial_ceramica',
      cod: 'TC-02',
      label: 'Teja colonial cerámica (supply + estructura)',
      unidad: 'm²',
      clp: { premium: 160000, estandar: 90000, basico: 55000 }
    },
    {
      key: 'teja_colonial_pvc',
      cod: 'TC-03',
      label: 'Teja colonial PVC / polímero liviana',
      unidad: 'm²',
      clp: { premium: 110000, estandar: 70000, basico: 45000 }
    },
    {
      key: 'techo_americano',
      cod: 'TC-04',
      label: 'Techo americano / Sika-Tex (plano)',
      unidad: 'm²',
      clp: { premium: 90000, estandar: 55000, basico: 35000 }
    },
    {
      key: 'zinc_acanalado',
      cod: 'TC-05',
      label: 'Cubierta zinc acanalado (supply + estructura)',
      unidad: 'm²',
      clp: { premium: 80000, estandar: 50000, basico: 30000 }
    },
    {
      key: 'superboard_fibrocemento',
      cod: 'TC-06',
      label: 'Cubierta Superboard / fibrocemento',
      unidad: 'm²',
      clp: { premium: 100000, estandar: 65000, basico: 40000 }
    },
    {
      key: 'membrana_epdm',
      cod: 'TC-07',
      label: 'Impermeabilización cubierta plana (membrana EPDM)',
      unidad: 'm²',
      clp: { premium: 120000, estandar: 70000, basico: 45000 }
    },
    {
      key: 'canaleta_bajada',
      cod: 'TC-08',
      label: 'Canaleta + bajada aguas lluvias',
      unidad: 'ml',
      clp: { premium: 45000, estandar: 25000, basico: 15000 }
    },
    {
      key: 'estructura_techo_madera',
      cod: 'TC-09',
      label: 'Estructura techo madera (par + nudillo + solera)',
      unidad: 'm²',
      clp: { premium: 55000, estandar: 35000, basico: 20000 }
    },
  ]
}


// ============================================================================
// SISTEMAS CRÍTICOS — INSTALACIONES ELÉCTRICAS
// ============================================================================
export const SC_INSTALACIONES_ELECTRICAS: GrupoCosto = {
  key: 'sc_instalaciones_electricas',
  label: 'Instalaciones Eléctricas',
  items: [
    {
      key: 'inst_electrica_completa',
      cod: 'I-01',
      label: 'Instalación eléctrica completa (global)',
      unidad: 'GL',
      clp: { premium: 7000000, estandar: 3500000, basico: 2500000 }
    },
    {
      key: 'tablero_electrico',
      cod: 'IS-04',
      label: 'Tablero eléctrico nuevo (supply + SEC)',
      unidad: 'Uni',
      clp: { premium: 1200000, estandar: 600000, basico: 350000 }
    },
    {
      key: 'cambio_cableado',
      cod: 'IS-05',
      label: 'Cambio cableado eléctrico completo',
      unidad: 'm²',
      clp: { premium: 40000, estandar: 25000, basico: 15000 }
    },
    {
      key: 'proyecto_electrico',
      cod: 'I-02',
      label: 'Proyecto eléctrico (ingeniería + SEC)',
      unidad: 'GL',
      clp: { premium: 600000, estandar: 350000, basico: 200000 }
    },
    {
      key: 'punto_electrico',
      cod: 'I-04',
      label: 'Punto eléctrico individual (enchufe o interruptor)',
      unidad: 'Uni',
      clp: { premium: 10000, estandar: 5500, basico: 4000 }
    },
  ]
}


// ============================================================================
// SISTEMAS CRÍTICOS — INSTALACIONES ESPECIALES
// ============================================================================
export const SC_INSTALACIONES_ESPECIALES: GrupoCosto = {
  key: 'sc_instalaciones_especiales',
  label: 'Instalaciones Especiales',
  items: [
    {
      key: 'calefon_gas',
      cod: 'IS-01',
      label: 'Calefón a gas tiro forzado (supply + gasfiter)',
      unidad: 'Uni',
      clp: { premium: 900000, estandar: 420000, basico: 250000 }
    },
    {
      key: 'calefon_electrico',
      cod: 'IS-02',
      label: 'Calefón eléctrico / termo acumulador',
      unidad: 'Uni',
      clp: { premium: 700000, estandar: 350000, basico: 180000 }
    },
    {
      key: 'caldera_calefaccion',
      cod: 'IS-03',
      label: 'Caldera / sistema calefacción central',
      unidad: 'Uni',
      clp: { premium: 6000000, estandar: 2500000, basico: 1200000 }
    },
    {
      key: 'inst_sanitaria_completa',
      cod: 'I-03',
      label: 'Instalación sanitaria completa (global)',
      unidad: 'GL',
      clp: { premium: 7000000, estandar: 3500000, basico: 2500000 }
    },
    {
      key: 'caneria_cobre',
      cod: 'IS-06',
      label: 'Cañería agua fría/caliente cobre (por m²)',
      unidad: 'm²',
      clp: { premium: 50000, estandar: 30000, basico: 18000 }
    },
    {
      key: 'punto_alcantarillado',
      cod: 'IS-07',
      label: 'Punto alcantarillado / aguas servidas',
      unidad: 'Uni',
      clp: { premium: 280000, estandar: 150000, basico: 80000 }
    },
    {
      key: 'llave_paso_general',
      cod: 'IS-08',
      label: 'Llave de paso general / sectorización',
      unidad: 'Uni',
      clp: { premium: 120000, estandar: 60000, basico: 35000 }
    },
  ]
}


// ============================================================================
// EXTERIOR / FACHADA
// ============================================================================
export const EXTERIOR_FACHADA: GrupoCosto = {
  key: 'exterior_fachada',
  label: 'Exterior / Fachada',
  items: [
    {
      key: 'pintura_fachada',
      cod: 'E-01',
      label: 'Pintura fachada (lavado + reparación + grano)',
      unidad: 'm²',
      clp: { premium: 25000, estandar: 16000, basico: 10000 }
    },
    {
      key: 'porcelanato_terraza_ext',
      cod: 'P-06',
      label: 'Porcelanato terraza exterior',
      unidad: 'm²',
      clp: { premium: 90000, estandar: 50000, basico: 35000 }
    },
    {
      key: 'deck_wpc_ext',
      cod: 'P-07',
      label: 'Deck WPC exterior',
      unidad: 'm²',
      clp: { premium: 140000, estandar: 95000, basico: 65000 }
    },
    {
      key: 'techo_terraza_policarbonato',
      cod: 'E-03',
      label: 'Techo terraza (policarbonato + estructura)',
      unidad: 'm²',
      clp: { premium: 200000, estandar: 130000, basico: 85000 }
    },
    {
      key: 'membrana_epdm_ext',
      cod: 'TC-07',
      label: 'Membrana EPDM exterior',
      unidad: 'm²',
      clp: { premium: 120000, estandar: 70000, basico: 45000 }
    },
    {
      key: 'canaleta_ext',
      cod: 'TC-08',
      label: 'Canaleta + bajada aguas lluvias',
      unidad: 'ml',
      clp: { premium: 45000, estandar: 25000, basico: 15000 }
    },
    {
      key: 'radier_patio',
      cod: 'E-02',
      label: 'Nivelación + radier patio / terraza simple',
      unidad: 'm²',
      clp: { premium: 80000, estandar: 50000, basico: 35000 }
    },
  ]
}


// ============================================================================
// MANO DE OBRA REFERENCIAL
// ============================================================================
export const MANO_DE_OBRA: GrupoCosto = {
  key: 'mano_de_obra',
  label: 'Mano de Obra (referencia)',
  items: [
    {
      key: 'jornal_maestro_1',
      cod: 'MO-01',
      label: 'Jornal maestro 1ª (diario)',
      unidad: 'Día',
      clp: { premium: 55000, estandar: 45000, basico: 35000 }
    },
    {
      key: 'jornal_ayudante',
      cod: 'MO-02',
      label: 'Jornal ayudante / maestro 2ª (diario)',
      unidad: 'Día',
      clp: { premium: 42000, estandar: 35000, basico: 25000 }
    },
    {
      key: 'equipo_5_hombres',
      cod: 'MO-03',
      label: 'Equipo 5 hombres (por día hábil)',
      unidad: 'Día',
      clp: { premium: 380000, estandar: 320000, basico: 280000 }
    },
  ]
}


// ============================================================================
// MAPA COMPLETO — todos los grupos por módulo
// ============================================================================

// Grupos presentes en TODOS los recintos (orden fijo)
export const GRUPOS_RECINTO: GrupoCosto[] = [
  DEMOLICION,
  TABIQUERIA,
  PISO,
  MURO,
  CIELO,
  VENTANAS,
  PUERTAS,
  // CLOSETS → solo dormitorios, agregar condicionalmente
  // MUEBLES → solo cocina/logia/pasillos, agregar condicionalmente
  // ARTEFACTOS_BANO → solo baños, agregar condicionalmente
  // ARTEFACTOS_COCINA → solo cocina, agregar condicionalmente
]

// Grupos para el módulo Sistemas Críticos
export const GRUPOS_SC: GrupoCosto[] = [
  SC_TECHOS,
  SC_INSTALACIONES_ELECTRICAS,
  SC_INSTALACIONES_ESPECIALES,
]

// Grupos para Exterior / Fachada
export const GRUPOS_EXTERIOR: GrupoCosto[] = [
  EXTERIOR_FACHADA,
]

// Función para construir grupos según tipo de recinto
export type TipoRecinto =
  | 'dormitorio'
  | 'living_comedor'
  | 'cocina'
  | 'bano'
  | 'logia'
  | 'pasillo'
  | 'otro'

export const getGruposByRecinto = (tipo: TipoRecinto): GrupoCosto[] => {
  const base = [...GRUPOS_RECINTO]

  if (tipo === 'dormitorio') {
    base.push(CLOSETS)
  }

  if (tipo === 'cocina' || tipo === 'logia' || tipo === 'pasillo') {
    base.push(MUEBLES)
  }

  if (tipo === 'cocina') {
    base.push(ARTEFACTOS_COCINA)
  }

  if (tipo === 'bano') {
    base.push(ARTEFACTOS_BANO)
  }

  return base
}
