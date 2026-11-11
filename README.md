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