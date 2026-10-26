/**
 * Coche SysML v2 — Panel de Control
 * Diseño y Arquitectura inspirados en Apple Human Interface Guidelines
 */

const REPO_OWNER = "pprguez2005-byte";
const REPO_NAME = "Coche-sysml-";

// Lista canónica única de los 5 integrantes del equipo
const EQUIPO_CANONICO = [
  {
    id: "pelayo",
    loginPrincipal: "pprguez2005-byte",
    alias: ["pprguez2005-byte", "pprguez2005"],
    nombre: "Pelayo Rodríguez",
    rol: "Colaborador",
    avatar: "https://github.com/pprguez2005-byte.png",
    ramaPreferida: "Pelayo"
  },
  {
    id: "jose",
    loginPrincipal: "josescobedov",
    alias: ["josescobedov", "evjose", "jose", "josé"],
    nombre: "José",
    rol: "Colaborador",
    avatar: "https://github.com/josescobedov.png",
    ramaPreferida: "Jose"
  },
  {
    id: "juan",
    loginPrincipal: "juanuniovi",
    alias: ["juanuniovi", "juan"],
    nombre: "Juan",
    rol: "Profesor",
    avatar: "https://github.com/juanuniovi.png",
    ramaPreferida: "iacolab_jc"
  },
  {
    id: "eloy",
    loginPrincipal: "EloySuarezCostales",
    alias: ["eloysuarezcostales", "eloy suárez costales", "eloy suarez costales", "eloy"],
    nombre: "Eloy Suárez Costales",
    rol: "Colaborador",
    avatar: "https://github.com/EloySuarezCostales.png",
    ramaPreferida: "Eloy"
  },
  {
    id: "cesar",
    loginPrincipal: "cesarbobes",
    alias: ["cesarbobes", "cesar", "césar bobes", "cesar bobes"],
    nombre: "César Bobes",
    rol: "Colaborador",
    avatar: "https://github.com/cesarbobes.png",
    ramaPreferida: "cesar/readme-inicial"
  }
];

// Estructura jerárquica de carpetas del proyecto estilo Apple Finder
const CARPETAS_PROYECTO = [
  {
    id: "modelos",
    nombre: "Modelos",
    ruta: "Modelos/",
    descripcion: "Modelos modulares y vistas en lenguaje SysML v2",
    colorIcono: "bg-purple-100 text-purple-700",
    archivos: [
      { nombre: "00_tipos_base.sysml", path: "Modelos/00_tipos_base.sysml", desc: "Tipos base, magnitudes físicas y puertos comunes", autorId: "pelayo", tipo: "SysML v2" },
      { nombre: "01_chasis.sysml", path: "Modelos/01_chasis.sysml", desc: "Subsistema Chasis (bastidor y 6 puntos de anclaje)", autorId: "pelayo", tipo: "SysML v2" },
      { nombre: "02_bateria.sysml", path: "Modelos/02_bateria.sysml", desc: "Subsistema Batería, límite de masa y máquina de estados", autorId: "jose", tipo: "SysML v2" },
      { nombre: "03_powertrain.sysml", path: "Modelos/03_powertrain.sysml", desc: "Tren Motriz, motor eléctrico, inversor y refrigeración", autorId: "pelayo", tipo: "SysML v2" },
      { nombre: "04_direccion.sysml", path: "Modelos/04_direccion.sysml", desc: "Subsistema Dirección y cinemática de bieletas", autorId: "juan", tipo: "SysML v2" },
      { nombre: "05_rueda.sysml", path: "Modelos/05_rueda.sysml", desc: "Subsistema Rueda, buje y transmisión de par motriz", autorId: "eloy", tipo: "SysML v2" },
      { nombre: "06_triciclo.sysml", path: "Modelos/06_triciclo.sysml", desc: "Ensamblado Tadpole y restricción física de balance de masa", autorId: "pelayo", tipo: "SysML v2" },
      { nombre: "07_vistas.sysml", path: "Modelos/07_vistas.sysml", desc: "Definición de vistas gráficas para Spec42 (estructura y requisitos)", autorId: "cesar", tipo: "SysML v2" },
      { nombre: "08_comportamiento.sysml", path: "Modelos/08_comportamiento.sysml", desc: "Máquina de estados de modos operativos (Apagado, Listo, Conduciendo)", autorId: "eloy", tipo: "SysML v2" }
    ]
  },
  {
    id: "openspec",
    nombre: "openspec",
    ruta: "openspec/",
    descripcion: "Especificaciones del método y directrices de ingeniería",
    colorIcono: "bg-blue-100 text-blue-700",
    archivos: [
      { nombre: "specs/dashboard-seguimiento/spec.md", path: "openspec/specs/dashboard-seguimiento/spec.md", desc: "Especificación formal del panel de control web y tareas", autorId: "pelayo", tipo: "OpenSpec" },
      { nombre: "config.yaml", path: "openspec/config.yaml", desc: "Configuración global y reglas obligatorias de trabajo en equipo", autorId: "juan", tipo: "Config" },
      { nombre: "HISTORIAL_CONTEXTO.md", path: "openspec/HISTORIAL_CONTEXTO.md", desc: "Registro automatizado del crecimiento del contexto compartido", autorId: "cesar", tipo: "Docs" }
    ]
  },
  {
    id: "docs",
    nombre: "docs",
    ruta: "docs/",
    descripcion: "Código y recursos del portal web en GitHub Pages",
    colorIcono: "bg-emerald-100 text-emerald-700",
    archivos: [
      { nombre: "index.html", path: "docs/index.html", desc: "Estructura principal de la interfaz web Apple", autorId: "pelayo", tipo: "HTML" },
      { nombre: "styles.css", path: "docs/styles.css", desc: "Estilos visuales y componentes Apple HIG", autorId: "pelayo", tipo: "CSS" },
      { nombre: "app.js", path: "docs/app.js", desc: "Lógica de GitHub API, explorador de carpetas y tareas", autorId: "pelayo", tipo: "JavaScript" },
      { nombre: "README.md", path: "docs/README.md", desc: "Instrucciones de apertura y despliegue del panel", autorId: "cesar", tipo: "Markdown" }
    ]
  },
  {
    id: "raiz",
    nombre: "Raíz del Proyecto",
    ruta: "/",
    descripcion: "Documentación principal y normas para agentes",
    colorIcono: "bg-slate-200 text-slate-700",
    archivos: [
      { nombre: "README.md", path: "README.md", desc: "Memoria técnica del vehículo y arquitectura formal SysML v2", autorId: "cesar", tipo: "Markdown" },
      { nombre: "AGENTS.md", path: "AGENTS.md", desc: "Instrucciones y restricciones obligatorias para agentes de IA", autorId: "pelayo", tipo: "Docs" },
      { nombre: "FlujoDeTrabajoConOpenSpec.md", path: "FlujoDeTrabajoConOpenSpec.md", desc: "Guía didáctica del flujo de especificaciones y Git", autorId: "juan", tipo: "Docs" },
      { nombre: "GuiaInstalacionHerramientas.md", path: "GuiaInstalacionHerramientas.md", desc: "Manual de instalación de VS Code, Spec42 y SysON", autorId: "cesar", tipo: "Docs" }
    ]
  }
];

