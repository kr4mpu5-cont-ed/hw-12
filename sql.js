// todo: remove * You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor const or a class be helpful for organizing these?

const viewAllEmployees = () => {
    return `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY e.id ASC;`;
};

const viewAllEmployeesByDepartment = () => {
    return `SELECT d.name AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY d.name;`;
};

const viewAllEmployeesByManager = () => {
    return `SELECT IFNULL(CONCAT(m.first_name, ' ', m.last_name), '-self-') AS 'Manager', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name, r.title, d.name, r.salary
            FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY m.first_name ASC;`;
};

const addEmployee = (first, last, roleid, managerid) => {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first}', '${last}', ${roleid}, ${managerid});`;
};

const removeEmployee = (employeeid) => {
    return `DELETE FROM employee where id = ${employeeid};`;
};

const updateEmployeeRole = () => {

};

const updateEmployeeManager = () => {

};

const viewAllRoles = () => {
    return `SELECT title
            FROM role
            ORDER BY title ASC;`;
};

const addRole = () => {

};

const removeRole = () => {

};

const utilGetEmployeeIdsNames = () => {
    return `SELECT e.id, e.first_name, e.last_name
            FROM employee e
            ORDER BY e.first_name ASC;`;
};

const utilGetRoleIdsTitles = () => {
    return `SELECT r.id, r.title
        FROM role r
        ORDER BY r.title ASC;`;
};


exports.viewAllEmployees = viewAllEmployees;
exports.viewAllEmployeesByDepartment = viewAllEmployeesByDepartment;
exports.viewAllEmployeesByManager = viewAllEmployeesByManager;
exports.addEmployee = addEmployee;
exports.removeEmployee = removeEmployee;
exports.updateEmployeeRole = updateEmployeeRole;
exports.updateEmployeeManager = updateEmployeeManager;
exports.viewAllRoles = viewAllRoles;
exports.addRole = addRole;
exports.removeRole = removeRole;

exports.utilGetEmployeeIdsNames = utilGetEmployeeIdsNames;
exports.utilGetRoleIdsTitles = utilGetRoleIdsTitles;