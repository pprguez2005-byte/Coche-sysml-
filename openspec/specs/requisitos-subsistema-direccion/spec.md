# requisitos-subsistema-direccion Specification

## Purpose

Define los requisitos funcionales y didácticos del subsistema de dirección en SysML v2, estableciendo la restricción de ángulo máximo de giro y su integración con las vistas arquitectónicas del triciclo.

## Requirements

### Requirement: Límite del ángulo máximo de giro
El subsistema de dirección SHALL definir un requisito formal (`requirement def AnguloMaximoGiro`) que restrinja el giro angular máximo de las ruedas directrices a un valor no superior a 35.0 grados para evitar interferencias mecánicas con el chasis.

#### Scenario: Incorporación del requisito de ángulo en el modelo de dirección
- **WHEN** se analiza sintácticamente el archivo `Modelos/04_direccion.sysml`
- **THEN** el requisito `AnguloMaximoGiro` se encuentra definido correctamente en el paquete `SubsistemaDireccion` junto a los requisitos preexistentes

### Requirement: Trazabilidad y recopilación automática en vistas
El nuevo requisito de dirección SHALL integrarse de forma automática en el diagrama de requisitos del sistema sin necesidad de modificar el archivo de vistas.

#### Scenario: Visualización automática del requisito en Spec42
- **WHEN** se genera la vista `vistaRequisitos` definida en `Modelos/07_vistas.sysml`
- **THEN** el requisito `AnguloMaximoGiro` aparece reflejado en el diagrama gracias a la directiva de exposición `expose SubsistemaDireccion::*;`
