// todo: Could a constructor const or a class be helpful for organizing these?

const viewEmployees = () => {
    return `SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name, r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY e.id ASC;`;
};

const viewEmployeesByManager = () => {
    return `SELECT IFNULL(CONCAT(m.first_name, ' ', m.last_name), '-self-') AS 'Manager', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', d.name, r.title, d.name, r.salary
            FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY m.first_name ASC;`;
};

const viewEmployeesByDepartment = () => {
    return `SELECT d.name AS 'Department', CONCAT(e.first_name, ' ', e.last_name) AS 'Employee', r.title, d.name, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
            FROM employee e
                LEFT JOIN employee m ON m.id = e.manager_id
                JOIN Role r ON e.role_id = r.id
                JOIN Department d ON d.id = r.department_id
            ORDER BY d.name;`;
};

const viewDepartments = () => {
    return `SELECT name AS 'Department Name'
            FROM department
            ORDER BY name ASC;`;
};

const viewRoles = () => {
    return `SELECT title AS Role
            FROM role
            ORDER BY title ASC;`;
};

const viewDepartmentBudgets = () => {
    return `not implemented`;
};

const addEmployee = (first, last, roleid, managerid) => {
    return `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first}', '${last}', ${roleid}, ${managerid});`;
};

const addDepartment = () => {
    return `not implemented`;
};

const addRole = () => {
    return `not implemented`;
};

const updateEmployeeRole = () => {
    return `not implemented`;
};

const updateEmployeeManager = () => {
    return `not implemented`;
};

const removeEmployee = (employeeid) => {
    return `DELETE FROM employee where id = ${employeeid};`;
};

const removeDepartment = () => {
    return `not implemented`;
};

const removeRole = () => {
    return `not implemented`;
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

exports.viewEmployees = viewEmployees;
exports.viewEmployeesByManager = viewEmployeesByManager;
exports.viewEmployeesByDepartment = viewEmployeesByDepartment;
exports.viewDepartments = viewDepartments;
exports.viewRoles = viewRoles;
exports.viewDepartmentBudgets = viewDepartmentBudgets;

exports.addEmployee = addEmployee;
exports.addDepartment = addDepartment;
exports.addRole = addRole;

exports.updateEmployeeRole = updateEmployeeRole;
exports.updateEmployeeManager = updateEmployeeManager;

exports.removeEmployee = removeEmployee;
exports.removeDepartment = removeDepartment;
exports.removeRole = removeRole;

exports.utilGetEmployeeIdsNames = utilGetEmployeeIdsNames;
exports.utilGetRoleIdsTitles = utilGetRoleIdsTitles;
