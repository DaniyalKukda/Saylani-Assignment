window.addEventListener('load', function () {
    let get = localStorage.getItem("checkAuth")
    let data = JSON.parse(get)

    firebase.database().ref("userData/" + data.user.uid).on("value", (check) => {
        let val = check.val();
        var userData = {
            Name: val.fullName,
            Email: val.Email,
            Contact: val.Contact,
            gender: val.gender,
            Address: val.Address
        }
        document.getElementById("profile").innerHTML = `<br>
            <img src=${val.profile} class="primg" alt="">
            <br><br>
            <h2> Full Name : ${userData.Name}</h2>
            <h3> Email : ${userData.Email}</h3>
            <h3> Contact : ${userData.Contact}</h3>
               <h3> Gender : ${userData.gender}</h3>
               <h3> Address : ${userData.Address}</h3>
            `
    })
})
function donorDelete() {
    let get = localStorage.getItem("checkAuth")
    let data = JSON.parse(get)

    firebase.database().ref("donorDetails/" + data.user.uid).once('value', (value) => {
        let datam = value.val();
        if (datam !== null) {

            firebase.database().ref("donorDetails/" + data.user.uid).remove().then((success) => {
                swal({
                    title: "success",
                    text: "You Are Succefully Removed as a Donor",
                    icon: "success",
                    button: "ok",
                });
            }).catch((err) => {
                swal({
                    title: "Error",
                    text: err.message,
                    icon: "error",
                    button: "ok",
                });
            })
        }else{
            swal({
                title: "Error",
                text: "You Are Not a Donor",
                icon: "error",
                button: "ok",
            });
        }
    })

}

