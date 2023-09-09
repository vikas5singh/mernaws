const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
name: {
type: String,
require: true
},
email:{
type:String,
require: true
},
mobileno:{
type: Number,
require: true
},
designation: {
type: String,
require: true
},
gender:{
type: String,
require: true
},
course: {
type: String,
require: true
},
imgupload:{
type:String
},
date:{
type:Date,
default: Date.now
}
});
const userData = mongoose.model('EmployeesDetails', employeeSchema);

module.exports = userData;