import { CommuneDB } from './types.ts';
import {
  GrupoCosto, ItemCosto,
  GRUPOS_SC, GRUPOS_EXTERIOR,
} from './costos';

// --- PROMPT MAESTRO DOMIS™ ---
export const DOMIS_SYSTEM_PROMPT = `
ACTÚA COMO: Especialista Senior Inmobiliario y Constructor Civil certificado en Chile.
MISIÓN: Ejecutar auditorías técnicas PCF-15 para valorización de activos.
CONOCIMIENTO: Normativa Chilena (OGUC, SEC, RIDAA, NCh).
TONO: Técnico, preciso, directo.
`;

// Base de Datos Normativa Chilena
export const NORMATIVA_DB: Record<string, string> = {
  'sec_gen': 'Norma SEC RIC N°01 - Empalmes y tableros',
  'sec_ench': 'Norma SEC RIC N°10 - Instalaciones de uso general (Enchufes/Alumbrado)',
  'ridaa': 'RIDAA D.S. 50 - Reglamento de Instalaciones Domiciliarias de Agua/Alcantarillado',
  'gas': 'SEC D.S. 66 - Reglamento de instalaciones interiores de gas',
  'oguc_est': 'OGUC Título 5 - Construcción y Estabilidad',
  'oguc_tech': 'OGUC 4.1.10 - Cubiertas y techumbres',
  'oguc_fire': 'OGUC 4.3 - Protección contra Incendios (F)',
  'nch_term': 'NCh 853 - Aislación Térmica y OGUC 4.1.10',
  'nch_acust': 'OGUC 4.1.6 - Aislación Acústica',
  'oguc_alt': 'OGUC 4.1.1 - Altura mínima habitable (2.30m)',
  'oguc_esc': 'OGUC 4.2.7 - Escaleras (Huella mín 28cm, Contrahuella máx 18cm)',
  'nch_vent': 'NCh 1970 - Ventanas y OGUC 4.1.2 (Ventilación)',
  'nch_mob': 'NCh 2184 - Muebles de cocina',
  'sec_art': 'Certificación SEC Obligatoria (Sello QR)',
  'nch_elec': 'NCh 4/2003 (Legacy) o RIC Actuales'
};

// Base de Datos Comunal
export const COMMUNE_DB: CommuneDB = {
  "VITACURA": {
      schools: ["Col. Los Alerces (Top 1)", "Saint George's College", "Colegio Tabancura", "Colegio Santa Úrsula"],
      safe: "1403", trash: "Reciclaje Casa a Casa", benefits: "Tarjeta Mi Vita, Parque Bicentenario"
  },
  "LAS CONDES": {
      schools: ["Col. Cordillera (Top PAES)", "Villa María Academy", "Colegio Los Andes", "Verbo Divino"],
      safe: "1402", trash: "Puntos Limpios Móviles", benefits: "Tarjeta Vecino, Clínica Cordillera"
  },
  "LO BARNECHEA": {
      schools: ["Instituto Hebreo", "The Int. School Nido de Águilas", "Colegio Everest", "Colegio Monte Tabor"],
      safe: "1405", trash: "Punto Limpio Móvil", benefits: "Club Preferente, Globo Vigilancia"
  },
  "LA REINA": {
      schools: ["The Grange School", "Andree English School", "British Royal School", "Colegio Madrigal"],
      safe: "1419", trash: "Reciclaje Dom. / Trebila", benefits: "Tarjeta Ciudad, Parque Mahuida"
  },
  "PROVIDENCIA": {
      schools: ["Col. San Ignacio El Bosque", "The English Institute", "Colegio Cambridge College", "Liceo Tajamar"],
      safe: "1414", trash: "Recicla en Casa", benefits: "SoyProvidencia, Ciclovías"
  },
  "NUNOA": {
      schools: ["Colegio Akros", "Liceo Augusto D'Halmar", "Colegio Suizo", "Manuel de Salas"],
      safe: "1445", trash: "Ñuñoa Recicla", benefits: "Tarjeta Vecino, Cultura"
  },
  "PENALOLEN": {
      schools: ["Colegio Pumahue", "Colegio Mayor", "Pedro de Valdivia", "Altamira"],
      safe: "1461", trash: "Reciclaje Inclusivo", benefits: "Piscina Temperada"
  },
  "PEÑALOLEN": {
      schools: ["Colegio Pumahue", "Colegio Mayor", "Pedro de Valdivia", "Altamira"],
      safe: "1461", trash: "Reciclaje Inclusivo", benefits: "Piscina Temperada"
  },
  "SANTIAGO": {
      schools: ["Instituto Nacional", "Liceo 1 Javiera Carrera", "San Ignacio (Alonso Ovalle)"],
      safe: "1406", trash: "Retiro Diario", benefits: "Red Metro Total"
  },
  "LA FLORIDA": {
      schools: ["Colegio American British", "Colegio Liahona", "Liceo Bicentenario"],
      safe: "1416", trash: "Reciclaje Comunal", benefits: "Club Vive"
  },
  "MACUL": {
      schools: ["Colegio San Marcos", "Liceo Juana de Ibarbourou"],
      safe: "1444", trash: "Puntos verdes", benefits: "Tarjeta Vecino"
  },
  "HUECHURABA": {
      schools: ["Lincoln College", "Boston College", "San Francisco Javier"],
      safe: "1418", trash: "Puntos limpios", benefits: "Conectividad Vespucio"
  },
  "COLINA": {
      schools: ["Colegio San Anselmo", "Colegio Alemán de Chicureo", "San José de Chicureo"],
      safe: "1468", trash: "Reciclaje Chicureo", benefits: "Tarjeta Vecino Colina"
  },
  "MAIPU": {
      schools: ["Colegio San Pedro Poveda", "Liceo Bicentenario de Maipú", "Alicante del Rosal"],
      safe: "1418", trash: "Maipú Recicla", benefits: "SMAPA, Metro"
  }
};

