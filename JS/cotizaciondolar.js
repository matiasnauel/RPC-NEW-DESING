


fetch("https://localhost:44381/api/PrecioDolar/TraerPrecioDolar")
.then(function(response) {
    return response.json();
})
.then(function(data) {
    document.getElementById("dolarHoy").value = `$${data.dolar}`;
  
});
    

  


function cambiarDolar(){
  
   
        var dolaractualizacion = document.getElementById("dolarActualizacion").value;

        var objeto = {
            id: 1,
            dolar : dolaractualizacion
      
          
         }
         fetch("https://localhost:44381/api/PrecioDolar/ModificarPrecioDolar", {
          'method': 'POST',
          'mode': 'cors',
         'body': JSON.stringify(objeto),
          'headers': {
              'Content-Type': 'application/json',
              
          },
          })
          .then(function(response) {
            return response.json();
           })
          .then(function(data) {
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
                          <div class="modal-header"  style="background-color: blue;" >
                              <h4 class="modal-title text-center" style="color: white;" id="myModalLabel">ATENCIÓN! <span class="glyphicon glyphicon-ban-circle"></span>  </i></h4>
                          </div>
                          <div class="moda-body text-center">
                              <p style="margin: 20px;">Se actualizo correctamente</p>
                          </div>
                          <div class="modal-footer " style="background-color: blue;" >
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
       
           
          })
          .catch(err => console.log('ERROR: ' + err));
       
        }
     
    


