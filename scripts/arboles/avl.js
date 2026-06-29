export class NodoAVL {
  constructor(contacto) {
    this.contacto = contacto;
    this.id = contacto.id;
    this.izquierdo = null;
    this.derecho = null;
    this.altura = 1; 
  }
}

export class ArbolAVL {
  constructor() {
    this.raiz = null;
  }

  _altura(nodo) {
    return nodo === null ? 0 : nodo.altura;
  }

  _factorBalance(nodo) {
    return nodo === null ? 0 : this._altura(nodo.izquierdo) - this._altura(nodo.derecho);
  }

  _actualizarAltura(nodo) {
    nodo.altura = 1 + Math.max(this._altura(nodo.izquierdo), this._altura(nodo.derecho));
  }

  _rotarDerecha(y) {
    const x = y.izquierdo;
    const T2 = x.derecho;

    x.derecho = y;
    y.izquierdo = T2;

    this._actualizarAltura(y);
    this._actualizarAltura(x);

    return x; 
  }


  _rotarIzquierda(x) {
    const y = x.derecho;
    const T2 = y.izquierdo;

    y.izquierdo = x;
    x.derecho = T2;

    this._actualizarAltura(x);
    this._actualizarAltura(y);

    return y;
  }


  insertar(contacto) {
    this.raiz = this._insertarDesde(this.raiz, contacto);
  }

  _insertarDesde(nodo, contacto) {
    if (nodo === null) {
      return new NodoAVL(contacto);
    }

    if (contacto.id < nodo.id) {
      nodo.izquierdo = this._insertarDesde(nodo.izquierdo, contacto);
    } else if (contacto.id > nodo.id) {
      nodo.derecho = this._insertarDesde(nodo.derecho, contacto);
    } else {
      return nodo; 
    }
    this._actualizarAltura(nodo);

    const balance = this._factorBalance(nodo);
    if (balance > 1 && contacto.id < nodo.izquierdo.id) {
      return this._rotarDerecha(nodo);
    }
    if (balance < -1 && contacto.id > nodo.derecho.id) {
      return this._rotarIzquierda(nodo);
    }
    if (balance > 1 && contacto.id > nodo.izquierdo.id) {
      nodo.izquierdo = this._rotarIzquierda(nodo.izquierdo);
      return this._rotarDerecha(nodo);
    }
    if (balance < -1 && contacto.id < nodo.derecho.id) {
      nodo.derecho = this._rotarDerecha(nodo.derecho);
      return this._rotarIzquierda(nodo);
    }

    return nodo; 
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