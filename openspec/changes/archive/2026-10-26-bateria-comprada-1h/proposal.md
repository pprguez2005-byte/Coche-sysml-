# Proposal: bateria-comprada-1h

## Why

El equipo ha adquirido una batería real para el triciclo eléctrico cuya autonomía es de **1 hora** de uso continuo y cuya temperatura máxima de operación es de **290 K**, que expresada según la convención obligatoria del proyecto en grados centígrados equivale a **16.85 °C** ($290 - 273.15 = 16.85\text{ }^\circ\text{C}$). Actualmente, el modelo en `Modelos/02_bateria.sysml` exige en `ReqAutonomiaBateria` un mínimo de **2 horas** (`bateria.autonomia >= 2.0`) y no representa todavía la instancia de la batería comprada con sus valores reales. Ajustar el requisito de autonomía a 1 hora e incluir la batería adquirida con su autonomía (`1.0` h) y su temperatura máxima en grados centígrados (`16.85` °C) permite alinear el modelo SysML v2 con el componente real cumpliendo las reglas de unidades del proyecto.

## What Changes

- **Modificación del requisito `ReqAutonomiaBateria`** en `Modelos/02_bateria.sysml`:
  - Se actualiza la descripción (`doc`) y la restricción formal de `bateria.autonomia >= 2.0` a `bateria.autonomia >= 1.0` (mínimo 1 hora de uso continuo).
- **Inclusión de la nueva batería comprada (`bateriaComprada`)** en `Modelos/02_bateria.sysml`:
  - Se añade la instancia `part bateriaComprada : BatterySystem` que redefine:
    - `attribute :>> autonomia = 1.0;` (horas).
    - `attribute :>> temperaturaMaxima = 16.85;` (grados centígrados °C, convertidos desde 290 K siguiendo la norma del proyecto).
  - Se añaden las relaciones `satisfy requirement : ReqAutonomiaBateria by bateriaComprada;` y `satisfy requirement : ReqTemperaturaMaximaBateria by bateriaComprada;` para dejar trazado en el modelo y en los diagramas que la batería comprada cumple ambos requisitos (`1.0 >= 1.0` h y `16.85 <= 60.0` °C).

## Capabilities

### New Capabilities
Ninguna.

### Modified Capabilities
- `requisitos-subsistema-bateria`: se actualiza el requisito de autonomía mínima de la batería de 2 horas a 1 hora y se incorpora la instancia de la batería comprada (`bateriaComprada`) con `autonomia = 1.0` h y `temperaturaMaxima = 16.85` °C (290 K convertidos a °C) que satisface los requisitos de autonomía y temperatura máxima.

## Impact

- **Modelos afectados**: únicamente `Modelos/02_bateria.sysml`.
- **Vistas**: `vistaRequisitos` en `Modelos/07_vistas.sysml` reflejará automáticamente tanto el cambio en `ReqAutonomiaBateria` como las relaciones `satisfy` con `bateriaComprada` gracias a `expose SubsistemaBateria::*;`.
- **Archivos que NO se tocan**: `00_tipos_base.sysml` (`Temperature` ya está definido en °C), `06_triciclo.sysml` y `07_vistas.sysml`.
- **Riesgo**: muy bajo; se mantiene el alcance acotado dentro del paquete `SubsistemaBateria` y se garantiza la coherencia de unidades en °C.