let estadoApp = {
  seccionActual: "panel",
  miembros: [],
  commits: [],
  ramas: [],
  pullRequests: [],
  tareas: [],
  filtroTareas: "todas",
  busquedaArchivo: "",
  carpetasAbiertas: new Set(["modelos", "openspec"]), // Por defecto abiertas
  cargando: true
};

document.addEventListener("DOMContentLoaded", () => {
  cargarTareasLocalStorage();
  configurarNavegacion();
  inicializarDatos();
  configurarEventosFinderYTareas();
});

// Manejo de rutas y Segmented Control
function configurarNavegacion() {
  window.addEventListener("hashchange", procesarRutaActual);

  document.getElementById("nav-btn-panel").addEventListener("click", () => {
    window.location.hash = "#/panel";
  });

  document.getElementById("nav-btn-archivos").addEventListener("click", () => {
    window.location.hash = "#/archivos";
  });

  document.getElementById("nav-btn-tareas").addEventListener("click", () => {
    window.location.hash = "#/tareas";
  });

  const btnVolver = document.getElementById("btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.location.hash = "#/panel";
    });
  }

  const btnRecargar = document.getElementById("btn-recargar");
  if (btnRecargar) {
    btnRecargar.addEventListener("click", () => {
      sessionStorage.clear();
      inicializarDatos();
    });
  }
}

function procesarRutaActual() {
  const hash = window.location.hash || "#/panel";

  document.querySelectorAll(".apple-segmented-control button").forEach(b => b.classList.remove("active"));

  if (hash.startsWith("#/miembro/")) {
    const idOMiembro = hash.replace("#/miembro/", "").trim();
    mostrarVistaMiembro(idOMiembro);
    document.getElementById("nav-btn-panel").classList.add("active");
  } else if (hash === "#/archivos") {
    mostrarSeccion("vista-archivos");
    document.getElementById("nav-btn-archivos").classList.add("active");
    renderizarArchivosFinder();
  } else if (hash === "#/tareas") {
    mostrarSeccion("vista-tareas");
    document.getElementById("nav-btn-tareas").classList.add("active");
    renderizarTareas();
  } else {
    mostrarSeccion("vista-general");
    document.getElementById("nav-btn-panel").classList.add("active");
  }
}

