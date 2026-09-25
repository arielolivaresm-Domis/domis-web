import { useEffect, useState } from 'react';
import { UF_RESPALDO } from './config';

// Valor UF del día desde mindicador.cl, con respaldo local si falla.
export function useValorUF() {
  const [estado, setEstado] = useState<{ valor: number; fecha: string | null; cargando: boolean }>({
    valor: UF_RESPALDO,
    fecha: null,
    cargando: true,
  });
  useEffect(() => {
    let vivo = true;
    fetch('https://mindicador.cl/api/uf')
      .then(r => r.json())
      .then(d => {
        const ult = d?.serie?.[0];
        if (vivo && ult?.valor) {
          setEstado({ valor: ult.valor, fecha: new Date(ult.fecha).toLocaleDateString('es-CL'), cargando: false });
        } else if (vivo) setEstado(s => ({ ...s, cargando: false }));
      })
      .catch(() => vivo && setEstado(s => ({ ...s, cargando: false })));
    return () => { vivo = false; };
  }, []);
  return estado;
}
