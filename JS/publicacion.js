

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
 
    if(localStorage.getItem("productos")!=null){
  
      // document.getElementById("carrito-sub-menu").style.display ="inline";
      document.getElementById("carrito-sub-menu").dataset.target ="#null";
      document.getElementById("SlideCarrito").style.width = "100%";
      document.getElementById("mapita").style.zIndex =  "-1";
      document.getElementById("redline").style.zIndex =" -1";
  
    }
    else{

      var div  = document.createElement("div");
      div.id ="errorImagen";
      var length = (div.textContent || div.innerText ||
        div.innerHTML).length;
      if(length > 0 ){
        document.getElementById("carrito-sub-menu").dataset.target ="#Error";
     
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
                        <p style="margin: 20px;">No se puede agregar esa cantidad al carrito!</p>
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
       document.getElementById("carrito-sub-menu").dataset.target ="#Error";
      
      }
    }

  }
  
  function closeNavCarrito() {
    document.getElementById("SlideCarrito").style.width = "0";
    document.getElementById("mapita").style.zIndex =  "1";
    document.getElementById("redline").style.zIndex =" 1";
  }

//   ModalCarrito
if(document.getElementById("btnModal")  && localStorage.getItem("productos")!=null && localStorage.getItem("productos")!= undefined){
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



function openPage(pageName,elmnt,color) {
  
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
      
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].style.backgroundColor = "";
    }
    document.getElementById(pageName).style.display = "block";
   
    elmnt.style.backgroundColor = color;
   
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

//acordarse de solucionar el problema de que carguen los comentarios
var comentarios = document.getElementById("comentarios");
comentarios.addEventListener('click',function(e) {
e.preventDefault();

});
var buscador= document.getElementById("form");
buscador.addEventListener('submit',function(e) {
e.preventDefault();
var filtro=document.getElementById("Search-main");
console.log(filtro.value);
var parametro = "tipo";
var valor = "Buscador"
localStorage.setItem(`${parametro}`, `${valor}`);   
var contenido = "contenido";
var valorcontenido = filtro.value;
localStorage.setItem(`${contenido}`, `${valorcontenido}`);
location.href="ProductosListado.html";
});


// buscadorMobile
var buscador= document.getElementById("form2");
buscador.addEventListener('submit',function(e) {
  e.preventDefault();
  var filtro=document.getElementById("SearchMain2");
  console.log(filtro.value);
  var parametro = "tipo";
  var valor = "Buscador"
  localStorage.setItem(`${parametro}`, `${valor}`);   
  var contenido = "contenido";
  var valorcontenido = filtro.value;
  localStorage.setItem(`${contenido}`, `${valorcontenido}`);
  location.href="ProductosListado.html";
});

function ProductosCategoria(valor2) 
{
    var parametro = "tipo";
    var valor = "categoria"
    localStorage.setItem(`${parametro}`, `${valor}`);   
    var contenido = "contenido";
    var valorcontenido = valor2;
    localStorage.setItem(`${contenido}`, `${valorcontenido}`);
    location.href="ProductosListado.html";  
    

}
function carritoValores(){
  if(localStorage.getItem("productostotalCantidad") != null &&  localStorage.getItem("productosTotalCarrito")!= null){
    document.getElementById("cantidadCarrito").innerHTML =  `(${localStorage.getItem("productostotalCantidad")}) $${localStorage.getItem("productosTotalCarrito")} `;
  }
  else{
    document.getElementById("cantidadCarrito").innerHTML ="(0) $0,00";
  }
}

carritoValores();