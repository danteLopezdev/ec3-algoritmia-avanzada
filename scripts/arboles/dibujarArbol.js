const RADIO_NODO = 22;
const ESPACIO_VERTICAL = 80; 
const ESPACIO_HORIZONTAL = 60; 
const MARGEN_SUPERIOR = 40;

function calcularPosiciones(raiz) {
  const posiciones = new Map();
  let contadorInOrder = 0; // se incrementa en cada nodo visitado, de izquierda a derecha

  function recorrer(nodo, profundidad) {
    if (nodo === null) return;

    recorrer(nodo.izquierdo, profundidad + 1);

    const x = MARGEN_SUPERIOR + contadorInOrder * ESPACIO_HORIZONTAL;
    const y = MARGEN_SUPERIOR + profundidad * ESPACIO_VERTICAL;
    posiciones.set(nodo, { x, y });
    contadorInOrder++;

    recorrer(nodo.derecho, profundidad + 1);
  }

  recorrer(raiz, 0);
  return posiciones;
}

/**
 * Dibuja el árbol completo en el canvas indicado.
 * @param {HTMLCanvasElement} canvas
 * @param {NodoBST|null} raiz
 * @param {Set} idsResaltados - nodo actual de la animación (amarillo)
 * @param {Set} idsVisitados  - nodos ya recorridos (color tenue)
 */
export function dibujarArbol(canvas, raiz, idsResaltados = new Set(), idsVisitados = new Set()) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (raiz === null) {
    ctx.font = "16px system-ui";
    ctx.fillStyle = "#888";
    ctx.fillText("Árbol vacío", 20, 30);
    return;
  }

  const posiciones = calcularPosiciones(raiz);

  // Ajustar el ancho del canvas según cuántos nodos hay, para que no se amontonen
  const cantidadNodos = posiciones.size;
  const anchoNecesario = MARGEN_SUPERIOR * 2 + cantidadNodos * ESPACIO_HORIZONTAL;
  if (anchoNecesario > canvas.width) {
    canvas.width = anchoNecesario;
  }

  dibujarConexiones(ctx, raiz, posiciones);

  posiciones.forEach((posicion, nodo) => {
    dibujarNodo(ctx, nodo, posicion, idsResaltados.has(nodo.id), idsVisitados.has(nodo.id));
  });
}

function dibujarConexiones(ctx, nodo, posiciones) {
  if (nodo === null) return;
  const posActual = posiciones.get(nodo);

  if (nodo.izquierdo !== null) {
    const posHijo = posiciones.get(nodo.izquierdo);
    dibujarLinea(ctx, posActual, posHijo);
    dibujarConexiones(ctx, nodo.izquierdo, posiciones);
  }

  if (nodo.derecho !== null) {
    const posHijo = posiciones.get(nodo.derecho);
    dibujarLinea(ctx, posActual, posHijo);
    dibujarConexiones(ctx, nodo.derecho, posiciones);
  }
}

function dibujarLinea(ctx, desde, hasta) {
  ctx.beginPath();
  ctx.moveTo(desde.x, desde.y);
  ctx.lineTo(hasta.x, hasta.y);
  ctx.strokeStyle = "#999";
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

function dibujarNodo(ctx, nodo, posicion, resaltado, visitado) {
  const { x, y } = posicion;

  let colorRelleno = "#4361ee";
  if (nodo.color === "ROJO") colorRelleno = "#e63946";
  if (nodo.color === "NEGRO") colorRelleno = "#2b2d42";
  if (visitado) colorRelleno = "#a8b0d8";   // azul tenue: ya fue visitado
  if (resaltado) colorRelleno = "#ffd166";  // amarillo: nodo actual

  // Círculo del nodo
  ctx.beginPath();
  ctx.arc(x, y, RADIO_NODO, 0, Math.PI * 2);
  ctx.fillStyle = colorRelleno;
  ctx.fill();
  ctx.strokeStyle = resaltado ? "#f4a261" : "#2b2d42";
  ctx.lineWidth = resaltado ? 3 : 2;
  ctx.stroke();

  // Texto del id, centrado
  ctx.fillStyle = resaltado ? "#2b2d42" : "#fff";
  ctx.font = resaltado ? "bold 15px system-ui" : "bold 14px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(nodo.id, x, y);
}