const catalogo = require('./catalogo');
const { mejorSemana, parMasCercano } = require('./analitica');

const ventasDiarias = [
  320, 410, 280, 390, 510, 620, 700, 300, 290, 450,
  480, 530, 610, 680, 350, 330, 420, 470, 560, 640,
  710, 380, 360, 440, 500, 590, 650, 720, 400, 370
];

console.log("=== 1. VENTANA DESLIZANTE (MEJOR RACHA DE 7 DÍAS) ===");
const racha7 = mejorSemana(ventasDiarias, 7);
console.log(`Mejor semana inicia en el día ${racha7.diaInicio} con un total de $${racha7.total.toLocaleString("es-CO")}.000`);

console.log("\n=== 2. DOS PUNTEROS (PRESUPUESTO CLIENTES CORPORATIVOS) ===");
console.log("Presupuesto $100.000:", parMasCercano(catalogo, 100000));
console.log("Presupuesto $140.000:", parMasCercano(catalogo, 140000));
console.log("Presupuesto $40.000 (Insuficiente):", parMasCercano(catalogo, 40000));