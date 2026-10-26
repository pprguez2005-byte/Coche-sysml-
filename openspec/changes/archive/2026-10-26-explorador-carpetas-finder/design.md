# Design: Explorador Jerárquico de Carpetas (Estilo Apple Finder)

## Context
Véase `proposal.md` para la motivación. Actualmente los archivos se listaban de forma continua. El usuario solicita explícitamente ver el proyecto organizado en carpetas tal y como se vería en el escritorio de un ordenador (estilo Finder de macOS), pudiendo ver qué carpetas hay y qué archivos contiene cada una.

## Goals / Non-Goals

**Goals:**
- Presentar la estructura del proyecto como un árbol jerárquico de carpetas:
  - 📁 `Modelos/` (9 archivos SysML v2)
  - 📁 `openspec/` (especificaciones y configuración del método)
  - 📁 `docs/` (archivos del panel web y recursos)
  - 📁 `Raíz del Proyecto` (archivos de documentación general y configuración)
- Interacción tipo Finder: cada carpeta muestra icono de carpeta Apple, nombre, conteo de ficheros y botón/chevron para abrir/cerrar.
- Dentro de cada carpeta: lista de archivos con iconos distintivos por tipo (.sysml, .md, .yaml, .html), descripción del componente, tarjeta de autoría (avatar y nombre del integrante) y enlace para ver su código en GitHub.
- Botones de acción rápida: *"Expandir todo"* y *"Colapsar todo"*.
- Buscador reactivo que abre automáticamente las carpetas donde haya coincidencias.

**Non-Goals:**
- No modifica ningún archivo SysML v2 en `Modelos/`.
- No requiere backend ni cambios de infraestructura.

## Decisions

### Decisión 1: Agrupación canónica por directorios reales del repositorio
- **Razón**: Refleja fielmente la arquitectura modular del proyecto exigida en la asignatura de robótica.

### Decisión 2: Componente visual de carpeta colapsable estilo macOS
- **Razón**: Permite una navegación limpia y despejada, manteniendo el lenguaje visual de Apple del resto de la aplicación.

## Risks / Trade-offs
- **[Profundidad excesiva de subcarpetas]** → *Mitigación*: Se agrupa en las 4 áreas principales del proyecto con navegación a dos niveles (Carpeta > Archivos) para mantener máxima legibilidad en móviles y portátiles.
