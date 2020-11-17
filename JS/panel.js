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
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
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
        <option value="categoria">Categoria</option>
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
       console.log(document.getElementById("categoria").value)
        alert("Se agrego correctamente");
    },
    error: function(error) {
        console.log(error.message);
        alert('error');
    }


});

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
  
  
  var objeto = {
     nombre : nombre,
     descripcion :descripcion,
     marca : marca ,
     destacado : destacado,
     stock : Stock,
     precio : Precio,
     imagenes :  JSON.parse(localStorage.getItem("imagenes")),
     categoria : categoria,
     peso : peso
  }

    $.ajax({
      type: "POST",
      data: JSON.stringify(objeto),
      url: "https://localhost:44325/api/Publicacion/InsertarPublicacionProducto",
      dataType: "JSON",
      contentType: "application/json",
    
      success: function(data) {
      
      },
      error: function(error) {
          console.log(error.message);
          alert('error');
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
  enviarImagenesAlserver();
  // console.log(localStorage.getItem("imagenes"));
})

var public = document.getElementById("Publicar");
public.addEventListener("click" , (e)=>{

  e.preventDefault();
  var imagen = JSON.parse (localStorage.getItem("imagenes"));
  console.log(imagen.length);

  
    //En este caso, sería de este modo:
  if(localStorage.getItem("cantidadImagenes") == imagen.length){  
       postForm();
  }
  // while(localStorage.getItem("cantidadImagenes") == Imagen.length-1){
  //   postForm();
  //   break;
  // }


})







