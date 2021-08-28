INSERT INTO department (id, name) 
VALUES (012,'Finance'), (013, 'IT'), (014, 'Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', '75,000', 'Engineering'),('Manager', '55,000', 'Finance');

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES ('Steve', 'Wilks', 23, 3), ('Jessie', 'Set', 0, 2);