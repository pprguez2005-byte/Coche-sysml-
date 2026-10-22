# Design

## Context

Véase `proposal.md` para la motivación general del cambio. El subsistema de dirección está modelado en `Modelos/04_direccion.sysml` bajo el paquete `SubsistemaDireccion`. Actualmente contiene la definición de partes `SteeringSystem` con atributos físicos (`anguloMaximo`, `radioGiro`, `parMaximo`) y dos requisitos textuales: `RadioGiroMaximo` y `GeometriaAckermann`. En `Modelos/07_vistas.sysml`, la vista `vistaRequisitos` expone dinámicamente todo el paquete `SubsistemaDireccion::*` filtrando por `@SysML::RequirementDefinition`.

## Goals / Non-Goals

**Goals:**
- Definir un tercer requisito formal didáctico en `Modelos/04_direccion.sysml` denominado `AnguloMaximoGiro`.
- Mantener la coherencia sintáctica y de estilo con los requisitos existentes en el archivo (`doc /* ... */`).
- Asegurar que el validador de SysML v2 y la extensión Spec42 compilen y proyecten el requisito en el diagrama `vistaRequisitos` con 0 errores.

**Non-Goals:**
- No alterar la signatura de puertos ni las conexiones mecánicas de las barras de acoplamiento (`leftTieRod`, `rightTieRod`).
- No modificar `Modelos/06_triciclo.sysml` ni `Modelos/07_vistas.sysml`.
- No introducir cálculos trigonométricos complejos ni restricciones matemáticas pesadas en esta fase formativa.

## Decisions

### Decisión 1: Estructura sintáctica del requisito (`requirement def`)
- **Elección**: Definir `requirement def AnguloMaximoGiro` con un bloque de documentación descriptiva `doc /* ... */`, alineado exactamente con la convención de `RadioGiroMaximo` y `GeometriaAckermann`.
- **Justificación sintáctica SysML v2**: En SysML v2, `requirement def` es el elemento canónico para declarar tipos de requisitos a nivel de paquete. El uso de `doc /* ... */` permite que Spec42 extraiga la descripción textual y la muestre dentro del nodo de requisito en el diagrama `vistaRequisitos`.
- **Alternativa descartada**: Añadir `subject direccion : SteeringSystem; require constraint { direccion.anguloMaximo <= 35.0 }`. Aunque formalmente válido en KerML, los otros dos requisitos de este archivo no usan `subject`, por lo que introducirlo rompería la simetría didáctica del archivo `04_direccion.sysml`. Mantenerlo sencillo favorece la comprensión del equipo.

```sysml
    requirement def AnguloMaximoGiro {
        doc /* El angulo maximo de giro de las ruedas directrices no debe superar los 35.0 grados para evitar colisiones con el chasis y garantizar la estabilidad lateral del triciclo. */
    }
```

### Decisión 2: Identificación del archivo destino (`04_direccion.sysml` vs `03_direccion.sysml`)
- **Elección**: Aplicar el cambio sobre `Modelos/04_direccion.sysml`.
- **Justificación**: En la estructura del proyecto, el archivo `03` corresponde a `03_powertrain.sysml` y el archivo `04` a `04_direccion.sysml`. El usuario se refirió a `03_direccion.sysml` por proximidad o confusión de índice, pero el contenido semántico y los dos requisitos citados residen inequívocamente en `04_direccion.sysml`.

## Risks / Trade-offs

- **[Riesgo] Confusión con la numeración de archivos en futuros cambios** → **Mitigación**: Se documenta explícitamente en la propuesta, diseño y tareas que el archivo del subsistema de dirección es `Modelos/04_direccion.sysml`.
- **[Riesgo] Error de sintaxis en Spec42** → **Mitigación**: Seguir la sintaxis de bloque estándar de SysML v2 cerrada con llave y delimitadores de comentario `/* ... */`, verificando la compilación con la extensión Spec42 o validador SysML.
