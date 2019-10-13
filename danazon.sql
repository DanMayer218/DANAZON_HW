-- DROP DATABASE IF EXISTS danazon_db;

-- CREATE DATABASE danazon_db;
USE danazon_db;

CREATE TABLE products (
item_id SMALLINT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NULL,
stock_quantity SMALLINT(7) NOT NULL,
 PRIMARY KEY (item_id)
 );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Cloak_of_mediocrity', 'household', 125.50, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('rotary_phone', 'electronics', 78.30, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Universal_Self_Destruct_Button', 'office', 90.00, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Starving_Artist_Joke_Book_and_Manual', 'books', 30.00, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bag_of_Random_Socks', 'mens_clothing', 20.90, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Hennessey_Williams', 'liquor', 55.80, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Toe_knife', 'outdoors', 15.75, 27);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Fathers_Love', 'mythical', 3000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Gender_fluids', 'liquor', 75.00, 55);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('4_skins_condoms', 'health', 9.00, 18);
