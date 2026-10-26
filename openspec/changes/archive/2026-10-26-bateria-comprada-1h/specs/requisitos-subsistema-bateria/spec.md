# Spec Delta

## MODIFIED Requirements

### Requirement: Autonomía mínima de la batería
El subsistema de batería SHALL definir un requisito formal (`ReqAutonomiaBateria`) con una restricción que exija una autonomía de al menos 1 hora de uso continuo, expresada mediante el atributo `autonomia` de `BatterySystem`.

#### Scenario: Restricción de autonomía en el modelo
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `requirement def ReqAutonomiaBateria` con `subject` de tipo `BatterySystem` y la restricción `autonomia >= 1.0`

#### Scenario: Visualización en Spec42
- **WHEN** se genera la vista `vistaRequisitos` de `Modelos/07_vistas.sysml`
- **THEN** el requisito `ReqAutonomiaBateria` aparece en el diagrama sin haber modificado el archivo de vistas

## ADDED Requirements

### Requirement: Instancia de batería comprada con autonomía de 1 hora y temperatura máxima en grados centígrados
El subsistema de batería SHALL definir una instancia de la batería adquirida (`bateriaComprada` de tipo `BatterySystem`) con el atributo `autonomia` redefinido a `1.0` hora y el atributo `temperaturaMaxima` redefinido a `16.85` °C (equivalente a 290 K convertidos a grados centígrados), vinculada mediante relaciones `satisfy` a `ReqAutonomiaBateria` y `ReqTemperaturaMaximaBateria`.

#### Scenario: Definición de la batería comprada con conversión de 290 K a 16.85 °C
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml`
- **THEN** existe `part bateriaComprada : BatterySystem` con las redefiniciones `attribute :>> autonomia = 1.0;` y `attribute :>> temperaturaMaxima = 16.85;` expresada en grados centígrados (°C)

#### Scenario: Cumplimiento formal de los requisitos de autonomía y temperatura
- **WHEN** se analiza el archivo `Modelos/02_bateria.sysml` y la vista `vistaRequisitos` en Spec42
- **THEN** existen las relaciones `satisfy requirement : ReqAutonomiaBateria by bateriaComprada;` y `satisfy requirement : ReqTemperaturaMaximaBateria by bateriaComprada;` y se muestran en el diagrama de requisitos
