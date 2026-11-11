# Bitácora de Desarrollo - Café Origen Analítica v0.1
**Autor:** Carolina (caro.florez)  
**Proyecto:** Motor de Analítica - Módulo de Arreglos y Estructuras de Datos  

---

## 1. Diccionario de Datos

| Propiedad | Tipo | Significado / Descripción |
| :--- | :--- | :--- |
| `id` | Numérico (Entero) | Identificador único y secuencial de la transacción de venta. |
| `fecha` | Texto (String YYYY-MM-DD) | Fecha calendario en la que se efectuó la orden de compra. |
| `cliente` | Texto (String) | Código alfanumérico que identifica al cliente (ej. C01, C02). |
| `producto` | Texto (String) | Nombre comercial del artículo de café o accesorio adquirido. |
| `ciudad` | Texto (String) | Ciudad de destino o sucursal donde se registra la venta. |
| `cantidad` | Numérico (Entero) | Unidades físicas del producto adquiridas en la transacción. |
| `precio` | Numérico (Entero) | Valor monetario unitario del producto en pesos colombianos (COP). |

---

## 2. Casos Borde Detectados y Decisiones

1. **Inconsistencias tipográficas en ciudades:** Registro 5 con `"medellín "` frente a `"Medellín"`.
   * *Decisión:* Normalización estricta (`.trim().toLowerCase()`).
2. **Transacciones con cantidad cero:** Registro 8 con `cantidad: 0`.
   * *Decisión:* Se filtran de los cálculos del ticket promedio para prevenir divisiones por cero (`NaN`).
3. **Colecciones vacías (`[]`):** Consultas en fechas sin movimientos.
   * *Decisión:* Retornar `0` en acumuladores y `null` en objetos máximos.


---

## 5. Día 2 · Análisis de Algoritmos y Notación Big O (Motor v0.2)

### 1. Predicciones y Mediciones del MiniReto 5 (Generador y Contador)
* **Predicción previa:** Al multiplicar $n$ por 10, las funciones lineales $O(n)$ deberían multiplicar su número de operaciones exactamente por 10; la función constante $O(1)$ debe mantenerse en 1 operación sin importar el tamaño de entrada.
* **Resultados empíricos obtenidos ($n = 100, 1.000, 10.000, 100.000$):**
  * `primeraVenta O(1)`: 1 operación constante en todos los escenarios.
  * `totalVendido`, `ventaMayor`, `totalPorCiudad` ($O(n)$): Crecimiento lineal exacto proporcional a $n$ ($100 \rightarrow 1.000 \rightarrow 10.000 \rightarrow 100.000$ operaciones respectivamente).

### 2. Diagnóstico del MiniReto 6 (Clientes Recurrentes - $O(n^2)$)
* **Traza y Comportamiento:** La función evalúa pares mediante ciclos anidados, generando $\frac{n(n-1)}{2}$ comparaciones en el peor caso. Al duplicar $n$ (ej. de $4.000$ a $8.000$), el tiempo de ejecución se multiplica por un factor cercano a 4, confirmando un crecimiento cuadrático.
* **Costo oculto:** El método `.includes()` dentro de los ciclos añade un recorrido lineal adicional sobre el arreglo de recurrentes, incrementando la carga computacional.
* **Conclusión para negocio:** Con $1.000.000$ de ventas, el algoritmo requeriría cientos de billones de operaciones, volviéndose inviable para producción.

### 3. Complejidad Espacial y Encadenamiento (MiniReto 7)
* **Comparación de total por ciudad:**
  * `totalCiudadCadena`: Recorre el arreglo múltiples veces ($4n$) y genera arreglos intermedios en memoria, resultando en complejidad temporal $O(n)$ (por simplificación de constantes) y complejidad espacial **$O(n)$**.
  * `totalCiudadUnaPasada`: Realiza un único recorrido con `for...of` acumulando en una variable local, manteniendo tiempo lineal $O(n)$ y memoria auxiliar constante **$O(1)$**.
* **Decisión de diseño:** Se prioriza el recorrido único para entornos con restricciones de memoria (como el marketplace), evitando presión innecesaria sobre el recolector de basura.