export const ROJO = "ROJO";
export const NEGRO = "NEGRO";

export class NodoRB {
  constructor(contacto) {
    this.contacto = contacto;
    this.id = contacto.id;
    this.izquierdo = null;
    this.derecho = null;
    this.padre = null;
    this.color = ROJO;
  }
}

export class ArbolRB {
  constructor() {
    this.raiz = null;
  }

  _esRojo(nodo) {
    return nodo !== null && nodo.color === ROJO;
  }

  _rotarIzquierda(nodo) {
    const derechoDelNodo = nodo.derecho;

    nodo.derecho = derechoDelNodo.izquierdo;
    if (derechoDelNodo.izquierdo !== null) {
      derechoDelNodo.izquierdo.padre = nodo;
    }

    derechoDelNodo.padre = nodo.padre;
    if (nodo.padre === null) {
      this.raiz = derechoDelNodo;
    } else if (nodo === nodo.padre.izquierdo) {
      nodo.padre.izquierdo = derechoDelNodo;
    } else {
      nodo.padre.derecho = derechoDelNodo;
    }

    derechoDelNodo.izquierdo = nodo;
    nodo.padre = derechoDelNodo;
  }
  _rotarDerecha(nodo) {
    const izquierdoDelNodo = nodo.izquierdo;

    nodo.izquierdo = izquierdoDelNodo.derecho;
    if (izquierdoDelNodo.derecho !== null) {
      izquierdoDelNodo.derecho.padre = nodo;
    }

    izquierdoDelNodo.padre = nodo.padre;
    if (nodo.padre === null) {
      this.raiz = izquierdoDelNodo;
    } else if (nodo === nodo.padre.derecho) {
      nodo.padre.derecho = izquierdoDelNodo;
    } else {
      nodo.padre.izquierdo = izquierdoDelNodo;
    }

    izquierdoDelNodo.derecho = nodo;
    nodo.padre = izquierdoDelNodo;
  }

  insertar(contacto) {
    const nuevoNodo = new NodoRB(contacto);
    let padre = null;
    let actual = this.raiz;

    while (actual !== null) {
      padre = actual;
      if (nuevoNodo.id < actual.id) {
        actual = actual.izquierdo;
      } else if (nuevoNodo.id > actual.id) {
        actual = actual.derecho;
      } else {
        return;
      }
    }

    nuevoNodo.padre = padre;
    if (padre === null) {
      this.raiz = nuevoNodo; 
    } else if (nuevoNodo.id < padre.id) {
      padre.izquierdo = nuevoNodo;
    } else {
      padre.derecho = nuevoNodo;
    }

    
    this._repararInsercion(nuevoNodo);
  }

  _repararInsercion(nodo) {
    while (this._esRojo(nodo.padre)) {
      const padre = nodo.padre;
      const abuelo = padre.padre;

      if (padre === abuelo.izquierdo) {
        const tio = abuelo.derecho;

        if (this._esRojo(tio)) {
          padre.color = NEGRO;
          tio.color = NEGRO;
          abuelo.color = ROJO;
          nodo = abuelo;
        } else {
          if (nodo === padre.derecho) {
            nodo = padre;
            this._rotarIzquierda(nodo);
          }
          nodo.padre.color = NEGRO;
          abuelo.color = ROJO;
          this._rotarDerecha(abuelo);
        }
      } else {
        const tio = abuelo.izquierdo;

        if (this._esRojo(tio)) {
          padre.color = NEGRO;
          tio.color = NEGRO;
          abuelo.color = ROJO;
          nodo = abuelo;
        } else {
          if (nodo === padre.izquierdo) {
            nodo = padre;
            this._rotarDerecha(nodo);
          }
          nodo.padre.color = NEGRO;
          abuelo.color = ROJO;
          this._rotarIzquierda(abuelo);
        }
      }

      if (nodo === this.raiz) break;
    }

    this.raiz.color = NEGRO;
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

  contarNodos(nodo = this.raiz) {
    if (nodo === null) return 0;
    return 1 + this.contarNodos(nodo.izquierdo) + this.contarNodos(nodo.derecho);
  }
}