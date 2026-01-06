import { Navigate } from "react-router-dom";

const DoctorProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("doctorToken");
  const role = localStorage.getItem("role");

  if (!token || role !== "doctor") {
    return <Navigate to="/doctor/login" replace />;
  }

  return children;
};

export default DoctorProtectedRoute;
