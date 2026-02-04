import React, { useEffect, useRef, useState } from 'react';
import { COMMUNE_DB } from '../constants';
import type { PlaceCategory } from '../types';

// LLAVE MAESTRA DE AUDITORÍA DOMIS™
const GOOGLE_MAPS_API_KEY = "AIzaSyCuRh3WMF2EA835ieLjc-5JMqAz2l6bYTI";

declare global {
  interface Window {
    google: any;
    gm_authFailure: () => void;
  }
}

interface MapComponentProps {
  address: string;
}

export const MapComponent: React.FC<MapComponentProps> = ({ address }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [communeInfo, setCommuneInfo] = useState<{name: string, data: any} | null>(null);
  const [places, setPlaces] = useState<PlaceCategory[]>([
    { key: 'Colegio', label: 'Colegios', icon: '🎓' },
    { type: 'subway_station', label: 'Metros', icon: '🚇' },
    { type: 'police', label: 'Carabineros', icon: '🛡️' },
    { type: 'supermarket', label: 'S.Mercados', icon: '🛒' },
    { type: 'pharmacy', label: 'Farmacias', icon: '💊' },
    { type: 'hospital', label: 'Urgencias', icon: '🏥' },
    { type: 'park', label: 'Parques', icon: '🌳' },
    { type: 'bank', label: 'Bancos', icon: '🏦' }
  ]);

  useEffect(() => {
    // 1. Script Loader: Inyectamos la API Key de Aries
    const loadGoogleMaps = () => {
      if (window.google) return;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => initMap();
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!address || !window.google) return;

      const google = window.google;
      const geocoder = new google.maps.Geocoder();
      
      geocoder.geocode({ address: address }, (results: any, status: any) => {
        if (status !== 'OK' || !results[0]) {
          setMapError(`Error de ubicación: ${status}`);
          return;
        }

        const loc = results[0].geometry.location;
        
        // Identificación de Comuna para base de datos DOMIS™
        let communeRaw = "";
        results[0].address_components.forEach((c: any) => {
          if (c.types.includes("locality") || c.types.includes("administrative_area_level_3")) {
            communeRaw = c.long_name.toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          }
        });
        
        setCommuneInfo({ name: communeRaw, data: COMMUNE_DB[communeRaw] });

        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            zoom: 15,
            center: loc,
            disableDefaultUI: true,
            zoomControl: true,
            styles: [
              { "featureType": "all", "elementType": "labels.text.fill", "stylers": [{ "color": "#ffffff" }] },
              { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#0f172a" }] },
              { "featureType": "road", "elementType": "all", "stylers": [{ "color": "#334155" }] },
              { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#0ea5e9" }] },
              { "featureType": "poi", "stylers": [{ "visibility": "off" }] }
            ]
          });

          new google.maps.Marker({ 
            position: loc, 
            map: map, 
            title: "Auditoría DOMIS™",
            animation: google.maps.Animation.BOUNCE 
          });

          const service = new google.maps.places.PlacesService(map);
          const updatedPlaces = [...places];
          let done = 0;

          updatedPlaces.forEach((cat, i) => {
            service.nearbySearch({ location: loc, radius: 2500, keyword: cat.key, type: cat.type }, (res: any, st: any) => {
              if (st === google.maps.places.PlacesServiceStatus.OK && res) {
                updatedPlaces[i].totalCount = res.length;
                updatedPlaces[i].results = res.slice(0, 3).map((p: any) => ({ name: p.name, rating: p.rating }));
              }
              done++;
              if (done === updatedPlaces.length) setPlaces([...updatedPlaces]);
            });
          });
        }
      });
    };

    if (!window.google) loadGoogleMaps(); else initMap();
  }, [address]);

  return (
    <div className="mt-6 font-sans">
       {mapError && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-[10px] font-black uppercase mb-4 tracking-widest text-center">⚠️ {mapError}</div>}
       
       <div ref={mapRef} className="h-[400px] w-full rounded-2xl border border-slate-800 bg-slate-900 mb-6 shadow-2xl overflow-hidden shadow-cyan-500/5" />

       {communeInfo && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-5 border border-cyan-500/30 rounded-2xl bg-slate-900/50 backdrop-blur-md">
              <h4 className="font-black text-cyan-400 mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
                <span className="p-1.5 bg-cyan-500/10 rounded-lg">🎓</span> Entorno Educacional: {communeInfo.name}
              </h4>
              <div className="space-y-2">
                {communeInfo.data?.schools ? communeInfo.data.schools.slice(0, 4).map((s: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-slate-300 font-medium italic">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_5px_rgba(6,182,212,0.5)]" />
                    {s}
                  </div>
                )) : <p className="text-[10px] text-slate-500 uppercase font-bold italic">Consultando base de datos técnica...</p>}
              </div>
            </div>

            <div className="p-5 border border-amber-500/30 rounded-2xl bg-slate-900/50 backdrop-blur-md">
               <h4 className="font-black text-amber-500 mb-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
                <span className="p-1.5 bg-amber-500/10 rounded-lg">🛡️</span> Seguridad y Urbanismo: {communeInfo.name}
              </h4>
              {communeInfo.data ? (
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex flex-col"><span className="text-[9px] text-slate-500 uppercase font-black">Plan de Seguridad</span><span className="text-xs text-slate-200 font-bold tracking-tight">{communeInfo.data.safe}</span></div>
                  <div className="flex flex-col"><span className="text-[9px] text-slate-500 uppercase font-black">Manejo de Residuos</span><span className="text-xs text-slate-200 font-bold tracking-tight">{communeInfo.data.trash}</span></div>
                </div>
              ) : <p className="text-[10px] text-slate-500 uppercase font-bold italic text-center">Datos no disponibles para este sector</p>}
            </div>
         </div>
       )}

       <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
         {places.map((cat, idx) => (
           <div key={idx} className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl hover:border-cyan-500/30 transition-all group">
             <div className="flex justify-between items-center mb-3">
               <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{cat.icon} {cat.label}</span>
               <span className="text-[10px] font-black text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded-full">{cat.totalCount || 0}</span>
             </div>
             <div className="space-y-1">
               {cat.results?.map((r, rIdx) => (
                 <div key={rIdx} className="flex justify-between text-[9px] text-slate-400 font-medium truncate italic group-hover:text-slate-200 transition-colors">
                   <span className="truncate">{r.name}</span>
                 </div>
               ))}
             </div>
           </div>
         ))}
       </div>
    </div>
  );
};