// ============================================================================
// Tasas con subsidio + simulador hipotecario — CONFIGURACIÓN CENTRAL
// Todo número editable vive acá. La lógica (hipoteca.ts) y la UI no se tocan
// para actualizar datos.
// ============================================================================

// Identificación del proveedor (Ley 19.496; Ley 19.628 / 21.719: responsable de datos)
export const EMPRESA = {
  marca: 'DOMIS™',
  razonSocial: 'ARAX SpA',
  rut: '77.989.183-6',
  domicilio: 'Santa Elvira 97, Santiago',
  // TODO: confirmar correo de contacto legal (tomado del FAQ del sitio).
  correo: 'arielom@domis.cl',
  whatsapp: '+56 9 2990 1343',
  conservacionDatos: '2 años desde el término de la relación comercial, salvo que el cliente autorice un plazo mayor',
  avisoActualizado: '25-09-2026',
};

// Fecha de la tabla de tasas mostrada en la página.
// Actualizar cada vez que se cambie TASAS_ADSCRITAS.
export const TASAS_ACTUALIZADAS = 'septiembre 2026';

// Tasa promedio de mercado sin subsidio: Banco Central, créditos de vivienda
// en UF a más de 3 años, agosto 2026 (publicado 07-09-2026). VERIFICADO.
export const TASA_MERCADO = 4.04;
export const TASA_MERCADO_FUENTE = 'Banco Central, promedio créditos de vivienda en UF, agosto 2026';

export interface EntidadTasa {
  entidad: string;
  tasa: number;   // % anual UF, con subsidio a la tasa y/o garantía FOGAES
  nota?: string;  // condición relevante de la oferta
  fuente: string; // URL donde se publicó la tasa
}

// Fecha en que se consultaron las tasas de la tabla.
export const TASAS_FECHA_CONSULTA = '24-09-2026';

// Tasas publicadas por cada entidad para créditos con subsidio/FOGAES.
// No existe tabla oficial única por entidad (MINVU/FOGAES no la publica).
// Fuente: sitios de cada banco + DF (20–22-sep-2026), vía investigación Perplexity.
// TODO: re-verificar mensualmente — son ofertas comerciales que cambian.
export const TASAS_ADSCRITAS: EntidadTasa[] = [
  { entidad: 'BancoEstado', tasa: 3.10, nota: 'Hipotecario PRO, con FOGAES, hasta UF 4.000', fuente: 'https://serviumaule.minvu.gob.cl/noticia/minvu-anuncio-nuevo-tramo-4-000-en-expo-vivienda-y-bancoestado-presenta-hipotecario-pro/' },
  { entidad: 'Banco Santander', tasa: 3.30, nota: 'Escrituras firmadas en septiembre', fuente: 'https://banco.santander.cl/personas/credito-hipotecario/subsidio-dividendo' },
  { entidad: 'Bci', tasa: 3.35, nota: 'Con pie desde 20%', fuente: 'https://www.bci.cl/personas/credito-hipotecario' },
  { entidad: 'Banco de Chile', tasa: 3.39, nota: 'Vivienda nueva hasta UF 6.000', fuente: 'https://sitiospublicos.bancochile.cl/personas/beneficios/promociones/credito-hipotecario-fogaes' },
  { entidad: 'Itaú', tasa: 3.49, nota: 'Vivienda nueva hasta UF 6.000', fuente: 'https://www.df.cl/mercados/banca-fintech/mas-alla-de-mk4-bancos-despliegan-ofensiva-para-competir-en-creditos' },
];

// Listado oficial de entidades donde se solicita subsidio a la tasa + FOGAES.
// VERIFICADO en minvu.gob.cl/fogaes (24-sep-2026).
export const ENTIDADES_ADSCRITAS: string[] = [
  'BancoEstado', 'Banco de Chile', 'Banco Santander', 'Bci', 'Banco BICE', 'Itaú',
  'Banco Falabella', 'Banco Internacional', 'Banco Security', 'Banco Consorcio', 'Scotiabank',
  'Coopeuch', 'AMH Penta Vida', 'MetLife', 'Renta Nacional', '4Life', 'Hipotecaria Evoluciona',
  'MyV Hipotecarios',
];

// Condiciones del subsidio — Ley 21.836 (ampliación, promulgada ago-2026).
// Verificado con Gob.cl / Hacienda / Presidencia (24-sep-2026).
export const SUBSIDIO_TOPE_UF = 6000;
export const SUBSIDIO_CUPOS = '80 mil';
export const SUBSIDIO_VIGENCIA = 'el 31 de mayo de 2028';
export const SUBSIDIO_LEY = 'Ley 21.836';

// Tramo 4.000: subsidio a la tasa + FOGAES también para viviendas USADAS.
// Tope, subsidio, ahorro y cupos: VERIFICADO en minvu.gob.cl/nuevo-tramo-4000.
// Que aplique a USADAS: solo prensa (La Tercera, T13, Serviu Maule); la página
// oficial aún no lo dice. TODO: confirmar con reglamento (RSH / ingresos / usadas).
export const TRAMO_4000 = {
  topeUF: 4000,
  topeZonasExtremasUF: 4500,
  subsidioUF: 400,
  ahorroMinimoUF: 200,
  cupos: '5 mil',
  desde: 'noviembre de 2026',
};

// Pie mínimo con garantía estatal FOGAES (%).
export const PIE_MINIMO_FOGAES = 10;

// ----------------------------------------------------------------------------
// Supuestos del simulador
// ----------------------------------------------------------------------------

