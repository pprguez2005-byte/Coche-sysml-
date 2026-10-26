# Spec Delta: dashboard-seguimiento

## MODIFIED Requirements

### Requirement: Explorador visual de archivos y autoría
El sistema SHALL proporcionar un explorador jerárquico por carpetas (estilo Finder / explorador de escritorio) donde el usuario pueda abrir o colapsar carpetas del proyecto (`Modelos/`, `openspec/`, `docs/`, raíz), inspeccionar los archivos dentro de cada una e identificar el miembro del equipo responsable de su modificación con enlace directo al repositorio.

#### Scenario: Visualización del listado de archivos del repositorio
- **WHEN** el usuario selecciona la pestaña de Archivos en la navegación
- **THEN** el sistema presenta el árbol o lista de archivos del proyecto mostrando la ruta, autor atribuido y última fecha de edición

#### Scenario: Visualización y apertura de carpetas en el explorador
- **WHEN** el usuario pulsa sobre una carpeta en el explorador
- **THEN** la carpeta se despliega mostrando sus archivos internos con iconos, nombre, autor atribuido y descripción técnica
