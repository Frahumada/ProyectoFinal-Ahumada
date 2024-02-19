//Variables con precios para calculos
let costoResma = [];
let costoTapas = [];
let costoTinta = [];
let costoAnillos = [];
let costoLuz = 6;

//Obtengo costos desde archivo externo .json
fetch("../JSON/costoAnillos.json")
  .then((response) => response.json())
  .then((data) => {
    if (costoResma.length === 0) {
      data.resma.forEach((element) => costoResma.push(element));
      console.log("RESMA");
      console.log(costoResma);
    }
    if (costoTapas.length === 0) {
      data.tapas.forEach((element) => costoTapas.push(element));
      console.log("TAPAS");
      console.log(costoTapas);
    }
    if (costoTinta.length === 0) {
      data.tinta.forEach((element) => costoTinta.push(element));
      console.log("TINTA");
      console.log(costoTinta);
    }
    if (costoAnillos.length === 0) {
      data.anillos.forEach((element) => costoAnillos.push(element));
      console.log("ANILLOS");
      console.log(costoAnillos);
    }
  });

//obtengo todos los productos de la "botonera" y los alojo en la variable productos
const productos = document.querySelectorAll(".tiposImpresiones button");

//obtengo el div donde va a mostrarse la cotizacion de acuerdo al producto cliqueado -- Muestro por consola a modo de prueba
const cotizar = document.querySelector("#cotizar");

// Funcion para asignar/remover class "selected" a boton presionado
function isSelected(id) {
  const productos = document.querySelectorAll(".tiposImpresiones button");
  for (const producto of productos) {
    if (producto.id !== id) {
      producto.classList.remove("btn-dark", "selected");
      producto.classList.add("btn-light");
    } else {
      producto.classList.remove("btn-light");
      producto.classList.add("btn-dark", "selected");
    }
  }
}

// Funcion calcular precio Libro
function calcularLibro() {
  let costoHoja = costoResma[0].precio / costoResma[0].hojas;
  //Obtener datos de entrada
  let paginas = document.querySelector("#cantidadPaginas").value;
  let tamaño = document.querySelector(".form-select").value;
  let color = document.querySelector("#colorImpresion").checked;
  let costoLibro = undefined;
  //Obtengo array de costo de anillo en funcion de las paginas
  let anillo = costoAnillo(paginas);
  //Calcular costo anillado total (anillado + tapa transparente+ tapa color)
  let costoAnillado = Math.floor(
    anillo.precio_costo / anillo.unidades +
      costoTapas[0].precio / costoTapas[0].cantidad +
      costoTapas[1].precio / costoTapas[1].cantidad
  );

  //Calcular costo del libro en funcion del color
  let costoColor =
    costoHoja + (costoTinta[0].precio / costoTinta[0].paginas) * 2 + costoLuz;
  let costoBN =
    costoHoja + (costoTinta[1].precio / costoTinta[1].paginas) * 2 + costoLuz;
  color
    ? (costoLibro = (paginas / 2) * costoColor + costoAnillado)
    : (costoLibro = (paginas / 2) * costoBN + costoAnillado);

  //calcular precio del libro
  precioLibro = costoLibro * 2;

  //Ajustar precio del libro segun su tamaño (formato A5 o A4)
  tamaño === "true"
    ? (precioLibro = precioLibro / 1.85)
    : (precioLibro = precioLibro);

  //Obtener div donde mostrar resultado
  let resultado = document.getElementById("collapseResultado");
  resultado.innerHTML =
    "<p>Costo Libro: $" +
    Math.floor(costoLibro) +
    "</p>" +
    "<br>" +
    "<p>Costo hoja color: $" +
    Math.floor(costoColor) +
    "</p>" +
    "<br>" +
    "<p>Costo hoja BN: $" +
    Math.floor(costoBN) +
    "</p>" +
    "<br>" +
    "<p>Costo Anillado: $" +
    Math.floor(costoAnillado) +
    "</p>" +
    "<br>" +
    "<p>Precio final libro $" +
    Math.floor(precioLibro) +
    " </p>";
  return Math.round(precioLibro);
}

// Funcion para calcular el precio del anillo de acuerdo a la cantidad de paginas
function costoAnillo(paginas) {
  //Recorro el array
  for (let i = 0; i < costoAnillos.length - 1; i++) {
    //Si la cantidad de paginas se encuentra entre uno elemento del arreglo y el siguiente inmediato, devuelvo el costo del anillo de mas capacidad
    if (
      costoAnillos[i].capacidad < paginas &&
      paginas <= costoAnillos[i + 1].capacidad
    ) {
      return costoAnillos[i + 1];
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  //obtengo el div donde va a mostrarse la cotizacion de acuerdo al producto cliqueado
  const cotizar = document.querySelector("#cotizar");
  //obtengo todos los productos de la "botonera" y los alojo en la variable productos
  const productos = document.querySelectorAll(".tiposImpresiones button");

  //Funcion para cargar el contenido a mostrar desde archivo externo
  function cargarContenidoDesdeArchivo(archivo) {
    fetch(archivo)
      .then((response) => response.text())
      .then((contenido) => {
        cotizar.innerHTML = contenido;
      })
      .catch((error) => {
        console.error("Error al cargar el contenido", error);
      });
  }

  //Manejar clics en los botones
  productos.forEach(function (boton) {
    boton.addEventListener("click", function () {
      //Obtengo el id del boton presionado
      let seleccionado = boton.getAttribute("id");

      //Construir ruta de archivo a mostrar
      let productoSeleccionado = seleccionado + ".html";

      //muestro contenido del boton presionado
      cargarContenidoDesdeArchivo(productoSeleccionado);
    });
  });
});
