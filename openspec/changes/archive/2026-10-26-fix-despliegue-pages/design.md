# Design: Compatibilidad Universal de Despliegue en GitHub Pages

## Context
Véase `proposal.md` para la motivación. Actualmente, GitHub Pages está sirviendo el `README.md` porque la opción por defecto en repositorios es la rama `main` en la carpeta `/ (root)`. Si en la raíz no existe un `index.html`, GitHub asume que debe convertir el `README.md` a HTML con su motor Jekyll.

## Goals / Non-Goals

**Goals:**
- Asegurar que la web del panel de control cargue siempre a la primera, independientemente de si el usuario ha seleccionado `/ (root)` o `/docs` en la configuración de GitHub Pages.
- Eliminar la interferencia del compilador Jekyll mediante el archivo `.nojekyll`.
- Mantener la experiencia completa tipo Apple desarrollada para el equipo.

**Non-Goals:**
- No requiere modificar ningún archivo de modelado SysML v2 en `Modelos/`.
- No requiere dependencias externas de compilación.

## Decisions

### Decisión 1: Sincronización de archivos web en la raíz (`/`) y en `/docs`
- **Razón**: Si `index.html`, `app.js` y `styles.css` están en la raíz, GitHub Pages los encuentra inmediatamente bajo la configuración estándar `/ (root)` sin obligar a cambiar a `/docs` ni arriesgarse a fallos de configuración.
- **Alternativas consideradas**:
  - *Depender exclusivamente del cambio manual en GitHub Settings*: Puede fallar si el usuario no pulsa "Save", si la interfaz de GitHub no refresca, o si otro colaborador restablece los ajustes.

### Decisión 2: Añadir `.nojekyll` en la raíz
- **Razón**: Indica a GitHub Pages que sirva los archivos HTML/CSS/JS puros directamente sin procesarlos a través de Jekyll.

## Risks / Trade-offs
- **[Archivos adicionales en la raíz del repo]** → *Mitigación*: Solo son 3 archivos livianos (`index.html`, `app.js`, `styles.css`) y un archivo vacío `.nojekyll`. El repositorio se mantiene ordenado y libre de carpetas temporales.
