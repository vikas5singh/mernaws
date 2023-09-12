import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import validator from 'validator';
const Home = () =>{
const [msg, msgSet] = useState();
console.log(msg);
const [passwordError, setPasswordError] = useState('');
const [emailError, setEmailError] = useState('');
const navigate = useNavigate();
const [data, setData] = useState({
email:"",
password:""
});

const handleChange = (e)=>{
var password = document.getElementById('password').value;
		if (!validator.isEmpty(password)) {
		  setPasswordError('');
		} else {
		  setPasswordError('Enter Password!');
		}
   var email = document.getElementById('email').value;
    if (validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!');
    }
setData({...data, [e.target.name]:e.target.value})
}

const handleClick = (e)=>{
        var password = data.password;
		if (!validator.isEmpty(password)) {
		  setPasswordError('');
		} else {
		  setPasswordError('Enter Password!');
		}
		var email = data.email;
		if (validator.isEmail(email)) {
		  setEmailError('');
		} else {
		  setEmailError('Enter valid Email!');
		}
e.preventDefault();
axios.post('http://13.232.135.93:4000/api/login', 
{
email:data.email,
password:data.password,
}).then((res)=>{
console.log(res.data.data.name);
console.log("Response Check : " , res);

localStorage.setItem('login', true);
localStorage.setItem('usernamecurrent',res.data.data.name);
navigate("/dashboard");

}).catch((err)=>{
console.log("Error Check : ",err);
msgSet("Invalid Email & Password");
})

}
return(
<div className = "container">
<div className="loginform">
<div className = "heading">
<h2>Login Form</h2>
</div>
<div className="form">
<form className="loginForm">
<span style={{fontWeight: 'bold', color: 'red'}} className="errorHeading">{msg}</span>
<div className="form-group">
<label className="labelControl">Email</label>
<input className="formControl loginEmail" type="email" name="email" id="email" onChange={handleChange} value={data.email} />
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{emailError}</span>
</div>
<div className="form-group">
<label className="labelControl">Password</label>
<input className="formControl" type="password" id="password" name="password" onChange={handleChange} value={data.password} />
<span style={{fontWeight: 'bold', color: 'red'}} className="error">{passwordError}</span>
</div>
<div className="form-button">
<button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
</div>
</form>
</div>
</div>
</div>
)
}

export default Home;