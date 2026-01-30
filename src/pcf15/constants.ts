import type { AuditItemConfig, CommuneDB } from './types';

// Configuración de Costos (Parámetros Técnicos de Reparación)
export const CFG = {
    m2: { piso: 2.2, muro: 1.8, cielo: 0.9, vent: 2.5, closet: 10, techo: 22 },
    u: { puerta: 3.7, wc: 12, tina: 12, mueble: 35, cub: 15, art: 10, fach: 25, aseo: 5 },
    sys: { est: 500, elec: 25, agua: 18, gas: 6, cal: 7 },
    elec_spec: { cambio: 15000, mant: 7000 }
};

// Base de Datos de Comunas (Seguridad, Educación y Beneficios)
export const COMMUNE_DB: CommuneDB = {
    "LA REINA": { schools: ["Andree English School", "The Grange School", "British Royal School", "Colegio Madrigal"], safe: "1419", trash: "Reciclaje a Domicilio / Cachureos: Trebila (Programado)", benefits: "Tarjeta Ciudad, Aldea del Encuentro, Parque Mahuida" },
    "LAS CONDES": { schools: ["Verbo Divino", "Villa María Academy", "Cumbres", "Cordillera"], safe: "1402", trash: "Puntos Limpios Móviles / Retiro Vegetal Programado", benefits: "Tarjeta Vecino (Convenios Clínicas), Buses Eléctricos" },
    "VITACURA": { schools: ["Saint George's", "Alianza Francesa", "Tabancura", "Los Andes"], safe: "1403", trash: "Reciclaje Casa a Casa (Alto Estándar) / Punto Limpio", benefits: "Tarjeta Mi Vita, Parque Bicentenario" },
    "LO BARNECHEA": { schools: ["Nido de Aguilas", "Santiago College", "Everest", "Craighouse"], safe: "1405", trash: "Punto Limpio Móvil / Retiro Vegetal", benefits: "Globo Vigilancia, Club Preferente" },
    "PROVIDENCIA": { schools: ["San Ignacio El Bosque", "Cambridge", "Saint Gabriel's"], safe: "1414", trash: "Recicla en Casa (Bolsas diferenciadas) / Puntos Limpios", benefits: "Tarjeta Vecino SoyProvidencia, Ciclovías" },
    "NUNOA": { schools: ["Colegio Suizo", "Calasanz", "Manuel de Salas", "Akros"], safe: "1445", trash: "Reciclaje 'Ñuñoa Recicla' (Semanal) / Cachureos Programado", benefits: "Tarjeta Vecino, Botón Pánico, Actividad Cultural" },
    "PEÑALOLEN": { schools: ["Colegio Mayor", "Pedro de Valdivia", "Pumahue"], safe: "1461", trash: "Reciclaje Inclusivo / Eco-Parque", benefits: "Piscina Temperada Municipal" },
    "SANTIAGO": { schools: ["Instituto Nacional", "Liceo 1", "San Ignacio"], safe: "1406", trash: "Retiro Diario / Reciclaje en Plazas", benefits: "Red Metro Total, Casco Histórico" },
    "LA FLORIDA": { schools: ["American British", "Liceo Polivalente", "Colegio La Salle"], safe: "1416", trash: "Reciclaje Comunal / Bosque Panul", benefits: "Beneficios Farmacia, Club Vive La Florida" }
};

// Amenities del Portal Inmobiliario
export const PORTAL_DATA = {
    amb: ['Parrilla', 'Piscina', 'Closets', 'Baño visitas', 'Terraza', 'Comedor', 'Walk-in closet', 'Homeoffice', 'Living', 'Patio', 'Suite', 'Balcón', 'Mansarda', 'Jardín', 'Cocina', 'Logia', 'Playroom', 'Comedor diario'],
    ser: ['Internet', 'Aire Acond.', 'Calefacción', 'TV Cable', 'Gas Natural', 'Generador', 'Energía Solar', 'Conexión Lavadora', 'Agua Corriente', 'Caldera'],
    seg: ['Alarma', 'Conserjería', 'Portón Auto', 'Condominio Cerrado', 'Acceso Controlado', 'Gimnasio', 'Jacuzzi', 'Estac. Visitas', 'Cine', 'Juegos Inf.', 'Áreas Verdes', 'Canchas', 'Salón Fiestas', 'Sauna', 'Quincho']
};

