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
 <p>
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
if(cantidad<stockmaximo){

if(localStorage.getItem("productos")!=undefined){
var array = localStorage.getItem("productos");
array= JSON.parse(array);
for(x=0; x<cantidad;x++)
{
array.push(productoID);
}

localStorage.setItem("productos",JSON.stringify(array));
}
else
{
  var arrayobjeto= [];
  for(x=0; x<cantidad;x++)
  {
  arrayobjeto.push(productoID);
  }
  localStorage.setItem("productos", JSON.stringify(arrayobjeto));

}
}
else{
  alert("no puede agregar esa cantidad a su carrito");
}
}


// Pasar productos y categorias 

function verproductoscarrito()
{
  if(localStorage.getItem("productos")==null)
  {

    var error = document.getElementById("icons-shooping-card");
    var a = document.createAttribute("data-target");
    a.value="#Error"
    error.setAttributeNode(a);
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
      var contenedorcarrito=document.getElementById("contenedorcarrito");
      var ativarCarrito = document.getElementsByClassName("carritoActivar");
      document.getElementById("icons-shooping-card").removeAttribute("data-toggle")
      ativarCarrito.id = "btnModal";
      contenedorcarrito.innerHTML="";
      var valor=data.valorcarrito;
      console.log(data.formData)
      data.productos.forEach(item=>{  
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
      })
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
enviarcomprobante.addEventListener('click',function(e){
  e.preventDefault();
  var objeto ={
    imagen:Imagen,
    ventaID:localStorage.getItem("ventaID")
}
if(Imagen!=null && localStorage.getItem("ventaID")!=null)
{
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
      alert("tu comprobante ha sido recibido con exito");
      Imagen=null;
      localStorage.removeItem("ventaID");
      
    })
    .catch(error =>{
      alert('error');
    })
}
else{
  alert("debe primero subir una imagen y seleccionar una compra");
}

});

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


function Comentar()
{
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
   
      location.reload()
    })
    .catch(err => console.log('ERROR: ' + err));
}