import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaGraduationCap,
  FaSchool,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state) => state.authStore.isAuthenticated,
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Email.trim() === "") {
      return alert("Please fill the email section");
    }

    if (password.trim() === "") {
      return alert("Please fill the password");
    }

    console.log("Login credentials:", {
      emailAddress: Email,
      password: password,
    });

    dispatch(
      loginUser({
        emailAddress: Email,
        password,
      }),
    );
  };
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#5ea0b6,_#27a3c6,_#fdfdfd)]  flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white  rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">
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
              Smart School Management System
            </h2>

            <p className="mt-5 text-blue-100 leading-7">
              Manage students, attendance, fees and academic records all in one
              place.
            </p>
          </div>

          <div className="flex justify-center my-10">
            <div className="bg-white/15 rounded-full p-12">
              <FaSchool size={110} />
            </div>
          </div>

          <p className="text-sm text-blue-100">
            Making school management simple and smart.
          </p>
        </div>

        {/* Right Section */}
        <form onSubmit={handleSubmit}>
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="md:hidden flex justify-center mb-8">
              <div className="bg-[#398FBC] text-white p-4 rounded-xl">
                <FaGraduationCap size={35} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>

            <p className="text-gray-500 mt-2 mb-8">
              Sign in to your MySMS account
            </p>

            {/* Username */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username / Email
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 focus-within:border-[#398FBC]">
                <FaUser className="text-gray-400" />
                <input
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter username or email"
                  className="w-full p-3 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="flex items-center border border-gray-300 rounded-lg px-4 focus-within:border-[#398FBC]">
                <FaLock className="text-gray-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full p-3 outline-none bg-transparent"
                />
                <FaEye
                  className="text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex justify-between items-center mb-7 text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-[#398FBC]" />
                Remember Me
              </label>

              <a
                href="#"
                className="text-[#398FBC] font-semibold hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              className="w-full bg-[#398FBC] hover:bg-[#287ba6] text-white font-semibold py-3 rounded-lg transition duration-300 shadow-md"
              type="submit"
            >
              Sign In
            </button>

            <p className="text-center text-xs text-gray-400 mt-10">
              © 2026 MySMS. All Rights Reserved.
            </p>
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#398FBC] font-semibold hover:underline"
                >
                  Create New Account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
