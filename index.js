const inquirer = require("inquirer");
const db = require("./db");
require("console.table");

start();

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
            value: "VIEW_DEPARTMENTS",
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
            value: "quit"
          }
        ]
      }
    ]).then((data) => {
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
        case "addDepartment":
          addDepartment();
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

// View all roles
function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => loadMainPrompts());
}

// Add a role
function addRole() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        name: "title",
        message: "What is the name of the role?",
      },
      {
        name: "salary",
        message: "What is the salary of the role?",
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department does the role belong to?",
        choices: departmentChoices,
      },
    ]).then((role) => {
      db.createRole(role)
        .then(() => console.log(`Added ${role.title} to the database`))
        .then(() => loadMainPrompts());
    });
  });
}

// View all deparments
function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => loadMainPrompts());
}

// Add a department
function addDepartment() {
  prompt([
    {
      name: "name",
      message: "What is the name of the department?",
    },
  ]).then((res) => {
    let name = res;
    db.createDepartment(name)
      .then(() => console.log(`Added ${name.name} to the database`))
      .then(() => loadMainPrompts());
  });
}

// Add an employee
function addEmployee() {
  prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      name: "last_name",
      message: "What is the employee's last name?",
    },
  ]).then((res) => {
    let firstName = res.first_name;
    let lastName = res.last_name;

    db.findAllRoles().then(([rows]) => {
      let roles = rows;
      const roleChoices = roles.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt({
        type: "list",
        name: "roleId",
        message: "What is the employee's role?",
        choices: roleChoices,
      }).then((res) => {
        let roleId = res.roleId;

        db.findAllEmployees().then(([rows]) => {
          let employees = rows;
          const managerChoices = employees.map(
            ({ id, first_name, last_name }) => ({
              name: `${first_name} ${last_name}`,
              value: id,
            })
          );

          managerChoices.unshift({ name: "None", value: null });

          prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          })
            .then((res) => {
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName,
              };

              db.createEmployee(employee);
            })
            .then(() =>
              console.log(`Added ${firstName} ${lastName} to the database`)
            )
            .then(() => loadMainPrompts());
        });
      });
    });
  });
}

// Exit the application
function quit() {
  console.log("Goodbye!");
  process.exit();
}
