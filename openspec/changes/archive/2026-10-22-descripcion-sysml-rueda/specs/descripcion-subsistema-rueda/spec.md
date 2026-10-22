# Spec Delta

## Purpose

Define la estructura, contenido didáctico y verificación pedagógica del documento descriptivo que explica el funcionamiento y modelado en SysML v2 del subsistema de rueda.

## ADDED Requirements

### Requirement: Explicación de la descomposición estructural BDD
El documento descriptivo DEBE (SHALL) detallar la jerarquía de partes del subsistema Rueda (`Wheel`, `Rim`, `Tire`) explicando su rol estructural, sus atributos clave y su correspondencia con los diagramas de definición de bloques (BDD) en SysML v2.

#### Scenario: Lectura de componentes estructurales
- **WHEN** un estudiante consulta la sección de estructura del documento
- **THEN** identifica claramente la relación jerárquica entre Wheel, Rim y Tire junto con los atributos físicos de masa y dimensiones

### Requirement: Explicación de restricciones paramétricas y de cálculo
El documento descriptivo DEBE (SHALL) explicar las restricciones formales (`calculateTirePressure`, `wheelMassBalance` y `propagateParams`), detallando su formulación matemática y su utilidad en el dimensionamiento paramétrico de ingeniería.

#### Scenario: Comprensión del cálculo de presión y balance de masas
- **WHEN** un revisor analiza las restricciones del subsistema
- **THEN** el documento expone la fórmula lineal de presión recomendada y la suma de masas entre llanta y neumático con su sintaxis en SysML v2

### Requirement: Explicación de puertos mecánicos y conectividad IBD
El documento descriptivo DEBE (SHALL) describir los puertos de interfaz (`MechanicalPort`) externos e internos y las sentencias `connect`, aclarando cómo se visualiza el diagrama de bloques internos (IBD) y cómo se conecta la rueda al resto del vehículo.

#### Scenario: Trazabilidad de interfaces internas y externas
- **WHEN** un modelador examina los puertos y conexiones descritos
- **THEN** comprende cómo se vincula el asiento del neumático con la llanta y la interfaz del buje con el montaje exterior hacia el chasis y powertrain
