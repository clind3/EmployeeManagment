const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
require('dotenv').config();
const cTable = require('console.table');
const prompts = require('./models/prompts');

//initialize
const PORT = process.env.PORT || 3001;
const app = express();

//Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
},
    console.log('connected to db!')
);

connection.connect((err) => {
    if (err) throw err;
    console.log('WELCOME TO THE EMPLOYEE MANAGER'

    )
    startManaging();
});


//main action inquirer
const startManaging = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                //required actions
                'Add Department',
                'Add Role',
                'Add Employee',
                'View Department',
                'View Role',
                'View Employee',
                'View Roster',
                'Update Employee Info',
                //stop program
                'EXIT',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add Department':
                    addDept();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'View Department':
                    viewDept();
                    break;

                case 'View Role':
                    viewRole();
                    break;

                case 'View Employee':
                    viewEmployee();
                    break;

                case 'View Roster':
                    createConsTable();
                    break;

                case 'Update Employee Info':
                    updateEmp();
                    break;


                case 'Exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};

/*====================================================================
      ADDING DEPT, ROLES, OR EMPLOYEE PROMPTS
======================================================================*/
let addQuery;

const addDept = () => {
    inquirer.prompt(prompts.addDeptP).then((answers) => {
        addQuery = `INSERT INTO department (id, name) VALUES (${answers.id}, "${answers.name}")`;
        // console.log(addQuery);
        connection.query(addQuery, (err) => {
            if (err) throw err;
            startManaging();
        });

    })
}


const addRole = () => {
    inquirer.prompt(prompts.addRoleP).then((answers) => {
        addQuery = `INSERT INTO role (title, salary, department_id) VALUES ( "${answers.title}", ${answers.salary}, "${answers.deptId}")`;
        // console.log(addQuery);
        connection.query(addQuery, (err) => {
            if (err) throw err;
            startManaging();
        });

    });
}

const addEmployee = () => {
    inquirer.prompt(prompts.addEmpP).then((answers) => {
        let manager = null;
        if (answers.haveManager) {
            manager = `${answers.manId}`;
        }
        addQuery = `INSERT INTO employee ( first_name, last_name, manager_id, role_id) VALUES ("${answers.first}", "${answers.last}", ${manager}, ${answers.roleId})`;
        // console.log(addQuery);
        connection.query(addQuery, (err) => {
            if (err) throw err;
            startManaging();
        });

    });
}

/*====================================================================
      VIEW DEPT, ROLES, OR EMPLOYEE PROMPTS
======================================================================*/

const createConsTable = () => {
    connection.query("SELECT * FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.name",
    (err,res) => {
        console.table(res);
    })
    startManaging();
}

//will need to review inner join to get all employees from dept
const viewDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        console.table( res);
    })
    startManaging();
}

const viewEmployee = () => {
    connection.query('SELECT * FROM employee', (err, res)=> {
        console.table(res);
    })
    startManaging();
}

const viewRole = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        console.table(res);
    })
    startManaging();
}

/*====================================================================
      UPDATE EMPLOYEE ROLE PROMPTS
======================================================================*/

const updateEmp = () => {
    inquirer.prompt([{
        name: 'update',
        type: 'list',
        message: 'Which would you like to update?',
        choices: ['Role', 'Manager']
    },
    {
        name: 'empId',
        type: 'input',
        message: 'Enter Employee Id:'
    }]).then((answer) => {
            switch (answer.update) {
            case ('Role'):
                updateEmpRole(answer.empId);
                break;
            case ('Manager'):
                updateEmpMan(answer.empId);
                break;
        } 
    })
    
}
const updateEmpRole = (empId) => {
   inquirer.prompt({
       name: 'newRole',
       type: 'input',
       message: 'Enter the new Role Id:'
   }).then((value) => {
       connection.query(`UPDATE employee SET role_id = ${value.newRole} WHERE id = ${empId}`)
   })
   startManaging();
}

const updateEmpMan = (empId) => {
    inquirer.prompt({
        name: 'newMan',
        type: 'input',
        message: 'Enter the new Manager Id:'
    }).then((value) => {
        connection.query(`UPDATE employee SET manager_id = ${value.newMan} WHERE employee_id = ${empId}`)
    })
    startManaging();
 }

/*==============================================
    Initialize server
================================================*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = connection;

/*====================================================================
      MORE OPTION PROMPTS (OPTIONAL CODE)
======================================================================*/

//optional actions
                // 'Update employee managers',
                // 'View employees by manager',
                // 'Delete departments, roles, and employees',
                // 'View the total utilized budget of a department', 

