import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {NavLink,useNavigate} from 'react-router-dom';

const NavBar = () =>{

let register1 = localStorage.getItem('login');
let usernamecurrent = localStorage.getItem('usernamecurrent');
const navigate = useNavigate();
const handleClick = (e)=>{
e.preventDefault();
    localStorage.clear();
    navigate('/');
  }
return(

<div className="navBar">
{!register1?
<div className="logoBar">
<img src="http://localhost:4000/assets/vikas.png" className="logo-img vikas" />
</div>
:
<div className="menuBar">
<div className="logoBar">
<img src="src/assets/vikas.png" className="logo-img vikas" />
</div>
<ul className="menuItem">
<li className="menuList">
<NavLink className="menuLink" to="/dashboard">Home</NavLink>
</li>
<li className="menuList">
<NavLink className="menuLink" to="/employeeslist">Employees List</NavLink>
</li>
<li className="menuList">
<NavLink className="menuLink" to="/employeecreate">Create Employees</NavLink>
</li>
<li className="menuList">
<h4>{usernamecurrent}</h4>
</li>
<li className="menuList">
<button type="submit" onClick={handleClick} className="menuLink">Logout</button>
</li>

</ul>
</div>
}
</div>

)
}

export default NavBar;