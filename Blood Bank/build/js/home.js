var config = {
    apiKey: "AIzaSyCtGNDFqqj_ugQrTp4doNGaBqzmxTsmRbA",
    authDomain: "bloodbank-1997.firebaseapp.com",
    databaseURL: "https://bloodbank-1997.firebaseio.com",
    projectId: "bloodbank-1997",
    storageBucket: "bloodbank-1997.appspot.com",
    messagingSenderId: "1070269055718"
};
firebase.initializeApp(config);

window.addEventListener("load", function () {
    showData()
    userName()
})

window.addEventListener('load', async function () {
    await checkAuth();
})
function userName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
            let id = user.uid;
            firebase.database().ref("userData/" + id).once("value", (userData) => {
                let data = userData.val();
                document.getElementById("username").innerHTML = `<img src=${data.profile} height='25' width='25' class='profileimg' />` + " " + data.fullName;
            })
        }
        if (user !== null) {
            firebase.database().ref('donorDetails/' + user.uid).once("value", (check) => {
                let checkData = check.val()
                if (checkData !== null) {
                    document.getElementById('btn-donor1').style.visibility = "hidden"
                }
            })
        }
    });


}
async function checkAuth() {
    let get = await localStorage.getItem("checkAuth")
    let data = JSON.parse(get)

    if (data.users !== "null") {
        document.getElementById('checklog').style.display = "none";
        document.getElementById('home').style.display = "block";
        document.getElementById('give').style.display = "block";
        document.getElementById('about').style.display = "block";
        document.getElementById('username').style.display = "block";
        document.getElementById('logout').style.display = "block";
        document.getElementById("chk").style.display = "none";
        document.getElementById("main").style.display = "block";
    } else {
        document.getElementById('checklog').style.display = "block";
        document.getElementById('home').style.display = "none";
        document.getElementById('give').style.display = "none";
        document.getElementById('about').style.display = "none";
        document.getElementById('username').style.display = "none";
        document.getElementById('logout').style.display = "none";
        document.getElementById("chk").style.display = "block";
        document.getElementById("main").style.display = "none";
    }
}
function logout() {

    firebase.auth().signOut().then((suc) => {
        swal("Successfully Logout !");

        localStorage.setItem('checkAuth', JSON.stringify({ users: "null" }));
        window.location = "../index.html"
    }).catch((err) => {
        alert(err);
        console.log(err);
    })
}
function donar() {
    let age = document.getElementById('age').value;
    let bg = document.getElementById('bloodSelect').value;
    document.getElementById('load3').style.display = "inline-block"
    if (age === "") {
        document.getElementById('ageError').innerHTML = "Age is Required"
        return false
    }
    if (age < 18) {
        document.getElementById('ageError').innerHTML = "Only 18 + Are Donate Blood"
        return false
    }
    if (isNaN(age)) {
        document.getElementById('ageError').innerHTML = "Enter Age in Numbers Only"
        return false
    }
    if (bg === 'Select blood') {
        document.getElementById('errselect').innerHTML = "Select Your Blood Group"
        return false
    } else {
        document.getElementById('errselect').innerHTML = ""
    }
    var donarid = firebase.auth().currentUser.uid;
    firebase.database().ref('userData/' + donarid).once("value", (donorData) => {
        let data = donorData.val();
        var donorDetails = {
            Name: data.fullName,
            Email: data.Email,
            Bloodgroup: bg,
            Age: age,
            Gender: data.gender,
            Contact: data.Contact,
            Address: data.Address,
            profile: data.profile,
            type: "Donor"
        }
        firebase.database().ref('donorDetails/'+donarid).set(donorDetails).then((success1) => {
            swal({
                title: "success",
                text: "You Are Successfully Registered as A Donor",
                icon: "success",
                button: "ok"
            })
            document.getElementById('btn-donor1').style.display = "none"
            setTimeout(function () {
                location.reload()
            }, 2000)

        })

    }).catch((err) => {
        document.getElementById('load3').style.display = 'none';
        swal({
            title: "error",
            text: err.message,
            icon: "error",
            button: "ok",
        });
    })
}
var details = document.getElementById('tbody');
function showData() {
    firebase.database().ref("donorDetails/").on("value", (showDetails) => {
        let data = showDetails.val()
        for (var key in data) {
            details.innerHTML += `<tr>
            <td><img src='${data[key].profile}' height='30' width='30' class='profileimg' /></td>
            <td>${data[key].Name}</td>
            <td>${data[key].Bloodgroup}</td>
            <td>${data[key].Age}</td>
            <td>${data[key].Gender}</td>
            <td>${data[key].Contact}</td>
            <td>${data[key].Address}</td>
        </tr>
        `

        }
    })

}
function search() {
    let filter = document.getElementById('filter').value;
    if (filter === "Select blood") {
        document.getElementById('fillerr').innerHTML = "please select blood group"
        return false
    }
    document.getElementById('fillerr').innerHTML = ""
    let flage = 0;
    firebase.database().ref("donorDetails/").on("value", (showDetails) => {
        let data = showDetails.val()
        details.innerHTML = ""
        for (var key in data) {
            if (filter === data[key].Bloodgroup) {
                details.innerHTML += `<tr>
                <td><img src='${data[key].profile}' height='30' width='30' class='profileimg' /></td>
                        <td>${data[key].Name}</td>
                        <td>${data[key].Bloodgroup}</td>
                        <td>${data[key].Age}</td>
                        <td>${data[key].Gender}</td>
                        <td>${data[key].Contact}</td>
                        <td>${data[key].Address}</td>
                    </tr>
                        `
                flage++;

            }
        }
        if (flage === 0) {
            swal({
                title: "Sorry !",
                text: "We Dont Have Donor of This Blood Group.....!",
                icon: "error",
                button: "ok"
            })
            details.innerHTML = ""
            showData();
        }

    })
}
