
// funcion para mostrar mas detalles sobre los autos

let boton_autos = document.querySelectorAll(".boton_autos");
let mostrarComentario = document.querySelectorAll(".no-mostrar");

boton_autos.forEach(function(elemento,indice){
elemento.addEventListener("click",function(){
  mostrarComentario[indice].classList.toggle("mostrar-comentario");
if(mostrarComentario[indice].classList.contains("mostrar-comentario") ){
  elemento.innerHTML = "Ver Menos";
}else{
  elemento.innerHTML = "Ver detalles";
}
});
})







// funcion para seleccionar que auto desea adquirir

let boton = document.getElementById("boton")
let lista = document.getElementById("lista")
let checks = document.querySelectorAll(".valores")



boton.addEventListener("click",function(){
 
  lista.innerHTML = "";
    checks.forEach((e) => {
   if(e.checked){
   let elementos = document.createElement("li");
   elementos.className = "list-group-item";
   elementos.innerHTML = e.value;
   lista.appendChild(elementos);
 
  }
   });
});





// funcion para guardar los datos del usuario en el formulario 


const name = document.getElementById("name")
const password = document.getElementById("password")
const email = document.getElementById("email")
const telefono = document.getElementById("telefono")
const pais = document.getElementById("pais")
const form = document.getElementById("formulario")
const errorElement = document.getElementById("error")

form.addEventListener('submit',(e) => {
  let messages = []
  if(name.value === "" || name.value == null) {
    messages.push('Nombre es requerido')
  }
  
  if (password.value.length <= 6){
    messages.push('La contraseña debe ser mas larga que 6 caracteres')
  }
  if(password.value.length >= 20){
    messages.push('La contraseña debe tener menos de 20 caracteres')
  }

if(email.value === "" || email.value == null){
  messages.push("Ingrese un email valido")
}

if(telefono.value === "" || telefono.value === null){
  messages.push("ingrese un telefono valido")
}

if(pais.value === "" || pais.value == null){
  messages.push('Ingrese un pais valido')
}

if(name.value && password.value && email.value && telefono.value && pais.value){
 
  swal("Luxury Cars", "Los datos han sido enviados correctamente!!", "success", {
    button: "Cerrar",
  });

  };



  if(messages.length > 0){
    e.preventDefault()
errorElement.innerText = messages.join (', ')
  }
  

})



// funcion para guardar los datos del usuario en el local storage 


let userList = [];

function addUser(u_name,u_password,u_email,u_telefono,u_pais){
  let newUser = {
    name: u_name,
    password: u_password,
    email: u_email,
    telefono: u_telefono,
    pais:u_pais
  };
 
  userList.push(newUser);
  console.log(newUser);
localStorageUser(userList);
}


function getUserList(){
  let userDates = localStorage.getItem("localUserList");
  if(userDates == null){
    userList = [];
  }else{
    userDates = JSON.parse(userDates);
  }
  return userList;
}


document.querySelector(".formulario-btn").addEventListener('click',saveUser);



function saveUser(){
  let uName = document.querySelector("#name").value,
  uPass = document.querySelector("#password").value,
  uEmail = document.querySelector("#email").value,
  uTelefono = document.querySelector("#telefono").value,
  uPais = document.querySelector("#pais").value
  
  
  addUser(uName,uPass,uEmail,uTelefono,uPais);
}


function localStorageUser(U_list){
  localStorage.setItem('localUserList',JSON.stringify(U_list));
}


