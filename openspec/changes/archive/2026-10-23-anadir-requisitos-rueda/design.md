# Design: anadir-requisitos-rueda

## Context

Actualmente, el subsistema de rueda (`Modelos/05_rueda.sysml`) define la estructura (`Wheel`, `Rim`, `Tire`) y las restricciones paramétricas (`calculateTirePressure`, `wheelMassBalance`), pero no formaliza requisitos verificables (`requirement def`) ni tipa la magnitud física de la presión. Para los detalles de motivación y alcance general, consultar `proposal.md`.

## Goals / Non-Goals

**Goals:**
- Definir el tipo semántico `Pressure` en `TiposBase` con unidad en bar.
- Crear los requisitos formales `ReqMasaRueda` y `ReqPresionSegura` en `SubsistemaRueda`.
- Establecer relaciones `satisfy` en `SistemaTriciclo` para cerrar la trazabilidad entre el vehículo y sus ruedas.
- Actualizar la guía pedagógica `05_rueda_descripcion.md` con tablas de magnitudes, unidades y ejemplos numéricos.

**Non-Goals:**
- No se modelan neumáticos complejos (curvas Pacejka o dinámica de rozamiento avanzada).
- No se introducen nuevos subsistemas ni se altera la geometría general del triciclo.

## Decisions

### Decisión 1: Definición del tipo físico `Pressure :> Real` en `TiposBase`
- **Sintaxis SysML v2**:
  ```sysml
  attribute def Pressure :> Real {
      doc /* Presion expresada en bar (manometrica) */
  }
  ```
- **Por qué sintáctico y de ingeniería**: En SysML v2, el operador `:>` define especialización o subtipado a partir del tipo estándar `ScalarValues::Real`. Esto proporciona un significado semántico formal (evita confundir presiones con masas u otras cantidades reales) manteniendo total compatibilidad con operadores aritméticos (`+`, `*`, `<=`, `>=`).
- **Alternativa descartada**: Mantener `Real` genérico. Descartado porque empobrece la calidad del modelo y dificulta la comprensión didáctica de unidades.

### Decisión 2: Modelado de requisitos con `requirement def` y `require constraint`
- **Sintaxis SysML v2**:
  ```sysml
  requirement def ReqMasaRueda {
      doc /* La masa del conjunto ensamblado de la rueda no debe exceder 3.5 kg. */
      attribute maxMass : Mass = 3.5;
      subject rueda : Wheel;
      require constraint { rueda.mass <= maxMass }
  }

  requirement def ReqPresionSegura {
      doc /* La presion recomendada de inflado debe encontrarse en un rango seguro de 1.8 a 3.5 bar. */
      subject rueda : Wheel;
      require constraint {
          rueda.recommendedPressure >= 1.8 and
          rueda.recommendedPressure <= 3.5
      }
  }
  ```
- **Por qué sintáctico y de ingeniería**: 
  - La palabra clave `requirement def` define un tipo de requisito reutilizable.
  - La directiva `subject` especifica qué elemento del modelo está sujeto a verificación (en este caso, una rueda de tipo `Wheel`).
  - La cláusula `require constraint { ... }` define la condición formal que debe cumplirse. A diferencia de una ecuación constitutiva (`assert constraint`), el requisito actúa como criterio de aceptación externo auditable.
- **Alternativa descartada**: Usar únicamente comentarios informativos o aserciones internas. Descartado porque no permite trazabilidad en Spec42 ni relaciones `satisfy`.

### Decisión 3: Vinculación formal mediante `satisfy requirement` en `SistemaTriciclo`
- **Sintaxis SysML v2**:
  ```sysml
  satisfy requirement : ReqMasaRueda by triciclo.frontWheelLeft;
  satisfy requirement : ReqMasaRueda by triciclo.frontWheelRight;
  satisfy requirement : ReqMasaRueda by triciclo.rearWheel;
  ```
- **Por qué sintáctico y de ingeniería**: La construcción `satisfy requirement ... by ...` une contractualmente las partes físicas del triciclo con los requisitos que deben cumplir. En Spec42, esto activa la visualización gráfica de flechas estereotipadas `«satisfy»` en el diagrama de requisitos del sistema.

### Decisión 4: Enriquecimiento didáctico de `05_rueda_descripcion.md`
- **Contenido**: Se añade una tabla resumen de tipos y unidades físicas, una sección explicativa de los nuevos requisitos y un cálculo guiado de ejemplo (ej. vehículo con 60 kg $\rightarrow$ $1.8 + (60 \times 0.012) = 2.52\text{ bar}$).

## Risks / Trade-offs

- **[Riesgo de romper compatibilidad en vistas de Spec42]** $\rightarrow$ *Mitigación*: `07_vistas.sysml` ya cuenta con `expose SubsistemaRueda::*;`, por lo que los nuevos requisitos se incluirán automáticamente en la vista sin modificar el archivo de vistas ni generar errores de sintaxis.
- **[Riesgo de sobre-ingeniería en tipos base]** $\rightarrow$ *Mitigación*: La adición se limita exclusivamente al tipo `Pressure`, manteniendo `TiposBase` ligero y fácil de entender.
