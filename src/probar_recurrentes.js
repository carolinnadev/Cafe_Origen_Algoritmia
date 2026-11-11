const { generarVentas } = require('./generador');
const { clientesRecurrentes, clientesRecurrentesSet, comprasPorCliente } = require('./analitica');
const ventasBase = require('./datos');

console.log("--- Verificación con datos base (12 registros) ---");
console.log("Set:", clientesRecurrentesSet(ventasBase).sort());
console.log("Map:", comprasPorCliente(ventasBase).sort());

console.log("\n--- Medición de rendimiento con 100.000 ventas ---");
const datosMasivos = generarVentas(100000);

console.time("Tiempo Set");
clientesRecurrentesSet(datosMasivos);
console.timeEnd("Tiempo Set");

console.time("Tiempo Map");
comprasPorCliente(datosMasivos);
console.timeEnd("Tiempo Map");