window.onload = function() 
{
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
                 <img alt="1" src="img/${item.imagenes[0]}">
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

    $.ajax({
        type: "GET",
        url: "https://localhost:44381/api/Categoria/TraerCategorias",
        dataType: "json",

        success: function(data) {
            var desplegable=document.getElementById("desplegable");
            $.each(data, function(i, item) {
             desplegable.innerHTML+=`
             <li><a onclick="ProductosCategoria('${item}');" >${item}<span style="margin-left: 100px;"
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
    var productosID = [1,1,1,1,2,2,2,3,4,4,4,4,1,3];
    localStorage.setItem("productos", JSON.stringify(productosID));
}

function verproductoscarrito()
{
    
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
            var valor=data.valorcarrito;
            $.each(data.productos, function(i, item) 
            {

            contenedorcarrito.innerHTML+=`
            <div class="productos-carrito">
            <div class="site-image-carrito">
                <img src="/img/${item.imagenes[0]}" alt="">
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
        <button class="comprar-carrito">COMPRAR</button>
        </div>
          ` ; 

        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }


    });

}




