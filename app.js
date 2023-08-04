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
    // Prompt the user to enter role details
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
  } catch (error) {
    console.error('Error:', error.message);
  }
}

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
          'Add a role', // Added the "Add a role" option to the main menu
          'Exit',
        ],
      },
    ]);

    switch (answer.action) {
      case 'View all departments':
        await viewDepartments();
        break;
      case 'View all roles':
        await viewRoles();
        break;
      case 'View all employees':
        await viewEmployees();
        break;
      case 'Add a role': // When user selects "Add a role", call the addRole() function
        await addRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        closeConnection();
        break;
      default:
        console.log('Invalid choice. Please select a valid option.');
        await showMainMenu();
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
