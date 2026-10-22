# Tasks

## 1. Modelado de estados de la batería en `02_bateria.sysml`

- [x] 1.1 Definir los eventos disparadores (`item def ConectarCargador;`, `item def DemandarEnergia;`, `item def DesconectarBateria;`) y los tres tipos de estado (`state def EstadoDesconectada`, `state def EstadoCargando`, `state def EstadoDescargando`) en `Modelos/02_bateria.sysml` con comentarios didácticos, y verificar que el archivo mantiene una sintaxis SysML v2 válida.
- [x] 1.2 Definir la máquina de estados `state def EstadosBateriaStateMachine` en `Modelos/02_bateria.sysml` con estado inicial `desconectada`, las tres instancias (`desconectada`, `cargando`, `descargando`) y sus 4 transiciones, y verificar con Spec42 (`spec42 check` o en VS Code) que valida con 0 errores.

## 2. Exposición de la vista gráfica en `07_vistas.sysml`

- [x] 2.1 Añadir la vista `view vistaEstadosBateria : StateTransitionView` en `Modelos/07_vistas.sysml` exponiendo `SubsistemaBateria::EstadosBateriaStateMachine`, y verificar que Spec42 renderiza el diagrama completo con los 3 estados y sus transiciones sin afectar a `vistaEstructura` ni `vistaRequisitos`.
