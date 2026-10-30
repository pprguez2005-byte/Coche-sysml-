# Tasks: Restauración de Token PAT y Guía Didáctica

## 1. Interfaz y Estilos (HTML y CSS)

- [x] 1.1 Restaurar el botón interactivo de sincronización y el modal `#modal-sync-ajustes` en `index.html`.
- [x] 1.2 Restaurar los estilos del modal estilo Apple en `styles.css`.
- [x] 1.3 Replicar `index.html` y `styles.css` en `docs/index.html` y `docs/styles.css` garantizando paridad exacta.

## 2. Lógica de Sincronización y Documentación (JavaScript y Markdown)

- [x] 2.1 Restaurar la gestión del token PAT (`obtenerGitHubToken`, `guardarGitHubToken`, etc.) y las llamadas `POST` y `PATCH` autenticadas en `app.js`.
- [x] 2.2 Redactar el documento explicativo `GUIA_TOKEN_GITHUB.md` y copiarlo a `docs/GUIA_TOKEN_GITHUB.md`.
- [x] 2.3 Añadir `GUIA_TOKEN_GITHUB.md` al catálogo `ARCHIVOS_REPOSITORIO` en `app.js`.
- [x] 2.4 Replicar `app.js` en `docs/app.js` y verificar paridad idéntica con `Compare-Object`.

## 3. Verificación de Integración y Validación OpenSpec

- [x] 3.1 Validar las especificaciones y el cambio con `openspec validate --specs` y `openspec validate "restaurar-token-tareas"`.
- [x] 3.2 Verificar que ningún archivo en `Modelos/*.sysml` haya sufrido cambios indeseados.
