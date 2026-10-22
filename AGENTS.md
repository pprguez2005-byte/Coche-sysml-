# Instrucciones Obligatorias para Agentes de IA (`AGENTS.md`)

Este repositorio es un proyecto formativo en equipo para aprender **SysML v2 (modo texto)**, **Git** y **desarrollo guiado por especificaciones con OpenSpec**.

Antes de realizar cualquier modificación en los modelos del proyecto, **DEBES** leer [`openspec/config.yaml`](openspec/config.yaml) y cumplir estrictamente estas reglas:

## 1. Prohibido editar `Modelos/*.sysml` sin pasar por OpenSpec
- **NUNCA** edites ni crees archivos dentro de `Modelos/` directamente aunque el usuario pida un cambio sobre un componente (ej. *"añade un atributo a la batería"* o *"crea el subsistema de frenos"*).
- Incluso si el usuario no menciona explícitamente `/opsx-propose` u OpenSpec, debes guiar el cambio a través del flujo de **OpenSpec**:
  1. **Rama de Git (`git checkout -b <rama>`)**: Verifica que no se está trabajando directamente sobre `main`. Si la rama actual es `main`, crea o sugiere crear primero una rama de trabajo dedicada.
  2. **Propuesta (`/opsx-propose` / skill `openspec-propose`)**: Crea el cambio en `openspec/changes/<nombre-cambio>/` con sus 4 artefactos (`proposal.md`, delta en `specs/`, `design.md` y `tasks.md`) y detente para que el usuario revise la planificación.
  3. **Implementación (`/opsx-apply` / skill `openspec-apply-change`)**: Solo cuando el usuario confirme o pida aplicar el cambio, ejecuta las tareas de `tasks.md` sobre `Modelos/*.sysml` y verifica la sintaxis y los diagramas con `spec42`.
  4. **Archivo (`/opsx-archive` / skill `openspec-archive-change`)**: Sincroniza los deltas en `openspec/specs/` y mueve el cambio completado a `openspec/changes/archive/`.

## 2. Convenciones de Modelado SysML v2 y Proyecto
- **Idioma**: Toda la documentación, artefactos de OpenSpec, comentarios y explicaciones deben redactarse en **español** con un enfoque didáctico y paso a paso.
- **Alcance incremental**: Añadir como máximo 2 o 3 elementos nuevos por iteración y de 2 a 4 requisitos verificables por especificación.
- **Unidades y convenciones**:
  - Usar siempre `private import` en cada paquete `.sysml`.
  - Las temperaturas (`Temperature`) se expresan siempre en **grados centígrados (°C)**.
  - Validar siempre la sintaxis SysML v2 y la generación de vistas de **Spec42** antes de dar por completada una implementación.
