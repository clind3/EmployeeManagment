DROP DATABASE IF EXISTS manage_db;

CREATE DATABASE manage_db;

USE manage_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (name)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id VARCHAR(30)
    REFERENCES department(name),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT NULL,
    role_id INT
    REFERENCES role(id),
    PRIMARY KEY (id)
);

-- create table with following column name and info
-- id firstname lastname title dept salary manager