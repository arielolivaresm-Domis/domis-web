import { useEffect, useRef, useState } from 'react';
import { COMMUNE_DB } from '../constants';
import { type PlaceCategory } from '../types';
import { 
  Train, 
  ShieldCheck, 
  Hospital, 
  GraduationCap, 
  Trees, 
  ShoppingCart, 
  Pill, 
  Banknote 
} from './Icons';

interface MapComponentProps {
  address: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [communeInfo, setCommuneInfo] = useState<{name: string, data: any} | null>(null);
  
  const [places, setPlaces] = useState<PlaceCategory[]>([
    { type: 'subway_station', label: 'Metros', icon: <Train className="w-5 h-5" /> },
    { type: 'police', label: 'Seguridad', icon: <ShieldCheck className="w-5 h-5" /> },
    { type: 'hospital', label: 'Urgencias', icon: <Hospital className="w-5 h-5" /> },
    { type: 'school', label: 'Colegios', icon: <GraduationCap className="w-5 h-5" /> },
    { type: 'park', label: 'Parques', icon: <Trees className="w-5 h-5" /> },
    { type: 'supermarket', label: 'S.Mercados', icon: <ShoppingCart className="w-5 h-5" /> },
    { type: 'pharmacy', label: 'Farmacias', icon: <Pill className="w-5 h-5" /> },
    { type: 'bank', label: 'Bancos', icon: <Banknote className="w-5 h-5" /> }
  ]);

  useEffect(() => {
    const cleanAddress = address?.trim();
    if (!cleanAddress || cleanAddress.length < 3) return;

    const g = (window as any).google;
    if (!g || !g.maps) {
      setMapError("Motor de mapas no cargado");
      return;
    }

    const geocoder = new g.maps.Geocoder();
    geocoder.geocode({ address: cleanAddress }, (results: any, status: any) => {
      if (status !== 'OK' || !results || !results[0]) {
        setMapError(status === 'ZERO_RESULTS' ? "Ubicación no encontrada" : `Error: ${status}`);
        return;
      }

      setMapError(null);
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
          zoom: 15,
          center: loc,
          styles: [{ elementType: "geometry", stylers: [{ color: "#0f172a" }] }],
          disableDefaultUI: true,
          zoomControl: true
        });

        new g.maps.Marker({ position: loc, map: map, icon: { path: g.maps.SymbolPath.CIRCLE, fillColor: '#06b6d4', scale: 8 } });

        const service = new g.maps.places.PlacesService(map);
        let processed = 0;
        const updatedPlaces = [...places];

        updatedPlaces.forEach((cat, index) => {
          service.nearbySearch({ location: loc, radius: 3000, type: cat.type }, (res: any, status: any) => {
            if (status === g.maps.places.PlacesServiceStatus.OK && res) {
              updatedPlaces[index].totalCount = res.length;
              updatedPlaces[index].results = res.slice(0, 3).map((p: any) => ({ name: p.name, rating: p.rating }));
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
       {mapError && <div className="bg-red-500/10 border border-red-500/40 p-3 rounded text-red-500 text-[10px] font-black uppercase tracking-widest">⚠️ {mapError}</div>}
       
       <div ref={mapRef} className="h-[400px] w-full rounded-2xl border border-white/10 bg-slate-900" />
       
       {/* RESOLUCIÓN ERROR 6133: PROYECCIÓN DE DATOS COMUNALES */}
       {communeInfo && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/50 border border-amber-500/20 rounded-xl">
              <h4 className="font-black text-amber-500 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Top Colegios: {communeInfo.name}
              </h4>
              <div className="space-y-2">
                {communeInfo.data?.schools?.slice(0, 3).map((s: string, i: number) => (
                  <div key={i} className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">• {s}</div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-900/50 border border-cyan-500/20 rounded-xl">
               <h4 className="font-black text-cyan-400 mb-3 text-[10px] uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Perfil Urbano: {communeInfo.name}
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold text-slate-500">
                <div>Seguridad: <span className="text-white">{communeInfo.data?.safe || '---'}</span></div>
                <div>Residuos: <span className="text-white">{communeInfo.data?.trash || '---'}</span></div>
              </div>
            </div>
         </div>
       )}

       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         {places.map((cat, idx) => (
           <div key={idx} className="bg-slate-900 border border-white/5 p-4 rounded-xl">
             <div className="flex justify-between items-start mb-2">
               <span className="text-cyan-500">{cat.icon}</span>
               <span className="text-cyan-400 font-mono font-black">{cat.totalCount || 0}</span>
             </div>
             <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{cat.label}</h4>
           </div>
         ))}
       </div>
    </div>
  );
};