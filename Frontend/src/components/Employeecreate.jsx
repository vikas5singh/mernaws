import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import validator from 'validator';
const Employeecreate = () =>{
const navigate = useNavigate();
const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [mobilenoError, setMobilenoError] = useState('');
const [designationError, setDesignationError] = useState('');
const [genderError, setGenderError] = useState('');
const [courseError, setCourseError] = useState('');
const [imguploadError, setImguploadError] = useState('');
const [data, setData] = useState({
name:"",
email:"",
mobileno:"",
designation:"",
gender:"",
course:"",
imgupload:""

});
console.log(data);
const [msg, setMsg] = useState();

const handleChange = (e)=>{
   var name = document.getElementById('name').value;
		if (!validator.isEmpty(name)) {
		  setNameError('');
		} else {
		  setNameError('Enter valid Name!');
		}
   var email = document.getElementById('email').value;
    if (validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!');
    }
	 var mobileno = document.getElementById('mobileno').value;
    if (validator.isNumeric(mobileno)) {
      setMobilenoError('');
    } else {
      setMobilenoError('Enter valid Mobile No!');
    }
	 var designation = document.getElementById('designation').value;
    if (!validator.isEmpty(designation)) {
      setDesignationError('');
    } else {
      setDesignationError('Select Designation!');
    }
	 var gender = document.getElementById('gender').value;
    if (!validator.isEmpty(gender)) {
      setGenderError('');
    } else {
      setGenderError('Select Gender!');
    }
	var course = document.getElementById('course').value;
	if (!validator.isEmpty(course)) {
		  setCourseError('');
		} else {
		  setCourseError('Select Course!');
		}
setData({...data, [e.target.name]:e.target.value});
}
 
  const handlePhoto = (e) => {
        setData({...data, imgupload: e.target.files[0]});
		 var imgupload = document.getElementById('imgupload').value;
		if (!validator.isEmpty(imgupload)) {
		  setImguploadError('');
		} else {
		  setImguploadError('Choose your image!');
		}
    }
 const handleSubmit = async (e) => {
        e.preventDefault();
		const formData = new FormData();
		var name = data.name;
		if (!validator.isEmpty(name)) {
		  setNameError('');
		} else {
		  setNameError('Enter valid Name!');
		}
		var email = data.email;
		if (validator.isEmail(email)) {
		  setEmailError('');
		} else {
		  setEmailError('Enter valid Email!');
		}
		 var mobileno = data.mobileno;
		if (validator.isNumeric(mobileno)) {
		  setMobilenoError('');
		} else {
		  setMobilenoError('Enter valid Mobile No!');
		}
		 var designation = data.designation;
		if (!validator.isEmpty(designation)) {
		  setDesignationError('');
		} else {
		  setDesignationError('Select Designation!');
		}
		var gender = data.gender;
		if (!validator.isEmpty(gender)) {
		  setGenderError('');
		} else {
		  setGenderError('Select Gender!');
		}
		var course = data.course;
		if (!validator.isEmpty(course)) {
		  setCourseError('');
		} else {
		  setCourseError('Select Course!');
		}
		
		 var imgupload = data.imgupload;
		if (!validator.isEmpty(imgupload)) {
		  setImguploadError('');
		} else {
		  setImguploadError('Choose your image!');
		}
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('mobileno', data.mobileno);
		formData.append('designation', data.designation);
		formData.append('gender', data.gender);
		formData.append('course', data.course);
		formData.append('imgupload', data.imgupload);
            await axios.post('http://13.232.135.93:4000/api/createemployees',formData,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
} ).then((res)=>{
			console.log(res.status);
			 setMsg(res.data.message);		
        }).catch((err)=>{
           console.log(err);
        })
    }
return(
<div className="container">
<div className="registerForm">
<h2>{msg}</h2>
<div className="textHeading">
<h2>Create Employees Form</h2>
</div>
<div className="form">
<form encType='multipart/form-data'>
<div className="form-group">
<label className="labelControl">Name-:</label>
<input type="text" className="formControl" name="name" id="name" onChange={handleChange} value={data.name}/>
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{nameError}</span>
</div>

<div className="form-group">
<label className="labelControl">Email   -:</label>
<input type="email" className="formControl" name="email" id="email" onChange={handleChange} value={data.email} />
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{emailError}</span>
</div>
<div className="form-group">
<label className="labelControl">Phone-:</label>
<input type="number" className="formControl" name="mobileno" id="mobileno" onChange={handleChange} value={data.mobileno}/>
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{mobilenoError}</span>
</div>

<div className="form-group">
<label className="labelControl">Designation</label>
<select className="formControl seldrop" name="designation" onChange={handleChange} id="designation">
<option value="hr">HR</option>
<option value="manager">Manager</option>
<option value="sales">Slaes</option>
</select>
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{designationError}</span>
</div>

<div className="form-group roddiob">
<label className="labelControl">Gender</label>
<input type="radio" className="gender roddioinp" name="gender" id="gender" onChange={handleChange} value="male"/>Male     <span></span> 
<input type="radio" className="gebder roddioinp" name="gender" onChange={handleChange} value="female"/>Female
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{genderError}</span>
</div>

<div className="form-group roddiob">
<label className="labelControl">Course</label>
<input type="radio" className="course roddioinp" name="course" id="course" onChange={handleChange} value="mca"/>MCA     <span></span> 
<input type="radio" className="course roddioinp" name="course" onChange={handleChange} value="bca"/>BCA     <span></span> 
<input type="radio" className="course roddioinp" name="course" onChange={handleChange} value="bsc"/>BSC
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{courseError}</span>
</div>

<div className="form-group imgfile">
<label className="labelControl">Image-:</label>
<input type="file" name="imgupload" className="formControl fileinp" onChange={handlePhoto} id="imgupload" />
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{imguploadError}</span>
</div>

<div className="form-button">
<button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</div>
</form>
</div>
</div>
</div>
)
}

export default Employeecreate;