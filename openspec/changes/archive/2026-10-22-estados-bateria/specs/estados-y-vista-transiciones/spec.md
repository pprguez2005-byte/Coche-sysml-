# Spec Delta

## ADDED Requirements

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
