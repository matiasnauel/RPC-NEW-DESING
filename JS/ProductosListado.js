
function ActivarDesactivarCategoria(){
    var categoriaMobile = document.getElementById("siteFiltros");
    if(categoriaMobile.style.display == "block"){
        categoriaMobile.style.display="none";
    }
    else{
        categoriaMobile.style.display="block";
    }
}



// expandir imagen
function call_mouseover_expand(id) {
  
    var imagen = document.getElementById(id);
    imagen.style.webkitTransform = "scale(1.1)";
}
function call_mouseout_retroced(id) {
    var imagen = document.getElementById(id);
    imagen.style.webkitTransform = "scale(1)";
}


//MenuBurger
const menuBurger = document.getElementById("MenuBurger");
menuBurger.addEventListener('click',e=>{
    e.preventDefault();
    var x = document.getElementById("menu-burger");
    if (x.style.display === "block") {
      x.style.display = "none";
  
    } else {
      x.style.display = "block";
      
    }
})
//CategoriaBurger
const CategoriaBurger = document.getElementById("misCategoriasMobile");
CategoriaBurger.addEventListener('click',e=>{
    e.preventDefault();
    var x = document.getElementById("categoriaMobile");
    if (x.style.display === "block") {
      x.style.display = "none";
  
    } else {
      x.style.display = "block";
      
    }
})


//   Carrito
function openNavCarrito() {
    document.getElementById("SlideCarrito").style.width = "100%";
    document.getElementById("mapita").style.zIndex =  "-1";
    document.getElementById("redline").style.zIndex =" -1";

  }
  
  function closeNavCarrito() {
    document.getElementById("SlideCarrito").style.width = "0";
    document.getElementById("mapita").style.zIndex =  "1";
    document.getElementById("redline").style.zIndex =" 1";
  }

//   ModalCarrito
if(document.getElementById("btnModal")){
    var modal = document.getElementById("tvesModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("closed")[0];
    var body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
        modal.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    span.onclick = function() {
        modal.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }
}

// redireccionar pagina web
var contenidoPublicación = document.getElementById("producto-2");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})
var contenidoPublicación = document.getElementById("producto-1");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})
var contenidoPublicación = document.getElementById("producto-3");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})
var contenidoPublicación = document.getElementById("producto-4");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})
var contenidoPublicación = document.getElementById("producto-5");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})
var contenidoPublicación = document.getElementById("producto-6");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})
var contenidoPublicación = document.getElementById("producto-7");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})


// Input file 



const input = document.getElementById('fichero-comprobante');
const enviar = document.getElementById("send");
    const custom = document.getElementById("custom-input-file");
input.addEventListener('change' , (e)=> {
    const file  = e.target.files[0];
    if(input.files && input.files[0]){
        custom.style.display ="none"
        enviar.style.display ="block";
    }

})


