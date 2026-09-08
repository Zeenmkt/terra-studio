// Convierte las fuentes fuente (.otf) de /assets/fonts a .woff2 en /public/fonts.
// Volver a correr con `node scripts/convertir-fuentes.mjs` si Konny envía archivos nuevos.
import { compress } from "wawoff2";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ORIGEN = new URL("../assets/fonts/", import.meta.url);
const DESTINO = new URL("../public/fonts/", import.meta.url);

const FUENTES = [
  ["aegthin.otf", "aegthin.woff2"],
  ["ClashDisplay-Extralight.otf", "clashdisplay-extralight.woff2"],
  ["ClashDisplay-Light.otf", "clashdisplay-light.woff2"],
  ["ClashDisplay-Regular.otf", "clashdisplay-regular.woff2"],
  ["ClashDisplay-Medium.otf", "clashdisplay-medium.woff2"],
  ["ClashDisplay-Semibold.otf", "clashdisplay-semibold.woff2"],
];

await mkdir(DESTINO, { recursive: true });

for (const [origen, destino] of FUENTES) {
  const rutaOrigen = new URL(origen, ORIGEN);
  const bytesOtf = await readFile(rutaOrigen);
  const bytesWoff2 = await compress(bytesOtf);
  const rutaDestino = new URL(destino, DESTINO);
  await writeFile(rutaDestino, bytesWoff2);
  const ratio = ((1 - bytesWoff2.length / bytesOtf.length) * 100).toFixed(0);
  console.log(
    `${origen} → ${destino}  (${(bytesOtf.length / 1024).toFixed(0)}KB → ${(bytesWoff2.length / 1024).toFixed(0)}KB, -${ratio}%)`
  );
}