// Definición de Ítems por Recinto
export const ITEMS = {
    sys: [
        { id: 'est', l: 'Estructura', t: 'fix', v: CFG.sys.est },
        { id: 'elec', l: 'T. Eléctrico', t: 'fix', v: CFG.sys.elec },
        { id: 'agua', l: 'Red Agua', t: 'fix', v: CFG.sys.agua },
        { id: 'gas', l: 'Red Gas', t: 'cnt', v: CFG.sys.gas },
        { id: 'techo', l: 'Techo', t: 'm2', v: CFG.m2.techo }
    ] as AuditItemConfig[],
    liv: [
        { id: 'p', l: 'Piso', t: 'm2', v: CFG.m2.piso },
        { id: 'm', l: 'Muros', t: 'm2', v: CFG.m2.muro },
        { id: 'c', l: 'Cielo', t: 'm2', v: CFG.m2.cielo },
        { id: 'v', l: 'Ventanas', t: 'm2', v: CFG.m2.vent },
        { id: 'pt', l: 'Puertas', t: 'cnt', v: CFG.u.puerta },
        { id: 'luc', l: 'Luces', t: 'spec' },
        { id: 'ench', l: 'Enchufes', t: 'spec' }
    ] as AuditItemConfig[],
    kit: [
        { id: 'p', l: 'Piso', t: 'm2', v: CFG.m2.piso },
        { id: 'm', l: 'Muros', t: 'm2', v: CFG.m2.muro },
        { id: 'c', l: 'Cielo', t: 'm2', v: CFG.m2.cielo },
        { id: 'v', l: 'Ventanas', t: 'm2', v: CFG.m2.vent },
        { id: 'mob', l: 'Muebles', t: 'cnt', v: CFG.u.mueble, ph: 'ml' },
        { id: 'cub', l: 'Cubiertas', t: 'cnt', v: CFG.u.cub, ph: 'ml' },
        { id: 'art', l: 'Artefactos', t: 'fix', v: CFG.u.art },
        { id: 'luc', l: 'Luces', t: 'spec' },
        { id: 'ench', l: 'Enchufes', t: 'spec' }
    ] as AuditItemConfig[],
    ext: [
        { id: 'fach', l: 'Fachada', t: 'fix', v: CFG.u.fach },
        { id: 'aseo', l: 'Aseo/Escombros', t: 'fix', v: CFG.u.aseo },
        { id: 'luc', l: 'Luces Ext.', t: 'spec' },
        { id: 'ench', l: 'Enchufes Ext.', t: 'spec' }
    ] as AuditItemConfig[]
};

export const DORM_ITEMS = [{ id: 'p', l: 'Piso', t: 'm2', v: CFG.m2.piso }, { id: 'm', l: 'Muros', t: 'm2', v: CFG.m2.muro }, { id: 'c', l: 'Cielo', t: 'm2', v: CFG.m2.cielo }, { id: 'v', l: 'Ventanas', t: 'm2', v: CFG.m2.vent }, { id: 'cl', l: 'Closet', t: 'm2', v: CFG.m2.closet }, { id: 'pt', l: 'Puertas', t: 'cnt', v: CFG.u.puerta }, { id: 'luc', l: 'Luces', t: 'spec' }, { id: 'ench', l: 'Enchufes', t: 'spec' }] as AuditItemConfig[];

export const BATH_ITEMS = [{ id: 'p', l: 'Piso', t: 'm2', v: CFG.m2.piso }, { id: 'm', l: 'Muros', t: 'm2', v: CFG.m2.muro }, { id: 'c', l: 'Cielo', t: 'm2', v: CFG.m2.cielo }, { id: 'v', l: 'Ventana', t: 'm2', v: CFG.m2.vent }, { id: 'pt', l: 'Puerta', t: 'cnt', v: CFG.u.puerta }, { id: 'wc', l: 'Artefactos', t: 'fix', v: CFG.u.wc }, { id: 'tin', l: 'Tina/Ducha', t: 'fix', v: CFG.u.tina }, { id: 'cl', l: 'Closet', t: 'm2', v: CFG.m2.closet }, { id: 'luc', l: 'Luces', t: 'spec' }, { id: 'ench', l: 'Enchufes', t: 'spec' }] as AuditItemConfig[];