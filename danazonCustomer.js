var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "M@dm@x19",
    database: "danazon_db"
});

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
      console.log(res);
      doubleprompt();
    //   connection.end();
    });
  }
  var doubleprompt = inquirer.prompt(
      [
          type: "input",
          message: "What is the ID of the product you want to buy",
          name: "purchase_id"
      ],
      [
          type: 'input',
          message: "how many units are you purchasing?",
          name: "purchase_amount"
      ]
      ).then(function(user) {
       var userSelection;
       for (var i = 0; i < results.length; i++) {
        if (results[i].purchase_id === answer.item_id) {
          userSelection = results[i];
            if(purchase_amount < userSelection.stock_quantity) {
                
            }
        //  for (var i = 0; i < results.length; i++) {
        //     if (results[i].purchase_amount === answer.item_id) {
        //       userSelection = results[i];
      });

