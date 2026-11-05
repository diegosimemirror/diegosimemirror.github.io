# Sitio personal de Diego Sime

Código del sitio https://diegosimemirror.github.io, publicado con GitHub Pages.

## Dónde está cada cosa

| Quiero cambiar | Archivo |
| --- | --- |
| Mi presentación | `_pages/about.md` |
| Nombre, foto y enlaces | `_config.yml`, sección `author` |
| Un proyecto | `_portfolio/<proyecto>.md` |
| Publicaciones e informes | `_data/publicaciones.yml` |
| Menú superior | `_data/navigation.yml` |
| Imágenes de las tarjetas | `images/proyectos/` |
| CV y otros PDF | `files/` |
| Apariencia de las tarjetas | `_sass/layout/_tarjetas.scss` |

## Cómo agregar un proyecto

1. Guarda una imagen en `images/proyectos/`.
2. Copia un archivo de `_portfolio/` y cambia su cabecera: `title`, `orden`, `pregunta`, `resultado`, `imagen` y `enlaces`. El número de `orden` define su lugar; el 1 va primero.
3. Escribe debajo qué hiciste y cuáles son los límites del resultado.
4. Haz commit y push. GitHub Actions publica el sitio en unos minutos.

## Procesos

| N.º | Proceso | Insumo | Método | Resultado |
| --- | --- | --- | --- | --- |
| 1 | Crear el repo | Plantilla academicpages | Copia con el nombre `diegosimemirror.github.io` | Repo público |
| 2 | Configurar | `_config.yml` | Nombre, dirección y enlaces | Sitio con mis datos |
| 3 | Limpiar la plantilla | Contenido de ejemplo | Borrar o traducir | Sin restos de la plantilla |
| 4 | Inicio | Presentación y enlaces | `_pages/about.md` | Portada |
| 5 | Proyectos y publicaciones | Repos, productos e informes | `_portfolio/`, `_data/publicaciones.yml` y `scripts/preparar_imagenes.py` | Tarjetas y fichas |
| 6 | Demo incrustada | `web_junin.html` de `incendios-2026` | Copia en `demos/incendios-junin/` con la etiqueta `viewport`, para que se adapte al celular | Demo dentro del sitio |

## Créditos

Plantilla [AcademicPages](https://github.com/academicpages/academicpages.github.io), con licencia MIT (ver `LICENSE`).
