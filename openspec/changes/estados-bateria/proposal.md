# Proposal: Máquina de Estados para el Subsistema de Batería

## Why

Hasta ahora el modelo cuenta con una máquina de estados general a nivel de vehículo (`ModosTricicloStateMachine` en `Modelos/08_comportamiento.sysml`), pero el subsistema de almacenamiento de energía (`SubsistemaBateria` en `Modelos/02_bateria.sysml`) solo define su estructura física y un requisito de masa. Añadir una máquina de estados sencilla a la batería con tres estados (`desconectada`, `cargando`, `descargando`) permite practicar de forma incremental el modelado de estados a nivel de subsistema en SysML v2 y visualizar su diagrama de transición de estados en Spec42.

## What Changes

- **Máquina de estados del subsistema de batería en `Modelos/02_bateria.sysml`:**
  - Definir los eventos disparadores (`item def`) para cambiar el estado eléctrico de la batería (conectar cargador, demandar energía y desconectar).
  - Definir los 3 estados de la batería (`state def`): `Desconectada`, `Cargando` y `Descargando`.
  - Definir la máquina de estados `EstadosBateriaStateMachine` con sus tres instancias de estado (`desconectada`, `cargando`, `descargando`), su estado inicial (`desconectada`) y las transiciones básicas entre ellos.
- **Vista gráfica de los estados de la batería en `Modelos/07_vistas.sysml`:**
  - Añadir una vista `vistaEstadosBateria : StateTransitionView` en `VistasTriciclo` que exponga `SubsistemaBateria::EstadosBateriaStateMachine` para poder inspeccionar el diagrama en Spec42 sin interferir con el resto de diagramas.

### Fuera de Alcance (Out of Scope)
- No se modelarán ecuaciones continuas de estado de carga (SoC), curvas térmicas ni algoritmos complejos de BMS (Battery Management System).
- No se acoplarán todavía señales o acciones concurrentes entre la máquina de estados del triciclo (`08_comportamiento.sysml`) y la de la batería, manteniendo cada máquina independiente y fácil de comprender.

## Capabilities

### New Capabilities
<!-- No se introducen capacidades nuevas independientes; se amplía la capacidad existente de estados y vistas de transición. -->

### Modified Capabilities
- `estados-y-vista-transiciones`: Se amplía para incluir la máquina de estados del subsistema de batería (`desconectada`, `cargando`, `descargando`) en `02_bateria.sysml` y su vista `StateTransitionView` correspondiente en `07_vistas.sysml`.

## Impact

- **Archivos modificados:**
  - `Modelos/02_bateria.sysml`: Se añaden las definiciones de eventos (`item def`), estados (`state def`) y la máquina de estados `EstadosBateriaStateMachine`.
  - `Modelos/07_vistas.sysml`: Se añade la vista `vistaEstadosBateria : StateTransitionView`.
- **Herramientas y compatibilidad:** Totalmente compatible con el flujo basado en texto con Git y visualizable directamente en la extensión Spec42 de VS Code.
