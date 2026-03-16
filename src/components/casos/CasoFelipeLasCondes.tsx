import CasePage, { CaseData } from './CasePage';

const data: CaseData = {
  slug: 'felipe-las-condes',
  cliente: 'Felipe',
  comuna: 'Las Condes',
  ahorro: '$39.550.715',
  porcentaje: '9%',
  precioOriginal: '$439.452.389',
  precioFinal: '$399.901.674',
  metaTitle: 'Caso Felipe — Las Condes: ahorro $39.550.715 (9%) | DOMIS™',
  metaDescription: 'Comprador en Las Condes con hijo recién nacido y sin tiempo para buscar. La auditoría PCF-15™ encontró daños en techumbre y un proyecto de ampliación rechazado no informado. Ahorro: $39 millones.',
  historia: [
    'Felipe tenía un hijo de 4 años y otro en camino cuando necesitó comprar en Las Condes. No tenía tiempo para buscar con calma ni para revisar con detalle. Encontró la propiedad a través de un corredor, el precio le pareció razonable y quería cerrar rápido.',
    'DOMIS™ auditó la propiedad en 48 horas. La inspección reveló tres problemas que el corredor no había mencionado y que el vendedor tampoco declaró.',
    'El más relevante: un proyecto de ampliación de la terraza había sido rechazado por la DOM (Dirección de Obras Municipales) y esa situación no estaba reflejada en el título de la propiedad ni en la documentación entregada al comprador. Además había daños activos en la techumbre y filtraciones en dos puntos del cielo del dormitorio.',
    'Con el informe técnico documentado, DOMIS™ negoció directamente con el vendedor. El precio bajó $39.550.715. Felipe cerró en menos de una semana, con certeza sobre lo que compraba.',
  ],
  hallazgos: [
    'Proyecto de ampliación de terraza rechazado por DOM — no declarado en escritura',
    'Daños activos en techumbre con entrada de agua en dos puntos',
    'Filtraciones en cielo del dormitorio principal — detectadas con cámara térmica FLIR',
    'Impermeabilización de terraza deteriorada — causa raíz de las filtraciones',
    'Documentación inconsistente: permiso de obra pendiente no informado al comprador',
  ],
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Caso Felipe — Las Condes: $39.550.715 ahorrados (9%)",
    "description": "Comprador en Las Condes sin tiempo para revisar. La auditoría PCF-15™ detectó proyecto rechazado por DOM y daños en techumbre no declarados. Ahorro: $39.550.715 (9%).",
    "url": "https://www.domis.cl/casos/felipe-las-condes",
    "publisher": {
      "@type": "Organization",
      "name": "DOMIS™ Property Audit",
      "url": "https://www.domis.cl"
    },
    "about": { "@type": "LocalBusiness", "@id": "https://www.domis.cl/#business" },
    "mentions": [
      { "@type": "City", "name": "Las Condes" },
      { "@type": "City", "name": "Santiago" }
    ]
  }
};

export default function CasoFelipeLasCondes() {
  return <CasePage data={data} />;
}
