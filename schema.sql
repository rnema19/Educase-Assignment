create database school_app;
use school_app;

create table school (
    id int primary key auto_increment,
    name varchar(255) not null,
    address varchar(255) not null,
    latitude float not null,
    longitude float not null
);

/*
insert into school (name,address,latitude,longitude) 
values 
('PCMC Gov School 1','Address 1', 18.6, 73.8);
('PYC Gymkhana','Address 1', 18.51, 73.83);
*/