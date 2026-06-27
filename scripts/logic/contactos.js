import { cargarContactos, guardarContactos } from "./storage.js";

let contactos = []; 

export async function inicializarContactos() {
  contactos = await cargarContactos();
  return contactos;
}


export function obtenerContactos() {
  return [...contactos];
}


export function obtenerContactoPorId(id) {
  return contactos.find((c) => c.id === id) || null;
}

export function crearContacto({ nombre, apellido, telefono, correo }) {
  const nuevoId = contactos.length > 0
    ? Math.max(...contactos.map((c) => c.id)) + 1
    : 1;

  const nuevoContacto = {
    id: nuevoId,
    nombre: nombre.trim(),
    apellido: apellido.trim(),
    telefono: telefono.trim(),
    correo: correo.trim(),
  };

  contactos.push(nuevoContacto);
  guardarContactos(contactos);
  return nuevoContacto;
}


export function actualizarContacto(id, datosNuevos) {
  const index = contactos.findIndex((c) => c.id === id);
  if (index === -1) return null;

  // El id nunca se sobreescribe con datosNuevos, para no romper los árboles
  contactos[index] = { ...contactos[index], ...datosNuevos, id };
  guardarContactos(contactos);
  return contactos[index];
}

export function eliminarContacto(id) {
  const tamanioAntes = contactos.length;
  contactos = contactos.filter((c) => c.id !== id);

  const seElimino = contactos.length < tamanioAntes;
  if (seElimino) guardarContactos(contactos);
  return seElimino;
}