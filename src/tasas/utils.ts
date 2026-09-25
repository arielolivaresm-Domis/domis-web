export const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

// Acepta coma decimal chilena
export const num = (s: string) => {
  const n = parseFloat(s.replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
};
