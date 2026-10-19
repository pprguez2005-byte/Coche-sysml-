# Design: Requisitos Automáticos y Máquina de Estados en SysML v2 (Spec42)

## Context

El repositorio cuenta actualmente con 8 archivos modulares en `Modelos/` (`00_tipos_base.sysml` a `07_vistas.sysml`). Cada archivo declara un único `package` de SysML v2 y utiliza `private import` para evitar contaminar el espacio de nombres global. El archivo `07_vistas.sysml` importa `StandardViewDefinitions::*` y proyecta dos vistas (`GeneralView` e `InterconnectionView`) sobre `ElectricTricycle`. Ver `proposal.md` para la motivación formativa y los límites del proyecto.

## Goals / Non-Goals

**Goals:**
- Explicar y aplicar la sintaxis exacta de SysML v2 para requisitos (`requirement def`, `subject`, `require constraint`, `satisfy`) y máquinas de estados (`state def`, `entry`, `transition`).
- Configurar `07_vistas.sysml` para que Spec42 recopile automáticamente los requisitos de cualquier paquete del proyecto sin tener que añadir cada requisito por nombre.
- Mantener los cambios pequeños, legibles en Git y 100% compatibles con el motor local de Spec42 (`v0.56.0`).

**Non-Goals:**
- No utilizar librerías complejas de unidades físicas (ISQ/SI avanzadas) en las restricciones para no dificultar la lectura a quienes empiezan con SysML v2.
- No acoplar el comportamiento (`08_comportamiento.sysml`) dentro de los bloques físicos existentes más allá de lo imprescindible, para que cada concepto pueda estudiarse por separado.

## Decisions

### 1. ¿Cómo funciona la vista automática de requisitos en Spec42 (`expose ...::*;` + `filter`)?
- **Decisión:** En `07_vistas.sysml`, definir `vistaRequisitos : GeneralView` exponiendo con comodín los paquetes del modelo (`expose SubsistemaBateria::*;`, `expose SistemaTriciclo::*;`, etc.) y aplicando el filtro:
  ```sysml
  filter @SysML::RequirementDefinition
      or @SysML::RequirementUsage
      or @SysML::SatisfyRequirementUsage;
  ```
- **Por qué sintáctico (SysML v2 + Spec42):**
  - `expose Paquete::*;` selecciona todos los miembros directos declarados dentro de `Paquete`.
  - Si no pusiéramos `filter`, la vista mostraría también las partes (`BatterySystem`, `ElectricTricycle`, etc.).
  - La cláusula `filter @SysML::...` (sección 7.26 de la especificación SysML v2) filtra por metaclase del lenguaje: le indica a Spec42 que solo dibuje definiciones de requisitos (`RequirementDefinition`), usos de requisitos (`RequirementUsage`) y relaciones de cumplimiento (`SatisfyRequirementUsage`).
- **Alternativa descartada:** Crear un paquete intermedio con `public import` de todos los subsistemas y hacer un único `expose Agregador::*;`. Se descartó tras verificar con el binario `spec42 diagram` que Spec42 solo proyecta miembros declarados directamente en cada paquete expuesto, ignorando re-exportaciones vacías.

### 2. Filtrado de `vistaEstructura` para evitar mezclar diagramas
- **Decisión:** Añadir a `vistaEstructura : GeneralView` el filtro:
  ```sysml
  filter @SysML::PartUsage or @SysML::PartDefinition
      or @SysML::PortUsage or @SysML::PortDefinition;
  ```
- **Por qué sintáctico:** Al exponer elementos o paquetes que contienen tanto estructura como requisitos o estados, `GeneralView` por defecto intenta dibujarlo todo. Con este filtro (patrón oficial de los ejemplos de Spec42), `vistaEstructura` se mantiene limpia como equivalente puro a un diagrama de bloques (BDD).

### 3. Ubicación de los requisitos de prueba (1 en subsistema + 1 en sistema)
- **Decisión:**
  1. En `02_bateria.sysml` (`SubsistemaBateria`): añadir `requirement def ReqMasaBateria` (con `subject bateria : BatterySystem;`) para demostrar cómo un requisito vive junto a su componente y aparece solo en `vistaRequisitos`.
  2. En `06_triciclo.sysml` (`SistemaTriciclo`): añadir `requirement def ReqMasaMaximaTriciclo` (con `subject vehiculo : ElectricTricycle;`) y las cláusulas `satisfy requirement` vinculadas a la instancia `triciclo` y `triciclo.battery`.
- **Por qué sintáctico:**
  - `subject` declara a qué tipo de bloque aplica el requisito.
  - `satisfy requirement : NombreReq by instancia;` conecta formalmente la especificación con la pieza de diseño que la cumple.

### 4. Diseño de la máquina de estados mínima en `08_comportamiento.sysml`
- **Decisión:** Crear un archivo independiente `Modelos/08_comportamiento.sysml` con el paquete `ComportamientoTriciclo` que defina:
  - 3 eventos (`item def`): `Encender`, `IniciarMarcha`, `Detener`, `Apagar`.
  - 3 definiciones de estado (`state def`): `ModoApagado`, `ModoListo`, `ModoConduciendo`.
  - 1 máquina de estados (`state def ModosTricicloStateMachine`) con `entry; then apagado;` y 4 transiciones (`transition ... first ... accept ... then ...`).
  - Exponerla en `07_vistas.sysml` mediante `view vistaModosOperacion : StateTransitionView { expose ComportamientoTriciclo::ModosTricicloStateMachine; }`.
- **Por qué sintáctico:**
  - En SysML v2, los eventos que disparan transiciones se modelan como tipos de ítem (`item def`).
  - La sentencia `transition nombre first estadoOrigen accept Evento then estadoDestino;` es la forma canónica que el motor `StateTransitionView` de Spec42 lee para dibujar las cajas de estado y las flechas etiquetadas con el evento.

## Risks / Trade-offs

- **[Riesgo] Crear un paquete nuevo en el futuro (ej. `09_frenos.sysml`) y olvidar exponerlo en `vistaRequisitos`** → **Mitigación:** Documentar con un comentario claro en `07_vistas.sysml` que cada paquete existente ya está expuesto con `::*` y que solo hace falta añadir una línea `expose NuevoPaquete::*;` si se crea un archivo/paquete nuevo.
- **[Trade-off] Separar el comportamiento en `08_comportamiento.sysml` en lugar de incrustarlo en `06_triciclo.sysml`** → **Mitigación:** Facilita el trabajo en equipo con Git (menos conflictos de *merge* al editar archivos distintos) y mantiene cada fichero por debajo de ~60 líneas para que sea muy fácil de leer.
