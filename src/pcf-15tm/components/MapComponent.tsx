import { useEffect, useRef, useState } from 'react';
import { COMMUNE_DB } from '../constants';
import { type PlaceCategory } from '../types';

interface MapComponentProps {
  address: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [communeInfo, setCommuneInfo] = useState<{name: string, data: any} | null>(null);
  
  // Categorías de búsqueda espacial (Escaneo 3km)
  const [places, setPlaces] = useState<PlaceCategory[]>([
    { type: 'subway_station', label: 'Metros', icon: '🚇' },
    { type: 'police', label: 'Seguridad', icon: '🛡️' },
    { type: 'hospital', label: 'Urgencias', icon: '🏥' },
    { type: 'school', label: 'Colegios', icon: '🎓' },
    { type: 'park', label: 'Parques', icon: '🌳' },
    { type: 'supermarket', label: 'S.Mercados', icon: '🛒' },
    { type: 'pharmacy', label: 'Farmacias', icon: '💊' },
    { type: 'bank', label: 'Bancos', icon: '🏦' }
  ]);

  useEffect(() => {
    if (!address) return;
    const g = (window as any).google;
    if (!g || !g.maps) {
      setMapError("Motor de mapas no cargado");
      return;
    }

    const geocoder = new g.maps.Geocoder();
    geocoder.geocode({ address: address }, (results: any, status: any) => {
      if (status !== 'OK' || !results || !results[0]) {
        setMapError(`Error de ubicación: ${status}`);
        return;
      }

      const loc = results[0].geometry.location;
      
      // Extracción técnica de la comuna
      let communeRaw = "";
      results[0].address_components.forEach((c: any) => {
        if (c.types.includes("locality") || c.types.includes("administrative_area_level_3")) {
          communeRaw = c.long_name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
      });
      
      const dbData = COMMUNE_DB[communeRaw];
      setCommuneInfo({ name: communeRaw, data: dbData });

      if (mapRef.current) {
        // ESTILO DARK INDUSTRIAL PARA DOMIS™
        const darkStyle = [
          { elementType: "geometry", stylers: [{ color: "#0f172a" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#0f172a" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#475569" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#334155" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#020617" }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#1e293b" }] },
          { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#06b6d4" }] }
        ];

        const map = new g.maps.Map(mapRef.current, {
          zoom: 15,
          center: loc,
          styles: darkStyle,
          disableDefaultUI: true,
          zoomControl: true
        });

        // Marcador Principal (Propiedad)
        new g.maps.Marker({ 
          position: loc, 
          map: map, 
          title: "Propiedad Auditada",
          icon: {
            path: g.maps.SymbolPath.CIRCLE,
            fillColor: '#06b6d4',
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: '#ffffff',
            scale: 10
          }
        });

        const service = new g.maps.places.PlacesService(map);
        let processed = 0;
        const updatedPlaces = [...places];

        updatedPlaces.forEach((cat, index) => {
          service.nearbySearch({
            location: loc,
            radius: 3000, // Radio técnico de 3km
            type: cat.type
          }, (res: any, status: any) => {
            if (status === g.maps.places.PlacesServiceStatus.OK && res) {
              updatedPlaces[index].totalCount = res.length;
              updatedPlaces[index].results = res.slice(0, 3).map((p: any) => ({
                name: p.name,
                rating: p.rating
              }));
            }
            processed++;
            if (processed === updatedPlaces.length) setPlaces([...updatedPlaces]);
          });
        });
      }
    });
  }, [address]);

  return (
    <div className="mt-6 space-y-6">
       {mapError && <div className="bg-red-500/10 border border-red-500/20 p-3 rounded text-red-500 text-xs font-bold uppercase">{mapError}</div>}
       
       {/* CONTENEDOR DEL MAPA */}
       <div className="relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
         <div ref={mapRef} className="relative h-[400px] w-full rounded-2xl border border-white/10 bg-slate-900 overflow-hidden" />
       </div>

       {/* DATA COMUNAL PCF-15 */}
       {communeInfo && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 bg-slate-900/50 border border-amber-500/20 rounded-2xl backdrop-blur-xl">
              <h4 className="font-black text-amber-500 mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                🏆 Top Colegios {communeInfo.name}
              </h4>
              <div className="space-y-3">
                {communeInfo.data?.schools?.slice(0, 4).map((s: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-[11px] text-slate-300 font-bold uppercase tracking-tight">
                    <span className="text-amber-500">0{i+1}</span> {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-cyan-500/20 rounded-2xl backdrop-blur-xl">
               <h4 className="font-black text-cyan-400 mb-4 flex items-center gap-2 text-xs uppercase tracking-widest">
                🛡️ Perfil Urbano: {communeInfo.name}
              </h4>
              <div className="space-y-4 text-[11px] uppercase font-bold tracking-tight">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Seguridad:</span>
                  <span className="text-white">{communeInfo.data?.safe || 'No data'}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-500">Gestión Residuos:</span>
                  <span className="text-white">{communeInfo.data?.trash || 'No data'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plusvalía Est.:</span>
                  <span className="text-emerald-400">Alta</span>
                </div>
              </div>
            </div>
         </div>
       )}

       {/* GRID DE SERVICIOS (3KM RADIUS) */}
       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         {places.map((cat, idx) => (
           <div key={idx} className="bg-slate-900 border border-white/5 p-4 rounded-xl hover:border-cyan-500/30 transition-all">
             <div className="flex justify-between items-start mb-3">
               <span className="text-xl">{cat.icon}</span>
               <span className="text-cyan-500 font-mono font-black text-lg leading-none">{cat.totalCount || 0}</span>
             </div>
             <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{cat.label}</h4>
             <div className="space-y-1">
               {cat.results?.map((r, rIdx) => (
                 <div key={rIdx} className="text-[9px] text-slate-400 truncate uppercase font-medium">• {r.name}</div>
               ))}
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};