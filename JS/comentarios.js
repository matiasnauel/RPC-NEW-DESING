var comentarioss = document.getElementById("cantidad5");
var cantidadComentarios = 1;
$.ajax({
    type: "GET",
    url: " https://localhost:44325/api/Comentario/TraerComentariosNoRespondidos",
    dataType: "json",
    success: function(data) {
      var autowidth= document.getElementById("contenedorProductos");  

      autowidth.innerHTML = ` 
      <tr>
      <th><label>Autor</label></th>
      <th>Comentario</th>
      <th>Fecha</th>
      <th>Publicacion</th>
      <th></th>
      <th></th>

     </tr>
      ` 
     $.each(data, function(i, item) {
     autowidth.innerHTML+=`       

     <tr>
     <td</td>
     <td> ${item.cliente}</td>
     <td >${item.comentario}</td>
     <td>${item.fecha}</td>
     <td><a href="publicacion.html" onclick="VerPublicacion(${item.publicacionID})">Ver</a></td>
     <td class="boton-centro"><button class="btn btn-danger">Borrar</button></td>
     <td class="boton-centro" ><button class="btn btn-success" data-toggle="modal" data-target="#Comentar" onclick="IniciarAccion(${item.comentarioID})"> Responder </button> </td>
    </tr>
    
     `;
     comentarioss.innerHTML = cantidadComentarios++;
     localStorage.setItem("cantidadComentarios",comentarioss.innerHTML);
    
   
    });


    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }

});

function EditarDestacados(){

}
function IniciarAccion(comentarioID){
    var valorBoton = document.getElementById("guardarCambios");
    valorBoton.value = comentarioID;
}
function Responder (comentarioID){
    var contenidocomentario = document.getElementById("contenido-comentario").value;
    console.log(contenidocomentario);
    var objeto = {
        comentarioID: comentarioID,
        contenido: contenidocomentario
    }
    $.ajax({
        type: "POST",
        data: JSON.stringify(objeto),
        url: "https://localhost:44325/api/Respuesta/InsertarRespuesta",
        dataType: "JSON",
        contentType: "application/json",

        success: function(data) {
          alert("se realizo el comentario correctamente !!")
      
        },
        error: function(error) {
            console.log(error.message);
            alert('error');
        }


    });

}
function VerPublicacion(publicacionID){ 
   
  localStorage.setItem("publicacionID",publicacionID);
  location.href ="publicacion.html";

}
function InsertarCategoria(){

    $.ajax({
        type: "POST",
        url: "https://localhost:44381/api/Categoria/InsertarCategoria?descripcion="+document.getElementById("categoria1").value,
        dataType: "JSON",
        contentType: "application/json",
    
        success: function(data) {
            $('#AgregarCategoria').modal('toggle');
      $('#CategiriaExito').modal('show');
        },
        error: function(error) {
            
        }
    
    
    });
    return  false;
    }