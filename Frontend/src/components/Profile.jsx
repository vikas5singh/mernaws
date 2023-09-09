import React,{useEffect, useState} from 'react';
import axios from 'axios';
import{Link,useNavigate} from "react-router-dom";
const Profile = ()=>{
const [user, setUser] = useState([]);

 const navigate = useNavigate();
  const LoadEdit = (id) => {
        navigate("/updateuser/" + id);
  }
  const LoadDelete = (id) => {
        axios.delete(`http://localhost:4000/api/delete/${id}`)
          .then((response) =>{ setUser(response.data);
		 window.location.reload();
		  }).catch((err)=>{console.log("Please Check the Error : ", err)});
  }
const fetchData = () => {
    axios.get("http://localhost:4000/api/allusers")
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
<h2>User List</h2>
</div>
<div className="userTable">
<table>
<tr>
<th>ID</th>
<th>Vikas singh main Name</th>
<th>Email</th>
<th>Name</th>
<th>Email bhai</th>
<th>Password</th>
<th>Role</th>
<th>Action</th>
</tr>
{user.data && user.data.length > 0 && user.data.map((userObj, index) => (
<tr key={index}>
<td>{userObj._id}</td>
<td>{userObj.name}</td>
<td>{userObj.email}</td>
<td>{userObj.password}</td>
<td>{userObj.role}</td>
<td>
<a onClick={() => { LoadEdit(userObj._id) }} className="btn btn-success">Edit</a>
<Link  to={"/read/"+userObj._id}>Read</Link></td>
<td><Link onClick={()=>{LoadDelete(userObj._id)}}>Delete</Link></td>
</tr>
))}
</table>
</div>
</div>
</div>
)
}


export default Profile;