# Design: Arquitectura del Panel Web de Seguimiento

## Context
Véase `proposal.md` para la motivación y el alcance general. El proyecto está alojado de forma pública en GitHub bajo la organización/usuario `pprguez2005-byte/Coche-sysml-`. La solución debe ser inmediatamente utilizable por cualquier miembro del equipo sin necesidad de instalar entornos de desarrollo web complejos (sin `npm`, `node` ni bases de datos locales).

## Goals / Non-Goals

**Goals:**
- Desarrollar una aplicación web estática (SPA) en una carpeta dedicada `dashboard/` utilizable tanto abriendo localmente el archivo `index.html` en el navegador como desplegándola en GitHub Pages.
- Conectar con la API REST de GitHub (v3) para extraer automáticamente:
  - Contribuidores / Integrantes (`/contributors`).
  - Ramas activas (`/branches`).
  - Commits recientes del repositorio y por autor (`/commits`).
  - Pull Requests abiertas y cerradas (`/pulls?state=all`).
- Presentar una interfaz interactiva donde al hacer clic en un integrante se filtren y resuman sus aportaciones y su última rama de trabajo.
- Incluir un mapeo configurable que asocie nombres de usuario de GitHub con los nombres reales del equipo escolar/universitario.

**Non-Goals:**
- No requiere backend propio, autenticación de usuarios por contraseña ni base de datos SQL/NoSQL.
- No modifica archivos de modelado SysML v2 en `Modelos/`.
- No requiere claves API privadas obligatorias (la API pública de GitHub permite hasta 60 consultas/hora sin autenticación).

## Decisions

### Decisión 1: Arquitectura estática (HTML5 + Vanilla JavaScript + Tailwind CSS vía CDN)
- **Razón**: Permite máxima portabilidad y simplicidad didáctica. Cualquier estudiante puede abrir el archivo con doble clic o inspeccionar el código sin lidiar con empaquetadores como Webpack o Vite.
- **Alternativas consideradas**:
  - *React / Vue / Vite*: Aportan reactividad pero introducen dependencias de `node_modules` pesadas y pasos de build innecesarios para esta PoC.
  - *Script en Python (Streamlit)*: Requiere que cada compañero tenga Python y dependencias instaladas localmente para ver la web.

### Decisión 2: Consulta directa a GitHub REST API con caché en `sessionStorage`
- **Razón**: Los datos reflejan el estado real del repositorio al momento. Se implementa un pequeño sistema de caché en `sessionStorage` para no agotar la cuota de 60 peticiones/hora que GitHub ofrece a clientes anónimos.
- **Alternativas consideradas**:
  - *GitHub Actions que genere un JSON*: Muy potente pero requiere configurar workflows y commits automáticos. Se deja planteado como evolución futura si el equipo lo necesita.

### Decisión 3: Mapeo de identidad de miembros
- **Razón**: En Git los nombres de usuario (`evjose`, `juanuniovi`, `pprguez2005-byte`, etc.) no siempre indican claramente quién es cada persona. Un objeto de configuración en `app.js` asociará cada usuario con su nombre real, rol en el proyecto y foto de perfil si no la tiene en GitHub.

## Risks / Trade-offs

- **[Límite de peticiones de la API pública (60 req/hora por IP)]** → *Mitigación*: Se cachean las respuestas en el navegador durante la sesión y se añade un campo opcional para introducir un Personal Access Token (PAT) de GitHub si un usuario necesita consultar exhaustivamente.
- **[Ramas de Git nombradas de forma no estándar]** → *Mitigación*: El script analiza tanto el autor del commit como el nombre de las ramas (ej. `remotes/origin/Pelayo`, `remotes/origin/Jose`, `remotes/origin/Eloy`) para identificar en qué rama está trabajando cada uno.
