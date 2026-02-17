
import { NormativeInfraction } from './types.ts';

export const CHILEAN_NORMS: NormativeInfraction[] = [
    {
        id: 'n1',
        label: 'Ventilación de calefont insuficiente',
        ref: 'D.S. N°66 (SEC)',
        text: 'El recinto no cuenta con las aberturas de ventilación (superior/inferior) exigidas para asegurar la evacuación de gases de combustión.',
        gravity: 'Grave',
        tags: ['gas', 'kit', 'logia', 'sys']
    },
    {
        id: 'n2',
        label: 'Altura de barandas < 95 cm',
        ref: 'OGUC Art. 4.1.7.',
        text: 'Las barandas en balcones o escaleras deben tener una altura mínima de 0,95 m medida desde el nivel de piso terminado.',
        gravity: 'Grave',
        tags: ['ext', 'ter', 'bal', 'stair']
    },
    {
        id: 'n3',
        label: 'Pendiente alcantarillado < 3%',
        ref: 'RIDAA (Art. 81)',
        text: 'Las tuberías de descarga de 75mm o 110mm deben mantener una pendiente mínima del 3% para garantizar el arrastre de sólidos.',
        gravity: 'Grave',
        tags: ['agua', 'sys', 'bth', 'kit']
    },
    {
        id: 'n4',
        label: 'Desnivel de pisos > 5mm en 3m',
        ref: 'Manual de Tolerancias CDT',
        text: 'La planicidad del piso supera la tolerancia máxima permitida de 5 mm bajo una regla de 3 metros de longitud.',
        gravity: 'Leve',
        tags: ['piso', 'liv', 'dorm', 'pas']
    },
    {
        id: 'n5',
        label: 'Enchufe cerca de lavamanos/ducha',
        ref: 'Pliego RIC N°10 (SEC)',
        text: 'Se prohíbe la instalación de tomas de corriente en la "Zona 1" de seguridad (dentro de los 60 cm del borde del artefacto).',
        gravity: 'Grave',
        tags: ['elec', 'bth', 'kit', 'ench']
    },
    {
        id: 'n6',
        label: 'Ausencia de protector diferencial',
        ref: 'Pliego RIC N°05 (SEC)',
        text: 'Los circuitos de enchufes deben contar con protección diferencial de alta sensibilidad (30mA) para protección de personas.',
        gravity: 'Grave',
        tags: ['elec', 'sys', 'tablero']
    },
    {
        id: 'n7',
        label: 'Vidrio simple en zonas de riesgo',
        ref: 'NCh 135 / OGUC 4.1.10',
        text: 'En paños vidriados a baja altura o zonas de impacto, se requiere vidrio de seguridad (templado o laminado) para evitar cortes.',
        gravity: 'Grave',
        tags: ['win', 'liv', 'ext', 'ter']
    },
    {
        id: 'n8',
        label: 'Ventilación mecánica inexistente',
        ref: 'OGUC Art. 4.1.1.',
        text: 'Baños sin ventana al exterior deben contar con un sistema de extracción mecánica que garantice la renovación de aire.',
        gravity: 'Leve',
        tags: ['bth', 'kit', 'vent']
    },
    {
        id: 'n9',
        label: 'Escalones de altura irregular',
        ref: 'OGUC Art. 4.2.2.',
        text: 'La contrahuella debe ser constante en todo el tramo; variaciones superiores a 5mm representan un riesgo de tropiezo.',
        gravity: 'Grave',
        tags: ['stair']
    },
    {
        id: 'n10',
        label: 'Puerta de escape abre en contra',
        ref: 'OGUC Art. 4.3.8.',
        text: 'Las puertas de salida de edificios públicos o zonas de evacuación deben abrir siempre en el sentido de la salida.',
        gravity: 'Grave',
        tags: ['door', 'acc', 'com']
    },
    {
        id: 'n11',
        label: 'Falta de sello en vanos (ventanas)',
        ref: 'Manual CDT / NCh 3079',
        text: 'Ausencia de sello de estanqueidad perimetral, lo que permite infiltraciones de aire y humedad al interior del muro.',
        gravity: 'Leve',
        tags: ['win', 'ext', 'aisl']
    },
    {
        id: 'n12',
        label: 'Circuitos sin rotulación en tablero',
        ref: 'Pliego RIC N°19 (SEC)',
        text: 'El tablero eléctrico debe identificar claramente la función de cada interruptor para una operación segura en emergencias.',
        gravity: 'Leve',
        tags: ['elec', 'sys', 'tablero']
    },
    {
        id: 'n13',
        label: 'Calefont instalado en dormitorio',
        ref: 'D.S. N°66 (SEC)',
        text: 'Se prohíbe terminantemente la ubicación de artefactos de gas de circuito abierto dentro de dormitorios o baños.',
        gravity: 'Grave',
        tags: ['gas', 'dorm', 'bth']
    },
    {
        id: 'n14',
        label: 'Distancia Gas-Electricidad < 15cm',
        ref: 'RIC N°10 / DS 66',
        text: 'Debe existir una separación mínima de 15 cm entre canalizaciones eléctricas y tuberías de gas para evitar riesgos de arco.',
        gravity: 'Grave',
        tags: ['gas', 'elec', 'sys', 'kit']
    },
    {
        id: 'n15',
        label: 'Falta de llave de corte por recinto',
        ref: 'RIDAA (Art. 52)',
        text: 'Todo baño o cocina debe poseer una llave de paso que permita aislar el recinto sin cortar el suministro total de la vivienda.',
        gravity: 'Leve',
        tags: ['agua', 'bth', 'kit']
    },
    {
        id: 'n16',
        label: 'Condensación por puente térmico',
        ref: 'OGUC Art. 4.1.10.',
        text: 'Incumplimiento de la transmitancia térmica permitida, generando puntos fríos que favorecen la aparición de hongos y moho.',
        gravity: 'Leve',
        tags: ['muro', 'ceil', 'aisl']
    },
    {
        id: 'n17',
        label: 'Pasamanos no continuo',
        ref: 'OGUC Art. 4.1.7.',
        text: 'Los pasamanos en escaleras deben ser continuos y prolongarse 30 cm al inicio y al final para apoyo seguro.',
        gravity: 'Leve',
        tags: ['stair']
    },
    {
        id: 'n18',
        label: 'Huella de escalera < 25 cm',
        ref: 'OGUC Art. 4.2.2.',
        text: 'La dimensión de la huella debe ser igual o superior a 0,25 m para permitir un apoyo completo del pie.',
        gravity: 'Grave',
        tags: ['stair']
    },
    {
        id: 'n19',
        label: 'Ancho de puerta < 70 cm (útil)',
        ref: 'OGUC (Accesibilidad)',
        text: 'El ancho libre de paso en puertas de recintos habitables no debe ser inferior a 0,70 m para permitir el tránsito normal.',
        gravity: 'Leve',
        tags: ['door', 'acc']
    },
    {
        id: 'n20',
        label: 'Tubería eléctrica sin ducto',
        ref: 'Pliego RIC N°04 (SEC)',
        text: 'Los conductores deben estar protegidos por canalizaciones (conduit) certificadas y no pueden ir embebidos directamente.',
        gravity: 'Grave',
        tags: ['elec', 'sys']
    }
];
