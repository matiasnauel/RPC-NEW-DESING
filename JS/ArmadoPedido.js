


// expandir imagen
function call_mouseover_expand(id) {
  
    var imagen = document.getElementById(id);
    imagen.style.webkitTransform = "scale(1.1)";
}
function call_mouseout_retroced(id) {
    var imagen = document.getElementById(id);
    imagen.style.webkitTransform = "scale(1)";
}

//esta flama esto


// Mobile menu desplegar

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("mapita").style.zIndex =  "-1";
    document.getElementById("redline").style.zIndex =" -1";
    

  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mapita").style.zIndex =  "1";
    document.getElementById("redline").style.zIndex =" 1";
  }

//   Carrito
function openNavCarrito() {
    document.getElementById("SlideCarrito").style.width = "100%";
    document.getElementById("mapita").style.zIndex =  "-1";
    document.getElementById("redline").style.zIndex =" -1";

  }
  
  function closeNavCarrito() {
    document.getElementById("SlideCarrito").style.width = "0";
    document.getElementById("mapita").style.zIndex =  "1";
    document.getElementById("redline").style.zIndex =" 1";
  }

//   Modal iniciar sesión
if(document.getElementById("btnModal")){
    var modal = document.getElementById("tvesModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("close")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }
}
// JavaScript Document
$(document).ready(function () {
    $('#autoWidth').lightSlider({
        autoWidth: true,
        loop: true,
        onSliderLoad: function () {
            $('#autoWidth').removeClass('cS-hidden');
        }
    });
});
var map = L.map('mapita').setView([-34.601528, -58.375111], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.601528, -58.375111], 20).addTo(map)
    .bindPopup('Galeria Jardin,Local 429')
    .openPopup();


// Armado del pedido, verificar si se encuentra el cliente y llenar y los datos del formulario
var L = localStorage;


const Correo =  document.getElementById("correo");
Correo.value = L.getItem("Correo_User");
Correo.disabled= true;

//funciona
function realizarreserva()
{
  
    var objeto = {
        clienteID: localStorage.getItem("clienteID"),
        productos: JSON.parse(localStorage.getItem("productos"))    
    }
  $.ajax({
    type: "POST",
    data: JSON.stringify(objeto),
    url: "https://localhost:44376/api/Venta/RealizarReserva",
    dataType: "JSON",
    contentType: "application/json",
    success: function(data) {
      localStorage.setItem("ventaID",data.id);
      location.href="ArmadoPedido.html";
   
    },

      error: function(error) {
    console.log(error.message);
    alert('error');
}



   });


}

function completarReserva()
{
    var nombre = document.getElementById("nombre");
    var apellido = document.getElementById("apellido");
    var dni = document.getElementById("dni");

    var direccion = document.getElementById("direccion");
    var localidad = document.getElementById("localidad");
    var codigoPostal = document.getElementById("codigoPostal");
    var comment = document.getElementById("comment");
    var objeto = {
        nombre: nombre.value,
        apellido:apellido.value,
        dni:dni.value,
        direccion:direccion.value,
        localidad:localidad.value,
        codigopostal:codigoPostal.value,
        referencias: comment.value,
        ventaID : 3
        
        
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(objeto),
        url: "https://localhost:44376/api/FacturaCompra/SubirFacturaCompra",
        dataType: "JSON",
        contentType: "application/json",

        success: function(data) {
            EnviarEmail();
            
        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }


    });
    

}    
function EnviarEmail(){
    var obj = {
        productos: JSON.parse(localStorage.getItem("productos")),
        email: localStorage.getItem("Correo_User")
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(obj),
        url: "https://localhost:44376/api/FacturaCompra/GenerarComprobanteEmailPDF",
        dataType: "JSON",
        contentType: "application/json",

        success: function(data) {
            alert("se ha enviado un email a su casilla con las instrucciónes para finalizar con el proceso de compra! ");
            localStorage.removeItem("productos");
            localStorage.removeItem("ventaID");
            location.href="index.html";

        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }


    });
}

var botonArmadoPedido = document.getElementById("armadoPedidoBoton");
botonArmadoPedido.addEventListener("click",(e) =>{
    e.preventDefault();
    completarReserva();
})