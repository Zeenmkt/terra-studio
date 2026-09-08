// Duración interna en minutos, solo para filtrar qué horas ofrecer — nunca
// se publica (ver TERRA_WEB_SISTEMA-DISPONIBILIDAD.md, sección 3). Un
// servicio sin duración acá queda fuera de Disponibilidad hasta que se
// confirme: sin ese dato el sistema mostraría horas que no alcanzan.
//
// Alisado ya tiene un mínimo público que Konny escribió ("considera 4
// horas"), así que lo reuso también como duración interna. El resto está
// pendiente de que Konny lo confirme — no son un cálculo ni una suposición.
export const duraciones = {
  "alisado-organico": 240,
};
