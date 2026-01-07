import api from "../api/api"

import React, { useState ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Form = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

if (role === "doctor") {
  toast.error("Doctor already logged in 🚫");
  return;
}



  const [patient, setPatient] = useState({
    name: "",
    age: "",
    doctorname: "",
    mobileNumber: "",
    gender: "",
    appointmentDate: "",
  });

  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState("")


  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, name, value, type } = e.target;

    if (type === "radio") {
      setPatient({ ...patient, [name]: value });
      setErrors({ ...errors, gender: "" });
    } else {
      setPatient({ ...patient, [id]: value });
      setErrors({ ...errors, [id]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!patient.name.trim()) newErrors.name = "Patient name is required";
    if (!patient.age) newErrors.age = "Age is required";

    if (!patient.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(patient.mobileNumber)) {
      newErrors.mobileNumber = "Enter valid 10-digit mobile number";
    }

    if (!patient.gender) newErrors.gender = "Please select gender";
    if (!patient.appointmentDate)
      newErrors.appointmentDate = "Appointment date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
     await api.post("/create", {...patient,doctorId})
      toast.success("Patient added successfully 🏥");
      setTimeout(() => {
        navigate("/view");
      }, 1000);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to add patient";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctor/list")
      setDoctors(res.data.data)
    } catch (err) {
      toast.error("Failed to load doctors")
    }
  }

  fetchDoctors()
}, [])


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">

        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Patient Details
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Book an appointment
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Patient Name
            </label>
            <input
              id="name"
              value={patient.name}
              onChange={handleChange}
              className={`input ${
                errors.name && "input-error"
              }`}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          {/* AGE */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Age
            </label>
            <input
              type="number"
              id="age"
              value={patient.age}
              onChange={handleChange}
              className={`input ${
                errors.age && "input-error"
              }`}
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          {/* DOCTOR */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Doctor Name
            </label>
            <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
>
  <option value="">Select Doctor</option>

  {doctors.map(doc => (
    <option key={doc._id} value={doc._id}>
      {doc.name} ({doc.specialization})
    </option>
  ))}
</select>

            {errors.doctorname && (
              <p className="error">{errors.doctorname}</p>
            )}
          </div>

          {/* MOBILE */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Mobile Number
            </label>
            <input
              id="mobileNumber"
              value={patient.mobileNumber}
              onChange={handleChange}
              className={`input ${
                errors.mobileNumber && "input-error"
              }`}
            />
            {errors.mobileNumber && (
              <p className="error">{errors.mobileNumber}</p>
            )}
          </div>

          {/* GENDER */}
          <div>
            <p className="mb-2 text-sm font-medium">Gender</p>
            <div className="flex gap-6">
              {["male", "female"].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={handleChange}
                  />
                  {g}
                </label>
              ))}
            </div>
            {errors.gender && (
              <p className="error">{errors.gender}</p>
            )}
          </div>

          {/* DATE */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Appointment Date
            </label>
            <input
              type="date"
              id="appointmentDate"
              min={new Date().toISOString().split("T")[0]}
              value={patient.appointmentDate}
              onChange={handleChange}
              className={`input ${
                errors.appointmentDate && "input-error"
              }`}
            />
            {errors.appointmentDate && (
              <p className="error">{errors.appointmentDate}</p>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`btn-primary ${
                loading && "opacity-70 cursor-not-allowed"
              }`}
            >
              {loading ? "Saving..." : "Submit"}
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
  );
};

export default Form;
