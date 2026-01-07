import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 👈 magic trigger

  const [user, setUser] = useState(null);

  // ✅ Re-sync user whenever route changes
  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, [location.pathname]);

  const role = user?.role;

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-white/90 border-b">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MediCare
        </Link>

        {/* MENU */}
        <div className="flex gap-6 items-center">

          <Link to="/" className="nav-link">Home</Link>

          {/* 👤 PATIENT */}
          {role === "user" && (
            <>
              <Link to="/book" className="nav-link">
                Book Appointment
              </Link>

              <Link to="/view" className="nav-link">
                View Appointments
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* 🩺 DOCTOR */}
          {role === "doctor" && (
            <>
              <Link to="/doctor/dashboard" className="nav-link">
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

          {/* 🚪 NOT LOGGED IN */}
          {!role && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>

              <Link
                to="/doctor/login"
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Doctor Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
