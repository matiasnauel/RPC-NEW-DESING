

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
            alert("Se borro correctamente!");
            location.reload();
    })
    .catch(err => console.log('ERROR: ' + err));

}


function EditarProducto(info){
    var marca = document.getElementById("marca1");
var nombre = document.getElementById("nombre1");
var Precio = document.getElementById("precioventa1");
var Stock =  document.getElementById("stock1");
var destacado = document.getElementById("destacados1");

var descripcion = document.getElementById("comment1");
var categoria = document.getElementById("SelectCategorias1");
var peso = document.getElementById("peso1");
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
    var objeto = {
        marca: document.getElementById("marca1").value,
        nombre:document.getElementById("nombre1").value,
        precio: document.getElementById("precioventa1").value,
        stock:  document.getElementById("stock1").value,
        categoria:  document.getElementById("SelectCategorias1").value,
        peso: document.getElementById("peso1").value,
        descripcion :  document.getElementById("comment1").value,
        destacado : document.getElementById("destacados1").value,
        imagenes :  arrayDara.imagenes
    }
    console.log(objeto)
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