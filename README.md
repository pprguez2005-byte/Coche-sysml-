# Coche-sysml- — Proyecto de prueba de Robótica Industrial

Proyecto de práctica para aprender el flujo de trabajo del equipo (5 alumnos + profesor) antes de pasar a un proyecto más grande. Vamos a modelar un **coche** con **SysML v2**.

| Herramienta | Para qué la usamos | Dónde corre |
|---|---|---|
| **SysON** | Editor gráfico de modelos SysML v2 (diagramas, piezas, requisitos…) | En el PC de cada uno, con Docker |
| **Git + GitHub** | Guardar versiones del proyecto y juntar el trabajo de todos | Git en local, GitHub en la nube |
| **OpenSpec** | Que los agentes de IA de cada uno (Claude Code, Codex, Gemini, Antigravity…) trabajen siguiendo el mismo plan escrito | En local, dentro del repositorio |
| **Agentes de IA** | Ayudar a escribir el modelo `.sysml`, la documentación y las propuestas | En el PC de cada uno |

Repositorio: <https://github.com/pprguez2005-byte/Coche-sysml->

---

## Índice

1. [Cómo encaja todo (la idea general)](#1-cómo-encaja-todo-la-idea-general)
2. [Instalación (una sola vez por persona)](#2-instalación-una-sola-vez-por-persona)
3. [Git y GitHub](#3-git-y-github)
4. [SysON con Docker](#4-syson-con-docker)
5. [OpenSpec](#5-openspec)
6. [Agentes de IA](#6-agentes-de-ia)
7. [Flujo de trabajo completo con un ejemplo](#7-flujo-de-trabajo-completo-con-un-ejemplo)
8. [Estructura del repositorio](#8-estructura-del-repositorio)
9. [Normas del equipo](#9-normas-del-equipo)
10. [Problemas frecuentes](#10-problemas-frecuentes)
11. [Chuleta de comandos](#11-chuleta-de-comandos)

---

## 1. Cómo encaja todo (la idea general)

**La fuente de verdad del proyecto son los ficheros de texto del repositorio**, no la base de datos de SysON.

- SysON guarda los modelos en una base de datos dentro de Docker, en el PC de cada uno. Esa base de datos **no se comparte**: si yo dibujo algo en mi SysON, los demás no lo ven.
- Para compartir el modelo, se **exporta a texto SysML v2** (ficheros `.sysml`) y esos ficheros se suben a GitHub.
- Los compañeros bajan los `.sysml` de GitHub y los **importan** en su SysON.
- Los agentes de IA trabajan directamente sobre esos ficheros `.sysml` (son texto), siguiendo los planes que guarda **OpenSpec** en la carpeta `openspec/`.

```
         ┌──────────── GitHub (repositorio común) ────────────┐
         │   modelo/*.sysml     openspec/     docs/           │
         └──────▲───────────────────┬─────────────────────────┘
       git push │                   │ git pull
                │                   ▼
   ┌────────────┴─────── PC de cada alumno ─────────────────────┐
   │  carpeta del repo  ◄──── exportar .sysml ────  SysON       │
   │  (ficheros .sysml)  ───── importar .sysml ───►  (Docker)    │
   │        ▲                                                   │
   │        └── agente de IA (lee openspec/ y edita .sysml)      │
   └────────────────────────────────────────────────────────────┘
```

**Ejemplo:** Ana dibuja el subsistema de frenos en su SysON, lo exporta como `frenos.sysml`, lo guarda en `modelo/` y hace `git push`. Luis hace `git pull`, importa `frenos.sysml` en su SysON y ya ve los frenos.

**Por qué así:** si cada uno solo tuviera el modelo en su SysON, no habría forma de juntar el trabajo ni de ver qué cambió entre versiones. En texto, Git puede comparar línea a línea y GitHub muestra quién cambió qué.

---

## 2. Instalación (una sola vez por persona)

Instrucciones para **Windows**. Abre **PowerShell** para los comandos.

| Programa | Para qué | Cómo instalar | Comprobar |
|---|---|---|---|
| **Git** | Control de versiones | <https://git-scm.com/download/win> (opciones por defecto) | `git --version` |
| **Node.js 20.19 o superior** | Lo necesita OpenSpec y varios agentes | <https://nodejs.org> (versión LTS) | `node --version` |
| **Docker Desktop** | Ejecutar SysON | <https://www.docker.com/products/docker-desktop/> (activa WSL 2 si lo pide y reinicia) | `docker --version` |
| **OpenSpec** | Coordinar agentes | `npm install -g @fission-ai/openspec@latest` | `openspec --version` |
| **GitHub CLI** (opcional) | Crear Pull Requests desde la terminal | `winget install GitHub.cli` | `gh --version` |
| **VS Code** (recomendado) | Editar ficheros y ver los cambios de Git | <https://code.visualstudio.com> | — |

Además, cada uno instala **su** agente de IA (ver [sección 6](#6-agentes-de-ia)).

### Configurar Git la primera vez

```powershell
git config --global user.name "Nombre Apellido"
git config --global user.email "tu-correo-de-github@ejemplo.com"
git config --global core.autocrlf true      # evita líos de saltos de línea en Windows
git config --global init.defaultBranch main
```

**Por qué:** cada commit lleva tu nombre y correo. Si el correo coincide con el de tu cuenta de GitHub, tus commits aparecen asociados a tu perfil.

### Acceso al repositorio

El dueño del repositorio debe invitar a cada compañero: en GitHub, **Settings → Collaborators → Add people**. Cada uno acepta la invitación que le llega por correo.

### Clonar el repositorio

```powershell
cd "C:\ruta\donde\quieras\el\proyecto"
git clone https://github.com/pprguez2005-byte/Coche-sysml-.git
cd Coche-sysml-
```

La primera vez que hagas `git push`, Windows abrirá una ventana para iniciar sesión en GitHub (Git Credential Manager). Inicia sesión y queda guardado.

---

## 3. Git y GitHub

### Qué es cada cosa

- **Git**: programa que guarda "fotos" (commits) del proyecto. Cada commit es una versión a la que puedes volver.
- **GitHub**: la web donde está la copia común del repositorio. Desde ahí se revisan y aceptan los cambios.
- **Repositorio (repo)**: la carpeta del proyecto con todo su historial.
- **Commit**: una versión guardada, con un mensaje que explica qué se hizo.
- **Rama (branch)**: una línea de trabajo paralela. `main` es la rama principal; cada uno trabaja en su propia rama para no pisar a los demás.
- **Pull Request (PR)**: petición para juntar tu rama con `main`. Otro compañero la revisa antes de aceptarla.
- **Merge**: juntar una rama con otra.
- **Conflicto**: cuando dos personas cambian las mismas líneas de un fichero y Git no sabe cuál quedarse.

### Nuestro flujo: ramas + Pull Requests

Regla de oro: **nadie trabaja directamente en `main`**. `main` siempre debe contener un modelo que funciona.

```
main  ──●──────────────●──────────────●────────
         \            / (merge PR)   /
          ●──●──●────●              /
          rama: ana/frenos         /
                \                 /
                 ●──●──●─────────●
                 rama: luis/motor
```

### Comandos del día a día

| Comando | Para qué sirve |
|---|---|
| `git status` | Ver qué ficheros has cambiado y en qué rama estás. **Úsalo constantemente.** |
| `git switch main` | Ir a la rama `main` |
| `git pull` | Bajar los últimos cambios de GitHub a tu rama actual |
| `git switch -c ana/frenos` | Crear una rama nueva y moverte a ella |
| `git add modelo/frenos.sysml` | Marcar un fichero para el próximo commit (`git add .` marca todos) |
| `git commit -m "mensaje"` | Guardar una versión con los ficheros marcados |
| `git push -u origin ana/frenos` | Subir tu rama a GitHub la primera vez (después basta `git push`) |
| `git log --oneline --graph` | Ver el historial de commits |
| `git diff` | Ver exactamente qué líneas has cambiado (antes de hacer `add`) |
| `git diff --staged` | Ver lo que vas a meter en el commit (después de `add`) |
| `git restore fichero` | Descartar tus cambios en un fichero (¡no se puede deshacer!) |
| `git merge main` | Traer a tu rama lo nuevo de `main` |
| `git branch` | Listar ramas locales |
| `git branch -d ana/frenos` | Borrar una rama local ya integrada |

### Ciclo completo de una tarea

```powershell
# 1. Partir de main actualizado
git switch main
git pull

# 2. Crear tu rama (nombre: tu-nombre/tarea)
git switch -c ana/frenos

# 3. Trabajar... (SysON, agente de IA, editar ficheros)

# 4. Revisar y guardar
git status
git diff
git add modelo/frenos.sysml
git commit -m "Añade el subsistema de frenos al coche"

# 5. Subir la rama
git push -u origin ana/frenos

# 6. Abrir la Pull Request (web o terminal)
gh pr create --base main --title "Subsistema de frenos" --body "Qué hace y cómo probarlo"
```

Sin `gh`: entra en GitHub; aparecerá un aviso amarillo **"Compare & pull request"**. Púlsalo, escribe la descripción y crea la PR.

### Revisar y aceptar una PR

1. En GitHub, pestaña **Pull requests** → abre la PR.
2. Pestaña **Files changed**: mira los cambios línea a línea y comenta si algo no está claro.
3. Si está bien: **Review changes → Approve**.
4. El autor (o quien acordemos) pulsa **Merge pull request** y después **Delete branch**.
5. Todos los demás: `git switch main` y `git pull` para tener la versión nueva.

Con `gh`:

```powershell
gh pr list                 # PRs abiertas
gh pr checkout 3           # probar la PR número 3 en tu PC
gh pr review 3 --approve   # aprobarla
gh pr merge 3 --merge --delete-branch
```

### Mantener tu rama al día

Si `main` ha avanzado mientras trabajabas:

```powershell
git switch main
git pull
git switch ana/frenos
git merge main
```

### Resolver un conflicto

Git marca el fichero así:

```
<<<<<<< HEAD
    part motor : MotorElectrico;
=======
    part motor : MotorCombustion;
>>>>>>> main
```

- Lo de arriba (`HEAD`) es tu versión; lo de abajo, la que llega.
- Edita el fichero dejando la versión correcta y **borra las tres líneas de marcas** (`<<<<<<<`, `=======`, `>>>>>>>`).
- Después: `git add fichero`, `git commit`.

**Por qué ocurre y cómo evitarlo:** pasa cuando dos personas tocan las mismas líneas. Por eso cada uno trabaja en **su propio fichero `.sysml`** (ver [estructura](#8-estructura-del-repositorio)) y las ramas duran poco (uno o dos días).

### Buenos mensajes de commit

- Bien: `Añade requisito de autonomía mínima de 300 km`
- Mal: `cambios`, `asdf`, `arreglos varios`

Un commit = un cambio con sentido. El mensaje dice **qué** se hizo (y si no es obvio, **por qué**).

---

## 4. SysON con Docker

### Qué es

**SysON** es un editor web, libre (Eclipse), para crear modelos SysML v2 con diagramas. Se ejecuta como un servidor y se usa desde el navegador.

**Docker** permite ejecutar SysON sin instalarlo "a mano": descarga una imagen ya preparada y la arranca en un **contenedor** (una especie de mini‑ordenador aislado). SysON necesita dos contenedores:

- `app`: el propio SysON (la web).
- `database`: una base de datos PostgreSQL donde SysON guarda los modelos.

**Docker Compose** arranca los dos a la vez a partir de un fichero `docker-compose.yml`.

### ¿Por qué necesitamos Docker para hacer SysML?

**Para SysML en sí, no lo necesitamos.** SysML v2 es un **lenguaje** (como C o Python): un modelo es un fichero de texto `.sysml` que se puede escribir en el Bloc de notas, en VS Code o con un agente de IA, sin instalar nada.

Docker lo necesitamos para **SysON**, que es la herramienta que nos da los **diagramas** y el editor gráfico. SysON no es un programa que se instala con un `.exe`, sino una aplicación web formada por:

- un **servidor Java** (el propio SysON);
- una **base de datos PostgreSQL** donde guarda los modelos.

Tú solo ves el navegador (`localhost:8080`), pero detrás tienen que estar funcionando esos dos programas.

**Ejemplo:** sin Docker, cada uno tendría que instalar Java en la versión correcta, instalar y configurar PostgreSQL (usuario, contraseña, base de datos) y luego configurar SysON para que se conecte a ella. Con Docker, todo eso ya viene preparado en las imágenes, y `docker compose up -d` lo arranca en un solo paso.

**Por qué importa en un equipo:** si cada uno lo instalara a mano, acabaríamos con versiones distintas de Java, de PostgreSQL o de SysON, y con problemas del tipo "a mí me funciona y a ti no". Con Docker, los cinco ejecutamos exactamente lo mismo.

**Alternativas, si alguien no puede usar Docker** (por ejemplo, un portátil con poca RAM):

- **Trabajar solo en texto:** editar los `.sysml` en VS Code (hay extensiones de SysML v2 con resaltado y comprobación de sintaxis) o con su agente de IA. Lo malo es que no tiene diagramas; otro compañero puede importar su fichero en SysON para verlos.
- **Servidor compartido:** una persona ejecuta SysON en una máquina y los demás entran por el navegador. Nadie más instala nada, pero alguien tiene que mantener ese servidor encendido y al día.

### Fichero `syson/docker-compose.yml`

Este fichero está en el repositorio. Es el oficial de SysON (versión **v2026.9.0**) con un añadido: un **volumen** para que los modelos no se pierdan al apagar los contenedores.

```yaml
services:
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: username
      POSTGRES_PASSWORD: password
    volumes:
      - syson-db:/var/lib/postgresql/data   # añadido: los datos sobreviven a "down"
    networks:
      - syson
  app:
    image: "${IMAGE_TAG:-eclipsesyson/syson:v2026.9.0}"
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://database/postgres
      SPRING_DATASOURCE_USERNAME: username
      SPRING_DATASOURCE_PASSWORD: password
      SIRIUS_COMPONENTS_CORS_ALLOWEDORIGINPATTERNS: "*"
      SERVER_PORT: 8080
    depends_on:
      - database
    networks:
      - syson
networks:
  syson:
volumes:
  syson-db:
```

**Por qué fijamos la versión `v2026.9.0`:** si cada uno usara una versión distinta de SysON, un `.sysml` exportado por uno podría importarse distinto en el PC de otro. Todos con la misma versión → mismo comportamiento. Si queremos actualizar, se cambia aquí en una PR y todos a la vez.

**Por qué el volumen:** el fichero oficial no lo trae, así que con `docker compose down` se borraría la base de datos con todos tus proyectos de SysON. (Aun así, lo que importa de verdad es exportar a `.sysml` y subirlo a Git.)

### Comandos de Docker

Ejecutar dentro de la carpeta `syson/` del repo, con **Docker Desktop abierto**:

| Comando | Para qué sirve |
|---|---|
| `docker compose up -d` | Arrancar SysON en segundo plano. La primera vez descarga las imágenes (tarda unos minutos). |
| `docker compose ps` | Ver si los contenedores están en marcha |
| `docker compose logs -f app` | Ver los mensajes de SysON en directo (Ctrl+C para salir). Útil si no arranca. |
| `docker compose stop` | Pararlo sin borrar nada |
| `docker compose start` | Volver a arrancarlo después de `stop` |
| `docker compose down` | Parar y eliminar los contenedores (los datos se conservan gracias al volumen) |
| `docker compose down -v` | Eliminar también la base de datos. **Borra todos tus proyectos de SysON.** |
| `docker compose pull` | Descargar la imagen nueva tras cambiar la versión |

Cuando esté arrancado, abre **<http://localhost:8080>** en el navegador.

**Ejemplo:** llegas a clase, abres Docker Desktop, en PowerShell haces `cd syson` y `docker compose up -d`; esperas ~30 s y entras en `localhost:8080`. Al terminar, `docker compose stop`.

### Uso básico de SysON

1. En la página de inicio, **crea un proyecto** (por ejemplo `Coche`), con la plantilla de SysML v2.
2. En la vista **Explorer** (izquierda) aparecen los documentos y elementos del modelo.
3. Clic derecho sobre un elemento → **New object** para crear paquetes, `part def`, `part`, `requirement`, etc.
4. Clic derecho → **New representation** para crear diagramas (por ejemplo *General View*, *Interconnection View*).
5. En el diagrama, la paleta permite añadir elementos y relaciones arrastrando.
6. La vista **Details** (derecha) muestra y edita las propiedades del elemento seleccionado.

### Importar y exportar `.sysml` (lo más importante para el equipo)

**Exportar (SysON → repositorio):**

1. En **Explorer**, clic derecho sobre el **documento** (el nombre debe terminar en `.sysml`, por ejemplo `frenos.sysml`; si no, renómbralo).
2. **Download**. Se descarga el fichero de texto.
3. Muévelo a la carpeta `modelo/` del repositorio, sustituyendo el anterior.
4. `git diff` para comprobar que los cambios son los esperados.

**Importar (repositorio → SysON):**

1. En **Explorer**, pulsa el icono de **subir modelo** (upload model).
2. Elige el `.sysml` → **UPLOAD**.
3. Lee el mensaje: si dice *"partially created (X limitations)"*, algo no se ha podido importar; descarga el informe.
4. **Importa primero los ficheros de los que depende** (si `coche.sysml` usa definiciones de `frenos.sysml`, importa antes `frenos.sysml`).

**Pegar texto en un elemento:** clic derecho sobre un elemento → **New objects from text**, pega texto SysML v2 → **CREATE OBJECTS**. Útil para meter en SysON lo que haya escrito un agente de IA.

**Ojo:** según la propia documentación de SysON, la importación/exportación de texto **todavía no cubre todo SysML v2**. Por eso, antes de cada commit, revisad con `git diff` que no se ha perdido nada al pasar por SysON.

Documentación oficial: <https://doc.mbse-syson.org>

### Un ejemplo mínimo de SysML v2 (texto)

```sysml
package Coche {
    part def Vehiculo {
        attribute masa : Real;      // kg
        part motor : Motor;
        part ruedas : Rueda[4];
    }
    part def Motor {
        attribute potencia : Real;  // kW
    }
    part def Rueda;

    requirement def AutonomiaMinima {
        doc /* El coche debe recorrer al menos 300 km con una carga. */
    }
}
```

- `part def` define un **tipo** de pieza (como una clase). `part` es una pieza concreta de ese tipo dentro de otra.
- `Rueda[4]` indica **multiplicidad**: el vehículo tiene 4 ruedas.
- `requirement def` define un requisito.

---

## 5. OpenSpec

### Qué es y por qué lo usamos

Cada uno usa un agente de IA distinto. Sin coordinación, cada agente entiende la tarea a su manera y acaba haciendo cosas incompatibles.

**OpenSpec** resuelve esto con **documentos escritos en el repositorio** que todos los agentes leen:

- `openspec/specs/` → **cómo es el sistema ahora** (lo ya aceptado). Por ejemplo, `specs/frenos/spec.md` describe los requisitos del subsistema de frenos.
- `openspec/changes/` → **cambios propuestos o en curso**. Cada cambio es una carpeta con:
  - `proposal.md`: qué se quiere hacer y por qué.
  - `design.md`: cómo se va a hacer (decisiones técnicas).
  - `tasks.md`: lista de tareas con casillas `- [ ]` que el agente va marcando.
  - `specs/…`: los requisitos que se añaden o modifican (*delta specs*).
- `openspec/changes/archive/` → cambios ya terminados, como historial.

**Por qué funciona:** como el plan está en Git, cualquier agente (de cualquier compañero) puede leerlo y continuar el trabajo. Y en la PR se revisa primero el **plan** y luego el resultado.

### Ciclo de vida de un cambio

```
 1. Proponer          2. Revisar         3. Implementar       4. Archivar
 /opsx:propose  ───►  el equipo lee  ───► /opsx:apply   ───►  /opsx:archive
 crea proposal,       proposal y         el agente hace       mueve el cambio a
 design, tasks,       tasks (en la PR)   las tareas y las     archive/ y actualiza
 specs                                   marca [x]            openspec/specs/
```

### Inicializar OpenSpec en el repositorio (lo hace UNA persona, una vez)

```powershell
openspec init --tools claude,codex,gemini,antigravity --language es
git add .
git commit -m "Inicializa OpenSpec"
```

- `--tools` genera las instrucciones/comandos para cada agente que usamos (crea carpetas como `.claude/`, `.codex/`, `.gemini/`…).
- `--language es` hace que los documentos que genere estén en español.
- Si alguien usa otro agente, puede añadirlo después con `openspec init --tools <nombre>` (`openspec init --help` muestra la lista completa).

Los demás, tras hacer `git pull`, ya tienen la configuración. Si a tu agente no le aparecen los comandos `/opsx:…`, ejecuta `openspec update` en la carpeta del repo.

### Comandos de terminal de OpenSpec

| Comando | Para qué sirve |
|---|---|
| `openspec --version` | Ver la versión instalada |
| `openspec init` | Preparar OpenSpec en un repositorio |
| `openspec update` | Regenerar los ficheros de instrucciones de los agentes (tras actualizar OpenSpec) |
| `openspec list` | Ver los cambios activos |
| `openspec list --specs` | Ver las especificaciones existentes |
| `openspec list --archived` | Ver los cambios ya archivados |
| `openspec view` | Panel interactivo con specs y cambios |
| `openspec show <nombre>` | Mostrar un cambio o una spec |
| `openspec status --change <nombre>` | Ver qué documentos del cambio están hechos y cuáles faltan |
| `openspec validate <nombre>` | Comprobar que un cambio o spec tiene el formato correcto |
| `openspec validate --all` | Validar todo |
| `openspec new change <nombre>` | Crear la carpeta de un cambio vacío (normalmente lo hace el agente) |
| `openspec archive <nombre>` | Archivar un cambio terminado y actualizar las specs |
| `openspec <comando> --help` | Ayuda de cualquier comando |

Para actualizar OpenSpec: `npm install -g @fission-ai/openspec@latest` y luego `openspec update`.

### Comandos dentro del agente de IA (slash commands)

Se escriben en el chat del agente, no en PowerShell:

| Comando | Qué hace el agente |
|---|---|
| `/opsx:explore` | Pensar contigo una idea antes de comprometerse (no escribe código) |
| `/opsx:propose <descripción>` | Crear un cambio completo: proposal, design, tasks y specs |
| `/opsx:apply <nombre>` | Ejecutar las tareas de `tasks.md` una a una y marcarlas |
| `/opsx:update <nombre>` | Revisar el plan de un cambio cuando algo cambia |
| `/opsx:sync <nombre>` | Pasar las delta specs a `openspec/specs/` sin archivar |
| `/opsx:archive <nombre>` | Cerrar el cambio terminado |

> El nombre exacto puede variar un poco según el agente (por ejemplo `/opsx:propose` o `/opsx-propose`). Escribe `/` en tu agente y busca los que empiezan por `opsx`.

### Regla de coordinación: 1 cambio de OpenSpec = 1 rama = 1 PR

- El nombre del cambio y el de la rama coinciden: cambio `anadir-frenos` → rama `ana/anadir-frenos`.
- Antes de proponer algo, mira `openspec list` para no duplicar el trabajo de otro.
- Nadie modifica la carpeta `openspec/changes/<cambio>` de otro compañero sin avisar.

---

## 6. Agentes de IA

Cada uno usa el suyo; lo importante es que **todos se abren dentro de la carpeta del repositorio**, para que lean `openspec/` y los ficheros de instrucciones.

| Agente | Instalación | Cómo se abre |
|---|---|---|
| **Claude Code** | `npm install -g @anthropic-ai/claude-code` | `claude` |
| **Codex CLI** (OpenAI) | `npm install -g @openai/codex` | `codex` |
| **Gemini CLI** (Google) | `npm install -g @google/gemini-cli` | `gemini` |
| **Antigravity** (Google, `agy`) | Descargar desde la web oficial de Google Antigravity | `agy .` abre la carpeta actual |

Ejemplo:

```powershell
cd C:\ruta\Coche-sysml-
claude
```

### Buenas prácticas con los agentes

- **Lee siempre lo que propone** antes de aceptarlo. El responsable del commit eres tú, no la IA.
- Pídele que trabaje a través de OpenSpec (`/opsx:propose`, `/opsx:apply`) y no "a ojo".
- No dejes que haga `git push` ni merges a `main` por su cuenta.
- Si genera SysML, impórtalo en SysON para comprobar que es válido y se ve bien en los diagramas.
- Claude Code tiene además una *skill* de SysML v2 que ayuda con la sintaxis.

---

## 7. Flujo de trabajo completo con un ejemplo

**Tarea:** Ana tiene que añadir el subsistema de frenos.

```powershell
# 0. Arrancar SysON (si lo va a usar)
cd syson
docker compose up -d
cd ..

# 1. Partir de main actualizado y crear rama
git switch main
git pull
git switch -c ana/anadir-frenos
```

**2. Proponer con el agente** (en el chat del agente):

```
/opsx:propose Añadir el subsistema de frenos al coche: part def Freno con
atributos de fuerza máxima y tipo (disco/tambor), 4 frenos en el vehículo y
un requisito de distancia de frenado máxima de 40 m a 100 km/h.
```

El agente crea `openspec/changes/anadir-frenos/` con proposal, design, tasks y specs.

```powershell
# 3. Revisar el plan y subirlo para que el equipo lo vea
openspec validate anadir-frenos
git add openspec/
git commit -m "Propuesta: subsistema de frenos"
git push -u origin ana/anadir-frenos
gh pr create --draft --base main --title "Subsistema de frenos"
```

La PR en modo **borrador (draft)** permite que el equipo comente el plan antes de que se implemente.

**4. Implementar:** `/opsx:apply anadir-frenos`. El agente edita `modelo/frenos.sysml` y marca las tareas.

**5. Comprobar en SysON:** importa `modelo/frenos.sysml`, revisa los diagramas, ajusta lo que haga falta y, si cambias algo en SysON, **exporta de nuevo** y sustituye el fichero en `modelo/`.

```powershell
# 6. Guardar y subir
git diff
git add modelo/frenos.sysml openspec/
git commit -m "Implementa el subsistema de frenos"
git push
```

**7. Archivar** el cambio: `/opsx:archive anadir-frenos` (o `openspec archive anadir-frenos`), commit y push.

**8. PR lista:** en GitHub, **Ready for review**. Un compañero la revisa y aprueba, se hace merge y se borra la rama.

**9. Todos:** `git switch main` y `git pull`.

---

## 8. Estructura del repositorio

```
Coche-sysml-/
├── README.md               ← este documento
├── .gitignore
├── syson/
│   └── docker-compose.yml  ← SysON con versión fijada
├── modelo/                 ← modelo SysML v2 exportado (fuente de verdad)
│   ├── coche.sysml         ← nivel superior: ensambla los subsistemas
│   ├── motor.sysml
│   ├── frenos.sysml
│   ├── direccion.sysml
│   └── requisitos.sysml
├── docs/                   ← documentación, capturas de diagramas
├── openspec/
│   ├── specs/              ← cómo es el sistema ahora
│   └── changes/            ← cambios en curso (y archive/)
└── .claude/ .codex/ .gemini/ …  ← generados por openspec init
```

**Por qué un fichero por subsistema:** si los 5 editáramos un único `coche.sysml`, habría conflictos en casi cada PR. Con un fichero por subsistema y un responsable por fichero, cada uno trabaja en lo suyo y `coche.sysml` solo se toca para conectar las piezas.

`.gitignore` recomendado:

```
# Sistema / editores
.DS_Store
Thumbs.db
.vscode/
# Ficheros temporales
*.tmp
*.log
```

---

## 9. Normas del equipo

1. **Nunca** se hace commit directamente en `main`.
2. Antes de empezar: `git switch main` + `git pull`.
3. Ramas con el formato `nombre/tarea` (`ana/anadir-frenos`).
4. Toda PR la revisa al menos **otra persona** antes del merge.
5. Cada cambio importante pasa por OpenSpec (propose → apply → archive).
6. Lo que se hace en SysON no existe para el equipo hasta que se **exporta a `.sysml` y se sube**.
7. Todos usamos la versión de SysON fijada en `syson/docker-compose.yml`.
8. Revisar siempre `git diff` antes de `git commit`.
9. Ramas cortas: mejor varias PR pequeñas que una enorme.
10. Si algo se rompe, avisar en el grupo antes de intentar arreglarlo "a lo bruto".

---

## 10. Problemas frecuentes

| Problema | Solución |
|---|---|
| `docker: command not found` o error de conexión | Abre **Docker Desktop** y espera a que ponga "Engine running". |
| `localhost:8080` no carga | Espera un poco más; mira `docker compose logs -f app`. |
| `port is already allocated` | Otro programa usa el 8080. Cambia `"8080:8080"` por `"8081:8080"` en tu copia y entra en `localhost:8081` (no subas ese cambio). |
| He perdido mis proyectos de SysON | ¿Hiciste `down -v`? Vuelve a importar los `.sysml` desde el repo. |
| Import con *"partially created"* | Importa antes los ficheros de los que depende; si persiste, descarga el informe y revisa la sintaxis. |
| `git push` rechazado (*rejected… fetch first*) | Alguien subió antes: `git pull` y vuelve a hacer `git push`. |
| `Permission denied` al hacer push | No te han añadido como colaborador o no has aceptado la invitación. |
| He hecho commit en `main` sin querer (sin push) | `git switch -c nombre/tarea` (te llevas el commit a una rama nueva), luego `git switch main` y `git reset --hard origin/main`. |
| `openspec: command not found` | Reinstala con `npm install -g @fission-ai/openspec@latest` y abre una terminal nueva. |
| El agente no ve los comandos `/opsx:…` | Ejecuta `openspec update` en la carpeta del repo y reinicia el agente. |

---

## 11. Chuleta de comandos

```powershell
# ── Empezar el día ─────────────────────────────
git switch main ; git pull
cd syson ; docker compose up -d ; cd ..       # SysON en http://localhost:8080

# ── Nueva tarea ────────────────────────────────
git switch -c nombre/tarea
#   en el agente:  /opsx:propose ...  →  /opsx:apply tarea  →  /opsx:archive tarea

# ── Guardar y compartir ────────────────────────
git status ; git diff
git add . ; git commit -m "Qué he hecho"
git push -u origin nombre/tarea
gh pr create --base main

# ── OpenSpec ───────────────────────────────────
openspec list ; openspec list --specs ; openspec view
openspec show <cambio> ; openspec validate <cambio>

# ── Terminar el día ────────────────────────────
cd syson ; docker compose stop
```

---

### Enlaces

- SysON: <https://mbse-syson.org> · Documentación: <https://doc.mbse-syson.org> · Código: <https://github.com/eclipse-syson/syson>
- Importar/exportar texto en SysON: <https://doc.mbse-syson.org/syson/main/user-manual/features/import-export-textual.html>
- OpenSpec: <https://github.com/Fission-AI/OpenSpec>
- Git (libro gratuito en español): <https://git-scm.com/book/es/v2>
- Especificación SysML v2 (OMG): <https://www.omg.org/sysml/sysmlv2/>
