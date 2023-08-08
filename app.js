const inquirer = require('inquirer');
const { connectToDB, queryDatabase, closeConnection } = require('./db');

// Function to view all departments
async function viewDepartments() {
  try {
    const departments = await queryDatabase('SELECT * FROM department');
    console.table(departments);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to view all roles
async function viewRoles() {
  try {
    const roles = await queryDatabase('SELECT * FROM role');
    console.table(roles);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to view all employees
async function viewEmployees() {
  try {
    const employees = await queryDatabase('SELECT * FROM employee');
    console.table(employees);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to add a new role
async function addRole() {
  try {
    const roleDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Enter the role title:',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'Enter the role salary:',
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID for the role:',
      },
    ]);

    // Insert the new role into the database
    await queryDatabase(
      'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
      [roleDetails.title, roleDetails.salary, roleDetails.department_id]
    );

    console.log('New role added successfully!');
    await viewRoles(); // Show updated roles after adding
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Function to add a new employee
async function addEmployee() {
  try {
    const employeeDetails = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the employee\'s first name:',
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the employee\'s last name:',
      },
      // ... Prompt for other employee details like role ID and manager ID
    ]);

    // Insert the new employee into the database
    await queryDatabase(
      'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
      [employeeDetails.first_name, employeeDetails.last_name, role_id, manager_id]
    );

    console.log('New employee added successfully!');
    await viewEmployees(); // Show updated employees after adding
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// ... (other functions like updateEmployeeRole and addDepartment can be added similarly)

// Function to display the main menu and handle user actions
async function showMainMenu() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'Add a role',
          'Add an employee', // Added "Add an employee" option to the main menu
          'Exit',
        ],
      },
    ]);

    switch (answer.action) {
      // ... (other cases)
      case 'Add an employee':
        await addEmployee(); // Call the addEmployee() function
        break;
      // ... (other cases)
    }
  } catch (error) {
    console.error('Error:', error.message);
    closeConnection();
  }
}

async function main() {
  console.log('Working...');
  await connectToDB();

  console.log('Welcome to Employee Tracker ');
  await showMainMenu();
}

main();
