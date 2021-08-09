const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();

//create connection to the database
const connection = mysql.createConnection({
    host: 'localhost',
    port: process.env.PORT || 3301,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) throw err;
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
                'Update employee roles',
                'More Options',
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

                case 'Update employee roles':
                    updateEmpRole();
                    break;

                case 'More Options...':
                    moreOptions();
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
      COLLECT DB TABLE INFO
======================================================================*/
const collectRole = () => {

}

const collectManagers = () => {

}

const collectEmp = () => {}

/*====================================================================
      ADDING DEPT, ROLES, OR EMPLOYEE PROMPTS
======================================================================*/
const addDept = () => {

}

/*====================================================================
      VIEW DEPT, ROLES, OR EMPLOYEE PROMPTS
======================================================================*/


/*====================================================================
      UPDATE EMPLOYEE ROLE PROMPTS
======================================================================*/

const updateEmpRole = () => {

}

/*====================================================================
      MORE OPTION PROMPTS (OPTIONAL CODE)
======================================================================*/

//optional actions
                // 'Update employee managers',
                // 'View employees by manager',
                // 'Delete departments, roles, and employees',
                // 'View the total utilized budget of a department', 