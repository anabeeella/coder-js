// Función constructora de mis productos
function bambole(id , name , type , knitType , slangType, materials , colors , price, discount) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.knitType = knitType;
    this.slangType = slangType,
    this.materials = materials;
    this.colors = colors;
    this.price = price;
    this.discount = discount;
  }


  
// Variable para alojar la orden
let order = [];

// Variable para alojar el precio de mi producto - el descuento
let bamboleDiscount = 0;

// Variables que afectan al precio final
let priceDelivery = [250, 300, 500];
let discount = 1.15;

//Objeto para alojar la busqueda
let search = {
  buscador: ''
}

let productosTotal;



// Buscador
function capturarEnter(e) {
  if (e.which == 13 || e.keyCode == "Enter") {
alert("Este buscador aún no funciona");        
   }
}



// Agregar productos al carrito
function addElementToCart(producto) {
  const bambole = productosTotal.filter(bambole => bambole.id === producto)[0];
  order.push(bambole);
  const buildOrder = document.getElementById("selected-bamboles");
  buildOrder.innerHTML = ''
  
  
  let unidadesCarrito = document.querySelector("#cart-length");
  unidadesCarrito.textContent = " " + order.length;

  //Si hay objetos en mi carrito, mostrar botón
  if (order.length > 0) {
    $("#boton-unidades-carrito").show();
    $("#retiro-en-tienda").hide();
    $("#zona-de-envio").hide();
  };

  order.forEach(doll => {
  buildOrder.innerHTML +=
  `<div class="d-flex justify-content-between">
  <p><strong>${doll.name}</strong></p><p class="text-right">$ ${doll.price}</p>
  </div>
  <p class="text-muted ml-1 description-p-cart">${doll.knitType}</p>`
}
)
};





//Opciones y valors de envío
let totalEnvio = 0;
let envio = document.getElementsByName('envio');
let opcionesDeEnvio = document.getElementsByName("zona-envio");
let valorDeEnvio = document.querySelector('#valor-envio');


//Envío o retiro, selección de radio buttons
function calcularEnvio() {
envio.forEach(r => {
  if (r.checked===true && r.value == "option1") {
      $("#retiro-en-tienda").hide();
      $("#zona-de-envio").show();
    }
  else if (r.checked===true && r.value == "option2") {
      $("#zona-de-envio").hide();
      $("#retiro-en-tienda").show();
      totalEnvio = 0;
      valorDeEnvio.textContent = "Gratis!";
      document.querySelector('#total').textContent = "$" + (totalSinEnvio+totalEnvio);
    }
    })
}


//Mientras no haya nada en el carrito, el botón estará oculto
if (order.length < 1) {
    $("#boton-unidades-carrito").hide();
};

//Funcion para mostrar carrito y ver el total
function mostrarCarrito() {
  let total = 0

  order.forEach(bambole => {
    total += bambole.price
  })

    /*let valorCuotas = document.querySelector("#cuotas");
    valorCuotas.textContent = (total.toFixed(2)/3).toFixed(2);
    */

  console.log(order)



  document.querySelector('#subtotal').textContent = "$" + total.toFixed(2);
  document.querySelector('#total').textContent = "$" + total;

  return totalSinEnvio = total;

}


//Función para sumar precios de envio según la zona
function zonaDeEnvio(){
  opcionesDeEnvio.forEach(z => {
       if (z.selected === true && z.id == "envio-caba"){
       totalEnvio = priceDelivery[0]
     }
       else if (z.selected === true && z.id == "envio-norte"){
       totalEnvio = priceDelivery[1]
     }
       else if (z.selected === true && z.id == "envio-sur"){
       totalEnvio = priceDelivery[2]
     }
     
     valorDeEnvio.textContent = "$" + totalEnvio;
     document.querySelector('#total').textContent = "$" + (totalSinEnvio+totalEnvio)

  })
};






//Construir el html para cada objeto de mi tienda:
let buildContent = document.getElementById("layout-products");


//Mostrar todos los elementos de mi tienda 
window.addEventListener("DOMContentLoaded", ()=> {


//Funcion para traer los productos del json mediante ajax
function getProducts() {
  var url = `js/products.json`;
  $.ajax({
    method: "GET",
    dataType: "json",
    url: url,
  })
  .done(function (products) {
    productosTotal = products;
    
    //Función para crear las cards
    productosTotal.forEach(allBamboles => {
      buildContent.innerHTML += 
      `<div class="col-sm-4 ${allBamboles.slangType}">
          <div class="shop-items">
            <img src="images/tienda-${allBamboles.id}.png">
            <div class="texto-sobre-imagen">
              <h4>${'$' + allBamboles.price}</h4>
              <p class="nombre-bambole">${allBamboles.name}</p>
            </div>
            <a style="color:white;" class="btn" onclick='addElementToCart(${allBamboles.id})'}>¡Lo quiero!</a>
          </div>
        </div>
        `
        }
      )
  })
  .fail(function (error) {
    console.log(error);
  });

}

//Llamada a la función para cargar el contenido
  getProducts();

});




// FILTROS

document.querySelector("#filtrar-crochet").addEventListener("click", function(event) {
  $(".t-crochet").show();
  $(".t-dos-agujas").hide();
  event.preventDefault();
});

document.querySelector("#filtrar-dos-agujas").addEventListener("click", function(event) {
  $(".t-dos-agujas").show();
  $(".t-crochet").hide();
  event.preventDefault();
});

document.querySelector("#filtrar-dos-agujas").addEventListener("click", function(event) {
  $(".t-dos-agujas").show();
  $(".t-crochet").show();
  event.preventDefault();
});




/* ACCIONES QUE ME GUSTARÍA AGREGAR:

- Tener un contador (+) y (-) para cada item seleccionado;
- Vaciar el array de order y que el carrito quede vacío (Button "#delete-order")
- Responsive

*/