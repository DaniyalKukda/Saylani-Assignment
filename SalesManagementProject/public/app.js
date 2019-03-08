function adminLoginLoad(){
    document.getElementById("load").style.display = "block";
                setTimeout(function(){
                    location = 'adminLogin.html'
                },3000)
}
function adminLogin(){
    var adminEmail = "admin@gmail.com";
    var adminPass = "admin";
            var emailInput = document.getElementById("admin-email").value;
            var passwordInput = document.getElementById("admin-pass").value;

            if(emailInput=== adminEmail && passwordInput=== adminPass){
                document.getElementById("admin-load").style.display = 'block';
                setTimeout(function(){
                    location = 'adminPanel.html'
                },3000)
            }else{
                document.getElementById("error").style.display = "Block";
            }
}
function createAcc() {
    var flag = true;
    var password = document.getElementById("Spass").value;
    var username = document.getElementById("Sname").value;
    var email = document.getElementById("Semail").value;
    username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

    if (flag != false) {
        var userInfo = {
            name: username,
            email: email,
            password: password,
        }

        var userStore = localStorage.setItem("user_Info", JSON.stringify(userInfo));
        var userGet = JSON.parse(localStorage.getItem("user_Info"));
        console.log(userGet)


        setInterval(function () {
            location = "index.html";
        }, "1000")
    }

}
function eLogin() {
    var email = document.getElementById("Eemail").value;
    var password = document.getElementById("Epass").value;
    var userGet = JSON.parse(localStorage.getItem("user_Info"));

    if (email === userGet.email && password === userGet.password) {
        document.getElementById("E-load").style.display = 'block';
        setTimeout(function(){
            location = 'EPanel.html'
        },3000)
    }
    else {
        document.getElementById("Eemail").value = "";
        document.getElementById("Epass").value = "";
        document.getElementById("error2").style.display = 'block';
    }
}


var modal = document.getElementById('myModal');

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

function showmodel()  {
modal.style.display = "block";
}
span.onclick = function() {
modal.style.display = "none";
}
window.onclick = function(event) {
if (event.target == modal) {
modal.style.display = "none";
}
}
