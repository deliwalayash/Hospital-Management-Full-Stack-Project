import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Form = () => {

  const [patient,setPatient]=useState({
    name:"",
    age:"",
    doctorname:"",
    mobileNumber:"",
    gender:"",
    appointmentDate:"",

  })

  const navigate=useNavigate()

  const handleChange =(e)=>{
    if(e.target.type == "radio"){
      setPatient({...patient,[e.target.name]:e.target.value})
    }
    else{
      setPatient({...patient,[e.target.id]:e.target.value})
    }

  }
  const token = localStorage.getItem("token")


  const handleSubmit = async(e)=>{
    e.preventDefault()
    try{
      const res=await axios.post("http://localhost:4000/api/create",patient,{
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
      console.log(res.data)
      alert("Pateint added successfully")
      navigate('/view')
    }
    catch(err){
      console.log(err.response.data)
      alert(err.response.data.message)
    }

    
  }
  return (
    <div>
<form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
    <h1 className='text-4xl mt-36 mb-10 font-semibold text-center'>Patients Details</h1>

  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required onChange={handleChange} />
  </div>


  <div className="mb-5">
    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
    <input type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
  </div>


  <div className="mb-5">
    <label htmlFor="doctorname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor Name</label>
    <input type="text" id="doctorname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
  </div>

  <div className="mb-5">
    <label htmlFor="mobilenumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
    <input type="number" id="mobileNumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={handleChange} />
  </div>


<div className="mb-5">
  <p className="mb-2 text-sm font-medium text-gray-900">Gender</p>

  <label className="flex items-center gap-2 mb-2">
    <input type="radio" id="male" name="gender" value="male" required  onChange={handleChange}/>
    Male
  </label>

  <label className="flex items-center gap-2">
    <input type="radio" id="female" name="gender" value="female" required onChange={handleChange}/>
    Female
  </label>
</div>
<div className="mb-5">
  <label className="block mb-2 text-sm font-medium">Appointment Date</label>
  <input
    type="date"
    name="appointmentDate"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
    id="appointmentDate"
    onChange={handleChange}
    required min={new Date().toISOString().split("T")[0] }
  />
</div>

 
 <div className='text-center'>
     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 me-6">Submit</button>
     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{navigate('/view')}}>View Appointments</button>
 </div>
</form>

    </div>
  )
}

export default Form



