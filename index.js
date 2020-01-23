// todo: move init functions to start? am i re-initializing after every action?

const mysql = require('mysql');
const inquirer = require('inquirer');
const sqlqueries = require('./sql');
const cTable = require('console.table');
const config = require('./config/dbpassword.config');

//#region
console.log(`,-----------------------------------------------------.
|                                                     |
|     _____                 _                         |
|    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   |
|    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  |
|    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  |
|    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  |
|                    |_|            |___/             |
|                                                     |
|     __  __                                          |
|    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        |
|    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       |
|    | |  | | (_| | | | | (_| | (_| |  __/ |          |
|    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          |
|                              |___/                  |
|                                                     |
\`-----------------------------------------------------'
`);
//#endregion

let roleList = [];
let roleListObj = {};
// console.log(typeof roleList);
let employeeList = [];
let employeeListObj = {};

function findRoleId(namedKey, objArray) {
  for (var i = 0; i < objArray.length; i++) {
    if (objArray[i].title === namedKey) {
      return objArray[i];
    }
  }
}

function findEmployeeIdToActOn(namedKey, objArray) {
  for (var i = 0; i < objArray.length; i++) {
    if (objArray[i].first_name + ' ' + objArray[i].last_name === namedKey.toString()) {
      return objArray[i].id;
    }
  }
}

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: config.sqlPassword(),
  database: "emsDB"
});

connection.connect(function (err) {
  if (err) throw err;
  // start();
  init();
});

// populate lists
function init() {
  connection.query(sqlqueries.utilGetRoleIdsTitles(), function (err, results) {
    if (err) throw err;
    for (let i = 0; i < results.length; i++) {
      roleList.push(results[i].title);
    }
    roleListObj = results;
  });

  connection.query(sqlqueries.utilGetEmployeeIdsNames(), function (err, results) {
    if (err) throw err;
    employeeList.push('None');
    for (let i = 0; i < results.length; i++) {
      employeeList.push(results[i].first_name + ' ' + results[i].last_name);
    }
    employeeListObj = results;
  });

  start();
}

function start() {
  inquirer
    .prompt({
      name: "userAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "Add Role",
        "Remove Role",
        "Exit"]
    })
    .then(function (answer) {
      if (answer.userAction === "View All Employees") {
        viewAllEmployees();
      }
      else if (answer.userAction === "View All Employees By Department") {
        viewAllEmployeesByDepartment();
      }
      else if (answer.userAction === "View All Employees By Manager") {
        viewAllEmployeesByManager();
      }
      else if (answer.userAction === "Add Employee") {
        addEmployee();
      }
      else if (answer.userAction === "Remove Employee") {
        removeEmployee();
      }
      else if (answer.userAction === "Update Employee Role") {
        updateEmployeeRole();
      }
      else if (answer.userAction === "Update Employee Manager") {
        updateEmployeeManager();
      }
      else if (answer.userAction === "View All Roles") {
        viewAllRoles();
      }
      else if (answer.userAction === "Add Role") {
        addRole();
      }
      else if (answer.userAction === "Remove Role") {
        removeRole();
      }
      else {
        connection.end();
      }
    });
}

function viewAllEmployees() {
  connection.query(sqlqueries.viewAllEmployees(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewAllEmployeesByDepartment() {
  connection.query(sqlqueries.viewAllEmployeesByDepartment(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function viewAllEmployeesByManager() {
  connection.query(sqlqueries.viewAllEmployeesByManager(), function (err, results) {
    if (err) throw err;
    console.table(results);
    start();
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      message: "What is the employee's first name?",
      name: "newFirstName",
      validate: function validateFirstName(name) {
        return name !== '';
      },
      type: "input",

    },
    {
      message: "What is the employee's last name?",
      name: "newLastName",
      validate: function validateLastName(name) {
        return name !== '';
      },
      type: "input"
    },
    {
      message: "What is the employee's role?",
      name: "newRole",
      type: "list",
      choices: function () {
        var choiceArray = [];
        for (var key in roleListObj) {
          choiceArray.push(roleListObj[key].title);
        }
        return choiceArray;
      }
    },
    {
      message: "Who is the employee's manager?",
      name: "newManager",
      type: "list",
      choices: employeeList
    }
  ]).then(function (answer) {

    var newRoleId = findRoleId(answer.newRole, roleListObj).id;

    var newManagerId = (findEmployeeIdToActOn(answer.newManager, employeeListObj)) ? findEmployeeIdToActOn(answer.newManager, employeeListObj) : null;

    connection.query(sqlqueries.addEmployee(answer.newFirstName, answer.newLastName, newRoleId, newManagerId), function (err, results) {
      if (err) throw err;
      console.log('Added ' + answer.newFirstName + ' ' + answer.newLastName + ' to the database.')
      init();
    });

  });

}

function removeEmployee() {
  inquirer.prompt({
    message: "Which employee do you want to remove?",
    name: "employeeName",
    type: "list",
    choices: employeeList
  }).then(function (answer) {
    if (answer.employeeName === 'None') {
      start();
    } else {
      var employeeIdToRemove = (findEmployeeIdToActOn(answer.employeeName, employeeListObj)) ? findEmployeeIdToActOn(answer.employeeName, employeeListObj) : null;
      connection.query(sqlqueries.removeEmployee(employeeIdToRemove), function (err, results) {
        if (err) throw err;
        console.log(answer.employeeName + ' removed from the database.')
        init();
      });
    }
  });
}

function updateEmployeeRole() {
  console.log('updateEmployeeRole');
  //run query
}

function updateEmployeeManager() {
  console.log('updateEmployeeManager');
  //run query
}

function viewAllRoles() {
  console.log('viewAllRoles');
  //run query
}

function addRole() {
  console.log('addRole');
  //run query
}

function removeRole() {
  console.log('removeRole');
  //run query
}

// =======================
// todo: remove code below
// =======================
// todo: remove
function postAuction() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to submit?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your auction in?"
      },
      {
        name: "startingBid",
        type: "input",
        message: "What would you like your starting bid to be?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO auctions SET ?",
        {
          item_name: answer.item,
          category: answer.category,
          starting_bid: answer.startingBid || 0,
          highest_bid: answer.startingBid || 0
        },
        function (err) {
          if (err) throw err;
          console.log("Your auction was created successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}

// todo: remove
function bidAuction() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM auctions", function (err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].item_name);
            }
            return choiceArray;
          },
          message: "What auction would you like to place a bid in?"
        },
        {
          name: "bid",
          type: "input",
          message: "How much would you like to bid?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if bid was high enough
        if (chosenItem.highest_bid < parseInt(answer.bid)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
              {
                highest_bid: answer.bid
              },
              {
                id: chosenItem.id
              }
            ],
            function (error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}