function mostrarSeccion(idSeccion) {
  const secciones = ["vista-general", "vista-miembro", "vista-archivos", "vista-tareas"];
  secciones.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    if (id === idSeccion) {
      el.classList.remove("view-hidden");
      el.classList.add("view-visible");
    } else {
      el.classList.remove("view-visible");
      el.classList.add("view-hidden");
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Carga de datos desde GitHub API con caché
async function inicializarDatos() {
  mostrarLoader(true);
  try {
    const [resColabs, resRamas, resCommits, resPRs] = await Promise.all([
      fetchConCache(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`),
      fetchConCache(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/branches`),
      fetchConCache(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?per_page=100`),
      fetchConCache(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/pulls?state=all`)
    ]);

    estadoApp.ramas = resRamas || [];
    estadoApp.commits = resCommits || [];
    estadoApp.pullRequests = resPRs || [];
    estadoApp.miembros = procesarIntegrantes(resColabs || [], estadoApp.commits, estadoApp.ramas);

    renderizarMetricas();
    renderizarGridMiembros();
    renderizarTimelineGlobal();
    renderizarArchivosFinder();
    renderizarTareas();

    procesarRutaActual();

  } catch (err) {
    console.warn("Aviso API GitHub, utilizando datos locales estructurados:", err);
    usarDatosLocales();
  } finally {
    mostrarLoader(false);
  }
}

async function fetchConCache(url) {
  const cacheKey = "cache_" + url;
  const expiracionKey = "exp_" + url;
  const guardado = sessionStorage.getItem(cacheKey);
  const expira = sessionStorage.getItem(expiracionKey);

  if (guardado && expira && Date.now() < parseInt(expira, 10)) {
    return JSON.parse(guardado);
  }

  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP error ${res.status}`);
  const data = await res.json();
  sessionStorage.setItem(cacheKey, JSON.stringify(data));
  sessionStorage.setItem(expiracionKey, (Date.now() + 5 * 60 * 1000).toString());
  return data;
}

function encontrarIntegrante(texto) {
  if (!texto) return null;
  const limpio = texto.toLowerCase().trim();
  return EQUIPO_CANONICO.find(m => 
    m.id === limpio || 
    m.loginPrincipal.toLowerCase() === limpio || 
    m.alias.some(a => a.toLowerCase() === limpio || limpio.includes(a.toLowerCase()))
  );
}

function procesarIntegrantes(colaboradores, commits, ramas) {
  const miembrosMap = new Map();
  EQUIPO_CANONICO.forEach(m => {
    miembrosMap.set(m.id, {
      id: m.id,
      login: m.loginPrincipal,
      nombre: m.nombre,
      rol: m.rol,
      avatar: m.avatar,
      totalCommits: 0,
      ramaActual: m.ramaPreferida,
      ultimoCommit: null,
      commits: []
    });
  });

  colaboradores.forEach(c => {
    const miembro = encontrarIntegrante(c.login);
    if (miembro) {
      const obj = miembrosMap.get(miembro.id);
      obj.totalCommits += (c.contributions || 0);
      if (c.avatar_url) obj.avatar = c.avatar_url;
    }
  });

  commits.forEach(item => {
    const loginAutor = item.author ? item.author.login : null;
    const nombreAutor = item.commit && item.commit.author ? item.commit.author.name : null;
    const emailAutor = item.commit && item.commit.author ? item.commit.author.email : null;

    const match = encontrarIntegrante(loginAutor) || 
                  encontrarIntegrante(nombreAutor) || 
                  encontrarIntegrante(emailAutor);

    if (match) {
      const obj = miembrosMap.get(match.id);
      const info = {
        sha: item.sha.substring(0, 7),
        mensaje: item.commit.message.split("\n")[0],
        fecha: new Date(item.commit.author.date),
        url: item.html_url
      };
      if (!obj.commits.some(c => c.sha === info.sha)) {
        obj.commits.push(info);
      }
      if (!obj.ultimoCommit || info.fecha > obj.ultimoCommit.fecha) {
        obj.ultimoCommit = info;
      }
    }
  });

  miembrosMap.forEach(obj => {
    if (obj.commits.length > 0) {
      obj.totalCommits = Math.max(obj.totalCommits, obj.commits.length);
    }
  });

  ramas.forEach(r => {
    const rName = r.name.toLowerCase();
    EQUIPO_CANONICO.forEach(m => {
      const obj = miembrosMap.get(m.id);
      if (m.alias.some(a => rName.includes(a.toLowerCase())) || rName.includes(m.ramaPreferida.toLowerCase())) {
        obj.ramaActual = r.name;
      }
    });
  });

  return Array.from(miembrosMap.values()).sort((a, b) => b.totalCommits - a.totalCommits);
}

function renderizarMetricas() {
  document.getElementById("stat-commits").textContent = estadoApp.commits.length || "30+";
  document.getElementById("stat-ramas").textContent = estadoApp.ramas.length || "8";
  document.getElementById("stat-miembros").textContent = estadoApp.miembros.length;
  document.getElementById("stat-prs").textContent = estadoApp.pullRequests.length || "6";
}

function renderizarGridMiembros() {
  const container = document.getElementById("grid-miembros");
  container.innerHTML = "";

  estadoApp.miembros.forEach(m => {
    const card = document.createElement("div");
    card.className = "apple-card apple-card-interactive p-5 flex flex-col justify-between";
    
    const fechaTexto = m.ultimoCommit 
      ? formatearFechaRelativa(m.ultimoCommit.fecha) 
      : "Sin commits en main";

    card.innerHTML = `
      <div>
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center space-x-3.5">
            <img src="${m.avatar}" alt="${m.nombre}" class="w-12 h-12 rounded-2xl border border-[#0000000d] object-cover bg-[#f5f5f7]" onerror="this.src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'">
            <div>
              <h3 class="font-semibold text-base text-[#1d1d1f] tracking-tight leading-snug">${m.nombre}</h3>
              <p class="text-xs text-[#86868b] font-mono">@${m.login}</p>
            </div>
          </div>
          <svg class="w-4 h-4 text-[#86868b] shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </div>

        <div class="mt-4">
          <span class="apple-pill ${m.rol === 'Profesor' ? 'bg-[#0071e30f] text-[#0071e3] border border-[#0071e31f] font-semibold' : 'bg-[#f5f5f7] text-[#1d1d1f]'} text-[11px] inline-block">
            ${m.rol}
          </span>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-[#0000000d] flex items-center justify-between text-xs">
        <span class="text-[#86868b] flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-[#34c759]"></span>
          Rama: <strong class="font-mono text-[#1d1d1f] font-medium">${m.ramaActual}</strong>
        </span>
        <span class="text-[#86868b]">${fechaTexto}</span>
      </div>
    `;

    card.addEventListener("click", () => {
      window.location.hash = `#/miembro/${m.id}`;
    });

    container.appendChild(card);
  });
}

