# Design: Sincronización colaborativa de tareas en GitHub Pages

## Context
El panel web actual es una aplicación de una sola página (SPA) servida mediante GitHub Pages estático. La lógica de tareas residía en `localStorage`, impidiendo la colaboración entre los integrantes cuando accedían desde sus respectivos puestos de trabajo. Al tratarse de un entorno puramente estático en GitHub Pages sin un backend dedicado propio, la infraestructura nativa y más adecuada para almacenar tareas y compartirlas entre miembros del proyecto son las **GitHub Issues** del propio repositorio (`pprguez2005-byte/Coche-sysml-`). Ver `proposal.md` para más detalles sobre la motivación.

## Goals / Non-Goals

**Goals:**
- Permitir que cualquier colaborador que acceda a la web desde cualquier ordenador o navegador vea todas las tareas del equipo asignadas y su estado.
- Soportar lectura pública automática sin necesidad de tokens ni autenticación para consultar tareas.
- Facilitar la creación y marcado de tareas tanto para usuarios con Token de Acceso Personal (PAT) de GitHub (acción directa en 1 clic) como para usuarios sin token (asistente de creación vía URL de GitHub Issue).
- Conservar compatibilidad con el almacenamiento local como respaldo ante problemas de conectividad o límites de tasa de GitHub API.
- Mantener simetría total entre los archivos en raíz y en la carpeta `/docs`.

**Non-Goals:**
- Montar servidores Node.js, contenedores o servicios externos de bases de datos que compliquen el despliegue puramente estático y gratuito de GitHub Pages.
- Modificar modelos ni código en `Modelos/*.sysml`.
- Gestionar credenciales privadas en el repositorio (los tokens personales opcionales se guardan únicamente en el navegador local del usuario).

## Decisions

### 1. Uso de GitHub Issues como fuente de verdad remota frente a base de datos externa
- **Decisión**: Emplear los Issues de GitHub del repositorio (`/repos/pprguez2005-byte/Coche-sysml-/issues`) etiquetados con `tarea` o categorías afines.
- **Justificación**: Es la herramienta nativa del proyecto formativo, no requiere costes adicionales ni servicios de terceros propensos a caídas o cuotas, notifica directamente a los compañeros asignados y es legible públicamente mediante la API sin autenticación.
- **Alternativas consideradas**:
  - *Base de datos en la nube (Firebase/Supabase/JSONBin)*: Descartado porque introduce dependencias de credenciales compartidas o cuentas externas ajenas a la universidad y al repositorio de Git.
  - *Git commits automatizados con GitHub Actions guardando un JSON*: Descartado por la alta latencia (minutos para desplegar cada tarea) y riesgo de conflictos de merge simultáneos.

### 2. Flujo dual de interacción: Modo con Token (PAT) y Modo Asistido sin Token
- **Decisión**:
  - Si el usuario almacena su PAT en su navegador, el frontend invoca `POST` y `PATCH` contra la API de GitHub de manera fluida y transparente.
  - Si el usuario no tiene PAT, al enviar el formulario se abre la ventana de GitHub (`https://github.com/.../issues/new?title=...&body=...&assignee=...&labels=...`) con todos los metadatos precargados para que solo tenga que pulsar *Submit new issue*.
- **Justificación**: Garantiza que nadie quede bloqueado si no quiere o no sabe generar un token inmediatamente, a la vez que proporciona una experiencia de usuario rápida y moderna si deciden configurarlo.

### 3. Modelo de datos de tareas y compatibilidad
- **Decisión**: Mapear cada Issue de GitHub a la estructura interna de `estadoApp.tareas`:
  - `id`: número de Issue (`#12`).
  - `texto`: título de la incidencia.
  - `miembroId`: coincidencia con `EQUIPO_CANONICO` a partir de `issue.assignee.login`.
  - `categoria`: etiqueta (`Modelado`, `Requisitos`, `Vistas`, `Documentación`).
  - `completada`: booleano (`issue.state === 'closed'`).
  - `fecha`: fecha formateada.
  - `url`: enlace directo al Issue en GitHub.
- **Justificación**: Mantiene total compatibilidad con las funciones existentes de filtrado (`renderizarTareas`), búsqueda y estadísticas.

## Risks / Trade-offs

- **[Límite de peticiones de la API no autenticada (60 req/h por IP)]** → Mitigación: Uso de caché en `sessionStorage` (5 minutos) para las peticiones públicas de lectura y respaldo en `localStorage` si se detecta un código HTTP 403 o rate limit.
- **[Permisos de usuario al crear Issues]** → Mitigación: Los colaboradores del repositorio tienen permisos directos; el modo asistido por URL verifica la sesión activa de GitHub del usuario.

## Migration Plan
1. Implementar la capa de acceso y mapeo de GitHub Issues en `app.js` y `docs/app.js`.
2. Añadir en la interfaz de `index.html` y `docs/index.html` el indicador de sincronización remota y el modal para configurar opcionalmente el token personal.
3. Actualizar la lógica del formulario de nueva tarea y checkbox de completado para soportar el flujo dual (PAT / enlace asistido).
4. Probar en local y validar el comportamiento sin conexión y con lectura pública de la API de GitHub.
