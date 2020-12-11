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
          document.getElementById('list').insertBefore(span, null);
          contador++
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  document.getElementById('files').addEventListener('change', handleFileSelect, false);

const URL_CLOUDINARI_PRESET ="https://api.cloudinary.com/v1_1/rpc-computacion/image/upload";
const CLOUNDDINARY_UPLOAD_PRESET ="dez1rdb5";


// Input file
const input = document.getElementById('files');
let ArrayFile =[];

input.onchange = function(e){
  var files = e.target.files;
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    ArrayFile.push(element);

  }
  localStorage.setItem("cantidadImagenes" ,ArrayFile.length);
 
}

var Imagen=[];
// Al Publicar, se debe enviar las imagenes al servidor !
function enviarImagenesAlserver(){

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
      console.log(res.data.secure_url)
      Imagen.push(res.data.secure_url);
      localStorage.setItem("imagenes",JSON.stringify(Imagen));
      
      
     
    })
 
  
  


}
function TraerCategorias(){
  $.ajax({
    type: "GET",
    url: "https://localhost:44381/api/Categoria/TraerCategorias",
    dataType: "json",

    success: function(data) {
        var desplegable=document.getElementById("SelectCategorias");
        desplegable.innerHTML =  `
        <option  label="Categoria"  selected="true" disabled="disabled"></option>
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
function InsertarCategoria(){

$.ajax({
    type: "POST",
    url: "https://localhost:44381/api/Categoria/InsertarCategoria?descripcion="+document.getElementById("categoria").value,
    dataType: "JSON",
    contentType: "application/json",

    success: function(data) {
    
      $('#AgregarCategoria').modal('toggle');
      $('#CategiriaExito').modal('show');
    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }


});
return false;
}

function postForm(){
  var marca = document.getElementById("marca").value;
  var nombre = document.getElementById("nombre").value;
  var Precio = document.getElementById("precioventa").value;
  var Stock =  document.getElementById("stock").value;
  var destacado = document.getElementById("destacados").value;
  var descripcion = document.getElementById("comment").value;
  var categoria = document.getElementById("SelectCategorias").value;
  var peso = document.getElementById("peso").value;
  var dolar =  document.getElementById("dolar").value;
  
  if(marca!="" && nombre!="" && Precio!="" && Stock!= "" && destacado !="" && descripcion!="" && categoria != "" && descripcion !="" &&  categoria !="" && peso!=""){
    var objeto = {
      nombre : nombre,
      descripcion :descripcion,
      marca : marca ,
      destacado : destacado,
      stock : Stock,
      precio : Precio,
      imagenes :  JSON.parse(localStorage.getItem("imagenes")),
      categoria : categoria,
      peso : peso,
      cotizaciondolar : dolar
   }
  }
  else{
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
                      <p style="margin: 20px;">LLENE TODO LOS CAMPOS</p>
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


    $.ajax({
      type: "POST",
      data: JSON.stringify(objeto),
      url: "https://localhost:44325/api/Publicacion/InsertarPublicacionProducto",
      dataType: "JSON",
      contentType: "application/json",
    
      success: function(data) {
        $('#AgregarProducto').modal('toggle');
        $('#ProductoExito').modal('show');
  
      },
      error: function(error) {
          console.log(error.message);
          
      }
    
    
    });
}

function cambiar(){
  var destacado = document.getElementById("destacados");
 if(destacado.value == "false") {
   destacado.value = true;
   console.log(destacado.value);

 }
 else{
  destacado.value = false;
  console.log(destacado.value);
 }
}

 


var guardar  = document.getElementById("Gurdar");
guardar.addEventListener("click", (e)=>{
  e.preventDefault();
  var files = document.getElementById("files").files;
  if (!files.length) {
   
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
                      <p style="margin: 20px;">SELECCIONE UNA IMAGEN</p>
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
 

    return;
  }
  else{
    
     animar();
     enviarImagenesAlserver();
  }

  

 
 
  // console.log(localStorage.getItem("imagenes"));
})

var public = document.getElementById("Publicar");
public.addEventListener("click" , (e)=>{

  e.preventDefault();
  var imagen = JSON.parse (localStorage.getItem("imagenes"));


  
    //En este caso, sería de este modo:
  if(localStorage.getItem("cantidadImagenes") == imagen.length){  
       postForm();
  }
  // while(localStorage.getItem("cantidadImagenes") == Imagen.length-1){
  //   postForm();
  //   break;
  // }


})

function animar(){
  document.getElementById("barra").classList.toggle("final");

}
// document.getElementById("Gurdar").onclick = function(){
//   animar();
// }

document.getElementById("cantidad").innerHTML = localStorage.getItem("cantidadProductos");
document.getElementById("cantidad3").innerHTML =   localStorage.getItem("contadorVenta");
document.getElementById("cantidad4").innerHTML = localStorage.getItem("cantidadDestacados");
document.getElementById("cantidad5").innerHTML = localStorage.getItem("cantidadComentarios");
document.getElementById("cantidad6").innerHTML = localStorage.getItem("cantidadComprobante");

function EliminarImagen(id){
 
  var image = document.getElementById(id); 
  if (image != null) 
  { 
    image.parentNode.removeChild(image); 

  } 
   return false;
}

var productoExitoRecargar = document.getElementById("cerrarProductoExito");
productoExitoRecargar.addEventListener("click" , function(e){
  location.reload();
})


