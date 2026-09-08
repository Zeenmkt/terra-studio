// Bandera única: mientras sea false, <Disponibilidad> no renderiza nada ni
// llama a la función serverless. Cambiar a true recién cuando existan
// credenciales de Google reales y el mapa de estilistas en
// src/data/estilistas.js (ver TERRA_WEB_SISTEMA-DISPONIBILIDAD.md).
export const DISPONIBILIDAD_ACTIVA = false;

const FORMATO_DIA = new Intl.DateTimeFormat("es-CL", {
  weekday: "long",
  day: "numeric",
  month: "long",
});
const FORMATO_HORA = new Intl.DateTimeFormat("es-CL", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export async function obtenerHoras(servicioSlug) {
  try {
    const respuesta = await fetch(`/.netlify/functions/disponibilidad?servicio=${servicioSlug}`);
    if (!respuesta.ok) return [];
    const datos = await respuesta.json();
    return (datos.horas ?? []).map((iso) => new Date(iso));
  } catch {
    // Si la función falla o no existe (por ejemplo en desarrollo local sin
    // `netlify dev`), el bloque se oculta y el sitio sigue funcionando.
    return [];
  }
}

export function agruparPorDia(fechas) {
  const grupos = new Map();
  for (const fecha of fechas) {
    const clave = fecha.toDateString();
    const lista = grupos.get(clave) ?? [];
    lista.push(fecha);
    grupos.set(clave, lista);
  }
  return [...grupos.values()].map((fechasDelDia) => ({
    etiquetaDia: FORMATO_DIA.format(fechasDelDia[0]),
    horas: fechasDelDia.map((fecha) => ({ fecha, etiqueta: FORMATO_HORA.format(fecha) })),
  }));
}

export function formatearHoraParaWhatsApp(fecha) {
  return `${FORMATO_DIA.format(fecha)} a las ${FORMATO_HORA.format(fecha)}`;
}
