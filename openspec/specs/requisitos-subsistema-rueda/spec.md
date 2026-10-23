# requisitos-subsistema-rueda Specification

## Purpose
Define los requisitos funcionales, límites físicos verificables y trazabilidad de ingeniería del subsistema de rueda en SysML v2, incluyendo masa admisible, rango de presión segura y tipado físico.

## Requirements

### Requirement: Tipado físico de magnitud de presión
El modelo base del sistema SHALL definir el tipo de atributo `Pressure :> Real` en el paquete `TiposBase`, permitiendo que los subsistemas expresen formalmente presiones mecánicas y de inflado en bar.

#### Scenario: Definición de Pressure en tipos base
- **WHEN** se compila o valida sintácticamente el archivo `Modelos/00_tipos_base.sysml`
- **THEN** el tipo `Pressure` queda disponible para ser utilizado en atributos de subsistemas físicos

### Requirement: Requisito de masa máxima de la rueda ensamblada
El subsistema de rueda SHALL definir el requisito formal `ReqMasaRueda` que restrinja la masa total de la rueda ensamblada a un valor máximo de 3.5 kg.

#### Scenario: Verificación de cota de masa en la rueda
- **WHEN** se analiza sintácticamente el archivo `Modelos/05_rueda.sysml`
- **THEN** se encuentra definido el bloque `requirement def ReqMasaRueda` con la restricción `rueda.mass <= 3.5`

### Requirement: Requisito de rango seguro de presión de inflado
El subsistema de rueda SHALL definir el requisito formal `ReqPresionSegura` que verifique que la presión recomendada de inflado se encuentre en el rango operativo admisible entre 1.8 bar y 3.5 bar.

#### Scenario: Verificación del rango admisible de inflado
- **WHEN** se examina el cálculo de `recommendedPressure` frente a `ReqPresionSegura` en `Modelos/05_rueda.sysml`
- **THEN** la restricción formal exige que `rueda.recommendedPressure >= 1.8 and rueda.recommendedPressure <= 3.5`

### Requirement: Trazabilidad y satisfacción de requisitos en el vehículo
El ensamblado general del triciclo SHALL incluir relaciones formales de satisfacción `satisfy` que vinculen las ruedas instanciadas con el requisito `ReqMasaRueda`.

#### Scenario: Trazabilidad en el ensamblado del triciclo
- **WHEN** se analiza `Modelos/06_triciclo.sysml` y se genera la vista de requisitos con Spec42
- **THEN** las ruedas del vehículo satisfacen explícitamente `ReqMasaRueda`
