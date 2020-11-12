$.ajax({
  type: "GET",
  url: "https://localhost:44325/api/Publicacion/PublicacionCompleta?publicacionID="+1,
  dataType: "json",

  success: function(data) {
   var contenedorimagenprincipal= document.getElementById("site-image-main");
   var contenedorsecundario= document.getElementById("site-image-after");
   var descripcionproducto=document.getElementById("DescripcionProducto");
      contenedorimagenprincipal.innerHTML+=`
   <img src="img/${data.producto.imagenes[0]}" alt="" id="main-image">
   `; 
   if(data.producto.imagenes[1]!=null){
   for( x=0; x<data.producto.imagenes.length; x++)
   {
     contenedorsecundario.innerHTML+=`
     <div class="producto-imagen">
     <img src="img/${data.producto.imagenes[x]}" alt="" onclick="setSrc('main-image', this.src)">
     </div>
     
     
     `;
   }  
  }

  var siteinformation = document.getElementById("site-information");
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
  }

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
 
</div>`;

siteinformation.innerHTML+=`
<div class="btn-sección">

  <button class="btn-agregar" onclick="AgregarAlCarrito(${data.producto.id},${data.producto.stock});">Agrega al carrito</button>
</div>

`;

descripcionproducto.innerHTML=`
<p>
${data.producto.descripcion}     
</p>`;




      var comentariosyrespuesta=document.getElementById("comments-list");
      $.each(data.comentariosyrespuesta, function(i, item) {
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
    </div>`+sihayrespuesta(item.respuesta)+
     
    
    `</li>
       `;
    


      });



  },
  error: function(error) {
      console.log(error.message);
      alert('error');
  }


});


function sihayrespuesta(respuesta)
{
if(respuesta==null){
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
var array = localStorage.getItem("productos");
array= JSON.parse(array);
for(x=0; x<cantidad;x++)
{
array.push(productoID);
}

localStorage.setItem("productos",JSON.stringify(array));
}
else{
  alert("no puede agregar esa cantidad a su carrito");
}
}


// expandir imagen
function call_mouseover_expand(id) {
  
    var imagen = document.getElementById(id);
    imagen.style.webkitTransform = "scale(1.1)";
}
function call_mouseout_retroced(id) {
    var imagen = document.getElementById(id);
    imagen.style.webkitTransform = "scale(1)";
}



//MenuBurger
const menuBurger = document.getElementById("MenuBurger");
menuBurger.addEventListener('click',e=>{
    e.preventDefault();
    var x = document.getElementById("menu-burger");
    if (x.style.display === "block") {
      x.style.display = "none";
  
    } else {
      x.style.display = "block";
      
    }
})
//CategoriaBurger
const CategoriaBurger = document.getElementById("misCategoriasMobile");
CategoriaBurger.addEventListener('click',e=>{
    e.preventDefault();
    var x = document.getElementById("categoriaMobile");
    if (x.style.display === "block") {
      x.style.display = "none";
  
    } else {
      x.style.display = "block";
      
    }
})

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

//   ModalCarrito
if(document.getElementById("btnModal")){
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

var map = L.map('mapita').setView([-34.601528, -58.375111], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-34.601528, -58.375111], 20).addTo(map)
    .bindPopup('Galeria Jardin,Local 429')
    .openPopup();


// Input file 



const input = document.getElementById('fichero-comprobante');
const enviar = document.getElementById("send");
    const custom = document.getElementById("custom-input-file");
input.addEventListener('change' , (e)=> {
    const file  = e.target.files[0];
    if(input.files && input.files[0]){
        custom.style.display ="none"
        enviar.style.display ="block";
    }

})


function openPage(pageName,elmnt,color) {
  
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
   
    elmnt.style.backgroundColor = color;
   
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

//acordarse de solucionar el problema de que carguen los comentarios
var comentarios = document.getElementById("comentarios");
comentarios.addEventListener('click',function(e) {
e.preventDefault();
$("#comentariosyrespuestas").load("#comentariosyrespuestas");
});