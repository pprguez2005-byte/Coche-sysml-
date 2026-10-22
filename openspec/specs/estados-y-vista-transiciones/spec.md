# estados-y-vista-transiciones Specification

## Purpose

Introducir de forma sencilla el modelado de comportamiento en SysML v2 mediante una máquina de estados mínima para el triciclo eléctrico y proyectarla gráficamente en Spec42 usando `StateTransitionView`.

## Requirements

### Requirement: Máquina de estados mínima de modos del triciclo
El modelo SHALL incluir en un archivo modular dedicado (`08_comportamiento.sysml`) una máquina de estados sencilla (`state def`) con un máximo de 3 estados operativos (por ejemplo: `Apagado`, `Listo`, `Conduciendo`) y las transiciones básicas entre ellos disparadas por eventos (`item def`).

#### Scenario: Validación sintáctica de la máquina de estados
- **WHEN** se comprueba el archivo `08_comportamiento.sysml` con `spec42 check`
- **THEN** el estado inicial (`entry; then ...`), los estados y las transiciones (`transition ... first ... accept ... then ...`) se validan con 0 errores

### Requirement: Vista gráfica de transición de estados en Spec42
El paquete `VistasTriciclo` en `07_vistas.sysml` SHALL definir una vista `vistaModosOperacion : StateTransitionView` que exponga la máquina de estados del triciclo para su renderizado interactivo en Spec42.

#### Scenario: Renderizado del diagrama de estados en VS Code
- **WHEN** el usuario selecciona `vistaModosOperacion` en el panel Diagram de Spec42
- **THEN** Spec42 genera el diagrama de estados y transiciones completo (`completeness: complete`) mostrando los 3 modos operativos y sus flechas de transición

### Requirement: Máquina de estados del subsistema de batería
El paquete `SubsistemaBateria` en `02_bateria.sysml` SHALL incluir una máquina de estados sencilla (`state def EstadosBateriaStateMachine`) con exactamente 3 estados operativos (`desconectada`, `cargando`, `descargando`), estado inicial en `desconectada`, y transiciones entre ellos disparadas por eventos (`item def`).

#### Scenario: Validación sintáctica de los estados de la batería
- **WHEN** se comprueba el archivo `02_bateria.sysml` con `spec42 check`
- **THEN** las definiciones de estados (`Desconectada`, `Cargando`, `Descargando`), el estado inicial (`entry; then desconectada;`) y las transiciones se validan con 0 errores

### Requirement: Vista gráfica de transición de estados de la batería en Spec42
El paquete `VistasTriciclo` en `07_vistas.sysml` SHALL definir una vista `vistaEstadosBateria : StateTransitionView` que exponga la máquina de estados de la batería para su renderizado interactivo en Spec42.

#### Scenario: Renderizado del diagrama de estados de la batería en VS Code
- **WHEN** el usuario selecciona `vistaEstadosBateria` en el panel Diagram de Spec42
- **THEN** Spec42 genera el diagrama de estados y transiciones completo mostrando los 3 estados de la batería (`desconectada`, `cargando`, `descargando`) y sus flechas de transición
