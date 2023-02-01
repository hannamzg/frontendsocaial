import { useState } from "react";
import { Link } from "react-router-dom";
import "./register.scss";
import axios from "axios"


const Register = () => {
  const [inputs,setInput] =useState({
    username:"",
    email:"",
    password:"",
    name:"",
  })
  const [error,setError] =useState(null);

  const handelChange = e =>{
    setInput(prev=>({...prev, [e.target.name]:e.target.value}))
  }

  const handleClick = async e=>{
    e.preventDefault();

    try{
     await axios.post("http://localhost:5000/api/auth/register",inputs)
    }catch(err){
      setError(err.response.data)
    }
  }

  
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lama Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>
          <Link to="/login">
          <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Username" name="username" onChange={handelChange}/>
            <input type="email" placeholder="Email" name="email" onChange={handelChange}/>
            <input type="password" placeholder="Password" name="password" onChange={handelChange}/>
            <input type="text" placeholder="Name" name="name" onChange={handelChange}/>
             {error && error} 
            <button  onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
