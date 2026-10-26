# Tasks

## 1. Actualizar el requisito de autonomía a 1 hora

- [x] 1.1 En `Modelos/02_bateria.sysml`, actualizar `requirement def ReqAutonomiaBateria` cambiando su bloque `doc` a 1 hora y su restricción a `require constraint { bateria.autonomia >= 1.0 }`; verificar que `subject bateria : BatterySystem;` permanece sin cambios

## 2. Incluir la batería comprada (con temperatura convertida a °C) y sus relaciones `satisfy`

- [x] 2.1 En `Modelos/02_bateria.sysml`, añadir `part bateriaComprada : BatterySystem` con su `doc`, la redefinición `attribute :>> autonomia = 1.0;` y la redefinición `attribute :>> temperaturaMaxima = 16.85;` (290 K convertidos a °C); verificar que el valor está en grados centígrados cumpliendo la regla del proyecto
- [x] 2.2 En `Modelos/02_bateria.sysml`, añadir debajo de `bateriaComprada` las relaciones `satisfy requirement : ReqAutonomiaBateria by bateriaComprada;` y `satisfy requirement : ReqTemperaturaMaximaBateria by bateriaComprada;`; verificar que los nombres de los requisitos y de la parte coinciden exactamente

## 3. Validación de sintaxis e integración en vistas

- [x] 3.1 Validar la sintaxis SysML v2 de `Modelos/` y comprobar que no existen errores de tipos, redefinición (`:>>`) ni referencias en `02_bateria.sysml`
- [x] 3.2 Abrir `vistaRequisitos` en Spec42 y verificar que se muestran tanto el requisito `ReqAutonomiaBateria` actualizado (`>= 1.0`) como las relaciones `satisfy` de `bateriaComprada`, y que `git diff` confirma que solo se ha modificado `Modelos/02_bateria.sysml`

## Workflow follow-up

- Ejecutar `/opsx-apply` (o pedir aplicar el cambio) para implementar estas tareas en `Modelos/02_bateria.sysml`.
- Ejecutar `/opsx-archive` para sincronizar la especificación en `openspec/specs/` y archivar el cambio.
- Hacer commit en la rama `feat/bateria-autonomia-1h` y abrir un Pull Request hacia `main`.
