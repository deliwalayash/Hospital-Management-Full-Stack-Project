import api from "../api/api"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

const Form = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [patient, setPatient] = useState({
    name: "",
    age: "",
    mobileNumber: "",
    gender: "",
    appointmentDate: "",
    doctor: null, // populated doctor object
  })

  useEffect(() => {
    const getPatient = async () => {
      try {
        const res = await api.get(`/view/${id}`)
        setPatient(res.data.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPatient()
  }, [id])

  const handleChange = (e) => {
    const { id, name, value, type } = e.target

    if (type === "radio") {
      setPatient({ ...patient, [name]: value })
    } else {
      setPatient({ ...patient, [id]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // 🚫 doctor NOT sent (backend already has it)
      const { doctor, ...updateData } = patient

      await api.put(`/update/${id}`, updateData)

      toast.success("Appointment updated successfully 🏥")
      navigate("/view")
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-start justify-center pt-24 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Edit Appointment
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Update patient details (doctor cannot be changed)
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* PATIENT NAME */}
          <div>
            <label className="label">Patient Name</label>
            <input
              id="name"
              value={patient.name}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* AGE */}
          <div>
            <label className="label">Age</label>
            <input
              type="number"
              id="age"
              value={patient.age}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* DOCTOR (READ ONLY) */}
          <div>
            <label className="label">Doctor</label>
            <div className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
              {patient.doctor?.name} ({patient.doctor?.specialization})
            </div>
          </div>

          {/* MOBILE */}
          <div>
            <label className="label">Mobile Number</label>
            <input
              id="mobileNumber"
              value={patient.mobileNumber}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="label">Gender</label>
            <div className="flex gap-6">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={patient.gender === g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
          </div>

          {/* DATE */}
          <div>
            <label className="label">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              value={patient.appointmentDate?.split("T")[0]}
              onChange={handleChange}
              className="input"
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 pt-6">
            <button className="btn-primary">
              Update Appointment
            </button>

            <button
              type="button"
              onClick={() => navigate("/view")}
              className="btn-secondary"
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
