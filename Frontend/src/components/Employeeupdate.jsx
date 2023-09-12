import React,{useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import validator from 'validator';
const Employeeupdate = ()=>{
const [nameError, setNameError] = useState('');
const [emailError, setEmailError] = useState('');
const [mobilenoError, setMobilenoError] = useState('');
const [designationError, setDesignationError] = useState('');
const [genderError, setGenderError] = useState('');
const [courseError, setCourseError] = useState('');
const [imguploadError, setImguploadError] = useState('');
const { id } = useParams();
const [employee, setemployee]= useState({
name:'',
email:'',
mobileno:'',
designation:'',
gender:'',
course:'',
imgupload:'' 
});
console.log(employee);
const navigate = useNavigate();

const GetData = async () => {  
const result = await axios.get(`http://13.232.135.93:4000/api/reademployee/${id}`); 
setemployee(result.data.data);  
};

useEffect(() => {    
GetData();  
}, []);  

const handlePhoto = (e) => {

        setemployee({...employee, imgupload: e.target.files[0]});
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
		var name = employee.name;
		if (!validator.isEmpty(name)) {
		  setNameError('');
		} else {
		  setNameError('Enter valid Name!');
		}
		var email = employee.email;
		if (validator.isEmail(email)) {
		  setEmailError('');
		} else {
		  setEmailError('Enter valid Email!');
		}
		 var mobileno = employee.mobileno;
		if (validator.isNumeric(mobileno)) {
		  setMobilenoError('');
		} else {
		  setMobilenoError('Enter valid Mobile No!');
		}
		 var designation = employee.designation;
		if (!validator.isEmpty(designation)) {
		  setDesignationError('');
		} else {
		  setDesignationError('Select Designation!');
		}
		var gender = employee.gender;
		if (!validator.isEmpty(gender)) {
		  setGenderError('');
		} else {
		  setGenderError('Select Gender!');
		}
		var course = employee.course;
		if (!validator.isEmpty(course)) {
		  setCourseError('');
		} else {
		  setCourseError('Select Course!');
		}
		
		 var imgupload = employee.imgupload;
		if (!validator.isEmpty(imgupload)) {
		  setImguploadError('');
		} else {
		  setImguploadError('Choose your image!');
		}
		formData.append('name', employee.name);
		formData.append('email', employee.email);
		formData.append('password', employee.mobileno);
		formData.append('checkbox', employee.designation);
		formData.append('gender', employee.gender);
		formData.append('gender', employee.course);
		formData.append('imgupload', employee.imgupload);
            await axios.put(`http://13.232.135.93:4000/api/employeeupdate/${id}`,formData,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
} ).then((res)=>{
			console.log(res.status);
			navigate('/employeeslist')
        }).catch((err)=>{
           console.log(err);
        })
    }
	
const handleChange = (e) => {  
e.persist();  
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
setemployee({...employee, [e.target.name]: e.target.value});  

}  	


return(
<div className="container">
<div className ="section-area">
<div className="heading">
<h2>Update User</h2>
</div>
<div className="form">
<form encType='multipart/form-data'>
<div className="form-group">
<label className="labelControl">Name -:</label>
<input className="formControl"  type="text" name="name" id="name" value={employee.name} onChange={handleChange}  />
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{nameError}</span>
</div>
<div className="form-group">
<label className="labelControl">Email  -: </label>
<input className="formControl"  type="email" name="email" id="email" onChange={handleChange} value={employee.email} />
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{emailError}</span>
</div>
<div className="form-group">
<label className="labelControl">Phone-:</label>
<input type="number" className="formControl" name="mobileno" id="mobileno" onChange={handleChange} value={employee.mobileno}/>
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{mobilenoError}</span>
</div>
<div className="form-group">
<label className="labelControl">Designation</label>
<select className="formControl seldrop" value={employee.designation} name="designation" onChange={handleChange} id="designation">
<option value="hr">HR</option>
<option value="manager">Manager</option>
<option value="sales">Slaes</option>
</select>
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{designationError}</span>
</div>
<div className="form-group roddiob">
<label className="labelControl">Gender</label>
<input type="radio" className="gender roddioinp" name="gender" value="male" id="gender" checked={employee.gender === 'male'} onChange={handleChange} />Male <span></span> 
<input type="radio" className="gender roddioinp" name="gender"  value="female" checked={employee.gender === 'female'} onChange={handleChange}  />Female
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{genderError}</span>
</div>
<div className="form-group roddiob">
<label className="labelControl">Course</label>
<input type="radio" className="course roddioinp" name="course" onChange={handleChange} id="course" value="mca" checked={employee.course === 'mca'}/>MCA <span></span> 
<input type="radio" className="course roddioinp" name="course" onChange={handleChange} value="bca" checked={employee.course === 'bca'}/>BCA <span></span> 
<input type="radio" className="course roddioinp" name="course" onChange={handleChange} value="bsc" checked={employee.course === 'bsc'}/>BSC
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{courseError}</span>
</div>
<div className="form-group imgfile">
<label className="labelControl">Image -:</label>
<img src={"http://localhost:4000/images/"+employee.imgupload } width="60" height="60" />
<input type="file" name="imgupload" onChange={handlePhoto} className="formControl fileinp" id="imgupload" />
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{imguploadError}</span>
</div>
<div className="form-button">
<button className="btn btn-primary" type="submit" onClick={handleSubmit} >Update</button>
</div>
</form>
</div>
</div>
</div>
);
}

export default Employeeupdate;