# requisitos-subsistema-bateria Specification

## Purpose

Define los requisitos de autonomía, temperatura de funcionamiento, protección contra el fuego y vida útil del subsistema de batería del triciclo, modelados en SysML v2 y visibles en la vista de requisitos de Spec42.

## Requirements

### Requirement: Autonomía mínima de la batería
El subsistema de batería SHALL definir un requisito formal (`ReqAutonomiaBateria`) con una restricción que exija una autonomía de al menos 1 hora de uso continuo, expresada mediante el atributo `autonomia` de `BatterySystem`.

#### Scenario: Restricción de autonomía en el modelo
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `requirement def ReqAutonomiaBateria` con `subject` de tipo `BatterySystem` y la restricción `autonomia >= 1.0`

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

### Requirement: Instancia de batería comprada con autonomía de 1 hora y temperatura máxima en grados centígrados
El subsistema de batería SHALL definir una instancia de la batería adquirida (`bateriaComprada` de tipo `BatterySystem`) con el atributo `autonomia` redefinido a `1.0` hora y el atributo `temperaturaMaxima` redefinido a `16.85` °C (equivalente a 290 K convertidos a grados centígrados), vinculada mediante relaciones `satisfy` a `ReqAutonomiaBateria` y `ReqTemperaturaMaximaBateria`.

#### Scenario: Definición de la batería comprada con conversión de 290 K a 16.85 °C
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `part bateriaComprada : BatterySystem` con las redefiniciones `attribute :>> autonomia = 1.0;` y `attribute :>> temperaturaMaxima = 16.85;` expresada en grados centígrados (°C)

#### Scenario: Cumplimiento formal de los requisitos de autonomía y temperatura
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml` y la vista `vistaRequisitos` en Spec42
- **THEN** existen las relaciones `satisfy requirement : ReqAutonomiaBateria by bateriaComprada;` y `satisfy requirement : ReqTemperaturaMaximaBateria by bateriaComprada;` y se muestran en el diagrama de requisitos
