window.onload = function()
 {
    var contenido= localStorage.getItem("contenido");
    var tipo= localStorage.getItem("tipo");

    switch(tipo)
    {
        case "destacados":
            
    $.ajax({
        type: "GET",
        url: "https://localhost:44325/api/Publicacion/TraerPublicacionesDestacadas",
        dataType: "json",
        success: function(data) {
            var listadoproductos=document.getElementById("ListadoProductos");
            listadoproductos.innerHTML="";
            $.each(data, function(i, item) {
             listadoproductos.innerHTML+=`
             <div class="item-productos">
             <div class="imagen-producto">
                 <img src="${item.imagenes[0]}" alt="">
             </div>
             <div class="informacion-producto">
                 <p class="nombre-productos">${item.nombre}</p>
                 <span class="precio-producto">${item.precio}</span>
                 <p class="cuotas-producto">18 cuotas de 3,888,88</p>
                 <button class="boton-producto" id="${item.publicacionID}" onclick="VerProductos(${item.publicacionID});">Ver Producto</button>
             </div>
         </div>      
             `;   
            });
        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }

   
        });
        break;

        case "categoria":
            $.ajax({
                type: "GET",
                url: "https://localhost:44325/api/Publicacion/TraerPublicacionesFiltroCategoria?categoria="+contenido,
                dataType: "json",
                success: function(data) {
                    var listadoproductos=document.getElementById("ListadoProductos");
                    listadoproductos.innerHTML="";
                    $.each(data, function(i, item) {
                     listadoproductos.innerHTML+=`
                     <div class="item-productos">
                     <div class="imagen-producto">
                         <img src="${item.imagenes[0]}" alt="">
                     </div>
                     <div class="informacion-producto">
                         <p class="nombre-productos">${item.nombre}</p>
                         <span class="precio-producto">${item.precio}</span>
                         <p class="cuotas-producto">18 cuotas de 3,888,88</p>
                         <button class="boton-producto" id="${item.publicacionID}" onclick="VerProductos(${item.publicacionID});">Ver Producto</button>
                     </div>
                 </div>      
                     `;   
                    });
                },
                error: function(error) {
                    console.log(error.message);
                    alert('error');
                }
        
           
                });
            break;

        case "Buscador":
            $.ajax({
                type: "GET",
                url: "https://localhost:44325/api/Publicacion/FiltroBuscador?filtro="+contenido,
                dataType: "json",
                success: function(data) {
                    var listadoproductos=document.getElementById("ListadoProductos");
                    listadoproductos.innerHTML="";
                    $.each(data, function(i, item) {
                     listadoproductos.innerHTML+=`
                     <div class="item-productos">
                     <div class="imagen-producto">
                         <img src="${item.imagenes[0]}" alt="">
                     </div>
                     <div class="informacion-producto">
                         <p class="nombre-productos">${item.nombre}</p>
                         <span class="precio-producto">${item.precio}</span>
                         <p class="cuotas-producto">18 cuotas de 3,888,88</p>
                         <button class="boton-producto" id="${item.publicacionID}" onclick="VerProductos(${item.publicacionID});">Ver Producto</button>
                     </div>
                 </div>      
                     `;   
                    });
                },
                error: function(error) {
                    console.log(error.message);
                    alert('error');
                }
        
           
                });
            break;


    }

    
    $.ajax({
        type: "GET",
        url: "https://localhost:44381/api/Categoria/TraerCategorias",
        dataType: "json",

        success: function(data) {
            var desplegable=document.getElementById("desplegable");
            var secciondecategorias=document.getElementById("secciondecategorias");
            $.each(data, function(i, item) {
             desplegable.innerHTML+=`
             <li><a onclick="ProductosCategoria('${item}');" >${item}<span 
             class="glyphicon glyphicon-chevron-right" ></span></a></li>
             `;
              secciondecategorias.innerHTML+=`
              <li><a href="" onclick="ProductosCategoria('${item}');">${item}</a></li>
              `;

            });



        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }

   
        });


    

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
    
    
    function verproductoscarrito()
    {
        if(localStorage.getItem("productos")==null)
        {
            alert("no posee productos en su carrito");
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



function ActivarDesactivarCategoria(){
    var categoriaMobile = document.getElementById("siteFiltros");
    if(categoriaMobile.style.display == "block"){
        categoriaMobile.style.display="none";
    }
    else{
        categoriaMobile.style.display="block";
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

function VerProductos(id) 
{
     
    var parametro = "publicacionID";
    var valor = id;
    
    localStorage.setItem(`${parametro}`, `${valor}`);
    location.href="publicacion.html";
}

// Input file 






