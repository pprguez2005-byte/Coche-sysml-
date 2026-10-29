# Design: Supresión de Categorías y Mantenimiento del Token de GitHub

## Context
El gestor de tareas incorporó tanto la sincronización con la API de GitHub (mediante token opcional y modo asistido) como un filtro de categorías (Modelado, Requisitos, etc.). El usuario ha solicitado conservar la capacidad de sincronización con token pero suprimir completamente las categorías de tareas, además de documentar el funcionamiento del token. Ver `proposal.md` para la motivación.

## Goals / Non-Goals

**Goals:**
- Retirar el desplegable de categoría del formulario de creación y los badges de tipo en las tareas renderizadas.
- Conservar la integración del Token de Acceso Personal (PAT) de GitHub, su modal de configuración y el soporte para crear/cerrar incidencias vía API.
- Crear una guía clara y didáctica (`GUIA_TOKEN_GITHUB.md`) explicando qué es el PAT, por qué se usa y cómo configurarlo.
- Mantener la paridad idéntica entre la raíz y la carpeta `docs/`.

**Non-Goals:**
- Eliminar la lógica de tokens ni la conexión con GitHub Issues.
- Modificar los modelos SysML v2 en `Modelos/*.sysml`.

## Decisions

### 1. Eliminación de Categorías en el Modelo de Tarea
- **Decisión**: La tarea se simplifica eliminando el atributo `categoria`. Solo incluye texto, persona asignada, número de issue, fecha y estado de completitud.
- **Justificación**: Cumple la solicitud del usuario de retirar "lo de modelado y demás", reduciendo la fricción al registrar tareas.

### 2. Mantenimiento del Token (PAT)
- **Decisión**: Se mantiene el modal `#modal-sync-ajustes`, el almacenamiento seguro en `localStorage` y las llamadas con cabecera `Authorization: Bearer <token>` para usuarios que deseen gestión en 1 clic.

### 3. Redacción de Documentación Explicativa
- **Decisión**: Generar `GUIA_TOKEN_GITHUB.md` con lenguaje pedagógico, esquemas visuales y pasos detallados con capturas conceptuales.

## Risks / Trade-offs

- **[Compatibilidad con issues existentes que posean etiquetas de categoría]** → Mitigación: El deserializador simplemente ignorará cualquier etiqueta de categoría y mapeará la tarea mostrando únicamente el título y el responsable.

## Migration Plan
1. Modificar `index.html` y `docs/index.html` eliminando `<select id="select-tarea-categoria">`.
2. Actualizar `app.js` y `docs/app.js` retirando la lógica de categorías en formulario y renderizado.
3. Crear `GUIA_TOKEN_GITHUB.md` (y su réplica en `docs/GUIA_TOKEN_GITHUB.md`).
4. Validar navegación y sintaxis.
