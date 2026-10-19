# Modelo Modular de Triciclo Eléctrico en SysML v2

Este modelo representa la arquitectura formal y física de un vehículo eléctrico ligero en configuración **Tadpole** (dos ruedas directrices delanteras y una rueda motriz trasera) desarrollado según la especificación **OMG SysML v2**, simplificado a su **mínima expresión** y dividido en subsistemas modulares independientes.

---

## 1. Estructura de Archivos Modulares

El sistema se encuentra dividido en **9 archivos desacoplados** dentro de `Modelos/`, donde cada subsistema o aspecto posee su propio espacio de nombres (`package`) y se comunica mediante directivas de importación (`private import`):

```text
Modelos/
├── 00_tipos_base.sysml     <- Magnitudes físicas y definiciones de puertos comunes
├── 01_chasis.sysml         <- Subsistema Chasis (bastidor y anclajes)
├── 02_bateria.sysml        <- Subsistema Batería (potencia eléctrica DC y requisito de masa)
├── 03_powertrain.sysml     <- Subsistema Tren Motriz (potencia a tracción)
├── 04_direccion.sysml      <- Subsistema Dirección (cinemática de dirección)
├── 05_rueda.sysml          <- Subsistema Rueda (buje, dirección y par)
├── 06_triciclo.sysml       <- Ensamblado principal, conexiones, balance de masa y requisitos
├── 07_vistas.sysml         <- Definición de las 4 vistas gráficas para Spec42
└── 08_comportamiento.sysml <- Máquina de estados mínima de los modos operativos
```

### Tabla de Subsistemas y Paquetes

| Archivo | Paquete SysML v2 | Contenido y Elementos Clave | Dependencias |
| :--- | :--- | :--- | :--- |
| [`Modelos/00_tipos_base.sysml`](Modelos/00_tipos_base.sysml) | `TiposBase` | `attribute def Mass :> Real`, `port def MechanicalPort`, `port def ElectricalPort` | `ScalarValues::*` |
| [`Modelos/01_chasis.sysml`](Modelos/01_chasis.sysml) | `SubsistemaChasis` | `part def Chassis` con masa y 6 puertos de anclaje mecánico | `TiposBase::*` |
| [`Modelos/02_bateria.sysml`](Modelos/02_bateria.sysml) | `SubsistemaBateria` | `part def BatterySystem` y requisito `ReqMasaBateria` | `TiposBase::*` |
| [`Modelos/03_powertrain.sysml`](Modelos/03_powertrain.sysml) | `SubsistemaPowertrain` | `part def Powertrain` con entrada eléctrica `powerIn` y salida mecánica de par `driveOut` | `TiposBase::*` |
| [`Modelos/04_direccion.sysml`](Modelos/04_direccion.sysml) | `SubsistemaDireccion` | `part def SteeringSystem` con bieletas de dirección `leftTieRod` y `rightTieRod` | `TiposBase::*` |
| [`Modelos/05_rueda.sysml`](Modelos/05_rueda.sysml) | `SubsistemaRueda` | `part def Wheel` con puerto de buje `hubMount`, entrada de par `driveInput` y dirección `steerInput` | `TiposBase::*` |
| [`Modelos/06_triciclo.sysml`](Modelos/06_triciclo.sysml) | `SistemaTriciclo` | `part def ElectricTricycle`, `part triciclo`, `ReqMasaMaximaTriciclo` y relaciones `satisfy` | Subsistemas `00` a `05` |
| [`Modelos/07_vistas.sysml`](Modelos/07_vistas.sysml) | `VistasTriciclo` | `vistaEstructura`, `vistaConexiones`, `vistaRequisitos` (automática) y `vistaModosOperacion` | `StandardViewDefinitions::*`, paquetes del modelo |
| [`Modelos/08_comportamiento.sysml`](Modelos/08_comportamiento.sysml) | `ComportamientoTriciclo` | `state def ModosTricicloStateMachine` (`Apagado`, `Listo`, `Conduciendo`) | Ninguna |


---

## 2. Topología de Conexiones Internas (Internal Block Diagram)

El archivo [`06_triciclo.sysml`](06_triciclo.sysml) define el ensamblado del vehículo en configuración Tadpole mediante dos tipos de flujos: **anclajes mecánicos al chasis** y **flujos funcionales (eléctrico, cinemático y tracción)**:

```text
       +--------------------+               +--------------------+
       |   wheelFrontLeft   |               |  wheelFrontRight   |
       | [.hubMount]        |               | [.hubMount]        |
       | [.steerInput]      |               | [.steerInput]      |
       +-----+--------+-----+               +-----+--------+-----+
             |        ^                           ^        |
             |        |       [leftTieRod]        |        |
             |        +---------------------------+        |
             |        |                           |        |
             |        |   +-------------------+   |        |
             |        +---|     steering      |---+        |
             |            | [.chassisMount]   |            |
             |            +---------+---------+            |
             |                      |                      |
             | [.frontLeft          | [.steering           | [.frontRight
             |   Mount]             |   Mount]             |   Mount]
  +----------v----------------------v----------------------v------------+
  |                           Chassis                                   |
  |  [.batteryMount]                             [.powertrainMount]     |
  |  [.rearMount]                                                       |
  +--------+-----------------------------------------------+------------+
           |                                               |
           |                                               |
  +--------v-----------+                         +---------v-----------+
  |      battery       |                         |     powertrain      |
  | [.chassisMount]    |                         | [.chassisMount]     |
  |                    | [powerOut]              |                     |
  | [.powerOut]        |------------------------>| [.powerIn]          |
  |                    |                         | [.driveOut]         |
  +--------------------+                         +---------+-----------+
                                                           |
                                                           | [driveOut ->
                                                           |  driveInput]
                                                 +---------v-----------+
                                                 |      wheelRear      |
                                                 | [.hubMount]         |
                                                 | [.driveInput]       |
                                                 +---------------------+
```

