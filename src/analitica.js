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
  ventasDelDia
};