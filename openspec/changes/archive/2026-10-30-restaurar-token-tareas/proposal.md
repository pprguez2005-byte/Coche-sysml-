# Proposal: Restauración del Token de GitHub y Creación de Guía de Uso

## Why
El alojamiento estático en GitHub Pages no permite a los navegadores clientes realizar peticiones de escritura (`POST /issues`) a la API de GitHub sin autenticación. Al retirar el token, los navegadores bloquean las ventanas emergentes o los usuarios no completan la confirmación manual en GitHub, provocando que las tareas no se publiquen en el repositorio ni se compartan con los compañeros. Para solucionar esto y permitir la publicación y cierre automático de tareas en 1 solo clic directamente desde la interfaz web, es indispensable reactivar el soporte de Token de Acceso Personal (PAT) de GitHub y proporcionar una guía didáctica paso a paso para que cualquier integrante del equipo pueda generarlo y utilizarlo con total facilidad.

## What Changes
- **Reactivación del almacenamiento local de Token PAT**: Se restaura la lectura, guardado y borrado seguro de tokens en el `localStorage` del navegador.
- **Creación directa de tareas en GitHub (1 solo clic)**: Al introducir una tarea y pulsar "Añadir Tarea", la web envía la petición autenticada directamente a la API de GitHub (`POST /repos/pprguez2005-byte/Coche-sysml-/issues`), publicando la tarea al instante para todos los miembros del equipo.
- **Conmutación remota de estado de tareas**: Al marcar el checkbox de una tarea, se envía una petición `PATCH` a la API de GitHub para cerrar o reabrir el Issue correspondiente.
- **Ventana modal y botón de ajustes**: Se reincorpora el botón de configuración de sincronización y el modal `#modal-sync-ajustes` con diseño Apple, permitiendo introducir, comprobar o eliminar el token en cualquier momento.
- **Documento didáctico `GUIA_TOKEN_GITHUB.md`**: Se redacta una guía completa y accesible en la raíz y en `docs/` que explica qué es el token, por qué se necesita en GitHub Pages, cómo generarlo en 1 minuto con los permisos mínimos necesarios y cómo garantizar su privacidad.

## Capabilities

### Modified Capabilities
- `dashboard-seguimiento`: Modifica el requisito `Creación e interacción de tareas colaborativas` para reactivar la publicación directa autenticada mediante Token de Acceso Personal (PAT) con soporte asistido como alternativa.

## Impact
- **Archivos de interfaz**: `index.html`, `docs/index.html`, `styles.css`, `docs/styles.css`.
- **Lógica de aplicación**: `app.js`, `docs/app.js`.
- **Documentación**: Creación de `GUIA_TOKEN_GITHUB.md` y `docs/GUIA_TOKEN_GITHUB.md`, y registro en el catálogo de archivos explorables.
- **Modelos SysML v2**: Ningún archivo en `Modelos/*.sysml` se ve afectado.
