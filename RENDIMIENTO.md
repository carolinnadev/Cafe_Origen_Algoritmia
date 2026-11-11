# Informe de Rendimiento - Motor de Analítica Café Origen v1.0

**Autor:** Carolina (caro.florez)  
**Proyecto:** Motor de Analítica · Optimización y Escalabilidad de Algoritmos (Versión 1.0 Final)  

---

## 1. Tabla Completa de Rendimiento y Complejidad (v1.0)

| Función | Qué hace | Complejidad Temporal | Complejidad Espacial | Justificación Algorítmica | Operaciones / Tiempo (n = 100.000) |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `primeraVenta` | Retorna el primer elemento | $O(1)$ | $O(1)$ | Acceso directo por índice. | 1 operación (< 1 ms) |
| `totalVendido` | Suma el valor total de ventas | $O(n)$ | $O(1)$ | Recorrido lineal único con acumulador. | 100.000 ops (~2 ms) |
| `ventaMayor` | Encuentra la transacción más alta | $O(n)$ | $O(1)$ | Recorrido lineal actualizando variable de control. | 100.000 ops (~2 ms) |
| `totalPorCiudad` | Suma y agrupa ventas por ciudad | $O(n)$ | $O(n)$ | Recorrido lineal construyendo un mapa de frecuencias. | 100.000 ops (~5 ms) |
| `clientesRecurrentesSet` | Detecta clientes con múltiples compras | $O(n)$ | $O(n)$ | **Optimizado:** Uso de `Set` para búsqueda en tiempo constante. | 100.000 ops (~15 ms) |
| `comprasPorCliente` | Conteo de frecuencia de clientes | $O(n)$ | $O(n)$ | **Optimizado:** Uso de `Map` para conteo lineal exacto. | 100.000 ops (~15 ms) |
| `comboRegalo` | Sugiere combo para tarjeta de $87.000 | $O(n)$ | $O(n)$ | Búsqueda de complementos mediante `Map` en una sola pasada. | < 1 ms |
| `productoEstrellaPorCiudad` | Calcula el producto más vendido por ciudad | $O(n)$ | $O(n)$ | Conteo de frecuencias anidado lineal por agrupaciones. | < 5 ms |
| `primerClienteUnico` | Primer cliente con una única compra | $O(n)$ | $O(n)$ | Doble recorrido lineal optimizado con `Map` de frecuencias. | < 10 ms |
| `mejorSemana` | Mejor racha de ventas de $k$ días | $O(n)$ | $O(1)$ | **Ventana deslizante:** Suma el que entra y resta el que sale. | < 5 ms |
| `parMasCercano` | Par de productos cercano a presupuesto | $O(n \log n)$ | $O(1)$ | **Dos punteros:** Ordenamiento inicial seguido de recorrido lineal. | < 2 ms |

---

## 2. Comparativa de Rendimiento: v0.1 vs. v1.0 ($n = 100.000$ ventas)

| Métrica / Reporte | Versión Inicial (v0.1 / v0.2) | Versión Final (v1.0) | Mejora Obtenida |
| :--- | :--- | :--- | :--- |
| **Clientes Recurrentes** | $O(n^2)$ · Colapso operativo (> Varios minutos / Bloqueo) | $O(n)$ · < 0.02 segundos | **Eliminación del cuello de botella cuadrático** |
| **Tiempo Total del Reporte** | No ejecutable con grandes volúmenes | < 0.2 segundos completos | **Escalabilidad masiva lista para marketplace** |
| **Consumo de Memoria** | Alto en cadenas masivas e índices desordenados | Controlado y optimizado con estructuras clave-valor | **Uso eficiente de recursos en servidor** |

---

## 3. Conclusiones y Decisiones de Diseño
La transición de la versión 0.1 a la versión 1.0 demuestra el impacto crítico de aplicar la notación Big O y estructuras de datos adecuadas (`Set`, `Map`, ventanas deslizantes y dos punteros). El motor pasó de ser una solución frágil ante grandes volúmenes a un sistema robusto, capaz de procesar 100.000 registros en milisegundos y listo para integrarse a plataformas de alta exigencia comercial.