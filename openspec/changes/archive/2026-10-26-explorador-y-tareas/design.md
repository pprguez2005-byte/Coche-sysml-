# Design: Explorador de Archivos y Gestor de Tareas

## Context
Véase `proposal.md` para la motivación. El panel web actual ofrece visualización de miembros y actividad global. Para convertirlo en un centro integral de trabajo para el equipo, se requieren dos nuevas funcionalidades: navegación de archivos con atribución de autor y un tablero de tareas para organizar el trabajo pendiente.

## Goals / Non-Goals

**Goals:**
- Diseñar una navegación superior fluida con *Segmented Control* estilo Apple:
  - `Panel`: La vista actual con métricas, tarjetas de miembros y vista individual.
  - `Archivos`: Vista de directorio con los ficheros del proyecto (`Modelos/`, `openspec/`, `docs/`, etc.), mostrando autor asignado, fecha y enlace directo.
  - `Tareas`: Gestor de tareas estilo *Apple Reminders* con estados, filtros y asignación por miembro.
- Resolver la autoría de los archivos mediante la información de los commits analizados del repositorio.
- Almacenar las tareas en `localStorage` con tareas didácticas iniciales precargadas si el usuario no tiene ninguna aún.
- Mantener la sincronización de archivos entre la raíz y la carpeta `docs/`.

**Non-Goals:**
- No requiere backend externo ni autenticación de usuarios.
- No modifica archivos de modelado SysML v2 en `Modelos/`.

## Decisions

### Decisión 1: Control Segmentado (*Segmented Control*) en la cabecera
- **Razón**: Es el patrón visual estándar de Apple en macOS e iOS para conmutar entre diferentes modos de una misma aplicación sin recargar ni romper la fluidez.

### Decisión 2: Atribución de autoría por archivo
- **Razón**: Cada archivo de `Modelos/*.sysml` y `openspec/` ha sido desarrollado o modificado por un compañero en sus ramas (`02_bateria.sysml` por José/Pelayo, `04_direccion.sysml` por Juan/Pelayo, `07_vistas.sysml` por César/Pelayo, etc.). El sistema analiza las rutas tocadas en los commits o un catálogo estructurado del repositorio para asociar a cada archivo su creador/modificador y su avatar.

### Decisión 3: Gestor de Tareas con persistencia en `localStorage`
- **Razón**: Permite a cualquier miembro añadir, marcar o borrar tareas en su navegador sin coste ni necesidad de configurar servidores de bases de datos.

## Risks / Trade-offs
- **[Persistencia local de tareas frente a sincronización en la nube]** → *Mitigación*: Se utiliza `localStorage` para simplicidad inmediata y cero dependencias de servidores. Se añade la opción de exportar/importar o precargar tareas del proyecto si el equipo lo requiere.
