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
const publicar = document.getElementById("Publicar");

// Input file
const input = document.getElementById('files');
let ArrayFile =[];
input.onchange = function(e){
  var files = e.target.files;
  for (let index = 0; index < files.length; index++) {
    const element = files[index];
    ArrayFile.push(element);
  }
}

var Imagen;
// Al Publicar, se debe enviar las imagenes al servidor !
publicar.addEventListener("click", (e)=>{
  e.preventDefault();
 
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
})


// var upload = document.getElementById("file1");

// upload.onchange = function(e) {
//   var files = e.target.files;
//   // https://developer.mozilla.org/en-US/docs/Web/API/FileList#item
//   var firstFile = files.item(1); 
//   var idstokeep = [0, 2]; // keep first `2` files from `multiple` selection
//   var _files = Array.prototype.slice.call(files).splice(idstokeep[0], idstokeep[1]);
//   console.log(files, files.length         
//               , _files, _files.length
//               , firstFile);
// }; 
