import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Viewpatients = () => {

  const [patients,setPatients]=useState([])

  const navigate=useNavigate()

useEffect(()=>{
  const fetchPatients= async()=>{
   try{
     const res=await axios.get('http://localhost:4000/api/view')
    console.log(res.data.data)
    setPatients(res.data.data)
   }
   catch(err){
    console.log(err.response)
   }
  }
  fetchPatients()

},[])

const deleteData=async (id)=>{

  try{
    await axios.delete(`http://localhost:4000/api/delete/${id}`)
    setPatients(p =>p.filter(p=>p._id !=id))
    alert("data deleted successfully")
    
  }
  catch(err){
    console.log(err.response.data)
  }
}


  return (
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto mt-20">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          Patients Name
        </th>
        <th scope="col" className="px-6 py-3">
          Age
        </th>
        <th scope="col" className="px-6 py-3">
          Doctor Name
        </th>
        <th scope="col" className="px-6 py-3">
          Mobile Number
        </th>
        <th scope="col" className="px-6 py-3">
          Appointment Date
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {
      patients.map((curEle)=>{
        return(
             <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200" key={curEle._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {curEle.name}
                </th>
                <td className="px-6 py-4">
                    {curEle.age}
                </td>
                <td className="px-6 py-4">
                   {curEle.doctorname}
                </td>
                <td className="px-6 py-4">
                    {curEle.mobileNumber}
                </td>
                <td className="px-6 py-4">
                    {curEle.appointmentDate}
                </td>
                <td className="px-6 py-4">
                    <button type="button" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>{navigate(`/edit/${curEle._id}`)}}>Edit</button>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>{deleteData(curEle._id)}}>Delete</button>
                </td>
            </tr>
        )
      })
    }
 
    </tbody>
  </table>
 <div className='text-center mt-8'>
   <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>{navigate('/')}}>Back</button>
 </div>
</div>
  
  
  )
}

export default Viewpatients


