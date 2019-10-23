// Required dependencies
var inquirer = require("inquirer");
var mysql = require("mysql");
var colors = require("colors");

// Server and database connections
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "danazon_db"
});

// Connecting to the server and console logging connection or error message
connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});

      // Var that initializes the display of the product table, and prompts the purchase actions
    
      var afterconnection =
      function displayItemTable() {
          console.log("Time to loosen up the grip on your debit card, just look at this list of magical items for sale...\n");
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            console.log("Welcome to Danazon home of the Absurd");
            console.log("See anything that you like?");

              // Cycles through the product list and displays it in the below format.
            for(var i = 0; i < res.length; i++){
              console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
              console.log('--------------------------------------------------------------------------------------------------')
            }
          
            console.log(' ');
           
            // Initializes the inquirer app to collect the product id and quantity from the user
            inquirer.prompt([
              {
                type: "input",
                name: "id",
                message: "Enter the Id of the product you wish to waste your money on?",
                validate: function(value){
                  if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                    return true;
                  } else{
                    return false;
                  }
                }
              },

              {
                type: "input",
                name: "qty",
                message: "How many of them do you want to buy today?",
                validate: function(value){
                  if(isNaN(value)){
                    return false;
                  } else{
                    return true;
                  }
                }
              }

            ]).then(function(ans){
              // Var to collect the users product id choice
              var whatToBuy = (ans.id)-1;
              // Var to collect the users quantity from inquirer
              var howMuchToBuy = parseInt(ans.qty);
              
              // Var to total the price of the selection and qty 
              var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));
        
              //check if quantity is sufficient
              if(res[whatToBuy].stock_quantity >= howMuchToBuy){
                //after purchase, updates quantity in Products
                connection.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
                {item_id: ans.id}
                ], function(err, result){
                    if(err) throw err;
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                });
        
                connection.query("SELECT * FROM products", function(err, item_id){
                  if(err) throw err;
                  var index;
                  for(var i = 0; i < deptRes.length; i++){
                    if(deptRes[i].department_name === res[whatToBuy].department_name){
                      index = i;
                    }
                  }
                  
                  //updates totalSales in departments table
                  connection.query("UPDATE Departments SET ? WHERE ?", [
                  {TotalSales: deptRes[index].TotalSales + grandTotal},
                  {department_name: res[whatToBuy].department_name}
                  ], function(err, deptRes){
                      if(err) throw err;
                      //console.log("Updated Dept Sales.");
                  });
                });
        
              } else{
                console.log("Sorry, there's not enough in stock!");
              }
        
              reprompt();
            })
        })
        }
        
        //asks if they would like to purchase another item
        function reprompt(){
          inquirer.prompt([{
            type: "confirm",
            name: "reply",
            message: "Would you like to purchase another item?"
          }]).then(function(ans){
            if(ans.reply){
              afterconnection();
            } 
            else {
              console.log("See you soon!");
            }
          });
        }
    
    
   

  afterconnection();
