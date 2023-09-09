import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Register = () =>{
const navigate = useNavigate();

const [data, setData] = useState({
name:"",
email:"",
password:"",
gender:"",
photo:"",
checkbox:""
});
console.log(data);
const [msg, setMsg] = useState();
const handleChange = (e)=>{
setData({...data, [e.target.name]:e.target.value})
}
  const getPjl = (e) => {
	 var array = []
     var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
	for (var i = 0; i < checkboxes.length; i++) {
	array.push(checkboxes[i].value)
	}
	setData({...data, [e.target.name]:array})
	console.log(array);
  }
  
  const handlePhoto = (e) => {
        setData({...data, photo: e.target.files[0]});
    }
 const handleSubmit = async (e) => {
        e.preventDefault();
		const formData = new FormData();
		formData.append('photo', data.photo);
		formData.append('name', data.name);
		formData.append('email', data.email);
		formData.append('password', data.password);
		formData.append('checkbox', data.checkbox);
		formData.append('gender', data.gender);
            await axios.post('http://localhost:4000/api/register',formData,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
} ).then((res)=>{
			console.log(res.status);
			 setMsg(res.data.message);
			 localStorage.setItem('login', true);
			
        }).catch((err)=>{
           console.log(err);
        })
    }
return(
<div className="container">
<div className="registerForm">
<h2>{msg}</h2>
<div className="textHeading">
<h2>Registration Form</h2>
</div>
<div className="form">
<form encType='multipart/form-data'>
<div className="form-group">
<label className="labelControl">Name</label>
<input type="text" className="formControl" name="name" onChange={handleChange} value={data.name}/>
</div>
<div className="form-group">
<label className="labelControl">Email</label>
<input type="email" className="formControl" name="email" onChange={handleChange} value={data.email} />
</div>
<div className="form-group">
<label className="labelControl">Password</label>
<input type="password" className="formControl" name="password" onChange={handleChange} value={data.password}/>
</div>
<div className="form-group">
<label className="labelControl">Photo</label>
<input type="file" name="photo" onChange={handlePhoto} />
</div>
<div className="form-group">
<label className="labelControl">Gender</label>
<input type="radio" className="formControl" name="gender" onChange={handleChange} value="male"/>Male
<input type="radio" className="formControl" name="gender" onChange={handleChange} value="female"/>Female
</div>
<div className="form-check">
<label className="form-check-label">
  <input type="checkbox"
    name="checkbox"
	value="isApple"
	onChange={getPjl}
	className="form-check-input"
  />
  Apple
</label>
</div>
<div className="form-check">
<label className="form-check-label">
  <input type="checkbox"
    name="checkbox"
	value="isAvocado"
	onChange={getPjl}
	className="form-check-input"
  />
  Avocado
</label>
</div>
<div className="form-check">
<label className="form-check-label">
  <input type="checkbox"
    name="checkbox"
	value="isBanana"
	onChange={getPjl}
	className="form-check-input"
  />
  Banana
</label>
</div>
<div className="form-check">
<label className="form-check-label">
  <input type="checkbox"
    name="checkbox"
	value="isCherry"
	onChange={getPjl}
	className="form-check-input"
  />
  Cherry
</label>
</div>
<div className="form-check">
<label className="form-check-label">
  <input type="checkbox"
  name="checkbox"
	value="isOrange"
	onChange={getPjl}
	className="form-check-input"
  />
  Orange
</label>
</div>
<div className="form-button">
<button type="submit" className="btn, btn-primary" onClick={handleSubmit}>Submit</button>
</div>
</form>
</div>
</div>
</div>
)
}

export default Register;