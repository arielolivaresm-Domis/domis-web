import { AuditItemConfig, CommuneDB } from './types.ts';

// --- PROMPT MAESTRO DOMIS™ ---
export const DOMIS_SYSTEM_PROMPT = `
ACTÚA COMO: Especialista Senior Inmobiliario y Constructor Civil certificado en Chile.
MISIÓN: Ejecutar auditorías técnicas PCF-15 para valorización de activos.
CONOCIMIENTO: Normativa Chilena (OGUC, SEC, RIDAA, NCh).
TONO: Técnico, preciso, directo.
`;

// Configuración de Costos (UF/Unidad)
export const CFG = {
  m2: { piso: 2.2, muro: 1.8, cielo: 0.9, vent: 2.5, closet: 10, techo: 22 },
  u: { puerta: 3.7, wc: 12, tina: 12, mueble: 35, cub: 15, art: 10, fach: 25, aseo: 5 },
  sys: { est: 500, elec: 25, agua: 18, gas: 6, cal: 7 },
  elec_spec: { cambio: 15000, mant: 7000 }
};

// Base de Datos Normativa Chilena (Restaurada v4.1)
export const NORMATIVA_DB: Record<string, string> = {
  'sec_gen': 'Norma SEC RIC N°01 - Empalmes y tableros',
  'sec_ench': 'Norma SEC RIC N°10 - Instalaciones de uso general (Enchufes/Alumbrado)',
  'ridaa': 'RIDAA D.S. 50 - Reglamento de Instalaciones Domiciliarias de Agua/Alcantarillado',
  'gas': 'SEC D.S. 66 - Reglamento de instalaciones interiores de gas',
  'oguc_est': 'OGUC Título 5 - Construcción y Estabilidad',
  'oguc_tech': 'OGUC 4.1.10 - Cubiertas y techumbres',
  'oguc_fire': 'OGUC 4.3 - Protección contra Incendios (F)',
  'nch_term': 'NCh 853 - Aislación Térmica y OGUC 4.1.10',
  'nch_acust': 'OGUC 4.1.6 - Aislación Acústica',
  'oguc_alt': 'OGUC 4.1.1 - Altura mínima habitable (2.30m)',
  'oguc_esc': 'OGUC 4.2.7 - Escaleras (Huella mín 28cm, Contrahuella máx 18cm)',
  'nch_vent': 'NCh 1970 - Ventanas y OGUC 4.1.2 (Ventilación)',
  'nch_mob': 'NCh 2184 - Muebles de cocina',
  'sec_art': 'Certificación SEC Obligatoria (Sello QR)',
  'nch_elec': 'NCh 4/2003 (Legacy) o RIC Actuales'
};

// Base de Datos Comunal
export const COMMUNE_DB: CommuneDB = {
  "LA REINA": { schools: ["Andree English School", "The Grange School", "British Royal School"], safe: "1419", trash: "Reciclaje Dom. / Trebila", benefits: "Tarjeta Ciudad, Parque Mahuida" },
  "LAS CONDES": { schools: ["Verbo Divino", "Villa María Academy", "Cumbres"], safe: "1402", trash: "Puntos Limpios Móviles", benefits: "Tarjeta Vecino, Clínica Cordillera" },
  "VITACURA": { schools: ["Saint George's", "Alianza Francesa", "Tabancura"], safe: "1403", trash: "Reciclaje Casa a Casa", benefits: "Tarjeta Mi Vita, Bicentenario" },
  "LO BARNECHEA": { schools: ["Nido de Aguilas", "Santiago College", "Everest"], safe: "1405", trash: "Punto Limpio Móvil", benefits: "Club Preferente, Globo Vigilancia" },
  "PROVIDENCIA": { schools: ["San Ignacio El Bosque", "Cambridge", "Saint Gabriel's"], safe: "1414", trash: "Recicla en Casa", benefits: "SoyProvidencia, Ciclovías" },
  "NUNOA": { schools: ["Colegio Suizo", "Calasanz", "Manuel de Salas"], safe: "1445", trash: "Ñuñoa Recicla", benefits: "Tarjeta Vecino, Cultura" },
  "PENALOLEN": { schools: ["Colegio Mayor", "Pedro de Valdivia", "Pumahue"], safe: "1461", trash: "Reciclaje Inclusivo", benefits: "Piscina Temperada" },
  "PEÑALOLEN": { schools: ["Colegio Mayor", "Pedro de Valdivia", "Pumahue"], safe: "1461", trash: "Reciclaje Inclusivo", benefits: "Piscina Temperada" },
  "SANTIAGO": { schools: ["Instituto Nacional", "Liceo 1", "San Ignacio"], safe: "1406", trash: "Retiro Diario", benefits: "Red Metro Total" },
  "LA FLORIDA": { schools: ["American British", "Liceo Polivalente", "La Salle"], safe: "1416", trash: "Reciclaje Comunal", benefits: "Club Vive" }
};

