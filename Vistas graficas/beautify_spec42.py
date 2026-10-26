#!/usr/bin/env python3
"""
beautify_spec42.py - Optimizador y embellecedor de SVGs exportados desde Spec42 / SysML v2.

Aumenta drásticamente el tamaño y legibilidad de las fuentes, redondea esquinas,
refuerza conectores y permite aplicar temas de color (oscuro/táctico o claro/editorial).
"""

import argparse
import os
import re
import sys
import xml.etree.ElementTree as ET

# Registrar namespaces SVG comunes para evitar prefijos feos como ns0:
NAMESPACES = {
    '': 'http://www.w3.org/2000/svg',
    'xlink': 'http://www.w3.org/1999/xlink',
    'xhtml': 'http://www.w3.org/1999/xhtml',
}
for prefix, uri in NAMESPACES.items():
    ET.register_namespace(prefix, uri)


def scale_css_dimension(css_str: str, property_name: str, scale: float, min_val: float = 0.0) -> str:
    """Escala un valor dentro de un string de estilo CSS (ej: font-size: 11px;)."""
    pattern = rf'({property_name}\s*:\s*)([0-9]*\.?[0-9]+)(px|pt|em|rem)?'

    def replacer(match):
        prefix = match.group(1)
        val = float(match.group(2))
        unit = match.group(3) or 'px'
        new_val = max(val * scale, min_val)
        return f"{prefix}{new_val:.1f}{unit}"

    return re.sub(pattern, replacer, css_str, flags=re.IGNORECASE)


def beautify_svg(
    input_path: str,
    output_path: str,
    font_scale: float = 1.8,
    min_font_size: float = 14.0,
    line_scale: float = 1.4,
    min_line_width: float = 2.0,
    corner_radius: float = 8.0,
    theme: str = 'keep',
    font_family: str = "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    add_shadow: bool = False
):
    if not os.path.exists(input_path):
        raise FileNotFoundError(f"No existe el archivo de entrada: {input_path}")

    # Leemos el archivo en texto crudo primero
    with open(input_path, 'r', encoding='utf-8', errors='ignore') as f:
        raw_content = f.read()

    if not raw_content.strip():
        raise ValueError(f"El archivo {input_path} está vacío (0 bytes).")

    # 1. Ajustes mediante expresiones regulares en bloques <style> y atributos en línea
    # Esto garantiza compatibilidad tanto si Spec42 usa <foreignObject> con HTML como SVG puro.

    # Escalar font-size en estilos
    def scale_font_match(m):
        val = float(m.group(2))
        unit = m.group(3) or 'px'
        new_val = max(val * font_scale, min_font_size)
        return f"{m.group(1)}{new_val:.1f}{unit}"

    # Reemplazar font-size en CSS y estilos en línea
    raw_content = re.sub(
        r'(font-size\s*:\s*)([0-9]*\.?[0-9]+)(px|pt|em|rem)?',
        scale_font_match,
        raw_content,
        flags=re.IGNORECASE
    )

    # Reemplazar font-size="12" como atributo XML directo
    def scale_font_attr(m):
        val = float(m.group(2))
        unit = m.group(3) or ''
        new_val = max(val * font_scale, min_font_size)
        return f'{m.group(1)}"{new_val:.1f}{unit}"'

    raw_content = re.sub(
        r'(font-size\s*=\s*)(["\'])([0-9]*\.?[0-9]+)(px|pt)?\2',
        lambda m: f'font-size="{max(float(m.group(3)) * font_scale, min_font_size):.1f}{m.group(4) or ""}"',
        raw_content,
        flags=re.IGNORECASE
    )

    # Reemplazar font-family
    if font_family:
        raw_content = re.sub(
            r'font-family\s*:\s*[^;"]+',
            f'font-family: {font_family}',
            raw_content,
            flags=re.IGNORECASE
        )
        raw_content = re.sub(
            r'font-family\s*=\s*["\'][^"\']+["\']',
            f'font-family="{font_family}"',
            raw_content,
            flags=re.IGNORECASE
        )

    # Escalar stroke-width (conectores y bordes)
    def scale_stroke_match(m):
        val = float(m.group(2))
        unit = m.group(3) or 'px'
        new_val = max(val * line_scale, min_line_width)
        return f"{m.group(1)}{new_val:.1f}{unit}"

    raw_content = re.sub(
        r'(stroke-width\s*:\s*)([0-9]*\.?[0-9]+)(px|pt)?',
        scale_stroke_match,
        raw_content,
        flags=re.IGNORECASE
    )
    raw_content = re.sub(
        r'(stroke-width\s*=\s*)(["\'])([0-9]*\.?[0-9]+)(px|pt)?\2',
        lambda m: f'stroke-width="{max(float(m.group(3)) * line_scale, min_line_width):.1f}{m.group(4) or ""}"',
        raw_content,
        flags=re.IGNORECASE
    )

    # Redondear esquinas en <rect> si no tienen rx
    if corner_radius > 0:
        def add_rx_ry(match):
            tag_content = match.group(1)
            # Solo añadir si es una caja de bloque (ancho y alto mayores a 20 para evitar puertos diminutos)
            w_match = re.search(r'width\s*=\s*["\']([0-9]+)', tag_content)
            h_match = re.search(r'height\s*=\s*["\']([0-9]+)', tag_content)
            if w_match and h_match:
                if float(w_match.group(1)) > 30 and float(h_match.group(1)) > 30:
                    if 'rx=' not in tag_content:
                        tag_content += f' rx="{corner_radius}" ry="{corner_radius}"'
                    else:
                        tag_content = re.sub(r'rx\s*=\s*["\'][0-9.]+["\']', f'rx="{corner_radius}"', tag_content)
                        tag_content = re.sub(r'ry\s*=\s*["\'][0-9.]+["\']', f'ry="{corner_radius}"', tag_content)
            return f'<rect{tag_content}>'

        raw_content = re.sub(r'<rect([^>]+)>', add_rx_ry, raw_content)

    # 2. Inyección de Tema de Color / CSS Adicional
    theme_css = ""
    defs_addition = ""

    if add_shadow:
        defs_addition += """
    <filter id="spec42-shadow" x="-10%" y="-10%" width="130%" height="130%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
"""

    if theme == 'dark':
        # Tema Oscuro Táctico (similar a diagrama_contexto_ugv)
        theme_css = f"""
    /* Inyección de Tema Dark por beautify_spec42 */
    svg {{
        background: #0f172a !important;
        font-family: {font_family} !important;
    }}
    text, tspan, p, span, div {{
        fill: #f8fafc !important;
        color: #f8fafc !important;
        font-family: {font_family} !important;
        font-weight: 500;
    }}
    /* Títulos y nombres de bloques en negrita */
    .title, [class*="header"], [class*="title"], text:first-of-type {{
        font-weight: 700 !important;
    }}
    /* Cajas y nodos */
    rect:not([fill="none"]) {{
        fill: #1e293b !important;
        stroke: #38bdf8 !important;
        stroke-width: 1.8px !important;
    }}
    /* Líneas y conectores */
    path, line {{
        stroke: #38bdf8 !important;
    }}
    polygon, marker path {{
        fill: #38bdf8 !important;
        stroke: #38bdf8 !important;
    }}
"""
    elif theme == 'light':
        # Tema Claro Técnico Profesional (para imprimir o memorias en PDF)
        theme_css = f"""
    /* Inyección de Tema Light por beautify_spec42 */
    svg {{
        background: #ffffff !important;
        font-family: {font_family} !important;
    }}
    text, tspan, p, span, div {{
        fill: #0f172a !important;
        color: #0f172a !important;
        font-family: {font_family} !important;
        font-weight: 500;
    }}
    .title, [class*="header"], [class*="title"], text:first-of-type {{
        font-weight: 700 !important;
    }}
    rect:not([fill="none"]) {{
        fill: #f8fafc !important;
        stroke: #0284c7 !important;
        stroke-width: 1.8px !important;
    }}
    path, line {{
        stroke: #0284c7 !important;
    }}
    polygon, marker path {{
        fill: #0284c7 !important;
        stroke: #0284c7 !important;
    }}
"""
    else:
        # Tema 'keep': No sobreescribe colores pero asegura contraste y tipografía
        theme_css = f"""
    /* Ajustes generales de legibilidad */
    text, tspan, div, span {{
        font-family: {font_family} !important;
    }}
"""

    # Inyectar defs y estilo dentro del SVG
    inject_block = ""
    if defs_addition or theme_css:
        inject_block = f"<defs>{defs_addition}<style>{theme_css}</style></defs>"

    # Insertar justo después de la etiqueta de apertura <svg...>
    svg_tag_end = raw_content.find('>')
    if svg_tag_end != -1:
        raw_content = raw_content[:svg_tag_end + 1] + "\n" + inject_block + raw_content[svg_tag_end + 1:]

    # Escribir archivo de salida
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(raw_content)

    print(f"✅ SVG embellecido con éxito: {output_path}")
    print(f"   - Factor de escala de fuentes: {font_scale}x (Mínimo: {min_font_size}px)")
    print(f"   - Refuerzo de conectores: {line_scale}x (Mínimo: {min_line_width}px)")
    print(f"   - Radio de esquinas: {corner_radius}px")
    print(f"   - Tema aplicado: {theme}")


