---
permalink: /
title: "Gestión pública y ciencia de datos"
excerpt: "Diego Sime: gestión pública y ciencia de datos. Proyectos con su pregunta, su resultado y su código."
author_profile: true
---

Soy **Diego Sime**, gestor público, con certificación en gestión de proyectos (PMP) y maestría en Filosofía. Actualmente estudio la Diplomatura de Especialización en Ciencia de Datos para las Ciencias Sociales y la Gestión Pública.

<p class="botones"><a class="boton" href="https://www.linkedin.com/in/diego-sime-rendon/">LinkedIn</a><a class="boton" href="https://github.com/diegosimemirror">GitHub</a></p>

## Proyectos

<div class="tarjetas">
{% assign proyectos = site.portfolio | sort: "orden" %}{% for proyecto in proyectos %}{% include tarjeta-proyecto.html proyecto=proyecto %}{% endfor %}
</div>

## Publicaciones e informes {#publicaciones}

{% include lista-publicaciones.html %}
