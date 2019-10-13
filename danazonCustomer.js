var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "M@dm@x19",
    database: "danazon_db"
});

var orderTotal = 0;

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
});

function afterConnection() {
    console.log("Time to loosen up the grip on your debit card, just look at this list of magical items for sale...\n");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      // console.log(res);
      var table = new Table({   //syntax to create table from cli-table npm
        head: [('item_id'), ('product_name'), ('price'), ('stock_quantity')],
        colWidths: [5, 70, 13, 10]
    });
    for (var i = 0; i < results.length; i++){   //loop through all records of the db table
    table.push(   //push each record from the bd table to the cli table
        [(JSON.parse(JSON.stringify(results))[i]["item_id"]), (JSON.parse(JSON.stringify(results))[i]["product_name"]),
        ("$ "+JSON.parse(JSON.stringify(results))[i]["price"]), (JSON.parse(JSON.stringify(results))[i]["stock_quantity"])]);
}
});
}

showItemTable();

      doubleprompt();
    //   connection.end();
  ;
  var doublePrompt = inquirer.prompt([
      {
          type: "input",
          message: "What is the ID of the product you want to buy",
          name: "purchase_id"
      },
      {
          type: 'input',
          message: "how many units are you purchasing?",
          name: "purchase_amount"
      }
    ]).then(function(answer) {
       var orderId = answer.purchase_id;
       var quantity = answer.purchase_amount;

       connection.query('SELECT item_id, stock_quantity FROM products WHERE item_id=?', [orderId], function(err, results){
        if (err) throw err;
				var stock_quantity = results[0].stock_quantity;           //store the stock qty of the record queried as var stock_quantity
				if (stock_quantity < quantity) {                          //if user orders more than available qty give message
					console.log("Sorry, we don't have the stock to fill that request. Please order at or below the quantity listed");
          setTimeout(doublePrompt, 1000);                          //recall the CustomerBuy function
        }
         else{                                                   //if user order quantity can be fullfilled...
					stock_quantity -= quantity;                             //subtract the users purchase qty from the store stock qty               
            };
          });
        }
    )