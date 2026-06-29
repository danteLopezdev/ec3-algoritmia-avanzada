const RADIO_NODO = 22;
const ESPACIO_VERTICAL = 80; 
const ESPACIO_HORIZONTAL = 60; 
const MARGEN_SUPERIOR = 40;

function calcularPosiciones(raiz) {
  const posiciones = new Map();
  let contadorInOrder = 0; 
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
 * @param {Set} idsResaltados 
 */
export function dibujarArbol(canvas, raiz, idsResaltados = new Set()) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (raiz === null) {
    ctx.font = "16px system-ui";
    ctx.fillStyle = "#888";
    ctx.fillText("Árbol vacío", 20, 30);
    return;
  }

  const posiciones = calcularPosiciones(raiz);

  const cantidadNodos = posiciones.size;
  const anchoNecesario = MARGEN_SUPERIOR * 2 + cantidadNodos * ESPACIO_HORIZONTAL;
  if (anchoNecesario > canvas.width) {
    canvas.width = anchoNecesario;
  }

  dibujarConexiones(ctx, raiz, posiciones);

  posiciones.forEach((posicion, nodo) => {
    dibujarNodo(ctx, nodo, posicion, idsResaltados.has(nodo.id));
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

function dibujarNodo(ctx, nodo, posicion, resaltado) {
  const { x, y } = posicion;
  let colorRelleno = "#9133e9";
  if (nodo.color === "ROJO") colorRelleno = "#e63946";
  if (nodo.color === "NEGRO") colorRelleno = "#2b2d42";
  if (resaltado) colorRelleno = "#ffd166";

  ctx.beginPath();
  ctx.arc(x, y, RADIO_NODO, 0, Math.PI * 2);
  ctx.fillStyle = colorRelleno;
  ctx.fill();
  ctx.strokeStyle = "#2b2d42";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = resaltado ? "#2b2d42" : "#fff";
  ctx.font = "bold 14px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(nodo.id, x, y);
}