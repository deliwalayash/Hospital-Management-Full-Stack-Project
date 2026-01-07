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

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/doctor/appointments/${id}/status`, { status });
      toast.success(`Appointment ${status}`);

      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status } : a
        )
      );
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-semibold animate-pulse">
          Loading appointments...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-6 py-24">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">
              Doctor Dashboard 🩺
            </h1>
            <p className="text-gray-500 mt-1">
              Manage and approve your patient appointments
            </p>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-900 text-white text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Age</th>
                  <th className="px-6 py-4">Gender</th>
                  <th className="px-6 py-4">Mobile</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {appointments.length > 0 ? (
                  appointments.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {item.name}
                      </td>

                      <td className="px-6 py-4">{item.age}</td>

                      <td className="px-6 py-4 capitalize">
                        {item.gender}
                      </td>

                      <td className="px-6 py-4">
                        {item.mobileNumber}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          item.appointmentDate
                        ).toLocaleDateString()}
                      </td>

                      {/* STATUS BADGE */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            item.status === "approved"
                              ? "bg-green-100 text-green-700"
                              : item.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      {/* ACTION BUTTONS */}
                      <td className="px-6 py-4">
                        <div className="flex gap-3 justify-center">
                          <button
                            onClick={() =>
                              updateStatus(item._id, "approved")
                            }
                            className="px-4 py-2 rounded-lg text-white text-xs font-semibold
                              bg-green-600 hover:bg-green-700 active:scale-95 transition"
                          >
                            ✅ Approve
                          </button>

                          <button
                            onClick={() =>
                              updateStatus(item._id, "rejected")
                            }
                            className="px-4 py-2 rounded-lg text-white text-xs font-semibold
                              bg-red-600 hover:bg-red-700 active:scale-95 transition"
                          >
                            ❌ Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-16 text-gray-500"
                    >
                      No appointments found 😴
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
