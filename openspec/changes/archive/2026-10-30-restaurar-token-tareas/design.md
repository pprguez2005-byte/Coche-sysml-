# Design: Restauración del Token PAT y Guía Didáctica

## Context
Véase `proposal.md` para la motivación. La naturaleza puramente estática de GitHub Pages impide las operaciones de escritura anónimas en la API de GitHub. Al reactivar el Token de Acceso Personal (PAT) de GitHub, la aplicación web recupera la capacidad de interactuar directamente en 1 clic con los Issues del repositorio, permitiendo una sincronización real y colaborativa para todo el equipo.

## Goals / Non-Goals

**Goals:**
- Restaurar el botón interactivo de estado de sincronización y el modal `#modal-sync-ajustes` en `index.html` y `docs/index.html`.
- Restaurar las clases CSS de modal con efecto frosted-glass en `styles.css` y `docs/styles.css`.
- Restaurar las funciones de token (`obtenerGitHubToken`, `guardarGitHubToken`, `eliminarGitHubToken`, `actualizarUIModalToken`) y las cabeceras `Authorization: Bearer <token>` en `app.js` y `docs/app.js`.
- Restaurar la llamada directa `POST` para creación de issues y `PATCH` para cierre/reapertura de issues desde la web.
- Redactar y publicar el documento `GUIA_TOKEN_GITHUB.md` (y su copia en `docs/`), enlazándolo dentro del modal y en el catálogo del explorador de archivos.
- Mantener la ausencia de categorías de tareas (diseño minimalista de solo título y responsable).

**Non-Goals:**
- No reintroducir selectores ni etiquetas de tipología/categoría de tareas ("Modelado", "Requisitos", etc.).
- No modificar ningún modelo SysML v2 en `Modelos/*.sysml`.

## Decisions

### Decisión 1: Formulario minimalista con publicación en 1 clic
Se mantiene el formulario simplificado sin categorías (solo descripción y responsable asignado). Cuando el usuario tiene el token configurado, la petición se envía directamente a GitHub en segundo plano y el issue se crea con la etiqueta `tarea` y el assignee asignado, mostrando feedback mediante toast.

### Decisión 2: Seguridad y privacidad mediante almacenamiento local
El token se almacena única y exclusivamente en el `localStorage` del navegador cliente (`sysml_github_token`). El archivo `.gitignore` prohíbe de forma estricta cualquier archivo de claves, tokens o secretos, evitando fugas accidentales al repositorio público.

### Decisión 3: Guía didáctica exhaustiva y accesible
Se redacta `GUIA_TOKEN_GITHUB.md` explicando:
1. Qué es un PAT y por qué es seguro frente a contraseñas.
2. Por qué GitHub Pages lo necesita para escribir en GitHub.
3. Enlace directo oficial con scopes pre-seleccionados (`repo`).
4. Tutorial paso a paso con capturas conceptuales para configurarlo en 1 minuto.

## Risks / Trade-offs

- **[Riesgo: Rechazo de token por permisos insuficientes]** → Mitigación: La guía especifica claramente marcar el permiso `repo` y proporciona un enlace que preconfigura dicho permiso.
- **[Riesgo: Paridad de archivos raíz y docs/]** → Mitigación: Sincronización estricta y verificación con `Compare-Object`.
