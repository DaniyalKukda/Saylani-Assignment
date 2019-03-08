var config = {
    apiKey: "AIzaSyCG5qiYp5nmDAP9frZkAD8Vu2a_I52RzZ0",
    authDomain: "olxapp-1997.firebaseapp.com",
    databaseURL: "https://olxapp-1997.firebaseio.com",
    projectId: "olxapp-1997",
    storageBucket: "olxapp-1997.appspot.com",
    messagingSenderId: "336667453418"
};
firebase.initializeApp(config);

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
window.addEventListener('load', async function () {
    userName();
})
window.addEventListener('load', async function () {
    await checkAuth();
})
async function checkAuth() {
    var get = await localStorage.getItem("checkAuth")
    let data = JSON.parse(get)
    if (data.users !== "null") {
        document.getElementById('chk').style.display = "none"
        document.getElementById('logout').style.display = "block"
        document.getElementById('main').style.display = "block"
        document.getElementById('signin').style.display = "none"

    } else {
        document.getElementById('main').style.display = "none"
        document.getElementById('chk').style.display = "block"
        document.getElementById('username').style.display = "none"
        document.getElementById('logout').style.display = "none"
        document.getElementById('dashboard').style.display = "none"

    }
}
function userName() {
    firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
            let id = user.uid;
            firebase.database().ref("userData/" + id).once("value", (userData) => {
                let data = userData.val();
                document.getElementById("username").innerHTML = `<img src=${data.profile} height='25' width='25' class='profileimg' />` + " " + data.fullName;
            })
        }
    })
}

function submit() {

    let productName = document.getElementById('productName').value;
    let productModel = document.getElementById('productModel').value;
    let productCategory = document.getElementById('category').value;
    let productImage = document.getElementById('productPic').files[0];
    let productDescription = document.getElementById('description').value;
    let productPrice = document.getElementById('productPrice').value;
    var userId = firebase.auth().currentUser.uid;
    document.getElementById('load3').style.display = "inline-block"

    productDetails = {
        productName,
        productModel,
        productCategory,
        productDescription,
        productPrice,
        userId
    }

    let storageRef = firebase.storage().ref().child(`productImage/${productImage.name}`)
    storageRef.put(productImage).then((url) => {
        url.ref.getDownloadURL().then((urlref) => {
            productDetails.productImage = urlref;

            firebase.database().ref("productDetails/" + userId).push(productDetails).then(() => {
                swal({
                    title: "Success",
                    text: "Your post is Submitted Successfully!",
                    icon: "success",
                    button: "ok",
                });
                document.getElementById('load3').style.display = 'none';

            })

        }).catch((err) => {
            document.getElementById('load3').style.display = 'none';
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
        document.getElementById('load3').style.display = 'none';
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
var divMain = document.getElementById('main');
function renderData() {
    divMain.innerHTML = ""
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref("productDetails/" + userId).once("value", (value) => {
        let get = value.val();
        for (var key in get) {
            divMain.innerHTML += `<div class="col-md-4 pr">
            <h2 style="text-align:center">${get[key].productName}</h2>

            <div class="card">
                <img src="${get[key].productImage}" alt="${get[key].productModel}" height="250" width="250">
                <h1>${get[key].productModel}</h1>
                <h6>Category : ${get[key].productCategory}</h6>
                <p class="price"><i class="fas fa-rupee-sign"></i>${get[key].productPrice}</p>
                <p>${get[key].productDescription}.</p>
                <p><button id='${key}' onclick="remove(this)"><i class="fas fa-trash"></i> Delete Product</button></p>
            </div>

        </div>
        `
        }
    })
}
function remove(d){
    let node = d.parentNode.getAttribute('key')
    console.log(node)
    var id = firebase.auth().currentUser.uid;
    firebase.database().ref("productDetails/"+id).child(d.id).remove().then((rem)=>{
        renderData();
    })
}