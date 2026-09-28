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
    // Único servicio sin precio publicado. No es un olvido: el valor depende de
    // la base real, de cuánto hay que cubrir y de si hubo decoloración antes,
    // así que Terra lo cotiza con foto — es lo mismo que comunica en sus
    // anuncios. Por eso lleva `cotizaConFoto` en vez de `precios`/`opciones`,
    // no aparece en el calculador y su landing muestra el proceso de
    // cotización en lugar del precio. Todo el texto de acá sale de los cuatro
    // anuncios de colorimetría de la cuenta de Terra, no está inventado.
    slug: "colorimetria",
    nombre: "Colorimetría",
    bajada: "El color se calcula, no se improvisa",
    metaTitulo: "Colorimetría y corrección de color en Temuco",
    metaDescripcion:
      "Color y corrección de color en Temuco. Mándanos una foto con luz natural y te decimos qué es posible, en cuántas sesiones y cuánto cuesta, antes de que agendes.",
    metodo: "whatsapp",
    cotizaConFoto: true,
    descripcion:
      "La fórmula no es la misma para todas. Depende de tu base real, de cuánto necesitas cubrir y de qué le hicieron antes a tu cabello. Por eso el color se calcula: miramos una foto tuya con luz natural y recién ahí te decimos qué es posible.",
    idealPara:
      "Cambiar de tono, cubrir canas, o corregir un color que no quedó como esperabas",
    cotizacion: {
      pasos: [
        "Mándanos una foto de tu cabello con luz natural, sin filtro.",
        "Te decimos qué es posible, en cuántas sesiones y cuánto cuesta.",
        "Recién ahí agendas, con el valor ya conversado.",
      ],
      nota: "También te decimos con cuánto tiempo vas a necesitar retoque, para que puedas organizarte y no te tome por sorpresa.",
    },
    restricciones: [
      {
        tipo: "sesiones",
        titulo: "Puede tomar más de una sesión",
        texto:
          "A veces se llega en una sesión, a veces en dos, y a veces conviene otro tono que te va a favorecer más. Te lo decimos antes de que agendes, no el día de la cita.",
      },
      {
        tipo: "decoloracion",
        titulo: "Si vienes a corregir un color",
        texto:
          "Primero vemos si se puede con matización, sin volver a decolorar. Decolorar encima arregla el tono y arruina la fibra: el criterio es ver primero si se puede sin castigar más tu cabello, y recién ahí evaluar otra cosa.",
      },
    ],
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
