# Proposal: Eliminación de Categorías de Tareas y Documentación del Token de GitHub

## Why
El gestor de tareas incluía una clasificación fija por tipos ("Modelado", "Requisitos", "Vistas", "Documentación") que satura la interfaz y añade pasos innecesarios al asignar trabajo a un integrante del equipo. Se desea simplificar el formulario y la vista eliminando las categorías para que una tarea sea únicamente un texto asignado a una persona, manteniendo intacto el soporte de sincronización mediante el Token de Acceso Personal (PAT) de GitHub y elaborando una guía didáctica que explique qué es el token, cómo funciona y cómo generarlo de forma segura.

## What Changes
- **Eliminación del campo y etiquetas de categorías**: Se retira el desplegable de categoría del formulario de alta y los badges de tipo en las tarjetas de tareas en `index.html`, `app.js` y sus réplicas en `docs/`.
- **Mantenimiento íntegro de la sincronización con Token (PAT)**: Se conserva el modal de ajustes de sincronización, la lectura y almacenamiento seguro en `localStorage`, y el envío de peticiones `POST` / `PATCH` a la API de GitHub para crear y cerrar tareas en 1 clic.
- **Creación de la Guía del Token (`GUIA_TOKEN_GITHUB.md`)**: Documento en español que detalla de forma didáctica qué es un Personal Access Token, por qué se necesita en GitHub Pages (entorno sin servidor propio), cómo se genera paso a paso en GitHub y cómo se protege en el navegador local.
- **Paridad estricta**: Sincronización idéntica entre raíz y carpeta `docs/`.

## Capabilities

### Modified Capabilities
- `dashboard-seguimiento`: Se actualiza la especificación para reflejar la eliminación de categorías en la creación y visualización de tareas, manteniendo el soporte de sincronización y autenticación con PAT.

## Impact
- **Archivos web**: `index.html`, `docs/index.html`, `app.js`, `docs/app.js`.
- **Documentación**: Nuevo archivo `GUIA_TOKEN_GITHUB.md` y `docs/GUIA_TOKEN_GITHUB.md`.
- **Modelos SysML v2**: Ningún archivo en `Modelos/` se ve alterado.
