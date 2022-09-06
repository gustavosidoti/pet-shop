
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

alert(`TOTAL DE LA COMPRA $ ${totalCompra}`);