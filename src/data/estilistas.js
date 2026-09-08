// ⬜ Pendiente: Konny confirma esta lista antes de activar Disponibilidad
// (ver TERRA_WEB_SISTEMA-DISPONIBILIDAD.md, sección 4 — "Qué estilista hace
// qué"). Cada calendario es de solo lectura para la cuenta de servicio de
// Google, y la web nunca expone el nombre: solo se usa para decidir a qué
// calendarios consultar por tratamiento.
//
// Forma esperada de cada fila:
// {
//   nombre: "Konny",                                    // interno, nunca se muestra
//   calendarId: "xxxxx@group.calendar.google.com",       // compartido de solo lectura
//   servicios: ["alisado-organico", "botox-capilar"],    // slugs de servicios.js
// }
export const estilistas = [];
