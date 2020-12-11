window.onload = function traerProductos() {

  fetch("https://localhost:44325/api/Publicacion/PublicacionCompleta?publicacionID="+localStorage.getItem("publicacionID"))
      .then(function(response) {
          return response.json();
      })
      .then(function(data) {
          Contenido(data)
        
      })
     .catch (error =>{
      console.log(error);
     }) 
        
      
fetch("https://localhost:44381/api/Categoria/TraerCategorias")
.then(function(response) {
    return response.json();
})
.then(function(data) {
  var desplegable=document.getElementById("desplegable");
  data.forEach(item=>{
    desplegable.innerHTML+=`
    <li><a onclick="ProductosCategoria('${item}');" >${item}<span
    class="glyphicon glyphicon-chevron-right" ></span></a></li>
    `;


  })
    
})
.catch (error =>{
console.log(error);
}) 
fetch("https://localhost:44381/api/Categoria/TraerCategorias")
.then(function(response) {
    return response.json();
})
.then(function(data) {
  var desplegable=document.getElementById("categoriaMobile");
  data.forEach(item=>{
    desplegable.innerHTML+=`
           <li><a onclick="ProductosCategoria('${item}');" >${item}<span
           class="glyphicon glyphicon-chevron-right" ></span></a></li>
           `;


  })
    
})
.catch (error =>{
console.log(error);
}) 

}

//Variables ByiD
var contenedorimagenprincipal= document.getElementById("site-image-main");
var contenedorsecundario= document.getElementById("site-image-after");
var descripcionproducto=document.getElementById("DescripcionProducto");
var siteinformation = document.getElementById("site-information");
var comentariosyrespuesta=document.getElementById("comments-list");


function Contenido(data){
 
    contenedorimagenprincipal.innerHTML+=`
  <img src="${data.producto.imagenes[0]}" alt="" id="main-image">
  `; 
  if(data.producto.imagenes[1]!=null){
  for( x=0; x<data.producto.imagenes.length; x++)
  {
    contenedorsecundario.innerHTML+=`
    <div class="producto-imagen">
    <img src="${data.producto.imagenes[x]}" alt="" onclick="setSrc('main-image', this.src)">
    </div>
    
    
    `;
    }  
  }// finaliza el if data imagen
  if(data.producto.stock>0){
    siteinformation.innerHTML+=`
    <div class="titulo-encabezado" id="stock">
    <p>Nuevo-Stock disponible</p>
  </div>`;
  }
  else{
    siteinformation.innerHTML+=`
    <div class="titulo-encabezado" id="stock">
    <p>No hay stock disponible</p>
  </div>`;
  }// finaliza el stock producto
  siteinformation.innerHTML+=`
<div class="titulo-publi" id="nombreproducto">
  <h4>${data.producto.nombre}</h4>
</div>
<div class="codigo" id="idproducto">
  <p><b>CODIGO: </b>${data.producto.id}</p>
</div>
<div class="price" id="precioproducto">
  <h4>$${data.producto.precio}</h4>
</div>
<div class="descripción-publi">
  <p class="envios"><img src="img/camion-de-reparto.png" alt="" style="width: 4%;"> Envíos con normalidad</p>
  <p class="cuotas"> <img src="img/tarjetas.svg" alt="" style="width:3%;"> Paga hasta 12 cuotas</p>
  <div class="tarjetas-horizontal">
      <img src="img/tarjeta-mastercard.svg" alt="" style="width: 6%;">
      <img src="img/logotipo-de-visa.svg" alt="" style="width: 6%;">
      <img src="img/simbolo.svg" alt="" style="width: 6%;">
      <img src="img/dinero.svg" alt=""style="width: 6%;">
  </div>
</div>
<div class="garantia">
  <p><img src="img/garantia.svg" alt="" style="width: 19px;"> Garantia de 2 meses</p> 
</div>
<div class="cantidad"  id="maximostock">
  <p>Cantidad:  <input  type="number" min="1" max="${data.producto.stock}" value="1"  id="cantidadstock" > </p>
 
</div>`; // finaliza el template comun del contenido del producto 
siteinformation.innerHTML+=`
<div class="btn-sección">

  <button class="btn-agregar" onclick="AgregarAlCarrito(${data.producto.id},${data.producto.stock});">Agrega al carrito</button>
</div>

`;
 descripcionproducto.innerHTML = `
 <p style =" word-break: break-all;
 word-wrap: break-word;">
 ${data.producto.descripcion}     
 </p>
 `;
 
 data.comentariosyrespuesta.forEach(item => {
  comentariosyrespuesta.innerHTML+=`
  <li id="comentariosyrespuestas">
  <div class="comment-main-level">
  <!-- Avatar -->
  <div class="comment-avatar"><img src="${item.clienteIMAGEN}" alt=""></div>
  <!-- Contenedor del Comentario -->
  <div class="comment-box">
      <div class="comment-head">
          <h6 class="comment-name by-author"><a >x</a></h6>
      </div>
      <div class="comment-content">
      ${item.comentario} 
      </div>
  </div>
</div>`+sihayrespuesta(item.respuesta)+`</li>
 `;
 });
} //Finaliza el contenido


