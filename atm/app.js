var users = ["faraz","bilawal","shazaib","rameez","shoaib"]
var pass = ["123","456","789","000","111"]
var amount = ["10000","2000","11500","4000","1000"]
var date = new Date()
var userInput = prompt("enter your key")
userInput = userInput.toLowerCase()

for(var i = 0; i<pass.length; i++){
    if(userInput === pass[i]){
        alert("Welcome"+users[i])
        var transact = prompt("what amount you need to transact?")
        var remain = amount[i] - transact
        alert("your remaining balance is = "+remain)
        alert("time is"+date)

    }
}