import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {

const [form, setForm] = useState({
email:"",
password:""
});

const { login } = useContext(AuthContext);
const navigate = useNavigate();

const handleChange = (e) => {


setForm({
  ...form,
  [e.target.name]:e.target.value
});


};

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const { data } = await API.post("/auth/login", form);

    login({
      token: data.token,
      user: data.user
    });

    navigate("/");

  } catch (error) {

    alert(error.response?.data?.message || "Login failed");

  }

};

return (


<div className="auth-container">

  <div className="auth-box">

    <h2>Login</h2>

    <form onSubmit={handleSubmit}>

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <button className="login-btn" type="submit">
        Login
      </button>

    </form>

    <div className="divider">
      <span>OR</span>
    </div>

    <a href="http://localhost:5000/api/auth/google" className="google-btn">
      Login with Google
    </a>

    <p>
      New user? <span onClick={()=>navigate("/register")}>Register</span>
    </p>

  </div>

</div>


);

}

export default Login;
