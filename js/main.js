
class Producto {

    constructor(nombre, precio, cantidad){
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

}

let arrayProductos = [];
let comprobacion = "";
let totalCompra = 0;
const descuento = 0.10;

    do{
        comprobacion = prompt('Ingrese nombre del producto comprado o fin para terminar de agregar productos al carro ');
        if(comprobacion.toLowerCase() === "fin"){
            break;
        }else{
            nombreP = comprobacion;
            let precioP = prompt('Ingrese el precio del producto');
            let cantidadP = prompt('Ingrese la cantidad del producto');
            arrayProductos.push( new Producto (nombreP, precioP, cantidadP));
        }

    }while(comprobacion.toLowerCase() != "fin");

    for (let producto of arrayProductos){
        let totalProductoIndividual = 0;
        totalProductoIndividual = producto.cantidad * producto.precio;
        alert(`El producto agregado al carro es: ${producto.cantidad} unidades de ${producto.nombre} \ncon un precio por unidad de $ ${producto.precio}
        \nTOTAL $ ${totalProductoIndividual}  `);
        totalCompra += totalProductoIndividual;
    }

    //alert(`TOTAL DE LA COMPRA $ ${totalCompra}`);

    if(totalCompra > 0)
    
    {
        let respuestaDesicion = prompt(`¿Posee cupón de descuento? - responder con SI o NO`);

        if (respuestaDesicion === "SI") {
            aplicaDescuento(totalCompra);
        } else {
            finalizarCompra(totalCompra);
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
    }
    

    function finalizarCompra(precio) {
        alert(`Total de la compra ${precio}`);
    }