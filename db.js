// db.js

// Import the 'mysql2' module to connect to the MySQL database
const mysql = require('mysql2');

// MySQL database configuration
const connection = mysql.createConnection({
  host: 'localhost',         // MySQL database host
  user: 'root',              // MySQL database username
  password: 'password',      // MySQL database password
  database: 'employee_tracker_db', // Name of the database you want to connect to
});

// Function to connect to the database
function connectToDB() {
  return new Promise((resolve, reject) => {
    // Connect to the MySQL database using the provided configuration
    connection.connect((err) => {
      if (err) {
        // If an error occurs during the connection, reject the promise with the error
        reject(err);
      } else {
        // If the connection is successful, log a success message and resolve the promise
        console.log('Connected to the database!');
        resolve();
      }
    });
  });
}

// Function to perform a single SQL query
function queryDatabase(sqlQuery, values = []) {
  return new Promise((resolve, reject) => {
    // Execute the SQL query on the database using the provided values (if any)
    connection.query(sqlQuery, values, (err, results) => {
      if (err) {
        // If an error occurs during the query, reject the promise with the error
        reject(err);
      } else {
        // If the query is successful, resolve the promise with the results
        resolve(results);
      }
    });
  });
}

// Function to close the database connection
function closeConnection() {
  // End the MySQL connection
  connection.end();
  console.log('Database connection closed!');
}

// Export the necessary functions to be used in other files
module.exports = { connectToDB, queryDatabase, closeConnection };
