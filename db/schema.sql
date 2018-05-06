DROP DATABASE IF EXISTS burger_db;
CREATE database burger_db;

use burger_db;
drop table if exists burgers;
CREATE TABLE burgers (
	id int auto_increment NOT NULL PRIMARY Key,
	burger_name varchar(500) NOT NULL,
	devoured boolean default false,
	createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

);

select * from burgers;