# Proposal: anadir-requisitos-bateria

## Why

El subsistema de batería (`Modelos/02_bateria.sysml`, paquete `SubsistemaBateria`) solo tiene un requisito formal: `ReqMasaBateria` (masa ≤ 15 kg). Faltan requisitos sobre aspectos básicos de cualquier batería de un vehículo eléctrico, como **cuántas horas de uso ofrece** o **cómo se protege frente al fuego**. Añadirlos permite practicar el modelado de requisitos en SysML v2 (`requirement def`, `subject`, `require constraint`) dentro del flujo Git + OpenSpec del equipo.

## What Changes

- **Dos atributos nuevos en `BatterySystem`**, necesarios para que dos de los requisitos se puedan comprobar numéricamente:
  - `autonomia : Real` → horas de uso continuo con la batería cargada (h).
  - `temperaturaMaxima : Temperature` → temperatura máxima de las celdas en funcionamiento (°C).
- **Cuatro requisitos nuevos** en el paquete `SubsistemaBateria`:
  1. `ReqAutonomiaBateria`: la batería debe ofrecer al menos **2 h** de uso continuo (con `require constraint`).
  2. `ReqTemperaturaMaximaBateria`: la temperatura de las celdas no debe superar los **60 °C** (con `require constraint`).
  3. `ReqProteccionFuegoBateria`: la carcasa debe ser de material ignífugo y aislar el fuego de una celda para que no se propague (solo texto `doc`).
  4. `ReqVidaUtilBateria`: la batería debe soportar al menos **500 ciclos** de carga y descarga completos (solo texto `doc`).
- **Sin cambios que rompan nada**: no se modifican puertos, estados ni las conexiones de `Modelos/06_triciclo.sysml`.

**Nota de alcance**: el proyecto recomienda 2–3 elementos nuevos por iteración. Este cambio añade 4 requisitos (el máximo permitido por especificación) y 2 atributos sencillos, porque así lo ha pedido el usuario. Para no complicarlo más, solo 2 requisitos llevan restricción numérica; los otros 2 son textuales.

## Capabilities

### New Capabilities
- `requisitos-subsistema-bateria`: requisitos de autonomía, temperatura, protección contra el fuego y vida útil del subsistema de batería, y su aparición en la vista de requisitos de Spec42.

### Modified Capabilities
Ninguna.

## Impact

- **Modelos afectados**: solo `Modelos/02_bateria.sysml` (2 atributos en `BatterySystem` y 4 bloques `requirement def`).
- **Vistas**: `vistaRequisitos` en `Modelos/07_vistas.sysml` mostrará los nuevos requisitos de forma automática gracias a `expose SubsistemaBateria::*;`. No hace falta editar ese archivo.
- **Archivos que NO se tocan**: `00_tipos_base.sysml` (el tipo `Temperature` ya existe), `06_triciclo.sysml` y `07_vistas.sysml`.
- **Riesgo**: bajo; son adiciones dentro de un único paquete.
