// Arrays de Productos
const products = [{
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
// Guardamos los productos en el localStorage
localStorage.setItem("productos", JSON.stringify(products));

// Obtenemos los productos desde el localStorage
let productsDB = JSON.parse(localStorage.getItem("productos"));

//OPERADOR LÓGICO OR - Obtenemos los productos del carrito. Si no hay inicializamos vacío el array
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const items = document.querySelector("#items");
const carritoHTML = document.querySelector("#carrito");


function renderizarProductos() {
  // verifico si hay sesión iniciada
  let datoSesion = JSON.parse(localStorage.getItem("sesion")) || [];
  if (datoSesion.sesion === "iniciada") {
    const opBarraLogueado = `
            <a class="navbar-brand" href="./index.html">
            <img src="https://res.cloudinary.com/dsnccd8pt/image/upload/v1663448127/PetShop/pet-shop-logo_k3zoiq.webp"
                  alt="PetShop" width="50" height="50" class="d-inline-block align-text-top">
                  Pet-Shop
            </a>
            <p class="dataUser">Hola ${datoSesion.user}</p>
            <form class="form-inline">
              <a class="btn btn-outline-danger btn-sm" onclick="cerrarSesion()"> Cerrar sesión</a>
              <label class="toggle" for="toggle">
                  <i class="fa-solid fa-cart-shopping"></i>
              </label>
            </form>
            `;
    containerNav.innerHTML = opBarraLogueado;

    productsDB.forEach((producto) => {
      let productoHTML = `
                  <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
                      <div class="card text-black bg-warning" style="width: 18rem;">
                          <img class="card-img-top" src="${producto.img}" alt="Card image cap">
                          <div class="card-body">
                              <h5 class="card-title">${producto.marca}</h5>
                              <p class="card-text">${producto.descripcion}</p>
                              <h3><p>$${producto.precio}</p></h3>
                              <button class="btn btn-success" onclick="agregarProductoAlCarrito(${producto.id})">Añadir al carrito</button>
                          </div>
                      </div>
                  </div>
                  `;
      items.innerHTML += productoHTML;
    });
  } else {

    const opBarraNoLogueado = `
              <a class="navbar-brand" href="./index.html">
              <img src="https://res.cloudinary.com/dsnccd8pt/image/upload/v1663448127/PetShop/pet-shop-logo_k3zoiq.webp"
                    alt="PetShop" width="50" height="50" class="d-inline-block align-text-top">
                    Pet-Shop
              </a>
              <form class="form-inline">
                <a href="./pages/login.html" class="btn btn-outline-success btn-sm"> Iniciar sesión</a>

              </form>
              `;
    containerNav.innerHTML = opBarraNoLogueado;

    productsDB.forEach((producto) => {
      let productoHTML = `
              <div class="col-12 col-md-4 mb-5 d-flex justify-content-center">
                  <div class="card text-black bg-warning" style="width: 18rem;">
                      <img class="card-img-top" src="${producto.img}" alt="Card image cap">
                      <div class="card-body">
                          <h5 class="card-title">${producto.marca}</h5>
                          <p class="card-text">${producto.descripcion}</p>
                          <h3><p>$${producto.precio}</p></h3>

                      </div>
                  </div>
              </div>
              `;
      items.innerHTML += productoHTML;
    });
  }
}
renderizarProductos();
renderizarCarrito();
calcularTotal();

function agregarProductoAlCarrito(id) {

  // Busca el producto seleccionado en la Base de datos
  let producto = productsDB.find((producto) => producto.id === id);

  // Busca en el carro si el producto seleccionado ya existe.
  let productoEnCarrito = carrito.find((producto) => producto.id === id);

  // TERNARIO Si existe suma 1 unidad más de ese producto. Si no existe agrega la unidad seleccionada al carro
  productoEnCarrito ? productoEnCarrito.cantidad++ : (producto.cantidad = 1, carrito.push(producto));
  // Guardamos el carrito en el localStorage actualizado
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Mostramos alerta de éxito
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

  // si la cantidad de un producto es 0 eliminar su id de carrito
  if (carrito[id].cantidad === 0) {
    carrito.splice(id, 1);
  }


  // Actualizamos el carrito en el localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  renderizarCarrito();
  calcularTotal();

  // Mostramos alerta de éxito de la operación
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
  localStorage.setItem("carrito", JSON.stringify(carrito));
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

// Función que cierra la sesión

async function cerrarSesion() {

  localStorage.removeItem('sesion');
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  let timerInterval;
  await Swal.fire({
    position: 'top-end',
    title: 'Cerrando sesión!',
    html: 'Por favor <b></b> aguarde.',
    timer: 1300,
    timerProgressBar: true,
    showCancelButton: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  });
  window.location = "./index.html";
}