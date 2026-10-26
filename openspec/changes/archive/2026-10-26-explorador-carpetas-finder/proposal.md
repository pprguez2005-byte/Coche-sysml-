# Proposal: Explorador Jerárquico de Carpetas y Archivos (Estilo Apple Finder)

## Why
Actualmente los archivos se muestran en una lista plana filtrada. Los integrantes del equipo necesitan ver la estructura del proyecto tal y como está organizada en el disco o en el escritorio (estilo Finder de macOS): carpetas principales (`Modelos/`, `openspec/`, `docs/`, raíz), posibilidad de abrir/desplegar cada carpeta para ver sus archivos contenidos, y conocer con exactitud qué miembro del equipo realizó cada componente.

## What Changes
- Transformación de la vista de archivos en un **Explorador Jerárquico por Carpetas (estilo Apple Finder)**.
- Agrupación por carpetas reales del proyecto:
  - 📁 **`Modelos/`**: Los 9 subsistemas y vistas de SysML v2.
  - 📁 **`openspec/`**: Especificaciones consolidadas (`specs/`), configuración y directrices.
  - 📁 **`docs/`**: Archivos del panel web y recursos de publicación en GitHub Pages.
  - 📁 **`Raíz (/)`**: Documentación principal (`README.md`, `AGENTS.md`, `.nojekyll`).
- Comportamiento interactivo de carpetas: clic para expandir o colapsar, con conteo de elementos y barra de ruta (*breadcrumbs*).
- Atribución de autoría visual por archivo: avatar del responsable, nombre real, descripción técnica del archivo y enlace para ver su código en GitHub.
- Botones de utilidad para *"Expandir todo"* / *"Colapsar todo"* y buscador predictivo que localiza y abre automáticamente la carpeta del archivo buscado.

## Capabilities

### New Capabilities
<!-- No se crean capacidades nuevas. -->

### Modified Capabilities
- `dashboard-seguimiento`: Se actualiza la especificación para exigir la visualización jerárquica por carpetas (árbol de directorios con carpetas colapsables) en el explorador de archivos con atribución de autoría.

## Impact
- **Archivos afectados**:
  - `index.html` y `docs/index.html`: Maquetación del explorador por carpetas estilo macOS Finder.
  - `styles.css` y `docs/styles.css`: Estilos visuales para las carpetas interactivas, iconos y jerarquía visual.
  - `app.js` y `docs/app.js`: Estructura jerárquica de datos en árbol, lógica de apertura/cierre de carpetas y filtrado.
- **Modelos SysML v2 (`Modelos/`)**: No se modifica ningún archivo en `Modelos/`.
