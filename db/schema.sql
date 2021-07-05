DROP DATABASE IF EXISTS burgers_db;

-- Create the database burgers_db and specified it for use.
CREATE DATABASE burgers_db;

USE burgers_db;

-- Create the table burgers.
CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burger varchar(255) NOT NULL,
  devoured BOOLEAN DEFAULT false,
  PRIMARY KEY (id)
);