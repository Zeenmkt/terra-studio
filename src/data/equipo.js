// Equipo que se muestra en Nosotras. Es la lista PÚBLICA: nombre, rol y foto.
// No confundir con estilistas.js, que es interna (cruza calendarios para
// Disponibilidad y nunca muestra nombres).
//
// Solo entra quien Konny haya confirmado, con el nombre como quiere aparecer y
// con su autorización para salir en la web. Nada se rellena a mano: si falta
// la especialidad de alguien, la tarjeta sale sin esa línea. Cuando lleguen
// las otras cinco, se agregan acá en el orden en que deben aparecer y la
// página se arma sola (el aviso de "resto del equipo" desaparece cuando la
// lista llega a terra.estilistas).
//
// Forma de cada fila:
// {
//   nombre: "Konny Jiménez",
//   rol: "Fundadora",                  // corto, va en mayúsculas pequeñas
//   especialidad: "…",                 // opcional, una línea
//   foto: "/fotos/equipo/konny.webp",  // opcional; cuadrada, 800×800
//   alt: "…",                          // obligatorio si hay foto
// }
export const equipo = [
  {
    nombre: "Konny Jiménez",
    rol: "Fundadora",
    // Cuadro de un video que Konny grabó en el salón en septiembre de 2026
    // (GRABACIONES/Septiembre, IMG_4049).
    foto: "/fotos/equipo/konny.webp",
    alt: "Konny Jiménez, fundadora de Terra Studio, sonriendo frente a los espejos del salón",
  },
];
