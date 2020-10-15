
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

// Slider transition
window.addEventListener('load', () => {


    // initial slide
    let slide = 1;

    // total slides
    let slides = document.querySelectorAll(".slider ul li");
    total = slides.length;

    // show first side
    showSlide(1);

    next = document.querySelector(".next");
    prev = document.querySelector(".prev")

    /**
     * event next button
     */
    next.addEventListener('click', (evt) => {
        evt.preventDefault();
        slide++;
        if (slide > total) { slide = 1; }
        showSlide(slide);
    })

    /** 
     * event prev button
     */
    prev.addEventListener("click", (evt) => {
        evt.preventDefault();
        slide--;
        if (slide < 1) { slide = total; }
        showSlide(slide);
    })

    /**
     * show slides
     * 
     * @param {number} n 
     * @return {null}
     * 
     */
    function showSlide(n) {
        n--; // decrement 1
        for (i = 0; i < slides.length; i++) {
            (i == n) ? slides[n].style.display = "block" : slides[i].style.display = "none";
        }
    }

})

// Mobile menu desplegar

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("mapita").style.zIndex =  "-1";
    document.getElementById("redline").style.zIndex =" -1";
    

  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mapita").style.zIndex =  "1";
    document.getElementById("redline").style.zIndex =" 1";
  }

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

//   Modal iniciar sesión
if(document.getElementById("btnModal")){
    var modal = document.getElementById("tvesModal");
    var btn = document.getElementById("btnModal");
    var span = document.getElementsByClassName("close")[0];
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
var contenidoPublicación = document.getElementById("producto-8");
contenidoPublicación.addEventListener('click',function(e){
    window.location.href ="publicacion.html";
})

