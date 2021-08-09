const mysql = require('mysql');
const inquirer = require('inquirer');

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

const startManaging = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                //required actions
                'Add departments, roles, employees',
                'View departments, roles, employees',
                'Update employee roles',
                //optional actions
                'Update employee managers',
                'View employees by manager',
                'Delete departments, roles, and employees',
                'View the total utilized budget of a department',
                //stop program
                'EXIT',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add departments, roles, employees':
                    addToWhere();
                    break;

                case 'View departments, roles, employees':
                    viewDb();
                    break;

                case 'Update employee roles':
                    updateEmpRole();
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

//inquire if user wants to add department, roles, or employees
const addToWhere = () => {

}

//view database info fcn
const viewDb = () => {

}

//update employee role fcn
const updateEmpRole = () => {

}