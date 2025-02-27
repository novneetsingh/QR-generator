import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ setAuthToken }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // login company
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      // Send login request
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
        data
      );

      // Save token to local storage for authentication
      if (response.data.token) {
        sessionStorage.setItem("authToken", response.data.token);
        setAuthToken(response.data.token);
      }

      // console.log("Server response:", response.data);
      reset(); // Reset form fields

      toast.success("Login successful!");

      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      toast.error("Error logging in. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <Link
              className="text-blue-500 hover:underline cursor-pointer flex justify-end text-sm"
              to="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white rounded`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
