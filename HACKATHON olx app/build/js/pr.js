var config = {
    apiKey: "AIzaSyCG5qiYp5nmDAP9frZkAD8Vu2a_I52RzZ0",
    authDomain: "olxapp-1997.firebaseapp.com",
    databaseURL: "https://olxapp-1997.firebaseio.com",
    projectId: "olxapp-1997",
    storageBucket: "olxapp-1997.appspot.com",
    messagingSenderId: "336667453418"
};
firebase.initializeApp(config);

window.addEventListener('load', function () {
    allPr()
    ofData()
})
function allPr() {
    firebase.database().ref("productDetails/").on("value", (value) => {
        let get = value.val();
        localStorage.setItem('AllprData', JSON.stringify(get))
    })
}
function ofData() {
    let maindiv = document.getElementById('allpr')
    let getData = localStorage.getItem('AllprData')
    let get = JSON.parse(getData)
    for (var key in get) {
        for (var key2 in get[key]) {
            maindiv.innerHTML += `<div class="col-md-4 pr" id='${key2}' onclick="more(this)">
                <h2 style="text-align:center">${get[key][key2].productName}</h2>
    
                <div class="card">
                    <img src="${get[key][key2].productImage}" alt="${get[key][key2].productModel}" height="250" width="250">
                    <h1>${get[key][key2].productModel}</h1>
                    <h6>Category : ${get[key][key2].productCategory}</h6>
                    <p class="price"><i class="fas fa-rupee-sign"></i>${get[key][key2].productPrice}</p>
                    <p>${get[key][key2].productDescription}.</p>
                </div>
    
            </div>`
        }
    }
}
var dk
function more(id) {
    var content = document.getElementById("allpr");
    firebase.database().ref("productDetails/").once("value", (value) => {
        let get = value.val();
        localStorage.setItem('morePr', JSON.stringify(get))
        for (var key in get) {
            for (var key2 in get[key]) {
                if (id.id === key2) {
                    content.innerHTML = ` <div class="img1">
                        <img src="${get[key][key2].productImage}" height="400" width="400" >
                    </div>
                    <div class="line" style="width: 0px; height:400px; float:left; border:1px solid black; margin-top: 10%; margin-left:30px;"></div>
                    <div style="float:left; margin-top:10%; margin-left:30px;">
                        <h1>Details</h1>
                        <h2>Product Name : ${get[key][key2].productName}</h2>
                        <h2>Product Model : ${get[key][key2].productModel}</h2>
                        <h3>Price : ${get[key][key2].productPrice}</h3>
                        <h3>Category : ${get[key][key2].productCategory}</h3>
                        <h4>Description : ${get[key][key2].productDescription}</h4>
                        <button onclick='window.location.reload()' class="btn btn-primary">Back</button>
                    </div>`
                    dk = get[key][key2].userId;
                    firebase.database().ref("userData/" + dk).once("value", (userData) => {
                        let data = userData.val();
                        document.getElementById("info").innerHTML = `
                            <div class="card2 col-md-4" style="float:left">
                                    <img src="${data.profile}" style="width:150px; height:150px; border-radius:50px">
                                    <h2>Seller Name : ${data.fullName}</h2>
                                    <p class="title">Contact : ${data.Contact}</p>
                                    <p>Address : ${data.Address}</p>
                                  
                                    <p><button class="chatbtn" data-toggle="modal" data-target=${getInfo()} "> Chat With Seller <i class="fas fa-comment"></i></button></p>
                                  </div>
                                  <div class="modal fade" id="modal">
        <div class="modal-dialog" id="inner">
            <div class="modal-content">
                <div class="modal-header" id="modal-title">
                    <h4 class="modal-title">write a Message to ${data.fullName}</h4>
                    <button class="close" style="color:black" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                   <div class="userChat" id="msgs">
    
                   </div>
                </div>
                <div class="modal-footer">
                
            <div class="form-group" style="width:100%;">
            <input type="text" style="width:100%;" id="messegeInput" placeholder="Enter Your Messege Here" class="form-control">
        </div>
        <div class="form-group" style="float:left">
            <button class="btn btn-primary" onclick="sendMsg('${dk}')">Send <i class="fas fa-sent"></i></button>
        </div>
                </div>

            </div>
        </div>
        

    </div>
    <div class="modal fade" id="modal2">
    <div class="modal-dialog" id="out">
                    <div class="modal-content">
                        <div class="modal-header" id="modal-title">
                            <h4 class="modal-title">write a Message to ${data.fullName}</h4>
                            <button class="close" style="color:black" data-dismiss="modal">&times;</button>
                        </div>
                        <div class="modal-body">
                           <h1>Please Login First</h1>
                        </div>
                         <div class="modal-footer"><a href="./pages/signin.html.html" class="btn btn-danger"> Login <i class="fas fa-sign-in"></i></a></div>               
                    </div>
    

</div>
    
                                        `
                        function getInfo() {
                            let get = localStorage.getItem("checkAuth")
                            let pr = JSON.parse(get)
                            var ans = (pr.users !== "null") ? "#modal" : "#modal2"
                            return ans
                        }
                    })
                }

            }
        }
    }).catch((er) => {
        console.log(er)
    })

}
function sendMsg(id) {
    var msg = document.getElementById("messegeInput").value;
    var uid = firebase.auth().currentUser.uid;
    var obj = {
        msg,
        name : "sender",
      }
      firebase.database().ref("chats/"+id+"/"+uid).push(obj).then(()=>{
        var obj2 = {
            msg,
            name : "me",
          }
        firebase.database().ref("chats/"+uid+"/"+id).push(obj2).then(()=>{
            
            swal({
                type: 'success',
                title: 'Message Sent!',
                text: 'You can check your all chats and messages by logging in.',
                confirmButtonText: "Ok",
                confirmButtonColor: "#fa7c6e"
            })

        })
    })
}

