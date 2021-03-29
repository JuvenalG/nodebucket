/**
 * Title: item.js
 * Author: Professor Krasso
 * Date: 28 March 2021
 * Modified By: Juvenal Gonzalez
 * Description: specifies what each item object is to contain upon initialization
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//two data fields are required when each item object is generated
let itemsSchema = new Schema ({
   title: { type: String },
   description: { type: String }
});

module.exports = itemsSchema;
