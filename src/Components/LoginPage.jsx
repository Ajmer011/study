import React from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white-500 via-light-300 to-white-500 px-4">
      <div className="bg-white border-l-4 border-blue-500 rounded-xl shadow-xl flex max-w-5xl w-full overflow-hidden hover:shadow-blue-300 transition-shadow duration-300">
        {/* Login Form */}
        <motion.div
          className="w-full md:w-1/2 p-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Login</h2>
         <Link to="/signup"> <p className="text-sm text-gray-500 mb-6">
            Don’t have an account yet?{" "}
           
              Sign Up
          
          </p></Link>

          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter 6 character or more"
                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="accent-purple-600" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
            >
              LOGIN
            </button>

            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="border-t w-full"></div>
              <p className="text-sm text-gray-400">or login with</p>
              <div className="border-t w-full"></div>
            </div>

            <div className="flex space-x-4 pt-2">
              <button className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google" />
                Google
              </button>
              <button className="flex-1 border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
                <img src="https://img.icons8.com/fluency/16/facebook.png" alt="Facebook" />
                Facebook
              </button>
            </div>
          </form>
        </motion.div>

        {/* Illustration */}
        <motion.div
          className="hidden md:flex w-1/2 items-center justify-center bg-white p-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAO5HduJZC0nOyIVzlHpa2ZYte0ceEB0fE6A&s"
            alt="Illustration"
            className="w-full max-w-sm"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
