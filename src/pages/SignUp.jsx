import React, { useState } from "react";
import { FaShieldAlt } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [otpState, setOtpState] = useState({
    emailOtp: "",
    phoneOtp: "",
    emailVerified: false,
    phoneVerified: false,
    showEmailOtp: false,
    showPhoneOtp: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = (type) => {
    // Implement OTP sending logic here
    if (type === "email") {
      setOtpState({ ...otpState, showEmailOtp: true });
    } else {
      setOtpState({ ...otpState, showPhoneOtp: true });
    }
  };

  const handleVerifyOtp = (type) => {
    // Implement OTP verification logic here
    if (type === "email") {
      setOtpState({ ...otpState, emailVerified: true });
    } else {
      setOtpState({ ...otpState, phoneVerified: true });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otpState.emailVerified && otpState.phoneVerified) {
      // Implement signup logic here
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-sky-100 flex flex-col items-center justify-center p-4">
      <div className="flex items-center space-x-2 text-sky-700 text-3xl font-semibold mb-8">
        <span>MediScribe</span>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <FaShieldAlt className="text-4xl text-sky-700" />
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Create your account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
              <button
                type="button"
                onClick={() => handleSendOtp("email")}
                className="bg-sky-500 text-white px-4 rounded-md hover:bg-sky-600"
                disabled={otpState.emailVerified}
              >
                {otpState.emailVerified ? "Verified" : "Send OTP"}
              </button>
            </div>
            {otpState.showEmailOtp && !otpState.emailVerified && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Email OTP"
                  value={otpState.emailOtp}
                  onChange={(e) =>
                    setOtpState({ ...otpState, emailOtp: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={() => handleVerifyOtp("email")}
                  className="bg-green-500 text-white px-4 rounded-md hover:bg-green-600"
                >
                  Verify
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
              <button
                type="button"
                onClick={() => handleSendOtp("phone")}
                className="bg-sky-500 text-white px-4 rounded-md hover:bg-sky-600"
                disabled={otpState.phoneVerified}
              >
                {otpState.phoneVerified ? "Verified" : "Send OTP"}
              </button>
            </div>
            {otpState.showPhoneOtp && !otpState.phoneVerified && (
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Phone OTP"
                  value={otpState.phoneOtp}
                  onChange={(e) =>
                    setOtpState({ ...otpState, phoneOtp: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
                <button
                  type="button"
                  onClick={() => handleVerifyOtp("phone")}
                  className="bg-green-500 text-white px-4 rounded-md hover:bg-green-600"
                >
                  Verify
                </button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <span className="text-gray-500">OR</span>
        </div>

        <button className="mt-4 w-full flex items-center justify-center space-x-2 border border-gray-300 rounded-md py-2 px-4 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition duration-200">
          <FcGoogle className="text-xl" />
          <span>Sign up with Google</span>
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-sky-600 hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
