# Spec Delta

## ADDED Requirements

### Requirement: Sincronización remota y colaborativa de tareas vía GitHub Issues
El sistema SHALL consultar las tareas registradas como incidencias en el repositorio de GitHub para que cualquier colaborador, al abrir el panel web en su propio ordenador o navegador, visualice las tareas asignadas en tiempo real.

#### Scenario: Carga de tareas remotas en el panel
- **WHEN** cualquier integrante del equipo abre el panel web desde su navegador y accede a la sección de Tareas
- **THEN** el sistema recupera las tareas públicas del repositorio mediante la API de GitHub y las muestra asignadas a cada miembro

#### Scenario: Visualización offline o ante límite de peticiones
- **WHEN** la API de GitHub no responde o se excede el límite de consultas
- **THEN** el sistema carga de forma transparente las tareas almacenadas en la caché local indicando el estado sin interrumpir la navegación

### Requirement: Creación e interacción de tareas colaborativas
El sistema SHALL permitir registrar nuevas tareas remotas y conmutar su estado entre pendiente y completada, ofreciendo soporte directo mediante un Token de Acceso Personal (PAT) opcional o mediante redirección asistida a la creación del Issue en GitHub con los campos precargados.

#### Scenario: Asignación de tarea con token de GitHub configurado
- **WHEN** un usuario con token introduce una tarea y selecciona un integrante asignado
- **THEN** el sistema envía la petición a la API de GitHub registrando la tarea y actualizando la vista inmediatamente

#### Scenario: Asignación de tarea sin token configurado
- **WHEN** un usuario sin token añade una tarea
- **THEN** el sistema genera un enlace preconfigurado con título, responsable y etiquetas para que el usuario pueda confirmar la publicación en GitHub con un solo clic