// Amenidades Portal
export const PORTAL_DATA = {
  amb: ['Parrilla', 'Piscina', 'Closets', 'Baño visitas', 'Terraza', 'Comedor', 'Walk-in closet', 'Homeoffice', 'Living', 'Patio', 'Suite', 'Balcón', 'Mansarda', 'Jardín', 'Cocina', 'Logia', 'Playroom', 'Comedor diario'],
  ser: ['Internet', 'Aire Acond.', 'Calefacción', 'TV Cable', 'Gas Natural', 'Generador', 'Energía Solar', 'Conexión Lavadora', 'Agua Corriente', 'Caldera'],
  seg: ['Alarma', 'Conserjería', 'Portón Auto', 'Condominio Cerrado', 'Acceso Controlado', 'Gimnasio', 'Jacuzzi', 'Estac. Visitas', 'Cine', 'Juegos Inf.', 'Áreas Verdes', 'Canchas', 'Salón Fiestas', 'Sauna', 'Quincho']
};

// Definición de Ítems Técnicos con Normativa
export const ITEMS = {
  sys: [
    {id:'est', l:'Estructura', t:'fix', v:CFG.sys.est, norm: 'oguc_est'}, 
    {id:'elec', l:'T. Eléctrico', t:'fix', v:CFG.sys.elec, norm: 'sec_gen'}, 
    {id:'agua', l:'Red Agua', t:'fix', v:CFG.sys.agua, norm: 'ridaa'}, 
    {id:'gas', l:'Red Gas', t:'cnt', v:CFG.sys.gas, norm: 'gas'}, 
    {id:'techo', l:'Techo', t:'m2', v:CFG.m2.techo, norm: 'oguc_tech'}
  ] as AuditItemConfig[],
  liv: [
    {id:'p', l:'Piso', t:'m2', v:CFG.m2.piso}, 
    {id:'m', l:'Muros', t:'m2', v:CFG.m2.muro, norm: 'nch_term'}, 
    {id:'c', l:'Cielo', t:'m2', v:CFG.m2.cielo, norm: 'oguc_alt'}, 
    {id:'v', l:'Ventanas', t:'m2', v:CFG.m2.vent, norm: 'nch_vent'}, 
    {id:'pt', l:'Puertas', t:'cnt', v:CFG.u.puerta, norm: 'oguc_fire'}, 
    {id:'luc', l:'Luces', t:'spec', norm: 'sec_ench'}, 
    {id:'ench', l:'Enchufes', t:'spec', norm: 'sec_ench'}
  ] as AuditItemConfig[],
  kit: [
    {id:'p', l:'Piso', t:'m2', v:CFG.m2.piso}, 
    {id:'m', l:'Muros', t:'m2', v:CFG.m2.muro}, 
    {id:'c', l:'Cielo', t:'m2', v:CFG.m2.cielo}, 
    {id:'v', l:'Ventanas', t:'m2', v:CFG.m2.vent, norm: 'nch_vent'}, 
    {id:'mob', l:'Muebles', t:'cnt', v:CFG.u.mueble, ph:'ml', norm: 'nch_mob'}, 
    {id:'cub', l:'Cubiertas', t:'cnt', v:CFG.u.cub, ph:'ml'}, 
    {id:'art', l:'Artefactos', t:'fix', v:CFG.u.art, norm: 'sec_art'}, 
    {id:'luc', l:'Luces', t:'spec', norm: 'sec_ench'}, 
    {id:'ench', l:'Enchufes', t:'spec', norm: 'sec_ench'}
  ] as AuditItemConfig[],
  ext: [
    {id:'fach', l:'Fachada', t:'fix', v:CFG.u.fach, norm: 'oguc_est'}, 
    {id:'aseo', l:'Aseo/Escombros', t:'fix', v:CFG.u.aseo}, 
    {id:'luc', l:'Luces Ext.', t:'spec', norm: 'sec_ench'}, 
    {id:'ench', l:'Enchufes Ext.', t:'spec', norm: 'sec_ench'}
  ] as AuditItemConfig[]
};

