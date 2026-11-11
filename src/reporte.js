const ventas = require('./datos');
const {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia
} = require('./analitica');

console.log("==================================================");
console.log("       CAFÉ ORIGEN - MOTOR DE ANALÍTICA v0.1      ");
console.log("==================================================");

console.log("\n--- 1. RESUMEN GENERAL ---");
const total = totalVendido(ventas);
const unidades = unidadesVendidas(ventas);
const mayor = ventaMayor(ventas);
const ticket = ticketPromedio(ventas);

console.log(`Total vendido:       $${total.toLocaleString("es-CO")}`);
console.log(`Unidades vendidas:   ${unidades}`);
console.log(`Venta mayor:         ID ${mayor.id} (${mayor.producto}) por $${(mayor.cantidad * mayor.precio).toLocaleString("es-CO")}`);
console.log(`Ticket promedio:     $${ticket.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

console.log("\n--- 2. VENTAS POR CIUDAD ---");
const porCiudad = totalPorCiudad(ventas);
for (const [ciudad, valor] of Object.entries(porCiudad)) {
  console.log(`- ${ciudad.padEnd(10)}: $${valor.toLocaleString("es-CO")}`);
}

console.log("\n--- 3. UNIDADES POR PRODUCTO ---");
const prodUnidades = unidadesPorProducto(ventas);
for (const [producto, cant] of Object.entries(prodUnidades)) {
  console.log(`- ${producto.padEnd(25)}: ${cant} unidades`);
}

console.log("\n--- 4. TOP 3 PRODUCTOS POR VALOR ---");
const top3 = topProductosPorValor(ventas, 3);
top3.forEach((item, index) => {
  console.log(`${index + 1}. ${item.producto.padEnd(23)} - $${item.valor.toLocaleString("es-CO")}`);
});

console.log("\n--- 5. REPORTE POR FECHAS ---");
const fechaConVentas = "2026-09-01";
const ventasDia = ventasDelDia(ventas, fechaConVentas);
console.log(`Fecha con ventas (${fechaConVentas}): ${ventasDia.length} transacciones, Total: $${ventasDia.reduce((s, v) => s + (v.cantidad * v.precio), 0).toLocaleString("es-CO")}`);

const fechaSinVentas = "2026-10-15";
const ventasDiaVacio = ventasDelDia(ventas, fechaSinVentas);
console.log(`Fecha sin ventas (${fechaSinVentas}): ${ventasDiaVacio.length} transacciones registradas.`);

console.log("\n==================================================");