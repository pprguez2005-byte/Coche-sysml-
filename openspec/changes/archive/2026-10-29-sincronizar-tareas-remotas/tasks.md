# Tasks

## 1. Conexión de Lectura y Mapeo de GitHub Issues

- [x] 1.1 Implementar la función de consulta a la API de GitHub Issues (`/repos/pprguez2005-byte/Coche-sysml-/issues`) con filtrado de pull requests y mapeo al catálogo `EQUIPO_CANONICO` en `app.js` y `docs/app.js`, verificando que devuelva la estructura normalizada de tareas.
- [x] 1.2 Incorporar estrategia de caché en `sessionStorage` y respaldo de fallback en `localStorage` ante errores o límites de tasa de la API, verificando la carga continua tanto online como offline.

## 2. Creación e Interacción Colaborativa (Flujo Dual con/sin Token)

- [x] 2.1 Añadir en `index.html` y `docs/index.html` los componentes de interfaz estilo Apple para el estado de sincronización (indicador "Sincronizado con GitHub Issues") y el modal de configuración de Token de Acceso Personal (PAT) opcional.
- [x] 2.2 Implementar en `app.js` y `docs/app.js` la creación de tareas mediante `POST` autenticado con PAT o redirección asistida con URL preconfigurada si no hay token, verificando que se carguen los campos de asignación y categoría.
- [x] 2.3 Implementar la actualización del estado de las tareas (abrir/cerrar incidencia mediante checkbox circular) con soporte para PAT o apertura directa del Issue en GitHub, verificando que el cambio se refleje en la interfaz.

## 3. Estilos y Verificación Global

- [x] 3.1 Añadir los estilos CSS para el indicador de sincronización y el modal de ajustes de GitHub en `styles.css` y `docs/styles.css`, verificando la coherencia visual con el diseño Apple del panel.
- [x] 3.2 Validar la navegación completa del panel web, la paridad idéntica entre la raíz y la carpeta `docs/`, y comprobar la integridad de los modelos SysML v2 del proyecto.

## Workflow follow-up

- Aplicar el cambio con `/openspec-apply-change` una vez revisado y aprobado el plan.
- Sincronizar las especificaciones con `openspec/specs/` mediante `/openspec-sync-specs`.
- Archivar el cambio finalizado con `/openspec-archive-change`.
