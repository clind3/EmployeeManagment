const mysql = require('mysql');
const inquirer = require('inquirer');
const express = require('express');
require('dotenv').config();
const cTable = require('console.table');

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

// connection.connect((err) => {
//     if (err) throw err;
//     startManaging();
// });


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
startManaging();
/*====================================================================
      COLLECT DB TABLE INFO
======================================================================*/
const collectRole = () => {
    let roleInfo = [];
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        res.forEach(({ id, title }) => {
          roleInfo.push(id);
        });
    });
    return roleInfo;
}

const collectDept = (need) => {
    let deptInfo = [];
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;

        res.forEach(({ id, name }) => {
          if(need == '*'){

          }
            deptInfo.push();
        });
    });
    return deptInfo;
}

const collectEmp = () => {}

/*====================================================================
      ADDING DEPT, ROLES, OR EMPLOYEE PROMPTS
======================================================================*/
let addQuery;

const addDept = () => {
    inquirer.prompt([{
        name: 'id',
        type: 'number',
        message: 'Enter Dept ID:'
    },
    {
        name: 'name',
        type: 'input',
        message: 'Enter Dept. Name:'
    }
]).then((answers) => {
    addQuery = `INSERT INTO department (id, name) VALUES (${answers.id}, "${answers.name}")`;
    // console.log(addQuery);
    connection.query(addQuery, (err) => {
        if (err) throw err; 
        startManaging();
    });
   
})    
}


const addRole = () => {
    inquirer.prompt([{
        name: 'id',
        type: 'number',
        message: 'Enter Role ID:'
    },
    {
        name: 'title',
        type: 'input',
        message: 'Enter Role Title:'
    },
    {
        name: 'salary',
        type: 'input',
        message: 'Enter Role Salary:'
    },
    {
        name: 'deptId',
        type: 'list',
        message: 'Which dept. id is this role associated?',
        choices: collectDept()
    }
]).then((answers) => {
    addQuery = `INSERT INTO role (id, title, salary, department_id) VALUES (${answers.id}, "${answers.title}", ${answers.salary}, "${answers.deptId}")`;
    // console.log(addQuery);
    connection.query(addQuery, (err) => {
        if (err) throw err;
        startManaging();
    });
    
});  
}

const addEmployee = () => {
    inquirer.prompt([{
        name: 'id',
        type: 'number',
        message: 'Enter Employee ID:'
    },
    {
        name: 'first',
        type: 'input',
        message: 'Enter Employee First Name:'
    },
    {
        name: 'last',
        type: 'input',
        message: 'Enter Employee Last Name:'
    },
    {
        name: 'haveManager',
        type: 'confirm',
        message: 'Does this employee have a manager?',
    },
    {
        name: 'manId',
        type: 'input',
        message: "Enter Manager's Employee Id:"
    },
    {
        name: 'roleId',
        type: 'list',
        message: 'Choose corresponding Role Id:',
        choices: collectRole()
    }
]).then((answers) => {
    let manager = null;
    if(answers.haveManager){
        manager = `${answers.manId}`;
    }
    addQuery = `INSERT INTO employee (id, first_name, last_name, manager_id, role_id) VALUES (${answers.id}, "${answers.first}", "${answers.last}", ${manager}, ${answers.roleId})`;
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
let viewQuery = [];

const viewDept = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        res.forEach(({id, name}) => {
            viewQuery.push([`${id}`, `${name}`]);
        })
        console.table(['id', 'name'], viewQuery);
        
    })
}


/*====================================================================
      UPDATE EMPLOYEE ROLE PROMPTS
======================================================================*/

const updateEmpRole = () => {

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