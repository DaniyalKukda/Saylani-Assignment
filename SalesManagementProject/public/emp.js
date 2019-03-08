var  laptops = {
    Details : {
        Data1 : {
            brand: "Lenovo",
            name : "core 2 do",
            screen : "14.0 inch",
            processor : "2.0 processor",
            ram : "512 GB",
            HardDisk : "40 GB",
            battry : "6000 MAH",
            price : "8'000 PKR"
        },
        Data2: {
          brand: "Asus",
          name : "Dual Core",
          screen : "15.0 inch",
          processor : "2.8 processor",
          ram : "1 GB",
          HardDisk : "80 GB",
          battry : "6500 MAH",
          price : "10'000 PKR"
        },
        Data3: {
          brand: "Dell",
          name : "core i3",
          screen : "16.0 inch",
          processor : "3.0 processor",
          ram : "3 GB",
          HardDisk : "120 GB",
          battry : "7000 MAH",
          price : "13'000 PKR"
        },
        Data4:{
          brand: "Hp",
          name : "core i5",
          screen : "18.5 inch",
          processor : "4.5 processor",
          ram : "4 GB",
          HardDisk : "250 GB",
          battry : "6000 MAH",
          price : "15'000 PKR"
        },
        Data5: {
          brand: "Lenovo",
          name : "core i5",
          screen : "17.0 inch",
          processor : "4.0 processor",
          ram : "4 GB",
          HardDisk : "500 GB",
          battry : "9000 MAH",
          price : "16'000 PKR"
        },
        Data6:{
            brand: "Apple",
            name : "MacBook",
            screen : "18.5 inch",
            processor : "8.0 processor",
            ram : "8 GB",
            HardDisk : "750 GB",
            battry : "10000 mAh",
            price : "28'000 PKR"
        },
        Data7:{
          brand: "Lenovo",
          name : "core i3",
          screen : "16.0 inch",
          processor : "3.0 processor",
          ram : "3 GB",
          HardDisk : "120 GB",
          battry : "7000 MAH",
          price : "13'500 PKR"
        }
  }
}
for(var key in laptops){
    for(var key2 in laptops[key]){
        document.getElementById("data").innerHTML += "<tr>" +"<td>" + laptops[key][key2].brand + "</td>" +"<td>" + laptops[key][key2].name + "</td>" +"<td>" + laptops[key][key2].processor + "</td>" +"<td>" + laptops[key][key2].screen + "</td>"+"<td>" + laptops[key][key2].ram + "</td>"+"<td>" + laptops[key][key2].HardDisk + "</td>"+"<td>" + laptops[key][key2].battry + "</td>"+"<td>" + laptops[key][key2].price + "</td>" + "</tr>"+"<button onClick = 'alrt()'  id = 'change'>"+"Sale"+"</button>"
    }
}
function alrt(){
      document.getElementById("change").innerText = "Sold"
    swal("Dear Employee", "Product Has Been Sale !!!!......");
    

}