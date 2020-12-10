create database todo;
use  todo;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

flush privileges;

create table data(

Name varchar(255),
Email varchar(255),
Password varchar(255)
);
select * from users;
Insert into data values('Diksha','dikshagoyal1009@gmail.com','$2a$08$P1N4gwHB7/cm3pgX69NyP.vjXPdBvC2F4sJ5qtOdDG0/GM.Z9sKNq');
select * from data;
show tables;
