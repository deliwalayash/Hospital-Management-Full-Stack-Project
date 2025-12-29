import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setUser({ ...user, [id]: value });
    setErrors({ ...errors, [id]: "" }); // clear error while typing
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (!user.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!user.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(user.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!user.password.trim()) {
      newErrors.password = "Password is required";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:4000/api/auth/signup",
        user
      );

      toast.success("Account created successfully 🎉");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-800">

        {/* HEADER */}
        <h1 className="text-3xl font-extrabold text-center mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Hospital Management System
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={user.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800
                border text-gray-900 dark:text-white
                focus:outline-none
                ${errors.name
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:border-blue-500"}
              `}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={handleChange}
              placeholder="doctor@hospital.com"
              className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800
                border text-gray-900 dark:text-white
                focus:outline-none
                ${errors.email
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:border-blue-500"}
              `}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800
                border text-gray-900 dark:text-white
                focus:outline-none
                ${errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "border-gray-300 dark:border-gray-700 focus:border-blue-500"}
              `}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition
              ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
