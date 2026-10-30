# Proposal: Eliminación del Token de GitHub y Simplificación Asistida de Tareas

## Why
El soporte opcional de Tokens de Acceso Personal (PAT) introdujo complejidad adicional en la interfaz (botones de ajustes, ventanas modales, advertencias de permisos y documentación técnica explicativa) que no resulta necesaria para los objetivos formativos del equipo. Dado que la lectura de las tareas compartidas a través de la API pública de GitHub Issues no requiere token alguno y la creación de tareas se puede realizar de forma asistida y transparente mediante URLs pre-rellenadas en GitHub, prescindir del token simplifica la experiencia de usuario a cero configuración: ningún compañero necesita generar claves secretas ni configurar nada para colaborar.

## What Changes
- **Eliminación del sistema de gestión de tokens**: Se eliminan las funciones de lectura, guardado y borrado de tokens PAT en el `localStorage` del navegador.
- **Eliminación de la interfaz de configuración de token**: Se retira de la sección de Tareas el botón de ajustes/estado de GitHub Issues y la ventana modal `#modal-sync-ajustes`.
- **Flujo de creación de tareas 100% asistido**: Al pulsar "Añadir Tarea", la aplicación abre directamente la interfaz oficial de GitHub con el título y la persona asignada completados para su publicación inmediata.
- **Eliminación de la guía de tokens**: Se eliminan físicamente `GUIA_TOKEN_GITHUB.md` y su réplica `docs/GUIA_TOKEN_GITHUB.md`, y se retira del catálogo de archivos del repositorio en `app.js`.
- **Mantenimiento de la sincronización remota universal**: La consulta automática de tareas mediante `GET https://api.github.com/repos/pprguez2005-byte/Coche-sysml-/issues` permanece intacta, garantizando que todos los miembros del equipo visualicen las mismas tareas en tiempo real desde cualquier ordenador.

## Capabilities

### Modified Capabilities
- `dashboard-seguimiento`: Modifica el requisito `Creación e interacción de tareas colaborativas` para eliminar la dependencia de tokens PAT y establecer el flujo de creación asistida directa sin credenciales locales.

## Impact
- **Archivos de interfaz**: `index.html`, `docs/index.html`, `styles.css`, `docs/styles.css`.
- **Lógica de aplicación**: `app.js`, `docs/app.js`.
- **Documentación**: Eliminación de `GUIA_TOKEN_GITHUB.md` y `docs/GUIA_TOKEN_GITHUB.md`.
- **Modelos SysML v2**: Ningún archivo en `Modelos/*.sysml` se ve afectado.
