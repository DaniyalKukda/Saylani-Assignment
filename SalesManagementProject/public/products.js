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
      


    function addNew(){
      var newBrand = prompt("Enter New Brand")
      var newName = prompt("Enter New Model")
      var newprocessor = prompt("Enter New Processor")
      var newScreen = prompt("Enter New Screen Size")
      var newRam = prompt("Enter New Ram")
      var newRom = prompt("Enter New HardDisk")
      var newBattery = prompt("Enter New Battery");
      var newPrice = prompt("Enter Price");
        
      function AddData(BRAND,NAME,PROCESSOR,SCREEN,RAM,ROM,BATTERY,PRICE){
        this.newBrand = BRAND;
        this.newName =  NAME;
        this.newprocessor = PROCESSOR;
        this.newScreen =SCREEN;
        this.newRam=RAM;
        this.newRom =ROM;
        this.newBattery =BATTERY;
        this.newPrice = PRICE;
      }
      swal("New Data", "Data Has Been Added");
      var newData = new AddData(newBrand,newName,newprocessor,newScreen,newRam,newRom,newBattery,newPrice);
      var div = document.getElementById("add-new");
      div.innerHTML = "<h1> "+ "New Item" + "</h1>" + "<p>" + "<b>" + "<span>" +"Brand"+ "</span>" + "&nbsp;" + "<span>" +"Model"+ "</span>" + "&nbsp;"+"<span>" +"Processor"+ "</span>" + "&nbsp;" +"<span>" +"Screen"+ "</span>"+ "&nbsp;" + "<span>" +"Ram"+ "</span>"+  "&nbsp;" +"<span>" +"HardDisk"+ "</span>"+  "&nbsp;" +"<span>" +"Battery"+ "</span>" +"</b>" +"</p>"+ "<p>" + "<span id ='dataNewBrand'>" + newData.newBrand + "</span>" + "&nbsp;" + "&nbsp;" + "<span id ='dataNewname'>" + newData.newName + "</span>"+  "&nbsp;" + "&nbsp;" +"<span id ='dataNewprocessor'>" + newData.newprocessor + "</span>"+ "&nbsp;" + "&nbsp;" + "<span id ='dataNewscreen'>" + newData.newScreen + "</span>" + "&nbsp;" + "&nbsp;" + "<span id ='dataNewram'>" + newData.newRam + "</span>"+  "&nbsp;" + "&nbsp;" +"<span id ='dataNewrom'>" + newData.newRom + "</span>"+ "&nbsp;" + "&nbsp;" + "<span id ='dataNewBattery'>" + newData.newBattery + "</span>"+ "&nbsp;" + "&nbsp;" + "<span id ='dataNewprice'>" + newData.newPrice + "</span>"+ "</p>"
      "<button onclick='edit(document.getElementById('dataNewBrand'),document.getElementById('dataNewName'),document.getElementById('dataNewProcessor'),document.getElementById('dataNewScreen'),document.getElementById('dataNewRam'),document.getElementById('dataNewRom'),document.getElementById('dataNewBattery'))'>"+ "Edit" + "</button>"+"<button onClick = 'this.parentNode.remove()'>"+"Delete"+"</button>"; 
    
    }