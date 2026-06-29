export class NodoBST {
  constructor(contacto) {
    this.contacto = contacto;  
    this.id = contacto.id;      
    this.izquierdo = null;
    this.derecho = null;
  }
}

export class ArbolBST {
  constructor() {
    this.raiz = null;
  }

  insertar(contacto) {
    const nuevoNodo = new NodoBST(contacto);

    if (this.raiz === null) {
      this.raiz = nuevoNodo;
      return;
    }

    this._insertarDesde(this.raiz, nuevoNodo);
  }

  _insertarDesde(nodoActual, nuevoNodo) {
    if (nuevoNodo.id < nodoActual.id) {
      if (nodoActual.izquierdo === null) {
        nodoActual.izquierdo = nuevoNodo;
      } else {
        this._insertarDesde(nodoActual.izquierdo, nuevoNodo);
      }
    } else if (nuevoNodo.id > nodoActual.id) {
      if (nodoActual.derecho === null) {
        nodoActual.derecho = nuevoNodo;
      } else {
        this._insertarDesde(nodoActual.derecho, nuevoNodo);
      }
    }
  }

  construirDesde(contactos) {
    this.raiz = null;
    contactos.forEach((contacto) => this.insertar(contacto));
  }

  buscar(id) {
    let actual = this.raiz;
    while (actual !== null) {
      if (id === actual.id) return actual.contacto;
      actual = id < actual.id ? actual.izquierdo : actual.derecho;
    }
    return null;
  }

  inOrder() {
    const resultado = [];
    const recorrer = (nodo) => {
      if (nodo === null) return;
      recorrer(nodo.izquierdo);
      resultado.push(nodo.contacto);
      recorrer(nodo.derecho);
    };
    recorrer(this.raiz);
    return resultado;
  }

  altura(nodo = this.raiz) {
    if (nodo === null) return -1;
    return 1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));
  }

  contarNodos(nodo = this.raiz) {
    if (nodo === null) return 0;
    return 1 + this.contarNodos(nodo.izquierdo) + this.contarNodos(nodo.derecho);
  }
}