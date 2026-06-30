import { dibujarArbol } from "../arboles/dibujarArbol.js";

const DELAY_MS = 900;

let animacionActiva = false; 

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function animarRecorrido(canvas, raiz, ordenNodos, onFin) {
  if (animacionActiva) return;
  animacionActiva = true;

  const visitados = new Set();

  for (const nodo of ordenNodos) {
    // Resaltar solo el nodo actual
    const resaltado = new Set([nodo.id]);
    dibujarArbol(canvas, raiz, resaltado, visitados);
    await esperar(DELAY_MS);

    // Moverlo a visitados para que quede con color tenue
    visitados.add(nodo.id);
  }

  dibujarArbol(canvas, raiz, new Set(), visitados);

  animacionActiva = false;
  if (onFin) onFin();
}


export async function bfs(canvas, raiz, onFin) {
  if (raiz === null) return;

  const orden = [];
  const cola = [raiz];

  while (cola.length > 0) {
    const nodo = cola.shift(); // sacar el primero de la cola
    orden.push(nodo);

    if (nodo.izquierdo !== null) cola.push(nodo.izquierdo);
    if (nodo.derecho !== null) cola.push(nodo.derecho);
  }

  await animarRecorrido(canvas, raiz, orden, onFin);
}

export async function dfs(canvas, raiz, onFin) {
  if (raiz === null) return;

  const orden = [];

  function inOrder(nodo) {
    if (nodo === null) return;
    inOrder(nodo.izquierdo);
    orden.push(nodo);
    inOrder(nodo.derecho);
  }

  inOrder(raiz);
  await animarRecorrido(canvas, raiz, orden, onFin);
}

export function cancelarAnimacion() {
  animacionActiva = false;
}