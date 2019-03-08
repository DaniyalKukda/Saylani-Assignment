var Div = document.getElementById("Container")
console.log(Div)
var input = document.createElement("Input")
input.setAttribute("Class","input")
input.setAttribute("Type","text")
input.setAttribute("id","todo")
input.setAttribute("Placeholder","Add Your Work")

var btnInput = document.createElement("button")
btnInput.setAttribute("onClick","AddWork()")
btnInput.setAttribute("class","btnInput")
var btnText = document.createTextNode("Add Work")
Div.appendChild(input)
btnInput.appendChild(btnText)
Div.appendChild(btnInput)

var ListDiv = document.createElement("div")
ListDiv.setAttribute("id","ListDiv")
var ol = document.createElement("ol")
ol.setAttribute("id","ol")

function AddWork(){
   if(input.value === ""){
       alert("Please Write Some Text Here ")
   }else{
    var li = document.createElement("li")
    li.setAttribute("class","li")
    li.setAttribute("id","li")

    var ADDTODO = document.getElementById("todo").value;
    var litext = document.createTextNode(ADDTODO)

    var deleteBtn = document.createElement("button")
    deleteBtn.setAttribute("class","delete")
    deleteBtn.setAttribute("onClick","delete()")
    var deleteText = document.createTextNode("Delete")
    deleteBtn.appendChild(deleteText)

    li.appendChild(litext)
    li.appendChild(deleteBtn)
    ol.appendChild(li)
    ListDiv.appendChild(ol)

    deleteBtn.addEventListener('click', function(){
        
        deleteBtn.parentNode.remove()
        
    
    })
    var EditBtn = document.createElement("button")
    EditBtn.setAttribute("class","delete")
    
    var EditText = document.createTextNode("Edit")
    EditBtn.appendChild(EditText)
    li.appendChild(EditBtn)

    EditBtn.addEventListener('click',function(){
        li.removeChild(litext)
        update = prompt("Enter Your Text Here",ADDTODO)
        litext = document.createTextNode(update)
        li.insertBefore(litext,deleteBtn)
        
    })

   }

    Div.appendChild(ListDiv)
    document.getElementById('todo').value = '';
}