import { useParams } from "react-router-dom";
import React,{useState,useEffect } from "react";
import axios from "axios";
function Reademployee() {
    const [product, setProduct] = useState({});
	console.log(product.name);
    const { id } = useParams();
	const fetchData = () => {
    axios.get(`http://localhost:4000/api/reademployee/${id}`)
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
<th>Image</th>
<th>Name</th>
<th>Email</th>
<th>Mobile No</th>
<th>Designation</th>
<th>Gender</th>
<th>Course</th>
<th>Create Date</th>
</tr>
<tr>
<td>{product._id}</td>
<td><img src={"http://localhost:4000/images/"+product.imgupload} width="60" height="60" /></td>
<td>{product.name}</td>
<td>{product.email}</td>
<td>{product.mobileno}</td>
<td>{product.designation}</td>
<td>{product.gender}</td>
<td>{product.course}</td>
<td>{product.date}</td>
</tr>
</table>
</div>
</div>
</div>
	); 
}

export default Reademployee;