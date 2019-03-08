  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCG5qiYp5nmDAP9frZkAD8Vu2a_I52RzZ0",
    authDomain: "olxapp-1997.firebaseapp.com",
    databaseURL: "https://olxapp-1997.firebaseio.com",
    projectId: "olxapp-1997",
    storageBucket: "olxapp-1997.appspot.com",
    messagingSenderId: "336667453418"
  };
  firebase.initializeApp(config);
  function signIn() {
    let Email = document.getElementById('email-login').value;
    let password = document.getElementById('password-login').value;
    if (Email == "") {
        document.getElementById('first-error').innerHTML = "Email is Required";
        return false
    }
    var reg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (reg.test(Email) === false) {
        document.getElementById('first-error').innerHTML = "Invalid Email Address";
        return false
    }

    if (password == "") {
        document.getElementById('sec-error').innerHTML = "password is Required";
        return false
    }
    document.getElementById('load').style.display = 'inline-block';
    firebase.auth().signInWithEmailAndPassword(Email, password).then((success) => {
        localStorage.setItem("checkAuth", JSON.stringify(success))
        window.location = './home.html'
    }).catch((err) => {
        document.getElementById('load').style.display = 'none';
        console.error(err.message)
        console.log(err)
        swal({
            title: "Error",
            text: err.message,
            icon: "error",
            button: "ok",
        });
    })

}
  function signUp() {
    let fullName = document.getElementById('name').value;
    let Email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let repeatPassword = document.getElementById('repeatPassword').value;
    let Contact = document.getElementById('contact').value;
    let gender = document.getElementById('genderSelect').value;
    let Address = document.getElementById('address').value;
    let file = document.getElementById('profile').files[0];
    console.log(file)
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
    if (gender == "Select Gender") {
        document.getElementById('errselect').innerHTML = "Please Select Gender";
        return false
    }
    if (profile == "") {
        document.getElementById('picerr').innerHTML = "Please Select Your Picture";
        return false
    }
    if (Address == "") {
        document.getElementById('addressError').innerHTML = "Enter Your Complete Address";
        return false
    }
    var userData = {
        fullName,
        Email,
        password,
        gender,
        Contact,
        Address,
    }
    document.getElementById('load2').style.display = 'inline-block';
    firebase.auth().createUserWithEmailAndPassword(Email, password)
        .then((success) => {
            let storageRef = firebase.storage().ref().child(`profile/${file.name}`)
            storageRef.put(file).then((url) => {
                url.ref.getDownloadURL().then((urlref) => {
                    userData.profile = urlref;
                    let userId = firebase.auth().currentUser.uid;

                    firebase.database().ref("userData/" + userId).set(userData).then((success) => {
                        localStorage.setItem("checkAuth", JSON.stringify(success))
                        swal({
                            title: "Success",
                            text: "Your Account Has Been Created Successfully!",
                            icon: "success",
                            button: "ok",
                        });
                        document.getElementById('load2').style.display = 'none';
                        window.location = "../pages/home.html"
                    })

                }).catch((err) => {
                    document.getElementById('load2').style.display = 'none';
                    console.error(err.message)
                    console.log(err)
                    swal({
                        title: "Error",
                        text: err.message,
                        icon: "error",
                        button: "ok",
                    });
                })

            }).catch((err) => {
                document.getElementById('load2').style.display = 'none';
                console.error(err.message)
                console.log(err)
                swal({
                    title: "Error",
                    text: err.message,
                    icon: "error",
                    button: "ok",
                });
            })
        }).catch((err) => {
            document.getElementById('load2').style.display = 'none';
            console.error(err.message)
            console.log(err)
            swal({
                title: "Error",
                text: err.message,
                icon: "error",
                button: "ok",
            });
        })

    document.getElementById('name').value = ""
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""
    document.getElementById('repeatPassword').value = ""
    document.getElementById('contact').value = ""
    document.getElementById('address').value = ""
}