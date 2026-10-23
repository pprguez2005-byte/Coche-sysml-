# Design

## Context

Véase `proposal.md` (apartado *Why*) para la motivación. Estado actual de `Modelos/02_bateria.sysml`:

- `part def BatterySystem` tiene un único atributo (`mass : Mass`) y dos puertos (`chassisMount`, `powerOut`).
- Ya existe un requisito, `ReqMasaBateria`, que sirve de **patrón**: usa `subject bateria : BatterySystem;`, un `doc /* ... */` y un `require constraint { bateria.mass <= 15.0 }`.
- El paquete ya incluye `private import TiposBase::*;`, así que el tipo `Temperature` (en °C) se puede usar sin añadir importaciones.
- `vistaRequisitos` (en `07_vistas.sysml`) expone `SubsistemaBateria::*` y filtra por requisitos, así que cualquier `requirement def` nuevo aparece en el diagrama de forma automática.

## Goals / Non-Goals

**Goals:**
- Añadir los 4 requisitos de la especificación siguiendo el mismo estilo que `ReqMasaBateria`.
- Enseñar las dos formas de escribir un requisito en SysML v2: **con restricción comprobable** y **solo con texto**.

**Non-Goals:**
- No añadir `satisfy` en `06_triciclo.sysml` para los nuevos requisitos (se puede hacer en una iteración futura).
- No modelar celdas, sensores de temperatura ni un sistema de gestión de batería (BMS).
- No modificar la máquina de estados de la batería.

## Decisions

### Decisión 1: Dos atributos nuevos en `BatterySystem`
- **Elección**: añadir `attribute autonomia : Real;` (horas) y `attribute temperaturaMaxima : Temperature;` (°C).
- **Porqué sintáctico**: un `require constraint` solo puede comparar valores que existan en el `subject`. Sin estos atributos, `bateria.autonomia` no se podría resolver y el validador daría error de referencia.
- **Por qué `Temperature` y no `Real`**: el proyecto exige que las temperaturas usen el tipo `Temperature` de `TiposBase` (en °C). `autonomia` usa `Real` con un comentario de unidad, igual que hace `04_direccion.sysml` con `anguloMaximo`.

### Decisión 2: Requisitos con restricción (autonomía y temperatura)
- **Elección**: copiar la estructura de `ReqMasaBateria`:

```sysml
    requirement def ReqAutonomiaBateria {
        subject bateria : BatterySystem;
        doc /* La bateria debe ofrecer al menos 2 horas de uso continuo con una carga completa. */
        require constraint { bateria.autonomia >= 2.0 }
    }

    requirement def ReqTemperaturaMaximaBateria {
        subject bateria : BatterySystem;
        doc /* La temperatura de las celdas no debe superar los 60 C durante el funcionamiento para evitar su degradacion o incendio. */
        require constraint { bateria.temperaturaMaxima <= 60.0 }
    }
```

- **Porqué sintáctico**: `subject` indica a qué bloque se aplica el requisito; `require constraint { ... }` es una expresión booleana que debe cumplirse. Son medibles con un número, así que tiene sentido formalizarlos.

### Decisión 3: Requisitos solo textuales (fuego y vida útil)
- **Elección**: `subject` + `doc`, sin `require constraint`:

```sysml
    requirement def ReqProteccionFuegoBateria {
        subject bateria : BatterySystem;
        doc /* La carcasa de la bateria debe ser de material ignifugo e impedir que el fuego de una celda se propague al resto de la bateria o al chasis. */
    }

    requirement def ReqVidaUtilBateria {
        subject bateria : BatterySystem;
        doc /* La bateria debe soportar al menos 500 ciclos completos de carga y descarga. */
    }
```

- **Porqué**: la protección contra el fuego es una cualidad del diseño (material, aislamiento) y no un número sencillo de comparar. La vida útil sí es un número, pero añadir un tercer atributo superaría el alcance pedido. Se mantiene el `subject` para que la trazabilidad con `BatterySystem` sea igual en los 4 requisitos.
- **Alternativa descartada**: añadir `attribute ciclosVida : Integer;` y una restricción. Válido, pero se deja para otra iteración.

### Decisión 4: Ubicación en el archivo
- Los requisitos se colocan justo debajo de `ReqMasaBateria` y antes de la sección de eventos y estados, para que todos los requisitos queden juntos.
- Los comentarios `doc` se escriben sin tildes ni `°`, igual que el resto del archivo, para evitar problemas de codificación.

## Risks / Trade-offs

- **[Riesgo] Spec42 o el validador no reconocen el tipo `Temperature`** → **Mitigación**: el tipo ya está en `TiposBase` y el paquete ya lo importa; se comprueba en la tarea de validación.
- **[Riesgo] El diagrama de requisitos queda muy cargado (5 requisitos solo de batería)** → **Mitigación**: es aceptable para un proyecto de aprendizaje; se revisa visualmente en Spec42.
- **[Compromiso] Dos requisitos no son comprobables automáticamente** → Es intencionado para enseñar la diferencia entre requisitos textuales y formales.
