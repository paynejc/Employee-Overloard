USE employee_db;
INSERT INTO department(name)
VALUES 
    ("Finance"),
    ("Marketing"),
    ("Sales"),
    ("Engineering");

INSERT INTO role(title, salary, department_id)
VALUES
    ("Accountant", 80000.00, 1),
    ("Ad Agent", 75000.00, 2),
    ("Sale Associate", 60000.00, 3),
    ("Tech", 78000.00, 4),
    ("Finance Manager", 90000.00, 1),
    ("Marketing Manager", 90000.00, 2),
    ("Sales Manager", 90000.00, 3),
    ("Engineering Manager", 90000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Montgomery", "Burns", 5, null),
    ("Roger", "Sterling", 6, null),
    ("Michael", "Scott", 7, null),
    ("Victor", "Von Doom", 8, null),
    ("Homer", "Simpson", 1, 1),
    ("Don","Draper",2, 2),
    ("Dwight","Schrute", 3, 3),
    ("Valeria", "Richards",4, 4);