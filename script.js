document.addEventListener("DOMContentLoaded", () => {

  /* DATOS */

  const servicios = [
    { id: 1, nombre: "Chatbot WhatsApp Básico", precio: 15000, categoria: "chatbot", descripcion: "Automatización básica." },
    { id: 2, nombre: "Chatbot WhatsApp Avanzado", precio: 30000, categoria: "chatbot", descripcion: "IA y flujos avanzados." },
    { id: 3, nombre: "Página Web Estática", precio: 25000, categoria: "web", descripcion: "Web moderna y responsive." },
    { id: 4, nombre: "Página Web Dinámica", precio: 45000, categoria: "web", descripcion: "JS y lógica avanzada." },
    { id: 5, nombre: "Corrección de Errores Web", precio: 12000, categoria: "web", descripcion: "Solución de bugs." },
    { id: 6, nombre: "Mantenimiento Mensual", precio: 10000, categoria: "web", descripcion: "Soporte continuo." },
    { id: 7, nombre: "Optimización Web", precio: 18000, categoria: "web", descripcion: "Mejor rendimiento." }
  ];

  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contenedor = document.getElementById("contenedorServicios");
  const carritoItems = document.getElementById("carritoItems");
  const totalCarrito = document.getElementById("totalCarrito");
  const btnVaciar = document.getElementById("vaciarCarrito");
  const btnComprar = document.getElementById("btnComprar");
  const contadorCarrito = document.getElementById("contadorCarrito");

  /* CONTADOR + ANIMACIÓN */

  function actualizarContador(animar = false) {
    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorCarrito.textContent = totalCantidad;

    if (animar) {
      contadorCarrito.classList.remove("pop");
      void contadorCarrito.offsetWidth; // reflow
      contadorCarrito.classList.add("pop");
    }
  }

  /* RENDER SERVICIOS */

  function renderServicios(lista) {
    contenedor.innerHTML = "";

    lista.forEach(servicio => {
      const col = document.createElement("div");
      col.className = "col-md-4";

      col.innerHTML = `
        <div class="servicio-card">
          <h5>${servicio.nombre}</h5>
          <p class="servicio-precio">$${servicio.precio}</p>

          <button data-id="${servicio.id}">
            Comprar $${servicio.precio}
          </button>

          <div class="servicio-descripcion">
            <p>${servicio.descripcion}</p>
          </div>
        </div>
      `;

      contenedor.appendChild(col);
    });

    activarBotonesCompra();
  }

  /* AGREGAR AL CARRITO (SIN DUPLICADOS) */

  function activarBotonesCompra() {
    document.querySelectorAll(".servicio-card button").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = Number(e.target.dataset.id);
        const servicio = servicios.find(s => s.id === id);

        const existente = carrito.find(item => item.id === id);

        if (existente) {
          existente.cantidad++;
        } else {
          carrito.push({ ...servicio, cantidad: 1 });
        }

        guardarCarrito();
        renderCarrito();
        actualizarContador(true);

        Swal.fire({
          icon: "success",
          title: "Servicio agregado",
          text: `${servicio.nombre} fue añadido al carrito`,
          timer: 1300,
          showConfirmButton: false
        });
      });
    });
  }

  /* CARRITO */

  function renderCarrito() {
    carritoItems.innerHTML = "";

    if (carrito.length === 0) {
      carritoItems.innerHTML = "<p>Carrito vacío</p>";
      totalCarrito.textContent = "";
      actualizarContador();
      return;
    }

    let total = 0;

    carrito.forEach(servicio => {
      total += servicio.precio * servicio.cantidad;

      const div = document.createElement("div");
      div.className = "item-carrito";

      div.innerHTML = `
        <span>
          ${servicio.nombre} 
          x${servicio.cantidad} 
          - $${servicio.precio * servicio.cantidad}
        </span>
        <button class="btn-x" data-id="${servicio.id}">✕</button>
      `;

      carritoItems.appendChild(div);
    });

    totalCarrito.textContent = `Total: $${total}`;

    document.querySelectorAll(".btn-x").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = Number(e.target.dataset.id);
        carrito = carrito.filter(item => item.id !== id);
        guardarCarrito();
        renderCarrito();
        actualizarContador();
      });
    });
  }

  btnVaciar.addEventListener("click", () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
    actualizarContador();
  });

  /* COMPRAR */

  btnComprar.addEventListener("click", () => {

    if (carrito.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "Agregá al menos un servicio"
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Compra realizada con éxito",
      text: "Gracias por confiar en NinoWS 💻🚀"
    });

    carrito = [];
    guardarCarrito();
    renderCarrito();
    actualizarContador();
  });

  function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }

  /* FILTROS */

  document.querySelectorAll(".filtros button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filtros button")
        .forEach(b => b.classList.remove("activo"));

      btn.classList.add("activo");

      const texto = btn.textContent;

      if (texto === "Todos") {
        renderServicios(servicios);
      } else if (texto === "Web") {
        renderServicios(servicios.filter(s => s.categoria === "web"));
      } else {
        renderServicios(servicios.filter(s => s.categoria === "chatbot"));
      }
    });
  });

  /* INIT */

  renderServicios(servicios);
  renderCarrito();
  actualizarContador();
});
