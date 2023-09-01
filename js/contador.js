// Sumo la cantidad de productos del localStorage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const productosTotalesEnCarrito = cartItems.reduce((total, product) => total + product.cantidad, 0);

// Actualizo contador
const totalProductos = document.getElementById("contador_productos");
totalProductos.textContent = productosTotalesEnCarrito.toString();