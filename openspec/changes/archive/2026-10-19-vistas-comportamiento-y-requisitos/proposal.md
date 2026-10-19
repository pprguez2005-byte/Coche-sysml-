# Proposal: Ampliación Incremental de Vistas y Requisitos en SysML v2 (Spec42)

## Contexto del Proyecto, Límites y Condiciones de Trabajo

Este proyecto es una **Prueba de Concepto (PoC) formativa** cuyo propósito es que todo el equipo se familiarice simultáneamente con tres pilares:
1. **Lenguaje SysML v2** en su notación textual oficial.
2. **Trabajo colaborativo con Git** sobre archivos de texto versionados.
3. **Desarrollo guiado por especificaciones (OpenSpec)** apoyado en asistentes de IA.

### Condiciones y Límites del Proyecto
- **Objetivo pedagógico, no productivo:** El fin último es **aprender las herramientas y establecer un procedimiento de trabajo para el equipo**, no diseñar un vehículo ni un robot complejo.
- **Evolución muy incremental y explicada:** Todos los participantes somos nuevos en estas herramientas. Cada cambio debe ser pequeño, fácil de revisar y estar detalladamente explicado paso a paso.
- **Complejidad acotada:** Partimos de un vehículo eléctrico muy sencillo (triciclo en configuración *Tadpole*). Solo se añadirán **2 o 3 elementos o componentes nuevos como máximo** de prueba y **pocas especificaciones**, únicamente las necesarias para comprender la mecánica de cada herramienta.
- **Entorno técnico núcleo (Text-First + Git):**
  - Edición en **Visual Studio Code** en modo texto, manteniendo archivos `.sysml` segmentados por componentes o utilidades dentro de `Modelos/`.
  - Visualización gráfica local mediante la extensión **Spec42** de VS Code.
  - Aunque durante el proyecto se prueben herramientas alternativas como **Eclipse SysON** o **CATIA Magic**, el núcleo y única fuente de verdad será siempre volver a los **archivos de texto `.sysml` y Git** para colaborar.

---

## Why

Actualmente el modelo del triciclo eléctrico (`Modelos/00_tipos_base.sysml` a `07_vistas.sysml`) solo cuenta con dos vistas estructurales (`GeneralView` e `InterconnectionView`). Para aprender cómo SysML v2 modela requisitos y comportamiento y cómo **Spec42** los proyecta gráficamente sin perder simplicidad, necesitamos dar un primer paso incremental: añadir un par de requisitos de ejemplo que se recopilen automáticamente en una vista de requisitos, y añadir una máquina de estados sencilla del vehículo para visualizar una nueva gráfica de comportamiento (`StateTransitionView`).

## What Changes

Siguiendo la regla de mantener el modelo al mínimo necesario para aprender:
- **Requisitos de prueba distribuidos en subsistemas existentes (máximo 3 requisitos sencillos):**
  - Añadir un requisito formal sencillo en `02_bateria.sysml` (ej. capacidad/tensión mínima) y otro a nivel de sistema en `06_triciclo.sysml` (ej. límite de masa máxima total), junto con sus relaciones `satisfy`.
- **Vista automática de requisitos en `07_vistas.sysml` (`GeneralView` con filtro):**
  - Añadir la vista `vistaRequisitos : GeneralView` usando comodines (`expose Paquete::*;`) y el filtro semántico `filter @SysML::RequirementDefinition or @SysML::RequirementUsage or @SysML::SatisfyRequirementUsage;` para que cualquier requisito que el equipo añada en los paquetes existentes aparezca automáticamente en el diagrama sin listarlo a mano.
  - Filtrar `vistaEstructura` para que muestre únicamente partes y puertos (`PartDefinition`, `PartUsage`, `PortDefinition`, `PortUsage`), evitando que los nuevos requisitos o estados ensucien el diagrama de bloques.
- **Comportamiento básico de prueba (`08_comportamiento.sysml`) y su gráfica (`StateTransitionView`):**
  - Crear un único archivo nuevo `Modelos/08_comportamiento.sysml` con una máquina de estados muy simple (`ModosTricicloStateMachine` con 3 estados: `Apagado`, `Listo`, `Conduciendo`) para aprender cómo funciona `StateTransitionView` en Spec42.
  - Exponer esta máquina de estados en `07_vistas.sysml` mediante `view vistaModosOperacion : StateTransitionView`.

### Fuera de Alcance (Out of Scope)
- No se añadirán nuevos subsistemas físicos complejos (frenos, suspensión, telemetría avanzada, etc.) en este cambio.
- No se incluirán todavía diagramas de secuencia (`SequenceView`) ni flujos de acciones (`ActionFlowView`) para no saturar el aprendizaje en un solo paso; podrán abordarse en un cambio posterior una vez dominado este flujo.

## Capabilities

### New Capabilities
- `requisitos-y-vista-automatica`: Definición de requisitos básicos en SysML v2 (`requirement def` / `satisfy`) y configuración de la vista `GeneralView` con filtrado automático (`expose ...::*;` + `filter @SysML::...`) en Spec42.
- `estados-y-vista-transiciones`: Modelado básico de modos operativos mediante una máquina de estados (`state def` / `transition`) y su proyección gráfica en Spec42 mediante `StateTransitionView`.

### Modified Capabilities
<!-- Ninguna capacidad previa existente en openspec/specs/ se modifica, ya que este es el primer cambio especificado con OpenSpec en el repositorio. -->

## Impact

- **Archivos existentes que se actualizarán de forma mínima y comentada:**
  - `Modelos/02_bateria.sysml` y `Modelos/06_triciclo.sysml` (añadir 1-2 `requirement def` y `satisfy` didácticos).
  - `Modelos/07_vistas.sysml` (añadir `filter` en `vistaEstructura`, nueva `vistaRequisitos` automática y nueva `vistaModosOperacion`).
  - `README.md` (documentar brevemente cómo visualizar las nuevas gráficas en Spec42).
- **Archivo nuevo:**
  - `Modelos/08_comportamiento.sysml` (máquina de estados mínima del triciclo).
- **Herramientas:** 100% compatible en modo texto con Git y validado directamente con el motor de visualización de **Spec42** en VS Code.
