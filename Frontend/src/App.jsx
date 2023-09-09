import React from 'react'
import './App.css' ;
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Error from './components/Error';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Updateuser from './components/Updateuser';
import Read from './components/Read';
import Employeecreate from './components/Employeecreate';
import Employeeslist from './components/Employeeslist';
import Reademployee from './components/Reademployee';
import Employeeupdate from './components/Employeeupdate';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
    return (
	<Router>
	<NavBar/>
	<Routes>
	<Route exact path="/" element = {<Home />} />
	<Route  path="/login" element = {<Login />} />
	<Route  path="/register" element = {<Register />} />
	<Route  path="/updateuser/:id" element = {<Updateuser />} />
	<Route  path="/read/:id" element = {<Read />} />
	<Route path="/dashboard" element={<Protected Component={Dashboard} />} />
	<Route path="/profile" element={<Protected Component={Profile} />} />
	<Route path="/employeecreate" element={<Protected Component={Employeecreate} />} />
	<Route path="/employeeslist" element={<Protected Component={Employeeslist} />} />
    <Route  path="/reademployee/:id" element = {<Reademployee />} />
	<Route  path="/employeeupdate/:id" element = {<Employeeupdate />} />
	<Route  path="*" element = {<Error />} />
	</Routes>
	</Router>
  )
}

export default App
