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