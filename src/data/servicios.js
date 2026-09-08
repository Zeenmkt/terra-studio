export const servicios = [
  {
    slug: "alisado-organico",
    nombre: "Alisado orgánico",
    bajada: "Liso y sano, no liso y sacrificado",
    metaTitulo: "Alisado orgánico en Temuco, sin formol",
    metaDescripcion:
      "Alisado orgánico sin formol en Temuco, con diagnóstico y pre-química incluidos. Calcula tu valor referencial y agenda por WhatsApp.",
    metodo: "whatsapp", // no cambiar
    variaPorLargo: true,
    precios: { melena: 60000, medio: 65000, cintura: 75000, caderas: 85000, extraLargo: 95000 },
    incluye: [
      "Pre-química: tratamiento preparatorio personalizado que fortalece, hidrata y regula el pH de la fibra antes del alisado. Cada una es única y adaptada a cada cabello",
      "Diagnóstico capilar previo",
      "Tecnología capilar: láser fotónico, plancha infrarroja fría, foto-ion, masajeador capilar",
    ],
    restricciones: [
      {
        tipo: "decoloracion",
        titulo: "Antes de agendar",
        texto:
          "Deben pasar mínimo 3 meses desde tu última decoloración para poder alisarte. Si fue hace menos, escríbenos igual: revisamos tu caso y te decimos qué te conviene mientras tanto.",
      },
      {
        tipo: "tintura",
        titulo: "Ten en cuenta",
        texto:
          "Entre tintura y alisado deben pasar mínimo 7 a 10 días, con al menos 3 lavados en el medio. Cuéntanos cuándo te teñiste y coordinamos las fechas.",
      },
    ],
    duracionAviso: "Considera mínimo 4 horas. Si tu cabello es rizado o afro, calcula 5 horas o más",
  },
  {
    slug: "botox-capilar",
    nombre: "Botox capilar",
    bajada: "Brillo, suavidad y control del frizz",
    metaTitulo: "Botox capilar en Temuco",
    metaDescripcion:
      "Botox capilar en Temuco: brillo, suavidad y control del frizz. Calcula tu valor referencial y agenda por WhatsApp con diagnóstico incluido.",
    metodo: "whatsapp",
    variaPorLargo: true,
    precios: { melena: 40000, medio: 45000, cintura: 50000, caderas: 55000, extraLargo: 60000 },
    descripcion:
      "Tratamiento cosmético de acondicionamiento intensivo. Mejora la apariencia y manejabilidad del cabello: aporta suavidad, brillo, hidratación y control del frizz, dejando la fibra con un aspecto más uniforme y sedoso.",
    idealPara: "Cabellos opacos, secos, porosos, con frizz o que han perdido suavidad y luminosidad",
    noEs: "No es un tratamiento de restauración. Mejora cómo se ve tu cabello, no cómo está. Para restaurar la fibra por dentro, el servicio es Reconstrucción SOS",
    duracionAviso: "Considera mínimo 4 horas",
  },
  {
    slug: "reconstruccion-sos",
    nombre: "Reconstrucción SOS",
    bajada: "Restauración real, dentro de la fibra",
    metaTitulo: "Reconstrucción capilar en Temuco",
    metaDescripcion:
      "Reconstrucción SOS para cabello dañado en Temuco: restauración real, dentro de la fibra. Calcula tu valor referencial y agenda por WhatsApp.",
    metodo: "whatsapp",
    variaPorLargo: true,
    precios: { melena: 35000, medio: 40000, cintura: 45000, caderas: 50000, extraLargo: 55000 },
    descripcion: "Tratamiento restaurativo que trabaja dentro de la fibra capilar, no en la superficie.",
    idealPara: "Cabello poroso por decoloración, por mucho calor o por químicos seguidos",
    duracionAviso: "Considera mínimo 4 horas",
  },
  {
    slug: "masaje-capilar",
    nombre: "Masaje capilar",
    bajada: "Nutrición, hidratación y restauración",
    metaTitulo: "Masaje capilar en Temuco",
    metaDescripcion:
      "Masaje capilar en Temuco para nutrición, hidratación y restauración. Calcula tu valor referencial y agenda por WhatsApp.",
    metodo: "whatsapp",
    variaPorLargo: true,
    precios: { melena: 30000, medio: 35000, cintura: 40000, caderas: 45000, extraLargo: 50000 },
  },
  {
    slug: "corte-bordado",
    nombre: "Corte bordado profundo",
    bajada: "Saca lo dañado, deja el largo",
    metaTitulo: "Corte bordado profundo en Temuco",
    metaDescripcion:
      "Corte bordado profundo en Temuco: saca lo dañado, deja el largo. Incluye lavado, masaje y brushing. Agenda por WhatsApp.",
    metodo: "whatsapp",
    variaPorLargo: true,
    precios: { melena: 25000, medio: 30000, cintura: 35000, caderas: 40000, extraLargo: 45000 },
    incluye: ["Lavado", "Masaje", "Brushing"],
  },
  {
    slug: "cortes",
    nombre: "Cortes",
    bajada: "Corte con asesoría personalizada",
    metaTitulo: "Corte de pelo en Temuco",
    metaDescripcion:
      "Cortes de pelo en Temuco con asesoría personalizada según tu rostro y tu cabello. Calcula tu valor referencial y agenda por WhatsApp.",
    metodo: "whatsapp",
    variaPorLargo: false,
    opciones: [
      { nombre: "Despunte", precio: 15000 },
      { nombre: "Chasquilla o flequillo", precio: 5000 },
      {
        nombre: "Corte + lavado + masaje + brushing",
        precio: 30000,
        detalle: "Para todo tipo de corte: melena, bob, recto, mariposa, capas, corte en V",
      },
    ],
    asesoria:
      "Miramos tus facciones, la forma de tu rostro, la densidad, la textura y el movimiento natural de tu cabello. A partir de eso elegimos el corte que mejor se adapta a ti.",
  },
];

export const agregados = [
  { nombre: "Vitaminas", precio: 5000 },
  { nombre: "Despunte", precio: 8000 },
  { nombre: "Corte", precio: 10000 },
  { nombre: "Bordado + corte", precio: 15000 },
  { nombre: "Extra cabello", precio: 10000 },
];

export const largos = ["Melena", "Medio", "Cintura", "Caderas", "Extra largo"];
