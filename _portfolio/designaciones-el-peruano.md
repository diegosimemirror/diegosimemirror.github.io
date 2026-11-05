---
title: "Designaciones de El Peruano: ¿cambia todo para que no cambie nada?"
excerpt: "Análisis de cuatro años de designaciones, conclusiones y renuncias de funcionarios publicadas en el diario oficial del Perú, con un dashboard interactivo."
orden: 1
tema: "Gestión pública · Redes · Dashboard"
pregunta: "La alta rotación de cargos de confianza, ¿renueva el elenco de funcionarios o hace circular a las mismas personas?"
resultado: "El 50 % de quienes designó el gobierno de julio de 2026 ya había tenido un cargo entre 2022 y 2026 (61 % en cargos altos). Base: 46,892 movimientos."
imagen: designaciones-red.png
imagen_alt: "Captura del dashboard: red de seguimiento con grupos de personas, donde cada flecha va de un jefe a quien llegó después de él en dos o más instituciones. Las personas aparecen con códigos."
enlaces:
  - texto: "Abrir el dashboard"
    url: "https://diegosimemirror.github.io/designaciones/tarea_3/web/"
  - texto: "Ver el reel"
    url: "/portfolio/designaciones-el-peruano/#reel"
  - texto: "Código"
    url: "https://github.com/diegosimemirror/designaciones/tree/main/tarea_3"
---

{% include tarjeta-proyecto.html proyecto=page detalle=true %}

## Dashboard interactivo {#demo}

<div class="demo">
<iframe src="https://diegosimemirror.github.io/designaciones/tarea_3/web/" title="Dashboard de las designaciones de El Peruano" loading="lazy"></iframe>
</div>

<p class="botones"><a class="boton" href="https://diegosimemirror.github.io/designaciones/tarea_3/web/">Abrir en pantalla completa</a></p>

## Qué hice

Descargué con código las normas de personal publicadas en el diario oficial entre noviembre de 2022 y octubre de 2026, y leí el PDF oficial de cada una. Con reglas de texto extraje la persona, el cargo, el tipo de movimiento, las fechas y quién firma. El resultado son 27,183 normas y 46,892 movimientos, con cinco presidentes y cuatro cambios de gobierno.

Las personas aparecen con un código estable, porque el objetivo es estudiar patrones y no señalar a nadie. Cada cargo de los rankings enlaza a su norma oficial en El Peruano.

## Tres hallazgos

1. **La mitad del elenco ya estaba en el Estado.** De quienes designó en sus primeros meses el gobierno que asumió el 28 de julio de 2026, el 50 % ya había tenido un cargo entre 2022 y 2026; en los cargos altos, el 61 %. Cambia el mando, no tanto el elenco.
2. **Lo primero que asegura un ministro es el control administrativo.** En 168 llegadas de ministros, el secretario general se renueva a los 5 días (mediana), antes que asesoría jurídica (13), administración y recursos humanos (14), viceministros (16.5) y planeamiento (18).
3. **El «desorden» tiene estructura: gente que sigue a su jefe.** 41 parejas de jefe y acompañante se repiten en 3 o más instituciones, cuando por azar se esperarían 6, y 806 en 2 o más, cuando por azar se esperarían 364.

## Reel {#reel}

<div class="reel">
<video controls preload="none" playsinline poster="https://diegosimemirror.github.io/designaciones/tarea_3/reel/portada.png" src="https://diegosimemirror.github.io/designaciones/tarea_3/reel/reel.mp4">Tu navegador no puede reproducir este video.</video>
</div>

La narración es mi voz real, grabada; no es una voz clonada ni sintética. Música: «Clean Soul», de Kevin MacLeod (incompetech.com), licencia CC BY 4.0.

## Limitaciones

- La red muestra quién se mueve con quién, no por qué: no distingue un equipo técnico cohesionado de una red clientelar.
- Los datos salen del texto de las normas mediante reglas, y el 4.6 % de las normas no se pudo leer completa.
- La mayoría de normas no trae DNI, así que dos personas con el mismo nombre se cuentan como una y las variantes de un nombre, como personas distintas.
- Solo se ven las designaciones publicadas en El Peruano, y en cuatro años: quien parece nuevo al inicio pudo tener cargos antes.
