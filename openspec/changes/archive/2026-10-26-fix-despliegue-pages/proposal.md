# Proposal: Corrección de Despliegue en Raíz de GitHub Pages

## Why
Al visitar la URL pública en GitHub Pages (`https://pprguez2005-byte.github.io/Coche-sysml-/`), se muestra el texto del `README.md` en lugar del panel web interactivo. Esto ocurre porque la configuración por defecto de GitHub Pages apunta a la raíz (`/`), donde al no encontrar un `index.html`, el motor Jekyll de GitHub procesa y muestra automáticamente el archivo `README.md`.

## What Changes
- Creación de un punto de entrada `index.html` en la raíz del repositorio que cargue directamente el panel web o redirija a `docs/index.html`.
- Incorporación de archivos `.nojekyll` tanto en la raíz como en `docs/` para desactivar el motor Jekyll y servir los archivos web estáticos directamente.
- Garantizar que la web funcione de manera transparente tanto si en los ajustes de GitHub Pages está seleccionado `/ (root)` como si está seleccionado `/docs`.

## Capabilities

### New Capabilities
<!-- No se añaden nuevas capacidades funcionales. -->

### Modified Capabilities
- `dashboard-seguimiento`: Se añade el requisito de compatibilidad de despliegue en la raíz del repositorio para evitar la renderización involuntaria del `README.md` en GitHub Pages.

## Impact
- **Archivos afectados / creados**:
  - `index.html` (en raíz del repositorio): Entrada principal del dashboard.
  - `styles.css` y `app.js` (en raíz del repositorio): Enlazados o disponibles directamente para servicio desde raíz.
  - `.nojekyll`: Archivo de configuración para desactivar el procesamiento Jekyll de GitHub Pages.
- **Modelos SysML v2 (`Modelos/`)**: No se altera ningún archivo de modelado.
