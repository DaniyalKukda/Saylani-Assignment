var config = {
    apiKey: "AIzaSyBkvM0SgIbiq7rLAQRYDyacT6Y3I61hZNg",
    authDomain: "authentication-d4f9f.firebaseapp.com",
    databaseURL: "https://authentication-d4f9f.firebaseio.com",
    projectId: "authentication-d4f9f",
    storageBucket: "authentication-d4f9f.appspot.com",
    messagingSenderId: "731530423827"
};
firebase.initializeApp(config);

window.addEventListener('load',async function(){
    await checkAuth();
    userName();
})

function userName(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user !== null) {
            let id = user.uid;
            // console.log(id)
            firebase.database().ref("users/"+id).once("value",(userData)=>{
                let data = userData.val();
                // console.log(data.fullName)
                document.getElementById("btn-userName").innerHTML = data.fullName + '<span class="glyphicon glyphicon-menu-down"></span>';
            })
        }
      });
}
async function checkAuth(){ 
    let get = await localStorage.getItem("userAuth")
    let data = JSON.parse(get)
    
    if(data.users !== "null"){
        document.getElementById('log').style.display = "none";
        document.getElementById('main').style.display = "block";
        document.getElementById('post').style.display = "block";
        document.getElementById("chk").style.display = "none";
    }else{
        document.getElementById('log').style.display = "block";
        document.getElementById('main').style.display = "none";
        document.getElementById('post').style.display = "none";
        document.getElementById("chk").style.display = "block";
    }
}

function logOut(){

    firebase.auth().signOut().then((suc)=>{
        swal("Logout!");

        localStorage.setItem('userAuth',JSON.stringify({users:"null"}));
        window.location = "../index.html"
    }).catch((err)=>{
        alert(err);
        console.log(err);
    })
}
function createPost(){
    let name = document.getElementById("Name").value;
    let messege = document.getElementById("Message").value;
    let id = firebase.auth().currentUser.uid;
    var myPost = {
        name,
        messege
    }
    var div =  document.getElementById('myPost').innerHTML = "";
   firebase.database().ref("post/"+id).push(myPost)
    .then((success)=>{
        swal("Post!", "Your Post is Submitted!", "success");
        firebase.database().ref("post/"+id).once("value",(postData)=>{
            let myPostData = postData.val()
            for(var key in myPostData){
                // console.log(myPostData[key].name)
                // console.log(myPostData[key].messege)
                document.getElementById('myPost').innerHTML +=`<h3 class="bg-primary text-white">${myPostData[key].name}</h3>
                <p>${myPostData[key].messege}</p>`
                            
            }
        })   
    })

}