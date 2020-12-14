var IniciarGoogle = document.querySelector("#IniciarGoogle");
var IniciarFacebook = document.querySelector("#IniciarFacebook");
var IniciarGoogleMobile = document.querySelector("#ButtonGoogle");
var IniciarFacebookMobile = document.querySelector("#ButtonFacebook");

//Google login desktop
IniciarGoogle.addEventListener('click', e=>{
    //Al hacer click, se tomar el objeto provider, lo que
    //Hace es decirle que se quiere autenticar con google
   const provider=new firebase.auth.GoogleAuthProvider();
 
   //Ejecuto auth con signwhit para mostrar una ventana de ingreso a google
   auth.signInWithPopup(provider)
   
   .then(result=>{
    
    // console.log("entraste akaaaa1");
    // console.log(provider.gmail);
    //    ValidarUsuarioBack(result.email,result.photoURL);
   })
   .catch(err=>{
       console.log(err)
   })
   
})

//GoogleLoginDesktop
IniciarGoogleMobile.addEventListener('click', e=>{
    e.preventDefault();
    //Al hacer click, se tomar el objeto provider, lo que
    //Hace es decirle que se quiere autenticar con google
   const provider=new firebase.auth.GoogleAuthProvider();

   //Ejecuto auth con signwhit para mostrar una ventana de ingreso a google
   auth.signInWithPopup(provider)
   .then(result=>{
       
    //     console.log("entraste akaaaa");
    //     console.log(provider.gmail);
    //    ValidarUsuarioBack(result.email,result.photoURL);
   })
   .catch(err=>{
       console.log(err)
   })
   
})
//FacebookLogin desktop
IniciarFacebook.addEventListener('click', e=>{
    e.preventDefault();
    const provider =new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
    .then(result=>{
        console.log(result);
      
     
        $('#myModal2').modal('hide');
    })
    .catch(err=> {
        console.log(err)
    })
})
//Iniciar facebook desde el mobile
IniciarFacebookMobile.addEventListener('click', e=>{
    e.preventDefault();
    const provider =new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
    .then(result=>{
        console.log(result);
      
        $('#Login').modal('hide');
    })
    .catch(err=> {
        console.log(err)
    })
})
//Eventos
//Observador el cual se encuentra pendiente si alguien se logea
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
      
      loginCheck(user)
      SaveDateUser(user);
      userAdd();
  
    } else {
      // User is signed out.
      // ...
      
      loginCheck(user)
      
    }
  });
  //BotonSalir desktop
  var salir = document.getElementById("exitAPP");
  salir.addEventListener('click', e=>{
      e.preventDefault();
    
      firebase.auth().signOut().then(function() {
        window.location.href ="index.html";
        localStorage.removeItem("Correo_User");
        localStorage.removeItem("IdVenta");
        localStorage.removeItem("Name_User");
        localStorage.removeItem("ventdaID");
        localStorage.removeItem("clienteID");
        localStorage.setItem("ventaID",data.id);

        if(localStorage.getItem("admin") != undefined){
            localStorage.removeItem("admin");
            $('#config').removeClass("config");
            document.getElementById("config").classList.remove('config');
            location.href ="loginRPC.html";
        }
      }).catch(function(error) {
        console.log(error)
      });
    
  })
   //BotonSalir desktop mobile
   var salir = document.getElementById("salir-mobile");
   salir.addEventListener('click', e=>{
       e.preventDefault();
      
       firebase.auth().signOut().then(function() {
         window.location.href ="index.html";
       }).catch(function(error) {
         console.log(error);
       });
     
   })


//Verificar si existe el usuario
var btnSesionOut=  document.querySelectorAll(".login-out");
var btnSesionIn=  document.querySelectorAll(".login-in");

const loginCheck = user =>{
    if(user){
    
 
        btnSesionIn.forEach(link=> link.style.display='block')
        btnSesionOut.forEach(link=> link.style.display='none')
        
    }
    else{
    
        btnSesionIn.forEach(link=> link.style.display='none')
        btnSesionOut.forEach(link=> link.style.display='block')
      
    }
}

//Almacenar UID del cliente junto con su correo y su foto en el local storage
function SaveDateUser (user)
{
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('Usuario_ID' ,user.uid);
        localStorage.setItem('Name_User',user.displayName);
        localStorage.setItem('Correo_User', user.email);
        localStorage.setItem('Image_user',user.photoURL);
        if(localStorage.getItem("clienteID") == undefined){
            ValidarUsuarioBack(localStorage.getItem("Correo_User"),localStorage.getItem("Image_user"));
        }

        //acordarse de que aca debo hacer la peticion a la api cliente, 
        //pasándole por parametro el email, para que me devuelva el id de ese cliente
        //y lo guarde en el local storage.
    } else {
       //Este navegador no soporta localstorage
    }
}
function DeleteDateUser(){
    //acordarse de que este método debe borrar unicamente los
    //datos sensibles colocados por firebise.
}
function userAdd(){
    if(localStorage.getItem("admin")!= undefined){
        var carrt = document.getElementById("icons-shooping-card");
        carrt.style.display="none";
        $('#config').addClass("config");
        $("#config").css("display","block");
    
        $("#abrirsectorcomprobante").css("display","none");
        document.getElementById("config").classList.add('config');
        document.getElementById("config").style.display="block";
        document.getElementById("abrirsectorcomprobante").style.display ="none";
        config.innerHTML = `
        <span onclick="configuracion();" class="glyphicon glyphicon-cog"></span>

        `;
    }
}
function configuracion(){
    location.href ="panel.html";
}
function  ValidarUsuarioBack(email,photoURL){
   
        
        alert("entro bien");
        fetch("https://localhost:44307/api/Cliente/RegistrarVerificarCliente?email="+email+"&clienteIMAGEN="+photoURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            localStorage.setItem("clienteID",data);
          
        })
       .catch (error =>{
        console.log(error);
       }) 



}   