#!/usr/bin/env python3
"""
update_context_history.py
Genera y actualiza openspec/HISTORIAL_CONTEXTO.md sintetizando la evolucion
del contexto comun (bloque 'context' en openspec/config.yaml) exclusivamente en la rama main.
"""

import os
import sys
import re
import subprocess
import difflib

def get_repo_root():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    res = subprocess.check_output(['git', '-C', script_dir, 'rev-parse', '--show-toplevel'], text=True).strip()
    return res

def extract_context_lines(text):
    match = re.search(r'^context:\s*\|?\s*\n((?:(?:[ \t]+.*|[ \t]*)\n)+)', text, re.MULTILINE)
    if not match:
        return []
    lines = match.group(1).splitlines()
    return [l.strip() for l in lines if l.strip()]

def synthesize_delta(prev_lines, added_lines, removed_lines, is_first, subject):
    """Genera una sintesis breve y no redundante de los conceptos nuevos anadidos al contexto."""
    if is_first and not added_lines:
        return "Inicialización del esqueleto base de OpenSpec (sin contexto común formal todavía)."
    
    prev_text = " ".join(prev_lines).lower()
    text = " ".join(added_lines).lower()
    points = []

    if ("propósito del proyecto" in text or "poc formativa" in text) and "poc formativa" not in prev_text:
        points.append("Propósito de PoC formativa (aprender SysML v2 en modo texto, Git colaborativo y OpenSpec)")
    if ("tadpole" in text or "2 o 3 componentes" in text or "alcance acotado" in text) and "tadpole" not in prev_text:
        points.append("Límites de diseño: vehículo Tadpole ligero con incrementos didácticos pequeños (máx. 2-3 piezas)")
    if ("spec42" in text or "visual studio code" in text) and "spec42" not in prev_text:
        points.append("Entorno núcleo de trabajo: VS Code + Spec42 con archivos .sysml como única fuente de verdad")
    if ("temperatura" in text or "celsius" in text) and ("temperatura" not in prev_text and "celsius" not in prev_text):
        points.append("Estandarización de magnitudes: temperaturas medidas obligatoriamente en grados Celsius (°C)")
    if ("reglas obligatorias" in text or "git checkout -b" in text or "rama dedicada" in text) and "git checkout -b" not in prev_text:
        points.append("Protocolo de equipo: trabajo obligatorio en ramas Git (`git checkout -b`), prohibido editar 'main' directamente")
    if ("opsx-propose" in text or "prohibición" in text or "sin una propuesta" in text) and "opsx-propose" not in prev_text:
        points.append("Ciclo estricto OpenSpec: prohibido modificar 'Modelos/' sin propuesta previa aprobada (propose → apply → archive)")

    if points:
        return " • ".join(points)
    
    # Si hubo modificación textual menor o ajuste
    if added_lines:
        sample = [l.replace("`", "'") for l in added_lines[:2]]
        return "Actualización: " + "; ".join(sample)
    elif removed_lines:
        return f"Ajuste y depuración de {len(removed_lines)} líneas de contexto."
    return subject.strip()

def build_history(repo_root):
    config_rel_path = 'openspec/config.yaml'
    cmd = [
        'git', '-C', repo_root,
        'log', '--first-parent', '--reverse',
        '--format=%h|%an|%ad|%s', '--date=short',
        'main', '--', config_rel_path
    ]
    try:
        commits = subprocess.check_output(cmd, text=True).strip().splitlines()
    except subprocess.CalledProcessError:
        cmd[-3] = 'HEAD'
        commits = subprocess.check_output(cmd, text=True).strip().splitlines()

    entries = []
    prev_lines = []

    for idx, c in enumerate(commits):
        h, author, date, subject = c.split('|', 3)
        try:
            content = subprocess.check_output(
                ['git', '-C', repo_root, 'show', f'{h}:{config_rel_path}'],
                text=True, stderr=subprocess.DEVNULL
            )
        except subprocess.CalledProcessError:
            continue

        curr_lines = extract_context_lines(content)

        diff = list(difflib.unified_diff(prev_lines, curr_lines))
        added = [l[1:].strip() for l in diff if l.startswith('+') and not l.startswith('+++')]
        removed = [l[1:].strip() for l in diff if l.startswith('-') and not l.startswith('---')]

        if idx > 0 and not added and not removed:
            continue

        is_first = (idx == 0)
        synthesis = synthesize_delta(prev_lines, added, removed, is_first, subject)

        entries.append({
            'num': len(entries) + 1,
            'hash': h,
            'author': author,
            'date': date,
            'subject': subject,
            'added': added,
            'removed': removed,
            'synthesis': synthesis
        })
        prev_lines = curr_lines

    return entries

def generate_markdown(entries):
    md = [
        "# Registro de Evolución del Contexto Común (Rama `main`)",
        "",
        "> Este archivo registra cronológicamente cómo se expande y consolida el **contexto compartido y las reglas del proyecto** definidas en [`openspec/config.yaml`](config.yaml).",
        "> **Actualización automática**: Se regenera automáticamente mediante GitHub Actions cada vez que se integran cambios en la rama `main`.",
        "",
        "---",
        "",
        "## Resumen Cronológico",
        "",
        "| Versión | Fecha | Commit | Autor | Aporte Esencial al Contexto Común |",
        "| :---: | :--- | :---: | :--- | :--- |"
    ]

    for e in entries:
        md.append(f"| **v{e['num']}** | {e['date']} | `{e['hash']}` | `{e['author']}` | {e['synthesis']} |")

    md.extend([
        "",
        "---",
        "",
        "## Detalle Sintetizado por Revisión",
        ""
    ])

    for e in entries:
        md.append(f"### [v{e['num']}] Revisión `{e['hash']}` — {e['date']}")
        md.append(f"* **Autor**: `{e['author']}`")
        md.append(f"* **Mensaje de commit**: {e['subject']}")
        md.append(f"* **Aporte clave al contexto común**:")
        md.append(f"  > {e['synthesis']}")
        if e['added']:
            md.append("* **Líneas añadidas relevantes al bloque `context:`**:")
            for line in e['added']:
                safe_line = line.replace('`', "'")
                md.append(f"  * `{safe_line}`")
        md.append("")

    return "\n".join(md) + "\n"

def main():
    repo_root = get_repo_root()
    output_path = os.path.join(repo_root, 'openspec', 'HISTORIAL_CONTEXTO.md')

    entries = build_history(repo_root)
    new_content = generate_markdown(entries)

    current_content = ''
    if os.path.exists(output_path):
        with open(output_path, 'r', encoding='utf-8') as f:
            current_content = f.read()

    if new_content != current_content:
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Historial de contexto actualizado con éxito en {output_path} ({len(entries)} versiones).")
    else:
        print("El historial de contexto ya está al día. Sin modificaciones necesarias.")

if __name__ == '__main__':
    main()
