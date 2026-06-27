import {
  inicializarContactos,
  obtenerContactos,
  crearContacto,
  actualizarContacto,
  eliminarContacto,
} from "./contactos.js";


const form = document.getElementById("form-contacto");
const inputId = document.getElementById("contacto-id");
const inputNombre = document.getElementById("input-nombre");
const inputApellido = document.getElementById("input-apellido");
const inputTelefono = document.getElementById("input-telefono");
const inputCorreo = document.getElementById("input-correo");
const tituloFormulario = document.getElementById("titulo-formulario");
const btnCancelar = document.getElementById("btn-cancelar");
const cuerpoTabla = document.getElementById("cuerpo-tabla");

// --- Arranque de la app ---
async function iniciar() {
  await inicializarContactos();
  renderizarTabla();
}

function renderizarTabla() {
  const contactos = obtenerContactos();
  cuerpoTabla.innerHTML = ""; // limpiar antes de redibujar

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
    }
  }
});

// --- Arrancar la app ---
iniciar();