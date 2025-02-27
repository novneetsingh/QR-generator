import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to send OTP based on the email field value
  const handleSendOTP = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/send-reset-password-otp`,
        { email }
      );
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error("Error sending OTP. Please try again.");
    }
    setLoading(false);
  };

  // Function to handle password reset using email, OTP, and new password
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/reset-password`,
        {
          email: data.email,
          otp: data.otp,
          newPassword: data.newPassword,
        }
      );
      toast.success("Password reset successful!");
      navigate("/login");
    } catch (error) {
      // Show detailed error if available
      const errorMessage =
        error.response?.data?.error ||
        "Error resetting password. Please try again.";
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
              placeholder="Enter your registered email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          {/* OTP Field with Send OTP Button */}
          <div className="flex items-center space-x-2">
            <div className="w-full">
              <input
                type="text"
                {...register("otp", { required: "OTP is required" })}
                className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
                placeholder="Enter OTP"
              />
              {errors.otp && (
                <p className="text-red-500 text-sm">{errors.otp.message}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSendOTP}
              disabled={loading}
              className=" bg-blue-500 hover:bg-blue-600 text-white rounded"
            >
              Send OTP
            </button>
          </div>
          {/* New Password Field */}
          <div>
            <input
              type="password"
              {...register("newPassword", {
                required: "New password is required",
              })}
              className="w-full p-2 border border-gray-300 rounded focus:outline-blue-500"
              placeholder="Enter new password"
            />
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
