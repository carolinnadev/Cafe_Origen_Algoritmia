function generarVentas(n) {
  const productos = ["Origen Huila 500 g", "Origen Nariño 250 g", "Prensa francesa", "Molino manual", "Origen Sierra 500 g"];
  const ciudades = ["Medellín", "Bogotá", "Cali", "Pereira"];
  const precios = [42000, 26000, 95000, 120000, 45000];

  const ventas = [];
  const totalClientes = Math.max(1, Math.floor(n / 3)); // Entre 1 y n/3 clientes distintos

  for (let i = 1; i <= n; i++) {
    const id = i;
    const dia = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');
    const fecha = `2026-09-${dia}`;
    const clienteId = Math.floor(Math.random() * totalClientes) + 1;
    const cliente = `C${String(clienteId).padStart(3, '0')}`;
    
    const indexProd = Math.floor(Math.random() * productos.length);
    const producto = productos[indexProd];
    const ciudad = ciudades[Math.floor(Math.random() * ciudades.length)];
    const cantidad = Math.floor(Math.random() * 5) + 1; // Entre 1 y 5
    const precio = precios[indexProd];

    ventas.push({ id, fecha, cliente, producto, ciudad, cantidad, precio });
  }

  return ventas;
}

module.exports = { generarVentas };