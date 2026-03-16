import CasePage, { CaseData } from './CasePage';

const data: CaseData = {
  slug: 'carolina-la-reina',
  cliente: 'Carolina & Roberto',
  comuna: 'La Reina',
  ahorro: '$141.710.795',
  porcentaje: '18%',
  precioOriginal: '$787.282.194',
  precioFinal: '$645.571.399',
  metaTitle: 'Caso Carolina & Roberto — La Reina: ahorro $141.710.795 (18%) | DOMIS™',
  metaDescription: 'Auditoría técnica PCF-15™ detectó daños estructurales y filtraciones no declarados. El vendedor bajó $141 millones. Caso real documentado por DOMIS™ en La Reina, Santiago.',
  historia: [
    'Carolina y Roberto llevaban meses buscando su primera propiedad en La Reina. Cuando encontraron el departamento que querían, el precio ya estaba negociado de palabra con el corredor y la notaría estaba agendada para firmar la promesa.',
    'Tres días antes de firmar, contrataron la auditoría PCF-15™ de DOMIS™. La inspección tomó cuatro horas con cámara térmica FLIR, nivelador Bosch y medidor láser.',
    'Los hallazgos documentados incluían daños estructurales en vigas, filtraciones activas visibles solo con cámara térmica y documentación técnica inconsistente con lo declarado en la escritura. Nada de eso había sido informado por el vendedor ni por el corredor.',
    'DOMIS™ valorizó cada hallazgo en UF, cruzó con tasación de mercado real y generó el informe de negociación. El vendedor, frente a evidencia técnica documentada, bajó el precio en $141.710.795. Carolina y Roberto firmaron la promesa con certeza, no con esperanza.',
  ],
  hallazgos: [
    'Daños estructurales en vigas de entrepiso no declarados — valorizados en UF',
    'Filtraciones activas detrás de muros interiores — detectadas con cámara térmica FLIR',
    'Humedad acumulada en muros de carga — invisible a simple vista',
    'Documentación técnica inconsistente con escritura (superficie real vs. declarada)',
    'Instalaciones eléctricas con empalmes no reglamentarios en caja de distribución',
  ],
  schemaJson: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Caso Carolina & Roberto — La Reina: $141.710.795 ahorrados (18%)",
    "description": "Auditoría técnica PCF-15™ detectó daños estructurales y filtraciones ocultas. El vendedor redujo el precio en $141.710.795 (18%).",
    "url": "https://www.domis.cl/casos/carolina-la-reina",
    "publisher": {
      "@type": "Organization",
      "name": "DOMIS™ Property Audit",
      "url": "https://www.domis.cl"
    },
    "about": { "@type": "LocalBusiness", "@id": "https://www.domis.cl/#business" },
    "mentions": [
      { "@type": "City", "name": "La Reina" },
      { "@type": "City", "name": "Santiago" }
    ]
  }
};

export default function CasoCarolinaLaReina() {
  return <CasePage data={data} />;
}
