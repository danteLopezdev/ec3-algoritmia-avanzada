import {
  inicializarContactos,
  obtenerContactos,
  crearContacto,
  actualizarContacto,
  eliminarContacto,
} from "./contactos.js";

import { ArbolBST } from "../arboles/bst.js";
import { ArbolAVL } from "../arboles/avl.js";
import { ArbolRB } from "../arboles/redblack.js";
import { dibujarArbol } from "../arboles/dibujarArbol.js";


const arbolBST = new ArbolBST();
const arbolAVL = new ArbolAVL();
const arbolRB = new ArbolRB();
const canvasBST = document.getElementById("canvas-bst");
const canvasAVL = document.getElementById("canvas-avl");
const canvasRB = document.getElementById("canvas-rb");

function reconstruirArboles() {
  const contactos = obtenerContactos();

  arbolBST.construirDesde(contactos);
  dibujarArbol(canvasBST, arbolBST.raiz);

  arbolAVL.construirDesde(contactos);
  dibujarArbol(canvasAVL, arbolAVL.raiz);

  arbolRB.construirDesde(contactos);
  dibujarArbol(canvasRB, arbolRB.raiz);
}


const form = document.getElementById("form-contacto");
const inputId = document.getElementById("contacto-id");
const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const inputTelefono = document.getElementById("input-telefono");
const inputCorreo = document.getElementById("input-correo");
const tituloFormulario = document.getElementById("titulo-formulario");
const btnCancelar = document.getElementById("btn-cancelar");
const cuerpoTabla = document.getElementById("cuerpo-tabla");

const tabBtns = document.querySelectorAll(".tab-btn");
const vistas = {
  bst: document.getElementById("vista-bst"),
  avl: document.getElementById("vista-avl"),
  rb: document.getElementById("vista-rb"),
};

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("activo"));
    Object.values(vistas).forEach((v) => v.classList.add("oculto"));

    btn.classList.add("activo");
    vistas[btn.dataset.arbol].classList.remove("oculto");
  });
});


async function iniciar() {
  await inicializarContactos();
  renderizarTabla();
  reconstruirArboles();
}


function renderizarTabla() {
  const contactos = obtenerContactos();
  cuerpoTabla.innerHTML = ""; 

  contactos.forEach((contacto) => {
    const fila = document.createElement("tr");

    fila.innerHTML = `
      <td>${contacto.id}</td>
      <td>${contacto.nombre}</td>
      <td>${contacto.apellido}</td>
      <td>${contacto.telefono}</td>
      <td>${contacto.correo}</td>
      <td>
        <button class="btn-editar" data-id="${contacto.id}">Editar</button>
        <button class="btn-eliminar" data-id="${contacto.id}">Eliminar</button>
      </td>
    `;

    cuerpoTabla.appendChild(fila);
  });
}

function limpiarFormulario() {
  form.reset();
  inputId.value = "";
  tituloFormulario.textContent = "Nuevo contacto";
  btnCancelar.hidden = true;
}

function cargarContactoEnFormulario(contacto) {
  inputId.value = contacto.id;
  inputNombre.value = contacto.nombre;
  inputApellido.value = contacto.apellido;
  inputTelefono.value = contacto.telefono;
  inputCorreo.value = contacto.correo;

  tituloFormulario.textContent = `Editando a ${contacto.nombre} (ID ${contacto.id})`;
  btnCancelar.hidden = false;
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const datos = {
    nombre: inputNombre.value,
    apellido: inputApellido.value,
    telefono: inputTelefono.value,
    correo: inputCorreo.value,
  };

  const idEnEdicion = inputId.value;

  if (idEnEdicion) {
    actualizarContacto(Number(idEnEdicion), datos);
  } else {
    crearContacto(datos);
  }

  limpiarFormulario();
  renderizarTabla();
  reconstruirArboles();
});


btnCancelar.addEventListener("click", () => {
  limpiarFormulario();
});


cuerpoTabla.addEventListener("click", (evento) => {
  const id = Number(evento.target.dataset.id);
  if (!id) return; 
  if (evento.target.classList.contains("btn-editar")) {
    const contactos = obtenerContactos();
    const contacto = contactos.find((c) => c.id === id);
    if (contacto) cargarContactoEnFormulario(contacto);
  }

  if (evento.target.classList.contains("btn-eliminar")) {
    const confirmar = confirm(`¿Eliminar el contacto con ID ${id}?`);
    if (confirmar) {
      eliminarContacto(id);
      renderizarTabla();
      reconstruirArboles();
    }
  }
});

// --- Arrancar la app ---
iniciar();