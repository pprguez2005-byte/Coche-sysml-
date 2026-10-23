# Proposal: anadir-requisitos-rueda

## Why

El modelo actual del subsistema de rueda (`Modelos/05_rueda.sysml`) cuenta con una descomposición estructural y restricciones físicas (balance de masa y cálculo de presión), pero carece de requisitos formales de ingeniería (`requirement def`) y de tipado específico para la magnitud de presión (definida genéricamente como `Real`). 

Para alinear el subsistema de rueda con los estándares pedagógicos aplicados en el subsistema de dirección y batería, esta propuesta formaliza los requisitos de masa máxima y margen de presión segura en SysML v2, introduce el tipo de dato físico `Pressure` en `TiposBase`, establece la trazabilidad de satisfacción (`satisfy`) en el triciclo completo y actualiza la guía descriptiva.

## What Changes

- **Tipo base `Pressure`**: Añadir la definición de magnitud `attribute def Pressure :> Real;` en `Modelos/00_tipos_base.sysml`.
- **Tipado en rueda**: Actualizar `recommendedPressure : Pressure;` en `part def Tire` y `part def Wheel` de `Modelos/05_rueda.sysml`.
- **Requisitos formales del subsistema de rueda**:
  - `requirement def ReqMasaRueda`: Requisito formal que restringe la masa de la rueda ensamblada a un máximo de 3.5 kg.
  - `requirement def ReqPresionSegura`: Requisito formal que exige que la presión calculada de inflado se encuentre en el rango seguro de 1.8 bar a 3.5 bar.
- **Trazabilidad a nivel de vehículo**: Añadir relaciones `satisfy` en `Modelos/06_triciclo.sysml` para vincular las ruedas (`frontWheelLeft`, `frontWheelRight`, `rearWheel`) con los requisitos de rueda.
- **Actualización documental**: Enriquecer `Modelos/05_rueda_descripcion.md` incorporando la tabla de unidades, el nuevo tipo `Pressure`, los requisitos de ingeniería y un ejemplo numérico guiado.

## Capabilities

### New Capabilities
- `requisitos-subsistema-rueda`: Especificación de los requisitos formales de masa, presión admisible, tipado físico y relaciones de satisfacción para las ruedas del triciclo en SysML v2.

### Modified Capabilities
Ninguna.

## Impact

- **Código y modelos afectados**:
  - `Modelos/00_tipos_base.sysml`: Se añade `Pressure`.
  - `Modelos/05_rueda.sysml`: Se actualizan los atributos de presión y se añaden los bloques `requirement def`.
  - `Modelos/06_triciclo.sysml`: Se añaden las cláusulas `satisfy` para las ruedas.
  - `Modelos/05_rueda_descripcion.md`: Se actualiza la guía didáctica.
- **Herramientas**: Compatible con el validador de sintaxis SysML v2 y visualización directa en Spec42 (los requisitos se exponen automáticamente en el diagrama de requisitos de `07_vistas.sysml`).
- **Límites de alcance**: No se introducen subsistemas nuevos ni componentes complejos; se mantiene el diseño ligero del triciclo.
