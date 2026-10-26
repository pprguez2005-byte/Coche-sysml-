# Spec Delta: dashboard-seguimiento

## ADDED Requirements

### Requirement: Compatibilidad de despliegue en raíz de GitHub Pages
El repositorio SHALL incluir en su raíz el archivo `index.html` y el marcador `.nojekyll` para que GitHub Pages sirva inmediatamente el panel de control web sin importar si en la configuración del repositorio se ha seleccionado la carpeta raíz (`/`) o la carpeta `/docs`.

#### Scenario: Acceso directo desde la raíz de GitHub Pages
- **WHEN** el usuario navega a la URL pública del repositorio en GitHub Pages
- **THEN** el sistema carga directamente la interfaz interactiva del panel de control en lugar de procesar y mostrar el documento README
