window.onscroll = function () {
    var HeaderPosition = document.getElementById('HeaderFloat');
    // Obtenemos la posicion del scroll en pantall
    var scroll = document.documentElement.scrollTop || document.body.scrollTop;
    var LineaRoja = document.getElementById('readline');

    // Realizamos alguna accion cuando el scroll este entre la posicion 300 y 400
    if (scroll > 20) {
        $('#HeaderFloat').addClass('Header-Float');
        $('#HeaderFloat').addClass('scroolLogo-Main');
        $('#redline').addClass('barra-afterr');
        

    }
    else {
        $('#HeaderFloat').removeClass('Header-Float');
        $('#HeaderFloat').removeClass('scroolLogo-Main');
        $('#HeaderFloat').removeClass('logo-main');
        $('#redline').removeClass('barra-afterr');

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

