// ============================================================
// graficos.js: dibuja los 8 gráficos del bosquejo «Conway y la evolución»
//
// Cada gráfico es un PROCESO con su insumo (unos datos o un modelo
// pequeño) y su resultado (un dibujo SVG dentro de la página).
// No usa librerías: solo JavaScript del navegador.
// SVG: formato de dibujo hecho de figuras (líneas, círculos, textos)
// que el navegador dibuja nítido a cualquier tamaño.
// ============================================================

"use strict";

// ============================================================
// PROCESO 0: Herramientas comunes
// Insumo:    ninguno
// Resultado: funciones pequeñas que usan todos los gráficos
// ============================================================

const NS = "http://www.w3.org/2000/svg";

// el(): crea una figura SVG y la pone dentro de "padre".
//   Antes: la figura no existe | Después: aparece en el dibujo
function el(etiqueta, atributos, padre) {
  const nodo = document.createElementNS(NS, etiqueta);
  for (const nombre in atributos) nodo.setAttribute(nombre, atributos[nombre]);
  if (padre) padre.appendChild(nodo);
  return nodo;
}

// texto(): escribe un texto; si trae "\n", lo parte en varias líneas
function texto(padre, x, y, contenido, clases = "", ancla = "start") {
  const t = el("text", { x: x, y: y, class: ("t " + clases).trim(), "text-anchor": ancla }, padre);
  contenido.split("\n").forEach((linea, i) => {
    const trozo = el("tspan", { x: x, dy: i === 0 ? 0 : "1.3em" }, t);
    trozo.textContent = linea;
  });
  return t;
}

// lienzo(): crea el dibujo vacío de un gráfico.
//   viewBox es el tamaño de la "hoja"; el navegador la escala al ancho de la columna.
//   También prepara dos puntas de flecha (gris y azul) para ese dibujo.
function lienzo(id, ancho, alto, descripcion) {
  const contenedor = document.getElementById(id);
  const svg = el("svg", { viewBox: `0 0 ${ancho} ${alto}`, role: "img", "aria-label": descripcion }, contenedor);
  const defs = el("defs", {}, svg);
  [["gris", "punta-gris"], ["azul", "punta-azul"]].forEach(([nombre, clase]) => {
    const m = el("marker", {
      id: `${id}-flecha-${nombre}`, viewBox: "0 0 10 10", refX: 9, refY: 5,
      markerWidth: 7, markerHeight: 7, orient: "auto-start-reverse",
    }, defs);
    el("path", { d: "M0,0 L10,5 L0,10 z", class: clase }, m);
  });
  return svg;
}

// Ventana flotante: aparece junto al cursor con un texto breve
const tip = document.getElementById("tip");
function mostrarTip(evento, contenido) {
  tip.innerHTML = contenido;
  tip.style.opacity = 1;
  const x = Math.min(evento.clientX + 14, window.innerWidth - tip.offsetWidth - 8);
  tip.style.left = x + "px";
  tip.style.top = evento.clientY + 14 + "px";
}
function ocultarTip() { tip.style.opacity = 0; }

