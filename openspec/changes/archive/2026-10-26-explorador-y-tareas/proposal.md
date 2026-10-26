# Proposal: Explorador de Archivos con Autoría y Gestor de Tareas (To-Do)

## Why
Para una coordinación completa del proyecto formativo, el equipo necesita poder:
1. Consultar de forma gráfica la estructura de archivos del repositorio (especialmente los archivos SysML v2 en `Modelos/` y especificaciones en `openspec/`) e identificar qué integrante creó o modificó cada uno.
2. Contar con un espacio integrado de organización del trabajo (To-Do / Planificador de tareas) para registrar tareas pendientes, asignarlas a los miembros del equipo y marcar su cumplimiento sin depender de herramientas externas.

## What Changes
- Incorporación de navegación por pestañas estilo *Segmented Control* de Apple en el panel web:
  - **Panel de Control**: Métricas, cuadrícula de miembros y actividad.
  - **Explorador de Archivos**: Visualizador estructurado de los archivos del repositorio con atribución de autoría (quién lo hizo/modificó), fecha de última modificación y enlace a GitHub.
  - **Tareas (To-Do)**: Gestor interactivo de tareas con estética de *Apple Reminders*, asignación a integrantes del equipo, filtros de estado (todas, pendientes, completadas) y persistencia en `localStorage`.
- Sincronización de los cambios tanto en la raíz (`/`) como en `docs/` para mantener la publicación en GitHub Pages.

## Capabilities

### New Capabilities
<!-- No se crean capacidades independientes; se amplía el panel existente. -->

### Modified Capabilities
- `dashboard-seguimiento`: Se añaden los requisitos de exploración de archivos con atribución de autoría y el gestor de tareas colaborativas (To-Do).

## Impact
- **Archivos modificados**:
  - `index.html` y `docs/index.html`: Estructura con selector de pestañas (Panel, Archivos, Tareas), contenedor del explorador de ficheros y sección de To-Do.
  - `styles.css` y `docs/styles.css`: Estilos visuales para el explorador de archivos y las listas de tareas estilo Apple.
  - `app.js` y `docs/app.js`: Lógica para listar archivos con sus autores, gestión del To-Do interactivo y persistencia local.
- **Modelos SysML v2 (`Modelos/`)**: No se altera ningún archivo de modelo.
