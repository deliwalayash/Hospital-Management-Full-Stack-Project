import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Login = () => {

    const navigate=useNavigate()
     const [user,setUser]=useState({
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        setUser({...user,[e.target.id]:e.target.value})
    }

    const handleSubmit=async(e)=>{

        e.preventDefault()
        try{
            const res=await axios.post('http://localhost:4000/api/auth/login',user)
            console.log(res.data)
            localStorage.setItem("token",res.data.token)
            localStorage.setItem("user",JSON.stringify(res.data.user))
            alert("login successful")
            window.location='/'
            
        }
        catch(err){
            console.log(err.response.data.message)
        }

    }
  return (
    <div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h1 className="text-4xl mt-36 mb-10 font-semibold text-center">
          Login Details
        </h1>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
            value={user.email}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            onChange={handleChange}
            value={user.password}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-6"
          >
            Submit
          </button>
        </div>
      </form>
      
   </div>
  )
}
export default Login
