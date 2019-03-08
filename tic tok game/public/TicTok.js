var sign = prompt("Select D Or K To Start The Game").toUpperCase();

var mainDiv = document.getElementById("main");
console.log(mainDiv);


if(sign != "" && sign === "D" || sign === "K"){
alert("You Selected "+sign + " Click Ok To Start The Game");    
var display = document.getElementById("turn");

var table = document.createElement("table");
var tr1 = document.createElement("tr");
var tr2 = document.createElement("tr");
var tr3 = document.createElement("tr");


var td1 = document.createElement("td");
td1.setAttribute("id","row1");
td1.setAttribute("onClick","printValue('1')");

var td2 = document.createElement("td");
td2.setAttribute("id","row2");
td2.setAttribute("onClick","printValue('2')");

var td3 = document.createElement("td");
td3.setAttribute("id","row3");
td3.setAttribute("onClick","printValue('3')");

var td4 = document.createElement("td");
td4.setAttribute("id","row4");
td4.setAttribute("onClick","printValue('4')");

var td5 = document.createElement("td");
td5.setAttribute("id","row5");
td5.setAttribute("onClick","printValue('5')");

var td6 = document.createElement("td");
td6.setAttribute("id","row6");
td6.setAttribute("onClick","printValue('6')");

var td7 = document.createElement("td");
td7.setAttribute("id","row7");
td7.setAttribute("onClick","printValue('7')");

var td8 = document.createElement("td");
td8.setAttribute("id","row8");
td8.setAttribute("onClick","printValue('8')");

var td9 = document.createElement("td");
td9.setAttribute("id","row9");
td9.setAttribute("onClick","printValue('9')");





tr1.appendChild(td1);
tr1.appendChild(td2);
tr1.appendChild(td3);
tr2.appendChild(td4);
tr2.appendChild(td5);
tr2.appendChild(td6);
tr3.appendChild(td7);
tr3.appendChild(td8);
tr3.appendChild(td9);
table.appendChild(tr1);
table.appendChild(tr2);
table.appendChild(tr3);
mainDiv.appendChild(table);

function printValue(number){
    var a = document.getElementById("row"+number);
    if(a.innerHTML === ""){
    a.innerHTML = sign;
    Win();
    checkValue();
     
    display.innerHTML = sign + "  ki Bari Hai";
    
    }
}
}else{
    alert("Please Select D OR K to start game....")
    location.reload();

}
function checkValue(){
    if(sign === "D"){
        sign = "K";
    }else{
        sign = "D";
    }
    
}
function getbox(num){
    return document.getElementById("row"+num).innerText;
}
function checkMove(a,s,d,m){
    if(getbox(a)=== m && getbox(s) === m && getbox(d) === m){
        return true;
    }else{
        return false;
    }
}

function Win(){
    if(checkMove(1,2,3,sign) || checkMove(4,5,6,sign) || checkMove(7,8,9,sign)
|| checkMove(1,4,7,sign) || checkMove(2,5,8,sign) || checkMove(3,6,9,sign)
|| checkMove(1,5,9,sign) || checkMove(7,5,3,sign) ){
               alert("WINNER IS "+sign);
               location.reload();
               for(var i = 1; i<=9; i++){
                document.getElementById("row"+i).innerText = "";
               } 
               throw " Game End";
    }else if(getbox(1) != "" && getbox(2) != "" && getbox(3) != "" && getbox(4) != "" && getbox(5) != "" && getbox(6) != "" && getbox(7) != "" && getbox(8) != "" && getbox(9) != ""){
                           alert("its a tie");
                           throw "its a Tie";
                           
    }

}