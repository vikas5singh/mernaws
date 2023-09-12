import React from 'react';
import {NavLink,useNavigate} from 'react-router-dom';

const Login = () =>{
const navigate = useNavigate();
const handleClick = (e)=>{
e.preventDefault();
    localStorage.clear();
    navigate('/');
  }
return(

<div className="navBar">
<div className="logoBar">
<img src="http://13.232.135.93:4000/assets/vikas.png" className="logo-img vikas" />
</div>
<div className="menuBar">
<ul className="menuItem">
<li className="menuList">
<NavLink className="menuLink" to="/dashboard">Home</NavLink>
</li>
<li className="menuList">
<NavLink className="menuLink" to="/profile">Employees List</NavLink>
</li>
<li className="menuList">
<NavLink className="menuLink" to="/register">Create Employees</NavLink>
</li>
<li className="menuList">
<NavLink className="menuLink" to="/register">User Name</NavLink>
</li>
<li className="menuList">
<button type="submit" onClick={handleClick} className="menuLink">Logout</button>
</li>

</ul>
</div>
</div>

)
}

export default Login;