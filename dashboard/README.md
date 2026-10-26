# Panel de Seguimiento del Equipo (Coche SysML v2)

Este panel web permite monitorizar en tiempo real el avance del proyecto, consultar las ramas activas y ver el trabajo tanto actual como histórico de cada integrante del equipo.

---

## 🚀 Cómo abrir la previsualización en local

No necesitas instalar Node.js ni ningún servidor web. Puedes abrirlo directamente:

1. Ve a la carpeta `dashboard/` en el explorador de archivos.
2. Haz **doble clic** sobre [`index.html`](index.html) para abrirlo en tu navegador favorito (Chrome, Edge, Firefox, etc.).
3. ¡Listo! La web se conectará automáticamente con la API pública de GitHub para cargar los datos del repositorio:
   - Contribuidores reales.
   - Historial de commits.
   - Ramas de trabajo activas.

> **Nota sobre el límite de GitHub**: GitHub permite hasta 60 peticiones/hora sin autenticación. La web incorpora una caché interna de 5 minutos y datos de demostración automáticos por si en algún momento se alcanza el límite. Si lo deseas, puedes añadir un Personal Access Token (PAT) haciendo clic en el botón *"Token"* del encabezado.

---

## 🌐 Cómo publicarlo gratis en GitHub Pages (para todo el equipo)

Para que cualquier compañero o el profesor pueda abrir la web desde su móvil o PC sin descargar nada:

1. Ve a tu repositorio en GitHub: `https://github.com/pprguez2005-byte/Coche-sysml-`
2. Haz clic en la pestaña **Settings** (Ajustes).
3. En el menú lateral izquierdo, haz clic en **Pages**.
4. En **Build and deployment** > **Source**:
   - Selecciona **Deploy from a branch**.
   - Branch: `main` (o `dashboard-seguimiento`).
   - Carpeta: selecciona `/dashboard` (o `/ (root)` si mueves los archivos a la raíz o a `/docs`).
5. Pulsa en **Save**. En un par de minutos tendrás tu enlace web público listo (ej. `https://pprguez2005-byte.github.io/Coche-sysml-/dashboard/`).
