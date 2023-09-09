const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
name: {
type: String,
require: true
},
email:{
type:String,
require: true
},
password:{
type: String,
require: true
},
token: {
type: String 
},
role:{
type: String,
default: 'user',
enum:["user","admin", "superadmin"]
},

checkbox: {
type: String
},
gender:{
type: String
},
photo:{
type:String
},
date:{
type:Date,
default: Date.now

}
});

const userData = mongoose.model('users', userSchema);

module.exports = userData;