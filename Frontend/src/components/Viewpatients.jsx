import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Viewpatients = () => {
  const [patients, setPatients] = useState([])
  const [search, setSearch] = useState("")

  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/view', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setPatients(res.data.data)
      } catch (err) {
        console.log(err.response)
      }
    }

    fetchPatients()
  }, [])

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setPatients(prev => prev.filter(p => p._id !== id))
      alert("Patient deleted successfully")
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  // 🔍 search logic
  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.doctorname.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      {/* ===== Header ===== */}
      <div className="container mx-auto mt-20 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Patient Records
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Patients: {patients.length}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search by patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-64 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ===== Table ===== */}
      <div className="container mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">Patient Name</th>
                <th className="px-6 py-3">Age</th>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Mobile</th>
                <th className="px-6 py-3">Appointment Date</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((curEle) => (
                  <tr
                    key={curEle._id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                      {curEle.name}
                    </td>
                    <td className="px-6 py-4">{curEle.age}</td>
                    <td className="px-6 py-4">{curEle.doctorname}</td>
                    <td className="px-6 py-4">{curEle.mobileNumber}</td>
                    <td className="px-6 py-4">
                      {curEle.appointmentDate.split("T")[0]}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => navigate(`/edit/${curEle._id}`)}
                        className="px-4 py-2 text-xs font-semibold rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteData(curEle._id)}
                        className="px-4 py-2 text-xs font-semibold rounded-md text-white bg-rose-600 hover:bg-rose-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-10 text-gray-500 dark:text-gray-400"
                  >
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== Footer ===== */}
        <div className="flex justify-center py-6 bg-gray-50 dark:bg-gray-800">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </>
  )
}

export default Viewpatients
