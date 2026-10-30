# dashboard-seguimiento Specification Delta

## MODIFIED Requirements

### Requirement: Creación e interacción de tareas colaborativas
El sistema SHALL permitir registrar nuevas tareas asignadas a cualquier integrante del equipo sin requerir tipos o categorías fijas, ofreciendo soporte directo mediante un Token de Acceso Personal (PAT) opcional o mediante redirección asistida a la creación del Issue en GitHub con los campos precargados.

#### Scenario: Asignación de tarea con token de GitHub configurado
- **WHEN** un usuario con token introduce una tarea y selecciona un integrante asignado
- **THEN** el sistema envía la petición a la API de GitHub registrando la tarea sin etiquetas de categoría y actualizando la vista inmediatamente

#### Scenario: Asignación de tarea sin token configurado
- **WHEN** un usuario sin token añade una tarea
- **THEN** el sistema genera un enlace preconfigurado con título y responsable para que el usuario pueda confirmar la publicación en GitHub con un solo clic
