DROP DATABASE IF EXISTS danazon_db;

CREATE DATABASE danazon_db;
USE danazon_db;

CREATE TABLE products (
item_id SMALLINT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price DECIMAL(10,2) NULL,
stock_quantity SMALLINT(7) NOT NULL,
 PRIMARY KEY (item_id)
 );

