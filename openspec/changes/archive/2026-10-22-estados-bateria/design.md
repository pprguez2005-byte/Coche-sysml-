# Design: Máquina de Estados del Subsistema de Batería en SysML v2

## Context

El paquete `SubsistemaBateria` (`Modelos/02_bateria.sysml`) define actualmente el bloque estructural `BatterySystem` y el requisito `ReqMasaBateria`. A su vez, `Modelos/08_comportamiento.sysml` introdujo el patrón de máquina de estados a nivel de vehículo completo (`ModosTricicloStateMachine`) visualizado mediante `StateTransitionView` en `Modelos/07_vistas.sysml`. Ver `proposal.md` para la motivación del cambio.

## Goals / Non-Goals

**Goals:**
- Modelar en `02_bateria.sysml` los tres estados operativos de la batería (`desconectada`, `cargando`, `descargando`) siguiendo el patrón canónico de SysML v2 compatible con Spec42.
- Explicar el porqué sintáctico de cada bloque (`item def`, `state def`, `entry`, `transition`) y cómo se expone en `07_vistas.sysml` sin afectar a las vistas existentes (`vistaEstructura`, `vistaConexiones`, `vistaRequisitos`).

**Non-Goals:**
- No utilizar acciones internas (`do action` / `entry action`) ni guardas condicionales complejas dentro de los estados para mantener el diagrama limpio y didáctico.
- No enlazar todavía eventos cruzados entre `ModosTricicloStateMachine` y `EstadosBateriaStateMachine`.

## Decisions

### 1. Ubicación de la máquina de estados dentro de `02_bateria.sysml`
- **Decisión:** Definir los eventos, los tres estados y la máquina de estados `EstadosBateriaStateMachine` directamente dentro del paquete `SubsistemaBateria` en `Modelos/02_bateria.sysml`.
- **Por qué sintáctico (SysML v2 + Spec42):**
  - Mantener el comportamiento propio de la batería dentro de `SubsistemaBateria` respeta la modularidad por subsistema del proyecto (un archivo por subsistema).
  - Como `vistaEstructura` y `vistaRequisitos` en `07_vistas.sysml` ya cuentan con filtros por metaclase (`@SysML::PartDefinition`, `@SysML::RequirementDefinition`, etc.), añadir `state def` e `item def` en `SubsistemaBateria` no ensucia ni altera los diagramas de estructura ni de requisitos existentes.
- **Alternativa considered:** Añadir los estados de la batería en `08_comportamiento.sysml`. Se descarta porque el usuario solicitó modificar el módulo de la batería y mantener la cohesión del subsistema en `02_bateria.sysml` facilita trabajar por ramas en Git sobre un subsistema concreto.

### 2. Definición sintáctica de eventos, estados y transiciones
- **Decisión:**
  - Definir 3 eventos disparadores con `item def`:
    - `ConectarCargador`: inicia la carga desde el estado desconectada.
    - `DemandarEnergia`: inicia la descarga hacia el tren motriz.
    - `DesconectarBateria`: devuelve la batería al estado desconectada (desde cargando o descargando).
  - Definir los 3 tipos de estado mediante `state def`: `EstadoDesconectada`, `EstadoCargando`, `EstadoDescargando`.
  - Definir la máquina `state def EstadosBateriaStateMachine` con:
    - Estado inicial: `entry; then desconectada;`
    - Tres usos de estado: `state desconectada : EstadoDesconectada;`, `state cargando : EstadoCargando;`, `state descargando : EstadoDescargando;`
    - Transiciones explícitas mediante `transition <nombre> first <origen> accept <Evento> then <destino>;`:
      - De `desconectada` a `cargando` al aceptar `ConectarCargador`.
      - De `cargando` a `desconectada` al aceptar `DesconectarBateria`.
      - De `desconectada` a `descargando` al aceptar `DemandarEnergia`.
      - De `descargando` a `desconectada` al aceptar `DesconectarBateria`.
- **Por qué sintáctico:**
  - `item def` define el tipo de señal o estímulo que recibe la transición en la cláusula `accept`.
  - Separar la definición del estado (`state def EstadoCargando`) de su instancia (`state cargando : EstadoCargando;`) sigue el principio de definición vs. uso (*Definition vs. Usage*) de SysML v2, igual que se hace en `08_comportamiento.sysml`.
  - Pasar por `desconectada` antes de alternar entre carga y descarga refleja una regla de seguridad básica e intuitiva (no pasar directamente de enchufada al cargador a alimentar el motor en marcha) con solo 4 transiciones.

### 3. Proyección gráfica con `StateTransitionView` en `07_vistas.sysml`
- **Decisión:** Añadir en `VistasTriciclo` (`07_vistas.sysml`):
  ```sysml
  view vistaEstadosBateria : StateTransitionView {
      doc /* Muestra los 3 estados operativos de la batería (desconectada, cargando, descargando) y sus transiciones */
      expose SubsistemaBateria::EstadosBateriaStateMachine;
  }
  ```
- **Por qué sintáctico:**
  - `StateTransitionView` es la vista estándar de SysML v2 que instruye a Spec42 para renderizar nodos de estado y flechas de transición.
  - Al usar `expose SubsistemaBateria::EstadosBateriaStateMachine;` (que ya está disponible porque `07_vistas.sysml` incluye `private import SubsistemaBateria::*;`), Spec42 dibuja exclusivamente la máquina de estados de la batería en su propio diagrama seleccionable.

## Risks / Trade-offs

- **[Riesgo] Que los nuevos `item def` o `state def` en `SubsistemaBateria` aparezcan por error en `vistaRequisitos`** → **Mitigación:** `vistaRequisitos` ya tiene el filtro `filter @SysML::RequirementDefinition or @SysML::RequirementUsage or @SysML::SatisfyRequirementUsage;`, por lo que ignora automáticamente cualquier `state def` o `item def`.
