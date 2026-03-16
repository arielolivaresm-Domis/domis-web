import CasePage, { CaseData } from './CasePage';

const data: CaseData = {
  slug: 'andrea-providencia',
  cliente: 'Andrea',
  comuna: 'Providencia',
  ahorro: '$68.218.952',
  porcentaje: '11%',
  precioOriginal: '$620.172.290',
  precioFinal: '$551.953.338',
  metaTitle: 'Caso Andrea — Providencia: ahorro $68.218.952 (11%) | DOMIS™',
  metaDescription: 'Arquitecta que creyó poder evaluar la propiedad sola. La auditoría PCF-15™ encontró superficie real menor a escritura e instalaciones fuera de norma. Ahorro: $68 millones en Providencia.',
  historia: [
    'Andrea es arquitecta. Cuando encontró su departamento en Providencia, creyó que su formación técnica era suficiente para evaluar la propiedad por su cuenta. Revisó la propiedad dos veces. Todo le pareció correcto.',
    'Un colega le recomendó DOMIS™ una semana antes de firmar la promesa. "Solo para tener la tranquilidad", dijo Andrea.',
    'La auditoría PCF-15™ reveló que la superficie real medida con láser era 4,3 m² menor a la declarada en escritura — diferencia que el corredor nunca mencionó. Además detectó instalaciones eléctricas fuera de norma en dos circuitos y humedad estructural acumulada en el muro del dormitorio principal, invisible sin instrumental térmico.',
    'La valorización técnica de los hallazgos, cruzada con tasación de mercado real, generó el argumento de negociación. El vendedor bajó el precio en $68.218.952. Andrea dice hoy que fue la mejor decisión que tomó en ese proceso.',
  ],
  hallazgos: [
    'Superficie real 4,3 m² menor a lo declarado en escritura — medición láser Bosch',
    'Instalaciones eléctricas fuera de norma en dos circuitos del panel principal',
    'Humedad estructural en muro del dormitorio principal — cámara térmica FLIR',
    'Sello de ventana con filtraciones activas en living comedor',
    'Grietas en tabique interior indicativas de asentamiento diferencial',
  ],
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Caso Andrea — Providencia: $68.218.952 ahorrados (11%)",
    "description": "Arquitecta que inspeccionó la propiedad sola. La auditoría PCF-15™ detectó diferencia de superficie real vs. escritura e instalaciones fuera de norma. Ahorro: $68.218.952 (11%).",
    "url": "https://www.domis.cl/casos/andrea-providencia",
    "publisher": {
      "@type": "Organization",
      "name": "DOMIS™ Property Audit",
      "url": "https://www.domis.cl"
    },
    "about": { "@type": "LocalBusiness", "@id": "https://www.domis.cl/#business" },
    "mentions": [
      { "@type": "City", "name": "Providencia" },
      { "@type": "City", "name": "Santiago" }
    ]
  }
};

export default function CasoAndreaProvidencia() {
  return <CasePage data={data} />;
}
