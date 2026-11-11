function valorVenta(venta) {
  return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
  let acumulado = 0;
  for (const v of ventas) {
    acumulado += valorVenta(v);
  }
  return acumulado;
}

function unidadesVendidas(ventas) {
  let totalUnidades = 0;
  for (const v of ventas) {
    totalUnidades += v.cantidad;
  }
  return totalUnidades;
}

function ventaMayor(ventas) {
  if (ventas.length === 0) return null;
  let mayor = ventas[0];
  let valorMayor = valorVenta(mayor);

  for (const v of ventas) {
    const actual = valorVenta(v);
    if (actual > valorMayor) {
      mayor = v;
      valorMayor = actual;
    }
  }
  return mayor;
}

function ticketPromedio(ventas) {
  let suma = 0;
  let contadorValidas = 0;

  for (const v of ventas) {
    if (v.cantidad > 0) {
      suma += valorVenta(v);
      contadorValidas++;
    }
  }

  if (contadorValidas === 0) return 0;
  return suma / contadorValidas;
}

function ventasPorCiudad(ventas, ciudadBuscada) {
  let total = 0;
  const ciudadNormalizada = ciudadBuscada.trim().toLowerCase();

  for (const v of ventas) {
    if (v.ciudad.trim().toLowerCase() === ciudadNormalizada) {
      total += valorVenta(v);
    }
  }
  return total;
}

function totalVendidoM(ventas) {
  return ventas.reduce((suma, v) => suma + valorVenta(v), 0);
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((suma, v) => suma + v.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudadBuscada) {
  const norm = ciudadBuscada.trim().toLowerCase();
  return ventas
    .filter(v => v.ciudad.trim().toLowerCase() === norm)
    .reduce((suma, v) => suma + valorVenta(v), 0);
}

function totalPorCiudad(ventas) {
  return ventas.reduce((acc, v) => {
    const ciudadLimpia = v.ciudad.trim().toLowerCase();
    const ciudadKey = ciudadLimpia.charAt(0).toUpperCase() + ciudadLimpia.slice(1);
    acc[ciudadKey] = (acc[ciudadKey] || 0) + valorVenta(v);
    return acc;
  }, {});
}

function unidadesPorProducto(ventas) {
  return ventas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + v.cantidad;
    return acc;
  }, {});
}

function topProductosPorValor(ventas, k) {
  const porProducto = ventas.reduce((acc, v) => {
    acc[v.producto] = (acc[v.producto] || 0) + valorVenta(v);
    return acc;
  }, {});

  const lista = Object.entries(porProducto).map(([producto, valor]) => ({
    producto,
    valor
  }));

  return [...lista]
    .sort((a, b) => b.valor - a.valor)
    .slice(0, k);
}

function ventasDelDia(ventas, fechaBuscada) {
  return ventas.filter(v => v.fecha === fechaBuscada);
}

function clientesRecurrentes(ventas) {
  const recurrentes = [];
  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (
        ventas[i].cliente === ventas[j].cliente &&
        !recurrentes.includes(ventas[i].cliente)
      ) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }
  return recurrentes;
}


// Versión encadenada (crea múltiples arreglos intermedios en memoria)
function totalCiudadCadena(ventas, ciudadBuscada) {
  const norm = ciudadBuscada.trim().toLowerCase();
  return ventas
    .map(v => ({ ciudad: v.ciudad, subtotal: v.cantidad * v.precio })) // Arreglo 1
    .filter(v => v.ciudad.trim().toLowerCase() === norm)                 // Arreglo 2
    .map(v => v.subtotal)                                               // Arreglo 3
    .reduce((suma, sub) => suma + sub, 0);
}

// Versión de un solo recorrido (sin arreglos intermedios, O(1) en espacio auxiliar)
function totalCiudadUnaPasada(ventas, ciudadBuscada) {
  const norm = ciudadBuscada.trim().toLowerCase();
  let suma = 0;
  for (const v of ventas) {
    if (v.ciudad.trim().toLowerCase() === norm) {
      suma += v.cantidad * v.precio;
    }
  }
  return suma;
}

// 1. Versión optimizada con Set (O(n) en tiempo, O(n) en memoria)
function clientesRecurrentesSet(ventas) {
  const vistos = new Set();
  const recurrentes = new Set();

  for (const v of ventas) {
    if (vistos.has(v.cliente)) {
      recurrentes.add(v.cliente);
    } else {
      vistos.add(v.cliente);
    }
  }
  return [...recurrentes];
}

