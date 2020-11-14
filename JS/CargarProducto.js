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

let Imagen =[] ;
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
    
    Imagen.push(res.data.secure_url)

    
   
  })
})

Imagen.forEach(function(E){
    console.log(E)
})