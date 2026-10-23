# requisitos-subsistema-bateria Specification

## Purpose

Define los requisitos de autonomía, temperatura de funcionamiento, protección contra el fuego y vida útil del subsistema de batería del triciclo, modelados en SysML v2 y visibles en la vista de requisitos de Spec42.

## Requirements

### Requirement: Autonomía mínima de la batería
El subsistema de batería SHALL definir un requisito formal (`ReqAutonomiaBateria`) con una restricción que exija una autonomía de al menos 2 horas de uso continuo, expresada mediante el atributo `autonomia` de `BatterySystem`.

#### Scenario: Restricción de autonomía en el modelo
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `requirement def ReqAutonomiaBateria` con `subject` de tipo `BatterySystem` y la restricción `autonomia >= 2.0`

#### Scenario: Visualización en Spec42
- **WHEN** se genera la vista `vistaRequisitos` de `Modelos/07_vistas.sysml`
- **THEN** el requisito `ReqAutonomiaBateria` aparece en el diagrama sin haber modificado el archivo de vistas

### Requirement: Temperatura máxima de funcionamiento
El subsistema de batería SHALL definir un requisito formal (`ReqTemperaturaMaximaBateria`) con una restricción que limite la temperatura de las celdas a 60 °C como máximo, expresada mediante el atributo `temperaturaMaxima` de tipo `Temperature` (°C).

#### Scenario: Restricción de temperatura en grados centígrados
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `requirement def ReqTemperaturaMaximaBateria` con la restricción `temperaturaMaxima <= 60.0` y el atributo está tipado como `Temperature`

### Requirement: Protección contra el fuego
El subsistema de batería SHALL definir un requisito textual (`ReqProteccionFuegoBateria`) que exija una carcasa de material ignífugo capaz de impedir que el fuego de una celda se propague al resto de la batería o al chasis.

#### Scenario: Requisito textual de protección contra el fuego
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `requirement def ReqProteccionFuegoBateria` con un bloque `doc` que describe la protección contra el fuego

### Requirement: Vida útil mínima en ciclos
El subsistema de batería SHALL definir un requisito textual (`ReqVidaUtilBateria`) que exija soportar al menos 500 ciclos completos de carga y descarga.

#### Scenario: Requisito textual de vida útil
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `requirement def ReqVidaUtilBateria` con un bloque `doc` que indica el mínimo de 500 ciclos
