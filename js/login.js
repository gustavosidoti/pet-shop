const username = document.getElementById('username')
const password = document.getElementById('password')
const button = document.getElementById('button')

button.addEventListener('click', async(e) => {
    e.preventDefault()
    const data = {
        username: username.value,
        password: password.value
    };

    // Recuperamos información del usuario del localStorage
    // Si coincide los datos con los ingresados creamos un item nuevo llamado sesion
    // redirigimos al usuario al index.
    let datosUsuario = JSON.parse(localStorage.getItem("usuario"));
    
    if (data.username === datosUsuario.username && data.password === datosUsuario.password)
    {
        const sesion = { 
            sesion: "iniciada",
            user: datosUsuario.name
        };
        localStorage.setItem("sesion", JSON.stringify(sesion));
        await Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Iniciando sesión',
            showConfirmButton: false,
            timer: 1500
          });
        window.location = "../index.html";
    }else{
    await Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Datos incorrectos',
        showConfirmButton: false,
        timer: 1500
      });
    }
});