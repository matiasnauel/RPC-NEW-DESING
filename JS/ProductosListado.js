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
            document.getElementById("cambiar-categorias").innerHTML ="PRODUCTOS / PUBLICACIONES DESTACADAS";
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
                    document.getElementById("cambiar-categorias").innerHTML =`PRODUCTOS / ${contenido}`;
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
            
        }

   
        });

        $.ajax({
            type: "GET",
            url: "https://localhost:44381/api/Categoria/TraerCategorias",
            dataType: "json",
      
            success: function(data) {
                var desplegable=document.getElementById("categoriaMobile");
                $.each(data, function(i, item) {
                 desplegable.innerHTML+=`
                 <li><a onclick="ProductosCategoria('${item}');" >${item}<span
                 class="glyphicon glyphicon-chevron-right" ></span></a></li>
                 `;
      
      
                });
      
      
      
            },
            error: function(error) {
                console.log(error.message);
               
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

// buscador mobile
var buscador= document.getElementById("form2");
buscador.addEventListener('submit',function(e) {
  e.preventDefault();
  var filtro=document.getElementById("SearchMain2");
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
                document.getElementById("enviarcomprobante").setAttribute("data-target","#ComprobanteSubidoBien");
                Imagen=null;
                localStorage.removeItem("ventaID");
                $('#subirArchivo').modal('toggle'); 
                $('#ComprobanteSubidoBien').modal('show'); 
            

            },
        
              error: function(error) {
                console.log(error.message);
        }
        
        
        
           });
        }
           else{
            
            document.getElementById("enviarcomprobante").setAttribute("data-target","#ErrorComprobante");
           }
    
    
    });
    
    
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
                    <p style="padding-top: 30px";>${item.nombre}</p> 
                    <span>$${item.precio}x${item.cantidad}</span>
                </div>
                <div class="boton-carrito-modal">
                <button class="DescartarArticulo-carrito" onclick="QuitarProducto(${item.id},${item.precio},${data.valorcarrito});">X</button> 
                </div>
                </div>
                
                
                
                `;
    
    
                });
              contenedorcarrito.innerHTML+= ` 
              <div class="Total-carrito">
                <p>TOTAL: $${valor}</p>
                </div>         
              `;
              document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${valor} `;
              localStorage.setItem("productosTotalCarrito",data.valorcarrito);
              contenedorcarrito.innerHTML+= `
            <div class="OpcionCarrito">
            <button class="vaciar-carrito" onclick="VaciarCarrito();">VACIAR CARRITO</button>
            <button class="comprar-carrito" onclick="realizarreserva();">RESERVAR CARRITO</button>
            </div>
              ` ; 
    
            },
            error: function(error) {
                console.log(error.message);
           
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
if(document.getElementById("btnModal") && localStorage.getItem("productos")!=null){
    
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
                      <p style="margin: 20px;">Debe registrarse primero</p>
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



   });


}

function VerProductos(id) 
{
     
    var parametro = "publicacionID";
    var valor = id;
    
    localStorage.setItem(`${parametro}`, `${valor}`);
    location.href="publicacionNueva.html";
}

// Input file 


// quitar elemento de un carrito 

function QuitarProducto(productoid,cantidad,valor){

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
              //Se cierra el modal vacio
              document.getElementById("tvesModal").style.display= "none";
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
  
  
  
  // remover un archivo de un array
  function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
  
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
  }
 

  function verproductoscarritomobil()
  {
  
  
      
      if(localStorage.getItem("productos")==null || JSON.parse(localStorage.getItem("productos")) == "")
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
              
              var contenedorcarrito=document.getElementById("SlideCarrito");
              contenedorcarrito.style.display="block";
              contenedorcarrito.innerHTML="";
              var valor=data.valorcarrito;
              contenedorcarrito.innerHTML = `
              <a href="javascript:void(0)" class="closebtn2" onclick="closeNavCarrito()">&times;</a>
              <h2 style="padding-bottom: 20px; color: white;">Mi Carrito</h2>
              `;
              $.each(data.productos, function(i, item) 
              {
             
              contenedorcarrito.innerHTML+=`
              <div class="productos-carrito">
              <div class="site-image">
                  <img src="${item.imagenes[0]}" alt="">
              </div>
              <div class="site-information">
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
            document.getElementById("cantidadCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) $${data.valorcarrito} `;
            localStorage.setItem("productosTotalCarrito",data.valorcarrito);
            contenedorcarrito.innerHTML+= `
            <div class="OpcionCarrito" style="margin-top:1rem;">
              <button class="vaciar" onclick="VaciarCarrito();">VACIAR CARRITO</button>
              <button class="comprar" onclick="realizarreserva();">RESERVAR</button>
            </div>
            ` ; 
  
          },
          error: function(error) {
              console.log(error.message);
             
          }
  
  
      });
  }
  
  }
  document.getElementById("itemCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) `;
   
  
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
          
              verproductoscarrito();
              document.getElementById("SlideCarrito").style.display ="none";
              
              document.getElementById("itemCarrito").innerHTML =  `(${JSON.parse(localStorage.getItem("productos")).length}) `;
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
            
              verproductoscarritomobil();
              
            }
        
            
        }
       
       
       
    })
    return false;
  }