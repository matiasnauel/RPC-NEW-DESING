$.ajax({
    type: "GET",
    url: "https://localhost:44325/api/Publicacion/TraerPublicacionesDestacadas",
    dataType: "json",
    success: function(data) {
      var autowidth= document.getElementById("contenedorProductos");  
      autowidth.innerHTML = ` 
      <tr>
      <th>Imagen</th>
      <th>Producto</th>
      <th>Precio</th>
  
      <th></th>
     </tr>
      ` 
     $.each(data, function(i, item) {
     autowidth.innerHTML+=`       

    <tr>
     <td><img src="/img/${item.imagenes[0]}" alt="" width="100px"></td>
     <td class="titulo">${item.nombre}</td>
     <td class="precio">${item.precio}</td>
     <td class="boton-centro"> <button class="btn btn-success"  data-toggle="modal" data-target="#AgregarProducto" onclick="EditarDestacados();">Editar</button> </td>
    </tr>
     `;
     
    
   
    });


    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }

});

function EditarDestacados(){

}