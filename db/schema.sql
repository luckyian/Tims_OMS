DROP DATABASE IF EXISTS chips_db;

-- Create the database chips_db and specified it for use.
CREATE DATABASE chips_db;

USE chips_db;

-- Create the table burgers.
CREATE TABLE chips (
  id int NOT NULL AUTO_INCREMENT,
  chip varchar(255) NOT NULL,
  sku int NOT NULL,
  removed BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);