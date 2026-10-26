# dashboard-seguimiento Specification

## Purpose
Proporciona una interfaz web interactiva para visualizar en tiempo real el avance del proyecto en Git, permitiendo consultar tanto el estado general como la actividad actual e histórica de cada miembro del equipo.

## Requirements

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

### Requirement: Compatibilidad de despliegue en raíz de GitHub Pages
El repositorio SHALL incluir en su raíz el archivo `index.html` y el marcador `.nojekyll` para que GitHub Pages sirva inmediatamente el panel de control web sin importar si en la configuración del repositorio se ha seleccionado la carpeta raíz (`/`) o la carpeta `/docs`.

#### Scenario: Acceso directo desde la raíz de GitHub Pages
- **WHEN** el usuario navega a la URL pública del repositorio en GitHub Pages
- **THEN** el sistema carga directamente la interfaz interactiva del panel de control en lugar de procesar y mostrar el documento README

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
