
var cantProductos = document.getElementById("cantidad");
var contadorProducto = 0 ;
window.onload = function(){ $.ajax({
    type: "GET",
    url: "https://localhost:44325/api/Publicacion/TraerTodasLasPublicaciones",
    dataType: "json",
    success: function(data) {
        
        var contenidoproductos = document.getElementById("contenedorProductos");
        contenidoproductos.innerHTML =`
        <tr>
        <th>Imagen</th>
        <th>Producto</th>
        <th>Precio</th>
        <th>Stock</th>
        <th></th>
        <th></th>
        </tr>
         `
        $.each(data, function(i, info) {
            contenidoproductos.innerHTML += `
            <tr>
            <td><img src="${info.imagenes[0]}" alt="" width="100px"></td>
            <td class="titulo">${info.nombre}</td>
            <td class="precio">${info.precio}</td>
            <td class="stock">2${info.stock}</td>
            <td class="boton-centro"><button class="btn btn-danger" onclick="BorrarProducto(${info.publicacionID});">Borrar</button></td>
            <td class="boton-centro"> <button class="btn btn-success"  id="${info.id}" data-toggle="modal" data-target="#EditarProducto"  onclick="EditarProducto(${info.id});">Editar</button> </td>
            </tr>
        `;
        cantProductos.innerHTML = contadorProducto++;
        localStorage.setItem("cantidadProductos",cantProductos.innerHTML);
    
           });
   
   
          
    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }

});
}
function TraerCategorias1(categoria){
    $.ajax({
      type: "GET",
      url: "https://localhost:44381/api/Categoria/TraerCategorias",
      dataType: "json",
  
      success: function(data) {
          var desplegable=document.getElementById("SelectCategorias1");
          desplegable.innerHTML =  `
          <option value="${categoria}">${categoria}</option>
          `
          $.each(data, function(i, item) {
           desplegable.innerHTML+=`
           <option value="${item}">${item}</option>
           `;
  
  
          });
  
  
  
      },
      error: function(error) {
          console.log(error.message);
          alert('error');
      }
  
  
      });
  
  
  }

 function BorrarProducto(publicacionID)
{

  
   fetch("https://localhost:44325/api/Publicacion/BorrarPublicacionProducto?publicacionID="+publicacionID, {
    'method': 'POST',
    'mode': 'cors',
    'headers': {
        'Content-Type': 'application/json',
        
    },
    })
    .then(function(response) {
      return response.json();
     })
    .then(function(data) {
            $('#SeborroBien').modal('show');
            
    })
    .catch(err => console.log('ERROR: ' + err));
   
}


function EditarProducto(info){
    var marca = document.getElementById("marca1");
var nombre = document.getElementById("nombre1");
var Precio = document.getElementById("precioventa1");
var Stock =  document.getElementById("stock1");
var descripcion = document.getElementById("comment1");
var categoria = document.getElementById("SelectCategorias1");
var peso = document.getElementById("peso1");
var valordolar = document.getElementById("dolar1");


    $.ajax({
        type: "GET",
        url: "https://localhost:44381/api/Producto/TraerProductoPorID?productoID="+info,
        dataType: "json",
        success: function(data) {
        TraerCategorias1(data.categoria);
       

            marca.value= data.marca;
            nombre.value=data.nombre;
            Precio.value= data.precio;
            Stock.value= data.stock;
            categoria.value= data.categoria;
            peso.value= data.peso;
            descripcion.value = data.descripcion;
            valordolar.value = data.cotizaciondolar;
        
            if(data.destacado==true){
               
              document.getElementById("destacados1").checked = true; 
              document.getElementById("destacados1").value = "true"; 
             
            }
            else{
               
                document.getElementById("destacados1").checked = false; 
                document.getElementById("destacados1").value = "false"; 
            }
            document.getElementById("list2").innerHTML = "";
            devolverImagenes(data);
           
            localStorage.setItem("Objeto",JSON.stringify(data));
        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }
    
    });
}

function ModificarProducto(){
 
    var arrayDara = JSON.parse(localStorage.getItem("Objeto"));
    var objetoNuevo = {
        marca: document.getElementById("marca1").value,
        nombre:document.getElementById("nombre1").value,
        precio: document.getElementById("precioventa1").value,
        stock:  document.getElementById("stock1").value,
        categoria:  document.getElementById("SelectCategorias1").value,
        peso: document.getElementById("peso1").value,
        descripcion :  document.getElementById("comment1").value,
        destacado : document.getElementById("destacados1").value,
        imagenes :  arrayDara.imagenes,
        cotizaciondolar : document.getElementById("dolar1").value,
    }
    var objeto = {
        viejo: arrayDara,
        nuevo : objetoNuevo
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(objeto),
        url: "https://localhost:44381/api/Producto/ModificarProducto",
        dataType: "JSON",
        contentType: "application/json",
      
        success: function(data) {
       
         $('#EditoCorrectamente').modal('show');

        },
        error: function(error) {
            console.log(error.message);
            
        }
      
      
      });
    
}

function cambiar1(){
    var destacado = document.getElementById("destacados1");
   if(destacado.value == "false") {
     destacado.value = true;
     console.log(destacado.value);
  
   }
   else{
    destacado.value = false;
    console.log(destacado.value);
   }
  }


  document.getElementById("cantidad3").innerHTML =   localStorage.getItem("contadorVenta");
  var borrarclikfunca =document.getElementById('cerrarBorrado');
  borrarclikfunca.addEventListener('click',(e)=>{
      location.reload();
  })

  var botonEditar = document.getElementById('editoCorrectoBTN');
  botonEditar.addEventListener('click', (e)=>{
      location.reload();
  })

  function EliminarImagenProducto(id){
 
    var image = document.getElementById(id); 
    if (image != null) 
    { 
      image.parentNode.removeChild(image); 
  
    } 
     return false;
  }

  function devolverImagenes(datos){
   
    var contador = 0 ;
    var contadorimagen = 0 ;
   
    for (let index = 0; index < datos.imagenes.length; index++) {
        const element = datos.imagenes[index];
            // Render thumbnail.
            var span = document.createElement('span');
            console.log(element);
            span.style.justifyContent="center";
            span.style.justifySelf ="center";
            span.id = contador;
        
            span.innerHTML += ['<div style="display:grid; width=20px">','<img class="thumb" id=',contadorimagen++,' src="',element,
                                '" title="', escape(datos.nombre), '"/>','<button class="eliminar" id="eliminar"  onclick="return EliminarImagenProducto(',contador,')">Eliminar</button>','</div>'].join('');
            document.getElementById('list2').insertBefore(span, null);
            contador++
    }  
   
      
  }

  var contador = 0 ;
var contadorimagen = 0 ;
function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {
     
      // Only process image files.
      if (!f.type.match('image.*')) {
        
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
    
          span.style.justifyContent="center";
          span.style.justifySelf ="center";
          span.id = contador;
          
          span.innerHTML = ['<div style="display:grid; width=20px">','<img class="thumb" id=',contadorimagen++,' src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>','<button class="eliminar" id="eliminar"  onclick="return EliminarImagen(',contador,')">Eliminar</button>','</div>'].join('');
          document.getElementById('list2').insertBefore(span, null);
          contador++
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files2').addEventListener('change', handleFileSelect, false);

  
function EliminarImagen(id){
 
    var image = document.getElementById(id); 
    if (image != null) 
    { 
      image.parentNode.removeChild(image); 
  
    } 
     return false;
  }