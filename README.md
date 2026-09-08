# Terra Studio · sitio web

Estudio de belleza capilar en Temuco. Astro + CSS propio, sin frameworks de
utilidades. Ver `TERRA_WEB_PROMPT-MAESTRO-CLAUDE-CODE.md` (carpeta padre) para
el encargo completo — este README solo cubre el estado técnico.

## Cómo correr

```sh
npm install
npm run dev
```

Sitio en `http://localhost:4321`.

## Estado · Fase 1 · Fundaciones ✅

- Astro (`minimal`, TypeScript strict), fuentes convertidas a WOFF2, tokens de
  diseño, componentes base. Compila, sin contenido de página todavía.
- Fuentes: `assets/fonts/*.otf` (entregadas) → `scripts/convertir-fuentes.mjs`
  → `public/fonts/*.woff2`. Si Konny envía archivos nuevos, se reemplazan en
  `assets/fonts/` con el mismo nombre y se vuelve a correr el script.
- Logos: los 24 PNG entregados están en `assets/logos/` (Recurso 101–124,
  sello · isotipo · vertical · horizontal × blanco/crema/caramelo/marrón/
  terracota/negro). El favicon usa el isotipo terracota (`public/favicon.png`);
  el header y el pie usan los horizontales terracota/crema (`public/logos/`).
- `assets/fotos/`, `assets/brandboard/`, `assets/redes-sociales/` guardan el
  resto de lo entregado (ver más abajo). Las dos últimas carpetas pesan mucho
  y están en `.gitignore` — no se suben al repo.

## Estado · Fase 2 · Layout ✅

- `Header.astro`: logo, desplegable "Servicios" (`<details>`, sin JS) con los
  6 tratamientos, Nosotras, Contacto, botón "Agendar por WhatsApp". En móvil
  (`<768px`) colapsa a hamburguesa + panel con los mismos enlaces.
- `Footer.astro`: logo horizontal crema sobre marrón, servicios, dirección +
  WhatsApp + Instagram, horario completo — todo desde `negocio.js`/`servicios.js`.
- `BotonFlotanteWhatsApp.astro`: burbuja fija solo en móvil (el header ya
  cubre ese rol en desktop).
- Ambos quedaron cableados en `BaseLayout`, así que **todas** las páginas los
  tienen. Cada servicio de `servicios.js` generó su propia ruta
  (`src/pages/[slug].astro`, data-driven) más `/nosotras` y `/contacto` como
  stubs — para que la navegación no tenga enlaces rotos mientras llegan las
  Fases 5 y 6.
- Dos bugs reales encontrados y corregidos en el camino: el botón de
  WhatsApp del header no se ocultaba en móvil (conflicto de especificidad
  entre un `:global()` y el estilo propio de `Boton.astro`), y el panel del
  menú móvil no colapsaba a cero (dos hijos directos en el grid en vez de
  uno). Ver el commit/diff si hace falta el detalle.

## Estado · Fase 3 · Home — las 10 secciones ✅

Construido: Hero, El método, Servicios, El filtro honesto, un placeholder
honesto para el Calculador (ese componente es la Fase 4, con su propia
especificación — no tenía sentido adelantarlo a medias acá), Confianza,
Antes y después, Reseñas y Ubícanos. La sección 10 (Pie) ya existía desde la
Fase 2 — es el mismo `Footer` en todas las páginas.

- **Confianza**: los 4 sellos, con el texto exacto del ISP/ANVISA que pide
  el prompt (el registro es de los productos, no del salón).
