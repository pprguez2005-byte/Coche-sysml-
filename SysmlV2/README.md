# Modularización del Sistema de Freno en SysML v2

Este módulo divide el modelo del sistema de frenado (`BrakingSystem`) en dos archivos desacoplados siguiendo el patrón estándar de SysML v2: **Definiciones reutilizables** y **Arquitectura / Ensamblado**.

---

## Estructura de Archivos

- **`definiciones.sysml` (`package DefinicionesFreno`)**:
  - Contiene los elementos base, tipos de datos y especificaciones conceptuales reutilizables.
  - **Definición de atributos (`attribute def`)**: `Mass :> Real` y `Pressure :> Real`.
  - **Definición de partes (`part def`)**: Tipos de componentes `BrakePedal` y `BrakeCaliper`.
  - **Definición de requisitos (`requirement def`)**: Requisito `MaxStoppingDistance` para la distancia de frenado en emergencia.

- **`arquitectura.sysml` (`package ArquitecturaFreno`)**:
  - Importa las definiciones base con `private import DefinicionesFreno::*;`.
  - Modela la composición y ensamblado del vehículo (`part def Vehicle`) tipando los subsistemas y asignando multiplicidades:
    - `attribute mass : Mass;`
    - `part brakePedal : BrakePedal[1];` (1 pedal de freno)
    - `part brakeCalipers : BrakeCaliper[4];` (4 pinzas de freno)
  - Declara la instancia de uso `part vehiculo : Vehicle;`.

---

## ¿Cómo Funciona la Conexión entre Archivos?

1. **Resolución de Espacios de Nombres (Namespaces)**: SysML v2 permite que archivos independientes en el mismo entorno de trabajo compartan modelos mediante la declaración explícita de `package`.
2. **Directiva de Importación**: `private import DefinicionesFreno::*;` en `arquitectura.sysml` hace visibles todos los tipos definidos en `DefinicionesFreno` sin necesidad de duplicar código ni anidar todo en un único fichero monolítico.
3. **Separación de Responsabilidades**:
   - `*def` (definiciones) representan *qué existe* (catálogo de componentes, tipos, requisitos).
   - `part` / `usage` (usos) representan *cómo se ensambla* (multiplicidades, configuraciones concretas).

### Reglas Clave:
- Los archivos deben coexistir en el mismo workspace o proyecto para que el motor de SysML v2 / Eclipse SysON resuelva los paquetes.
- Los nombres de los paquetes raíz deben ser únicos (`DefinicionesFreno` vs `ArquitecturaFreno`).
