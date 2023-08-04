const inquirer = require('inquirer');
const { connectToDB, queryDatabase, closeConnection } = require('./db');


async function viewDepartments() {
  try {
    const departments = await queryDatabase('SELECT * FROM department');

    
    console.table(departments);
  } catch (error) {

    console.error('Error:', error.message);
  }
}

//
async function viewRoles() {
  try {

    const roles = await queryDatabase('SELECT * FROM role');


    console.table(roles);
  } catch (error) {
   
    console.error('Error:', error.message);
  }
}

async function viewEmployees() {
  try {
   
    const employees = await queryDatabase('SELECT * FROM employee');

    console.table(employees);
  } catch (error) {
    console.error('Error:', error.message);
  }
}



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


async function main() {
  console.log('Connecting to the database...');
  await connectToDB(); 

  console.log('Welcome to the Employee Tracker App!');
  await showMainMenu();
}


main();


module.exports = {

};