export const DORM_ITEMS = [ 
  {id:'p', l:'Piso', t:'m2', v:CFG.m2.piso}, 
  {id:'m', l:'Muros', t:'m2', v:CFG.m2.muro, norm: 'nch_acust'}, 
  {id:'c', l:'Cielo', t:'m2', v:CFG.m2.cielo, norm: 'oguc_alt'}, 
  {id:'v', l:'Ventanas', t:'m2', v:CFG.m2.vent, norm: 'nch_vent'}, 
  {id:'cl', l:'Closet', t:'m2', v:CFG.m2.closet}, 
  {id:'pt', l:'Puertas', t:'cnt', v:CFG.u.puerta}, 
  {id:'luc', l:'Luces', t:'spec', norm: 'sec_ench'}, 
  {id:'ench', l:'Enchufes', t:'spec', norm: 'sec_ench'} 
] as AuditItemConfig[];

export const BATH_ITEMS = [ 
  {id:'p', l:'Piso', t:'m2', v:CFG.m2.piso}, 
  {id:'m', l:'Muros', t:'m2', v:CFG.m2.muro}, 
  {id:'c', l:'Cielo', t:'m2', v:CFG.m2.cielo, norm: 'oguc_alt'}, 
  {id:'v', l:'Ventana', t:'m2', v:CFG.m2.vent, norm: 'nch_vent'}, 
  {id:'pt', l:'Puerta', t:'cnt', v:CFG.u.puerta}, 
  {id:'wc', l:'Artefactos', t:'fix', v:CFG.u.wc, norm: 'ridaa'}, 
  {id:'tin', l:'Tina/Ducha', t:'fix', v:CFG.u.tina, norm: 'ridaa'}, 
  {id:'cl', l:'Closet', t:'m2', v:CFG.m2.closet}, 
  {id:'luc', l:'Luces', t:'spec', norm: 'sec_ench'}, 
  {id:'ench', l:'Enchufes', t:'spec', norm: 'sec_ench'} 
] as AuditItemConfig[];

export const STAIR_ITEMS = [
  {id:'grd', l:'Gradas/Peldaños', t:'m2', v:CFG.m2.piso, norm: 'oguc_esc'},
  {id:'bar', l:'Baranda/Pasamanos', t:'cnt', v:3, norm: 'oguc_esc'}, 
  {id:'mur', l:'Muros Caja', t:'m2', v:CFG.m2.muro},
  {id:'cie', l:'Cielo Caja', t:'m2', v:CFG.m2.cielo, norm: 'oguc_alt'},
  {id:'luc', l:'Iluminación', t:'spec', norm: 'sec_ench'}
] as AuditItemConfig[];