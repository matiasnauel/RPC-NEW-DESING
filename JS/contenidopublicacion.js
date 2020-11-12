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
     for( x=1; x<=data.producto.imagenes.length; x++)
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
  <div class="cantidad" id="cantidadstock">
    <p>Cantidad:  <input  type="number" min="0" max="${data.producto.stock}" placeholder="1"> </p>
   
  </div>`;
  
  siteinformation.innerHTML+=`
  <div class="btn-sección">
  
    <button class="btn-agregar" onclick="AgregarAlCarrito(${document.getElementById('cantidadstock').value},${data.producto.id});">Agrega al carrito</button>
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
      </div>
      </li>
         `;
         if(item.respuesta!=null){
           var respuesta = document.getElementById("comentariosyrespuestas");
          respuesta.innerHTML+=`
          <ul class="comments-list reply-list">
          <li>
              <!-- Avatar -->
              <div class="comment-avatar admin "><img src="/img/logoajjaja-removebg-preview.ico" alt=""></div>
              <!-- Contenedor del Comentario -->
              <div class="comment-box">
                  <div class="comment-head">
                      <h6 class="comment-name "><a >Rpc Computación</a></h6>
                      
                  </div>
                  <div class="comment-content">
                  ${item.respuesta} 
                  </div>
              </div>
          </li>
  
      </ul>`;
         }
  
  
        });
  
  
  
    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }
  
  
    });
