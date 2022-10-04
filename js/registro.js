const nameU = document.getElementById('nameU');
const username = document.getElementById('username');
const password = document.getElementById('password');
const button = document.getElementById('button');

button.addEventListener('click', async(e) => {
    e.preventDefault()
    const data = {
        name: nameU.value,
        username: username.value,
        password: password.value
    };
    // Guardamos los datos del usuario en el localStorage
    localStorage.setItem("usuario", JSON.stringify(data));
    
    
    await Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Usuario creado con éxito',
        showConfirmButton: false,
        timer: 1500
      });

    window.location = "login.html";
    
});