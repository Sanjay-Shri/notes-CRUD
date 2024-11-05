import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup = () => {
  const [fullname , setFullname]=useState("");
  const [email, setEmail]=useState("");
  const [password , setPassword]=useState("");
  const [confirmpassword , setConfirmPassword]=useState("")
  const [isPasswordMatch, setIsPasswordMatch]=useState(true)
  const navigate = useNavigate()

  const handalSubmit=async(e)=>{
    e.preventDefault();
    if(password!=confirmpassword){
      setIsPasswordMatch(false)
      return
    }

    setIsPasswordMatch(true)

    try{
      const apiURL = "http://localhost:5000/api/auth/register"
      const response = await axios.post(apiURL, {
        full_name: fullname,
        email,
        password
      })

      navigate("/login")
    }
    catch(err){
      console.log(err)
    }

  }


  return (
    <div>
      <h1>Sign Up</h1>
      <form action="">
        <div>
          <label htmlFor="full_name">full name:</label>
          <input type="text" 
          placeholder='full name'
          value={fullname}
          onChange={(e)=>{setFullname(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" 
          placeholder='xyz@demo.com'
          value={email}
          onChange={(e)=>{setEmail(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" 
          className={`${!isPasswordMatch}?"input-red":""`}
          placeholder='********'
          value={password}
          onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        <div>
          <label htmlFor="confirm_password">conform password</label>
          
          
          <input type="password" 
          className={`${!isPasswordMatch}?"input-red":""`}
          placeholder='confirm password'
          value={confirmpassword}
          onChange={(e)=>{setConfirmPassword(e.target.value)}}
          />
        </div>
        <button type='submit' onClick={handalSubmit}>signup</button>
        <p>user alrady have a account 
          <Link to={'/login'}>Log in</Link>
        </p>
      </form>
    </div>
  )
}

export default Signup
