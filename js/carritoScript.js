const cartContainer = document.getElementById("cart");
const totalMonto = document.getElementById("total-monto");
const centroPickupSelector = document.getElementById("centros_pickup_selector");
const centroPickupDetalle = document.getElementById("centros_pickup_detalle");
const botonPago = document.getElementById("boton-pago");
const pickupInfoContainer = document.getElementById("pickup-info");
let pickupZona = [];

function mostrarProductosEnCarrito() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    cartContainer.innerHTML = '';

    cartItems.forEach(item => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <img src="../${item.image}" alt="${item.nombre}" class="cart_item_imagen">
            <p> Producto: ${item.nombre} - Talle: ${item.opcionSeleccionada} - Cantidad: ${item.cantidad} - Precio: $${item.precio * item.cantidad} </p>
            <button class="eliminar_del_carrito" data-id="${item.id}" data-option="${item.opcionSeleccionada}">Eliminar</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    let costoTotal = 0;
    cartItems.forEach(item => {
        costoTotal += item.precio * item.cantidad;
    });

    const costoTotalFormatedo = costoTotal.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
    totalMonto.textContent = costoTotalFormatedo;
}

// Elimino producto
function eliminarDelCarrito(productId, opcionSeleccionada) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = cartItems.filter(item => item.id !== productId || item.opcionSeleccionada !== opcionSeleccionada);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    mostrarProductosEnCarrito();
    actualizarContadorCarrito()
}


// Tomo los datos se los centros pickup
function opcionesCentroPickupSelector() {
    centroPickupSelector.innerHTML = '<option value="all">Centros Pickup</option>';
    
    pickupZona.forEach(zona => {
        const option = document.createElement("option");
        option.value = zona.id;
        option.textContent = zona.sucursal;
        centroPickupSelector.appendChild(option);
    });
}

// Cargo los datos del centro selecionado
centroPickupSelector.addEventListener("change", () => {
    const centroSelecionadoId = centroPickupSelector.value;
    const centroSelecionado = pickupZona.find(zona => zona.id === centroSelecionadoId);
    
    if (centroSelecionado) {
        centroPickupDetalle.innerHTML = `
            <h3>${centroSelecionado.sucursal}</h3>
            <p>Dirección: ${centroSelecionado.direccion}</p>
            <p>Localidad: ${centroSelecionado.localidad}</p>
            <p>Horario: ${centroSelecionado.horario}</p>
        `;
        sessionStorage.setItem("centroSelecionadoId", centroSelecionadoId);
    } else {
        centroPickupDetalle.innerHTML = "";
        sessionStorage.removeItem("centroSelecionadoId");
    }
});

// Actualizo si selecciona otro centro 
function infoCentroPickup() {
    fetch("../pickup.json")
        .then(response => response.json())
        .then(data => {
            pickupZona = data.pickup;

            opcionesCentroPickupSelector();
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
}

window.addEventListener("load", () => {
    mostrarProductosEnCarrito();

    cartContainer.addEventListener("click", event => {
        if (event.target.classList.contains("eliminar_del_carrito")) {
            const productId = parseInt(event.target.getAttribute("data-id"));
            const opcionSeleccionada = event.target.getAttribute("data-option");
            eliminarDelCarrito(productId, opcionSeleccionada);
        }
    });

    // Vacio el carrito
    const vaciarCarrito = document.getElementById("btn_vaciar");
    vaciarCarrito.addEventListener("click", () => {
        localStorage.removeItem("cartItems");
        mostrarProductosEnCarrito();
        actualizarContadorCarrito()
    });

    infoCentroPickup();


    const centroSelecionadoIdGuardado = sessionStorage.getItem("centroSelecionadoId");
    if (centroSelecionadoIdGuardado) {
        centroPickupSelector.value = centroSelecionadoIdGuardado;
        centroPickupSelector.dispatchEvent(new Event("change"));
    }
});


// Actualizo contador
function actualizarContadorCarrito() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const productosTotalesEnCarrito = cartItems.reduce((total, product) => total + product.cantidad, 0);
    const totalProductos = document.getElementById("contador_productos");
    totalProductos.textContent = productosTotalesEnCarrito.toString();
  }
  
  actualizarContadorCarrito()