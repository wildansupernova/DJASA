/*Create Database*/
CREATE DATABASE DJASA_DATABASE;
USE DJASA_DATABASE;

/*Deklarasi Database*/
CREATE TABLE ACCOUNT(id_account int PRIMARY KEY,username varchar(24), nama varchar(35), password varchar(30), address text,email varchar(30),phone_number varchar(10), level int, prof_pic text, tanggal_pembuatan date, session_stat boolean);
CREATE TABLE SERVICE(id_service int PRIMARY KEY, name varchar(24), description text, location varchar(40), category varchar(15), account_id int, FOREIGN KEY(account_id) references ACCOUNT(account_id));
CREATE TABLE SERVICE_PIC(id_service int, id_pic int , picture text, PRIMARY KEY(id_service, id_pic) , FOREIGN KEY(id_service) references SERVICE(id_service));
CREATE TABLE SERVICE_PACKAGE(id_service int, id_package int, price int, PRIMARY KEY(id_service,id_package), FOREIGN KEY(id_service) references SERVICE(id_service));
CREATE TABLE WORK_HOUR(id_service int, id_package int, day int, start_hour time, end_hour time, PRIMARY KEY(id_service,id_package,day,start_hour),FOREIGN KEY(id_service,id_package) references SERVICE_PACKAGE(id_service,id_package));
CREATE TABLE REVIEW(id_account int, id_review int, creation_date date, rating int, description text, PRIMARY KEY(id_account,id_review), FOREIGN KEY(id_account) references ACCOUNT(id_account));
CREATE TABLE TRANSACTION(id_transaction int PRIMARY KEY, id_buyer int, id_service int, id_package int, start_date date, FOREIGN KEY(id_buyer) references ACCOUNT(id_account), FOREIGN KEY(id_service,id_package) references SERVICE_PACKAGE(id_service,id_package));
CREATE TABLE FINISHED_TRANSACTION(id_transaction int PRIMARY KEY, id_buyer int, id_service int, end_date date, FOREIGN KEY(id_transaction) references TRANSACTION(id_transaction));
CREATE TABLE ONGOING_TRANSACTION(id_transaction int PRIMARY KEY, id_buyer int id_service int, status varchar(10), progress text,PRIMARY KEY(id_transaction,id_buyer,id_service), FOREIGN KEY(id_transaction) references TRANSACTION(id_transaction));
CREATE TABLE NOTIFICATION(id_buyer int, id_service int, id_notif int, status boolean, PRIMARY KEY(id_buyer,id_service,id_notif), FOREIGN KEY(id_buyer) references ACCOUNT(id_buyer), FOREIGN KEY(id_service) references SERVICE(id_service));
