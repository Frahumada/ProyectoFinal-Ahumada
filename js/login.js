const loginform = document.querySelector('#loginform');
loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = document.querySelector('#username').value;
    const pass = document.querySelector('#pass').value;

    const Users = JSON.parse(localStorage.getItem('users')) || [];
    const validarUser = Users.find(us => us.user === user && us.password === pass);
    console.log (user);
    console.log (pass);
    console.log (validarUser);
    if (!validarUser) {
        Swal.fire({
            icon: "error",
            title: "Usuario y/o clave incorrecta",
            text: "El usuario y/o la clave que ingresaste son incorrectos",
            footer: ''
          });
        } else {
          Swal.fire({
            title: "Iniciaste sesion como",
            text: user,
            icon: "success"
          });
          localStorage.setItem('login_success', JSON.stringify(validarUser));
          window.location.href = 'index.html'
        };
});