// Valor UF de respaldo si mindicador.cl no responde.
// Actualizar valor UF manualmente cada cierto tiempo.
export const UF_RESPALDO = 41008;

// Seguro de desgravamen: % mensual sobre el saldo insoluto.
// TODO: confirmar con corredor de seguros real antes de publicar.
export const SEGURO_DESGRAVAMEN_MENSUAL = 0.0002; // 0,02% mensual

// Seguro de incendio + sismo: % mensual sobre el valor de la propiedad.
// TODO: confirmar con corredor de seguros real antes de publicar.
export const SEGURO_INCENDIO_SISMO_MENSUAL = 0.0002; // 0,02% mensual (mercado: 0,015–0,03%)

// Gastos operacionales (tasación, estudio de títulos, notaría, CBR, timbres)
// como % del monto del préstamo. Estimación — varía por banco.
export const GASTOS_OPERACIONALES_PCT = 1;

// Relación dividendo / renta que usan los bancos para aprobar (25%).
export const RATIO_DIVIDENDO_RENTA = 0.25;

// Valores iniciales del simulador
export const DEFAULTS = {
  precioUF: 3500,
  piePct: 20,
  bonoPiePct: 0,
  tasa: TASA_MERCADO,
  plazoAnios: 30,
};

// Rangos de los controles
export const RANGOS = {
  piePct: { min: 0, max: 60 },
  bonoPiePct: { min: 0, max: 20 },
  tasa: { min: 2, max: 8, step: 0.01 },
  plazoAnios: { min: 5, max: 30 },
};

// ============================================================================
// Comparador "Nueva con subsidio vs Usada con DOMIS™"
// ============================================================================

// Impuesto de timbres y estampillas sobre el crédito (% del préstamo).
// General 0,8%; primera venta de vivienda nueva DFL-2: 0,2%.
// Confianza media (guías tributarias). TODO: confirmar con SII.
export const TIMBRES_GENERAL_PCT = 0.8;
export const TIMBRES_NUEVA_DFL2_PCT = 0.2;

// Brecha de precio usada vs nueva en el sector oriente: 10–18% según
// Observatorio Habitacional MINVU (citado en prensa). 15% = valor de trabajo.
export const BRECHA_USADA_ORIENTE = { min: 10, max: 18, trabajo: 15 };

// Descuento negociado DOMIS™: 3 casos documentados (los del sitio /casos).
// "Ahorro negociado" = precio publicado − precio logrado (definición del contrato).
export const DESCUENTO_DOMIS = { min: 9, max: 18, defecto: 10 };
export const CASOS_DOMIS = [
  { comuna: 'Las Condes', pct: 9 },
  { comuna: 'Providencia', pct: 11 },
  { comuna: 'La Reina', pct: 18 },
];
// TODO: período de las operaciones (ej. 'mar-2025 a jun-2026'). Vacío = no se muestra.
export const CASOS_PERIODO = '';

// Honorarios DOMIS™ (reglas publicadas en el sitio: Calculator.tsx y BenefitFlyer.tsx)
export const HONORARIOS = {
  auditoriaUsadaM2: 1600,      // CLP/m² neto
  auditoriaMinimoNeto: 70000,  // CLP neto
  iva: 0.19,
  creditoF1Pct: 0.6,           // 60% de la auditoría neta se descuenta si contrata Fase 2
  comisionVivirPct: 10,        // % del ahorro negociado
  comisionInversionPct: 8,     // % del ahorro negociado — inversionistas
  anticipoMinimo: 400000,      // CLP: se descuenta de la comisión; opera como mínimo
  // Confirmado Ariel 25-sep: comisión y anticipo son NETOS → se muestran con IVA
  // incluido (Ley 19.496 art. 30: el precio informado debe incluir impuestos).
  comisionConIva: true,
  // TODO: confirmar si el inversionista también tiene anticipo y crédito 60% (hoy: sí).
};

// Precio con IVA incluido para mostrar (art. 30 Ley 19.496)
export const conIva = (neto: number) => neto * (1 + HONORARIOS.iva);

// Remodelación: paquetes armados con la tabla maestra DOMIS™ (pcf-15tm/costos.ts,
// columna "estándar" de terminación, CLP neto). Se suma IVA. Cocina y baños son
// montos fijos (no crecen con los m²).
export type NivelRemodelacion = 'ninguna' | 'basico' | 'estandar' | 'integral' | 'manual';
export const REMODELACION: Record<Exclude<NivelRemodelacion, 'ninguna' | 'manual'>, {
  label: string; detalle: string; porM2: number; fijo: number; porBano: number;
}> = {
  // pintura muros (2,7 m² muro por m² piso) + pintura cielo + retiro y piso flotante (86% del área) + guardapolvo
  basico: { label: 'Básica', detalle: 'Pintura, piso flotante y guardapolvo', porM2: 64490, fijo: 0, porBano: 0 },
  // básica + cocina completa (muebles + artefactos) + baños completos + 5 puertas interiores
  estandar: { label: 'Estándar', detalle: 'Básica + cocina, baños y puertas', porM2: 64490, fijo: 3614000 + 925000, porBano: 2324000 },
  // estándar con empaste + instalación eléctrica completa + closets (2 dorm × 2 ml)
  integral: { label: 'Integral', detalle: 'Estándar + empaste, electricidad y closets', porM2: 80690, fijo: 3614000 + 925000 + 3500000 + 1890000, porBano: 2324000 },
};
