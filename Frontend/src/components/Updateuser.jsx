import React,{useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Updateuser = ()=>{

const { id } = useParams();
const [employee, setemployee]= useState({
name:'',
email:'',
password:'',
gender:'',
checkbox:'' 
});
console.log([{...employee}.checkbox]);
const [ched, setChed] = useState([{...employee}.checkbox]);
const getPjl = (e) => {
var array = []
var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')
for (var i = 0; i < checkboxes.length; i++) {
array.push(checkboxes[i].value)

}

setChed(array);
setemployee({...employee, [e.target.name]:array})
}

const selectedCheckbox = (e) => {  
e.persist();  
var arrayTotal = []
var checkboxest = document.querySelectorAll('input[type=checkbox]')
for (var i = 0; i < checkboxest.length; i++) {
arrayTotal.push(checkboxest[i].value)
[{...employee}.checkbox.split(',')[0]]=="isCherry"?true:false;  
} 
console.log(arrayTotal); 
}
{/*console.log(ched)*/}
const navigate = useNavigate();

const GetData = async () => {  
const result = await axios.get(`http://13.232.135.93:4000/api/read/${id}`); 
setemployee(result.data.data);  
};

useEffect(() => {    
GetData();  
}, []);  



const handleSubmit = async (e) => {
        e.preventDefault();
		const formData = new FormData();
		formData.append('photo', employee.photo);
		formData.append('name', employee.name);
		formData.append('email', employee.email);
		formData.append('password', employee.password);
		formData.append('checkbox', employee.checkbox);
		formData.append('gender', employee.gender);
            await axios.put(`http://13.232.135.93:4000/api/update/${id}`,formData,{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
} ).then((res)=>{
			console.log(res.status);
			navigate('/profile')
        }).catch((err)=>{
           console.log(err);
        })
    }
	
const handleChange = (e) => {  
e.persist();  

setemployee({...employee, [e.target.name]: e.target.value});  
}  	


return(
<div className="container">
<div className ="section-area">
<div className="heading">
<h2>Update User</h2>
</div>
<div className="form">
<form>
<div className="form-group">
<label className="form-label">Name</label>
<input className="formControll"  type="text" name="name" value={employee.name} onChange={handleChange}  />
</div>
<div className="form-group">
<label className="form-label">Email</label>
<input className="formControll"  type="email" name="email" onChange={handleChange} value={employee.email} />
</div>
<div className="form-group">
<label className="labelControl">Password</label>
<input type="text" className="formControl" name="password" onChange={handleChange} value={employee.password}/>
</div>
<div className="form-group">
<label className="labelControl">Photo</label>
<input type="file" name="photo" />
</div>
<div className="form-group">
<label className="labelControl">Gender</label>
<input type="radio" className="formControl" name="gender" value="male" checked={employee.gender === 'male'} onChange={handleChange} />Male
<input type="radio" className="formControl" name="gender"  value="female" checked={employee.gender === 'female'} onChange={handleChange}  />Female
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
	checked={selectedCheckbox}
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
<div className="form-group">
<button className="btn btn-primary" type="submit" onClick={handleSubmit} >Update</button>
</div>
</form>
</div>
</div>
</div>
);
}

export default Updateuser;