


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
        ventaID : localStorage.getItem("ventaID")
        
        
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
});

window.onload = function() 
{
  

    $.ajax({
        type: "GET",
        url: "https://localhost:44381/api/Categoria/TraerCategorias",
        dataType: "json",

        success: function(data) {
            var desplegable=document.getElementById("desplegable");
            $.each(data, function(i, item) {
             desplegable.innerHTML+=`
             <li><a onclick="ProductosCategoria('${item}');" >${item}<span
             class="glyphicon glyphicon-chevron-right" ></span></a></li>
             `;


            });



        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }

   
        });


    

}


function VerProductos(id) {
  
var parametro = "publicacionID";
var valor = id;

localStorage.setItem(`${parametro}`, `${valor}`);
    
}



function VerTodosDestacados() 
{
    var parametro = "tipo";
    var valor = "destacados"
    localStorage.setItem(`${parametro}`, `${valor}`);     
}







var buscador= document.getElementById("form");
buscador.addEventListener('submit',function(e) {
e.preventDefault();
var filtro=document.getElementById("Search-main");
console.log(filtro.value);
var parametro = "tipo";
var valor = "Buscador"
localStorage.setItem(`${parametro}`, `${valor}`);   
var contenido = "contenido";
var valorcontenido = filtro.value;
localStorage.setItem(`${contenido}`, `${valorcontenido}`);
location.href="ProductosListado.html";
});


function ProductosCategoria(valor2) 
{
    var parametro = "tipo";
    var valor = "categoria"
    localStorage.setItem(`${parametro}`, `${valor}`);   
    var contenido = "contenido";
    var valorcontenido = valor2;
    localStorage.setItem(`${contenido}`, `${valorcontenido}`);
    location.href="ProductosListado.html";  
    
    //acordarse de sacar esto
 
}

function verproductoscarrito()
{
    if(localStorage.getItem("productos")==null)
    {
        

        $('#Error').modal('show');
    
    }
    else{
    
    var objeto = {
        productos: JSON.parse(localStorage.getItem("productos"))
        
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(objeto),
        url: "https://localhost:44368/api/Carro/TraerProductosValorCantidadCarrito",
        dataType: "JSON",
        contentType: "application/json",

        success: function(data) {
            
            var contenedorcarrito=document.getElementById("contenedorcarrito");
            contenedorcarrito.innerHTML="";
            var valor=data.valorcarrito;
            $.each(data.productos, function(i, item) 
            {

            contenedorcarrito.innerHTML+=`
            <div class="productos-carrito">
            <div class="site-image-carrito">
                <img src="${item.imagenes[0]}" alt="">
            </div>
            <div class="site-information-carrito">
                <p>${item.nombre}</p> 
                <span>${item.precio}x${item.cantidad}</span>
               
            </div>
            <div class="boton-carrito-modal">
            <button class="DescartarArticulo-carrito" onclick="QuitarProducto(${item.id});">X</button> 
            </div>
        </div>
            
            
            
            `;


            });
          contenedorcarrito.innerHTML+= ` 
          <div class="Total-carrito">
            <p>TOTAL: $${valor}</p>
            </div>         
          `;

          contenedorcarrito.innerHTML+= `
        <div class="OpcionCarrito">
        <button class="vaciar-carrito" onclick="VaciarCarrito();">VACIAR CARRITO</button>
        <button class="comprar-carrito" onclick="realizarreserva();">COMPRAR</button>
        </div>
          ` ; 

        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }


    });
}

}



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

var abrirsectorcomprobante=document.getElementById("abrirsectorcomprobante");
abrirsectorcomprobante.addEventListener('click',function(e) {
    e.preventDefault();
    $.ajax({
        type: "GET",
        url: "https://localhost:44376/api/Venta/MostrarVentasNoPagadasDelCliente?clienteID="+localStorage.getItem("clienteID"),
        dataType: "json",

        success: function(data) {
            var contenedorventas=document.getElementById("contenedor-ventas");
            contenedorventas.innerHTML="";

            $.each(data, function(i, item) {
             contenedorventas.innerHTML+=`
             <tr>
             <td><label class="checkbox-inline" name="venta"><input type="checkbox" value="" onchange="cambioselector(${item.id});"></label></td>
             <td>Impago</td>
             <td>${item.fecha}</td>
             <td>${item.id}</td>
             </tr>    
             
             `;


            });



        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }

   
        });
    });

    
