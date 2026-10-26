# Guía de Uso: beautify_spec42.py

Utilidad para mejorar la estética, nitidez y tamaño de fuentes de los diagramas SVG exportados con **Spec42** (SysML v2) sin romper ni desalinear las conexiones entre bloques.

---

## 1. Uso Rápido (El más habitual)

Abre la terminal en esta carpeta (`Vistas graficas`) y ejecuta:

```bash
python3 beautify_spec42.py vistaConexiones.svg
```

* **Resultado:** Creará un nuevo archivo llamado `vistaConexiones_pro.svg`.
* **Qué hace por defecto:**
  * Duplica el tamaño de todas las fuentes ($\times 2.0$) con un tamaño mínimo de 16px.
  * Cambia la tipografía por fuentes nítidas del sistema (`system-ui`, `Inter`, `Roboto`).
  * Refuerza el grosor de las líneas y flechas ($\times 1.5$) para equilibrarlas con el nuevo tamaño de texto.
  * Redondea suavemente las esquinas de los bloques (`rx="8px"`).
  * Conserva los colores originales de tu diagrama.

---

## 2. Ajustes Frecuentes

### Aumentar aún más las fuentes (ej. para presentaciones)
Si necesitas textos todavía más grandes para que se lean desde lejos:
```bash
python3 beautify_spec42.py vistaConexiones.svg --font-scale 2.5 --min-font 18
```

### Tema Oscuro Táctico (Estilo UGV / CDTI)
Aplica fondo oscuro (`#0f172a`), cajas en azul marino y conectores celestes (`#38bdf8`):
```bash
python3 beautify_spec42.py vistaConexiones.svg --theme dark
```

### Tema Claro Editorial (Para imprimir o memorias en PDF)
Aplica fondo blanco puro (`#ffffff`), cajas limpias con borde azul y texto de alto contraste:
```bash
python3 beautify_spec42.py vistaConexiones.svg --theme light
```

### Elegir el nombre del archivo de salida
Si quieres darle un nombre específico en lugar del sufijo `_pro`:
```bash
python3 beautify_spec42.py vistaConexiones.svg -o mi_diagrama_final.svg
```

---

## 3. Tabla Resumen de Parámetros

| Parámetro | Valor por defecto | ¿Qué hace? |
| :--- | :---: | :--- |
| `--font-scale` | `2.0` | Multiplica el tamaño de todas las fuentes (ej. `2.5` = $2.5\times$). |
| `--min-font` | `16.0` | Tamaño mínimo de letra en píxeles (ningún texto será menor a este valor). |
| `--line-scale` | `1.5` | Multiplica el grosor de las líneas y conectores. |
| `--min-line` | `2.2` | Grosor mínimo de línea en píxeles. |
| `--radius` | `8.0` | Radio de esquinas redondeadas en las cajas (en px). |
| `--theme` | `keep` | Opciones: `keep` (colores originales), `dark` (táctico oscuro), `light` (blanco impresión). |
| `-o` | `_pro.svg` | Nombre o ruta del archivo generado. |

---

> **Tip:** Puedes volver a exportar tantas veces como quieras desde Spec42; con solo volver a lanzar el script sobre el nuevo SVG tendrás el diagrama con acabado profesional al instante y sin trabajo manual.
