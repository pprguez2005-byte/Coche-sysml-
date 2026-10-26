/**
 * Coche SysML v2 — Panel de Control
 * Diseño y Arquitectura inspirados en Apple Human Interface Guidelines
 */

const REPO_OWNER = "pprguez2005-byte";
const REPO_NAME = "Coche-sysml-";

// Lista canónica única de los 5 integrantes del equipo (sin duplicados)
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

let estadoApp = {
  miembros: [],
  commits: [],
  ramas: [],
  pullRequests: [],
  cargando: true
};

document.addEventListener("DOMContentLoaded", () => {
  configurarNavegacion();
  inicializarDatos();
});

// Manejo de rutas con Hash para soportar navegación limpia y botón "Atrás" del navegador
function configurarNavegacion() {
  window.addEventListener("hashchange", procesarRutaActual);

  const btnVolver = document.getElementById("btn-volver");
  if (btnVolver) {
    btnVolver.addEventListener("click", () => {
      window.location.hash = "#/";
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
  const hash = window.location.hash || "#/";
  if (hash.startsWith("#/miembro/")) {
    const idOMiembro = hash.replace("#/miembro/", "").trim();
    mostrarVistaMiembro(idOMiembro);
  } else {
    mostrarVistaGeneral();
  }
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

    // Redirigir según el hash en URL
    procesarRutaActual();

  } catch (err) {
    console.warn("Aviso de conexión API, utilizando datos locales estructurados:", err);
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

// Función unificadora: busca a cuál de los 5 integrantes corresponde cualquier alias o login
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
  // Inicializamos exactamente los 5 miembros canónicos
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

  // 1. Mapear contribuciones desde la API de colaboradores
  colaboradores.forEach(c => {
    const miembro = encontrarIntegrante(c.login);
    if (miembro) {
      const obj = miembrosMap.get(miembro.id);
      obj.totalCommits += (c.contributions || 0);
      if (c.avatar_url) obj.avatar = c.avatar_url;
    }
  });

  // 2. Asignar commits a cada integrante unificado
  commits.forEach(item => {
    const loginAutor = item.author ? item.author.login : null;
    const nombreAutor = item.commit && item.commit.author ? item.commit.author.name : null;
    const emailAutor = item.commit && item.commit.author ? item.commit.author.email : null;

    // Resolver a cuál de los 5 pertenece
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
      
      // Evitar duplicados de commits si ya existe
      if (!obj.commits.some(c => c.sha === info.sha)) {
        obj.commits.push(info);
      }

      if (!obj.ultimoCommit || info.fecha > obj.ultimoCommit.fecha) {
        obj.ultimoCommit = info;
      }
    }
  });

  // Ajustar conteo de commits a la cantidad real de commits detectados
  miembrosMap.forEach(obj => {
    if (obj.commits.length > 0) {
      obj.totalCommits = Math.max(obj.totalCommits, obj.commits.length);
    }
  });

  // 3. Inferir la rama activa actual
  ramas.forEach(r => {
    const rName = r.name.toLowerCase();
    EQUIPO_CANONICO.forEach(m => {
      const obj = miembrosMap.get(m.id);
      if (m.alias.some(a => rName.includes(a.toLowerCase())) || rName.includes(m.ramaPreferida.toLowerCase())) {
        obj.ramaActual = r.name;
      }
    });
  });

  // Devolver exactamente la lista de los 5 miembros ordenada por actividad
  return Array.from(miembrosMap.values()).sort((a, b) => b.totalCommits - a.totalCommits);
}

// Renderizado de las Métricas Globales
function renderizarMetricas() {
  document.getElementById("stat-commits").textContent = estadoApp.commits.length || "30+";
  document.getElementById("stat-ramas").textContent = estadoApp.ramas.length || "8";
  document.getElementById("stat-miembros").textContent = estadoApp.miembros.length;
  document.getElementById("stat-prs").textContent = estadoApp.pullRequests.length || "6";
}

// Renderizado de la cuadrícula de miembros (Dashboard General)
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

// Renderizado de la actividad reciente global
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

// Control de Vistas (General vs Miembro Propio)
function mostrarVistaGeneral() {
  const vGeneral = document.getElementById("vista-general");
  const vMiembro = document.getElementById("vista-miembro");
  
  vMiembro.classList.remove("view-visible");
  vMiembro.classList.add("view-hidden");

  vGeneral.classList.remove("view-hidden");
  vGeneral.classList.add("view-visible");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarVistaMiembro(idOMiembro) {
  const miembro = estadoApp.miembros.find(m => 
    m.id === idOMiembro || 
    m.login.toLowerCase() === idOMiembro.toLowerCase()
  );

  if (!miembro) {
    mostrarVistaGeneral();
    return;
  }

  const vGeneral = document.getElementById("vista-general");
  const vMiembro = document.getElementById("vista-miembro");

  // Rellenar cabecera de perfil
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

  // Renderizar: "¿Qué está haciendo ahora?"
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

  // Renderizar: Historial de aportaciones
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

  // Intercambiar visibilidad
  vGeneral.classList.remove("view-visible");
  vGeneral.classList.add("view-hidden");

  vMiembro.classList.remove("view-hidden");
  vMiembro.classList.add("view-visible");

  window.scrollTo({ top: 0, behavior: "smooth" });
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
