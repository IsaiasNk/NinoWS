
alert("Bienvenido a la Tienda NinoWS!");

let nombre = prompt("¿Cuál es tu nombre?");
alert("Hola " + nombre);

// Carrito desde localStorage o vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = 0;

// DOM
const listaCarrito = document.getElementById("carrito");
const totalSpan = document.getElementById("total");

// Productos
const productos = {
  remera: { nombre: "Remera", precio: 5000 },
  gorra: { nombre: "Gorra", precio: 3000 },
  zapatillas: { nombre: "Zapatillas", precio: 10000 },
};

// Mostrar carrito
function renderCarrito() {
  listaCarrito.innerHTML = "";
  total = 0;

 carrito.forEach((prod, index) => {
  const li = document.createElement("li");
li.innerHTML = `
  ${prod.nombre} - $${prod.precio}
  <button class="btn btn-sm btn-outline-danger ms-2">X</button>
`;

li.querySelector("button").addEventListener("click", () => {
  carrito.splice(index, 1);
  renderCarrito();
});

listaCarrito.appendChild(li);

    total += prod.precio;
  });

  totalSpan.textContent = total;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Eventos
document.getElementById("remera").addEventListener("click", () => {
  carrito.push(productos.remera);
  renderCarrito();
});

document.getElementById("gorra").addEventListener("click", () => {
  carrito.push(productos.gorra);
  renderCarrito();
});

document.getElementById("zapatillas").addEventListener("click", () => {
  carrito.push(productos.zapatillas);
  renderCarrito();
});

// Inicializar
renderCarrito();

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = [];
  localStorage.removeItem("carrito");
  renderCarrito();
});

