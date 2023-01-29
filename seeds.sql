INSERT INTO department (name)
VALUES ("Technology"),
       ("Banking"),
       ("Contractor"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Tech designer", 101000, 7),
       ("Engineer", 145000, 6),    
       ("HVAC", 75000, 5),
       ("Mortgage Writer", 35000,4),
       ("Developer", 65000, 3),
       ("Teller", 90000, 2),
       ("Feild Marketer", 68000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Julia", "Ritchie", 7, 7),
       ("Joe", "Ritchie", 5, 6),
       ("Brandon", "Devenport", 6,1),
       ("Ryan", "Adams", 3, 2),
       ("Rachel", "Galfo", 6, NULL),
       ("Scooby", "Doo", 2, 3),
       ("Shaggy", "Rogers", 2, 3)