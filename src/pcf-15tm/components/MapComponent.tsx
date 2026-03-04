import React, { useEffect, useRef, useState } from 'react';
import { COMMUNE_DB } from '../constants.ts';
import { PlaceCategory } from '../types.ts';

interface MapComponentProps {
  address: string;
  isOnline?: boolean;
}

export const MapComponent: React.FC<MapComponentProps> = ({ address, isOnline = true }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [communeInfo, setCommuneInfo] = useState<{name: string, data: any} | null>(null);
  const [debouncedAddress, setDebouncedAddress] = useState(address);
  const [places, setPlaces] = useState<PlaceCategory[]>([
    { key: 'Colegio', label: 'Colegios' },
    { key: 'Jardín Infantil', label: 'Jardines' },
    { type: 'subway_station', label: 'Metros', skipRating: true, radius: 3000 },
    { type: 'transit_station', label: 'Paraderos', skipRating: true },
    { type: 'police', label: 'Seguridad', icon: '🛡️', skipRating: true, radius: 4000 }, // Radio ampliado y sin filtro de estrellas para Comisarías/PDI
    { type: 'bank', label: 'Bancos' },
    { type: 'park', label: 'Parques' },
    { type: 'supermarket', label: 'S.Mercados' },
    { type: 'shopping_mall', label: 'Malls' },
    { type: 'pharmacy', label: 'Farmacias' },
    { type: 'hospital', label: 'Urgencias', skipRating: true, radius: 4000 }, // Radio ampliado para Hospitales
    { type: 'doctor', label: 'Médicos' }
  ]);

  useEffect(() => {
    if (!address) {
        setDebouncedAddress('');
        setCommuneInfo(null);
        return;
    }
    const timer = setTimeout(() => {
      setDebouncedAddress(address);
    }, 1500);
    return () => clearTimeout(timer);
  }, [address]);

  useEffect(() => {
    (window as any).gm_authFailure = () => {
      console.error("Google Maps Auth Failure");
      setMapError("⛔ BLOQUEO DE SEGURIDAD GOOGLE: La URL actual no está autorizada o falta facturación.");
    };

    if (!debouncedAddress) {
        setCommuneInfo(null);
        setMapError(null);
        return;
    }

    setMapError(null);

    const g = (window as any).google;
    if (g && g.maps) {
        initMap(g, debouncedAddress);
    } else {
        const script = document.querySelector('script[src*="maps.googleapis"]') as HTMLScriptElement | null;
        if (!script) {
            setMapError("Script de Google Maps no encontrado.");
            return;
        }
        const handleLoad = () => {
            const g2 = (window as any).google;
            if (g2 && g2.maps) {
                initMap(g2, debouncedAddress);
            } else {
                setMapError("Google Maps no responde.");
            }
        };
        script.addEventListener('load', handleLoad);
        return () => script.removeEventListener('load', handleLoad);
    }
  }, [debouncedAddress]);

  const initMap = (g: any, searchAddr: string) => {
    const geocoder = new g.maps.Geocoder();
    // 1. FUERZA BÚSQUEDA EN CHILE
    geocoder.geocode({ address: searchAddr + ", Chile", componentRestrictions: { country: 'CL' } }, (results: any, status: any) => {
      if (status !== 'OK' || !results || !results[0]) {
        setMapError(`Dirección no encontrada en Chile: ${status}`);
        return;
      }

      const loc = results[0].geometry.location;

      let communeRaw = "";
      results[0].address_components.forEach((c: any) => {
        if (c.types.includes("locality") || c.types.includes("administrative_area_level_3")) {
          communeRaw = c.long_name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
      });

      const dbData = COMMUNE_DB[communeRaw];
      setCommuneInfo({ name: communeRaw, data: dbData });

      if (mapRef.current) {
        try {
            mapRef.current.innerHTML = '';

            const map = new g.maps.Map(mapRef.current, {
              zoom: 14,
              center: loc,
              styles: []
            });

            new g.maps.Marker({ position: loc, map: map, title: "Propiedad" });

            const service = new g.maps.places.PlacesService(map);
            const newPlaces = [...places];

            const fetchCategory = (index: number) => {
                if (index >= newPlaces.length) return;

                const cat = newPlaces[index];
                const request: any = {
                    location: loc,
                    radius: cat.radius || 2000, // Usar radio personalizado o default 2km
                    keyword: cat.key,
                    type: cat.type
                };

                service.nearbySearch(request, (res: any, status: any) => {
                    if (status === g.maps.places.PlacesServiceStatus.OK && res) {
                        // 2. FILTRO DE CALIDAD INTELIGENTE
                        const goodPlaces = res.filter((p: any) => {
                             // Si es categoría crítica (Seguridad, Salud, Metro), mostramos todo sin filtrar por estrellas
                             if (cat.skipRating) return true;
                             // Para el resto (Colegios, Restaurantes), filtramos los malos (<3.5)
                             return p.rating && p.rating >= 3.5;
                        });

                        // ORDENAR: Por rating descendente (si existe), sino por orden de llegada (cercanía/prominencia)
                        goodPlaces.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0));

                        newPlaces[index].totalCount = goodPlaces.length;
                        const top = goodPlaces.slice(0, 4);
                        newPlaces[index].results = top.map((p: any) => ({
                            name: p.name || 'Unknown',
                            rating: p.rating
                        }));

                        // 3. PINES DE COLORES SOLICITADOS
                        let iconColor = "blue"; // Default: Colegios, Jardines
                        if (['Parques'].includes(cat.label)) iconColor = "green";
                        else if (['Metros', 'Paraderos', 'Urgencias', 'Médicos'].includes(cat.label)) iconColor = "red";
                        else if (['Seguridad', 'Bancos'].includes(cat.label)) iconColor = "yellow";
                        else if (['Malls', 'S.Mercados', 'Farmacias'].includes(cat.label)) iconColor = "purple";

                        const iconUrl = `https://maps.google.com/mapfiles/ms/icons/${iconColor}-dot.png`;

                        top.forEach((p: any) => {
                            if (p.geometry && p.geometry.location) {
                                new g.maps.Marker({
                                    position: p.geometry.location,
                                    map: map,
                                    icon: { url: iconUrl },
                                    title: p.name
                                });
                            }
                        });
                    } else {
                        newPlaces[index].totalCount = 0;
                        newPlaces[index].results = [];
                    }

                    setPlaces([...newPlaces]);
                    setTimeout(() => fetchCategory(index + 1), 300);
                });
            };

            fetchCategory(0);

        } catch (e) {
            console.error(e);
            setMapError("Error al renderizar el mapa.");
        }
      }
    });
  };

  // Obtener colegios dinámicos para respaldo (Google Maps)
  const dynamicSchools = places.find(p => p.key === 'Colegio')?.results || [];

  if (!isOnline) {
    return (
      <div className="mt-4 bg-slate-800/60 border border-amber-500/40 rounded-lg p-6 text-center">
        <div className="text-3xl mb-2">📵</div>
        <div className="text-amber-400 font-bold text-sm mb-1">Sin conexión — Mapa no disponible</div>
        <div className="text-slate-400 text-xs">El análisis de entorno requiere internet. El resto de la auditoría funciona normalmente.</div>
      </div>
    );
  }

  return (
    <div className="mt-4 animate-fade-in">
       {mapError && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-4 rounded mb-4 text-sm font-bold flex items-center gap-3">
            <span className="text-2xl">⚠️</span>
            <div>{mapError}</div>
        </div>
       )}

       <div className="relative h-[350px] w-full rounded-lg border border-slate-600 bg-slate-200 mb-6 overflow-hidden">
          <div ref={mapRef} className="absolute inset-0 h-full w-full" />
          {(!communeInfo && !mapError) && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 bg-slate-200/90 z-10 pointer-events-none">
                  {address ? (
                    <div className="text-center">
                        <span className="text-2xl animate-bounce block mb-2">⏳</span>
                        <span className="animate-pulse font-bold">Analizando entorno en Chile...</span>
                    </div>
                  ) : (
                    <span className="flex items-center gap-2 opacity-50 font-bold">
                        <span className="text-2xl">📍</span> Ingresa dirección
                    </span>
                  )}
              </div>
          )}
       </div>

       {communeInfo && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-amber-400/50 rounded-lg bg-gradient-to-br from-amber-400/5 to-transparent">
              <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2 text-sm">🏆 TOP COLEGIOS {communeInfo.name} (PAES)</h4>

              {/* LÓGICA INVERTIDA: Priorizar Base de Datos PAES Oficial sobre Google Maps */}
              {communeInfo.data?.schools && communeInfo.data.schools.length > 0 ? (
                <div className="space-y-1">
                  {communeInfo.data.schools.map((s: string, i: number) => (
                    <div key={i} className="py-1 border-b border-white/10 text-sm text-slate-200 flex justify-between items-center">
                         <span>{i + 1}. {s}</span>
                         <span className="text-amber-400 font-bold text-[10px] bg-amber-900/30 px-1 rounded border border-amber-500/30">PAES</span>
                    </div>
                  ))}
                </div>
              ) : dynamicSchools.length > 0 ? (
                 <div className="space-y-1">
                    <div className="text-[10px] text-gray-400 italic mb-1">Sin datos PAES comunales, mostrando mejor rating Google:</div>
                    {dynamicSchools.slice(0, 4).map((s, i) => (
                        <div key={i} className="py-1 border-b border-white/10 text-sm text-slate-200 flex justify-between items-center">
                            <span className="truncate pr-2">{s.name}</span>
                            <span className="text-slate-400 font-bold whitespace-nowrap">{s.rating} ★</span>
                        </div>
                    ))}
                 </div>
              ) : ( <div className="text-xs text-slate-400">Sin registros Top</div> )}

            </div>
            <div className="p-4 border border-sky-500/50 rounded-lg bg-gradient-to-br from-sky-500/5 to-transparent">
               <h4 className="font-bold text-sky-400 mb-2 flex items-center gap-2 text-sm">🛡️ VIDA EN {communeInfo.name}</h4>
              {communeInfo.data ? (
                <div className="text-sm space-y-2">
                  <div className="text-slate-300"><strong className="text-white">Seguridad:</strong> {communeInfo.data.safe}</div>
                  <div className="text-slate-300"><strong className="text-white">Basura:</strong> {communeInfo.data.trash}</div>
                  <div className="text-slate-300"><strong className="text-white">Beneficios:</strong> {communeInfo.data.benefits}</div>
                </div>
              ) : ( <div className="text-xs text-slate-400">Sin información comunal</div> )}
            </div>
         </div>
       )}
       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
         {places.map((cat, idx) => (
           <div key={idx} className="bg-slate-900 border border-slate-700 p-3 rounded-md">
             <h4 className="text-xs font-bold text-white mb-2 flex justify-between"><span>{cat.icon} {cat.label}</span><span className="text-emerald-400">{cat.totalCount !== undefined ? cat.totalCount : '-'}</span></h4>
             <div className="space-y-1">
               {cat.results?.map((r, rIdx) => (
                 <div key={rIdx} className="flex justify-between text-[10px] text-slate-400"><span className="truncate pr-1">{r.name.substring(0, 20)}</span><span className="text-amber-500 font-bold">{r.rating ? `${r.rating}★` : ''}</span></div>
               ))}
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};
