
const seleccionProductos = document.getElementById("seleccion-productos");
const verCarrito = document.getElementById("verCarrito");
const cartaContainer = document.getElementById("carta-container");
const cantidadCarrito = document.getElementById("cantidadCarrito");

const traerProductos = async () => {
const response = await fetch("/src/productos.json");
const data = await response.json();

data.forEach((producto) => {
  let contenido = document.createElement('div');
  contenido.innerHTML = `
  <img src="${producto.img}">
  <h3>${producto.nombre}</h3>
  <p>${producto.precio}$ </p>
  `;
  seleccionProductos.append(contenido);

  let botonSeleccion = document.createElement('button');
  botonSeleccion.innerText = "seleccionar";
  contenido.append(botonSeleccion);
  botonSeleccion.className = "botonSeleccion";



  botonSeleccion.addEventListener("click",() => {
const repetido = carrito.some((productoRepetido) => productoRepetido.id === producto.id)

if(repetido == true){
carrito.map((producto) => {
  if(producto.id === producto.id){
    producto.cantidad++
  }
});
} else{
carrito.push({
  id : producto.id,
  img : producto.img,
  nombre : producto.nombre,
  precio : producto.precio,
  cantidad : producto.cantidad,
});
};
carritoContador();
saveLocal();
});
});
};  

traerProductos();



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];



const carritoContador = () => {
  cantidadCarrito.style.display = "block";

const carritoLength = carrito.length;

localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
  cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoContador();

const mostrarCarrito = () => {
 cartaContainer.innerHTML = "";
  cartaContainer.style.display = "flex";
const cartaHeader = document.createElement("div");
cartaHeader.className = "carta-header"
cartaHeader.innerHTML = `
<h1>Carrito</h1>

`
cartaContainer.append(cartaHeader);

const cartaboton = document.createElement("h1");
cartaboton.innerText = "x";
cartaboton.className = "carta-boton-header";


cartaboton.addEventListener("click",() => {
cartaContainer.style.display = "none";
});



cartaHeader.append(cartaboton);





carrito.forEach((producto) => {
  let carritoContenido = document.createElement("div");
  carritoContenido.className = "carta-content";
  carritoContenido.innerHTML = `
  <img src =${producto.img}>
  <h3>${producto.nombre}</h3>
  <p>${producto.precio}$</p>
  <p>cantidad: ${producto.cantidad}</p>
  <p>Total : ${producto.cantidad * producto.precio}$</p>
  <span class="eliminar-producto"> ❌ </span>
  `;
  
  let eliminar = carritoContenido.querySelector(".eliminar-producto");
  
  eliminar.addEventListener("click",() => {
    eliminarProducto(producto.id);
  })
  cartaContainer.append(carritoContenido)
});





const eliminarProducto = (id) => {
  let encontrarId = carrito.find((element) => element.id === id);

carrito = carrito.filter((carritoId) => {
  return carritoId !== encontrarId;
});
carritoContador();
saveLocal();
mostrarCarrito();

};



// funcion para mostrar el total del carrito /** */

const total = carrito.reduce((acc,elem) => acc + elem.precio * elem.cantidad,0);

const totalCompra = document.createElement("div")
totalCompra.className = "total-contenido"
totalCompra.innerHTML = `total a pagar: ${total} $`;
cartaContainer.append(totalCompra);
};



verCarrito.addEventListener("click",mostrarCarrito)




// funcion para mostrar mas detalles 

let boton_productos = document.querySelectorAll(".boton_productos");
let mostrarComentario = document.querySelectorAll(".no-mostrar");

boton_productos.forEach(function(elemento,indice){
elemento.addEventListener("click",function(){
  mostrarComentario[indice].classList.toggle("mostrar-comentario");
if(mostrarComentario[indice].classList.contains("mostrar-comentario") ){
  elemento.innerHTML = "Ver Menos";
}else{
  elemento.innerHTML = "Ver detalles";
}
});
})



// funcion para guardar los datos del usuario en el formulario 


const name = document.getElementById("name")
const password = document.getElementById("password")
const email = document.getElementById("email")
const telefono = document.getElementById("telefono")
const pais = document.getElementById("pais")
const form = document.getElementById("formulario")
const errorElement = document.getElementById("error")

form.addEventListener('submit',(e) => {
 const messages = []
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
 
  Swal.fire(
    'Apple Store',
    'Los datos fueron enviados',
    'felicidades!!'
  )

  };



  if(messages.length > 0){
    e.preventDefault()
errorElement.innerText = messages.join (', ')
  }
  

})



// funcion para guardar los datos del usuario en el local storage 


const userList = [];

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