function sihayrespuesta(respuesta)
{
if(respuesta=="null"){
 return ``;
 
}
else{
  return `
  <ul class="comments-list reply-list">
  <li>
      <!-- Avatar -->
      <div class="comment-avatar admin "><img src="img/logoajjaja-removebg-preview.ico" alt=""></div>
      <!-- Contenedor del Comentario -->
      <div class="comment-box">
          <div class="comment-head">
              <h6 class="comment-name "><a >Rpc Computación</a></h6>
              
          </div>
          <div class="comment-content">
          ${respuesta} 
          </div>
      </div>
  </li>

</ul>`;
}
}
function AgregarAlCarrito(productoID,stockmaximo)
{
var cantidad=parseInt(document.getElementById('cantidadstock').value);
var productosLocalContador = JSON.parse(localStorage.getItem("productos"));
if(cantidad<stockmaximo){

if(localStorage.getItem("productos")!=undefined){
var array = localStorage.getItem("productos");
array= JSON.parse(array);
for(x=0; x<cantidad;x++)
{
array.push(productoID);
}

localStorage.setItem("productos",JSON.stringify(array));
var objeto = {
  productos: JSON.parse(localStorage.getItem("productos"))
  
}

if(JSON.parse(localStorage.getItem("productos") != null)){
  fetch("https://localhost:44368/api/Carro/TraerProductosValorCantidadCarrito", {
'method': 'POST',
'mode': 'cors',
'body': JSON.stringify(objeto),
'headers': {
    'Content-Type': 'application/json',
    
},
})
.then(function(response) {
  return response.json();
 })
.then(function(data) {
  data.productos.forEach(item=>{
    document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${data.valorcarrito} `;
    document.getElementById("itemCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) `;
    localStorage.setItem("productosTotalCarrito",data.valorcarrito);
 
  })
  
})
.catch(err => console.log('ERROR: ' + err));
}
 
}
else
{
 
  var arrayobjeto= [];
  for(x=0; x<cantidad;x++)
  {
  arrayobjeto.push(productoID);
  }
  localStorage.setItem("productos", JSON.stringify(arrayobjeto));
  if(JSON.parse(localStorage.getItem("productos") != null)){
    var objeto = {
      productos: JSON.parse(localStorage.getItem("productos"))
      
    }
    fetch("https://localhost:44368/api/Carro/TraerProductosValorCantidadCarrito", {
  'method': 'POST',
  'mode': 'cors',
 'body': JSON.stringify(objeto),
  'headers': {
      'Content-Type': 'application/json',
      
  },
  })
  .then(function(response) {
    return response.json();
   })
  .then(function(data) {
  

    data.productos.forEach(item=>{
      document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${data.valorcarrito} `;
      document.getElementById("itemCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) `;
      localStorage.setItem("productosTotalCarrito",data.valorcarrito);
   
    })
    
  })
  .catch(err => console.log('ERROR: ' + err));
  }
  
}
}
else{
  var div  = document.createElement("div");
  div.id ="errorImagen";
  if($("#errorImagen").length > 0 ){
    $("#ErrorSeleccionarImagen").modal("show");
  }
  else{
    div.innerHTML = `
         
    <div class="modal fade " id="ErrorSeleccionarImagen" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="dataError">
                <div class="modal-header"  style="background-color: red;" >
                    <h4 class="modal-title text-center" style="color: white;" id="myModalLabel">ATENCIÓN! <span class="glyphicon glyphicon-ban-circle"></span>  </i></h4>
                </div>
                <div class="moda-body text-center">
                    <p style="margin: 20px;">No se puede agregar esa cantidad al carrito!</p>
                </div>
                <div class="modal-footer " style="background-color: red;" >
                    <button type="button" class="btn" data-dismiss="modal">Cerrar</button>
                </div>
            </form>
        </div>
    </div>
   </div>
   `
   document.body.insertBefore(div,null);
   $("#ErrorSeleccionarImagen").modal("show");
  }

}
}


