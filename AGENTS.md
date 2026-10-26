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

## 3. Protección de Requisitos Existentes (Bloqueo y Confirmación)
- Siempre que un prompt o cambio solicitado implique **modificar, relajar o eliminar un requisito existente** (`requirement def` en `Modelos/*.sysml` o un requisito consolidado en `openspec/specs/`) o introduzca un componente que incumpla un requisito vigente:
  1. **DETENTE inmediatamente** antes de crear o actualizar propuestas de OpenSpec o editar cualquier archivo.
  2. **Emite un fallo/alerta de bloqueo (`[FALLO DE VALIDACIÓN: MODIFICACIÓN DE REQUISITO]`)** detallando qué requisito se ve afectado, cuál es su condición actual y cuál sería la nueva.
  3. **Solicita confirmación explícita** al usuario para verificar que desea alterar el requisito y que es plenamente consciente del impacto antes de continuar.

## 4. Prohibido hacer merge a `main` o `git push` a `main` sin confirmación previa
- **NUNCA** hagas el merge de una rama de trabajo hacia `main` ni ejecutes `git push origin main` de manera automática tras haber implementado o archivado un cambio en OpenSpec.
- Tras completar las tareas y archivar el cambio (`/opsx-archive`) en la rama dedicada, el asistente de IA **DEBE DETENERSE**, presentar el resumen del trabajo completado en la rama y **PREGUNTAR EXPLÍCITAMENTE** al usuario si desea que se realice el merge hacia `main` y la subida de los cambios al repositorio remoto.
- Solo cuando el usuario confirme afirmativa y expresamente (ej. *"haz el merge"*, *"sube los cambios a main"*), la IA podrá situarse en `main`, integrar la rama y hacer push.