function renderizarTimelineGlobal() {
  const container = document.getElementById("timeline-global");
  container.innerHTML = "";

  const recientes = estadoApp.commits.slice(0, 6);
  if (recientes.length === 0) {
    container.innerHTML = `<p class="p-6 text-xs text-[#86868b]">No hay commits recientes disponibles.</p>`;
    return;
  }

  recientes.forEach(c => {
    const row = document.createElement("div");
    row.className = "p-4 hover:bg-[#f5f5f7] transition flex items-center justify-between gap-4";
    
    const autorRaw = c.author ? c.author.login : (c.commit.author ? c.commit.author.name : "Autor");
    const miembro = encontrarIntegrante(autorRaw);
    const autorNombre = miembro ? miembro.nombre : autorRaw;
    const avatarUrl = miembro ? miembro.avatar : (c.author ? c.author.avatar_url : "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png");
    const fecha = new Date(c.commit.author.date);

    row.innerHTML = `
      <div class="flex items-center space-x-3 min-w-0">
        <img src="${avatarUrl}" alt="${autorNombre}" class="w-8 h-8 rounded-full border border-[#0000000d] object-cover bg-white shrink-0">
        <div class="min-w-0">
          <p class="text-xs font-semibold text-[#1d1d1f] truncate">${escapeHtml(c.commit.message.split("\n")[0])}</p>
          <p class="text-[11px] text-[#86868b] mt-0.5">
            Por <span class="font-medium text-[#1d1d1f]">${autorNombre}</span> • ${formatearFechaRelativa(fecha)}
          </p>
        </div>
      </div>
      <div class="shrink-0 flex items-center space-x-2">
        <span class="font-mono text-[11px] bg-[#f5f5f7] px-2 py-0.5 rounded text-[#86868b] border border-[#0000000d]">
          ${c.sha.substring(0, 7)}
        </span>
        <a href="${c.html_url}" target="_blank" rel="noopener noreferrer" class="text-xs text-[#0071e3] hover:underline font-medium">
          Ver
        </a>
      </div>
    `;

    container.appendChild(row);
  });
}

