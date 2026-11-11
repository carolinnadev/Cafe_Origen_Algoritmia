const ventas = require('./datos');
const {
  totalVendido, totalVendidoM,
  unidadesVendidas, unidadesVendidasM,
  ventasPorCiudad, ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor
} = require('./analitica');

console.log("=== VERIFICACIÓN CICLO VS MÉTODO ===");
console.log("Total vendido:", totalVendido(ventas) === totalVendidoM(ventas) ? "OK" : "DIFERENTE");
console.log("Unidades vendidas:", unidadesVendidas(ventas) === unidadesVendidasM(ventas) ? "OK" : "DIFERENTE");
console.log("Ventas por ciudad (Medellín):", ventasPorCiudad(ventas, "medellín ") === ventasPorCiudadM(ventas, "medellín ") ? "OK" : "DIFERENTE");

console.log("\n=== AGRUPACIONES Y RANKINGS ===");
console.log("Total por ciudad:", totalPorCiudad(ventas));
console.log("Unidades por producto:", unidadesPorProducto(ventas));
console.log("Top 3 productos por valor:", topProductosPorValor(ventas, 3));