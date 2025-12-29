import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "sonner";

const Form = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    doctorname: "",
    mobileNumber: "",
    gender: "",
    appointmentDate: "",
  })

  useEffect(() => {
    const getPatient = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/view/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        setPatient(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }

    getPatient()
  }, [id])

  const handleChange = (e) => {
    if (e.target.type === "radio") {
      setPatient({ ...patient, [e.target.name]: e.target.value })
    } else {
      setPatient({ ...patient, [e.target.id]: e.target.value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(
        `http://localhost:4000/api/update/${id}`,
        patient,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      // alert("Patient updated successfully")
         toast.success("Patient Updated successfully 🏥");
      navigate('/view')
    } catch (err) {
      console.log(err.response?.data)
      alert(err.response?.data?.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
        
        {/* ===== Header ===== */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Edit Patient Details
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Update patient information and appointment details
          </p>
        </div>

        {/* ===== Form ===== */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Patient Name
            </label>
            <input
              type="text"
              id="name"
              value={patient.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={patient.age}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Doctor */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Doctor Name
            </label>
            <input
              type="text"
              id="doctorname"
              value={patient.doctorname}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Mobile Number
            </label>
            <input
              type="number"
              id="mobileNumber"
              value={patient.mobileNumber}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div>
            <p className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Gender
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={patient.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={patient.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Appointment Date
            </label>
            <input
              type="date"
              id="appointmentDate"
              value={patient.appointmentDate.split("T")[0]}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
            >
              Update Patient
            </button>

            <button
              type="button"
              onClick={() => navigate('/view')}
              className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 transition"
            >
              View Appointments
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Form