function mostrarVistaMiembro(idOMiembro) {
  const miembro = estadoApp.miembros.find(m => 
    m.id === idOMiembro || 
    m.login.toLowerCase() === idOMiembro.toLowerCase()
  );

  if (!miembro) {
    window.location.hash = "#/panel";
    return;
  }

  mostrarSeccion("vista-miembro");

  document.getElementById("perfil-avatar").src = miembro.avatar;
  document.getElementById("perfil-nombre").textContent = miembro.nombre;
  const badgeRol = document.getElementById("perfil-rol");
  badgeRol.textContent = miembro.rol;
  badgeRol.className = miembro.rol === "Profesor" 
    ? "apple-pill bg-[#0071e30f] text-[#0071e3] border border-[#0071e31f] font-semibold"
    : "apple-pill bg-[#f5f5f7] text-[#1d1d1f] border border-[#0000000d]";
  document.getElementById("perfil-github").textContent = `@${miembro.login}`;
  document.getElementById("perfil-commits").textContent = miembro.commits.length;
  document.getElementById("perfil-rama-pill").textContent = miembro.ramaActual;

  const contEnCurso = document.getElementById("perfil-en-curso");
  if (miembro.ultimoCommit) {
    contEnCurso.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div class="flex items-center space-x-2">
          <span class="text-xs font-medium text-[#86868b]">Rama activa:</span>
          <span class="font-mono text-xs font-semibold text-[#0071e3] bg-[#0071e30f] px-2.5 py-0.5 rounded-md border border-[#0071e31a]">
            ${miembro.ramaActual}
          </span>
        </div>
        <span class="text-xs text-[#86868b]">${formatearFechaRelativa(miembro.ultimoCommit.fecha)}</span>
      </div>

      <div class="bg-[#f5f5f7] border border-[#0000000d] rounded-xl p-4 mt-2">
        <p class="text-sm font-medium text-[#1d1d1f] leading-relaxed">
          ${escapeHtml(miembro.ultimoCommit.mensaje)}
        </p>
        <div class="mt-3 flex items-center justify-between text-xs text-[#86868b]">
          <span class="font-mono font-medium">${miembro.ultimoCommit.sha}</span>
          <a href="${miembro.ultimoCommit.url}" target="_blank" rel="noopener noreferrer" class="text-[#0071e3] hover:underline font-medium inline-flex items-center">
            Ver cambios en GitHub →
          </a>
        </div>
      </div>
    `;
  } else {
    contEnCurso.innerHTML = `
      <p class="text-xs text-[#86868b] italic">
        Aún no se registran commits consolidados en main por parte de este integrante. Su trabajo actual se encuentra en la rama <strong class="font-mono text-[#1d1d1f]">${miembro.ramaActual}</strong>.
      </p>
    `;
  }

  const contHistorial = document.getElementById("perfil-historial");
  if (miembro.commits.length > 0) {
    contHistorial.innerHTML = miembro.commits.map(c => `
      <div class="p-4 hover:bg-[#f5f5f7] transition flex items-center justify-between gap-4">
        <div class="min-w-0">
          <p class="text-xs font-medium text-[#1d1d1f] truncate">${escapeHtml(c.mensaje)}</p>
          <p class="text-[11px] text-[#86868b] mt-0.5">${formatearFechaRelativa(c.fecha)}</p>
        </div>
        <div class="shrink-0 flex items-center space-x-2">
          <span class="font-mono text-[11px] bg-[#f5f5f7] px-2 py-0.5 rounded text-[#86868b] border border-[#0000000d]">
            ${c.sha}
          </span>
          <a href="${c.url}" target="_blank" rel="noopener noreferrer" class="text-xs text-[#0071e3] hover:underline font-medium">
            Ver
          </a>
        </div>
      </div>
    `).join("");
  } else {
    contHistorial.innerHTML = `<div class="p-6 text-center text-xs text-[#86868b]">Sin historial de commits en la rama principal.</div>`;
  }
}

// ====================================================================
// SECCIÓN 3: EXPLORADOR DE ARCHIVOS POR CARPETAS (FINDER DE APPLE)
// ====================================================================
function renderizarArchivosFinder() {
  const container = document.getElementById("contenedor-carpetas-finder");
  if (!container) return;
  container.innerHTML = "";

  const query = (estadoApp.busquedaArchivo || "").toLowerCase();

  CARPETAS_PROYECTO.forEach(carpeta => {
    // Filtrar archivos según búsqueda
    const archivosFiltrados = carpeta.archivos.filter(item => {
      if (!query) return true;
      const autor = EQUIPO_CANONICO.find(m => m.id === item.autorId);
      return item.nombre.toLowerCase().includes(query) ||
             item.desc.toLowerCase().includes(query) ||
             item.path.toLowerCase().includes(query) ||
             (autor && autor.nombre.toLowerCase().includes(query));
    });

    // Si hay búsqueda y hay coincidencia, auto-abrir la carpeta
    if (query && archivosFiltrados.length > 0) {
      estadoApp.carpetasAbiertas.add(carpeta.id);
    }

    // Si hay búsqueda y no hay coincidencias en esta carpeta, omitirla
    if (query && archivosFiltrados.length === 0) {
      return;
    }

    const estaAbierta = estadoApp.carpetasAbiertas.has(carpeta.id);

    // Tarjeta contenedora de la carpeta
    const folderCard = document.createElement("div");
    folderCard.className = `apple-card overflow-hidden finder-folder ${estaAbierta ? 'open' : ''}`;

    // Cabecera de la carpeta (clicable)
    const header = document.createElement("div");
    header.className = "finder-folder-header p-4 sm:p-5 flex items-center justify-between";
    header.innerHTML = `
      <div class="flex items-center space-x-3.5 min-w-0">
        <!-- Chevron animado -->
        <svg class="finder-chevron w-4 h-4 text-[#86868b] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
        </svg>

        <!-- Icono de Carpeta macOS -->
        <div class="w-10 h-10 rounded-xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center font-bold text-lg shrink-0">
          📁
        </div>

        <div class="min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-semibold text-base text-[#1d1d1f] font-mono tracking-tight">${carpeta.ruta}</h3>
            <span class="apple-pill bg-[#0000000a] text-[#86868b] text-[11px] py-0.5 px-2">
              ${archivosFiltrados.length} ${archivosFiltrados.length === 1 ? 'archivo' : 'archivos'}
            </span>
          </div>
          <p class="text-xs text-[#86868b] mt-0.5 truncate">${carpeta.descripcion}</p>
        </div>
      </div>

      <span class="text-xs text-[#0071e3] font-medium hidden sm:inline shrink-0">
        ${estaAbierta ? 'Ocultar archivos' : 'Mostrar archivos'}
      </span>
    `;

    // Evento para abrir/cerrar carpeta
    header.addEventListener("click", () => {
      if (estadoApp.carpetasAbiertas.has(carpeta.id)) {
        estadoApp.carpetasAbiertas.delete(carpeta.id);
      } else {
        estadoApp.carpetasAbiertas.add(carpeta.id);
      }
      renderizarArchivosFinder();
    });

    folderCard.appendChild(header);

    // Contenedor de archivos interiores
    const filesContainer = document.createElement("div");
    filesContainer.className = "finder-files-container border-t border-[#0000000d] bg-[#fafafc] divide-y divide-[#00000008]";

    archivosFiltrados.forEach(file => {
      const autor = EQUIPO_CANONICO.find(m => m.id === file.autorId) || EQUIPO_CANONICO[0];
      const row = document.createElement("div");
      row.className = "p-3.5 sm:px-6 hover:bg-white transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 pl-8 sm:pl-16";

      const tipoBadge = file.tipo === "SysML v2" 
        ? "bg-purple-100 text-purple-700 font-semibold" 
        : (file.tipo === "OpenSpec" ? "bg-blue-100 text-blue-700 font-semibold" : "bg-slate-200 text-slate-700");

      row.innerHTML = `
        <div class="flex items-start sm:items-center space-x-3 min-w-0">
          <!-- Icono de documento -->
          <div class="w-7 h-7 rounded-lg bg-white border border-[#00000014] text-[#86868b] flex items-center justify-center font-mono text-[10px] font-bold shrink-0 shadow-2xs">
            📄
          </div>

          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs font-semibold text-[#1d1d1f] truncate">${file.nombre}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded ${tipoBadge}">${file.tipo}</span>
            </div>
            <p class="text-xs text-[#86868b] mt-0.5 truncate">${file.desc}</p>
          </div>
        </div>

        <div class="flex items-center justify-between sm:justify-end space-x-4 shrink-0 pl-10 sm:pl-0">
          <!-- Autoría -->
          <div class="flex items-center space-x-2 bg-white px-2.5 py-1 rounded-full border border-[#0000000d] shadow-2xs">
            <img src="${autor.avatar}" alt="${autor.nombre}" class="w-4 h-4 rounded-full object-cover">
            <span class="text-xs font-medium text-[#1d1d1f]">${autor.nombre.split(" ")[0]}</span>
            <span class="text-[10px] text-[#86868b]">• ${autor.rol}</span>
          </div>

          <a href="https://github.com/${REPO_OWNER}/${REPO_NAME}/blob/main/${file.path}" target="_blank" rel="noopener noreferrer" class="text-xs text-[#0071e3] hover:underline font-medium inline-flex items-center gap-1 shrink-0">
            Ver código
            <svg class="w-3 h-3 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      `;

      filesContainer.appendChild(row);
    });

    folderCard.appendChild(filesContainer);
    container.appendChild(folderCard);
  });

  if (container.children.length === 0) {
    container.innerHTML = `
      <div class="apple-card p-12 text-center text-xs text-[#86868b]">
        No se encontraron archivos ni carpetas que coincidan con "<strong>${escapeHtml(estadoApp.busquedaArchivo)}</strong>".
      </div>
    `;
  }
}