// 2. Versión optimizada con Map para contar frecuencias (O(n))
function comprasPorCliente(ventas) {
  const conteo = new Map();

  for (const v of ventas) {
    conteo.set(v.cliente, (conteo.get(v.cliente) || 0) + 1);
  }

  const recurrentes = [];
  for (const [cliente, frecuencia] of conteo.entries()) {
    if (frecuencia > 1) {
      recurrentes.push(cliente);
    }
  }
  return recurrentes;
}


// src/analitica.js (agregar estas funciones)

// 1. Combo regalo por complementos con Map - O(n)
function comboRegalo(catalogo, valorObjetivo) {
  const vistos = new Map(); // precio -> nombre del producto

  for (const item of catalogo) {
    const complemento = valorObjetivo - item.precio;
    if (vistos.has(complemento)) {
      return [vistos.get(complemento), item.producto];
    }
    vistos.set(item.precio, item.producto);
  }
  return null;
}

// 2. Producto estrella por ciudad (conteo de frecuencias) - O(n)
function productoEstrellaPorCiudad(ventas) {
  const porCiudad = new Map();

  // Paso 1: Contar frecuencias por ciudad y producto
  for (const v of ventas) {
    const ciudad = v.ciudad.trim().toLowerCase();
    const prod = v.producto;

    if (!porCiudad.has(ciudad)) {
      porCiudad.set(ciudad, new Map());
    }
    const contadorProds = porCiudad.get(ciudad);
    contadorProds.set(prod, (contadorProds.get(prod) || 0) + v.cantidad);
  }

  // Paso 2: Encontrar el máximo de cada ciudad
  const resultado = {};
  for (const [ciudad, contadorProds] of porCiudad.entries()) {
    let maxProd = null;
    let maxCant = -1;

    for (const [prod, cant] of contadorProds.entries()) {
      if (cant > maxCant) {
        maxCant = cant;
        maxProd = prod;
      }
    }
    const ciudadKey = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);
    resultado[ciudadKey] = { producto: maxProd, unidades: maxCant };
  }

  return resultado;
}

// 3. Primer cliente único (compró una sola vez en todo el historial) - O(n)
function primerClienteUnico(ventas) {
  const frecuencias = new Map();

  // Contar cuántas veces aparece cada cliente en total
  for (const v of ventas) {
    frecuencias.set(v.cliente, (frecuencias.get(v.cliente) || 0) + 1);
  }

  // Buscar el primero en orden de aparición que tenga frecuencia 1
  for (const v of ventas) {
    if (frecuencias.get(v.cliente) === 1) {
      return v.cliente;
    }
  }
  return null;
}



// 1. Ventana deslizante fija O(n): Mejor racha de k días
function mejorSemana(dias, k) {
  if (dias.length < k) return null;

  let suma = 0;
  for (let i = 0; i < k; i++) suma += dias[i]; // Primera ventana

  let maxima = suma;
  let diaInicio = 0;

  for (let i = k; i < dias.length; i++) {
    suma = suma + dias[i] - dias[i - k]; // Deslizar: entra uno, sale otro
    if (suma > maxima) {
      maxima = suma;
      diaInicio = i - k + 1;
    }
  }

  return { total: maxima, diaInicio: diaInicio + 1 }; // Día 1-indexed
}

// 2. Dos punteros O(n) sobre arreglo ordenado: Par de productos más cercano al presupuesto
function parMasCercano(catalogo, presupuesto) {
  // Ordenar catálogo por precio (O(n log n))
  const ordenado = [...catalogo].sort((a, b) => a.precio - b.precio);

  let izq = 0;
  let der = ordenado.length - 1;
  let mejorSuma = -1;
  let mejorPar = null;

  while (izq < der) {
    const suma = ordenado[izq].precio + ordenado[der].precio;

    if (suma <= presupuesto) {
      if (suma > mejorSuma) {
        mejorSuma = suma;
        mejorPar = [ordenado[izq].producto, ordenado[der].producto];
      }
      izq++; // Intentar aumentar la suma probando un precio mayor
    } else {
      der--; // Disminuir la suma probando un precio menor
    }
  }

  return mejorPar ? { productos: mejorPar, total: mejorSuma } : null;
}


module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  ventasDelDia,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,
  clientesRecurrentesSet,
  comprasPorCliente,
  comboRegalo,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorSemana,
  parMasCercano
};


