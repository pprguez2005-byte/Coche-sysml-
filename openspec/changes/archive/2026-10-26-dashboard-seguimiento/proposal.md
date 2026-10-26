# Propuesta: Panel Web de Seguimiento del Proyecto Git y Actividad del Equipo

## Why
Actualmente el equipo trabaja de forma distribuida con múltiples ramas en Git (`Pelayo`, `Jose`, `Eloy`, etc.), lo que dificulta saber de un vistazo qué ha hecho cada integrante y en qué está trabajando en el momento actual. 
Es necesario disponer de una interfaz web sencilla, clara y accesible que centralice el estado del repositorio y permita consultar el avance individual y colectivo sin necesidad de ejecutar comandos complejos de Git en la terminal.

## What Changes
- Creación de un panel web estático y ligero (dashboard) ubicado en la carpeta `dashboard/`.
- Integración directa con la API pública de GitHub del repositorio (`pprguez2005-byte/Coche-sysml-`) para obtener datos en tiempo real (commits, ramas, pull requests y colaboradores).
- Zona interactiva con la lista de todos los integrantes del proyecto con sus avatares y nombres.
- Panel de detalle por miembro: al pulsar sobre un integrante, se muestra su actividad actual (último commit y rama activa) y su historial reciente de aportaciones.
- Documentación e instrucciones paso a paso para desplegar la web en GitHub Pages o abrirla en local.

## Capabilities

### New Capabilities
- `dashboard-seguimiento`: Capacidad del sistema para ofrecer una vista web interactiva del repositorio Git, permitiendo inspeccionar el estado global del proyecto y la actividad actual e histórica de cada miembro del equipo.

### Modified Capabilities
<!-- No se modifican especificaciones existentes de los subsistemas del vehículo. -->

## Impact
- **Archivos afectados / creados**:
  - `dashboard/index.html`: Estructura y vista del panel de seguimiento.
  - `dashboard/app.js`: Lógica de consulta a la API de GitHub y filtrado por integrante.
  - `dashboard/styles.css`: Estilos visuales modernos y responsivos.
  - `dashboard/README.md`: Guía didáctica para uso en local y publicación en GitHub Pages.
- **Modelos SysML v2 (`Modelos/`)**: No se modifican archivos de modelos existentes; este cambio añade herramientas de soporte y seguimiento al flujo de trabajo del equipo.
- **Dependencias**: Ninguna dependencia de backend pesada; utiliza APIs REST estándar del navegador y CDN para estilos.
