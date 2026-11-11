const catalogo = require('./catalogo');
const ventasBase = require('./datos');
const { comboRegalo, productoEstrellaPorCiudad, primerClienteUnico } = require('./analitica');

console.log("=== 1. COMBO REGALO DE $87.000 ===");
console.log("Para $87.000:", comboRegalo(catalogo, 87000)); // Esperado: [ 'Origen Huila 500 g', 'Origen Sierra 500 g' ]
console.log("Para $61.000:", comboRegalo(catalogo, 61000));
console.log("Para $200.000 (Sin solución):", comboRegalo(catalogo, 200000));

console.log("\n=== 2. PRODUCTO ESTRELLA POR CIUDAD ===");
console.log(productoEstrellaPorCiudad(ventasBase));

console.log("\n=== 3. PRIMER CLIENTE ÚNICO ===");
console.log("Primer cliente con una sola compra:", primerClienteUnico(ventasBase)); // Esperado: C04