# Design

## Context

Véase `proposal.md` (apartado *Why*) para la motivación del cambio. En el estado actual de `Modelos/02_bateria.sysml` y las reglas del proyecto (`AGENTS.md` y `openspec/config.yaml`):

- `part def BatterySystem` dispone de los atributos `attribute autonomia : Real;` (en horas) y `attribute temperaturaMaxima : Temperature;` (en °C).
- Por convención obligatoria del proyecto, **todas las temperaturas (`Temperature`) se expresan siempre en grados centígrados (°C)**. Por tanto, el dato del fabricante de **290 K** no debe escribirse como `290.0` en el modelo, sino convertirse previamente a grados Celsius:
  $$T(^\circ\text{C}) = 290\text{ K} - 273.15 = 16.85\text{ }^\circ\text{C}$$
- `requirement def ReqAutonomiaBateria` exige actualmente `require constraint { bateria.autonomia >= 2.0 }`, mientras que `ReqTemperaturaMaximaBateria` exige `require constraint { bateria.temperaturaMaxima <= 60.0 }`.

## Goals / Non-Goals

**Goals:**
- Actualizar `ReqAutonomiaBateria` a un umbral mínimo de `1.0` hora.
- Modelar la batería comercial adquirida (`bateriaComprada`) como una instancia de `BatterySystem` con `autonomia = 1.0` h y `temperaturaMaxima = 16.85` °C (290 K convertidos a °C) usando la sintaxis de redefinición de SysML v2 (`:>>`).
- Trazar el cumplimiento de `ReqAutonomiaBateria` y `ReqTemperaturaMaximaBateria` mediante relaciones `satisfy`.

**Non-Goals:**
- No utilizar Kelvin en los archivos `.sysml` (violaría la regla de unidades en °C del repositorio).
- No alterar las conexiones ni el ensamblaje de `Modelos/06_triciclo.sysml`.

## Decisions

### Decisión 1: Actualizar la restricción de `ReqAutonomiaBateria` a `1.0`
- **Elección**: modificar el bloque `ReqAutonomiaBateria` en `Modelos/02_bateria.sysml`:

```sysml
    requirement def ReqAutonomiaBateria {
        subject bateria : BatterySystem;
        doc /* La bateria debe ofrecer al menos 1 hora de uso continuo con una carga completa. */
        require constraint { bateria.autonomia >= 1.0 }
    }
```

- **Porqué sintáctico**: `require constraint` evalúa una expresión booleana sobre el `subject` (`bateria : BatterySystem`). Al cambiar el literal `2.0` por `1.0`, cualquier instancia de `BatterySystem` con `autonomia = 1.0` cumple la condición formal `1.0 >= 1.0`.

### Decisión 2: Conversión de 290 K a 16.85 °C y redefinición de atributos (`:>>`) en `bateriaComprada`
- **Elección**: añadir en `Modelos/02_bateria.sysml` una parte `bateriaComprada` tipada por `BatterySystem` redefiniendo `autonomia` y `temperaturaMaxima`:

```sysml
    // Instancia de la bateria comercial adquirida (1 h de autonomia y 290 K = 16.85 C)
    part bateriaComprada : BatterySystem {
        doc /* Bateria comercial comprada con 1 hora de autonomia y temperatura maxima de 16.85 C (290 K). */
        attribute :>> autonomia = 1.0;
        attribute :>> temperaturaMaxima = 16.85; // 290 K convertidos a grados centigrados (C)
    }
```

- **Porqué sintáctico y de ingeniería**:
  - `part bateriaComprada : BatterySystem` crea un uso concreto (*part usage*) a partir de la definición `BatterySystem`.
  - `attribute :>> autonomia = 1.0;` y `attribute :>> temperaturaMaxima = 16.85;` utilizan el operador `:>>` (*redefines*) de SysML v2 para asignar valores concretos a los atributos heredados de `BatterySystem`.
  - Si se introdujera `290.0` directamente sin convertir a °C, se violaría la regla del proyecto y además incumpliría falsamente `ReqTemperaturaMaximaBateria` (`temperaturaMaxima <= 60.0`, que está en °C). Con `16.85` °C se mantiene la coherencia dimensional con `TiposBase::Temperature`.

### Decisión 3: Vincular la batería comprada con los requisitos mediante `satisfy`
- **Elección**: añadir justo debajo de `bateriaComprada`:

```sysml
    satisfy requirement : ReqAutonomiaBateria by bateriaComprada;
    satisfy requirement : ReqTemperaturaMaximaBateria by bateriaComprada;
```

- **Porqué sintáctico**: en SysML v2, `satisfy requirement : <DefinicionRequisito> by <parte>;` declara formalmente que `bateriaComprada` cumple las restricciones de `ReqAutonomiaBateria` (`1.0 >= 1.0`) y `ReqTemperaturaMaximaBateria` (`16.85 <= 60.0`). Al estar dentro de `SubsistemaBateria`, ambas relaciones aparecerán automáticamente en `vistaRequisitos` (`07_vistas.sysml`).

## Risks / Trade-offs

- **[Riesgo] Confusión entre unidades Kelvin (290 K) y Celsius (16.85 °C)** → **Mitigación**: se documenta explícitamente la conversión `290 K = 16.85 C` tanto en el comentario de línea como en el bloque `doc` de `bateriaComprada`.
- **[Compromiso] Conviven `triciclo.battery` (en `06_triciclo.sysml`) y `bateriaComprada` (en `02_bateria.sysml`)** → Es intencionado para acotar el cambio a `02_bateria.sysml` sin alterar el ensamblaje general del triciclo en esta iteración.
