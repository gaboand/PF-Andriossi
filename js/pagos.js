document.addEventListener("DOMContentLoaded", function() {
    let pago = document.querySelector(".carrito__botonpagos2");
    let tiposDePago = document.querySelectorAll("input[type='radio'][name='tipopago']");
    let nombreApellido = document.querySelector(".carrito__campos:nth-of-type(1)");
    let numeroTC = document.querySelector(".carrito__campos:nth-of-type(2)");
    let email = document.querySelector(".carrito__campos:nth-of-type(3)");  


    // Veifico si estan los datos completados, proceso el pago y vacio el carrito
    pago.addEventListener("click", function(event) {
        let seleccionado = false;

        tiposDePago.forEach(function(tipoPago) {
            if (tipoPago.checked) {
                seleccionado = true;
            }
        });

        if (!seleccionado || nombreApellido.value === "" || numeroTC.value === "" || email.value === "") {
            event.preventDefault();
            alert("Por favor, complete todos los campos con sus datos y seleccione un tipo de pago antes de continuar.");
        } else {
            alert("El pago se ha procesado corectamente. Muchas Gracias por su Compra !!");
            localStorage.clear();
        }
        
    });
           
});
