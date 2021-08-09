DROP DATABASE IF EXISTS manage_db;

CREATE DATABASE manage_db;

USE manage_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id),
    REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id INT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id),
    REFERENCES role(id),
    PRIMARY KEY (id)
);

