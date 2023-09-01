const tablaProductos = [
  { id: 1, nombre: "BLAZER NEW ORANGE", precio: 35000, talles: ["S", "M", "L"] },
  { id: 2, nombre: "TAPADO COMODORO", precio: 70000, talles: ["M", "L", "XL"] },
  { id: 3, nombre: "TAPADO COLOMBO", precio: 45000, talles: ["S", "L", "XL"] },
  { id: 4, nombre: "CARDIGAN TAG", precio: 65000, talles: ["M", "XL"] },
  { id: 5, nombre: "TAPADO USHUAIA", precio: 45000, talles: ["S", "M"] },
  { id: 6, nombre: "TAPADO ICELAND", precio: 80000, talles: ["S", "M"] },
  { id: 7, nombre: "TAPADO BAHIA", precio: 50000, talles: ["S", "M", "L"] },
  { id: 8, nombre: "CARDIGAN MALL", precio: 50000, talles: ["S", "M", "L"] },
  { id: 9, nombre: "TAPADO RAWSON", precio: 70000, talles: ["S", "M", "L"] },
  { id: 10, nombre: "CAMPERA NIGHT", precio: 85000, talles: ["S", "M", "L"] },
  { id: 11, nombre: "PANTALON HIGH PRINT", precio: 45000, talles: ["S", "M", "L"] },
  { id: 12, nombre: "CAMPERA MDQ", precio: 65000, talles: ["S", "M", "L"] },
];

const productosContainer = document.getElementById("productos");


//Creo los productos
function creaProductos() {
  tablaProductos.forEach(producto => {
    const productDiv = document.createElement("div");
    const tallesHtml = producto.talles.map(talle => `<option>${talle}</option>`).join("");
    const nombreImagen = `prod${producto.id}-1.webp`;
    const imagenRuta = `images/${nombreImagen}`;
    productDiv.innerHTML = `
        <h3 class="productos_nombre">${producto.nombre}</h3>
        <img src="${imagenRuta}" alt="${producto.nombre}" class="productos_imagen">
        <p class="productos_precio">Precio: $${producto.precio}</p>
        <label>Cantidad:
            <input type="number" class="productos_cantidad" value="1" min="1">
        </label>
        <label>Talles:
            <select class="productos_talles">
                ${tallesHtml}
            </select>
        </label>
        <button class="agregar_carrito" data-id="${producto.id}">Agregar al Carrito</button>
    `;
    productosContainer.appendChild(productDiv);
  });
}

window.addEventListener("load", () => {
  creaProductos();
});


// Agrego al carrito
function agregaAlCarrito(producto) {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const nombreImagen = `prod${producto.id}-1.webp`;
  const imagenRuta = `images/${nombreImagen}`;

  const cartProduct = {
    ...producto,
    image: imagenRuta
  };

  cartItems.push(cartProduct);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Libreria, mensaje de agregado al carrito
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      background: "#efe",
      iconColor: "#4c4",
    })
    
    Toast.fire({
      icon: 'success',
      title: 'El producto se agregó al carrito'
    })
    actualizarContadorCarrito()
  }


// Boton que agrega producto
document.addEventListener("click", event => {
  if (event.target.classList.contains("agregar_carrito")) {
    const button = event.target;
    const productId = parseInt(button.getAttribute("data-id"));
    const productoSeleccionado = tablaProductos.find(producto => producto.id === productId);

    if (productoSeleccionado) {
      const opcionSeleccionada = button.parentElement.querySelector(".productos_talles").value;
      const cantidadSeleccionada = parseInt(button.parentElement.querySelector(".productos_cantidad").value);
      agregaAlCarrito({ ...productoSeleccionado, opcionSeleccionada, cantidad: cantidadSeleccionada });
    }
  }
});

// Cantidad de producto en el carrito
function actualizarContadorCarrito() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const productosTotalesEnCarrito = cartItems.reduce((total, product) => total + product.cantidad, 0);
  const totalProductsCountElement = document.getElementById("contador_productos");
  totalProductsCountElement.textContent = productosTotalesEnCarrito.toString();
}

actualizarContadorCarrito()