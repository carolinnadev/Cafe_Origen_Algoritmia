# Informe de Rendimiento - Motor de Analítica Café Origen v0.2

**Autor:** Carolina (caro.florez)  
**Proyecto:** Motor de Analítica · Optimización y Escalabilidad de Algoritmos (Día 2)  

---

## 1. Tabla Completa de Rendimiento

| Función | Qué hace | Complejidad Temporal | Complejidad Espacial | Justificación | Operaciones / Tiempo (n = 10.000) |
| :--- | :--- | :---: | :---: | :--- | :--- |
| `primeraVenta` | Retorna el primer elemento de la lista | $O(1)$ | $O(1)$ | Acceso directo por índice sin importar el tamaño. | 1 operación |
| `totalVendido` | Suma el valor total de las ventas | $O(n)$ | $O(1)$ | Recorre el arreglo completo una sola vez con un ciclo lineal. | 10.000 operaciones |
| `ventaMayor` | Encuentra la transacción de mayor valor | $O(n)$ | $O(1)$ | Recorre los elementos actualizando una variable de control. | 10.000 operaciones |
| `totalPorCiudad` | Agrupa y suma las ventas por ciudad | $O(n)$ | $O(n)$ | Recorre los datos y construye un objeto de conteo proporcional. | 10.000 operaciones |
| `clientesRecurrentes` | Identifica clientes con múltiples compras | $O(n^2)$ | $O(n)$ | Utiliza ciclos anidados y `.includes()`, duplicando trabajo por cada elemento. | Tiempo elevado (crecimiento exponencial) |
| `totalCiudadCadena` | Calcula ventas por ciudad encadenando métodos | $O(n)$ | $O(n)$ | Recorre $4n$ veces y crea múltiples arreglos intermedios. | 40.000 pasos lógicos + 3 arreglos nuevos |
| `totalCiudadUnaPasada` | Calcula ventas por ciudad con un único ciclo | $O(n)$ | $O(1)$ | Hace un solo recorrido con `for...of` y acumula en memoria auxiliar fija. | 10.000 operaciones exactas |

---

## 2. Proyección para 1.000.000 de Ventas

A partir de las mediciones empíricas con $n = 10.000$ y aplicando las reglas de crecimiento Big O:
* **Funciones Lineales ($O(n)$):** Si con $10.000$ registros toman una fracción mínima de segundo ($10^4$ operaciones), con $1.000.000$ de registros requerirán exactamente $100$ veces más trabajo ($10^6$ operaciones), ejecutándose en milisegundos sin riesgo de saturación.
* **Clientes Recurrentes ($O(n^2)$):** Con $10.000$ ventas realiza aproximadamente $\frac{n(n-1)}{2} \approx 50.000.000$ de comparaciones. Al escalar a $1.000.000$ de ventas, el número de operaciones asciende a **500 billones ($5 \times 10^{11}$)**, lo que colapsaría el hilo de ejecución durante horas o minutos.

---

## 3. Análisis de Riesgos

Las funciones están ordenadas de mayor a menor riesgo operativo ante un incremento masivo de datos:

1. **`clientesRecurrentes` (Riesgo Crítico):** Su crecimiento cuadrático la vuelve inutilizable con historiales anuales de gran volumen.
2. **`totalCiudadCadena` (Riesgo Moderado en Memoria):** Aunque su tiempo es lineal, la creación masiva de arreglos intermedios puede generar presión sobre el recolector de basura (*Garbage Collector*) en entornos con memoria limitada.
3. **Funciones del Motor Base (Riesgo Bajo):** Demuestran un comportamiento predecible, rápido y escalable.

---

## 4. Plan de Optimización para la Función de Mayor Riesgo

Para el reporte de **clientes recurrentes**, la idea de mejora para el Día 3 consiste en eliminar los ciclos anidados utilizando una estructura de datos basada en **tablas de hash (objetos o `Set`)**:
* **Trabajo repetido actual:** Buscar repetidamente en el arreglo completo si un cliente ya fue registrado mediante `.includes()`.
* **Solución propuesta:** Realizar un único recorrido lineal $O(n)$ para poblar un objeto o `Set` con las frecuencias de cada cliente, reduciendo la complejidad global de $O(n^2)$ a **$O(n)$**.