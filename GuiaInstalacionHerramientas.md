# Guía de Instalación: Entorno de Desarrollo, SysON y OpenSpec

Esta guía describe cómo configurar tu entorno de modelado **SysML v2 (OMG)** y desarrollo guiado por especificaciones con **OpenSpec** de forma nativa en **Visual Studio Code**, sin necesidad de Docker ni servidores externos.

---

## 1. Requisitos Previos del Sistema

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

### A. Visual Studio Code
* Editor principal de código y modelado.
* Descarga e instalación: [code.visualstudio.com](https://code.visualstudio.com/).

### B. Node.js y OpenSpec CLI (Condición Obligatoria)
* Para gestionar las especificaciones, propuestas y tareas asistidas por IA (`openspec`), se requiere **Node.js** y el paquete global de **OpenSpec**:
  1. Instala Node.js (LTS): [nodejs.org](https://nodejs.org/).
  2. Abre PowerShell o terminal e instala OpenSpec globalmente:
     ```bash
     npm install -g @fission-ai/openspec
     ```
     *(o bien: `npm install -g openspec`)*
  3. Verifica la instalación:
     ```bash
     openspec --version
     ```

### C. Git
* Control de versiones y trabajo en ramas colaborativas.
* Descarga: [git-scm.com](https://git-scm.com/).

### D. Java JDK 17 o superior
* Requerido para el servidor de lenguaje SysML v2 local.
* Descarga (Eclipse Temurin o Oracle OpenJDK): [adoptium.net](https://adoptium.net/).

---

## 2. Instalación de Extensiones en VS Code

Abre VS Code, entra en el panel de Extensiones (`Ctrl + Shift + X`) e instala:

### A. Extensión Eclipse SysON (Modelado Visual)
* Busca: **`SysON`** (o `Eclipse SysON` / `SysON for VS Code`).
* Proporciona:
  * Visualización y navegación de modelos SysML v2.
  * Diagramas de estructura y bloques interactivos.
  * Sincronización directa con los archivos `.sysml`.

### B. Extensión SysML v2 / Spec42 (Sintaxis y Resaltado)
* Busca: **`SysML v2`** (de *Systems Modeling Language* o *Spec42*).
* Proporciona:
  * Resaltado sintáctico de SysML v2 OMG.
  * Autocompletado y validación de tipos en tiempo real.
  * Exportación de vistas gráficas en SVG/PNG.

---

## 3. Comprobación Inicial del Entorno

1. Abre la carpeta del proyecto en VS Code:
   ```powershell
   code "C:\ruta\hacia\Nuevo-Coche-SysML"
   ```
2. Abre una terminal integrada en VS Code y comprueba las herramientas clave:
   ```bash
   git --version
   openspec --version
   ```
3. Verifica que la carpeta `openspec/` es reconocida ejecutando:
   ```bash
   openspec list
   ```

---

## 4. Flujo de Trabajo Diario

1. **Crear una rama Git para el cambio**:
   ```bash
   git checkout -b feature/nuevo-subsistema
   ```
2. **Ciclo guiado por especificaciones con OpenSpec**:
   * Proponer diseño y tareas: `/opsx-propose <descripción>` o `openspec new change <nombre>`
   * Aplicar tareas de modelado: `/opsx-apply`
   * Sincronizar especificaciones: `/opsx-sync`
   * Archivar cambio completado: `/opsx-archive`
3. **Visualización y validación con SysON**:
   * Abre los diagramas visuales en VS Code mediante SysON para comprobar bloques, puertos y relaciones `connect`.