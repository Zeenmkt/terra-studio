const DIAS_SCHEMA = {
  lunes: "Monday",
  martes: "Tuesday",
  miercoles: "Wednesday",
  jueves: "Thursday",
  viernes: "Friday",
  sabado: "Saturday",
  domingo: "Sunday",
};

function direccionSchema(terra) {
  return {
    "@type": "PostalAddress",
    streetAddress: `${terra.direccion.calle}, ${terra.direccion.detalle}`,
    addressLocality: terra.direccion.ciudad,
    addressRegion: terra.direccion.region,
    postalCode: terra.direccion.codigoPostal,
    addressCountry: "CL",
  };
}

function horarioSchema(terra) {
  // Agrupa los días que comparten el mismo horario en un solo bloque.
  const grupos = new Map();
  for (const [dia, horas] of Object.entries(terra.horario)) {
    if (!horas) continue;
    const lista = grupos.get(horas) ?? [];
    lista.push(DIAS_SCHEMA[dia]);
    grupos.set(horas, lista);
  }
  return [...grupos.entries()].map(([horas, dias]) => {
    const [opens, closes] = horas.split(" - ");
    return { "@type": "OpeningHoursSpecification", dayOfWeek: dias, opens, closes };
  });
}

export function schemaHairSalon(terra, servicios, urlSitio) {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    name: terra.nombre,
    description: terra.bajada,
    url: urlSitio,
    telephone: `+${terra.whatsapp}`,
    priceRange: "$$",
    address: direccionSchema(terra),
    areaServed: terra.direccion.ciudad,
    openingHoursSpecification: horarioSchema(terra),
    sameAs: [`https://instagram.com/${terra.instagram.replace("@", "")}`],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tratamientos capilares",
      itemListElement: servicios.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.nombre, description: s.bajada },
      })),
    },
  };
}

export function schemaServicio(servicio, terra, urlSitio) {
  const precios = servicio.precios
    ? Object.values(servicio.precios)
    : servicio.opciones.map((o) => o.precio);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: servicio.nombre,
    description: servicio.bajada,
    provider: {
      "@type": "HairSalon",
      name: terra.nombre,
      address: direccionSchema(terra),
      telephone: `+${terra.whatsapp}`,
    },
    areaServed: terra.direccion.ciudad,
    url: new URL(servicio.slug, urlSitio).toString(),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "CLP",
      lowPrice: Math.min(...precios),
      highPrice: Math.max(...precios),
    },
  };
}
