import { useParams } from "react-router-dom";
import React,{useState,useEffect } from "react";
import axios from "axios";
function Read() {
    const [product, setProduct] = useState({});
	console.log(product.name);
    const { id } = useParams();
	const fetchData = () => {
    axios.get(`http://13.232.135.93:4000/api/read/${id}`)
          .then((response) =>{ setProduct(response.data.data);
		  }).catch((err)=>{console.log("Please Check the Error : ", err)});
  }

  useEffect(() => {
    fetchData();
  },[])
	
    return (
<div className="container">
<div className="userList">
<div className="userHeading">
<h2>User List</h2>
</div>
<div className="userTable">
<table>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Password</th>
<th>Role</th>
<th>Action</th>
</tr>
<tr>
<td>{product._id}</td>
<td>{product.name}</td>
<td>{product.email}</td>
<td>{product.password}</td>
<td>{product.role}</td>
</tr>
</table>
</div>
</div>
</div>
	); 
}

export default Read;