### Relaciones de Conexión (`connect`):

1. **Montaje Estructural en Chasis**:
   * `connect chassis.batteryMount to battery.chassisMount;`
   * `connect chassis.powertrainMount to powertrain.chassisMount;`
   * `connect chassis.steeringMount to steering.chassisMount;`
   * `connect chassis.frontLeftMount to wheelFrontLeft.hubMount;`
   * `connect chassis.frontRightMount to wheelFrontRight.hubMount;`
   * `connect chassis.rearMount to wheelRear.hubMount;`

2. **Flujos Funcionales**:
   * **Distribución de Energía Eléctrica**: `connect battery.powerOut to powertrain.powerIn;`
   * **Cinemática de Dirección Delantera**:
     * `connect steering.leftTieRod to wheelFrontLeft.steerInput;`
     * `connect steering.rightTieRod to wheelFrontRight.steerInput;`
   * **Trasmisión de Par a Rueda Trasera Motriz**: `connect powertrain.driveOut to wheelRear.driveInput;`

---

## 3. Restricción Física de Balance de Masa

En [`06_triciclo.sysml`](06_triciclo.sysml), se define el cálculo analítico de la masa del sistema mediante una restricción formal de SysML v2:

```sysml
attribute totalMass : Mass;

assert constraint massSum {
    totalMass == chassis.mass + battery.mass + powertrain.mass +
                 steering.mass + frontWheelLeft.mass + frontWheelRight.mass +
                 wheelRear.mass
}
```

---

## 4. Cómo se Comunican los Archivos en SysML v2

A diferencia de lenguajes tradicionales que usan rutas relativas en disco (`#include "archivo.h"`), **SysML v2 utiliza resolución global de espacios de nombres (`package`)**:

1. **Ámbito del Workspace**: Cuando abres la carpeta en una herramienta como **Eclipse SysON** o **VS Code (con extensión SysML v2)**, la herramienta indexa todos los ficheros `.sysml` del proyecto.
2. **Importación Limpia**:
   * Cada subsistema importa los tipos comunes con:
     ```sysml
     private import TiposBase::*;
     ```
   * El integrador final (`06_triciclo.sysml`) importa cada subsistema:
     ```sysml
     private import SubsistemaChasis::*;
     private import SubsistemaBateria::*;
     private import SubsistemaPowertrain::*;
     private import SubsistemaDireccion::*;
     private import SubsistemaRueda::*;
     ```
3. **Encapsulación**: Al usar `private import`, los símbolos importados no se propagan fuera del paquete, evitando colisiones de nombres y manteniendo un diseño limpio y robusto.

---

## 5. Vistas Gráficas en VS Code con Spec42 (`07_vistas.sysml` y `08_comportamiento.sysml`)

El archivo [`Modelos/07_vistas.sysml`](Modelos/07_vistas.sysml) define **4 vistas gráficas** basadas en la librería estándar `StandardViewDefinitions::*` que puedes abrir en VS Code ejecutando el comando **`Spec42: Open Diagram`**:

1. **`vistaEstructura` (`GeneralView` con filtro estructural):**
   * Muestra la descomposición de bloques del triciclo (`ElectricTricycle`).
   * Incluye `filter @SysML::PartUsage or @SysML::PartDefinition or @SysML::PortUsage or @SysML::PortDefinition;` para que los requisitos o estados no se mezclen con los bloques físicos.
2. **`vistaConexiones` (`InterconnectionView`):**
   * Muestra el cableado eléctrico y los acoplamientos mecánicos internos entre el chasis, batería, tren motriz, dirección y ruedas.
3. **`vistaRequisitos` (`GeneralView` con recopilación automática):**
   * Utiliza comodines (`expose SubsistemaBateria::*;`, `expose SistemaTriciclo::*;`, etc.) combinados con:
     ```sysml
     filter @SysML::RequirementDefinition
         or @SysML::RequirementUsage
         or @SysML::SatisfyRequirementUsage;
     ```
   * **¿Por qué es útil?** Cualquier `requirement def` nuevo que añadas dentro de los archivos de subsistema existentes aparecerá automáticamente en esta gráfica sin tener que escribir su nombre en [`Modelos/07_vistas.sysml`](Modelos/07_vistas.sysml).
4. **`vistaModosOperacion` (`StateTransitionView`):**
   * Proyecta la máquina de estados `ModosTricicloStateMachine` definida en [`Modelos/08_comportamiento.sysml`](Modelos/08_comportamiento.sysml), mostrando los 3 modos operativos (`apagado`, `listo`, `conduciendo`) y las transiciones disparadas por los eventos `Encender`, `IniciarMarcha`, `Detener` y `Apagar`.

