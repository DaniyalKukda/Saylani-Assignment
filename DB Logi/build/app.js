  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCVz1xdb6cd4_nmHt8jQD9BiJvwK9idTBM",
    authDomain: "dblogin-2ef50.firebaseapp.com",
    databaseURL: "https://dblogin-2ef50.firebaseio.com",
    projectId: "dblogin-2ef50",
    storageBucket: "dblogin-2ef50.appspot.com",
    messagingSenderId: "1023758204174"
  };
  firebase.initializeApp(config);
   
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var e = user.email;
      document.getElementById("fname").innerHTML = e
     
    
      // var user = firebase.auth().currentUser;
    if(user != null){

    }

    } 
  });


  function login(){
    var userEmail= document.getElementById("email-log").value;      
    var userPassword= document.getElementById("pass").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).then(function(){ window.location.assign("welcome.html");  }).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage,errorCode);
      });
    
}
function logout(){
    swal({
        type: 'success',
        title:'Successfully LogOut'
    })
    setTimeout(function(){
        window.location.assign("index.html");

    },2000)
}
//var hd = document.getElementById("fname").innerHTML = document.getElementById("email").value;
function SignUp(){
    let name = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
  
    var emailpattern = /[A-Za-z_.]+@[a-zA-Z]+\.[A-Za-z]{2,4}/;
    var namepattern = /^[a-zA-Z]+$/i;

    var passwordpattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    
    if(!name.match(namepattern)){
      document.getElementById("Name-Error").innerHTML = "Please Enter Valid Name";
      return; 
    }
    if(!email.match(emailpattern)){
      document.getElementById("Email-Error").innerHTML = "Please Enter Valid Email Address";  
      return;      
    }
    if(!password.match(passwordpattern)){
      document.getElementById("Pass-Error").innerHTML = "at least 1 lowercase alphabet, 1 uppercase alphabet, 1 numeric, must be 8 characters or longer";
      return;        
    }
    console.log(name)
  
    if(name.match(namepattern) && email.match(emailpattern)&& password.match(passwordpattern)){
  
      firebase.auth().createUserWithEmailAndPassword(email, password).then(()=> window.location=("index.html")).catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage,errorCode);
      });
          swal({
            type: 'success',
            title:'Successfully Sign Up'
        })
    }
    document.getElementById("name").value = "";
    document.getElementById("education").value = "";
    document.getElementById("city").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
  
  }
  
  