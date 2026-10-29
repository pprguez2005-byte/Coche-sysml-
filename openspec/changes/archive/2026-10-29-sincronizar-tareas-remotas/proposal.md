# Proposal: Sincronización colaborativa de tareas en remoto vía GitHub Issues

## Why
Actualmente, el planificador de tareas del panel de control web (`index.html` / `app.js`) almacena las tareas exclusivamente en el `localStorage` del navegador del usuario que las crea. Como consecuencia, si un integrante del equipo asigna una tarea a otro compañero, dicha tarea solo es visible en el ordenador y navegador local donde se introdujo, impidiendo que el resto del equipo pueda ver sus asignaciones al abrir la web desplegada en GitHub Pages.

Para resolver este problema en un entorno de GitHub Pages sin servidor propio, se propone conectar el gestor de tareas con la API REST pública de GitHub Issues del repositorio (`pprguez2005-byte/Coche-sysml-`). Esto permite que cualquier integrante consulte en tiempo real todas las tareas asignadas desde cualquier ordenador de forma abierta, además de ofrecer una vía directa y asistida para publicar y actualizar tareas con o sin un Token de Acceso Personal (PAT).

## What Changes
- **Carga remota de tareas desde GitHub Issues**: Consulta abierta (sin requerir autenticación) a la API de GitHub (`/repos/pprguez2005-byte/Coche-sysml-/issues`) filtrando por tareas del proyecto, mapeando el responsable a los integrantes de `EQUIPO_CANONICO`, el estado de la tarea (abierta o cerrada) y su categoría.
- **Creación y asignación colaborativa**:
  - Si el usuario configura un Token de Acceso Personal (PAT) de GitHub (almacenado de forma segura y privada en su navegador), el alta y cambio de estado se realiza con un solo clic directamente contra la API de GitHub.
  - Si el usuario no tiene token configurado, la interfaz genera y abre un enlace directo con todos los campos precargados (título, responsable asignado y etiquetas de categoría) en GitHub para publicar la tarea con un solo clic sin necesidad de configuración previa.
- **Persistencia y caché híbrida**: Mantenimiento de almacenamiento local (`localStorage` / `sessionStorage`) como respaldo y fallback ante limitaciones temporales de tasa o desconexión a la API.
- **Interfaz Apple de estado de sincronización**: Indicador visual discreto en la barra de tareas que muestra el estado de sincronización remota y permite gestionar la conexión/token opcional.
- **Actualización simétrica en despliegue**: Sincronización simultánea de los cambios en los archivos raíz (`index.html`, `app.js`, `styles.css`) y en la carpeta de publicación (`docs/index.html`, `docs/app.js`, `docs/styles.css`).

## Capabilities

### Modified Capabilities
- `dashboard-seguimiento`: Se amplía la especificación del panel de seguimiento para incorporar los nuevos requisitos funcionales de sincronización remota multiusuario y gestión colaborativa de tareas a través de GitHub Issues, manteniendo intactos los requisitos existentes.

## Impact
- **Archivos web afectados**:
  - `app.js` y `docs/app.js`: Lógica de consulta a `/issues`, mapeo de incidencias a tareas de equipo, gestión opcional de PAT y soporte para creación directa vía URL.
  - `index.html` y `docs/index.html`: Indicador de estado de sincronización remota, modal/panel compacto de configuración de token opcional y badges de origen remoto.
  - `styles.css` y `docs/styles.css`: Estilos visuales acordes a la estética Apple para los nuevos controles de sincronización.
- **Modelos SysML v2**: Ningún archivo en `Modelos/*.sysml` se ve alterado por este cambio, ya que el alcance está acotado exclusivamente al panel web de seguimiento y control de equipo en GitHub Pages.