//esto es para cuando el cliente selecciona la venta a la cual quiere subir el comprobante.
function cambioselector(ventaID)
{  
    /*var comprobante=document.getElementById("enviarcomprobante");
    
    if(comprobante.style.display=="block")
    {
    comprobante.style.display="none";
    }
    else
    {
        comprobante.style.display="block";
        comprobante.value=ventaID;
    }
    */
    localStorage.setItem("ventaID",ventaID);
}



const URL_CLOUDINARI_PRESET ="https://api.cloudinary.com/v1_1/rpc-computacion/image/upload";
const CLOUNDDINARY_UPLOAD_PRESET ="dez1rdb5";
const publicar = document.getElementById("enviarcomprobante");
var Imagen;
// Input file
const input = document.getElementById('files');
let ArrayFile =[];
input.onchange = function(e){
  var files = e.target.files;
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    ArrayFile.push(element);
  }
  ArrayFile.forEach(async function(elemento){
    // Ahora ese elemento debo ir enviandolo al servidor
  
   const formData =  new FormData();
    formData.append('file',elemento);
    formData.append('upload_preset',CLOUNDDINARY_UPLOAD_PRESET);
   const res = await axios.post(URL_CLOUDINARI_PRESET,formData,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    
    Imagen= res.data.secure_url;
   
  })
}


var enviarcomprobante=document.getElementById("enviarcomprobante");
enviarcomprobante.addEventListener('click',function(e) {
    e.preventDefault();
    var objeto ={
        imagen:Imagen,
        ventaID:localStorage.getItem("ventaID")
    }
    if(Imagen!=null && localStorage.getItem("ventaID")!=null)
    {
    $.ajax({
        type: "POST",
        data: JSON.stringify(objeto),
        url: "https://localhost:44376/api/ComprobantePago/SubirComprobantePago",
        dataType: "JSON",
        contentType: "application/json",
        success: function(data) {
          
        
          document.getElementById("enviarcomprobante").setAttribute("data-target","#ComprobanteSubidoBien");
          Imagen=null;
          localStorage.removeItem("ventaID");
          $('#subirArchivo').modal('toggle'); 
          $('#ComprobanteSubidoBien').modal('show'); 
        },
    
          error: function(error) {
        console.log(error.message);
       ;
    }
    
    
    
       });
    }
       else{
            
            document.getElementById("enviarcomprobante").setAttribute("data-target","#ErrorComprobante");
       }


});


// quitar elemento de un carrito 

function QuitarProducto(productoid){
    var encontrado = false;
    var productosLocal = JSON.parse(localStorage.getItem("productos"));
    productosLocal.forEach(item=>{
        if(productoid == item && encontrado==false){
            alert("esta aca");
            productosLocal.splice(productosLocal,1);
            localStorage.setItem("productos",JSON.stringify(productosLocal));
            console.log(item);
            encontrado = true;
  
        }
  
  
  
    })
    return false;
  }
  
  function VaciarCarrito(){
    localStorage.removeItem("productos");
    document.getElementById("contenedorcarrito").innerHTML="";
    var modal = document.getElementById("tvesModal").style.display="none";
    location.reload();
    return false;
  }

//   ModalCarrito
if(document.getElementById("btnModal") && localStorage.getItem("productos") == null ){
   
    var modal = document.getElementById("tvesModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("closed")[0];
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

function carritoValores(){
    if(localStorage.getItem("productostotalCantidad") != null &&  localStorage.getItem("productosTotalCarrito")!= null){
      document.getElementById("cantidadCarrito").innerHTML =  `(${localStorage.getItem("productostotalCantidad")}) $${localStorage.getItem("productosTotalCarrito")} `;
    }
    else{
      document.getElementById("cantidadCarrito").innerHTML ="(0) $0,00";
    }
}

carritoValores();