def main():
    parser = argparse.ArgumentParser(
        description="Mejora drásticamente la estética y tamaño de fuentes de diagramas exportados por Spec42."
    )
    parser.add_argument("input", help="Ruta al archivo SVG exportado por Spec42")
    parser.add_argument("-o", "--output", help="Ruta del SVG embellecido resultante (por defecto: sobrescribe o añade _beautified)")
    parser.add_argument("--font-scale", type=float, default=2.0, help="Multiplicador de tamaño de fuente (ej: 2.0 = el doble de grande). Default: 2.0")
    parser.add_argument("--min-font", type=float, default=16.0, help="Tamaño mínimo en píxeles para cualquier texto. Default: 16.0")
    parser.add_argument("--line-scale", type=float, default=1.5, help="Multiplicador de grosor para líneas y conectores. Default: 1.5")
    parser.add_argument("--min-line", type=float, default=2.2, help="Grosor mínimo de línea en px. Default: 2.2")
    parser.add_argument("--radius", type=float, default=8.0, help="Radio de esquinas redondeadas para los bloques en px. Default: 8.0")
    parser.add_argument("--theme", choices=["keep", "dark", "light"], default="keep",
                        help="Tema visual: 'keep' (mantiene colores pero agranda fuentes y mejora trazos), 'dark' (táctico oscuro), 'light' (técnico blanco). Default: keep")
    parser.add_argument("--shadow", action="store_true", help="Añade sombras suaves a los bloques")

    args = parser.parse_args()

    input_file = args.input
    if not args.output:
        base, ext = os.path.splitext(input_file)
        output_file = f"{base}_pro{ext}"
    else:
        output_file = args.output

    beautify_svg(
        input_path=input_file,
        output_path=output_file,
        font_scale=args.font_scale,
        min_font_size=args.min_font,
        line_scale=args.line_scale,
        min_line_width=args.min_line,
        corner_radius=args.radius,
        theme=args.theme,
        add_shadow=args.shadow
    )


if __name__ == '__main__':
    main()
