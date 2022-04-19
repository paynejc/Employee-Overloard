const inquirer = require('inquirer');
require('console.table');
const db = require('./db');
function start(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'menu',
            message: 'What would you like to do?',
            choices: [
                {
                    name:'view all deparments',
                    value:'viewDeparments'
                },
                {
                    name: 'view all roles',
                    value:'viewRoles'
                },
                {
                    name:'quit',
                    value: 'quit'
                }
            ]
        }
    ])
    .then(data => {
        switch(data.menu){
            case 'viewDepartments':
                viewDepartments();
                break;
            case 'viewRoles':
                    viewRoles();
                    break;
            default:
                quit();
        }
    })
}

function viewDepartments() {
    db.findDepartments()
        .then(([departments]) => {
            console.table(departments)
        })
        .then(() => start())
}

function viewRoles () {}

function quit(){
    process.exit();
}

start();