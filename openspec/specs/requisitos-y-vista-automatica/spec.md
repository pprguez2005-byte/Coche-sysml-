# requisitos-y-vista-automatica Specification

## Purpose

Permitir al equipo definir requisitos formales sencillos en distintos paquetes del modelo SysML v2 y visualizarlos automáticamente en un diagrama `GeneralView` de Spec42 sin necesidad de listar cada requisito manualmente.

## Requirements

### Requirement: Definición de requisitos didácticos y trazabilidad básica
El modelo SysML v2 SHALL incluir un conjunto acotado de entre 2 y 3 definiciones de requisitos (`requirement def`) distribuidas entre un subsistema (como batería) y el sistema completo (`SistemaTriciclo`), junto con sus relaciones de satisfacción (`satisfy requirement`).

#### Scenario: Verificación de requisitos en el modelo textual
- **WHEN** se ejecuta el validador de Spec42 (`spec42 check`) sobre la carpeta `Modelos/`
- **THEN** el modelo valida con 0 errores y resuelve correctamente los bloques `requirement def` y las cláusulas `satisfy`

### Requirement: Recopilación automática de requisitos en vista dedicada
El archivo de vistas (`07_vistas.sysml`) SHALL definir una vista `vistaRequisitos : GeneralView` que exponga mediante comodín (`::*`) los paquetes del modelo y aplique un filtro semántico (`filter @SysML::RequirementDefinition or @SysML::RequirementUsage or @SysML::SatisfyRequirementUsage`) para mostrar automáticamente todos los requisitos sin enumerarlos por nombre.

#### Scenario: Nuevo requisito añadido en un subsistema existente
- **WHEN** un integrante del equipo añade un nuevo `requirement def` dentro de cualquiera de los paquetes de subsistema ya expuestos
- **THEN** el requisito aparece automáticamente en el diagrama `vistaRequisitos` de Spec42 sin modificar `07_vistas.sysml`

### Requirement: Aislamiento estructural en la vista general de bloques
La vista estructural existente (`vistaEstructura : GeneralView`) SHALL incluir un filtro semántico (`filter @SysML::PartUsage or @SysML::PartDefinition or @SysML::PortUsage or @SysML::PortDefinition`) para mostrar únicamente bloques y puertos.

#### Scenario: Visualización de la estructura sin elementos de requisitos ni estados
- **WHEN** se abre el diagrama `vistaEstructura` en Spec42 tras añadir requisitos o estados al modelo
- **THEN** el diagrama muestra únicamente la jerarquía de partes y puertos del triciclo sin mezclar bloques de requisitos ni máquinas de estados
