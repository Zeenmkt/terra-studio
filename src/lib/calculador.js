export const CLAVE_LARGO = {
  Melena: "melena",
  Medio: "medio",
  Cintura: "cintura",
  Caderas: "caderas",
  "Extra largo": "extraLargo",
};

export const ETIQUETA_HISTORIAL = {
  decoloracion: "decoloración",
  tintura: "tintura",
  alisado: "alisado",
};

export function calcularPrecio(servicio, { largo, opcion, agregadosSeleccionados = [] } = {}) {
  let base = 0;

  if (servicio.variaPorLargo) {
    const clave = largo && CLAVE_LARGO[largo];
    base = clave ? servicio.precios[clave] : 0;
  } else if (servicio.opciones) {
    const elegida = servicio.opciones.find((o) => o.nombre === opcion);
    base = elegida ? elegida.precio : 0;
  }

  const totalAgregados = agregadosSeleccionados.reduce((suma, item) => suma + item.precio, 0);
  return base + totalAgregados;
}

export function obtenerAdvertencias(servicio, historial) {
  if (!servicio.restricciones || !historial || historial.length === 0) return [];
  return servicio.restricciones.filter((r) => historial.includes(r.tipo));
}

export function armarMensajeCalculadora({
  servicio,
  largo,
  opcion,
  historial = [],
  agregados = [],
  hora,
}) {
  let mensaje = `Hola! Quiero agendar ${servicio.nombre}.`;

  if (servicio.variaPorLargo && largo) {
    mensaje += ` Mi largo es ${largo.toLowerCase()}.`;
  } else if (opcion) {
    mensaje += ` Elegí: ${opcion.toLowerCase()}.`;
  }

  const historialSinNada = historial.filter((h) => h !== "nada");
  if (historialSinNada.length > 0) {
    const etiquetas = historialSinNada.map((h) => ETIQUETA_HISTORIAL[h] ?? h);
    mensaje += ` Me he hecho ${etiquetas.join(" y ")} antes.`;
  }

  if (agregados.length > 0) {
    mensaje += ` Quiero agregar: ${agregados.map((a) => a.toLowerCase()).join(", ")}.`;
  }

  // hora: string ya formateado, ej. "lunes 15 a las 09:00" (Disponibilidad.astro
  // arma el texto; esta función solo concatena, ver DISPONIBILIDAD_ACTIVA).
  if (hora) {
    mensaje += ` Vi disponible el ${hora}.`;
  }

  return mensaje;
}