// Pasar productos y categorias 

function verproductoscarrito()
{ 
  document.getElementById("btnModal").dataset.target ="#null";
  if(localStorage.getItem("productos")==null || JSON.parse(localStorage.getItem("productos")) == "")
  {
    var modal = document.getElementById("tvesModal").style.display="none";

    document.getElementById("btnModal").dataset.target ="#Error";

   
  }
 

  else{
    
  var objeto = {
      productos: JSON.parse(localStorage.getItem("productos"))
      
  }
   fetch("https://localhost:44368/api/Carro/TraerProductosValorCantidadCarrito", {
    'method': 'POST',
    'mode': 'cors',
   'body': JSON.stringify(objeto),
    'headers': {
        'Content-Type': 'application/json',
        
    },
    })
    .then(function(response) {
      return response.json();
     })
    .then(function(data) {
      document.getElementById("btnModal").dataset.target ="#null";
  
      var contenedorcarrito=document.getElementById("contenedorcarrito");
   
      contenedorcarrito.innerHTML="";
      var valor=data.valorcarrito;
      data.productos.forEach(item=>{  
        
        contenedorcarrito.innerHTML+=`
        <div class="productos-carrito" id=${item.id}>
        <div class="site-image-carrito">
            <img src="${item.imagenes[0]}" alt="">
        </div>
        <div class="site-informacion-carrito1">
        <p>${item.nombre}</p> 
        <span>$${item.precio}x${item.cantidad}</span>
        </div>
        <div>
            
        <button class="DescartarArticulo-carrito" id="quitarElemento" onclick="return QuitarProducto(${item.id},${item.cantidad},${data.valorcarrito})">X</button> 

        </div>
        </div>
        `;
     
      })
      contenedorcarrito.innerHTML+= ` 
      <div class="Total-carrito">
        <p>TOTAL: $${valor}</p>
        </div>         
      `;
      document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${valor} `;
     
      contenedorcarrito.innerHTML+= `
      <div class="OpcionCarrito">
      <button class="vaciar-carrito"  onclick="return VaciarCarrito();" >VACIAR CARRITO</button>
      <button class="comprar-carrito" onclick="realizarreserva();">RESERVAR CARRITO</button>
      </div>
        ` ; 
    })
    .catch(err => console.log('ERROR: ' + err));
  }
}
function realizarreserva(){
  var objeto = {
    clienteID: localStorage.getItem("clienteID"),
    productos: JSON.parse(localStorage.getItem("productos"))    
  }
  fetch("https://localhost:44376/api/Venta/RealizarReserva", {
    'method': 'POST',
    'mode': 'cors',
   'body': JSON.stringify(objeto),
    'headers': {
        'Content-Type': 'application/json',
        
    },   })
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
        location.href="ArmadoPedido.html";
        localStorage.setItem("IdVenta",data.id)
    })
    .catch(err=>{
      alert('error');
    })
}
var abrirsectorcomprobante=document.getElementById("abrirsectorcomprobante");
abrirsectorcomprobante.addEventListener('click',function(e) {
  e.preventDefault();
  fetch("https://localhost:44376/api/Venta/MostrarVentasNoPagadasDelCliente?clienteID="+localStorage.getItem("clienteID"))
  .then(function(response) {
      return response.json();
  })
  .then(function(data) {
    var contenedorventas=document.getElementById("contenedor-ventas");
    contenedorventas.innerHTML="";
    data.forEach(item=>{
      contenedorventas.innerHTML+=`
      <tr>
      <td><label class="checkbox-inline" name="venta"><input type="checkbox" value="" onchange="cambioselector(${item.id});"></label></td>
      <td>Impago</td>
      <td>${item.fecha}</td>
      <td>${item.id}</td>
      </tr>    
      
      `;
    })

  })
 .catch (error =>{
  alert('error');
 }) 
    
});
var enviarcomprobante=document.getElementById("enviarcomprobante");
enviarcomprobante.addEventListener('click', function(e){
  e.preventDefault();
  var objeto ={
    imagen:Imagen,
    ventaID:localStorage.getItem("ventaID")
}
if(Imagen!=null && localStorage.getItem("ventaID")!=null)
{
  document.getElementById("enviarcomprobante").dataset.target ="#ComprobanteSubidoBien";
  fetch("https://localhost:44376/api/ComprobantePago/SubirComprobantePago", {
    'method': 'POST',
    'mode': 'cors',
   'body': JSON.stringify(objeto),
    'headers': {
        'Content-Type': 'application/json',
        
    },   })
    .then(function(response) {
      return response.json();
     
    })
    .then(function(data){
     
     
 

      Imagen=null;
      localStorage.removeItem("ventaID");
     
     
    })
    .catch(error =>{
      
    })

}
else{
 
  document.getElementById("enviarcomprobante").dataset.target ="#ErrorComprobante";

}

});

var cerrarModalBien = document.getElementById("cerrarModalBien");
cerrarModalBien.addEventListener("click",function(e){
  e.preventDefault();
  location.reload();
})
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
function ProductosCategoria(valor2) 
{
    var parametro = "tipo";
    var valor = "categoria"
    localStorage.setItem(`${parametro}`, `${valor}`);   
    var contenido = "contenido";
    var valorcontenido = valor2;
    localStorage.setItem(`${contenido}`, `${valorcontenido}`);
    location.href="ProductosListado.html";  
    

}


 function Comentar()
{
  document.getElementById("comentarid").dataset.target = "#null";
  if( localStorage.getItem("clienteID") == undefined ){
        document.getElementById("comentarid").dataset.target = "#IngreseCliente";
  }
  else{
    var comentartext = document.getElementById("comentarTextid").value;
    var objeto = {
        comentario: comentartext,
        clienteID : localStorage.getItem("clienteID"),
        publicacionID : localStorage.getItem("publicacionID")
      
     }
     fetch("https://localhost:44325/api/ComentarioPublicacion/InsertarComentarioPublicacion", {
      'method': 'POST',
      'mode': 'cors',
     'body': JSON.stringify(objeto),
      'headers': {
          'Content-Type': 'application/json',
          
      },
      })
      .then(function(response) {
        return response.json();
       })
      .then(function(data) {
      
          comentariosyrespuesta.innerHTML+=`
          <li id="comentariosyrespuestas">
          <div class="comment-main-level">
          <!-- Avatar -->
          <div class="comment-avatar"><img src="${item.clienteIMAGEN}" alt=""></div>
          <!-- Contenedor del Comentario -->
          <div class="comment-box">
              <div class="comment-head">
                  <h6 class="comment-name by-author"><a >x</a></h6>
              </div>
              <div class="comment-content">
              ${item.comentario} 
              </div>
          </div>
        </div>`+sihayrespuesta(item.respuesta)+`</li>
         `;
    
    
    })
  }
  
}
// quitar elemento de un carrito 

function QuitarProducto(productoid,valor){

  var encontrado = false;
  var productosLocal = JSON.parse(localStorage.getItem("productos"));


    productosLocal.forEach(item=>{
      if(productoid == item && encontrado==false){
          if(productosLocal.length == 1){
       
            // eliminar un 1 elemento desde el indice 3
            // productosloca es el indice y 1 es es la cantidad de elementos a eliminar
            productosLocal.splice(0,1);
            
            localStorage.setItem("productos",JSON.stringify(productosLocal));
            encontrado = true;
        
            verproductoscarrito();

            localStorage.removeItem("productostotalCantidad");
            localStorage.removeItem("productosTotalCarrito");
            carritoValores();
        
          }
          else{
      
          
            removeItemFromArr(productosLocal,productoid);
            localStorage.setItem("productos",JSON.stringify(productosLocal));
        
            document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${valor} `;
            localStorage.setItem("productosTotalCarrito",valor);
          
            encontrado = true;
            verproductoscarrito();
          }
      
          
      }
     
     
     
  })
  return false;
}

