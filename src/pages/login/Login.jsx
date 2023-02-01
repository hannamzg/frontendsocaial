import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useState } from "react";
import "./login.scss";

const Login = () => {
  const {login} =useContext(AuthContext);

  const [inputs,setInput] =useState({
    username:"",
    password:"",
  })

  const [error,setError] =useState(null);

  const navigate = useNavigate();

  const handelChange = e =>{
    setInput(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try{
      await login(inputs);
      navigate("/")
    }
    catch{
      setError(error.response.data)
    }
  
  };

  console.log(inputs);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Username" name="username"  onChange={handelChange}/>
            <input type="password" placeholder="Password"  name="password" onChange={handelChange}/>
            {error && error}
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
