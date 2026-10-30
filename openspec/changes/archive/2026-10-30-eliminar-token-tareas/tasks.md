# Tasks: Eliminación de Token de GitHub y Flujo Asistido de Tareas

## 1. Limpieza de Interfaz y Estilos (HTML y CSS)

- [x] 1.1 Eliminar el botón de sincronización de GitHub Issues y la ventana modal `#modal-sync-ajustes` en `index.html` y verificar estructura limpia.
- [x] 1.2 Eliminar los estilos CSS del modal de ajustes de token en `styles.css`.
- [x] 1.3 Replicar las modificaciones de `index.html` y `styles.css` en `docs/index.html` y `docs/styles.css` garantizando paridad total.

## 2. Refactorización de Lógica y Eliminación de Documentación (JavaScript y Markdown)

- [x] 2.1 Eliminar las funciones y referencias de almacenamiento de token (`obtenerGitHubToken`, `guardarGitHubToken`, `eliminarGitHubToken`, etc.) en `app.js`.
- [x] 2.2 Simplificar el envío de tareas en `app.js` para usar directamente la URL asistida pre-rellenada de GitHub Issues con notificación toast didáctica.
- [x] 2.3 Eliminar físicamente `GUIA_TOKEN_GITHUB.md` y `docs/GUIA_TOKEN_GITHUB.md`, y remover su entrada en `ARCHIVOS_REPOSITORIO` dentro de `app.js`.
- [x] 2.4 Replicar `app.js` en `docs/app.js` y verificar paridad idéntica con `Compare-Object`.

## 3. Verificación de Integración y Validación OpenSpec

- [x] 3.1 Validar las especificaciones y el cambio con `openspec validate --specs` y `openspec validate "eliminar-token-tareas"`.
- [x] 3.2 Verificar que ningún archivo en `Modelos/*.sysml` haya sufrido cambios indeseados.
