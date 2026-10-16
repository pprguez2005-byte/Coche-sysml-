# Modularización en SysML v2

Estructura básica para dividir modelos en múltiples archivos:

- **definiciones.sysml**: Declara el paquete `DefinicionesSistema` que contiene las definiciones base (`part def`).
- **arquitectura.sysml**: Declara el paquete `ArquitecturaVehiculo` e importa el contenido del primer archivo mediante `import DefinicionesSistema::*;` para instanciar las partes.

### Reglas clave:
1. Los archivos deben coexistir dentro del mismo workspace/directorio de ejecución para que el resolvedor de nombres enlace los paquetes.
2. Los nombres de los paquetes raíz deben ser únicos.
