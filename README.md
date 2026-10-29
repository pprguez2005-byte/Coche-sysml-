# Proyecto de Modelado de Vehículo en SysML v2

Repositorio formativo para el modelado modular de sistemas de un vehículo utilizando **OMG SysML v2 (modo texto)**, **Git**, la extensión **Eclipse SysON** en VS Code y desarrollo guiado por especificaciones con **OpenSpec**.

---

## 1. Requisitos Previos e Instalación (Condiciones Obligatorias)

Para trabajar en este proyecto, todos los integrantes del equipo y asistentes deben contar con el entorno configurado:

1. **Visual Studio Code**: Editor de código base ([Descargar](https://code.visualstudio.com/)).
2. **OpenSpec CLI**: Herramienta de especificaciones asistida por IA. Requiere Node.js e instalación global:
   ```bash
   npm install -g @fission-ai/openspec
   ```
   *(Verificar con `openspec --version`)*
3. **Extensión Eclipse SysON / SysML v2**: Instalada desde el Marketplace de VS Code para visualización gráfica nativa de diagramas de bloques sin necesidad de Docker.
4. **Git**: Control de versiones y trabajo colaborativo por ramas ([Descargar](https://git-scm.com/)).
5. **Java JDK 17+**: Requerido para el servidor de lenguaje SysML v2 en local ([Adoptium Temurin](https://adoptium.net/)).

> Consulta la [GuiaInstalacionHerramientas.md](GuiaInstalacionHerramientas.md) para ver los pasos detallados de instalación.

---

## 2. Estructura del Proyecto

```text
├── .agents/                 <- Skills y workflows para desarrollo asistido por IA con OpenSpec
├── .github/                 <- Flujos de GitHub Actions y scripts de soporte
├── Modelos/                 <- Modelos modulares en SysML v2 (.sysml)
│   └── 00_tipos_base.sysml  <- Magnitudes físicas (Mass, Temperature) y puertos comunes
├── openspec/                <- Gestión guiada por especificaciones (OpenSpec)
│   ├── config.yaml          <- Configuración y reglas núcleo del proyecto
│   ├── changes/             <- Propuestas de cambios activas y archivadas
│   └── specs/               <- Especificaciones y requisitos consolidados
├── Vistas graficas/         <- Utilidades de visualización y diagramas (Spec42 / SysON)
│   ├── beautify_spec42.py   <- Script para optimizar y embellecer diagramas SVG
│   └── INSTRUCCIONES.md     <- Guía de uso del script
├── AGENTS.md                <- Instrucciones obligatorias para asistentes de IA
├── FlujoDeTrabajoConOpenSpec.md <- Metodología de trabajo y comandos OpenSpec
└── GuiaInstalacionHerramientas.md <- Guía de instalación (VS Code, OpenSpec CLI y SysON)
```

---

## 3. Reglas de Modelado y Trabajo

1. **Flujo Obligatorio OpenSpec**:
   - Nunca editar directamente `Modelos/*.sysml`.
   - Trabajar siempre en ramas dedicadas (`git checkout -b <nombre-rama>`).
   - Ciclo de cambio: `/opsx-propose` -> `/opsx-apply` -> `/opsx-sync` -> `/opsx-archive`.
2. **Propiedades Físicas**:
   - Todo componente físico (`part def` / `part`) **debe incluir** atributo de masa (`mass : Mass` en kg).
   - Temperaturas expresadas en **grados Celsius (°C)**.
3. **Validación Visual**:
   - Los archivos `.sysml` en Git son la única fuente de verdad.
   - Validar sintaxis, estructura y diagramas con la extensión **Eclipse SysON** en Visual Studio Code.

---

## 4. Primeros Pasos

1. Configura la descripción de tu vehículo en `openspec/config.yaml`.
2. Crea una rama de trabajo:
   ```bash
   git checkout -b feature/primer-subsistema
   ```
3. Plantea tu primer diseño con OpenSpec:
   ```text
   /opsx-propose Modelar el subsistema Chasis para el nuevo coche con sus puntos de anclaje y masa estimada
   ```