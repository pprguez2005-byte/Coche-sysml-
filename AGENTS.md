# Instrucciones Obligatorias para Agentes de IA (`AGENTS.md`)

Este repositorio es un proyecto formativo en equipo para aprender **SysML v2 (modo texto)**, **Git** y **desarrollo guiado por especificaciones con OpenSpec**.

Antes de realizar cualquier modificación en los modelos del proyecto, **DEBES** leer [`openspec/config.yaml`](openspec/config.yaml) y cumplir estrictamente estas reglas:

## 0. Entorno y Herramientas Obligatorias
- **Visual Studio Code**: Editor oficial del proyecto con archivos .sysml como única fuente de verdad en Git.
- **OpenSpec CLI**: Herramienta de especificaciones asistida por IA (npm install -g @fission-ai/openspec). El proyecto depende de su CLI para el flujo estructurado de propuestas, deltas y archivado.
- **Extensión Eclipse SysON** (VS Code): Utilizada para la visualización de diagramas en local de forma nativa, descartando completamente el uso de Docker.

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
  - **Masa y pesos realistas obligatorios**:
    - Todo componente físico (`part def` / `part`) modelado en `Modelos/*.sysml` **DEBE** incluir obligatoriamente su atributo de masa/peso tipado con `TiposBase::Mass` (expresado en kilogramos, kg).
    - Los valores asignados deben ser **reales y técnicamente plausibles** para los elementos de un vehículo ligero/triciclo.
    - La IA tiene la **obligación de recordar y pedir activamente** al usuario o colaborador la asignación de este peso si no lo ha proporcionado en su petición o propuesta, sugiriendo un valor realista si es necesario.
  - Validar siempre la sintaxis SysML v2 y la generación de vistas de la extensión **SysON** / **Spec42** antes de dar por completada una implementación.

## 3. Protección de Requisitos Existentes (Bloqueo y Confirmación)
- Siempre que un prompt o cambio solicitado implique **modificar, relajar o eliminar un requisito existente** (`requirement def` en `Modelos/*.sysml` o un requisito consolidado en `openspec/specs/`) o introduzca un componente que incumpla un requisito vigente:
  1. **DETENTE inmediatamente** antes de crear o actualizar propuestas de OpenSpec o editar cualquier archivo.
  2. **Emite un fallo/alerta de bloqueo (`[FALLO DE VALIDACIÓN: MODIFICACIÓN DE REQUISITO]`)** detallando qué requisito se ve afectado, cuál es su condición actual y cuál sería la nueva.
  3. **Solicita confirmación explícita** al usuario para verificar que desea alterar el requisito y que es plenamente consciente del impacto antes de continuar.
