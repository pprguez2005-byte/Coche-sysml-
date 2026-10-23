# Tasks

## 1. Atributos nuevos en `BatterySystem`

- [x] 1.1 Añadir `attribute autonomia : Real;` (con comentario `// horas`) y `attribute temperaturaMaxima : Temperature;` (con comentario `// grados C`) dentro de `part def BatterySystem` en `Modelos/02_bateria.sysml`; verificar que quedan debajo de `mass` y que no se ha tocado ningún puerto

## 2. Requisitos con restricción numérica

- [x] 2.1 Añadir `requirement def ReqAutonomiaBateria` debajo de `ReqMasaBateria`, con `subject`, `doc` y `require constraint { bateria.autonomia >= 2.0 }`; verificar que el nombre del atributo coincide con el de la tarea 1.1
- [x] 2.2 Añadir `requirement def ReqTemperaturaMaximaBateria` con `subject`, `doc` y `require constraint { bateria.temperaturaMaxima <= 60.0 }`; verificar que el valor está en °C

## 3. Requisitos textuales

- [x] 3.1 Añadir `requirement def ReqProteccionFuegoBateria` con `subject` y `doc` sobre la carcasa ignífuga; verificar que no tiene `require constraint`
- [x] 3.2 Añadir `requirement def ReqVidaUtilBateria` con `subject` y `doc` indicando el mínimo de 500 ciclos; verificar que el paquete tiene ahora 5 requisitos (`ReqMasaBateria` + los 4 nuevos)

## 4. Validación de sintaxis y vistas

- [x] 4.1 Validar la sintaxis SysML v2 de `Modelos/` y comprobar que no hay errores de estructura, importación, tipos ni referencias (`bateria.autonomia`, `bateria.temperaturaMaxima`)
- [x] 4.2 Abrir `vistaRequisitos` en Spec42 y comprobar que aparecen los 4 requisitos nuevos de la batería sin haber editado `Modelos/07_vistas.sysml`
- [x] 4.3 Revisar con `git diff` que el único archivo de `Modelos/` modificado es `02_bateria.sysml`

## Workflow follow-up

- Ejecutar `/opsx-apply` para implementar estas tareas.
- Ejecutar `/opsx-archive` para pasar la especificación a `openspec/specs/` y archivar el cambio.
- Hacer commit en la rama `requisitos-bateria` y abrir un Pull Request hacia `main`.
