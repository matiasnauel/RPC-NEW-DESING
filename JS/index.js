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
                <button class="DescartarArticulo-carrito">X</button> 
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
        <button class="vaciar-carrito">VACIAR CARRITO</button>
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
          
          alert("tu comprobante ha sido recibido con exito");
          Imagen=null;
          localStorage.removeItem("ventaID");
        },
    
          error: function(error) {
        console.log(error.message);
        alert('error');
    }
    
    
    
       });
    }
       else{
            alert("debe primero subir una imagen y seleccionar una compra");
       }


});

$.ajax({
    type: "GET",
    url: "https://localhost:44325/api/Publicacion/TraerPublicacionesDestacadas",
    dataType: "json",
    success: function(data) {
      var autowidth= document.getElementById("autoWidth");  
     $.each(data, function(i, item) {
     autowidth.innerHTML+=`       
     <li class="item-a">
     <!--box-slider--------------->
     <div class="box">
         <!--img-box---------->
         <div class="slide-img">
             <img alt="1" src="${item.imagenes[0]}" >
             <!--overlayer---------->
             <div class="overlay">
                 <!--buy-btn------>
                 <a href="publicacion.html" class="buy-btn" id="${item.publicacionID}" onclick="VerProductos(this.id);">Ver producto</a>
             </div>
         </div>
         <!--detail-box--------->
         <div class="detail-box">
             <!--type-------->
             <div class="type">
                 <a href="ProductosListado.html">${item.nombre}</a>
             </div>
             <!--price-------->
             <a href="publicacion.html" class="price">$${item.precio}</a>

         </div>

     </div>
 </li>
     `;
     
    
   
    });


    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }

});



