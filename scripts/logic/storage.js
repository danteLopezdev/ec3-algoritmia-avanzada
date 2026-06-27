const STORAGE_KEY = "agenda_contactos";
const JSON_PATH = "../../data/contactos.json"; 

export async function cargarContactos() {
  const guardado = localStorage.getItem(STORAGE_KEY);

  if (guardado) {
    try {
      return JSON.parse(guardado);
    } catch (error) {
      console.error("Error al parsear localStorage, se recargará desde JSON:", error);
    }
  }

  const respuesta = await fetch(JSON_PATH);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar ${JSON_PATH}: ${respuesta.status}`);
  }
  const datosIniciales = await respuesta.json();

  guardarContactos(datosIniciales);
  return datosIniciales;
}

export function guardarContactos(contactos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contactos));
}

export async function restablecerDesdeJSON() {
  localStorage.removeItem(STORAGE_KEY);
  return cargarContactos();
}