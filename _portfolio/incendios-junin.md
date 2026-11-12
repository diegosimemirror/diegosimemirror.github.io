---
title: "Incendios en Junín: a quién expone el fuego y si la red de salud puede responder"
excerpt: "Clasificación de focos de calor en Junín, población expuesta y capacidad de respuesta de la red pública de salud, del 14 al 21 de octubre de 2026."
orden: 4
tema: "Mapas · Datos satelitales"
pregunta: "¿Qué focos de calor son probablemente incendios forestales, a quién exponen y puede responder la red de salud?"
resultado: "Con criterios de evidencia, las personas a 5 km o menos del fuego bajan de 746,046 a 232,748."
imagen: incendios-junin.png
imagen_alt: "Mapa de Junín con los incendios forestales probables en rojo, las zonas de 5 km y los establecimientos de salud expuestos, del 14 al 21 de octubre de 2026."
enlaces:
  - texto: "Probar la demo"
    url: "/portfolio/incendios-junin/#demo"
  - texto: "Código"
    url: "https://github.com/diegosimemirror/incendios-2026"
---

{% include tarjeta-proyecto.html proyecto=page detalle=true %}

## Demo interactiva {#demo}

<div class="demo">
<iframe src="{{ '/demos/incendios-junin/' | relative_url }}" title="Demo interactiva de los incendios en Junín" loading="lazy"></iframe>
</div>

<p class="botones"><a class="boton" href="{{ '/demos/incendios-junin/' | relative_url }}">Abrir la demo en pantalla completa</a></p>

## Qué hice

Crucé los focos de calor detectados por satélites de la NASA con datos de cobertura del suelo, luces nocturnas, población, establecimientos de salud, tiempo de viaje y cobertura móvil. Cada grupo de focos se clasifica con cuatro pistas: si persiste entre pasadas del satélite, si lo detectó más de un satélite, qué cubre el suelo y si hay luz nocturna alta. La exposición se calcula solo con los incendios forestales probables.

## Tres hallazgos

1. **Los criterios cambian la cifra.** De 746,046 personas cerca de algún foco se pasa a 232,748 cerca de un incendio forestal probable. El 69 % estaba cerca de focos sin evidencia de incendio forestal.
2. **El incendio más grande no es el que expone a más personas.** El de Río Tambo tuvo 287 focos y unas 1,958 hectáreas, pero solo 399 personas y 1 establecimiento de salud a 5 km o menos.
3. **El punto débil de la red está en el valle del Ene.** De los 7 establecimientos críticos, 6 están en Río Tambo y Vizcatán del Ene, a 3 o 4 horas estimadas de su hospital de referencia y sin 4G garantizado.

## Limitaciones

- «Probable» no es «confirmado»: confirmar un incendio requiere imágenes de mayor detalle o un reporte de campo.
- Estar cerca no significa ser damnificado, y la población es una estimación de un modelo, no un censo.
- El tiempo de traslado también es modelado y en la selva tiende a quedarse corto.

## También

- [Reel de 39 segundos sobre este proyecto](https://github.com/diegosimemirror/ejercicio-reel/blob/main/salidas/reel.mp4). **La narración usa mi voz clonada con IA.**
