---
title: "Juntos y la pobreza: a quién protege hoy la política social en el Perú"
excerpt: "Un agente de Claude Code que consulta las series del Banco Central con un servidor MCP propio y analiza la ENAHO 2024 con tres skills, con un dashboard para explorar los resultados."
orden: 1
tema: "Agentes de IA · Política social · Dashboard"
pregunta: "¿Cuánto poder de compra perdió la transferencia de Juntos y dónde y en qué hogares se concentra hoy la pobreza monetaria?"
resultado: "Los S/&nbsp;100 de Juntos de octubre de 2026 valen S/&nbsp;51.47 de 2006. El 72.7 % de los pobres vive en ciudades, pero solo el 15 % de los pobres urbanos vive en un hogar con Juntos."
imagen: politica-social-peru.png
imagen_alt: "Gráfico del dashboard: índice de precios de Lima con diciembre de 2006 = 100. En octubre de 2026 los alimentos llegan a 229.7 y el total a 194.3."
enlaces:
  - texto: "Abrir el dashboard"
    url: "https://diegosimemirror.github.io/tarea4/"
  - texto: "Informe"
    url: "https://diegosimemirror.github.io/tarea4/informe.html"
  - texto: "Código"
    url: "https://github.com/diegosimemirror/tarea4"
---

{% include tarjeta-proyecto.html proyecto=page detalle=true %}

## Qué hice

Un agente de investigación con Claude Code que responde una pregunta de política social con dos fuentes oficiales:

- Un servidor MCP propio para la API del Banco Central de Reserva del Perú (BCRP), con cinco herramientas. Una de ellas, `valor_real`, lleva un monto de una fecha a soles de otra con el índice de precios.
- Tres skills que limpian, grafican y mapean los microdatos de la Encuesta Nacional de Hogares (ENAHO) 2024 del INEI. Si se pide un mapa y la base limpia no existe, el agente la crea primero.

En una sola ejecución, el agente usó cinco herramientas del servidor y las tres skills, cruzó las dos fuentes y escribió el informe. Después se verificaron 9 cifras por otro camino y se corrigió una interpretación.

## Hallazgos

- **Juntos perdió la mitad de su valor.** Paga S/&nbsp;100 al mes desde 2006. En soles de diciembre de 2006, los S/&nbsp;100 de octubre de 2026 valen S/&nbsp;51.47, y S/&nbsp;43.53 si se miden con los precios de los alimentos.
- **Los alimentos subieron más y pesan más en el gasto de los pobres.** Entre 2006 y 2026 subieron 129.7 %, frente a 71.4 % del resto de precios. Los hogares pobres destinan 44.6 % de su gasto a alimentos; los no pobres, 33.2 %.
- **La tasa más alta es rural, pero la mayoría de los pobres es urbana.** La pobreza es de 39.30 % en el campo y de 24.81 % en las ciudades, pero el 72.7 % de los pobres vive en ciudades. En los hogares con niños menores de 5 años llega a 43.80 %.
- **Juntos casi no llega a los pobres urbanos.** El 48.7 % de los pobres rurales vive en un hogar con Juntos; entre los urbanos, el 15.1 %.

## Evaluación

Hice 10 preguntas con respuesta conocida, cada una en una sesión aparte, con y sin las herramientas. Sin ellas, Claude acertó 1 de 10: en las otras 9 no inventó cifras, pero tampoco respondió. Con ellas, acertó las 10. Las respuestas esperadas quedaron guardadas en Git antes de correr la evaluación.

## Limitaciones

- La ENAHO es de 2024 y las series del BCRP llegan a 2026. El informe dice cuándo combina periodos y no infiere causalidad.
- La cobertura de Juntos sale de lo que declaran los hogares. La ENAHO estima 1.04 millones de hogares con Juntos, más que los cerca de 760 mil del padrón.
- El alza acumulada del costo de vida de un hogar pobre usa la canasta de 2024 para todo el periodo, así que es una aproximación.
- Los microdatos no están en el repositorio. Se descargan del INEI con los comandos del README.

## Fuentes

- BCRP, [series estadísticas](https://estadisticas.bcrp.gob.pe/estadisticas/series/) PN38705PM (IPC de Lima), PN39445PM (alimentos y bebidas) y PN38706PM (sin alimentos).
- INEI, ENAHO 2024, módulos 34 (sumaria) y 02 (miembros del hogar).
- Trivelli y Mendoza (2026). «Repensar y rearmar la política social para retomar la senda perdida». Documento de Trabajo 309, IEP. Sirvió de marco y de contraste: sus 10 cifras comparables se reprodujeron con diferencias menores a 0.03 puntos.
