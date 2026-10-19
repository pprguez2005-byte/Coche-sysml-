# Tasks: Ampliación Incremental de Vistas y Requisitos en SysML v2 (Spec42)

## 1. Requisitos Didácticos en Subsistemas y Sistema

- [x] 1.1 Añadir `requirement def ReqMasaBateria` en `Modelos/02_bateria.sysml` con comentarios explicativos de `subject` y `require constraint`, y verificar que `spec42 check Modelos` no reporta errores.
- [x] 1.2 Añadir `requirement def ReqMasaMaximaTriciclo` y las relaciones `satisfy requirement` en `Modelos/06_triciclo.sysml` (importando los elementos necesarios), y verificar que `spec42 check Modelos` pasa con 0 errores.

## 2. Máquina de Estados Mínima del Triciclo

- [x] 2.1 Crear `Modelos/08_comportamiento.sysml` con el paquete `ComportamientoTriciclo`, los eventos (`Encender`, `IniciarMarcha`, `Detener`, `Apagar`), los 3 estados (`ModoApagado`, `ModoListo`, `ModoConduciendo`) y la máquina de estados `ModosTricicloStateMachine`, y verificar con `spec42 check Modelos` que valida sin errores ni advertencias.

## 3. Nuevas Vistas Gráficas en Spec42 y Documentación

- [x] 3.1 Actualizar `Modelos/07_vistas.sysml` para añadir el filtro estructural en `vistaEstructura`, la vista automática de requisitos (`vistaRequisitos : GeneralView` con `expose ...::*;` y `filter @SysML::...`) y la vista de estados (`vistaModosOperacion : StateTransitionView`), verificando con `spec42 diagram Modelos` que las 4 vistas se listan y se renderizan completas (`completeness: complete`).
- [x] 3.2 Actualizar `README.md` con una sección breve y didáctica explicando los nuevos archivos (`07_vistas.sysml`, `08_comportamiento.sysml`) y cómo funcionan el filtro automático de requisitos y la vista de estados en Spec42, verificando que los enlaces y nombres de archivos coinciden con `Modelos/`.

## Workflow follow-up

- Revisar en equipo los cambios con `git diff` y comprobar las 4 gráficas interactivas en el panel **Spec42: Open Diagram** de VS Code.
- Archivar el cambio en OpenSpec (`openspec archive`) cuando el equipo dé por completada la práctica.