- **Antes y después** y **Reseñas**: sin fotos ni testimonios reales
  todavía (pendientes #2 y #3), así que son marcadores honestos — Reseñas en
  particular no tiene ni una tarjeta de ejemplo, porque inventar un nombre o
  una cita, aunque fuera "de prueba", cruza la regla de no inventar reseñas.
- **Ubícanos**: mapa embebido de Google (sin API key, con `output=embed`) y
  botón "Cómo llegar" armado con la dirección real vía
  `maps/dir/?api=1&destination=`. Verifiqué que el mapa ubica el punto
  correcto — se ve el Mall Portal Temuco justo al lado, como dice la
  referencia.

- **Hero**: sin foto real todavía (pendiente #1), así que el fondo es un
  degradado dentro de la paleta — nunca una foto inventada. Queda marcado en
  pantalla ("⬜ Foto del local pendiente") y en un comentario en el código
  exactamente qué reemplazar (la foto + el velo terracota al 40%) cuando
  llegue. El parallax sutil que pide el prompt maestro también quedó
  pendiente de esa foto — no tiene sentido animar un degradado.
- **Servicios**: sin fotos por tratamiento tampoco, así que cada tarjeta usa
  el arco como bloque de color (caramelo, cambia a terracota en hover — el
  comportamiento que pide el prompt, con o sin foto real detrás). Precio
  "desde" calculado como el mínimo real de cada servicio, con
  `formatearCLP()` (nuevo, en `src/lib/formato.js`) para el formato
  `$75.000` exacto.
- **El filtro honesto**: la cita de Konny textual, sección aparte con más
  espacio que las demás (`espacio="amplio"` en `Seccion`).
- Guardé las reglas de voz explícitas del prompt maestro en
  `.claude/brand-voice-guidelines.md` — el skill `brand-voice:enforce-voice`
  esperaba ese archivo y no existía. Sirve para esta fase y para la 5.

**Bug real encontrado y corregido:** los cuatro colores de fondo de `Arco`
(`arco--base/impacto/oscuro/superficie`) no se aplicaban — Vite no había
recargado esas reglas nuevas en el servidor ya corriendo. Un reinicio del
dev server lo resolvió; si vuelve a pasar algo así (un estilo nuevo que no
aparece), reiniciar antes de asumir que el código está mal.

### Estructura

```
src/
  data/       negocio.js, servicios.js — datos del negocio, tal como llegaron
  lib/        whatsapp.js (urlWhatsApp), formato.js (formatearCLP),
              calculador.js (calcularPrecio, obtenerAdvertencias, armarMensajeCalculadora)
  styles/     tokens.css, fonts.css, global.css
  components/ Boton, Seccion (revelado al scroll, fondo, espacio, as),
              Arco (fondo opcional cuando no hay foto), Header, Footer,
              BotonFlotanteWhatsApp, Calculador (servicioInicial? para landings)
  components/home/  Hero, Metodo, ServiciosGrid, FiltroHonesto, Confianza,
              AntesDespues, Resenas, UbicacionHorario
  layouts/    BaseLayout.astro — incluye Header/Footer/flotante en toda página
  pages/      index.astro (el home real) · [slug].astro (landings,
              data-driven) · nosotras.astro · contacto.astro (stubs Fase 6)
```

`Seccion.astro` revela su contenido al hacer scroll (fade + subida de 24px),
respeta `prefers-reduced-motion`, y **sin JavaScript el contenido se ve
completo igual** (la ocultación inicial vive bajo `.js`, agregada por un
script inline antes del primer paint — sin esa clase nada queda invisible).

## Estado · Fase 4 · Calculador de valor referencial ✅

`src/components/Calculador.astro` + `src/lib/calculador.js`. Las tres
preguntas en una sola pantalla (no wizard con pasos ocultos — el módulo de
precios es explícito: "sin registro, sin formulario"), con `servicioInicial`
para precargarlo en una landing (ya conectado en `[slug].astro`, así que las
6 landings-stub tienen el calculador funcionando de verdad, aunque el resto
del copy siga pendiente de la Fase 5).

Probado en el navegador, no solo revisado a ojo:
- Cada combinación de servicio × largo da el precio exacto de `servicios.js`
  (incluyendo Cortes, que no usa largo sino sus 3 `opciones`).
- Las dos advertencias (decoloración, tintura) aparecen solas o juntas según
  el historial marcado, con el título y el texto completo del módulo de
  precios — actualicé `servicios.js` con el texto completo, el que tenía
  antes le faltaba la frase de "escríbenos igual" en ambas.
- "Nada de eso" es excluyente con las otras tres opciones, en los dos
  sentidos (marcar otra cosa la desmarca a ella, y viceversa).
- Los agregados suman al precio y aparecen en el mensaje de WhatsApp.
- El link de WhatsApp codifica bien tildes y ñ — confirmado decodificando la
  URL generada, no solo mirándola.

**Bug real encontrado y corregido:** al cambiar de servicio con agregados ya
marcados, el panel de agregados se ocultaba pero el precio y el mensaje
seguían sumándolos — quedaban "fantasma". Ahora cambiar de servicio limpia
los agregados también.

**Pendiente, marcado como tal en el propio módulo de precios:** la
ilustración de los 5 largos (sección 6 de ese documento dice que la versión
anterior "tiene seis niveles inventados y no calza" — no iba a inventar una
nueva sin esa referencia). Por ahora el paso 2 usa botones de texto, que
funcionan igual.

## Estado · Fase 5 · Landings ✅

Una sola plantilla data-driven (`src/pages/[slug].astro`, la misma que ya
existía) enriquecida con todo lo que había en `servicios.js` para cada
tratamiento: descripción/asesoría, ideal para, qué NO es (con link real al
SOS cuando corresponde — "el botox no repara" queda clickeable, no solo
dicho), qué incluye, opciones (Cortes), restricciones, el calculador ya
precargado, y enlaces a los otros 5 servicios. Ninguna landing quedó vacía;
las que tienen menos datos (Masaje capilar) simplemente muestran menos
secciones — nada relleno para parecer completo.

SEO on-page por servicio: `metaTitulo` y `metaDescripcion` nuevos en
`servicios.js`, siguiendo las keywords de la sección 11 del prompt maestro.
**Masaje capilar no tenía keyword asignada en ese documento** — usé
"masaje capilar Temuco" siguiendo el mismo patrón exacto de las otras 5
filas (servicio + Temuco), así que no es un dato inventado, solo el patrón
ya establecido aplicado al único caso que faltaba.

**Dos bugs reales de layout encontrados y corregidos, no específicos de
landings pero que aparecieron probándolas:**
1. El calculador mostraba los botones de "opción" (Cortes) por encima de los
   de "largo" en servicios que no son Cortes — el atributo `hidden` perdía
   contra una regla CSS de la misma especificidad que ponía `display:flex`
   en la misma clase (`.calculador__opciones`). Pasa con cualquier elemento
   que use `hidden` y también tenga una clase con `display` propio — quedó
   corregido con `[hidden]` explícito, y documentado por si se repite en
   otro componente nuevo.
2. **Desborde horizontal real en móvil** — "El método" (y potencialmente
   cualquier grilla del sitio) se salía del viewport porque `1fr` en CSS
   Grid no encoge por debajo del contenido mínimo del texto. Cambié las 10
   declaraciones `grid-template-columns` del proyecto a `minmax(0, 1fr)`, y
   agregué `overflow-x: hidden` en `body` como red de seguridad adicional.

## Estado · Fase 6 · Nosotras y Contacto ✅

- **Contacto**: reutiliza `UbicacionHorario` (antes vivía solo en
  `components/home/`, ahora es compartido — el mapa, dirección, horario y
  botones son los mismos en Home y en Contacto, sin duplicar código) más un
  formulario nuevo (`FormularioContacto.astro`) con envío por `fetch` a
  Formspree, sin recargar la página.
  - ✅ **Conectado a Formspree** (`f/xaeypkgz`) — probé los tres estados
    (sin configurar simulando la respuesta, éxito, error) y además un envío
    real al endpoint verdadero: llegó, el formulario mostró el mensaje de
    éxito y se ocultó correctamente.
- **Nosotras**: filosofía adaptada de un texto real de la marca anterior
  (encontrado en las gráficas de precios de Alisados Konny — la misión de
  diagnóstico y personalización no cambió con el rebranding, así que lo usé
  como base real, no como invención; vale la pena que Konny lo revise).
  Historia y equipo quedaron como marcadores honestos — no hay nombres,
  fotos ni fechas en ningún documento, así que no inventé ninguno.

**Bug real encontrado y corregido:** el mensaje de éxito del formulario vivía
DENTRO del `<form>` — al ocultar el formulario en el envío exitoso, el
mensaje se ocultaba con él. Lo saqué como hermano del formulario, no hijo.

## Estado · Fase 7 · SEO ✅

- **Schema JSON-LD**: `src/lib/schema.js`, data-driven desde `negocio.js`/
  `servicios.js` (nada hardcodeado dos veces). `HairSalon` completo en el
  home (dirección, horario agrupado por bloques, `priceRange: "$$"`,
  catálogo de los 6 servicios). `Service` en cada landing, con
  `AggregateOffer` usando el mínimo y máximo real de precios — funciona
  igual para los servicios con `precios` por largo que para Cortes, que usa
  `opciones`. Validé el JSON generado en el build de las 7 páginas.
- **Sitemap y robots**: `@astrojs/sitemap` genera `sitemap-index.xml` en
  cada build (verificado: lista las 9 páginas). `public/robots.txt` lo
  referencia. **Los dos usan un dominio de reemplazo**
  (`https://terra-studio.netlify.app`, en `astro.config.mjs`) — hay que
  cambiarlo por el dominio real en la Fase 10, ahí se actualiza sitemap,
  robots, canónicas y Open Graph de una sola vez porque todos salen de esa
  única variable.
- **Canónicas y Open Graph**: agregadas a `BaseLayout` para toda página —
  `og:title`, `og:description`, `og:image` (el logo horizontal terracota),
  `og:url`, `twitter:card`. Cada página arma su URL canónica sola a partir
  de su ruta.
- **Keywords por página** (sección 11 del prompt maestro): ya quedaron en
  `metaTitulo`/`metaDescripcion` de cada servicio (Fase 5) y en el
  title/description del home ("Peluquería y estudio capilar en Temuco").
  Masaje capilar seguía siendo el único sin keyword asignada en el
  documento — ya está resuelto desde la Fase 5.
- **Enlazado interno**: ya estaba armado desde la Fase 5 (cada landing
  enlaza a los otros 5 servicios, Botox enlaza a SOS, el menú y el pie
  enlazan todo desde cualquier página) — lo revisé y no encontré huecos que
  agregar.
- **Lazy loading**: el logo del pie ahora carga con `loading="lazy"` (está
  bajo el pliegue en cada página). El del header y el del hero se quedan sin
  ese atributo a propósito — son parte de lo primero que se ve.
- **Core Web Vitals / Lighthouse**: no lo medí todavía — la Fase 9
  (Calidad) es la que trae ese chequeo con su propio skill. Lo que sí quedó
  resuelto acá es la base técnica que un buen puntaje necesita (sitemap,
  canónicas, WOFF2 con `font-display: swap` desde la Fase 1, HTML
  semántico).

## Estado · Fase 8 · Disponibilidad — construida, apagada ✅

`DISPONIBILIDAD_ACTIVA = false` en `src/lib/disponibilidad.js`. Con la
bandera en `false`, `<Disponibilidad>` no se renderiza — literalmente no
existe en el HTML ni se pide la función serverless (confirmado con el
build: cero rastro de `obtenerHoras` en el JS de las páginas). Lo único que
queda cargado siempre son unas pocas reglas CSS sin usar, inofensivas.

- `netlify/functions/disponibilidad.js`: consulta `freeBusy` de Google
  Calendar (nunca lee eventos, solo bloques ocupados — es imposible que
  exponga un nombre por accidente), agrega los calendarios de las
  estilistas que hacen ese servicio, filtra por su duración, y devuelve
  solo horas en formato ISO. Si algo falla, responde igual (nunca revienta)
  y el cliente lo trata como "sin horas".
- **Probé el algoritmo de cálculo de franjas de forma aislada** (con datos
  simulados, ver el detalle en la memoria del proyecto): confirma que
  respeta el horario 9-19, no ofrece una franja que se pase de las 19:00, y
  descarta correctamente las horas que chocan con un bloque ocupado.
  **Lo que NO pude probar** es la integración real con Google Calendar — no
  hay credenciales ni calendarios todavía.
- `<Disponibilidad>` vive junto al `<Calculador>` en la misma `Seccion` de
  cada landing, y lee su selección de hora vía DOM (mismo patrón
  `aria-pressed` que ya usa el resto del sitio) para completar el mensaje
  de WhatsApp con la hora elegida — extendí `armarMensajeCalculadora` para
  aceptar ese dato, completando la firma original del prompt maestro.
  Encendí la bandera un momento para probar esta integración en el
  navegador (sin datos reales, la función 404 en local) y encontré y
  corregí un bug real: el texto de "sin horas" era crema sobre fondo
  crema — invisible. Ya quedó con su color de texto pareado.

**Lo que falta para encender esto de verdad** (todo pendiente de Konny, ver
`TERRA_WEB_SISTEMA-DISPONIBILIDAD.md`):
1. `src/data/estilistas.js` — hoy es un arreglo vacío con la forma
   documentada adentro. Sin nombres, calendarios ni servicios reales.
2. `src/data/duraciones.js` — solo Alisado tiene duración (reusé el "4
   horas" ya público). Los otros 5 servicios quedan fuera de Disponibilidad
   hasta confirmar cuánto duran de verdad.
3. Credenciales de Google: `GOOGLE_SERVICE_ACCOUNT_EMAIL` y
   `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` como variables de entorno en
   Netlify (nunca en el repo — por eso `.netlify/` ya está en
   `.gitignore`), más compartir cada calendario de estilista con esa
   cuenta de servicio, de solo lectura.
4. Recién ahí: cambiar `DISPONIBILIDAD_ACTIVA` a `true`.

## Estado · Fase 9 · Calidad ✅

Auditoría en las 9 páginas: accesibilidad primero (la que el prompt maestro
marca como crítica), después código, SEO y checklist de deploy. Esta fue la
fase que más encontró — el hallazgo más importante fue de contraste, no de
funcionalidad.

### Accesibilidad — lo importante

**El par "superficie" (caramelo + marrón) que definí en la Fase 1 no pasa
WCAG AA.** Lo había armado específicamente para evitar la combinación
prohibida por el prompt maestro (caramelo + crema), pero nunca calculé el
contraste real de la alternativa: da **2.17:1**, no pasa ni el mínimo de
texto grande (3:1). Verificación completa de la paleta cerrada:

| Combinación | Contraste | ¿Pasa AA? |
|---|---|---|
| Marrón sobre crema (texto normal) | 4.88:1 | ✅ |
| Crema sobre marrón | 4.88:1 | ✅ |
| Terracota sobre crema, texto grande (≥24px) | 4.29:1 | ✅ |
| Terracota sobre crema, texto normal (<24px) | 4.29:1 | 🟡 marginal, falta 0.21 |
| Caramelo + cualquier otro color de la paleta | 1.9–2.2:1 | ❌ |

Encontré esto con un script que recorre el DOM completo de cada página,
calcula el contraste real (fórmula WCAG, no una aproximación) contra el
fondo efectivo de cada elemento con texto, y filtra por el umbral correcto
según tamaño y peso — no una revisión a ojo.

**Corregido (rompía legibilidad de verdad):**
- El caramelo salió de todo lugar con texto encima — sigue existiendo, pero
  solo como relleno decorativo de los `Arco` (sin texto arriba). Las 6+
  secciones que lo usaban con texto (Reseñas, Nosotras/Equipo,
  Contacto/Escríbenos, "Qué es" de cada landing, las advertencias del
  calculador, el hover del menú Servicios, el estado del formulario) pasaron
  a marrón/crema.
- **El calculador tenía sus botones sin seleccionar en marrón fijo**, y en
  cada landing vivía sobre fondo terracota: marrón sobre terracota da
  **1.14:1**, prácticamente invisible. Lo corregí constriñendo el
  Calculador a usarse siempre sobre `fondo="base"` (documentado en el propio
  componente) — como el resultado del calculador y el panel de
  Disponibilidad viven ahí también, arreglar el fondo los arregló a los
  tres.
- Corrigiendo el fondo de Contacto/Escríbenos casi introduzco el mismo bug
  de nuevo: el texto "¿Prefieres no esperar?" tenía marrón fijo y hubiera
  quedado marrón sobre marrón. Ahora hereda el color en vez de fijarlo, así
  sirve sobre cualquier fondo.
- El home no tenía ningún `<h1>` — el Hero solo tenía la imagen del logo y
  un párrafo. Ahora el claim es el h1.
- La sección Confianza no tenía ningún encabezado — un lector de pantalla
  navegando por encabezados se la saltaba entera. Le agregué un h2.
- Dos casos más del bug de `hidden` perdiendo contra `display:flex` de la
  misma especificidad (ver Fase 5) — uno en el resultado del calculador, uno
  en Disponibilidad.
- Blancos táctiles: los botones del calculador y de Disponibilidad subieron
  de ~35px a ~44px de alto.

**Documentado, no corregido (hallazgo real pero menor):** terracota sobre
crema en texto chico (botones "Agendar por WhatsApp"/"Cómo llegar", los
"Desde $X") da 4.29:1 contra un mínimo de 4.5:1 — un 4.7% por debajo.
Subí el tamaño mínimo de los h3 (que sí eran texto grande a la mayoría de
anchos, pero no en el mínimo responsivo) para que esos casos pasen
limpiamente; los textos más chicos se quedaron así porque agrandarlos
cambia la proporción de los botones sin que el prompt maestro lo haya
pedido. Es terracota y crema, los dos colores fijos de la paleta — no hay
margen para corregirlo sin decisión del cliente.

### Código, SEO y deploy

- Revisé XSS/seguridad: el único `set:html` (el JSON-LD) y el único
  `innerHTML` (las advertencias del calculador) reciben siempre datos
  propios de `servicios.js`, nunca entrada de usuario — no hay vector de
  inyección real hoy.
- Sin `console.log` ni `TODO`/`FIXME` sueltos en el código.
- Enlaces internos: crucé cada `href` del código contra las rutas reales
  del build — cero enlaces rotos. La mayoría se arman desde el mismo array
  `servicios` que genera las rutas, así que no se pueden desincronizar.
- Build de producción limpio, sin errores ni advertencias, en las 9 páginas.
- Lighthouse real no lo pude correr en este entorno (no hay Chrome
  DevTools/CLI disponible) — lo que sí verifiqué es la base técnica que un
  buen puntaje necesita: HTML semántico correcto, WOFF2 con
  `font-display: swap`, sitemap/robots/canónicas, sin JS bloqueante extra,
  imágenes livianas. Vale la pena correr un Lighthouse real una vez
  publicado en Netlify (Fase 10).

## Estado · Fase 10 · Deploy ✅

- **Repositorio**: [github.com/Zeenmkt/terra-studio](https://github.com/Zeenmkt/terra-studio),
  público, rama `main`.
- **Netlify**: conectado directo al repo vía GitHub. `netlify.toml` ya traía
  `build.command = "npm run build"` y `build.publish = "dist"`, así que
  Netlify detectó la build sola, sin configurar nada a mano — 9 páginas + 1
  función (`disponibilidad`) desplegadas desde el primer build.
- **Bug real encontrado (no de código):** el proyecto nació con la
  protección de equipo de Netlify activada — cualquier visitante real se
  topaba con una pantalla de "This site is private" pidiendo iniciar sesión
  en Netlify. Se corrigió desde el dashboard (**Project configuration → Web
  security**), no requirió cambios en el repo.
- **Dominio real**: `https://terrastudiosalon.netlify.app`, ya actualizado
  en `astro.config.mjs` — resuelve el pendiente #10. Sitemap, canónicas,
  Open Graph y el schema `HairSalon` ya salen de ese valor, confirmado en el
  sitio publicado (no solo en el build local).
- **Probado en el sitio publicado**, no solo en local: tildes/ñ, cero
  errores de consola en el home y en una landing, los botones de WhatsApp
  (los genéricos van a `wa.me/<número>` limpio, el de la calculadora arma el
  mensaje con servicio + largo + agregados, tildes bien codificadas), botón
  flotante visible en viewport móvil, calculadora completa de punta a punta
  (Alisado orgánico + Melena → `$60.000`, formato correcto).
- **Nota técnica para quien retome esto:** el conector de GitHub que usa
  Claude Code acá (uno "Personalizado" sobre `api.githubcopilot.com`, no una
  GitHub App tradicional) tiene acceso de lectura a este repo pero no de
  escritura — crear el repo o pushear archivos por ese conector dio 403 las
  dos veces que se intentó. El push inicial y el ajuste del dominio se
  subieron con un Personal Access Token de un solo uso, pasado inline al
  comando `git push`, nunca guardado en el repo ni en la config de git. Si
  hace falta pushear de nuevo sin pedirle un token nuevo al cliente, hay que
  resolver el permiso de escritura de ese conector primero.

## Cómo mantener el sitio

Guía rápida para los cambios más probables, sin tocar la estructura del sitio.

### Editar un precio o el texto de un servicio existente

Todo vive en `src/data/servicios.js` — no hay precios ni textos de servicios
sueltos en ningún componente. Busca el servicio por su `slug` y edita
`precios` (u `opciones`, en el caso de Cortes) para los valores en pesos, o
`descripcion`/`idealPara`/`noEs`/`incluye` para el texto de su landing. El
calculador, la landing y el precio "desde" de la grilla del home leen todos
de ahí — no hay que tocar nada más. Después de editar, corre `npm run build`
para confirmar que no quedó ningún largo/opción sin precio (el calculador no
avisa en pantalla si falta uno; simplemente no muestra ese botón).

### Agregar un servicio nuevo

1. Agrega un objeto nuevo a `src/data/servicios.js`, con la misma forma que
   los otros 6 (`slug`, `nombre`, `bajada`, `metaTitulo`, `metaDescripcion`,
   `metodo`, y `precios` u `opciones`). El `slug` define la URL.
2. `src/pages/[slug].astro` genera la landing sola vía `getStaticPaths()` —
   no hace falta crear un archivo de página nuevo.
3. Para las secciones opcionales (`restricciones`, `duracionAviso`), usa
   como referencia otro servicio de `servicios.js` que ya las tenga.
4. Para que el servicio nuevo pueda aparecer en Disponibilidad más adelante,
   agrégalo también a `src/data/duraciones.js` con su duración en minutos.

### Activar Disponibilidad (horas libres desde Google Calendar)

Hoy está construida pero apagada (`DISPONIBILIDAD_ACTIVA = false` en
`src/lib/disponibilidad.js`). Detalle completo del sistema en
`TERRA_WEB_SISTEMA-DISPONIBILIDAD.md`; acá el resumen de qué falta:

1. Completar `src/data/estilistas.js` con el nombre, el ID de calendario de
   Google y los servicios de cada estilista.
2. Completar `src/data/duraciones.js` con la duración real (en minutos) de
   cada servicio — hoy solo Alisado orgánico la tiene.
3. Crear una cuenta de servicio de Google Cloud, compartir el calendario de
   cada estilista con ella (solo lectura), y agregar
   `GOOGLE_SERVICE_ACCOUNT_EMAIL` y `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`
   como variables de entorno en Netlify (**Project configuration →
   Environment variables** — nunca en el repo).
4. Cambiar `DISPONIBILIDAD_ACTIVA` a `true`, subir el cambio, y confirmar en
   el sitio publicado que aparecen horas reales en al menos una landing.

## Sobre lo que llegó en `assets/`

- `fotos/`: son gráficas de precios de la marca anterior (**Alisados Konny**,
  paleta verde), no fotos del local. Sirvieron para confirmar que los precios
  de `servicios.js` son correctos — coinciden exactos.
- `brandboard/`: mockups de marca (tótem, letrero luminoso, tarjetas, tote
  bag, portada) y el PDF del brandboard. Es material de referencia de marca,
  no fotografía real del espacio.
- `redes-sociales/`: renders del isotipo en distintos colores, útiles como
  referencia visual del logo.
- Ninguna de estas carpetas resuelve los pendientes de fotos reales (ver
  abajo). Se extrajeron fotogramas de los videos del salón como alternativa
  mencionada en el prompt maestro — todavía no se ha hecho.

## Pendientes (marcadores, no contenido inventado)

1. Fotos reales del local y del equipo
2. Antes/después autorizados
3. Reseñas con nombre y autorización
4. ¿Se ofrece colorimetría? (séptimo landing, estructura preparada pero no creada)
5. Duración interna de cada tratamiento (para Disponibilidad — no se publica, solo filtra horas)
6. Mapa de qué estilista hace qué tratamiento (para Disponibilidad)
7. Verificar vigencia del registro ISP/ANVISA
8. El mockup `assets/brandboard/Servicios.jpg` muestra Manicure, Pedicure,
   Lifting de Pestañas, Coloración de Pelo, Make-up y Spa — servicios que no
   están en `servicios.js` ni en la arquitectura del sitio (sección 4 del
   prompt maestro), que solo cubre los 6 tratamientos capilares. Sigue sin
   confirmarse si el sitio se queda solo en capilar o si estos entran
   también — no bloqueó nada hasta ahora, pero sí bloquearía diseñar el menú
   de Nosotras/servicios si se agregan más adelante.
9. La historia de Terra Studio (Nosotras) y los datos de las 6 estilistas
   (nombre, foto, especialidad)
10. ~~Dominio real del sitio~~ — resuelto en la Fase 10:
    `https://terrastudiosalon.netlify.app`. Si más adelante compran un
    dominio propio, actualizar `astro.config.mjs` (ver "Cómo mantener el
    sitio" más abajo si hace falta el detalle de qué más depende de ese
    valor).
11. Para activar Disponibilidad: el mapa de estilistas
    (`src/data/estilistas.js`), la duración interna de cada tratamiento
    (`src/data/duraciones.js`, solo Alisado tiene una hoy), y las
    credenciales de la cuenta de servicio de Google en Netlify — paso a
    paso en "Cómo mantener el sitio" más arriba.

## Fases

Las 10 fases del prompt maestro están completas — Fundaciones, Layout,
Home, Calculador, Landings, Nosotras/Contacto, SEO, Disponibilidad (armada,
apagada a la espera de datos de Konny), Calidad y Deploy. El sitio está
publicado en `https://terrastudiosalon.netlify.app`. Lo que sigue de acá en
adelante es contenido real (fotos, reseñas, datos de estilistas — ver
Pendientes) y, cuando llegue, activar Disponibilidad.