function VaciarCarrito(){

  localStorage.setItem("productos","[]");
  localStorage.removeItem("productosTotalCarrito");
  localStorage.removeItem("productostotalCantidad");
  document.getElementById("contenedorcarrito").innerHTML="";
  document.getElementById("cantidadCarrito").innerHTML ="(0) $0,00";
  var modal = document.getElementById("tvesModal").style.display="none";
  location.reload();
  return false;
}
function carritoValores(){
  if(localStorage.getItem("productostotalCantidad") != null &&  localStorage.getItem("productosTotalCarrito")!= null){
    document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${localStorage.getItem("productosTotalCarrito")} `;
   
  }
  else{
    document.getElementById("cantidadCarrito").innerHTML ="(0) $0,00";
    localStorage.removeItem("productos");
  }
}
document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${JSON.parse(localStorage.getItem("productosTotalCarrito"))} `;

carritoValores();

// remover un archivo de un array
function removeItemFromArr ( arr, item ) {
  var i = arr.indexOf( item );

  if ( i !== -1 ) {
      arr.splice( i, 1 );
  }
}



function verProductoscarritomobile(){
  // document.getElementById("SlideCarrito").dataset.target ="#null";
  if(localStorage.getItem("productos")==null || JSON.parse(localStorage.getItem("productos")) == "")
  {
  
   
      document.getElementById("carrito-sub-menu").dataset.target ="#Error";
  }
 

  else{
  var objeto = {
    productos: JSON.parse(localStorage.getItem("productos"))
    
}
 fetch("https://localhost:44368/api/Carro/TraerProductosValorCantidadCarrito", {
  'method': 'POST',
  'mode': 'cors',
 'body': JSON.stringify(objeto),
  'headers': {
      'Content-Type': 'application/json',
      
  },
  })
  .then(function(response) {
    return response.json();
   })
  .then(function(data) {
    document.getElementById("SlideCarrito").dataset.target ="#null";
    var modal = document.getElementById("tvesModal").style.display="block";
    var contenedorcarrito=document.getElementById("SlideCarrito");
 
    contenedorcarrito.innerHTML="";
    var valor=data.valorcarrito;
    contenedorcarrito.innerHTML = `
    <a href="javascript:void(0)" class="closebtn2" onclick="closeNavCarrito()">&times;</a>
    <h2 style="padding-bottom: 20px; color: white;">Mi Carrito</h2>
    `;
    data.productos.forEach(item=>{  
   
      contenedorcarrito.innerHTML+=`
      <div class="productos-carrito">
      <div class="site-image1">
          <img src="${item.imagenes[0]}" alt="">
      </div>
      <div class="site-information1">
          <p>${item.nombre}</p> 
          <span>$${item.precio}x${item.cantidad}</span>
      </div>
      <div style="align-self: center;">
     <button class="DescartarArticulo" onclick="QuitarProductoMobil(${item.id},${item.precio},${data.valorcarrito});">X</button> 
      </div>
      </div>
      
      
      `;
     

      });
    contenedorcarrito.innerHTML+= ` 
    <div class="Total">
    <p>TOTAL:$${valor}</p>
    </div>        
    `;
    
    localStorage.setItem("productosTotalCarrito",data.valorcarrito);
    contenedorcarrito.innerHTML+= `
    <div class="OpcionCarrito">
      <button class="vaciar" onclick="VaciarCarrito();">VACIAR CARRITO</button>
      <button class="comprar" onclick="realizarreserva();">RESERVAR</button>
    </div>
    ` ; 

  })
  .catch(err => console.log('ERROR: ' + err));
  }
}

 

function QuitarProductoMobil(productoid,precio,valor){

  var encontrado = false;
  var productosLocal = JSON.parse(localStorage.getItem("productos"));
 

  productosLocal.forEach(item=>{
      if(productoid == item && encontrado==false){
          if(productosLocal.length == 1){
       
            // eliminar un 1 elemento desde el indice 3
            // productosloca es el indice y 1 es es la cantidad de elementos a eliminar
            productosLocal.splice(0,1);
            
            localStorage.setItem("productos",JSON.stringify(productosLocal));
            encontrado = true;
        
            
         
            localStorage.removeItem("productostotalCantidad");
            localStorage.removeItem("productosTotalCarrito");
            carritoValores();
            closeNavCarrito();
            document.getElementById("itemCarrito").innerHTML =  `(0) `;
          }
          else{
         
            
            removeItemFromArr(productosLocal,productoid);
            localStorage.setItem("productos",JSON.stringify(productosLocal));
            document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${valor} `;
            localStorage.setItem("productosTotalCarrito",valor);
            document.getElementById("itemCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) `;
            encontrado = true;
          
            verProductoscarritomobile();
            
          }
      
          
      }
     
     
     
  })
  return false;
}
document.getElementById("itemCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) `;