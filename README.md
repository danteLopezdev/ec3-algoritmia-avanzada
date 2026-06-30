# 📇 EC3_ALGORITMIA — Agenda de Contactos con Visualización de Árboles

Proyecto final (EC3) del curso **Algoritmos y Estructuras de Datos Avanzadas** — Universidad Científica del Sur, Ingeniería de Software, Ciclo 2026-1.

Sistema de gestión de contactos que permite crear, organizar y visualizar contactos almacenados en distintas estructuras de árboles (BST, AVL y Red-Black), junto con la animación de algoritmos de recorrido **BFS** y **DFS**.

---

## ✨ Características

- **CRUD completo de contactos**, organizados por carpetas/categorías.
- **Persistencia de datos** en formato JSON (`data/contactos.json`).
- **Visualización interactiva de árboles** dibujados directamente en `<canvas>`, sin librerías externas:
  - 🌳 Árbol Binario de Búsqueda (BST)
  - ⚖️ Árbol AVL (auto-balanceado)
  - 🔴⚫ Árbol Rojo-Negro (Red-Black)
- **Animación de recorridos** sobre los árboles:
  - BFS (Breadth-First Search / recorrido por niveles)
  - DFS (Depth-First Search / recorrido en profundidad)

---

## 🛠️ Tecnologías utilizadas

- **JavaScript (Vanilla)** — lógica de estructuras de datos y manejo de UI
- **HTML5 Canvas** — renderizado de los árboles, sin librerías de visualización externas
- **CSS3** — estilos de la interfaz
- **JSON** — almacenamiento de los datos de contactos

---

## 📁 Estructura del proyecto

```
EC3_ALGORITMIA/
├── data/
│   └── contactos.json        # Datos persistidos de los contactos
├── scripts/
│   ├── arboles/
│   │   ├── avl.js             # Implementación del árbol AVL
│   │   ├── bst.js             # Implementación del árbol BST
│   │   ├── redblack.js        # Implementación del árbol Rojo-Negro
│   │   └── dibujarArbol.js    # Lógica de renderizado en canvas
│   └── logic/
│       ├── app.js             # Punto de entrada / orquestación de la app
│       ├── contactos.js       # Lógica de negocio de contactos
│       ├── recorridos.js      # Algoritmos BFS y DFS + animación
│       └── storage.js         # Lectura/escritura de datos (JSON)
├── styles/
│   └── index.css              # Estilos de la interfaz
├── index.html                 # Página principal
├── .gitignore
└── LICENSE
```

---

## 🚀 Cómo ejecutar el proyecto

1. Clona o descarga el repositorio.
2. Abre el archivo `index.html` en tu navegador (recomendado usar Live Server de VS Code para evitar restricciones de carga de JSON local).
3. ¡Listo! Desde la interfaz puedes agregar, editar, eliminar y visualizar contactos en los distintos árboles.

---

## 🌲 Estructuras y algoritmos implementados

| Estructura/Algoritmo | Archivo | Descripción |
|---|---|---|
| BST | `bst.js` | Inserción, eliminación y búsqueda sin balanceo |
| AVL | `avl.js` | Árbol auto-balanceado mediante rotaciones |
| Red-Black | `redblack.js` | Árbol balanceado mediante coloreo y rotaciones |
| BFS | `recorridos.js` | Recorrido por niveles, animado en canvas |
| DFS | `recorridos.js` | Recorrido en profundidad (pre/in/post-orden), animado en canvas |

---

## 👤 Autor

**Dante Lopez**
Estudiante de Ingeniería de Software — Universidad Científica del Sur (UCSUR)
Ciclo 2026-1 · Curso: Algoritmos y Estructuras de Datos Avanzadas

---

## 📄 Licencia

Este proyecto se distribuye bajo los términos especificados en el archivo [LICENSE](./LICENSE).
