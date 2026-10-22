# Proposal: anadir-requisito-direccion

## Why

El subsistema de dirección (`Modelos/04_direccion.sysml`, erróneamente citado como 03 por numeración previa) define parámetros físicos como el ángulo máximo de giro (`anguloMaximo`) y el par del actuador (`parMaximo`), pero actualmente solo cuenta con dos requisitos formales (`RadioGiroMaximo` y `GeometriaAckermann`). Para asegurar la integridad mecánica del triciclo y avanzar en el aprendizaje del modelado de requisitos en SysML v2 sin sobrecargar el diseño, es necesario incorporar un tercer requisito que acote el ángulo de giro de la dirección y evite interferencias con el chasis.

## What Changes

- **Aclaración de archivo destino**: El subsistema de dirección está modelado en `Modelos/04_direccion.sysml` (paquete `SubsistemaDireccion`).
- **Nuevo requisito en SysML v2**: Añadir una tercera definición de requisito (`requirement def AnguloMaximoGiro`) que establezca un límite máximo admisible para el ángulo de giro de las ruedas directrices (35.0 grados).
- **Consistencia didáctica con el modelo existente**: Definir el requisito con su correspondiente bloque explicativo `doc` y opcionalmente su `subject` y `require constraint` sobre `SteeringSystem`, compatible con el recolector automático de `vistaRequisitos` en `Modelos/07_vistas.sysml`.
- **Sin cambios rompientes**: No se alteran puertos, interfaces ni la instanciación existente en `Modelos/06_triciclo.sysml`.

## Capabilities

### New Capabilities
- `requisitos-subsistema-direccion`: Especificación formal del nuevo requisito de límite de ángulo de giro para el subsistema de dirección del triciclo, asegurando su modelado sintáctico en SysML v2 y su integración en la vista de requisitos de Spec42.

### Modified Capabilities
Ninguna.

## Impact

- **Código y modelos afectados**: `Modelos/04_direccion.sysml` (adición del bloque `requirement def AnguloMaximoGiro`).
- **Vistas y diagramas**: La vista de requisitos `vistaRequisitos` en `Modelos/07_vistas.sysml` recopilará y mostrará automáticamente este tercer requisito gracias a la directiva `expose SubsistemaDireccion::*;` existente, sin requerir ediciones en dicho archivo.
- **Riesgo y límites de alcance**: Riesgo nulo; se acota estrictamente a la adición de un único requisito de aprendizaje en el archivo de dirección, cumpliendo con la premisa de cambios pequeños e incrementales.
