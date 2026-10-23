# Tasks: anadir-requisitos-rueda

## 1. Tipos Base y Subsistema Rueda

- [x] 1.1 Definir el tipo físico `attribute def Pressure :> Real;` en `Modelos/00_tipos_base.sysml` y verificar que el archivo compile sin errores de sintaxis
- [x] 1.2 Actualizar el tipo de `recommendedPressure` a `Pressure` en `Tire` y `Wheel` dentro de `Modelos/05_rueda.sysml` y verificar la compatibilidad con las ecuaciones paramétricas
- [x] 1.3 Incorporar los bloques `requirement def ReqMasaRueda` y `requirement def ReqPresionSegura` en `Modelos/05_rueda.sysml` y verificar que las condiciones `require constraint` estén correctamente formuladas

## 2. Trazabilidad en Ensamblado y Documentación Didáctica

- [x] 2.1 Añadir las sentencias `satisfy` para vincular `ReqMasaRueda` con las ruedas `frontWheelLeft`, `frontWheelRight` y `rearWheel` en `Modelos/06_triciclo.sysml` y verificar la trazabilidad
- [x] 2.2 Actualizar la guía didáctica `Modelos/05_rueda_descripcion.md` con la tabla de magnitudes y unidades, la explicación de los nuevos requisitos y el cálculo numérico guiado de presión
- [x] 2.3 Validar de forma integral la sintaxis de todos los archivos `.sysml` del proyecto y verificar la generación y renderizado de vistas en Spec42

## Workflow follow-up

- Ejecutar `/opsx-archive` tras la revisión de la implementación para sincronizar las especificaciones en `openspec/specs/` y archivar el cambio.
