// Comparador "Nueva con subsidio vs Usada con DOMIS™".
// Usa el mismo motor que el simulador (calcularCredito) para ambos lados, así
// los números son comparables. El costo total siempre incluye pie, gastos,
// timbres, extras, remodelación y honorarios — nunca solo la suma de dividendos.
import { calcularCredito, type ResultadoCredito } from './hipoteca';
import {
  HONORARIOS,
  REMODELACION,
  TIMBRES_GENERAL_PCT,
  TIMBRES_NUEVA_DFL2_PCT,
  TRAMO_4000,
  type NivelRemodelacion,
} from './config';

export type Perfil = 'vivir' | 'invertir';

export interface EntradaNueva {
  precioUF: number;
  piePct: number;
  tasa: number;
  extrasUF: number;        // estacionamiento/bodega aparte + equipamiento (al contado)
  esperaMeses: number;     // compra en verde/blanco
  arriendoMesUF: number;   // arriendo que se sigue pagando mientras se espera
}

export interface EntradaUsada {
  publicadoUF: number;
  descuentoPct: number;    // negociación
  piePct: number;
  tasa: number;
  remodelacion: NivelRemodelacion;
  remodelacionManualUF: number;
  tramo4000: boolean;      // simulación: subsidio UF 400 + tasa subsidiada
  tasaTramo4000: number;
}

export interface Comunes {
  m2: number;
  banos: number;
  plazoAnios: number;
  perfil: Perfil;
  ufCLP: number;
}

export interface Lado {
  credito: ResultadoCredito;
  precioFinalUF: number;
  inicialUF: number;       // plata al inicio
  totalUF: number;         // costo total real a N años
  costoM2UF: number;       // (precio + extras/remodelación + honorarios) / m²
  dividendoUF: number;
  rentaUF: number;
}

export interface LadoUsada extends Lado {
  ahorroNegociacionUF: number;
  remodelacionUF: number;
  honorarios: { auditoriaCLP: number; creditoF1CLP: number; comisionCLP: number; totalUF: number; fase2: boolean };
  subsidioUF: number;
  tramo4000Aplica: boolean;
}

export function costoRemodelacionUF(nivel: NivelRemodelacion, m2: number, banos: number, manualUF: number, ufCLP: number): number {
  if (nivel === 'ninguna') return 0;
  if (nivel === 'manual') return Math.max(manualUF, 0);
  const p = REMODELACION[nivel];
  const neto = p.porM2 * m2 + p.fijo + p.porBano * banos;
  return (neto * (1 + HONORARIOS.iva)) / ufCLP;
}

export function honorariosDomis(m2: number, ahorroUF: number, perfil: Perfil, ufCLP: number) {
  const auditoriaNeto = Math.max(HONORARIOS.auditoriaUsadaM2 * m2, HONORARIOS.auditoriaMinimoNeto);
  const auditoriaCLP = auditoriaNeto * (1 + HONORARIOS.iva);
  // Sin ahorro negociado no hay Fase 2: solo auditoría, sin crédito del 60%.
  const fase2 = ahorroUF > 0;
  const pct = perfil === 'invertir' ? HONORARIOS.comisionInversionPct : HONORARIOS.comisionVivirPct;
  const comisionNeta = fase2 ? Math.max((pct / 100) * ahorroUF * ufCLP, HONORARIOS.anticipoMinimo) : 0;
  const comisionCLP = comisionNeta * (HONORARIOS.comisionConIva ? 1 + HONORARIOS.iva : 1);
  const creditoF1CLP = fase2 ? auditoriaNeto * HONORARIOS.creditoF1Pct : 0;
  const totalCLP = auditoriaCLP - creditoF1CLP + comisionCLP;
  return { auditoriaCLP, creditoF1CLP, comisionCLP, totalUF: totalCLP / ufCLP, fase2 };
}

export function calcularNueva(n: EntradaNueva, c: Comunes): Lado {
  const credito = calcularCredito({
    precioUF: n.precioUF, piePct: n.piePct, bonoPiePct: 0, tasaAnual: n.tasa,
    plazoAnios: c.plazoAnios, timbresPct: TIMBRES_NUEVA_DFL2_PCT,
  });
  const espera = Math.max(n.esperaMeses, 0) * Math.max(n.arriendoMesUF, 0);
  const extras = Math.max(n.extrasUF, 0);
  return {
    credito,
    precioFinalUF: n.precioUF,
    inicialUF: credito.pieUF + credito.gastosOperacionalesUF + extras + espera,
    totalUF: credito.totalPagadoUF + extras + espera,
    costoM2UF: (n.precioUF + extras) / (c.m2 || 1),
    dividendoUF: credito.dividendoMes1UF,
    rentaUF: credito.rentaNecesariaUF,
  };
}

export function calcularUsada(u: EntradaUsada, c: Comunes): LadoUsada {
  const descuento = Math.min(Math.max(u.descuentoPct, 0), 90) / 100;
  const precioFinalUF = u.publicadoUF * (1 - descuento);
  const ahorroNegociacionUF = u.publicadoUF - precioFinalUF;
  const tramo4000Aplica = u.tramo4000 && precioFinalUF <= TRAMO_4000.topeUF;
  const subsidioUF = tramo4000Aplica ? Math.min(TRAMO_4000.subsidioUF, precioFinalUF * (1 - u.piePct / 100)) : 0;

  // El subsidio del Tramo 4.000 se modela como aporte que reduce el préstamo (bono pie).
  const credito = calcularCredito({
    precioUF: precioFinalUF, piePct: u.piePct,
    bonoPiePct: precioFinalUF > 0 ? (subsidioUF / precioFinalUF) * 100 : 0,
    tasaAnual: tramo4000Aplica ? u.tasaTramo4000 : u.tasa,
    plazoAnios: c.plazoAnios, timbresPct: TIMBRES_GENERAL_PCT,
  });
  const remodelacionUF = costoRemodelacionUF(u.remodelacion, c.m2, c.banos, u.remodelacionManualUF, c.ufCLP);
  const honorarios = honorariosDomis(c.m2, ahorroNegociacionUF, c.perfil, c.ufCLP);

  return {
    credito,
    precioFinalUF,
    ahorroNegociacionUF,
    remodelacionUF,
    honorarios,
    subsidioUF,
    tramo4000Aplica,
    inicialUF: credito.pieUF + credito.gastosOperacionalesUF + remodelacionUF + honorarios.totalUF,
    // el aporte del Estado (bono pie) no lo paga el comprador
    totalUF: credito.totalPagadoUF - credito.bonoPieUF + remodelacionUF + honorarios.totalUF,
    costoM2UF: (precioFinalUF + remodelacionUF + honorarios.totalUF) / (c.m2 || 1),
    dividendoUF: credito.dividendoMes1UF,
    rentaUF: credito.rentaNecesariaUF,
  };
}

// % de negociación con el que la usada iguala el costo total de la nueva.
// null si ni con 60% empata; 0 si la usada ya gana sin negociar.
export function descuentoEquilibrio(n: EntradaNueva, u: EntradaUsada, c: Comunes): number | null {
  const objetivo = calcularNueva(n, c).totalUF;
  const total = (d: number) => calcularUsada({ ...u, descuentoPct: d }, c).totalUF;
  if (total(0) <= objetivo) return 0;
  let lo = 0, hi = 60;
  if (total(hi) > objetivo) return null;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    if (total(mid) > objetivo) lo = mid; else hi = mid;
  }
  return hi;
}
