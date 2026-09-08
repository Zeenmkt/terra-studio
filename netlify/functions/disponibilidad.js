// Función serverless de Netlify — GET /.netlify/functions/disponibilidad?servicio=<slug>
//
// Consulta libre/ocupado (freeBusy) de Google Calendar para las estilistas
// que hacen ese servicio, y devuelve solo bloques de horario libres dentro
// del horario de atención. Nunca lee ni devuelve nombres, títulos de
// eventos ni ningún otro detalle — freeBusy.query de Google solo entrega
// intervalos ocupados, es técnicamente imposible que filtre datos
// personales por accidente.
//
// Apagada mientras DISPONIBILIDAD_ACTIVA sea false en
// src/lib/disponibilidad.js: el cliente ni siquiera llama a esta función.
// Sin probar contra un calendario real todavía — ver el pendiente #2 del
// README (mapa de estilistas) y #3 (credenciales de Google) antes de activar.
import { JWT } from "google-auth-library";
import { estilistas } from "../../src/data/estilistas.js";
import { duraciones } from "../../src/data/duraciones.js";

const HORARIO_INICIO = 9;
const HORARIO_FIN = 19;
const VENTANA_DIAS = 14;
const DOMINGO = 0;
const PASO_MINUTOS = 60;

function proximosDias(cantidad) {
  const dias = [];
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  for (let i = 1; i <= cantidad; i++) {
    const dia = new Date(hoy);
    dia.setDate(hoy.getDate() + i);
    dias.push(dia);
  }
  return dias;
}

function horasCandidatas(dia, duracionMin) {
  const candidatas = [];
  for (let minutos = HORARIO_INICIO * 60; minutos + duracionMin <= HORARIO_FIN * 60; minutos += PASO_MINUTOS) {
    const inicio = new Date(dia);
    inicio.setMinutes(minutos);
    candidatas.push(inicio);
  }
  return candidatas;
}

function seSuperponen(inicioA, finA, inicioB, finB) {
  return inicioA < finB && inicioB < finA;
}

async function consultarFreeBusy(auth, calendarIds, desde, hasta) {
  const respuesta = await auth.request({
    url: "https://www.googleapis.com/calendar/v3/freeBusy",
    method: "POST",
    data: {
      timeMin: desde.toISOString(),
      timeMax: hasta.toISOString(),
      items: calendarIds.map((id) => ({ id })),
    },
  });
  return respuesta.data.calendars;
}

export const handler = async (event) => {
  const encabezados = {
    "Content-Type": "application/json",
    "Cache-Control": "public, max-age=600",
  };

  try {
    const slug = event.queryStringParameters?.servicio;
    const duracionMin = slug && duraciones[slug];
    const relevantes = estilistas.filter((e) => e.servicios.includes(slug));

    if (!duracionMin || relevantes.length === 0) {
      // Sin duración confirmada o sin estilistas asignadas todavía: no se
      // puede calcular nada real, así que no se ofrece ninguna hora.
      return { statusCode: 200, headers: encabezados, body: JSON.stringify({ horas: [] }) };
    }

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
    });

    const dias = proximosDias(VENTANA_DIAS);
    const desde = dias[0];
    const hasta = new Date(dias[dias.length - 1]);
    hasta.setHours(23, 59, 59, 999);

    const calendarios = await consultarFreeBusy(
      auth,
      relevantes.map((e) => e.calendarId),
      desde,
      hasta
    );

    const horas = [];
    for (const dia of dias) {
      if (dia.getDay() === DOMINGO) continue;

      for (const inicio of horasCandidatas(dia, duracionMin)) {
        const fin = new Date(inicio.getTime() + duracionMin * 60000);

        const hayEstilistaLibre = relevantes.some((estilista) => {
          const ocupados = calendarios[estilista.calendarId]?.busy ?? [];
          return !ocupados.some((bloque) =>
            seSuperponen(inicio, fin, new Date(bloque.start), new Date(bloque.end))
          );
        });

        if (hayEstilistaLibre) {
          horas.push(inicio.toISOString());
        }
      }
    }

    return { statusCode: 200, headers: encabezados, body: JSON.stringify({ horas }) };
  } catch (error) {
    // Si Google no responde o algo falla, el sitio sigue funcionando: el
    // cliente interpreta cualquier respuesta que no sea 200 como "ocultar
    // el bloque", nunca como un error visible para la clienta.
    console.error("disponibilidad: freeBusy falló", error);
    return { statusCode: 502, headers: encabezados, body: JSON.stringify({ horas: [] }) };
  }
};
