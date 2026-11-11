const { generarVentas } = require('./generador');

// 1. Función de complejidad constante O(1)
function primeraVenta(ventas, contador) {
  contador.ops++;
  if (ventas.length === 0) return null;
  return ventas[0];
}

// 2. Función lineal O(n) - Total vendido instrumentado
function totalVendidoIns(ventas, contador) {
  let acumulado = 0;
  for (const v of ventas) {
    contador.ops++; // Operación por cada elemento visitado
    acumulado += v.cantidad * v.precio;
  }
  return acumulado;
}

// 3. Función lineal O(n) - Venta mayor instrumentada
function ventaMayorIns(ventas, contador) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  let valorMayor = mayor.cantidad * mayor.precio;

  for (const v of ventas) {
    contador.ops++; // Operación de recorrido
    const actual = v.cantidad * v.precio;
    if (actual > valorMayor) {
      valorMayor = actual;
      mayor = v;
    }
  }
  return mayor;
}

// 4. Función lineal O(n) - Total por ciudad instrumentado
function totalPorCiudadIns(ventas, contador) {
  return ventas.reduce((acc, v) => {
    contador.ops++; // Operación por cada elemento procesado en el reduce
    const ciudadKey = v.ciudad.trim().toLowerCase();
    acc[ciudadKey] = (acc[ciudadKey] || 0) + (v.cantidad * v.precio);
    return acc;
  }, {});
}

// Tamaños de entrada a evaluar
const tamanios = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of tamanios) {
  const datos = generarVentas(n);

  // Objeto contador por referencia
  const cConstante = { ops: 0 };
  const cTotal = { ops: 0 };
  const cMayor = { ops: 0 };
  const cCiudad = { ops: 0 };

  primeraVenta(datos, cConstante);
  totalVendidoIns(datos, cTotal);
  ventaMayorIns(datos, cMayor);
  totalPorCiudadIns(datos, cCiudad);

  resultados.push({
    n: n,
    "primeraVenta O(1)": cConstante.ops,
    "totalVendido O(n)": cTotal.ops,
    "ventaMayor O(n)": cMayor.ops,
    "totalPorCiudad O(n)": cCiudad.ops
  });
}

console.log("=== TABLA DE OPERACIONES POR TAMAÑO DE ENTRADA (BIG O) ===");
console.table(resultados);