# Tasks: Panel Web de Seguimiento

## 1. Estructura y Maquetación del Dashboard (`dashboard/`)

- [x] 1.1 Crear la estructura base en `dashboard/index.html` con maquetación moderna mediante Tailwind CSS, incluyendo encabezado del repositorio, indicadores globales (total commits, ramas activas, PRs), sección de integrantes y panel de detalle.
- [x] 1.2 Añadir estilos complementarios en `dashboard/styles.css` para el aspecto visual de las tarjetas de miembros, estados de actividad (en curso vs inactivo) y diseño de la línea temporal de commits.

## 2. Integración y Lógica Interactiva (`dashboard/app.js`)

- [x] 2.1 Implementar en `dashboard/app.js` la conexión con la API REST de GitHub para consultar colaboradores, ramas y commits del repositorio `pprguez2005-byte/Coche-sysml-`, incorporando almacenamiento en caché (`sessionStorage`).
- [x] 2.2 Implementar la interacción de selección de integrante: al hacer clic en un miembro, renderizar en el panel de detalle su última actividad (rama y fecha) y su historial de commits recientes.
- [x] 2.3 Configurar el mapeo de nombres de usuario de GitHub a los nombres reales y roles del equipo (Pelayo, José, Juan, Eloy, César) para facilitar la identificación de cada compañero.

## 3. Documentación y Verificación

- [x] 3.1 Redactar `dashboard/README.md` con la guía paso a paso para abrir el panel en local en cualquier navegador y las instrucciones para desplegarlo de forma gratuita en GitHub Pages.
- [x] 3.2 Validar el funcionamiento del panel cargando los datos reales del repositorio en el navegador y verificar que los modelos SysML v2 en `Modelos/` se mantienen íntegros y sin alteraciones.