// azar(): números al azar «con semilla»: siempre salen los mismos,
//   así el gráfico se ve igual cada vez que se abre la página
function azar(semilla) {
  return function () {
    semilla |= 0;
    semilla = (semilla + 0x6d2b79f5) | 0;
    let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// fmt(): número con formato peruano (punto decimal, espacio en los miles)
const fmt = (n, dec = 0) =>
  n.toLocaleString("es-PE", { minimumFractionDigits: dec, maximumFractionDigits: dec });


// ============================================================
// GRÁFICO 1: El espejo de Conway
// Insumo:    4 equipos; cada uno solo habla con su vecino
// Resultado: organigrama a la izquierda y sistema a la derecha,
//            con los mismos canales; al pasar el cursor se ve cada pareja
// ============================================================
(function grafico1() {
  const svg = lienzo("g1", 640, 262,
    "Cuatro equipos que se comunican en cadena diseñan un sistema de cuatro módulos en cadena");
  const letras = ["A", "B", "C", "D"];
  const xEquipos = [45, 120, 195, 270];  // centro de cada caja de equipo
  const xModulos = [385, 460, 535, 610]; // centro de cada módulo del sistema
  const yCaja = 135, ancho = 52, alto = 36;

  texto(svg, 20, 24, "Organización", "negrita");
  texto(svg, 359, 24, "Sistema", "negrita");

  // Paso 1.1: jefatura y líneas jerárquicas (gris)
  el("rect", { x: 107.5, y: 44, width: 100, height: 34, rx: 4, class: "caja" }, svg);
  texto(svg, 157.5, 66, "Dirección", "", "middle");
  const ramas = xEquipos.map((x) => `M${x},106 V${yCaja}`).join(" ");
  el("path", { d: `M157.5,78 V106 M45,106 H270 ${ramas}`, class: "trazo-gris" }, svg);

  // Paso 1.2: canales de comunicación (azul): un arco entre cada par de vecinos.
  //   El mismo dibujo se repite en el sistema: ese es el espejo.
  const arco = (x1, x2, y) => `M${x1},${y} Q${(x1 + x2) / 2},${y + 34} ${x2},${y}`;
  const yBase = yCaja + alto;
  for (let i = 0; i < 3; i++) {
    el("path", { d: arco(xEquipos[i], xEquipos[i + 1], yBase), class: "trazo-azul" }, svg);
    el("path", { d: arco(xModulos[i], xModulos[i + 1], yBase), class: "trazo-azul" }, svg);
  }

  // Paso 1.3: cajas de equipos (letras) y de módulos (números de pasada)
  const cajasEquipo = [], cajasModulo = [];
  letras.forEach((letra, i) => {
    cajasEquipo.push(el("rect", { x: xEquipos[i] - ancho / 2, y: yCaja, width: ancho, height: alto, rx: 4, class: "caja" }, svg));
    texto(svg, xEquipos[i], yCaja + 23, letra, "", "middle");
    cajasModulo.push(el("rect", { x: xModulos[i] - ancho / 2, y: yCaja, width: ancho, height: alto, rx: 4, class: "caja" }, svg));
    texto(svg, xModulos[i], yCaja + 23, String(i + 1), "", "middle");
  });
  texto(svg, 157.5, 228, "Cuatro equipos; cada uno\nsolo habla con su vecino", "suave", "middle");
  texto(svg, 497.5, 228, "Un compilador de cuatro\npasadas, en cadena", "suave", "middle");

  // Paso 1.4: flecha «diseña» entre los dos lados
  el("line", { x1: 304, y1: yCaja + 18, x2: 356, y2: yCaja + 18, class: "trazo-gris", "marker-end": "url(#g1-flecha-gris)" }, svg);
  texto(svg, 330, yCaja + 6, "diseña", "suave", "middle");

  // Paso 1.5: al pasar el cursor por un equipo o un módulo, se resaltan los dos
  //   Antes: cajas grises | Después: la pareja en azul y una ventana con su nombre
  function resaltar(i, encender) {
    const clase = encender ? "caja-azul" : "caja";
    cajasEquipo[i].setAttribute("class", clase);
    cajasModulo[i].setAttribute("class", clase);
  }
  letras.forEach((letra, i) => {
    [xEquipos[i], xModulos[i]].forEach((x) => {
      const zona = el("rect", { x: x - ancho / 2 - 6, y: yCaja - 6, width: ancho + 12, height: alto + 12, class: "zona-activa" }, svg);
      const mensaje = `Equipo ${letra} → pasada ${i + 1}`;
      zona.addEventListener("mouseenter", (e) => { resaltar(i, true); mostrarTip(e, mensaje); });
      zona.addEventListener("mousemove", (e) => mostrarTip(e, mensaje));
      zona.addEventListener("mouseleave", () => { resaltar(i, false); ocultarTip(); });
    });
  });
})();


// ============================================================
// GRÁFICO 2: Líneas de menor resistencia
// Insumo:    un inicio, una meta y la variación disponible en cada
//            dirección (la matriz G; aquí son dos números)
// Método:    ecuación de Lande (1979): en cada paso la población se
//            mueve Δz = G · β, donde β empuja hacia la meta
// Resultado: el camino de la población y cuántos pasos tarda en llegar
// ============================================================
(function grafico2() {
  const svg = lienzo("g2", 640, 385,
    "Camino de una población hacia una meta cuando hay poca variación en una dirección");
  const X0 = 72, X1 = 610, Y0 = 340, Y1 = 30;           // bordes del área del gráfico
  const sx = (v) => X0 + (v / 10) * (X1 - X0);            // dato → píxel horizontal
  const sy = (v) => Y0 - (v / 10) * (Y0 - Y1);            // dato → píxel vertical
  const inicio = [1.5, 1.5], meta = [8.5, 8.5], ritmo = 0.15;

  // Paso 2.1: ejes (sin cuadrícula) y sus nombres
  el("path", { d: `M${X0},${Y1} V${Y0} H${X1}`, class: "trazo-gris" }, svg);
  texto(svg, X1, Y0 + 30, "Digitalizar lo que ya existe →", "suave", "end");
  const ejeY = texto(svg, 0, 0, "Cambiar la estructura →", "suave", "end");
  ejeY.setAttribute("transform", `translate(${X0 - 18},${Y1}) rotate(-90)`);

  // Paso 2.2: lo que no cambia con la barra: camino directo, inicio y meta
  el("line", { x1: sx(inicio[0]), y1: sy(inicio[1]), x2: sx(meta[0]), y2: sy(meta[1]), class: "trazo-gris" }, svg);
  texto(svg, sx(4.6), sy(5.6), "camino directo", "suave", "end");
  const capa = el("g", {}, svg);   // aquí se redibuja lo que sí cambia
  el("circle", { cx: sx(meta[0]), cy: sy(meta[1]), r: 7, class: "relleno-naranja" }, svg);
  texto(svg, sx(meta[0]) + 6, sy(meta[1]) - 34, "Meta: más digital\ny otra estructura", "", "end");

  // camino(): aplica la ecuación de Lande paso a paso.
  //   Antes: solo el punto de inicio | Después: la lista de posiciones hasta la meta
  function camino(gEstructura) {
    const puntos = [inicio.slice()];
    let z = inicio.slice();
    for (let paso = 1; paso <= 800; paso++) {
      const beta = [meta[0] - z[0], meta[1] - z[1]];       // empuje hacia la meta
      z = [z[0] + ritmo * 1 * beta[0],                      // G = [[1, 0],
           z[1] + ritmo * gEstructura * beta[1]];           //      [0, gEstructura]]
      puntos.push(z);
      if (Math.hypot(meta[0] - z[0], meta[1] - z[1]) < 0.25) break;
    }
    return puntos;
  }
  const pasosParejo = camino(1).length - 1;   // referencia: misma variación en ambas direcciones

  // dibujar(): redibuja la nube y el camino según la barra
  function dibujar() {
    const g = Number(document.getElementById("g2-variacion").value) / 100;
    capa.replaceChildren();
    // nube de variación: ancho fijo (digitalizar) y alto según la barra (estructura)
    const rx = 45, ry = 45 * Math.sqrt(g);
    el("ellipse", { cx: sx(inicio[0]), cy: sy(inicio[1]), rx: rx, ry: ry, class: "velo-azul" }, capa);
    texto(capa, sx(inicio[0]) + rx + 10, Y0 - 12, "Variación disponible", "suave", "start");
    // camino de la población
    const puntos = camino(g);
    const d = puntos.map((p, i) => `${i ? "L" : "M"}${sx(p[0]).toFixed(1)},${sy(p[1]).toFixed(1)}`).join(" ");
    el("path", { d: d, class: "trazo-azul" }, capa);
    // unos 8 puntos a lo largo del camino, con su número de paso al pasar el cursor
    const cada = Math.max(5, Math.ceil((puntos.length - 1) / 8 / 5) * 5);
    puntos.forEach((p, i) => {
      if (i === 0 || i % cada !== 0) return;
      el("circle", { cx: sx(p[0]), cy: sy(p[1]), r: 4, class: "relleno-azul", stroke: "var(--papel)", "stroke-width": 2 }, capa);
      const zona = el("circle", { cx: sx(p[0]), cy: sy(p[1]), r: 10, class: "zona-activa" }, capa);
      zona.addEventListener("mousemove", (e) => mostrarTip(e, `Paso ${i}`));
      zona.addEventListener("mouseleave", ocultarTip);
    });
    el("circle", { cx: sx(inicio[0]), cy: sy(inicio[1]), r: 5, class: "relleno-gris" }, capa);
    const pasos = puntos.length - 1;
    document.getElementById("g2-lectura").textContent =
      `Con esta variación, la población llega a la meta en ${fmt(pasos)} pasos. ` +
      `Con la misma variación en ambas direcciones tardaría ${fmt(pasosParejo)}.`;
  }
  document.getElementById("g2-variacion").addEventListener("input", dibujar);
  dibujar();
})();


// ============================================================
// GRÁFICO 3: Pleiotropía organizacional
// Insumo:    dos unidades y la lista de cosas a las que está atada cada una
// Resultado: dos diagramas en estrella; la unidad más atada, en azul
// ============================================================
(function grafico3() {
  const svg = lienzo("g3", 640, 292,
    "Una unidad con 2 vínculos y otra con 6 vínculos: presupuesto, plazas, procedimientos, sistemas y normas");
  const unidades = [
    { nombre: "Unidad A", cx: 150, vinculos: ["ROF", "Plazas"], nota: "2 vínculos: se\nreorganiza con facilidad" },
    { nombre: "Unidad B", cx: 455, vinculos: ["ROF", "Plazas", "Presupuesto", "TUPA", "SIAF / SIGA", "Normas"], nota: "6 vínculos: moverla\nobliga a mover todo" },
  ];
  const cy = 130, radio = 82;

  unidades.forEach((u, iu) => {
    const n = u.vinculos.length;
    // Paso 3.1: una línea y un punto por cada vínculo, repartidos en círculo
    u.vinculos.forEach((v, i) => {
      const ang = ((-90 + (i * 360) / n) * Math.PI) / 180;
      const c = Math.cos(ang), s = Math.sin(ang);
      el("line", { x1: u.cx, y1: cy, x2: u.cx + radio * c, y2: cy + radio * s, class: iu === 1 ? "trazo-azul" : "trazo-gris" }, svg);
      el("circle", { cx: u.cx + radio * c, cy: cy + radio * s, r: 5, class: "relleno-gris" }, svg);
      // la etiqueta va afuera, alineada según el lado en que cae
      const vertical = Math.abs(c) < 0.3;
      const ancla = vertical ? "middle" : c > 0 ? "start" : "end";
      const ly = cy + (radio + 12) * s + 5 + (vertical ? (s < 0 ? -4 : 10) : 0);
      texto(svg, u.cx + (radio + 12) * c, ly, v, "", ancla);
    });
    // Paso 3.2: la caja de la unidad, encima de las líneas
    el("rect", { x: u.cx - 44, y: cy - 17, width: 88, height: 34, rx: 4, class: iu === 1 ? "caja-azul" : "caja" }, svg);
    texto(svg, u.cx, cy + 5, u.nombre, "", "middle");
    texto(svg, u.cx, 262, u.nota, "suave", "middle");
  });
})();


// ============================================================
// GRÁFICO 4: El círculo que reproduce la estructura
// Insumo:    tres etapas y los tres mecanismos que las unen
// Resultado: un ciclo con flechas; en naranja, dónde se puede cortar
// ============================================================
(function grafico4() {
  const svg = lienzo("g4", 680, 330,
    "Ciclo: el organigrama diseña sistemas, cada sistema nuevo sigue al anterior y los sistemas fijan la comunicación");
  const cx = 340, cy = 170, R = 100;
  const punto = (grados) => [cx + R * Math.cos((grados * Math.PI) / 180), cy + R * Math.sin((grados * Math.PI) / 180)];

  // Paso 4.1: tres arcos con flecha, en el sentido del reloj
  //   [desde, hasta] en grados: dejan espacio para las cajas de cada etapa
  [[-52, 2], [58, 122], [178, 232]].forEach(([a, b]) => {
    const [x1, y1] = punto(a), [x2, y2] = punto(b);
    el("path", {
      d: `M${x1.toFixed(1)},${y1.toFixed(1)} A${R},${R} 0 0 1 ${x2.toFixed(1)},${y2.toFixed(1)}`,
      class: "trazo-azul", "marker-end": "url(#g4-flecha-azul)",
    }, svg);
  });

  // Paso 4.2: las tres etapas; el organigrama con borde naranja (punto de corte)
  [["Organigrama", -90, "caja-naranja"], ["Sistemas", 30, "caja"], ["Sistema nuevo", 150, "caja"]].forEach(([nombre, grados, clase]) => {
    const [x, y] = punto(grados);
    el("rect", { x: x - 62, y: y - 17, width: 124, height: 34, rx: 4, class: clase }, svg);
    texto(svg, x, y + 5, nombre, "", "middle");
  });

  // Paso 4.3: el nombre de cada mecanismo junto a su arco
  texto(svg, 452, 112, "Conway: se diseña con\nla forma de quien diseña", "", "start");
  texto(svg, 340, 296, "Estigmergia: lo nuevo sigue\nel patrón de lo anterior", "", "middle");
  texto(svg, 228, 112, "Los sistemas fijan quién\nse comunica con quién", "", "end");
  texto(svg, 340, 34, "Maniobra inversa: cambiar aquí primero", "suave", "middle");
})();


// ============================================================
// GRÁFICO 5: Costo de coordinación y modularidad (modelo de juguete)
// Insumo:    3 unidades de 6 personas; enlaces internos fijos y 30
//            enlaces posibles entre unidades, cada uno con un beneficio
// Método:    un enlace entre unidades se conserva si su beneficio supera
//            el costo de la barra; luego se calcula la modularidad Q
// Resultado: la red y su modularidad para cada costo
// ============================================================
(function grafico5() {
  const svg = lienzo("g5", 640, 380,
    "Tres unidades conectadas por dentro; los enlaces entre unidades aparecen cuando el costo de coordinarse baja");
  const centros = [[165, 120], [475, 120], [320, 282]];
  const nombres = [["Unidad 1", 165, 42], ["Unidad 2", 475, 42], ["Unidad 3", 320, 372]];

  // Paso 5.1: posición de las 18 personas (6 por unidad, en hexágono)
  const nodos = [];
  centros.forEach(([x, y], g) => {
    for (let i = 0; i < 6; i++) {
      const a = ((i * 60 - 90) * Math.PI) / 180;
      nodos.push({ g: g, x: x + 44 * Math.cos(a), y: y + 44 * Math.sin(a) });
    }
  });

  // Paso 5.2: enlaces internos: cada persona con sus vecinas y con la de enfrente
  const internos = [];
  for (let g = 0; g < 3; g++) {
    for (let i = 0; i < 6; i++) internos.push([g * 6 + i, g * 6 + ((i + 1) % 6)]);
    for (let i = 0; i < 3; i++) internos.push([g * 6 + i, g * 6 + i + 3]);
  }

  // Paso 5.3: 30 enlaces posibles entre unidades, con un beneficio al azar (fijo)
  const r = azar(7), posibles = [], vistos = new Set();
  while (posibles.length < 30) {
    const a = Math.floor(r() * 18), b = Math.floor(r() * 18);
    const clave = Math.min(a, b) + "-" + Math.max(a, b);
    if (nodos[a].g === nodos[b].g || vistos.has(clave)) continue;
    vistos.add(clave);
    posibles.push({ a: a, b: b, beneficio: 0.04 + 0.92 * r() });
  }

  // Paso 5.4: lo fijo del dibujo: el borde de cada unidad (azul) y su nombre
  centros.forEach(([x, y]) => el("circle", { cx: x, cy: y, r: 66, class: "trazo-azul", "stroke-width": 1.5 }, svg));
  nombres.forEach(([n, x, y]) => texto(svg, x, y, n, "", "middle"));
  const capaCruces = el("g", {}, svg), capaFija = el("g", {}, svg);
  internos.forEach(([a, b]) => el("line", { x1: nodos[a].x, y1: nodos[a].y, x2: nodos[b].x, y2: nodos[b].y, class: "trazo-gris" }, capaFija));
  nodos.forEach((n) => el("circle", { cx: n.x, cy: n.y, r: 6, class: "relleno-gris", stroke: "var(--papel)", "stroke-width": 2 }, capaFija));

  // modularidad(): Q de Newman con las 3 unidades como grupos.
  //   Q compara los enlaces dentro de cada grupo con los que habría por azar:
  //   más alto = grupos más separados
  function modularidad(cruces) {
    const L = internos.length + cruces.length;
    const grado = [0, 0, 0];
    internos.forEach(([a]) => (grado[nodos[a].g] += 2));
    cruces.forEach((c) => { grado[nodos[c.a].g] += 1; grado[nodos[c.b].g] += 1; });
    return [0, 1, 2].reduce((q, g) => q + 9 / L - (grado[g] / (2 * L)) ** 2, 0);
  }

  // dibujar(): conserva los enlaces que valen más que el costo y los dibuja en naranja
  function dibujar() {
    const costo = Number(document.getElementById("g5-costo").value) / 100;
    const cruces = posibles.filter((p) => p.beneficio > costo);
    capaCruces.replaceChildren();
    cruces.forEach((c) => {
      const A = nodos[c.a], B = nodos[c.b];
      el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "trazo-naranja", "stroke-width": 1.5 }, capaCruces);
      const zona = el("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y, class: "toque" }, capaCruces);
      const mensaje = `Beneficio ${fmt(c.beneficio, 2)} &gt; costo ${fmt(costo, 2)}: el enlace se conserva`;
      zona.addEventListener("mousemove", (e) => mostrarTip(e, mensaje));
      zona.addEventListener("mouseleave", ocultarTip);
    });
    document.getElementById("g5-lectura").textContent =
      `Enlaces que cruzan unidades: ${cruces.length} de 30. ` +
      `Modularidad Q: ${fmt(modularidad(cruces), 2)} (más alto = unidades más separadas).`;
  }
  document.getElementById("g5-costo").addEventListener("input", dibujar);
  dibujar();
})();


// ============================================================
// GRÁFICO 6: Transición mayor
// Insumo:    cuatro partes, antes y después de la transición
// Resultado: a la izquierda, partes con su propia información (azul);
//            a la derecha, un todo con un canal común (naranja)
// ============================================================
(function grafico6() {
  const svg = lienzo("g6", 640, 280,
    "Antes: cuatro partes separadas, cada una con su información. Después: un todo con un canal común");
  const antes = [[95, 85], [175, 85], [95, 165], [175, 165]];
  const despues = [[436, 91], [504, 91], [436, 159], [504, 159]];

  texto(svg, 135, 24, "Antes", "negrita", "middle");
  texto(svg, 470, 24, "Después", "negrita", "middle");

  // Paso 6.1: antes: cuatro partes sueltas, cada una con su punto de información
  antes.forEach(([x, y]) => {
    el("circle", { cx: x, cy: y, r: 30, class: "caja" }, svg);
    el("circle", { cx: x, cy: y, r: 7, class: "relleno-azul" }, svg);
  });
  texto(svg, 135, 238, "Cada parte guarda\nsu propia información", "suave", "middle");

  // Paso 6.2: la flecha de la transición
  el("line", { x1: 238, y1: 125, x2: 350, y2: 125, class: "trazo-gris", "marker-end": "url(#g6-flecha-gris)" }, svg);
  texto(svg, 294, 112, "transición", "suave", "middle");

  // Paso 6.3: después: un borde común, enlaces al centro y un canal compartido
  el("circle", { cx: 470, cy: 125, r: 92, class: "caja" }, svg);
  despues.forEach(([x, y]) => {
    el("circle", { cx: x, cy: y, r: 30, class: "caja" }, svg);
    // enlace desde el centro de cada parte hasta el canal común
    el("line", { x1: x, y1: y, x2: 470, y2: 125, class: "trazo-naranja" }, svg);
    el("circle", { cx: x, cy: y, r: 4, class: "relleno-naranja" }, svg);
  });
  el("circle", { cx: 470, cy: 125, r: 12, class: "relleno-naranja", stroke: "var(--papel)", "stroke-width": 2 }, svg);
  texto(svg, 470, 248, "Un canal común: el éxito\ndel todo es el de cada parte", "suave", "middle");
})();


// ============================================================
// GRÁFICO 7: Ley de escala (curvas teóricas)
// Insumo:    tamaños de 4 a 256 unidades
// Método:    tres reglas de crecimiento, todas iguales a 1 con 4 unidades
// Resultado: un gráfico en escala logarítmica, con lectura al pasar el
//            cursor y una tabla con los mismos valores
// ============================================================
(function grafico7() {
  const svg = lienzo("g7", 640, 385,
    "Tres curvas teóricas de carga de coordinación según el tamaño, en escala logarítmica");
  const X0 = 74, X1 = 460, Y0 = 330, Y1 = 30;
  const sx = (n) => X0 + ((Math.log2(n) - 2) / 6) * (X1 - X0);   // 4 → X0, 256 → X1
  const sy = (v) => Y0 - (Math.log10(v) / 4) * (Y0 - Y1);         // 1 → Y0, 10 000 → Y1

  // Paso 7.1: las tres reglas (índice: 4 unidades = 1)
  const reglas = [
    { nombre: "Proporcional", f: (n) => n / 4, clase: "trazo-gris", relleno: "relleno-gris" },
    { nombre: "Cuadrática (bacterias)", f: (n) => (n / 4) ** 2, clase: "trazo-azul", relleno: "relleno-azul" },
    { nombre: "Canales n(n−1)/2", f: (n) => (n * (n - 1)) / 12, clase: "trazo-naranja", relleno: "relleno-naranja" },
  ];

  // Paso 7.2: cuadrícula suave, marcas y nombres de los ejes
  [1, 10, 100, 1000, 10000].forEach((v) => {
    el("line", { x1: X0, y1: sy(v), x2: X1, y2: sy(v), stroke: "var(--linea)", "stroke-width": 1 }, svg);
    texto(svg, X0 - 8, sy(v) + 5, fmt(v), "suave", "end");
  });
  [4, 8, 16, 32, 64, 128, 256].forEach((n) => texto(svg, sx(n), Y0 + 22, String(n), "suave", "middle"));
  el("line", { x1: X0, y1: Y0, x2: X1, y2: Y0, class: "trazo-gris" }, svg);
  texto(svg, (X0 + X1) / 2, Y0 + 48, "Tamaño de la entidad (n.º de unidades)", "suave", "middle");
  const ejeY = texto(svg, 0, 0, "Carga de coordinación (índice)", "suave", "middle");
  ejeY.setAttribute("transform", `translate(18,${(Y0 + Y1) / 2}) rotate(-90)`);

  // Paso 7.3: cada curva, con su nombre al final (sin depender del color)
  const tamanos = [];
  for (let n = 4; n <= 256; n++) tamanos.push(n);
  const posicionNombre = { "Proporcional": 5, "Cuadrática (bacterias)": 20, "Canales n(n−1)/2": -8 };
  reglas.forEach((r) => {
    const d = tamanos.map((n, i) => `${i ? "L" : "M"}${sx(n).toFixed(1)},${sy(r.f(n)).toFixed(1)}`).join(" ");
    el("path", { d: d, class: r.clase }, svg);
    texto(svg, X1 + 8, sy(r.f(256)) + posicionNombre[r.nombre], r.nombre, "", "start");
  });

  // Paso 7.4: lectura al pasar el cursor: línea vertical y valores en el tamaño más cercano
  const guia = el("g", { visibility: "hidden" }, svg);
  const linea = el("line", { y1: Y1, y2: Y0, class: "trazo-gris", "stroke-width": 1 }, guia);
  const puntos = reglas.map((r) => el("circle", { r: 4, class: r.relleno, stroke: "var(--papel)", "stroke-width": 2 }, guia));
  const zona = el("rect", { x: X0, y: Y1, width: X1 - X0, height: Y0 - Y1, class: "zona-activa" }, svg);
  zona.addEventListener("mousemove", (e) => {
    const caja = svg.getBoundingClientRect();
    const xVista = ((e.clientX - caja.left) / caja.width) * 640;
    const potencia = Math.round(((xVista - X0) / (X1 - X0)) * 6 + 2);
    const n = 2 ** Math.min(8, Math.max(2, potencia));
    linea.setAttribute("x1", sx(n)); linea.setAttribute("x2", sx(n));
    reglas.forEach((r, i) => { puntos[i].setAttribute("cx", sx(n)); puntos[i].setAttribute("cy", sy(r.f(n))); });
    guia.setAttribute("visibility", "visible");
    mostrarTip(e, `<b>${n} unidades</b><br>` + reglas.map((r) => `${r.nombre}: ${fmt(r.f(n), 0)}`).join("<br>"));
  });
  zona.addEventListener("mouseleave", () => { guia.setAttribute("visibility", "hidden"); ocultarTip(); });

  // Paso 7.5: la tabla con los mismos valores
  const tabla = document.getElementById("g7-tabla");
  tabla.innerHTML = "<tr><th>Unidades</th>" + reglas.map((r) => `<th>${r.nombre}</th>`).join("") + "</tr>" +
    [4, 8, 16, 32, 64, 128, 256].map((n) =>
      `<tr><td>${n}</td>` + reglas.map((r) => `<td>${fmt(r.f(n), 0)}</td>`).join("") + "</tr>").join("");
})();


// ============================================================
// GRÁFICO 8: ¿Copia o convergencia? Dos árboles de parecido
// Insumo:    6 entidades hipotéticas (sector y año de su ROF)
// Resultado: dos árboles con la misma forma; cambia qué se agrupa:
//            por plantilla (copia, azul) o por sector (convergencia, naranja)
// ============================================================
(function grafico8() {
  const svg = lienzo("g8", 640, 276,
    "Dos árboles: si los organigramas se agrupan por plantilla es copia; si se agrupan por sector es convergencia");

  // arbol(): dibuja un árbol horizontal (raíz a la izquierda, hojas a la derecha)
  //   Antes: 6 nombres | Después: dos grupos de 3 unidos en una raíz
  function arbol(x0, titulo, hojas, grupos, claseGrupo) {
    const xH = x0 + 195;                               // x de las hojas
    const yH = hojas.map((_, i) => 80 + i * 30 + (i >= 3 ? 24 : 0)); // y de cada hoja (con aire entre grupos)
    texto(svg, x0 + 10, 24, titulo, "negrita");

    const nodosGrupo = [0, 3].map((k, j) => {
      // par (k, k+1) y luego el tercero (k+2)
      const xPar = xH - 35, yPar = (yH[k] + yH[k + 1]) / 2;
      const xGrupo = xH - 75, yGrupo = (yPar + yH[k + 2]) / 2;
      el("path", { d: `M${xH},${yH[k]} H${xPar} V${yH[k + 1]} H${xH}`, class: claseGrupo }, svg);
      el("path", { d: `M${xPar},${yPar} H${xGrupo} V${yH[k + 2]} H${xH}`, class: claseGrupo }, svg);
      texto(svg, xGrupo + 4, yH[k] - 13, grupos[j], "", "start");
      return [xGrupo, yGrupo];
    });
    // raíz (gris): une los dos grupos
    const xRaiz = xH - 140;
    el("path", { d: `M${nodosGrupo[0][0]},${nodosGrupo[0][1]} H${xRaiz} V${nodosGrupo[1][1]} H${nodosGrupo[1][0]}`, class: "trazo-gris" }, svg);
    // hojas: un punto y su nombre
    hojas.forEach((h, i) => {
      el("circle", { cx: xH, cy: yH[i], r: 4, class: "relleno-gris" }, svg);
      texto(svg, xH + 9, yH[i] + 5, h, "", "start");
    });
  }

  arbol(0, "Si es copia",
    ["S1 · 2010", "E1 · 2010", "S2 · 2010", "E2 · 2020", "S3 · 2020", "E3 · 2020"],
    ["Plantilla de 2010", "Plantilla de 2020"], "trazo-azul");
  arbol(325, "Si es convergencia",
    ["S1 · 2010", "S2 · 2010", "S3 · 2020", "E1 · 2010", "E2 · 2020", "E3 · 2020"],
    ["Sector social", "Sector económico"], "trazo-naranja");
})();
