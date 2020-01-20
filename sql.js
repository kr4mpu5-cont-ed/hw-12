// * You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?

// remove
// -- source file: user.js --
// const getName = () => {
//   return 'Jim';
// };

// exports.getName = getName;
// --

// -- calling file: index.js --
// const user = require('./user');
// console.log(`User: ${user.getName()}`);
// --
// end remove


// RETRIEVE ALL DATA
const getAllTableData = () => {
    return `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM Employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY e.id ASC;`;
};

//  viewAllEmployeesByDepartment
const viewAllEmployeesByDepartment = () => {
    return `SELECT d.name AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM Employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY d.name;`;
};

// viewAllEmployeesByManager
const viewAllEmployeesByManager = () => {
    return `SELECT IFNULL(CONCAT(m.first_name, ' ', m.last_name), '-self-') AS 'Manager', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name, r.title, d.name, r.salary
            FROM Employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY m.first_name ASC;`;
};

exports.getAllTableData = getAllTableData;
exports.viewAllEmployeesByDepartment = viewAllEmployeesByDepartment;
exports.viewAllEmployeesByManager = viewAllEmployeesByManager;