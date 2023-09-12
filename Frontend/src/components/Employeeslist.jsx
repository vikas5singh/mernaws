import React,{useEffect, useState} from 'react';
import axios from 'axios';
import{Link,useNavigate} from "react-router-dom";
const Employeeslist = ()=>{
const [user, setUser] = useState([]);
console.log(user);
 const navigate = useNavigate();
  const LoadEdit = (id) => {
        navigate("/employeeupdate/" + id);
  }
  const LoadDelete = (id) => {
        axios.delete(`http://13.232.135.93:4000/api/empoyeedelete/${id}`)
          .then((response) =>{ setUser(response.data);
		 window.location.reload();
		  }).catch((err)=>{console.log("Please Check the Error : ", err)});
  }
const fetchData = () => {
    axios.get("http://13.232.135.93:4000/getallemployee")
          .then((response) =>{ setUser(response.data);
		  }).catch((err)=>{console.log("Please Check the Error : ", err)});
  }

  useEffect(() => {
    fetchData();
  },[])
  
return(
<div className="container">
<div className="userList">
<div className="userHeading">
<h2>Employee List</h2>
</div>
<div className="userTable">
<table>
<tr>
<th>ID</th>
<th>Image</th>
<th>Name</th>
<th>Email</th>
<th>Mobile No</th>
<th>Designation</th>
<th>Gender</th>
<th>Course</th>
<th>Create Date</th>
<th>Action</th>
</tr>
{user.data && user.data.length > 0 && user.data.map((userObj, index) => (
<tr key={index}>
<td>{userObj._id}</td>
<td><img src={"http://13.232.135.93:4000/images/"+userObj.imgupload} width="60" height="60" /></td>
<td>{userObj.name}</td>
<td>{userObj.email}</td>
<td>{userObj.mobileno}</td>
<td>{userObj.designation}</td>
<td>{userObj.gender}</td>
<td>{userObj.course}</td>
<td>{userObj.date}</td>
<td><a onClick={() => { LoadEdit(userObj._id) }} className="btn btn-success">Edit</a></td>
<td><Link  to={"/reademployee/"+userObj._id} className="btn btn-success">Read</Link></td>
<td><Link onClick={(e)=>{LoadDelete(userObj._id)}} className="btn btn-success">Delete</Link></td>
</tr>
))}
</table>
</div>
</div>
</div>
)
}


export default Employeeslist;