
function compra(precio) {

    const descuento = 0.10;

    let respuestaDesicion = prompt(`¿Posee cupón de descuento? - responder con SI o NO`);

    if (respuestaDesicion === "SI") {
        aplicaDescuento(precio);
    } else {
        finalizarCompra(precio);
    }

    function aplicaDescuento(precio) {
        let contador = 0;
        // CICLO
        do {
            let codigoDTO = prompt(`ingrese su código de descuento`);
            if (codigoDTO === "DESCUENTO") {
                let precioFinal = precio - (precio * descuento);
                alert('Descuento del 10% aplicado correctamente');
                finalizarCompra(precioFinal);
                contador = 2;
                break;
            }

            alert('Código de descuento no válido');
            contador++;
        } while (contador < 2);

    }

    function finalizarCompra(precio) {
        alert(`Total de la compra ${precio}`);
    }

}