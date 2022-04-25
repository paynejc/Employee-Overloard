const inquirer = require("inquirer");
require("console.table");
const db = require("./db");
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Deparments",
            value: "viewDeparments",
          },
          {
            name: "View All Employees",
            value: "viewEmployees",
          },
          {
            name: "View All Roles",
            value: "viewRoles",
          },
          {
            name: "Update Employee",
            value: "updateEmployee",
          },
          {
            name: "Add Employee",
            value: "addEmployee",
          },
          {
            name: "Add Role",
            value: "addRole",
          },
          {
            name: "Quit",
            value: "quit",
          },
        ],
      },
    ])
    .then((data) => {
      switch (data.menu) {
        case "viewDepartments":
          viewDepartments();
          break;
        case "viewEmployees":
          viewEmployees();
          break;
        case "viewRoles":
          viewRoles();
          break;
        case "updateEmployee":
          updateEmployee();
          break;
        case "addEmployee":
          addEmployee();
          break;
        case "addRole":
          addRole();
          break;
        default:
          quit();
      }
    });
}

function viewDepartments() {
  db.findDepartments()
    .then(([departments]) => {
      console.table(departments);
    })
    .then(() => start());
}

function viewRoles() {}

function quit() {
  process.exit();
}

start();