// ====================================================================
// SECCIÓN 4: GESTOR DE TAREAS (TO-DO / RECORDATORIOS APPLE)
// ====================================================================
function cargarTareasLocalStorage() {
  const guardado = localStorage.getItem("sysml_tareas_equipo");
  if (guardado) {
    try {
      estadoApp.tareas = JSON.parse(guardado);
      return;
    } catch (e) {
      console.warn("Error leyendo tareas locales:", e);
    }
  }

  // Tareas didácticas iniciales
  estadoApp.tareas = [
    {
      id: "t1",
      texto: "Verificar vista gráfica de estados de batería en Spec42",
      miembroId: "jose",
      categoria: "Vistas",
      completada: true,
      fecha: "25 Oct"
    },
    {
      id: "t2",
      texto: "Modelar requisitos cinemáticos del subsistema de dirección",
      miembroId: "juan",
      categoria: "Requisitos",
      completada: false,
      fecha: "26 Oct"
    },
    {
      id: "t3",
      texto: "Comprobar balance de masa total en 06_triciclo.sysml",
      miembroId: "pelayo",
      categoria: "Modelado",
      completada: false,
      fecha: "26 Oct"
    },
    {
      id: "t4",
      texto: "Revisar transiciones de los modos operativos en 08_comportamiento.sysml",
      miembroId: "eloy",
      categoria: "Modelado",
      completada: false,
      fecha: "26 Oct"
    },
    {
      id: "t5",
      texto: "Documentar flujo de trabajo Git y OpenSpec en el README",
      miembroId: "cesar",
      categoria: "Documentación",
      completada: true,
      fecha: "24 Oct"
    }
  ];
  guardarTareasLocalStorage();
}

