var inquirer = require("inquirer");
var mysql = require("mysql");
// var table = require('cli-table');
var colors = require("colors");
// var bodyParser = ("body-parser");


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "danazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
// var jsonParser = bodyParser.json();
// function afterConnection() {
//     console.log("Time to loosen up the grip on your debit card, just look at this list of magical items for sale...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw error;
      var afterconnection =
      function displayItemTable() {
          console.log("Time to loosen up the grip on your debit card, just look at this list of magical items for sale...\n");
          connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err;

            console.log("Welcome to Danazon home of the Absurd");
            console.log("See anything that you like?");

            for(var i = 0; i < res.length; i++){
              console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stock_quantity);
              console.log('--------------------------------------------------------------------------------------------------')
            }
          
            console.log(' ');
           
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
              var whatToBuy = (ans.id)-1;
              var howMuchToBuy = parseInt(ans.qty);
              var grandTotal = parseFloat(((res[whatToBuy].Price)*howMuchToBuy).toFixed(2));
        
              //check if quantity is sufficient
              if(res[whatToBuy].stock_quantity >= howMuchToBuy){
                //after purchase, updates quantity in Products
                connection.query("UPDATE Products SET ? WHERE ?", [
                {stock_quantity: (res[whatToBuy].stock_quantity - howMuchToBuy)},
                {ItemID: ans.id}
                ], function(err, result){
                    if(err) throw err;
                    console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                });
        
                connection.query("SELECT * FROM Departments", function(err, deptRes){
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
            } else{
              console.log("See you soon!");
            }
          });
        }
    
    
   

  afterconnection();
//       // Log all results of the SELECT statement
//       var table = new Table({ 
//         head: [colors.cyan('item_id'), colors.cyan('product_name'), colors.cyan('department_name'), colors.cyan('price'), colors.cyan('stock_quantity')],
//                 colWidths: [5, 70, 13, 10]
//             });
//             for (var i = 0; i < results.length; i++){
//               table.push(
//                 [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]),
//                 ("$ "+JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
//         }
//         console.log(colors.green('_______________________________________________________________________________________________________'));
//         console.log("\n" + table.toString());  //prints the constructed cli-table to screen
//         console.log(colors.green('_______________________________________________________________________________________________________'));
//         console.log("");
//     });
// }
// afterConnection();
// showItemTable();
      // console.log(res);
      // connection.end();









// var inquirer = require("inquirer");
// var mysql = require("mysql");
// var table = require("cli-table");

// var connection = mysql.createConnection({
//     host: "localhost",
//     port: 3306,
//     user: "root",
//     password: "M@dm@x19",
//     database: "danazon_db"
// });

// var orderTotal = 0;

// connection.connect(function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//    afterconnection;
// });
// var afterconnection =
// function displayItemTable() {
//     console.log("Time to loosen up the grip on your debit card, just look at this list of magical items for sale...\n");
//     connection.query("SELECT * FROM products", function(err, res) {
//       if (err) throw err;
//       // Log all results of the SELECT statement
//       // console.log(res);
//       var table = new Table({   //syntax to create table from cli-table npm
//         head: [('item_id'), ('product_name'), ('price'), ('stock_quantity')],
//         colWidths: [5, 70, 13, 10]
//     });
//     for (var i = 0; i < results.length; i++){   //loop through all records of the db table
//     table.push(   //push each record from the bd table to the cli table
//         [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]),
//         ("$ "+JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
// }
// });
// }

// // displayItemTable();

//       // doubleprompt();
//     //   connection.end();
  
//   var doublePrompt = inquirer.prompt([
//       {
//           type: "number",
//           message: "What is the ID of the product you want to buy?",
//           name: "purchase_id"
//       },
//       {
//           type: 'input',
//           message: "how many units are you purchasing?",
//           name: "purchase_amount"
//       }
//     ]).then(function(answer) {
//        var orderId = answer.purchase_id;
//        var quantity = answer.purchase_amount;

//        connection.query('SELECT item_id, stock_quantity FROM products WHERE item_id=?', [orderId], function(err, results){
//         if (err) throw err;
// 				var stock_quantity = results[0].stock_quantity;           //store the stock qty of the record queried as var stock_quantity
// 				if (stock_quantity < quantity) {                          //if user orders more than available qty give message
// 					console.log("Sorry, we don't have the stock to fill that request. Please order at or below the quantity listed");
//           setTimeout(doublePrompt, 1000);                          //recall the CustomerBuy function
//         }
//          else{                                                   //if user order quantity can be fullfilled...
// 					stock_quantity -= quantity;                             //subtract the users purchase qty from the store stock qty               
//             };
//           });
//         }
//     )
//     doublePrompt();
