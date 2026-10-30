# Design: Eliminación de Tokens y Flujo Asistido de Tareas

## Context
Véase `proposal.md` para la motivación. El panel web estático en GitHub Pages consulta tareas compartidas mediante la API pública de GitHub Issues. Previamente existía un modo dual con soporte de Token de Acceso Personal (PAT) para escrituras en 1 clic. Tras acordar la máxima simplicidad para el equipo, se elimina cualquier necesidad de tokens, credenciales o ajustes locales, dejando un flujo asistido transparente.

## Goals / Non-Goals

**Goals:**
- Retirar completamente la ventana modal `#modal-sync-ajustes` y el botón de ajustes/estado de sincronización de la vista de Tareas en `index.html` y `docs/index.html`.
- Eliminar los estilos CSS asociados al modal de ajustes de token en `styles.css` y `docs/styles.css`.
- Retirar las funciones de almacenamiento, lectura y borrado de tokens en `app.js` y `docs/app.js`.
- Configurar la creación de tareas para que genere la URL oficial pre-rellenada de GitHub Issues y la abra en una pestaña nueva con feedback visual mediante toast.
- Eliminar los archivos de documentación `GUIA_TOKEN_GITHUB.md` y `docs/GUIA_TOKEN_GITHUB.md`, y remover su entrada en la lista `ARCHIVOS_REPOSITORIO` del explorador de archivos.
- Preservar la sincronización universal en tiempo real de lectura de issues para todos los usuarios.

**Non-Goals:**
- No modificar los archivos de modelos en `Modelos/*.sysml`.
- No alterar la visualización de colaboradores, explorador de archivos ni estado de ramas.

## Decisions

### Decisión 1: Retirada completa del modal y botón de ajustes
En lugar de ocultar o deshabilitar el modal de tokens, se elimina por completo del DOM y de la hoja de estilos. Esto mantiene el diseño limpio y elimina cualquier distracción técnica innecesaria para los estudiantes.

### Decisión 2: Flujo de creación asistida nativa de GitHub
Al pulsar "Añadir Tarea", `app.js` construye la URL canónica de creación de issues:
`https://github.com/pprguez2005-byte/Coche-sysml-/issues/new?title=${encodeURIComponent(titulo)}&assignees=${encodeURIComponent(responsable)}`
Se abre mediante `window.open(url, '_blank')` en el contexto del evento de clic, evitando bloqueos de pop-up en navegadores modernos, y se muestra un mensaje didáctico vía toast.

### Decisión 3: Eliminación de la guía de tokens
Se eliminan tanto la guía en la raíz como su copia en `docs/`, así como su mención en el catálogo de archivos explorables en `app.js`.

## Risks / Trade-offs

- **[Trade-off: Requiere pulsar 'Submit new issue' en GitHub]** → Mitigación: Es un único clic adicional en la interfaz nativa de GitHub, a cambio de no tener que generar, explicar ni gestionar tokens o claves secretas en el equipo.
- **[Riesgo: Paridad de archivos entre raíz y docs/]** → Mitigación: Sincronización estricta y verificación con `Compare-Object` en PowerShell antes de dar por completado el cambio.
