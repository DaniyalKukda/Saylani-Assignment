var config = {
    apiKey: "AIzaSyBkvM0SgIbiq7rLAQRYDyacT6Y3I61hZNg",
    authDomain: "authentication-d4f9f.firebaseapp.com",
    databaseURL: "https://authentication-d4f9f.firebaseio.com",
    projectId: "authentication-d4f9f",
    storageBucket: "authentication-d4f9f.appspot.com",
    messagingSenderId: "731530423827"
};
firebase.initializeApp(config);


function signUp() {
    var fullName = document.getElementById('fullName').value;
    var Email = document.getElementById('emailSignup').value;
    var password = document.getElementById('passwordSignup').value;
    var repeatPassword = document.getElementById('RepeatpasswordSignup').value;
    var Contact = document.getElementById('Contact').value;
    var select = document.getElementById('genderSelect').value;
    if (fullName == "") {
        document.getElementById('nameError').innerHTML = "Name is Required";
        return false
    }
    if (fullName.length <= 2 || fullName.length > 20) {
        document.getElementById('nameError').innerHTML = "Enter Full Name Between 3 to 20 Characters";
        return false
    }
    if (!isNaN(fullName)) {
        document.getElementById('nameError').innerHTML = "Enter only Characters";
        return false
    }
    if (Email == "") {
        document.getElementById('emailError').innerHTML = "Email is Required";
        return false
    }
    var reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (reg.test(Email) === false) {
        document.getElementById('emailError').innerHTML = "Invalid Email Address";
        return false
    }

    if (password == "") {
        document.getElementById('passError').innerHTML = "password is Required";
        return false
    }
    if (password.length <= 5 || password.length > 11) {
        document.getElementById('passError').innerHTML = "Enter Password atleast 6 to 12 Characters or digits";
        return false
    }
    if (password != repeatPassword) {
        document.getElementById('rpassError').innerHTML = "Password Are Not Matched";
        return false
    }

    if (Contact == "") {
        document.getElementById('numError').innerHTML = "Contact Number is required";
        return false
    }
    if (isNaN(Contact)) {
        document.getElementById('numError').innerHTML = "Enter Only Numbers";
        return false
    }
    if (Contact.length != 11) {
        document.getElementById('numError').innerHTML = "Enter Correct Mobile Number must be 11 digit";
        return false
    }
    if (select === "Select Gender") {
        document.getElementById('errselect').innerHTML = "Please Select Gender";
        return false
    }
    setTimeout(function () {
        document.getElementById('signLoad').style.display = "block";
    }, 3000)
    firebase.auth().createUserWithEmailAndPassword(Email, password)
        .then((success) => {
            var userData = {
                fullName,
                Email,
                Contact
            }
            var UseruId = firebase.auth().currentUser.uid
            firebase.database().ref("users/" + UseruId).set(userData).then(() =>{
                window.location = "../index.html"})

        }).catch((err) => {
            console.log(err.message)
        })
}
function signIn(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email == "") {
        document.getElementById('emailErrorlogin').innerHTML = "Email is Required";
        return false
    }
    if (password == "") {
        document.getElementById('passErrorlogin').innerHTML = "Password is Required";
        return false
    }
    
    setTimeout(function () {
        document.getElementById('logload').style.display = "block";
        firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
            localStorage.setItem("userAuth",JSON.stringify(success))
            window.location = './pages/home.html'
            
        })
        .catch(function (error) {
            console.log(error.message)
            // ...
        })
    },5000)
    
}