window.addEventListener('load', async function () {
    await checkAuth();
    userName();
})
async function checkAuth() {
    var get = await localStorage.getItem("checkAuth")
    let data = JSON.parse(get)
    if (data.users !== "null") {
        document.getElementById('username').style.display = "block"
        document.getElementById('logout').style.display = "block"
        document.getElementById('dashboard').style.display = "block"
        document.getElementById('signin').style.display = "none"
        document.getElementById('signup').style.display = "none"
    } else {
        document.getElementById('username').style.display = "none"
        document.getElementById('logout').style.display = "none"
        document.getElementById('dashboard').style.display = "none"
        // document.getElementById('signin').style.display = "block"
        // document.getElementById('signup').style.display = "block"

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
function logout() {
    firebase.auth().signOut().then((suc) => {
        swal("Successfully Logout !");

        localStorage.setItem('checkAuth', JSON.stringify({ users: "null" }));
        window.location.reload();
    }).catch((err) => {
        alert(err);
        console.log(err);
    })
}
function catSelect(selectValue) {
    if (selectValue === "category") {
        swal({
            title: "Sorry !",
            text: "please select category.....!",
            icon: "error",
            button: "ok"
        })
        return false
    }
    document.getElementById('allpr').innerHTML = ""
    document.getElementById("info").innerHTML = ""
    firebase.database().ref("productDetails/").on("value", (showDetails) => {
        let get = showDetails.val()
        for (let key in get) {
            for (let key2 in get[key]) {
                if (selectValue === get[key][key2].productCategory) {
                    document.getElementById('allpr').innerHTML += `<div class="col-md-4 pr" id='${key2}' onclick="more(this)">
                    <h2 style="text-align:center">${get[key][key2].productName}</h2>
        
                    <div class="card">
                        <img src="${get[key][key2].productImage}" alt="${get[key][key2].productModel}" height="250" width="250">
                        <h1>${get[key][key2].productModel}</h1>
                        <h6>Category : ${get[key][key2].productCategory}</h6>
                        <p class="price"><i class="fas fa-rupee-sign"></i>${get[key][key2].productPrice}</p>
                        <p>${get[key][key2].productDescription}.</p>
                    </div>
        
                </div>`
                }
            }
        }

    })
}
function prSearch() {
    let Input = document.getElementById('myInput').value;
    userInput = Input.toLowerCase()
    if (userInput === "") {
        swal({
            title: "Sorry !",
            text: "please Enter Product name.....!",
            icon: "error",
            button: "ok"
        })
        return false
    }
    var flage = 0
    document.getElementById('allpr').innerHTML = ""
    document.getElementById("info").innerHTML = ""
    firebase.database().ref("productDetails/").on("value", (showDetails) => {
        let get = showDetails.val();
        for (var key in get) {
            for (var key2 in get[key]) {
                if (userInput === get[key][key2].productName.toLowerCase()) {
                    document.getElementById('allpr').innerHTML += `<div class="col-md-4 pr" id='${key2}' onclick="more(this)">
                    <h2 style="text-align:center">${get[key][key2].productName}</h2>
        
                    <div class="card">
                        <img src="${get[key][key2].productImage}" alt="${get[key][key2].productModel}" height="250" width="250">
                        <h1>${get[key][key2].productModel}</h1>
                        <h6>Category : ${get[key][key2].productCategory}</h6>
                        <p class="price"><i class="fas fa-rupee-sign"></i>${get[key][key2].productPrice}</p>
                        <p>${get[key][key2].productDescription}.</p>
                    </div>
        
                </div>`
                    flage++;
                }
            }
        }
        if (flage === 0) {
            swal({
                title: "Sorry !",
                text: "Product Not Found.....!",
                icon: "error",
                button: "ok"
            })
        }
    })


}