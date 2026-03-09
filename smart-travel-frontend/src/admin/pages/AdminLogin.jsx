import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

function AdminLogin() {

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const navigate = useNavigate();
const { login } = useContext(AuthContext);

const handleLogin = async (e)=>{

e.preventDefault();

try{

const {data} = await API.post("/auth/login",{
email,
password
});

if(data.role !== "admin"){
alert("Not an admin account");
return;
}

// use AuthContext login
login({
token:data.token,
user:{
_id:data._id,
name:data.name,
email:data.email,
role:data.role
}
});

navigate("/admin/dashboard");

}catch(error){

alert(error.response?.data?.message || "Login failed");

}

};

return(

<div className="auth-container">

<form className="auth-box" onSubmit={handleLogin}>

<h2>Admin Login</h2>

<input
type="email"
placeholder="Admin Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
required
/>

<button type="submit">
Login
</button>

</form>

</div>

);

}

export default AdminLogin;