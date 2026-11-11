const { generarVentas } = require('./generador');
const { totalCiudadCadena, totalCiudadUnaPasada } = require('./analitica');

const datos = generarVentas(10000);
const ciudadPrueba = "Medellín";

const resCadena = totalCiudadCadena(datos, ciudadPrueba);
const resUnaPasada = totalCiudadUnaPasada(datos, ciudadPrueba);

console.log(`Resultado con cadena:   $${resCadena.toLocaleString("es-CO")}`);
console.log(`Resultado una pasada: $${resUnaPasada.toLocaleString("es-CO")}`);
console.log(`¿Son iguales?: ${resCadena === resUnaPasada ? "SÍ (OK)" : "DIFERENTE"}`);