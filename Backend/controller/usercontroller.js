const Data = require('../models/users');
const employeesData = require('../models/employees');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config({path:'../config/.env'});
const {validationResult } = require('express-validator');

//Home page routes
const basicroute = (req, res) =>{
try{
res.status(400).send({message:"Hello Vikas Kumar"})
}
catch(err){
res.status(401).send(err);
}
}



//Registration routes
const registerRoute = (req, res)=>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
const { email, password } = req.body;

Data.findOne({email: email}, (err, userValue)=>{
if(userValue){
res.status(201).send({message:"Email is already exist"});
}else{
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;
const checkbox = req.body.checkbox;
const gender = req.body.gender;

const newUserData = {
        name,
        email,
		password,
		checkbox,
		gender,
      
    }
const userData = new Data(newUserData);
const token = jwt.sign(
      { value_id: userData._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
userData.token = token;
const salt = bcrypt.genSaltSync(10)
userData.password = bcrypt.hashSync(userData.password, salt);
userData.save((err, value)=>{
try{

res.status(200).send({success: true,
                message: "Register successful",
                data: userData})
}catch{
res.status(401).send({success: false,
                message: err.message})
}
})
}
})
}

//Login routes
const loginRoute =  async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
    const {email, password} = req.body;
    Data.findOne({ email: email}, (err, value)=>{
    if (value) {
      // check user password with hashed password stored in the database
      const validPassword = bcrypt.compareSync(password, value.password);
	     const token = jwt.sign(
        { value_id: value._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      value.token = token;

      if (validPassword) {
	  
        res.status(200).json({ success: true,
                message: "login successful",
                data: value});
      } else {
        res.status(401).json({success: false,
		error: "Invalid Password" });
      }
    } else {
      res.status(201).json({success: false, error: "User does not exist" });
    }
	});
  }
 //Get all users routes
const getUserRoutes = (req, res) =>{

Data.find((err, value)=>{
try{
res.status(200).send({
success: true,
message: "fetch data successfully",
data: value
});
}catch(err){
res.status(201).send({
success: false,
message: err
})
}
})
} 
  
  
 //Update users routes  
 
 const updateRoute = (req, res) =>{
 let id = req.params.id;
 Data.findById(id, (err, value)=>{
 if(value){
 value.name = req.body.name;
 value.email = req.body.email;
 value.password = req.body.password;
 value.gender = req.body.gender;
 value.checkbox = req.body.checkbox;
 //value.photo = req.file.filename;
value.save().then((dat)=>{
res.status(200).send({
status:true,
message: "Data is successful Updated",
data:dat
})
 }).catch((err)=>{
 res.status(201).send({
 status: false,
 Message:"Data is not updated",
 error: err
 })
 })
 }else{
 res.send(err);
 }
 })
 }
  
  
const readRoute = (req, res)=>{
 var id = req.params.id;
 Data.findById(id, (err, value)=>{
 if(value){
 res.status(200).send({
 success: true,
 message:"Data find successfull",
 data:value
 })
  }else{
   res.status(201).send({
 success: false,
 message:"Data not find successfull",
 data:err
 })
  }
  })
  }
  
 var deleteRoute = (req, res) =>{
 var id = req.params.id;
 Data.findByIdAndRemove({_id:id}, (err, value)=>{
 try{
 res.status(200).send({
 success:true,
 message: "data is successfull deleted",
 data:value
 });
 }catch{
res.satus(201).send({
 success:false,
 message: "data is not deleted",
 data:err
})
 }
 }
 )
 }  
   
//Employees data create
const employeescreateRoute = (req, res)=>{
const errors = validationResult(req);
if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            });
        }
const {email} = req.body;

employeesData.findOne({email: email}, (err, userValue)=>{
if(userValue){
res.status(201).send({message:"Email is already exist"});
}else{
const name = req.body.name;
const email = req.body.email;
const mobileno = req.body.mobileno;
const designation = req.body.designation;
const gender = req.body.gender;
const course = req.body.course;
const imgupload = req.file.originalname;
const newUserData = {
        name,
        email,
		mobileno,
		designation,
		gender,
		course,
		imgupload
    }
const userData = new employeesData(newUserData);
userData.save((err, value)=>{
try{
res.status(200).send({success: true,
                message: "Employees Data Create Successful",
                data: userData})
}catch{
res.status(401).send({success: false,
                message: err.message})
}
})
}
})
}

 //Get Employeeall users routes
const getEmployeeallRoutes = (req, res) =>{

employeesData.find((err, value)=>{
try{
res.status(200).send({
success: true,
message: "fetch Employee data successfully",
data: value
});
}catch(err){
res.status(201).send({
success: false,
message: err
})
}
})
} 
    
//Employees Data Update routes  
 const updateemployeesRoute = (req, res) =>{
 let id = req.params.id;
 employeesData.findById(id, (err, value)=>{
 if(value){
 value.name = req.body.name;
 value.email = req.body.email;
 value.mobileno = req.body.mobileno;
 value.designation = req.body.designation;
 value.gender = req.body.gender;
 value.course = req.body.course;

value.save().then((dat)=>{
res.status(200).send({
status:true,
message: "Employee Data is successful Updated",
data:dat
})
 }).catch((err)=>{
 res.status(201).send({
 status: false,
 status: false,
 Message:"Data is not updated",
 error: err
 })
 })
 }else{
 res.send(err);
 }
 })
 }
  
//Employees Single Data Read routes    
const employeereadRoute = (req, res)=>{
 var id = req.params.id;
 employeesData.findById(id, (err, value)=>{
 if(value){
 res.status(200).send({
 success: true,
 message:"Employee Data find successfull",
 data:value
 })
  }else{
   res.status(201).send({
 success: false,
 message:"Employee Data not find successfull",
 data:err
 })
  }
  })
  }
  
  //Employees Single Data Delete routes  
 var employeedeleteRoute = (req, res) =>{
 var id = req.params.id;
 employeesData.findByIdAndRemove({_id:id}, (err, value)=>{
 try{
 res.status(200).send({
 success:true,
 message: "Employee data is successfull deleted",
 data:value
 });
 }catch{
res.satus(201).send({
 success:false,
 message: "data is not deleted",
 data:err
})
 }
 }
 )
 }  
 
module.exports = {basicroute,registerRoute, loginRoute,getUserRoutes, updateRoute, readRoute, deleteRoute, employeescreateRoute, getEmployeeallRoutes, updateemployeesRoute,employeereadRoute,employeedeleteRoute}

