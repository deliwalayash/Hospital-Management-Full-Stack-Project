import React from 'react'

const Form = () => {
  return (
    <div>
      

<form className="max-w-sm mx-auto">
    <h1 className='text-4xl mt-36 mb-10 font-semibold text-center'>Patients Details</h1>

  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
  </div>


  <div className="mb-5">
    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
    <input type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>


  <div className="mb-5">
    <label htmlFor="doctorname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Doctor Name</label>
    <input type="text" id="doctorname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>

  <div className="mb-5">
    <label htmlFor="mobilenumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mobile Number</label>
    <input type="number" id="mobilenumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>


<div className="mb-5">
  <p className="mb-2 text-sm font-medium text-gray-900">Gender</p>

  <label className="flex items-center gap-2 mb-2">
    <input type="radio" id="male" name="gender" value="male" required />
    Male
  </label>

  <label className="flex items-center gap-2">
    <input type="radio" id="female" name="gender" value="female" required />
    Female
  </label>
</div>
<div className="mb-5">
  <label className="block mb-2 text-sm font-medium">Appointment Date</label>
  <input
    type="date"
    name="appointmentDate"
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 w-full"
    required min={new Date().toISOString().split("T")[0]}
  />
</div>

 
 <div className='text-center'>
     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
 </div>
</form>

    </div>
  )
}

export default Form



