# Spec Delta: dashboard-seguimiento

## ADDED Requirements

### Requirement: Explorador visual de archivos y autoría
El sistema SHALL proporcionar una vista de explorador que liste los archivos clave del repositorio (incluyendo modelos SysML v2 y especificaciones), identificando el miembro del equipo responsable de la última modificación, la fecha relativa del cambio y el enlace directo al archivo en GitHub.

#### Scenario: Visualización del listado de archivos del repositorio
- **WHEN** el usuario selecciona la pestaña de Archivos en la navegación
- **THEN** el sistema presenta el árbol o lista de archivos del proyecto mostrando la ruta, autor atribuido y última fecha de edición

### Requirement: Gestor interactivo de tareas pendientes (To-Do)
El sistema SHALL permitir crear tareas para la organización del proyecto, asignar cada tarea a uno de los integrantes del equipo, marcar o desmarcar su estado de completitud y almacenar los datos localmente para conservarlos entre sesiones.

#### Scenario: Creación y actualización de una tarea
- **WHEN** el usuario introduce el título de una tarea, selecciona un integrante y pulsa añadir
- **THEN** la tarea se agrega a la lista con su estado pendiente, se guarda en el almacenamiento local y permite conmutar su estado con un solo clic
