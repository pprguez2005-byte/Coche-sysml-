# Spec Delta

## Purpose
Proporciona una interfaz web interactiva para visualizar en tiempo real el avance del proyecto en Git, permitiendo consultar tanto el estado general como la actividad actual e histórica de cada miembro del equipo.

## ADDED Requirements

### Requirement: Visualización de integrantes del equipo
El sistema SHALL mostrar en el panel principal la lista interactiva de todos los colaboradores del repositorio con su nombre de usuario, nombre asignado y avatar de GitHub.

#### Scenario: Listado de miembros cargado
- **WHEN** el usuario accede al panel web
- **THEN** el sistema consulta los colaboradores del repositorio y muestra sus tarjetas de perfil clicables

### Requirement: Consulta de actividad en curso por miembro
Al seleccionar un integrante, el sistema SHALL mostrar su estado actual de trabajo indicando la rama en la que ha realizado su último commit, la fecha del mismo y los Pull Requests asociados si existen.

#### Scenario: Selección de integrante para ver estado actual
- **WHEN** el usuario hace clic sobre la tarjeta de un miembro del equipo
- **THEN** el sistema despliega una sección destacada con la actividad reciente y la rama activa de dicho colaborador

### Requirement: Consulta de historial de aportaciones por miembro
El sistema SHALL mostrar una cronología detallada de los commits y contribuciones realizados por el integrante seleccionado en el repositorio.

#### Scenario: Visualización del historial de commits
- **WHEN** se consulta el detalle de un integrante seleccionado
- **THEN** el sistema lista sus commits ordenados por fecha, mostrando mensaje, identificador abreviado y enlace directo en GitHub
