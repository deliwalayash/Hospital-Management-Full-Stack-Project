import React, { useEffect, useState } from "react";
import api from "../api/api";
import { toast } from "sonner";

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/doctor/appointments");
        setAppointments(res.data.data);
      } catch (err) {
        toast.error("Failed to fetch appointments");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading appointments...</p>
      </div>
    );
  }
  const updateStatus = async (id, status) => {
  try {
    await api.put(`/doctor/appointments/${id}/status`, { status });
    toast.success("Status updated");

    setAppointments(prev =>
      prev.map(a =>
        a._id === id ? { ...a, status } : a
      )
    );
  } catch {
    toast.error("Failed to update");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
            Doctor Dashboard
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your scheduled appointments
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3">Patient Name</th>
                  <th className="px-6 py-3">Age</th>
                  <th className="px-6 py-3">Gender</th>
                  <th className="px-6 py-3">Mobile</th>
                  <th className="px-6 py-3">Appointment Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="px-6 py-4">{item.age}</td>
                      <td className="px-6 py-4 capitalize">{item.gender}</td>
                      <td className="px-6 py-4">{item.mobileNumber}</td>
                      <td className="px-6 py-4">
                        {new Date(item.appointmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
  <span className={`badge badge-${item.status}`}>
    {item.status}
  </span>
</td>

<td className="px-6 py-4 flex gap-2">
  <button
    onClick={() => updateStatus(item._id, "approved")}
    className="btn-green"
  >
    Approve
  </button>

  <button
    onClick={() => updateStatus(item._id, "rejected")}
    className="btn-red"
  >
    Reject
  </button>
</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-10 text-gray-500"
                    >
                      No appointments found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDashboard;