// Amenidades Portal
export const PORTAL_DATA = {
  amb: ['Parrilla', 'Piscina', 'Closets', 'Baño visitas', 'Terraza', 'Comedor', 'Walk-in closet', 'Homeoffice', 'Living', 'Patio', 'Suite', 'Balcón', 'Mansarda', 'Jardín', 'Cocina', 'Logia', 'Playroom', 'Comedor diario'],
  ser: ['Internet', 'Aire Acond.', 'Calefacción', 'TV Cable', 'Gas Natural', 'Generador', 'Energía Solar', 'Conexión Lavadora', 'Agua Corriente', 'Caldera'],
  seg: ['Alarma', 'Conserjería', 'Portón Auto', 'Condominio Cerrado', 'Acceso Controlado', 'Gimnasio', 'Jacuzzi', 'Estac. Visitas', 'Cine', 'Juegos Inf.', 'Áreas Verdes', 'Canchas', 'Salón Fiestas', 'Sauna', 'Quincho']
};

// ============================================================================
// GRUPOS SC LEGACY — 4 ítems originales convertidos de UF × 39.270
// (valor plano en las 3 escalas — son costos fijos globales)
// ============================================================================
export const SC_LEGACY: GrupoCosto = {
  key: 'sc_legacy',
  label: 'Sistemas Base',
  items: [
    { key: 'est',  cod: 'SB-01', label: 'Estructura',   unidad: 'GL', clp: { premium: 19635000, estandar: 19635000, basico: 19635000 } },
    { key: 'elec', cod: 'SB-02', label: 'T. Eléctrico', unidad: 'GL', clp: { premium: 981750,   estandar: 981750,   basico: 981750   } },
    { key: 'agua', cod: 'SB-03', label: 'Red Agua',     unidad: 'GL', clp: { premium: 706860,   estandar: 706860,   basico: 706860   } },
    { key: 'gas',  cod: 'SB-04', label: 'Red Gas',      unidad: 'GL', clp: { premium: 235620,   estandar: 235620,   basico: 235620   } },
  ] as ItemCosto[]
};

// SC completo: legacy primero, luego los 3 grupos nuevos de costos.ts
export const GRUPOS_SC_COMPLETO: GrupoCosto[] = [SC_LEGACY, ...GRUPOS_SC];

// Exterior completo (re-export con alias)
export const GRUPOS_EXTERIOR_COMPLETO: GrupoCosto[] = [...GRUPOS_EXTERIOR];

// ============================================================================
// MAPA NORMATIVO — item.key → clave de NORMATIVA_DB
// ============================================================================
export const ITEM_NORM_MAP: Record<string, string> = {
  // SC Legacy
  est:  'oguc_est',
  elec: 'sec_gen',
  agua: 'ridaa',
  gas:  'gas',
  // SC Eléctrico
  tablero_electrico:        'sec_gen',
  inst_electrica_completa:  'sec_gen',
  cambio_cableado:          'sec_gen',
  proyecto_electrico:       'sec_gen',
  punto_electrico:          'sec_ench',
  // SC Especiales
  calefon_gas:              'gas',
  inst_sanitaria_completa:  'ridaa',
  caneria_cobre:            'ridaa',
  punto_alcantarillado:     'ridaa',
  llave_paso_general:       'ridaa',
  // SC Techos
  techo_asfaltico:          'oguc_tech',
  teja_colonial_ceramica:   'oguc_tech',
  teja_colonial_pvc:        'oguc_tech',
  techo_americano:          'oguc_tech',
  zinc_acanalado:           'oguc_tech',
  superboard_fibrocemento:  'oguc_tech',
  membrana_epdm:            'oguc_tech',
  membrana_epdm_ext:        'oguc_tech',
  estructura_techo_madera:  'oguc_tech',
  // Ventanas
  termopanel_pvc:           'nch_vent',
  // Puertas
  puerta_interior:          'oguc_fire',
  puerta_cortafuego:        'oguc_fire',
  // Muros
  empaste_total_muro:       'nch_term',
  impermeabilizante_muro:   'nch_term',
  tabique_completo:         'nch_term',
  aislante_poliester:       'nch_term',
  // Baños
  wc:                       'ridaa',
  vanitorio_lavamanos:      'ridaa',
  receptaculo_ducha:        'ridaa',
  extraccion_forzada:       'sec_ench',
  // Muebles cocina
  ceramica_muro_cocina:     'nch_mob',
};

// ============================================================================
// Re-exports desde costos.ts para que los consumidores solo importen de constants
// ============================================================================
export type { GrupoCosto, ItemCosto, Escala, TipoRecinto } from './costos';
export { getGruposByRecinto, GRUPOS_SC, GRUPOS_EXTERIOR,
         clpToUf, calcSubtotal, getClpByEscala, UF_VALOR } from './costos';

// Tipos legacy mantenidos para compatibilidad con WorkOrder/CriticalSummary
export type { AuditItemConfig } from './types.ts';
