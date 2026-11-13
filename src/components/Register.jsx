import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  FaGraduationCap,
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaSchool,
  FaPhone,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/authSlice";

function Register() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formmData, setFormData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Empty fields validation
    if (Object.values(formmData).some((value) => value.trim() === "")) {
      alert("Please fill all fields");
      return;
    }

    // Email validation
    const email = formmData.emailAddress;

    if (
      !email.includes("@") ||
      !email.includes(".") ||
      email.indexOf("@") === 0 ||
      email.indexOf(".") < email.indexOf("@") + 2 ||
      email.endsWith(".")
    ) {
      alert("Please enter a valid email address");
      return;
    }

    // 2. Password length validation
    if (formmData.password.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    // 3. Password matching
    if (formmData.password !== formmData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // 4. Terms validation
    if (!termsAccepted) {
      alert("Please accept Terms & Conditions");
      return;
    }

    // 5. Successful registration
    console.log("Registration Successful");
    console.log(formmData);

    alert("Account created successfully!");

    dispatch(
      registerUser({
        fullName: formmData.fullName,
        emailAddress: formmData.emailAddress,
        phoneNumber: formmData.phoneNumber,
        password: formmData.password,
      }),
    );

    setFormData({
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-between bg-[#398FBC] text-white p-10">
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-white text-[#398FBC] p-3 rounded-xl">
                <FaGraduationCap size={28} />
              </div>
              <h1 className="text-2xl font-bold">MySMS</h1>
            </div>

            <h2 className="text-3xl font-bold mt-16 leading-snug">
              Join Our Smart School Management System
            </h2>

            <p className="mt-5 text-blue-100 leading-7">
              Create your account and manage your academic activities with ease.
            </p>
          </div>

          <div className="flex justify-center my-10">
            <div className="bg-white/15 rounded-full p-12">
              <FaSchool size={110} />
            </div>
          </div>

          <p className="text-sm text-blue-100">
            Smart education management starts here.
          </p>
        </div>

        {/* Right Section */}
        <form onSubmit={handleSubmit}>
          <div className="p-7 sm:p-10 flex flex-col justify-center">
            <div className="md:hidden flex justify-center mb-5">
              <div className="bg-[#398FBC] text-white p-4 rounded-xl">
                <FaGraduationCap size={35} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>

            <p className="text-gray-500 mt-2 mb-6">
              Register to get started with MySMS
            </p>

            {/* Full Name */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 focus-within:border-[#398FBC]">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  value={formmData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formmData, fullName: e.target.value })
                  }
                  placeholder="Enter your full name"
                  className="w-full p-3 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 focus-within:border-[#398FBC]">
                <FaEnvelope className="text-gray-400" />
                <input
                  type="email"
                  value={formmData.emailAddress}
                  onChange={(e) =>
                    setFormData({ ...formmData, emailAddress: e.target.value })
                  }
                  placeholder="Enter your email"
                  className="w-full p-3 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 focus-within:border-[#398FBC]">
                <FaPhone className="text-gray-400" />
                <input
                  type="tel"
                  value={formmData.phoneNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formmData,
                      phoneNumber: e.target.value,
                    })
                  }
                  placeholder="Enter phone number"
                  className="w-full p-3 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-[#398FBC]">
                  <FaLock className="text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formmData.password}
                    onChange={(e) =>
                      setFormData({ ...formmData, password: e.target.value })
                    }
                    placeholder="Password"
                    className="w-full min-w-0 p-3 outline-none bg-transparent"
                  />
                  <FaEye
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>

                <div className="flex items-center border border-gray-300 rounded-lg px-3 focus-within:border-[#398FBC]">
                  <FaLock className="text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formmData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formmData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Confirm"
                    className="w-full min-w-0 p-3 outline-none bg-transparent"
                  />
                  <FaEye
                    className="text-gray-400 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 mb-6 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-1 accent-[#398FBC]"
              />
              <p>
                I agree to the{" "}
                <a href="#" className="text-[#398FBC] font-semibold">
                  Terms & Conditions
                </a>
              </p>
            </div>

            {/* Register Button */}
            <button
              className="w-full bg-[#398FBC] hover:bg-[#287ba6] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
              type="submit"
            >
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#398FBC] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>

            <p className="text-center text-xs text-gray-400 mt-5">
              © 2026 MySMS. All Rights Reserved.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
