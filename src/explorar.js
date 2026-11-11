const ventas = require('./datos');

console.log("Cantidad de registros:", ventas.length);
console.log("Primer registro:", ventas[0]);
console.log("Último registro:", ventas[ventas.length - 1]);
console.log("Propiedad 'producto' del registro en la posición 4:", ventas[4].producto);
console.log("\n--- TABLA COMPLETA DE VENTAS ---");
console.table(ventas);