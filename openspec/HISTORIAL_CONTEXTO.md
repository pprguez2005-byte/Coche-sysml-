# Registro de Evolución del Contexto Común (Rama `main`)

> Este archivo registra cronológicamente cómo se expande y consolida el **contexto compartido y las reglas del proyecto** definidas en [`openspec/config.yaml`](config.yaml).
> **Actualización automática**: Se regenera automáticamente mediante GitHub Actions cada vez que se integran cambios en la rama `main`.

---

## Resumen Cronológico

| Versión | Fecha | Commit | Autor | Aporte Esencial al Contexto Común |
| :---: | :--- | :---: | :--- | :--- |
| **v1** | 2026-10-16 | `0ac26f9` | `pprguez2005-byte` | Inicialización del esqueleto base de OpenSpec (sin contexto común formal todavía). |
| **v2** | 2026-10-19 | `e00e03f` | `juanuniovi` | Propósito de PoC formativa (aprender SysML v2 en modo texto, Git colaborativo y OpenSpec) • Límites de diseño: vehículo Tadpole ligero con incrementos didácticos pequeños (máx. 2-3 piezas) • Entorno núcleo de trabajo: VS Code + Spec42 con archivos .sysml como única fuente de verdad |
| **v3** | 2026-10-22 | `4851bcd` | `evjose` | Estandarización de magnitudes: temperaturas medidas obligatoriamente en grados Celsius (°C) |
| **v4** | 2026-10-22 | `509e181` | `juanuniovi` | Protocolo de equipo: trabajo obligatorio en ramas Git (`git checkout -b`), prohibido editar 'main' directamente • Ciclo estricto OpenSpec: prohibido modificar 'Modelos/' sin propuesta previa aprobada (propose → apply → archive) |

---

## Detalle Sintetizado por Revisión

### [v1] Revisión `0ac26f9` — 2026-10-16
* **Autor**: `pprguez2005-byte`
* **Mensaje de commit**: creacion esqueleto
* **Aporte clave al contexto común**:
  > Inicialización del esqueleto base de OpenSpec (sin contexto común formal todavía).

### [v2] Revisión `e00e03f` — 2026-10-19
* **Autor**: `juanuniovi`
* **Mensaje de commit**: Merge pull request #2 from pprguez2005-byte:iacolab_jc
* **Aporte clave al contexto común**:
  > Propósito de PoC formativa (aprender SysML v2 en modo texto, Git colaborativo y OpenSpec) • Límites de diseño: vehículo Tadpole ligero con incrementos didácticos pequeños (máx. 2-3 piezas) • Entorno núcleo de trabajo: VS Code + Spec42 con archivos .sysml como única fuente de verdad
* **Líneas añadidas relevantes al bloque `context:`**:
  * `Propósito del proyecto: Prueba de concepto (PoC) formativa para que el equipo aprenda simultáneamente:`
  * `1. El lenguaje de modelado de sistemas SysML v2 (modo texto).`
  * `2. El flujo de trabajo colaborativo con Git.`
  * `3. El desarrollo guiado por especificaciones con OpenSpec asistido por IA.`
  * `Límites y condiciones del proyecto:`
  * `- El sistema modelado es un vehículo eléctrico ligero muy sencillo (triciclo Tadpole) al que se añade complejidad de forma gradual.`
  * `- El objetivo final es APRENDER las herramientas y asentar un procedimiento de trabajo en equipo, NO diseñar un vehículo ni un robot sofisticado de producción.`
  * `- Alcance acotado: añadir como máximo 2 o 3 componentes o elementos nuevos de prueba por iteración y pocas especificaciones, claras y didácticas.`
  * `- Enfoque pedagógico: todos los integrantes son nuevos en estas herramientas; todas las propuestas, diseños, tareas y modificaciones deben ser muy incrementales y estar muy bien explicadas paso a paso.`
  * `- Herramientas núcleo: Visual Studio Code en modo texto con archivos .sysml segmentados modularmente en la carpeta Modelos/, controlados con Git, y visualizados principalmente con la extensión Spec42 (SysML v2).`
  * `- Aunque puntualmente se prueben herramientas externas (Eclipse SysON, CATIA Magic), la fuente de verdad (núcleo) son siempre los archivos de texto .sysml en Git.`
  * `- Idioma: redactar todos los artefactos y explicaciones en español.`

### [v3] Revisión `4851bcd` — 2026-10-22
* **Autor**: `evjose`
* **Mensaje de commit**: Merge branch 'main' of https://github.com/pprguez2005-byte/Coche-sysml-
* **Aporte clave al contexto común**:
  > Estandarización de magnitudes: temperaturas medidas obligatoriamente en grados Celsius (°C)
* **Líneas añadidas relevantes al bloque `context:`**:
  * `- Las temperaturas se miden siempre en grados centigrados (Celsius): los atributos y constraints de tipo Temperature estan en C.`

### [v4] Revisión `509e181` — 2026-10-22
* **Autor**: `juanuniovi`
* **Mensaje de commit**: docs: añadir guía de flujo Git+OpenSpec en README, config.yaml y AGENTS.md
* **Aporte clave al contexto común**:
  > Protocolo de equipo: trabajo obligatorio en ramas Git (`git checkout -b`), prohibido editar 'main' directamente • Ciclo estricto OpenSpec: prohibido modificar 'Modelos/' sin propuesta previa aprobada (propose → apply → archive)
* **Líneas añadidas relevantes al bloque `context:`**:
  * `REGLAS OBLIGATORIAS DE TRABAJO (GIT + OPENSPEC):`
  * `- Todo cambio, nuevo subsistema o modificación en 'Modelos/' debe realizarse exclusivamente en una rama dedicada y siguiendo el flujo de OpenSpec:`
  * `0. Rama Git: Crear o situarse en una rama de trabajo ('git checkout -b <nombre-rama>') antes de iniciar el cambio; nunca trabajar directamente sobre 'main'.`
  * `1. opsx-propose: Crear la propuesta con proposal.md, specs/, design.md y tasks.md.`
  * `2. opsx-apply: Implementar las tareas aprobadas en los archivos .sysml.`
  * `3. opsx-archive: Consolidar las especificaciones en openspec/specs/ y archivar el cambio antes o después de integrar la rama.`
  * `- Ningún colaborador ni asistente de IA debe editar directamente archivos en 'Modelos/' sin una propuesta aprobada en 'openspec/changes/'.`
  * `- Idioma: redactar todos los artefactos y explicaciones en español técnico.`
  * `- Las temperaturas se miden siempre en grados centígrados (Celsius): los atributos y constraints de tipo Temperature están en °C.`

