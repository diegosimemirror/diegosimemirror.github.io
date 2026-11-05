---
title: "Tres skills de Claude Code que limpian, grafican y mapean la ENAHO 2024"
excerpt: "Tres skills de Claude Code que convierten los microdatos de la Encuesta Nacional de Hogares 2024 en una base validada contra la pobreza oficial."
orden: 3
tema: "Agentes de IA · Encuestas"
pregunta: "¿Puede un agente de IA limpiar la Encuesta Nacional de Hogares (ENAHO) y replicar la pobreza oficial?"
resultado: "Pobreza de 27.53 % frente a 27.6 % del INEI, con los mismos 108,664 residentes. Con las skills resolvió 3 de 3 pedidos; sin ellas, ninguno."
imagen: pobreza-departamento.png
imagen_alt: "Mapa del Perú con la pobreza monetaria de 2024 por departamento: más oscuro significa más pobreza."
enlaces:
  - texto: "Código"
    url: "https://github.com/diegosimemirror/skills"
  - texto: "Evaluación"
    url: "https://github.com/diegosimemirror/skills/blob/main/evaluacion.md"
---

{% include tarjeta-proyecto.html proyecto=page detalle=true %}

## Qué hice

Una *skill* es un conjunto de instrucciones que Claude Code activa por su cuenta cuando un pedido encaja con ella. Construí tres:

- `limpiando-enaho` une los módulos de la encuesta y deja una base de personas validada.
- `graficando-enaho` produce gráficos de pobreza con reglas fijas.
- `mapeando-enaho` produce el mapa por departamento.

Basta un pedido como «haz un mapa de la pobreza» para que se activen dos skills seguidas: si la base limpia no existe, primero la crea.

## Validación

| Indicador | Esta base | INEI |
| --- | --- | --- |
| Residentes habituales | 108,664 | 108,664 |
| Pobreza monetaria | 27.53 % | 27.6 % |
| Pobreza extrema | 5.50 % | 5.5 % |

## Evaluación

Hice tres pedidos en copias aisladas del proyecto, con y sin skills. Con ellas, las cifras coincidieron con las de referencia, con diferencias de 0.1 puntos o menos. Sin ellas, Claude no entregó ningún resultado: buscó en otro lado o se detuvo a pedir confirmaciones.

## Limitaciones

- Es una sola corrida por pedido, así que no mide la variación entre corridas.
- Mis instrucciones generales a Claude piden confirmar antes de programar, y eso explica en parte por qué se detuvieron las corridas sin skills.
- Los microdatos no están en el repositorio. Se descargan del INEI con los comandos del README.
