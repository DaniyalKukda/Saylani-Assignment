var config = {
    apiKey: "AIzaSyBkvM0SgIbiq7rLAQRYDyacT6Y3I61hZNg",
    authDomain: "authentication-d4f9f.firebaseapp.com",
    databaseURL: "https://authentication-d4f9f.firebaseio.com",
    projectId: "authentication-d4f9f",
    storageBucket: "authentication-d4f9f.appspot.com",
    messagingSenderId: "731530423827"
};
firebase.initializeApp(config);

window.addEventListener('load', () => {
     getTodo()
})
function addTodo(){
    var todoText = document.getElementById('todo').value;
    var todolist = document.getElementById('todoList');
    if (todoText == "") {
        document.getElementById('todoErr').innerHTML = "Please Insert Data";
        return false
    }
    let id = firebase.auth().currentUser.uid;
    todolist.innerHTML = "";
    
    firebase.database().ref("TodoList/"+id).push(todoText)
    .then((success)=>{
        getTodo();      
    }).catch((err)=>{
    alert(err.message)
    console.log(err.message)
    })
}
function getTodo(){
    let id = firebase.auth().currentUser.uid;
    console.log(id)
    var todolist = document.getElementById('todoList');
    firebase.database().ref("TodoList/"+id).once("value",(li)=>{
        let listData = li.val();
        console.log(listData)
        for(var key in listData){
            todolist.innerHTML += `<ul class="list-group">
        <li key="${key}" class="list-group-item">${listData[key]}<a href="#" class="btn btn-warning" onclick='updateTask(this)' style="float:right;"><span class="glyphicon glyphicon-edit"></span></a><a href="#" class="btn btn-danger" onclick='deleteTask(this)' style="float:right;"><span class="glyphicon glyphicon-trash"></span></a></li>
        </ul>`
        }
    }).catch((err)=>{
    alert(err.message)
    console.log(err.message)
})
}
function deleteTask(d){
    var todolist = document.getElementById('todoList').innerHTML = "";
    var node = d.parentNode.getAttribute('key');
    var id = firebase.auth().currentUser.uid;
    firebase.database().ref("TodoList/"+id).child(node).remove().then((rem)=>{
        getTodo()
    })
}
function updateTask(u){
    var updt = prompt("Enter Updated Task here");
    var todolist = document.getElementById('todoList').innerHTML = "";
    var node = u.parentNode.getAttribute('key');
    var id = firebase.auth().currentUser.uid;
    firebase.database().ref("TodoList/"+id).child(node).set(updt).then(()=>{
        getTodo()
    })
}