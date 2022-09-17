
// Arrays de Productos
const productsDB = [
    {
      id: 1,
      marca: "Royal Canin",
      descripcion: "Kitten Chaton 7kg",
      precio: 13000,
      img: "https://res.cloudinary.com/dsnccd8pt/image/upload/v1663442877/PetShop/7477-Royal-Canin-Chaton_x5i5ml.png",
    },
    {
      id: 2,
      marca: "Royal Canin",
      descripcion: "Large Adult 7kg",
      precio: 12000,
      img: "https://res.cloudinary.com/dsnccd8pt/image/upload/v1663442877/PetShop/royalcanin-large_fhi9ug.jpg",
    },
    {
      id: 3,
      marca: "Royal Canin",
      descripcion: "Renal 7kg",
      precio: 13000,
      img: "https://res.cloudinary.com/dsnccd8pt/image/upload/v1663442554/PetShop/rc-renal_fzrkh3.jpg",
    },
    {
      id: 4,
      marca: "Royal Canin",
      descripcion: "Gastrointestinal 7kg",
      precio: 15000,
      img: "https://res.cloudinary.com/dsnccd8pt/image/upload/v1663442554/PetShop/rc-gastro_doxvrf.jpg",
    },
    {
        id: 5,
        marca: "Royal Canin",
        descripcion: "Mini Adulto 7kg",
        precio: 10000,
        img: "https://res.cloudinary.com/dsnccd8pt/image/upload/v1663447283/PetShop/royal-canin-mini-adult-8-kg_aouftw.jpg",
      },
  ];

  let carrito = [];

  const items = document.querySelector("#items");
  const carritoHTML = document.querySelector("#carrito");


  function renderizarProductos() {
    productsDB.forEach((producto) => {
      let productoHTML = `
            <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
                <div class="card text-black bg-warning" style="width: 18rem;">
                    <img class="card-img-top" src="${producto.img}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${producto.marca}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                        <p>$${producto.precio}</p>
                        <button class="btn btn-success" onclick="agregarProductoAlCarrito(${producto.id})">Añadir al carrito</button>
                    </div>
                </div>
            </div>
            `;
      items.innerHTML += productoHTML;
    });
  }
  renderizarProductos();

 
  function agregarProductoAlCarrito(id) {

    // Busca el producto seleccionado en la Base de datos
    let producto = productsDB.find((producto) => producto.id === id);
    
   // Busca en el carro si el producto seleccionado ya existe.
    let productoEnCarrito = carrito.find((producto) => producto.id === id);
  
    if (productoEnCarrito) {
      // Si existe suma 1 unidad más de ese producto.  
      productoEnCarrito.cantidad++;
    } else {
      // Si no existe agrega la unidad seleccionada al carro  
      producto.cantidad = 1;
      carrito.push(producto);
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto añadido al Carrito',
        showConfirmButton: false,
        timer: 1500
      });
    // Llama a la función de renderización del carro y calcula el total 
    renderizarCarrito();
    calcularTotal();
    
  }
  
  function renderizarCarrito() {
    console.log(carritoHTML);
  
    let htmlCarrito = "";
  
    carrito.forEach((prod, id) => {
      htmlCarrito += `
          
          <div class="col-12 mb-5 d-flex justify-content-center">
            <div class="card text-dark flex-row" style="width: 30rem;">
                <div>
                 <img  style="width: 100px;" src="${prod.img}" alt="Card image cap">
                </div>
                 <div class="card-body" >
                  <h5 class="card-title">${prod.descripcion}</h5>
                  <p>$${prod.precio}</p>
                  <p>Cantidad: ${prod.cantidad}</p>
                <button class="btn btn-danger" onclick="eliminarProductoDelCarrito(${id})">Eliminar</button>
                </div>
            </div>
          </div>
          `;
    });
  
    carritoHTML.innerHTML = htmlCarrito;
  }
  
  function calcularTotal() {
    let total = 0;
  
    carrito.forEach((prod) => {
      total += prod.precio * prod.cantidad;
    });
  
    console.log(total);
  
    const t = document.getElementById("total");
    t.innerHTML = `<h5>$${total}</h5>`;
  }
  
  //****Editar Carrito***/
  //*Cuántos hay? Elimino un producto o vaciar carrito.
  
  function eliminarProductoDelCarrito(id) {
    carrito[id].cantidad--;
  
    if (carrito[id].cantidad === 0) {
      carrito.splice(id, 1);
    }
    renderizarCarrito();
    calcularTotal();
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Se ha quitado el producto del Carrito ',
        showConfirmButton: false,
        timer: 1500
      });
  }
  
  function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    calcularTotal();
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Se ha vaciado el Carrito ',
        showConfirmButton: false,
        timer: 1500
      });
  }
  
  const vaciar = document.querySelector("#boton-vaciar");
  vaciar.addEventListener("click", vaciarCarrito);