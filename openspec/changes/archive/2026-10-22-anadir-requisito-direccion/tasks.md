# Tasks

## 1. Modificación del Modelo SysML v2

- [x] 1.1 Añadir la definición formal del requisito `requirement def AnguloMaximoGiro` en `Modelos/04_direccion.sysml` con su bloque `doc /* ... */` acotando el ángulo a 35.0 grados y verificar visualmente que se encuentra dentro del paquete `SubsistemaDireccion`
- [x] 1.2 Comprobar la coherencia interna de `Modelos/04_direccion.sysml` verificando que el paquete contiene exactamente los 3 requisitos del subsistema (`RadioGiroMaximo`, `GeometriaAckermann` y `AnguloMaximoGiro`)

## 2. Validación de Sintaxis y Vistas

- [x] 2.1 Validar la sintaxis SysML v2 de los modelos en `Modelos/` comprobando que no existan errores de estructura, importación ni tipos
- [x] 2.2 Comprobar la proyección en Spec42 verificando que `vistaRequisitos` en `Modelos/07_vistas.sysml` recopila de forma automática el nuevo requisito `AnguloMaximoGiro`

## Workflow follow-up

- Ejecutar `/openspec-apply-change` para implementar las tareas planificadas.
- Ejecutar `/openspec-sync-specs` para consolidar las especificaciones en `openspec/specs/`.
- Ejecutar `/openspec-archive-change` para archivar el cambio una vez validado.
