const { generarVentas } = require('./generador');
const catalogo = require('./catalogo');
const {
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
  clientesRecurrentesSet,
  comprasPorCliente,
  comboRegalo,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorSemana,
  parMasCercano
} = require('./analitica');

// Leer tamaño desde la consola (ej: node src/reporte.js 100000) o usar datos base (12 registros)
const args = process.argv.slice(2);
const nArg = args[0] ? parseInt(args[0], 10) : null;

const ventas = nArg ? generarVentas(nArg) : require('./datos');
const origenDatos = nArg ? `Generados dinámicamente (${nArg.toLocaleString("es-CO")} registros)` : "Base de datos estática (12 registros del Día 1)";

console.log("==================================================");
console.log("       CAFÉ ORIGEN - MOTOR DE ANALÍTICA v1.0      ");
console.log("==================================================");
console.log(`Origen de datos: ${origenDatos}\n`);

console.log("--- 1. RESUMEN GENERAL ---");
console.time("Tiempo de cálculo general");
const total = totalVendido(ventas);
const unidades = unidadesVendidas(ventas);
const mayor = ventaMayor(ventas);
const ticket = ticketPromedio(ventas);
console.timeEnd("Tiempo de cálculo general");

console.log(`Total vendido:       $${total.toLocaleString("es-CO")}`);
console.log(`Unidades vendidas:   ${unidades}`);
if (mayor) {
  console.log(`Venta mayor:         ID ${mayor.id} (${mayor.producto}) por $${(mayor.cantidad * mayor.precio).toLocaleString("es-CO")}`);
}
console.log(`Ticket promedio:     $${ticket.toLocaleString("es-CO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

console.log("\n--- 2. CLIENTES RECURRENTES (OPTIMIZADO O(n)) ---");
const recurrentes = clientesRecurrentesSet(ventas);
console.log(`Total clientes recurrentes detectados: ${recurrentes.length}`);
console.log(`Primeros 5 recurrentes:`, recurrentes.slice(0, 5));

console.log("\n--- 3. ANÁLISIS COMERCIAL Y FRECUENCIAS ---");
const combo = comboRegalo(catalogo, 87000);
console.log(`Combo sugerido tarjeta $87.000:`, combo ? combo.join(" + ") : "Sin combinación");

const estrellas = productoEstrellaPorCiudad(ventas);
console.log("Producto estrella por ciudad:", estrellas);

const clienteUnico = primerClienteUnico(ventas);
console.log(`Primer cliente con una sola compra (para cupón):`, clienteUnico);

console.log("\n--- 4. TÉCNICAS AVANZADAS (VENTANA Y DOS PUNTEROS) ---");
// Datos de prueba para ventana deslizante si el arreglo es pequeño, o una muestra del generador
const ventasDiariasEjemplo = [320, 410, 280, 390, 510, 620, 700, 300, 290, 450, 480, 530, 610, 680, 350];
const racha = mejorSemana(ventasDiariasEjemplo, 7);
if (racha) {
  console.log(`Mejor semana de ventas (ejemplo diario): Inicia en día ${racha.diaInicio} con un total de $${racha.total}.000`);
}

const presupuestoCorp = parMasCercano(catalogo, 100000);
console.log(`Par de productos más cercano a presupuesto de $100.000:`, presupuestoCorp);

console.log("\n==================================================");
console.log("      MOTOR v1.0 EJECUTADO EXITOSAMENTE         ");
console.log("==================================================");