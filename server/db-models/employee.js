/**
 * Title: employee.js
 * Author: Professor Krasso
 * Date: 28 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: sets requirements to be set upon the initialization of every employee object
 */

const mongoose = require('mongoose');
const Item = require("./item");
//restricts each object to contain a empId, and todo and done objects
let employeeSchema = mongoose.Schema({
    empId: { type: String, unique: true  },
    todo: [Item],
    done: [Item]
}, {collection: "employees"} ) ;


module.exports = mongoose.model("Employee", employeeSchema);
