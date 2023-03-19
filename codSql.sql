drop schema if exists oop2;

create schema oop2;

use oop2;

create table person (

cnp int primary key not null unique,
l_name varchar(50) not null,
f_name varchar(50) not null,
e_mail varchar(50) not null unique,
p_password varchar (50) not null,
phone_number varchar(10) not null,
profile_picture varbinary(8000) not null
);

insert into person values

(1,"Bindea1", "Bogdan1", "test1@yahoo.com", "parola1", "0712345678",12345);

insert into person values

(2,"Bindea2", "Bogdan2", "test2@yahoo.com", "parola1", "0712345678",12345);

create table content(
	content_id int primary key not null unique,
    author_cnp int references person(cnp),
	text_content varchar(1000) not null,
	creation_date_time datetime not null,
    picture varbinary(8000) not null,
    likes int not null,
    dislikes int not null
);
insert into content values

(1,1,"Text1", '2020-11-11 10:22:22',12345,1,3);

insert into content values

(2,2,"Text1", '2021-10-10 11:22:22',12345,1,3);


create table question (
	content_id int not null unique references content(content_id),
    title varchar(100) not null
);

insert into question values

(1,"Question1");

create table answer (
	content_id int not null unique references content(content_id),
    question_id int references question(id)
);

insert into answer values

(2,1);

create table vote (
	id int primary key not null,
    user_id int references person(cnp),
    content_id int references content(content_id)
    
);

insert into vote values

(1,2,1);

create table tag (
	id int primary key not null,
    tag_name varchar(100) not null
);

insert into tag values

(1,"sport");

insert into tag values

(2,"school");

create table tag_questions(
	id int primary key not null,
    question_id int references question(id),
    tag_id int references tag(id)
);

insert into tag_questions values

(1,1,1);




