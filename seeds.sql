USE emsDB;
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Design');
INSERT INTO department (name) VALUES ('Product');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Finance');

USE emsDB;
SELECT * FROM department;

USE emsDB;
INSERT INTO role (title, salary, department_id) VALUES ('Lead Engineer', '150000', '1');
INSERT INTO role (title, salary, department_id) VALUES ('Engineer', '125000', '1');

USE emsDB;
SELECT * FROM role;

USE emsDB;
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Doe', '1', '1');
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Bob', 'Snith', '2', '1');

USE emsDB;
SELECT * FROM employee;