function guardarTareasLocalStorage() {
  localStorage.setItem("sysml_tareas_equipo", JSON.stringify(estadoApp.tareas));
}

function renderizarTareas() {
  const container = document.getElementById("lista-tareas-contenedor");
  if (!container) return;
  container.innerHTML = "";

  const filtradas = estadoApp.tareas.filter(t => {
    if (estadoApp.filtroTareas === "pendientes") return !t.completada;
    if (estadoApp.filtroTareas === "completadas") return t.completada;
    return true;
  });

  const total = estadoApp.tareas.length;
  const pendientes = estadoApp.tareas.filter(t => !t.completada).length;
  const completadas = estadoApp.tareas.filter(t => t.completada).length;

  document.getElementById("filtro-tarea-todas").textContent = `Todas (${total})`;
  document.getElementById("filtro-tarea-pendientes").textContent = `Pendientes (${pendientes})`;
  document.getElementById("filtro-tarea-completadas").textContent = `Completadas (${completadas})`;

  if (filtradas.length === 0) {
    container.innerHTML = `
      <div class="p-10 text-center text-xs text-[#86868b]">
        No hay tareas en esta sección. Añade una nueva tarea arriba.
      </div>
    `;
    return;
  }

  filtradas.forEach(tarea => {
    const miembro = EQUIPO_CANONICO.find(m => m.id === tarea.miembroId) || EQUIPO_CANONICO[0];
    const row = document.createElement("div");
    row.className = "p-4 hover:bg-[#f5f5f7] transition flex items-center justify-between gap-3 group";

    row.innerHTML = `
      <div class="flex items-center space-x-3.5 min-w-0">
        <button class="apple-checkbox ${tarea.completada ? 'checked' : ''}" data-id="${tarea.id}">
          <svg fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path>
          </svg>
        </button>

        <div class="min-w-0">
          <p class="text-sm font-medium ${tarea.completada ? 'line-through text-[#86868b]' : 'text-[#1d1d1f]'} leading-tight truncate">
            ${escapeHtml(tarea.texto)}
          </p>
          <div class="flex items-center gap-2 mt-1">
            <span class="text-[11px] px-2 py-0.2 rounded-full bg-[#00000008] text-[#86868b] font-medium">
              ${tarea.categoria}
            </span>
            <span class="text-[11px] text-[#86868b]">${tarea.fecha || "Hoy"}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-3 shrink-0">
        <div class="flex items-center space-x-1.5 bg-[#f5f5f7] px-2.5 py-1 rounded-full border border-[#0000000d]">
          <img src="${miembro.avatar}" alt="${miembro.nombre}" class="w-4 h-4 rounded-full object-cover">
          <span class="text-xs font-medium text-[#1d1d1f]">${miembro.nombre.split(" ")[0]}</span>
        </div>

        <button class="btn-eliminar-tarea text-[#86868b] hover:text-red-500 p-1 opacity-40 group-hover:opacity-100 transition" data-id="${tarea.id}" title="Eliminar tarea">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    `;

    row.querySelector(".apple-checkbox").addEventListener("click", () => {
      tarea.completada = !tarea.completada;
      guardarTareasLocalStorage();
      renderizarTareas();
    });

    row.querySelector(".btn-eliminar-tarea").addEventListener("click", () => {
      estadoApp.tareas = estadoApp.tareas.filter(t => t.id !== tarea.id);
      guardarTareasLocalStorage();
      renderizarTareas();
    });

    container.appendChild(row);
  });
}

function configurarEventosFinderYTareas() {
  // Botones de Expandir y Colapsar todo
  const btnExpandir = document.getElementById("btn-expandir-carpetas");
  if (btnExpandir) {
    btnExpandir.addEventListener("click", () => {
      CARPETAS_PROYECTO.forEach(c => estadoApp.carpetasAbiertas.add(c.id));
      renderizarArchivosFinder();
    });
  }

  const btnColapsar = document.getElementById("btn-colapsar-carpetas");
  if (btnColapsar) {
    btnColapsar.addEventListener("click", () => {
      estadoApp.carpetasAbiertas.clear();
      renderizarArchivosFinder();
    });
  }

  // Buscador predictivo en el explorador
  const inputBusqueda = document.getElementById("busqueda-archivos");
  if (inputBusqueda) {
    inputBusqueda.addEventListener("input", (e) => {
      estadoApp.busquedaArchivo = e.target.value.trim();
      renderizarArchivosFinder();
    });
  }

  // Filtros de estado de tareas
  const botonesTareas = [
    { id: "filtro-tarea-todas", valor: "todas" },
    { id: "filtro-tarea-pendientes", valor: "pendientes" },
    { id: "filtro-tarea-completadas", valor: "completadas" }
  ];

  botonesTareas.forEach(item => {
    const btn = document.getElementById(item.id);
    if (!btn) return;
    btn.addEventListener("click", () => {
      botonesTareas.forEach(b => {
        const el = document.getElementById(b.id);
        el.className = "px-3 py-1 rounded-lg text-[#86868b] hover:text-[#1d1d1f] transition";
      });
      btn.className = "px-3 py-1 rounded-lg bg-white shadow-sm font-semibold text-[#1d1d1f] transition";
      estadoApp.filtroTareas = item.valor;
      renderizarTareas();
    });
  });

  // Formulario de nueva tarea
  const formTarea = document.getElementById("form-nueva-tarea");
  if (formTarea) {
    formTarea.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputTexto = document.getElementById("input-tarea-texto");
      const selectMiembro = document.getElementById("select-tarea-miembro");
      const selectCategoria = document.getElementById("select-tarea-categoria");

      const texto = inputTexto.value.trim();
      if (!texto) return;

      const nuevaTarea = {
        id: "t_" + Date.now(),
        texto: texto,
        miembroId: selectMiembro.value,
        categoria: selectCategoria.value,
        completada: false,
        fecha: "Hoy"
      };

      estadoApp.tareas.unshift(nuevaTarea);
      guardarTareasLocalStorage();
      inputTexto.value = "";
      renderizarTareas();
    });
  }
}

