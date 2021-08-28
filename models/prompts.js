const inquirer = require('inquirer');
const {collectDeptId, collectRole} = require('../index');

/*====================================
    MAIN PROMPTS
====================================*/




/*=================================
    ADDING PROMPTS
====================================*/
const addDeptP = [
    {
        name: 'id',
        type: 'input',
        message: 'Enter Dept. Id:'
    },
{
    name: 'name',
    type: 'input',
    message: 'Enter Dept. Name:'
}
];

const addRoleP = [
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
    type: 'input',
    message: 'Roles Dept Id:',
}
];

const addEmpP = [
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
    type: 'input',
    message: 'Enter Role Id:',
}
];

/*=================================
    VIEWING PROMPTS
====================================*/

module.exports = {addRoleP, addEmpP, addDeptP}
    