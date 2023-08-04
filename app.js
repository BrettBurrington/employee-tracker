const inquirer = require('inquirer');
const { connectToDB, queryDatabase, closeConnection } = require('./db');

// Function to view all departments
async function viewDepartments() {
  try {
    // Fetch all departments from the database
    const departments = await queryDatabase('SELECT * FROM department');

    // Display departments in a tabular format using console.table
    console.table(departments);
  } catch (error) {
    // If an error occurs during the database query, handle and display the error message
    console.error('Error:', error.message);
  }
}

// Function to view all roles
async function viewRoles() {
  try {
    // Fetch all roles from the database
    const roles = await queryDatabase('SELECT * FROM role');

    // Display roles in a tabular format using console.table
    console.table(roles);
  } catch (error) {
    // If an error occurs during the database query, handle and display the error message
    console.error('Error:', error.message);
  }
}

// Function to view all employees
async function viewEmployees() {
  try {
    // Fetch all employees from the database
    const employees = await queryDatabase('SELECT * FROM employee');

    // Display employees in a tabular format using console.table
    console.table(employees);
  } catch (error) {
    // If an error occurs during the database query, handle and display the error message
    console.error('Error:', error.message);
  }
}



// Function to display the main menu and handle user actions
async function showMainMenu() {
  try {
    // Prompt the user with a list of choices using inquirer
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          // List of available actions for the user
          'View all departments',
          'View all roles',
          'View all employees',
          'Exit',
        ],
      },
    ]);

    // Perform the corresponding action based on the user's choice
    switch (answer.action) {
      case 'View all departments':
        // Call the function to view all departments
        await viewDepartments();
        break;
      case 'View all roles':
        // Call the function to view all roles
        await viewRoles();
        break;
      case 'View all employees':
        // Call the function to view all employees
        await viewEmployees();
        break;
      case 'Exit':
        // Exit the application and close the database connection
        console.log('Goodbye!');
        closeConnection();
        break;
      default:
        // If the user enters an invalid choice, display an error message and show the main menu again
        console.log('Invalid choice. Please select a valid option.');
        await showMainMenu();
    }
  } catch (error) {
    // If any unexpected error occurs during the main menu interaction, handle and display the error message
    console.error('Error:', error.message);
    closeConnection(); // Close the database connection when an error occurs
  }
}

// Main function to start the application
async function main() {
  console.log('Connecting to the database...');
  await connectToDB(); // Connect to the database

  console.log('Welcome to the Employee Tracker App!');
  await showMainMenu(); // Show the main menu and handle user actions
}

// Call the main function to start the application
main();

// Export any necessary functions (list of exported functions remains unchanged)
