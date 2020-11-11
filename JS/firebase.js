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
       
       $('#myModal2').modal('hide');
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
       
       $('#Login').modal('hide');
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
      }).catch(function(error) {
        alert(err);
      });
    
  })
   //BotonSalir desktop mobile
   var salir = document.getElementById("salir-mobile");
   salir.addEventListener('click', e=>{
       e.preventDefault();
      
       firebase.auth().signOut().then(function() {
         window.location.href ="index.html";
       }).catch(function(error) {
         alert(err);
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