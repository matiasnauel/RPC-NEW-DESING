
var traerProductos = document.getElementById("traerproductos");
traerProductos.addEventListener('click', function(e){
    e.preventDefault();
    fetch('https://localhost:44325/api/Publicacion/TraerTodasLasPublicaciones')
    .then(function(response) {
        return response.json();
    })
    .then(function(datos) {
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
        for(let info of datos){
           
            contenidoproductos.innerHTML += `
            <tr>
            <td><img src="/img/${info.imagenes[0]}" alt="" width="100px"></td>
            <td class="titulo">${info.nombre}</td>
            <td class="precio">${info.precio}</td>
            <td class="stock">2${info.stock}</td>
            <td class="boton-centro"><button class="btn btn-danger" onclick="BorrarProducto(${info.publicacionID});">Borrar</button></td>
            <td class="boton-centro"> <button class="btn btn-success"  data-toggle="modal" data-target="#AgregarProducto"  onclick="EditarProducto(info);">Editar</button> </td>
            </tr>
        `;
        }
        
      
    })
    .catch(err=>{
        alert(err)
    })
})
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

}


