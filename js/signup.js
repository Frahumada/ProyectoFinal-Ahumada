//tomamos el form de registro y obtenemos nombre/usuario/password
const signupForm = document.querySelector("#signupForm");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const username = document.querySelector("#username").value;
  const pass = document.querySelector("#password").value;

  //Recorre el form de registro, busca el username, si lo encuentra informa, sino guarda el nuevo usuario en LS
  const Users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(Users);
  const isUserRegistered = Users.find((us) => us.user === username);
  console.log(isUserRegistered);
  if (isUserRegistered) {
    Swal.fire({
      icon: "error",
      title: "Usuario no disponible",
      text: "El usuario que intentas utilizar no se encuentra disponible, por favor intenta con uno diferente",
      footer: ''
    });
  } else {
    Swal.fire({
      title: "Usuario registrado!",
      text: "El usuario fue registrado correctamente",
      icon: "success",
      showConfirmButton: false,
      timer: 2000
    });
    Users.push({ name: name, user: username, password: pass });
    localStorage.setItem("users", JSON.stringify(Users)); 
  }
});
