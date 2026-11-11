# Café Origen - Motor de Analítica (v0.1)

Sistema de procesamiento y análisis de datos de ventas para la tostadora de café de especialidad Café Origen.

## Descripción
Este motor calcula indicadores clave de negocio (ventas totales, unidades, ticket promedio, ventas por ciudad, rankings de productos) a partir de transacciones estructuradas en arreglos de objetos, utilizando ciclos manuales y métodos declarativos (`filter`, `reduce`, `map`).

## Estructura del Proyecto
- `src/datos.js`: Módulo con el arreglo de registros de ventas y casos borde.
- `src/analitica.js`: Módulo central con la lógica de negocio y cálculos.
- `src/explorar.js`: Script de exploración inicial de datos.
- `src/verificar.js`: Script de pruebas para validar equivalencia entre ciclos y métodos.
- `src/reporte.js`: Generador del tablero de analítica por consola.
- `bitacora.md`: Registro de diseño, casos borde, pseudocódigos y depuración.

## Cómo Ejecutar
```bash
node src/explorar.js
node src/verificar.js
node src/reporte.js


Motor de procesamiento y analítica de datos comerciales desarrollado para **Café Origen**, optimizado para integrarse con grandes superficies y plataformas de comercio electrónico (marketplace).

---

## 🚀 Características Principales
* **Resumen Financiero:** Cálculo de ventas totales, unidades despachadas, ticket promedio y transacciones destacadas en tiempo lineal $O(n)$.
* **Detección de Clientes Recurrentes ($O(n)$):** Identificación rápida de compradores frecuentes mediante estructuras `Set` y `Map`.
* **Análisis Comercial Avanzado:** 
  * Sugerencia de combos por tarjeta de regalo mediante búsqueda de complementos.
  * Identificación de productos estrella por ciudad y filtrado de clientes únicos para campañas de fidelización.
* **Técnicas Algorítmicas Avanzadas:** 
  * **Ventana deslizante** para cálculo de rachas comerciales de $k$ días consecutivos.
  * **Dos punteros** sobre arreglos ordenados para optimización de presupuestos corporativos.
* **Generador Masivo de Datos:** Capacidad de simular historiales dinámicos de transacciones desde $100$ hasta $100.000+$ registros.

---

## 📁 Estructura del Proyecto

```text
Cafe_Origen_Algoritmia/
├── README.md               # Documentación general del producto
├── RENDIMIENTO.md          # Informe técnico de complejidad y comparativa v0.1 vs v1.0
├── bitacora.md             # Registro de trazas, predicciones y método de resolución
└── src/
    ├── datos.js            # Base de datos estática inicial (12 registros)
    ├── catalogo.js         # Catálogo oficial de productos y precios
    ├── generador.js        # Generador masivo de ventas aleatorias
    ├── analitica.js        # Núcleo de funciones optimizadas (Set, Map, punteros, ventana)
    ├── medir.js            # Instrumentación y conteo de operaciones elementales
    └── reporte.js          # Consola ejecutiva de salida para el motor v1.0