# Tasks: descripcion-sysml-rueda

## 1. Estructura y Visión General del Subsistema

- [x] 1.1 Crear el archivo `Modelos/05_rueda_descripcion.md` con la introducción pedagógica al paquete `SubsistemaRueda`, detallando las importaciones de tipos base y la motivación física de separar llanta y neumático, verificando que el archivo existe y renderiza correctamente en Markdown.
- [x] 1.2 Redactar la sección de Descomposición Estructural (BDD), explicando las definiciones `part def Rim`, `part def Tire` y el ensamblado `part def Wheel` con sus atributos dimensionales y de masa, incluyendo un diagrama Mermaid representativo y verificando su correspondencia con `Modelos/05_rueda.sysml`.

## 2. Restricciones Paramétricas e Interfaces

- [x] 2.1 Redactar la sección de Modelado Paramétrico, explicando el propósito y la sintaxis de las cláusulas `assert constraint` (`calculateTirePressure`, `wheelMassBalance` y `propagateParams`), verificando que las fórmulas matemáticas coincidan fielmente con el código de `05_rueda.sysml`.
- [x] 2.2 Redactar la sección de Puertos e Interconexiones (IBD), detallando los puertos `MechanicalPort` internos y externos y las sentencias `connect`, incluyendo un diagrama Mermaid de flujo de conexiones y verificando la compatibilidad de montaje descrita para el triciclo.

## 3. Revisión y Verificación Integral

- [x] 3.1 Realizar una lectura de revisión pedagógica completa de `Modelos/05_rueda_descripcion.md` contrastando contra cada escenario de `specs/descripcion-subsistema-rueda/spec.md`, comprobando que no se modificó ningún archivo `.sysml` del proyecto y validando el cambio con `openspec validate`.
