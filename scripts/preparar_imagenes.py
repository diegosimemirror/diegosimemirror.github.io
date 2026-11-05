# ============================================================
# PROCESO 5.1: Preparar las imágenes de las tarjetas
# Insumo:    figuras de los repos de cada proyecto y la captura del mapa de salud
# Resultado: images/proyectos/*.png, sin márgenes blancos y de hasta 1200 px de ancho
#
# PROCESO 4.1: Crear la imagen para compartir el enlace
# Insumo:    nombre y lema del sitio
# Resultado: images/og-image.png, la imagen que aparece al pegar el enlace en WhatsApp o LinkedIn
#
# Cómo correrlo (uv instala Pillow solo para esta ejecución; no hay que instalar nada más):
#   uv run --no-project --with pillow python scripts/preparar_imagenes.py <captura_del_mapa.png>
# ============================================================

# --- Paquetes ---
# sys: leer la ruta de la captura escrita al correr el script (viene con Python)
import sys

# pathlib: armar rutas de archivos que funcionan en cualquier sistema (viene con Python)
from pathlib import Path

# Pillow (PIL): abrir, recortar, redimensionar y dibujar imágenes
from PIL import Image, ImageChops, ImageDraw, ImageFont

# Carpeta del sitio y carpeta que contiene a los demás repos
SITIO = Path(__file__).resolve().parent.parent
REPOS = SITIO.parent
ANCHO_MAXIMO = 1200


def recortar_margenes(imagen):
    """Quita los bordes blancos.

    Antes: figura con márgenes blancos | Después: la misma figura, ajustada a su contenido.
    """
    imagen = imagen.convert("RGB")
    fondo = Image.new("RGB", imagen.size, (255, 255, 255))
    # ImageChops.difference(): deja en negro lo que coincide con el fondo blanco;
    # getbbox() devuelve el rectángulo donde queda algo distinto de negro
    caja = ImageChops.difference(imagen, fondo).getbbox()
    return imagen.crop(caja) if caja else imagen


def limitar_ancho(imagen):
    """Reduce la imagen si pasa del ancho máximo, para que el sitio cargue rápido en el celular.

    Antes: ancho original | Después: 1200 px como máximo, con la misma proporción.
    """
    if imagen.width <= ANCHO_MAXIMO:
        return imagen
    alto = round(imagen.height * ANCHO_MAXIMO / imagen.width)
    return imagen.resize((ANCHO_MAXIMO, alto), Image.LANCZOS)


# --- Paso 5.1.1: Figuras de los proyectos ---
destino = SITIO / "images" / "proyectos"
destino.mkdir(parents=True, exist_ok=True)

figuras = {
    REPOS / "incendios-2026" / "salidas" / "mapa_junin.png": "incendios-junin.png",
    REPOS / "skills" / "mapas" / "pobreza_departamento.png": "pobreza-departamento.png",
}

for origen, nombre in figuras.items():
    imagen = limitar_ancho(recortar_margenes(Image.open(origen)))
    # optimize=True: comprime el PNG sin perder calidad
    imagen.save(destino / nombre, optimize=True)
    print(nombre, imagen.size)

# --- Paso 5.1.2: Captura del mapa de salud (tomada a 900 x 640 para que se lea en la tarjeta) ---
captura = Image.open(sys.argv[1]).convert("RGB")
# crop(): deja fuera la franja cortada de la parte inferior
captura = limitar_ancho(captura.crop((0, 0, captura.width, 608)))
captura.save(destino / "mapa-salud-peru.png", optimize=True)
print("mapa-salud-peru.png", captura.size)

# --- Paso 5.1.3: Captura de la red de Designaciones ---
# crop(): conserva el título, la leyenda y los primeros grupos de la red; quita lo demás
# Antes: captura vertical de 1280 x 1390 | Después: recorte horizontal que cabe en la tarjeta
red = Image.open(REPOS / "designaciones" / "tarea_3" / "reel" / "capturas" / "red_seguimiento_dashboard.png")
red = limitar_ancho(red.convert("RGB").crop((70, 285, 1210, 1000)))
red.save(destino / "designaciones-red.png", optimize=True)
print("designaciones-red.png", red.size)

# --- Paso 4.1.1: Imagen para compartir el enlace ---
# Antes: no existe | Después: imagen de 1200 x 630, la medida que usan las redes
lamina = Image.new("RGB", (1200, 630), (255, 255, 255))
dibujo = ImageDraw.Draw(lamina)
negrita = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 92)
normal = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 46)
dibujo.rectangle((0, 0, 24, 630), fill=(47, 127, 147))
dibujo.text((90, 190), "Diego Sime", font=negrita, fill=(40, 48, 54))
dibujo.text((90, 310), "Gestión pública y ciencia de datos", font=normal, fill=(70, 80, 88))
dibujo.text((90, 450), "diegosimemirror.github.io", font=normal, fill=(47, 127, 147))
lamina.save(SITIO / "images" / "og-image.png", optimize=True)
print("og-image.png", lamina.size)
