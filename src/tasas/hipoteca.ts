// Cálculo de crédito hipotecario — amortización francesa (cuota fija).
// Un solo modelo para todos los números: la cuota usa la tasa nominal y los
// seguros se calculan aparte, mes a mes, sobre su base real. Así el dividendo,
// la tabla de amortización y el desglose siempre cuadran entre sí.
import {
  SEGURO_DESGRAVAMEN_MENSUAL,
  SEGURO_INCENDIO_SISMO_MENSUAL,
  GASTOS_OPERACIONALES_PCT,
  RATIO_DIVIDENDO_RENTA,
} from './config';

export interface EntradaCredito {
  precioUF: number;
  piePct: number;
  bonoPiePct: number;
  tasaAnual: number; // % anual
  plazoAnios: number;
  timbresPct?: number; // impuesto de timbres sobre el préstamo (0,8% general; 0,2% nueva DFL-2)
}

export interface FilaAnual {
  anio: number;          // año del crédito (1..N)
  pagoAnual: number;     // UF — cuota + seguros
  intereses: number;     // UF
  amortizacion: number;  // UF
  seguros: number;       // UF
  saldo: number;         // UF al cierre del año
}

export interface ResultadoCredito {
  pieUF: number;
  bonoPieUF: number;
  prestamoUF: number;
  cuotaUF: number;              // capital + intereses
  seguroDesgravamenMes1: number;
  seguroIncendioMes: number;
  dividendoMes1UF: number;      // cuota + seguros, primer mes
  totalInteresesUF: number;
  totalSegurosUF: number;
  gastosOperacionalesUF: number; // incluye timbres
  timbresUF: number;
  totalPagadoUF: number;        // pie + bono + todos los dividendos + gastos
  rentaNecesariaUF: number;
  tabla: FilaAnual[];
  fechaTermino: Date;
}

export function cuotaFrancesa(prestamo: number, tasaAnual: number, meses: number): number {
  if (prestamo <= 0 || meses <= 0) return 0;
  const i = tasaAnual / 100 / 12;
  if (i === 0) return prestamo / meses;
  return (prestamo * i) / (1 - Math.pow(1 + i, -meses));
}

export function calcularCredito(e: EntradaCredito, hoy = new Date()): ResultadoCredito {
  const piePct = Math.min(Math.max(e.piePct, 0), 100);
  const bonoPct = Math.min(Math.max(e.bonoPiePct, 0), 100 - piePct);
  const pieUF = e.precioUF * (piePct / 100);
  const bonoPieUF = e.precioUF * (bonoPct / 100);
  const prestamoUF = Math.max(e.precioUF - pieUF - bonoPieUF, 0);
  const meses = Math.round(e.plazoAnios * 12);
  const i = e.tasaAnual / 100 / 12;
  const cuotaUF = cuotaFrancesa(prestamoUF, e.tasaAnual, meses);
  const seguroIncendioMes = e.precioUF * SEGURO_INCENDIO_SISMO_MENSUAL;

  const tabla: FilaAnual[] = [];
  let saldo = prestamoUF;
  let totalIntereses = 0;
  let totalSeguros = 0;
  let fila: FilaAnual | null = null;
  const anioInicio = hoy.getFullYear();
  const mesInicio = hoy.getMonth(); // primer dividendo: mes siguiente

  for (let m = 1; m <= meses; m++) {
    const interes = saldo * i;
    const amort = cuotaUF - interes;
    const seguros = saldo * SEGURO_DESGRAVAMEN_MENSUAL + seguroIncendioMes;
    saldo = Math.max(saldo - amort, 0);
    totalIntereses += interes;
    totalSeguros += seguros;

    const anio = Math.ceil(m / 12);
    if (!fila || fila.anio !== anio) {
      if (fila) tabla.push(fila);
      fila = { anio, pagoAnual: 0, intereses: 0, amortizacion: 0, seguros: 0, saldo: 0 };
    }
    fila.pagoAnual += cuotaUF + seguros;
    fila.intereses += interes;
    fila.amortizacion += amort;
    fila.seguros += seguros;
    fila.saldo = saldo;
  }
  if (fila) tabla.push(fila);

  const seguroDesgravamenMes1 = prestamoUF * SEGURO_DESGRAVAMEN_MENSUAL;
  const dividendoMes1UF = cuotaUF + seguroDesgravamenMes1 + seguroIncendioMes;
  const timbresUF = prestamoUF * ((e.timbresPct ?? 0) / 100);
  const gastosOperacionalesUF = prestamoUF * (GASTOS_OPERACIONALES_PCT / 100) + timbresUF;
  const totalPagadoUF = pieUF + bonoPieUF + cuotaUF * meses + totalSeguros + gastosOperacionalesUF;

  return {
    pieUF,
    bonoPieUF,
    prestamoUF,
    cuotaUF,
    seguroDesgravamenMes1,
    seguroIncendioMes,
    dividendoMes1UF,
    totalInteresesUF: totalIntereses,
    totalSegurosUF: totalSeguros,
    gastosOperacionalesUF,
    timbresUF,
    totalPagadoUF,
    rentaNecesariaUF: dividendoMes1UF / RATIO_DIVIDENDO_RENTA,
    tabla,
    fechaTermino: new Date(anioInicio, mesInicio + meses, 1),
  };
}

// Formato chileno
const fmtCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 });
const fmtUF = new Intl.NumberFormat('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtPct = new Intl.NumberFormat('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const clp = (n: number) => fmtCLP.format(Math.round(n));
export const uf = (n: number) => `UF ${fmtUF.format(n)}`;
export const pct = (n: number) => `${fmtPct.format(n)}%`;
