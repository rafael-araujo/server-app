CREATE DATABASE TESTE_VUEJS;

use TESTE_VUEJS;

CREATE TABLE `TESTE_VUEJS`.`Employee` (
  `idEmployee` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`idEmployee`));
  
CREATE TABLE `TESTE_VUEJS`.`Authorization` (
  `idAuthorization` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(255) NOT NULL,
  `expirationDate`  TIMESTAMP NOT NULL,
  PRIMARY KEY (`idAuthorization`));

insert into Employee (name, username, password) Values ('José da Silva', 'jose.silva', '123456');
insert into Employee (name, username, password) Values ('Maria da Silva', 'maria.silva', '123456');
insert into Employee (name, username, password) Values ('Antônio Bezerra', 'antonio.bezerra', '123456');

