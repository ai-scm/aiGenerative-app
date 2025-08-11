import json
from pathlib import Path

# Ruta del archivo JSON
json_path = Path("config.app.json")

# Ruta del archivo CSS a generar
css_path = Path("/../../frontend/src/config/colors.css")

# Leer el archivo JSON
with open(json_path, "r") as file:
    config = json.load(file)

# Extraer los colores
colors = config.get("COLORS", {})

# Mapeo de nombres de variables CSS a los valores del JSON
css_variables = {
    "--aws-sea-blue": colors.get("primary_color", "#000000"),
    "--aws-sea-blue-hover": colors.get("primary_hover", "#000000"),
    "--aws-font-color": colors.get("font_color", "#000000"),
    "--houndoc-primary-dark": colors.get("primary_dark", "#000000"),
}

# Generar el contenido del archivo CSS
css_content = ":root {\n"
for name, value in css_variables.items():
    css_content += f"  {name}: {value};\n"
css_content += "}\n"

# Escribir el archivo CSS
with open(css_path, "w") as file:
    file.write(css_content)

print(f"Archivo CSS generado en: {css_path.resolve()}")