// Fallback con datos locales estructurados si no hay conexión
function usarDatosLocales() {
  estadoApp.ramas = [
    { name: "main" }, { name: "Pelayo" }, { name: "Jose" }, { name: "Eloy" }, 
    { name: "anadir-requisito-direccion" }, { name: "requisitos-bateria" }, { name: "iacolab_jc" }
  ];
  estadoApp.commits = [
    { sha: "8296bc12345", author: { login: "pprguez2005-byte" }, commit: { message: "Pruebas para mejorar las vistas", author: { date: "2026-10-25T19:30:00Z" } }, html_url: "https://github.com/pprguez2005-byte/Coche-sysml-/commit/8296bc1" },
    { sha: "2da2a2a1234", author: { login: "pprguez2005-byte" }, commit: { message: "Merge pull request #6 from pprguez2005-byte/requisitos-bateria", author: { date: "2026-10-25T18:00:00Z" } }, html_url: "https://github.com/pprguez2005-byte/Coche-sysml-/commit/2da2a2a" },
    { sha: "54920471234", author: { login: "josescobedov" }, commit: { message: "Nuevos requisitos para la batería", author: { date: "2026-10-25T17:45:00Z" } }, html_url: "https://github.com/pprguez2005-byte/Coche-sysml-/commit/5492047" },
    { sha: "4814ce31234", author: { login: "juanuniovi" }, commit: { message: "Direccion requisitos", author: { date: "2026-10-25T16:20:00Z" } }, html_url: "https://github.com/pprguez2005-byte/Coche-sysml-/commit/4814ce3" },
    { sha: "f4ae23d1234", author: { login: "EloySuarezCostales" }, commit: { message: "chore(openspec): archivar cambio estados-bateria y sincronizar specs", author: { date: "2026-10-24T14:10:00Z" } }, html_url: "https://github.com/pprguez2005-byte/Coche-sysml-/commit/f4ae23d" },
    { sha: "509e1811234", author: { login: "cesarbobes" }, commit: { message: "docs: añadir guía de flujo Git+OpenSpec en README", author: { date: "2026-10-23T11:00:00Z" } }, html_url: "https://github.com/pprguez2005-byte/Coche-sysml-/commit/509e181" }
  ];
  estadoApp.pullRequests = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

  estadoApp.miembros = procesarIntegrantes([
    { login: "pprguez2005-byte", contributions: 12, avatar_url: "https://github.com/pprguez2005-byte.png" },
    { login: "josescobedov", contributions: 10, avatar_url: "https://github.com/josescobedov.png" },
    { login: "EloySuarezCostales", contributions: 4, avatar_url: "https://github.com/EloySuarezCostales.png" },
    { login: "cesarbobes", contributions: 2, avatar_url: "https://github.com/cesarbobes.png" },
    { login: "juanuniovi", contributions: 1, avatar_url: "https://github.com/juanuniovi.png" }
  ], estadoApp.commits, estadoApp.ramas);

  renderizarMetricas();
  renderizarGridMiembros();
  renderizarTimelineGlobal();
  renderizarArchivosFinder();
  renderizarTareas();
  procesarRutaActual();
}

function mostrarLoader(activo) {
  const loader = document.getElementById("loader");
  if (loader) loader.classList.toggle("hidden", !activo);
}

function formatearFechaRelativa(fecha) {
  const diffSegundos = Math.floor((Date.now() - new Date(fecha).getTime()) / 1000);
  if (diffSegundos < 60) return "Hace un momento";
  if (diffSegundos < 3600) return `Hace ${Math.floor(diffSegundos / 60)} min`;
  if (diffSegundos < 86400) return `Hace ${Math.floor(diffSegundos / 3600)} h`;
  const dias = Math.floor(diffSegundos / 86400);
  return dias === 1 ? "Ayer" : `Hace ${dias} días`;
}

function escapeHtml(texto) {
  if (!texto) return "";
  return texto.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
