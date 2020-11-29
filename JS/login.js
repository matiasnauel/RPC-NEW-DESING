var acceder = document.getElementById("ACCEDER");
acceder.addEventListener("click", function(e){
    e.preventDefault();
   
    
    var usuario  = document.getElementById("usuario").value;
    var contraseña = document.getElementById("contraseña").value;
    if(usuario != "" && contraseña !=""){
    
        firebase.auth().signInWithEmailAndPassword(usuario, contraseña)
        .then(userCredential =>{
            location.href ="index.html";
            localStorage.setItem("admin","admin");
        })
        .catch(function(error) {
           
           alert("Su correo o contraseña esta mal");
          
        })
    }
    else{
        alert("llene los campos");
    }


})


