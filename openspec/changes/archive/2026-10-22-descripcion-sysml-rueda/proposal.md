# Proposal: descripcion-sysml-rueda

## Why

El modelo `Modelos/05_rueda.sysml` define la arquitectura estructural, paramétrica y de interfaces del conjunto de la rueda (llanta y neumático) en SysML v2, pero el equipo de aprendizaje carece de un documento explicativo que sirva de guía pedagógica para entender cada bloque, restricción y puerto. Esta propuesta formaliza la creación de un documento explicativo claro y didáctico (`Modelos/05_rueda_descripcion.md`) para facilitar la comprensión del modelado en modo texto y su visualización con herramientas como Spec42.

## What Changes

- Creación de un documento de descripción pedagógica `Modelos/05_rueda_descripcion.md` dentro de la carpeta `Modelos/`.
- Explicación detallada de la descomposición estructural: partes `Rim` (llanta), `Tire` (neumático) y conjunto ensamblado `Wheel` (rueda).
- Explicación de los bloques de restricciones paramétricas (`calculateTirePressure`, `wheelMassBalance`, `propagateParams`) y cómo influyen en el diseño.
- Explicación de puertos mecánicos (`MechanicalPort`) y conexiones internas (`connect`) para comprender los diagramas BDD e IBD.
- No se modifican los modelos ejecutables `.sysml` existentes, manteniendo intacta la compatibilidad con el resto del vehículo.

## Capabilities

### New Capabilities
- `descripcion-subsistema-rueda`: Especificación del contenido, estructura y criterios de aceptación didácticos para la documentación explicativa del modelo SysML v2 del subsistema de rueda.

### Modified Capabilities
Ninguna.

## Impact

- Código afectado: Ningún archivo de código o modelo existente es alterado.
- Nuevos archivos en workspace: `Modelos/05_rueda_descripcion.md`.
- Impacto pedagógico: Permite a los nuevos miembros del equipo entender cómo se traslada un conjunto mecánico a SysML v2 textual y cómo se visualiza en diagramas BDD/IBD con Spec42.
- Límites de alcance: Se limita exclusivamente a la documentación del modelo existente de la rueda (`05_rueda.sysml`), sin añadir nuevos subsistemas ni sobrecargar de ingeniería el triciclo.
