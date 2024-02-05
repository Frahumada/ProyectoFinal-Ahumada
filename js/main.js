//Variables con precios para calculos
const costoResma = 5000;
const costoTapasColor = 5500;
const costoTapastransp = 5500;
const costoTintaNegra = 6;
const costoTintaColor = 10;
let costoHoja = costoResma / 500;

//POSIBLE CAMBIO PARA ENTREGA FINAL
// class Anillo {
//   constructor(anillo) {
//     this.id = anillo.id;
//     this.milimetros = anillo.milimetros;
//     this.capacidad = anillo.capacidad;
//     this.unidades = anillo.unidades;
//     this.precio = anillo.precio;
//   }
//   precioUnidad() {
//     return (this.precio/this.unidades);
//   }
// }

const costoAnillos = [
  { id: 1, mm: 7, capacidad: 25, unidades: 50, precio_costo: 1766.6 },
  { id: 2, mm: 9, capacidad: 50, unidades: 50, precio_costo: 1943.26 },
  { id: 3, mm: 12, capacidad: 70, unidades: 50, precio_costo: 2918.52 },
  { id: 4, mm: 14, capacidad: 85, unidades: 50, precio_costo: 3656.62 },
  { id: 5, mm: 17, capacidad: 100, unidades: 50, precio_costo: 4823.06 },
  { id: 6, mm: 20, capacidad: 120, unidades: 50, precio_costo: 5608.35 },
  { id: 7, mm: 23, capacidad: 140, unidades: 20, precio_costo: 2944.0 },
  { id: 8, mm: 25, capacidad: 160, unidades: 20, precio_costo: 3310.0 },
  { id: 9, mm: 29, capacidad: 180, unidades: 20, precio_costo: 4359.63 },
  { id: 10, mm: 33, capacidad: 250, unidades: 20, precio_costo: 4840.0 },
  { id: 11, mm: 40, capacidad: 350, unidades: 12, precio_costo: 4607.68 },
  { id: 12, mm: 45, capacidad: 400, unidades: 9, precio_costo: 4059.55 },
  { id: 13, mm: 50, capacidad: 450, unidades: 9, precio_costo: 4360.0 },
];

//variables de costos en storage
localStorage.setItem("costoAnillos", JSON.stringify(costoAnillos));
console.log(localStorage.getItem("costoAnillos"));

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
  //Obtener datos de entrada
  let paginas = document.querySelector("#cantidadPaginas").value;
  let tamaño = document.querySelector(".form-select").value;
  let color = document.querySelector("#colorImpresion").checked;
  let costoLibro = 1;

  console.log("PAGINAS: " + paginas);

  let costoAnillos = costoAnillo(paginas);

  let costoAnillado = (costoAnillos + costoTapasColor + costoTapastransp) / 50;

  //Calcular costo del libro
  color ? costoLibro = (paginas / 2) * (costoHoja + costoTintaColor) + costoAnillado : costoLibro = (paginas / 2) * (costoHoja + costoTintaNegra) + costoAnillado
  

  //calcular precio del libro
  precioLibro = costoLibro * 2;

  //Ajustar precio del libro segun su tamaño (formato A5 o A4)
  tamaño === "true" ? precioLibro = precioLibro / 1.85 : precioLibro = precioLibro
  

  //Obtener div donde mostrar resultado
  let resultado = document.getElementById("collapseResultado");
  resultado.innerHTML =
    "<p>Costo Libro: $" +
    Math.floor(costoLibro) +
    "</p>" +
    "<br>" +
    "<p>Costo hoja: $" +
    Math.floor(costoHoja) +
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
  //recupero el array de costos de anillos de la LS
  anillos = JSON.parse(localStorage.getItem("costoAnillos"));
  //Recorro el array
  for (let i = 0; i < anillos.length - 1; i++) {
    //Si la cantidad de paginas se encuentra entre uno elemento del arreglo y el siguiente inmediato, devuelvo el costo del anillo de mas capacidad
    if (anillos[i].capacidad < paginas && paginas <= anillos[i + 1].capacidad) {
      return anillos[i + 1].precio_costo;
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