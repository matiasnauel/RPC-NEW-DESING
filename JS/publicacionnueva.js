


function Comentar(){
  
    if( localStorage.getItem("clienteID") == undefined ){
       $("#IngreseCliente").modal("show");
    }
    else{
      var comentartext = document.getElementById("comentarTextid").value;
      var objeto = {
          comentario: comentartext,
          clienteID : localStorage.getItem("clienteID"),
          publicacionID : localStorage.getItem("publicacionID")
        
       }
    $.ajax({
        type: "POST",
        data: JSON.stringify(objeto),
        url: "https://localhost:44325/api/ComentarioPublicacion/InsertarComentarioPublicacion",
        dataType: "JSON",
        contentType: "application/json",

        success: function(data) {
            comentariosyrespuesta.innerHTML+=`
            <li id="comentariosyrespuestas">
            <div class="comment-main-level">
            <!-- Avatar -->
            <div class="comment-avatar"><img src="${localStorage.getItem("Image_user")}" alt=""></div>
            <!-- Contenedor del Comentario -->
            <div class="comment-box">
                <div class="comment-head">
                    <h6 class="comment-name by-author"><a >x</a></h6>
                </div>
                <div class="comment-content">
                ${data.comentario} 
                </div>
            </div>
          </div></li>
           `;
        },
        error: function(error) {
            console.log(error.message);
           
        }


    });
    }
}

