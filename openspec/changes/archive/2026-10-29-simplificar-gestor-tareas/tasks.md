# Tasks

## 1. Limpieza de Categorías en la Interfaz y JavaScript

- [x] 1.1 Eliminar el selector `<select id="select-tarea-categoria">` del formulario en `index.html` y `docs/index.html`, verificando que el formulario contenga únicamente el campo de texto, la selección de integrante y el botón de añadir.
- [x] 1.2 Retirar las etiquetas visuales de categoría en las tarjetas de tareas de `app.js` y `docs/app.js`, verificando que cada tarea muestre limpiamente el texto, responsable, fecha y estado.
- [x] 1.3 Adaptar la creación de tareas en `app.js` y `docs/app.js` (tanto con token como por URL asistida) para no enviar etiquetas de categoría a GitHub Issues, verificando el guardado correcto.

## 2. Documentación del Token de GitHub

- [x] 2.1 Redactar la guía didáctica `GUIA_TOKEN_GITHUB.md` (y `docs/GUIA_TOKEN_GITHUB.md`) explicando qué es el PAT, por qué se utiliza en GitHub Pages, su seguridad en el cliente y el proceso paso a paso para generarlo en GitHub.
- [x] 2.2 Vincular la guía en el modal de ajustes de sincronización de `index.html` y `docs/index.html` para acceso directo de los usuarios.

## 3. Verificación Global

- [x] 3.1 Validar la paridad idéntica entre la raíz y la carpeta `docs/`, comprobando la persistencia de tareas y la navegación web.
- [x] 3.2 Verificar que los modelos SysML v2 en `Modelos/*.sysml` no hayan sufrido alteraciones.

## Workflow follow-up

- Aplicar el cambio con `/openspec-apply-change` una vez confirmado.
- Sincronizar las especificaciones con `openspec/specs/` mediante `/openspec-sync-specs`.
- Archivar el cambio finalizado con `/openspec-archive-change`.
