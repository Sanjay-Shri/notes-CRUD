import React, { useState } from 'react'
import axios from 'axios'
import {Link , useNavigate} from "react-router-dom"
import { useAuth } from '../Context/ContextProvider'


const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate = useNavigate()
    const {login}=useAuth()

    const handalSubmit= async(e)=>{
        e.preventDefault();

        try{
            const apiURL="http://localhost:5000/api/auth/login"
            const response= await axios.post(apiURL,{
                email,
                password,
                
            })

            if(response.data.success)
               {
                login(response.data)
                navigate("/")
               }
                
        }
        catch(err){
            console.log(err)
        }
    }

  return (
    <div>
      <form action="">
        <div>
            <label htmlFor="Email"></label>
            <input type="email" 
                placeholder='email'
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
            />
        </div>
        <div>
            <label htmlFor="password"></label>
            <input type="password" 
                placeholder='******'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
        </div>
        <button type='submit' onClick={handalSubmit}>login</button>
        <p>create an account <Link to={'/signup'}>signup</Link> </p>
      </form>
    </div>
  )
}

export default Login
