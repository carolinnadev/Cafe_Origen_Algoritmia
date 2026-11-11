const { generarVentas } = require('./generador');
const { clientesRecurrentes } = require('./analitica');
const ventasBase = require('./datos');

console.log("--- Verificación con los 12 datos del Día 1 ---");
console.log("Recurrentes:", clientesRecurrentes(ventasBase)); // Debe mostrar [ 'C01', 'C02', 'C03' ]

console.log("\n--- Mediciones de tiempo (Crecimiento O(n²)) ---");
const tamanios = [1000, 2000, 4000, 8000, 16000];

for (const n of tamanios) {
  const datos = generarVentas(n);
  
  console.time(`Tiempo para n = ${n}`);
  clientesRecurrentes(datos);
  console.timeEnd(`Tiempo para n = ${n}`);
}