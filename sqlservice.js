const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.port || 3301;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting database
const db = mysql.createConnection(
  {

    host: process.env.HOST_ENV,
    // MySQL 
    user: process.env.USER_ENV,
    password: process.env.PASSWORD_ENV,
    database: process.env.DB_ENV
  },
  console.log(`Yay! You have connected to the database.`)
);

app.use((req, res) => {
  res.status(404).end();
});

app.get('/api/departments', (req, res) => {
  db.query('select department', function (err, results) {
    res.json(results);
    });
})

app.listen(PORT, () => {
  console.log(`Server-port running ${PORT}`);
});

app.get('/api/employees', (req, res) => {
  db.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name, role.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager' 
  from employee e JOIN role on e.role_id = role.id JOIN department on role.department_id = department.id LEFT JOIN employee m on e.manager_id = m.id ORDER BY e.id ASC`, function (err, results) {
    res.json(results);
    });
})

app.post('/api/employees', (req, res) => {
  db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("${req.body.employeeFirstName}", "${req.body.employeeLastName}", ${req.body.roleId}, ${req.body.managerId})`, function (err, results) {
    res.json(results);
    });
})

app.patch('/api/employees', (req, res) => {
  db.query(`UPDATE employee
    SET role_id = "${req.body.role}"
    WHERE id = "${req.body.employee}"`, function (err, results) {
    res.json(results);
    });
})

app.post('/api/departments', (req, res) => {
  db.query(`Insert department (name)
    VALUES ("${req.body.name}")`, function (err, results) {
    res.json(results);
    });
})

app.post('/api/roles', (req, res) => {
  db.query(`Insert role (title, salary, department_id)
    VALUES ("${req.body.roleName}", ${req.body.roleSalary}, ${req.body.depId})`, function (err, results) {
    res.json(results);
    });
})

app.get('/api/roles', (req, res) => {
  db.query(`select role.id, role.title, department.name, role.salary
  FROM role 
  JOIN department ON role.department_id = department.id
  ORDER BY role.id ASC`, function (err, results) {
    res.json(results);
    });
})





