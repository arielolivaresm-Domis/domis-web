import React, { useEffect, useRef, useState } from 'react';
import { COMMUNE_DB } from '../constants.ts';
import { PlaceCategory } from '../types.ts';

interface MapComponentProps {
  address: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [communeInfo, setCommuneInfo] = useState<{name: string, data: any} | null>(null);
  const [places, setPlaces] = useState<PlaceCategory[]>([
    { key: 'Colegio', label: 'Colegios' },
    { key: 'Jardín Infantil', label: 'Jardines' },
    { type: 'subway_station', label: 'Metros' },
    { type: 'transit_station', label: 'Paraderos' },
    { type: 'police', label: 'Carabineros', icon: '🛡️' },
    { type: 'bank', label: 'Bancos' },
    { type: 'park', label: 'Parques' },
    { type: 'supermarket', label: 'S.Mercados' },
    { type: 'shopping_mall', label: 'Malls' },
    { type: 'pharmacy', label: 'Farmacias' },
    { type: 'hospital', label: 'Urgencias' },
    { type: 'doctor', label: 'Médicos' }
  ]);

  useEffect(() => {
    if (!address) return;
    const g = (window as any).google;
    if (!g || !g.maps) {
      setMapError("Google Maps API not loaded");
      return;
    }

    const geocoder = new g.maps.Geocoder();
    geocoder.geocode({ address: address }, (results: any, status: any) => {
      if (status !== 'OK' || !results || !results[0]) {
        setMapError(`Geocode failed: ${status}`);
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
        const map = new g.maps.Map(mapRef.current, {
          zoom: 14,
          center: loc,
          styles: []
        });

        new g.maps.Marker({ position: loc, map: map, title: "Propiedad" });

        const service = new g.maps.places.PlacesService(map);
        
        const newPlaces = [...places];
        let processed = 0;

        newPlaces.forEach((cat, index) => {
          const request: any = {
            location: loc,
            radius: 3000,
            keyword: cat.key,
            type: cat.type
          };

          service.nearbySearch(request, (res: any, status: any) => {
            if (status === g.maps.places.PlacesServiceStatus.OK && res) {
              newPlaces[index].totalCount = res.length;
              const top = res.slice(0, 4);
              newPlaces[index].results = top.map((p: any) => ({
                name: p.name || 'Unknown',
                rating: p.rating
              }));
              top.forEach((p: any) => {
                if (p.geometry && p.geometry.location) {
                   new g.maps.Marker({
                    position: p.geometry.location,
                    map: map,
                    icon: { url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
                    title: p.name
                  });
                }
              });
            } else {
               newPlaces[index].totalCount = 0;
               newPlaces[index].results = [];
            }
            processed++;
            if (processed === newPlaces.length) {
              setPlaces([...newPlaces]);
            }
          });
        });
      }
    });
  }, [address]);

  return (
    <div className="mt-4 animate-fade-in">
       {mapError && <div className="text-red-400 mb-2">{mapError}</div>}
       <div ref={mapRef} className="h-[350px] w-full rounded-lg border border-slate-600 bg-white mb-6" />
       {communeInfo && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 border border-amber-400/50 rounded-lg bg-gradient-to-br from-amber-400/5 to-transparent">
              <h4 className="font-bold text-amber-400 mb-2 flex items-center gap-2 text-sm">🏆 TOP COLEGIOS {communeInfo.name}</h4>
              {communeInfo.data?.schools ? (
                communeInfo.data.schools.slice(0, 4).map((s: string, i: number) => (
                  <div key={i} className="py-1 border-b border-white/10 text-sm text-slate-200">⭐ {s}</div>
                ))
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
             <h4 className="text-xs font-bold text-white mb-2 flex justify-between"><span>{cat.icon} {cat.label}</span><span className="text-emerald-400">{cat.totalCount || 0}</span></h4>
             <div className="space-y-1">
               {cat.results?.map((r, rIdx) => (
                 <div key={rIdx} className="flex justify-between text-[10px] text-slate-400"><span className="truncate pr-1">{r.name.substring(0, 20)}</span><span>{r.rating ? `${r.rating}★` : ''}</span></div>
               ))}
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};