# Design: descripcion-sysml-rueda

## Context

El proyecto se estructura como una PoC de aprendizaje para estudiantes que abordan SysML v2 en modo texto dentro de VS Code con la extensión Spec42. El modelo `Modelos/05_rueda.sysml` ya está implementado y es sintácticamente válido, encapsulando el paquete `SubsistemaRueda`. Para cumplir con el propósito formativo del proyecto (véase `proposal.md - Why`), se necesita diseñar un documento pedagógico de referencia técnica directa (`Modelos/05_rueda_descripcion.md`) que desglose la sintaxis y los patrones de modelado utilizados.

## Goals / Non-Goals

**Goals:**
- Diseñar la estructura del documento `Modelos/05_rueda_descripcion.md` para que sirva de guía de estudio modular.
- Detallar las construcciones sintácticas de SysML v2 (`package`, `part def`, `part`, `attribute`, `assert constraint`, `port`, `connect`) y su correspondencia con la ingeniería del automóvil y los diagramas BDD e IBD.
- Integrar diagramas conceptuales en formato Mermaid que faciliten la transición mental hacia las vistas generadas por Spec42.

**Non-Goals:**
- No se modificará el código fuente de `Modelos/05_rueda.sysml` ni de ningún otro archivo `.sysml`.
- No se generarán artefactos dependientes de software propietario o herramientas externas (como CATIA Magic o Eclipse SysON).
- No se agregará complejidad adicional al sistema mecánico más allá de lo definido en `05_rueda.sysml`.

## Decisions

### 1. Formato y ubicación de la documentación
- **Decisión:** Crear el archivo `Modelos/05_rueda_descripcion.md` en Markdown en la misma carpeta que el modelo.
- **Razón:** Facilita que el estudiante mantenga el archivo `.sysml` abierto en un panel de VS Code y el documento explicativo en el panel contiguo (side-by-side).
- **Alternativas consideradas:**
  - *Comentarios extensos en `05_rueda.sysml`:* Descartado porque satura el archivo de modelado y dificulta la visualización limpia con Spec42.
  - *Documento en raíz (`docs/` o `README.md`):* Descartado para mantener la cohesión modular de cada modelo en `Modelos/`.

### 2. Estructura didáctica del contenido
- **Decisión:** Organizar el documento en 4 secciones pedagógicas principales:
  1. **Visión General y Paquete:** Por qué se usa `package` y la importación de `ScalarValues` y `TiposBase`.
  2. **Descomposición Estructural (BDD):** Definición de definiciones de parte (`part def Rim`, `part def Tire`) frente a usos de parte (`part rim : Rim`, `part tire : Tire` dentro de `Wheel`).
  3. **Modelado Paramétrico y Restricciones:** Explicación sintáctica de `assert constraint` (`calculateTirePressure`, `wheelMassBalance`, `propagateParams`) y cómo garantizan consistencia en el modelo.
  4. **Topología de Puertos e Interconexiones (IBD):** Uso de `port : MechanicalPort` y sentencias `connect`, explicando cómo la rueda expone interfaces hacia el buje (`hubMount`), tracción (`driveInput`) y dirección (`steerInput`).
- **Razón:** Permite que cualquier alumno nuevo asocie la sintaxis textual con los conceptos clásicos de ingeniería de sistemas (estructura, parámetros, interfaces).

### 3. Representación visual mediante Mermaid
- **Decisión:** Incluir diagramas Mermaid (`classDiagram` o `graph TD`) que emulen conceptualmente el BDD (jerarquía de partes) y el IBD (interconexión de puertos).
- **Razón:** Refuerza visualmente la correspondencia entre el código en texto plano y los diagramas gráficos que genera la extensión Spec42.

## Risks / Trade-offs

- **[Riesgo] Desfase si en el futuro se altera `05_rueda.sysml`** → *Mitigación:* Redactar la descripción enfocada en los principios y patrones sintácticos de SysML v2, minimizando dependencias de valores numéricos rígidos y documentando claramente qué modelo describe.
- **[Riesgo] Exceso de tecnicismos para principiantes** → *Mitigación:* Usar un lenguaje claro y en español, con ejemplos sencillos y analogías entre el componente físico real y la palabra clave de SysML v2.
